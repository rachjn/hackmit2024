import asyncio
import socket
import struct
import requests
from io import BytesIO
from PIL import Image   

animals = {i: "" for i in range(256)}
poach_types = {i: "" for i in range(256)}

animals[3] = "owl"
poach_types[7] = "suspicious vehicle"

image_data_store = {}

async def handle_client(reader, writer):
    addr = writer.get_extra_info('peername')
    print(f"Connection from {addr}")

    try:
        while True:
            try:
                header = await reader.readexactly(1)
                
                if header[0] == 0:  # 64 bit slim data
                    data = await reader.readexactly(8)
                    process_data(data) 
                elif header[0] == 1: # ping
                    cam_id = await reader.readexactly(1)
                    print(f"ping from camera {cam_id}")
                # elif header[0] == 2: # beginning/middle of background image
                #     cam_id = await reader.readexactly(1)
                #     print(f"ping from camera {cam_id}")
                # elif header[0] == 3: # end of background image
                #     cam_id = await reader.readexactly(1)
                #     print(f"ping from camera {cam_id}")
                elif header[0] == 4 or header[0] == 5: # Image data for animal
                    cam_id = await reader.readexactly(1)[0]
                    animal_id = await reader.readexactly(1)[0]
                    num_image_bits = int.from_bytes(await reader.readexactly(2), byteorder='big')
                    image_bits = await reader.readexactly(num_image_bits)
                    
                    key = (cam_id, animal_id)
                    
                    if key in image_data_store:
                        image_data_store[key] += image_bits
                    else:
                        image_data_store[key] = image_bits
                    
                    print(f"Received image data from camera {cam_id}, for animal {animals.get(animal_id, 'Unknown')}")

                    if header[0] == 5:
                        # Process complete image and reset data store for this key
                        process_image_data(image_data_store[key], cam_id, animal_id)
                        del image_data_store[key]
                elif header[0] == 6: # flush a certain image
                    cam_id = await reader.readexactly(1)[0]
                    animal_id = await reader.readexactly(1)[0]
                    if (cam_id, animal_id) in image_data_store:
                        del image_data_store[(cam_id, animal_id)]

            except asyncio.IncompleteReadError:
                print(f"Incomplete read from {addr}, connection closed")
                break

    except asyncio.CancelledError:
        print(f"Connection from {addr} closed")
    finally:
        writer.close()
        await writer.wait_closed()

def process_image_data(image_bits, cam_id, animal_id):
    try:
        image = Image.open(BytesIO(image_bits))
        image.save(f"/home/tanj85/projects/hackmit2024/scripts/animals/{cam_id}/{animal_id}.jpg")
        print(f"Image saved for camera {cam_id}, animal {animals.get(animal_id, 'Unknown')}")
    except Exception as e:
        print(f"Failed to create image: {e}")

def process_data(data):
    if len(data) < 8:
        print("Data is too short!")
        return

    # Extract the first byte for cam_id (8 bits)
    cam_id = data[0]

    # Extract the second byte and use the first 4 bits for poach_type next 4 is ignored
    poach_type = data[1]
    
    # Extract the third byte for animal_name (8 bits)
    animal_name = data[2]

    # Extract the fourth byte for num_animal (8 bits)
    num_animal = data[3]

    # Extract the next 4 bytes (32 bits) for ping_time
    ping_time = struct.unpack('!I', data[4:8])[0]  

    # Print the extracted values
    print(f"cam_id: {cam_id}, poach_type: {poach_type}, animal_name: {animal_name}, num_animal: {num_animal}, ping_time: {ping_time}")

    json_data = {
        "cam_id": cam_id,
        "alert_type": poach_types[poach_type],
        "animal": animals[animal_name],
        "num_animal": num_animal,
        "ping_time": ping_time
    }

    # response = requests.post(
    #     "https://colorless-gull-139.convex.site/upsertDataStream",
    #     json=json_data,
    #     headers={"Content-Type": "application/json"}
    # )
    # print(f"Response status: {response.status_code}")
    # print(f"Response content: {response.content}")

async def start_server(host='0.0.0.0', port=8888):
    server = await asyncio.start_server(handle_client, host, port)
    addr = server.sockets[0].getsockname()
    print(f'Serving on {addr}')

    async with server:
        await server.serve_forever()

if __name__ == "__main__":
    try:
        asyncio.run(start_server())
    except KeyboardInterrupt:
        print("Server stopped by user")
