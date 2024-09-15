import asyncio
import socket
import struct
import requests

animals = {i: "" for i in range(256)}
poach_types = {i: "" for i in range(256)}

animals[3] = "owl"
poach_types[7] = "suspicious vehicle"



async def handle_client(reader, writer):
    addr = writer.get_extra_info('peername')
    print(f"Connection from {addr}")

    try:
        while True:
            try:
                data = await reader.readexactly(8)
                if not data:
                    break
                process_data(data)
            except asyncio.IncompleteReadError:
                print(f"Incomplete read from {addr}, connection closed")
                break

    except asyncio.CancelledError:
        print(f"Connection from {addr} closed")
    finally:
        writer.close()
        await writer.wait_closed()

def process_data(data):import struct

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

    response = requests.post(
        "https://colorless-gull-139.convex.site/upsertDataStream",
        json=json_data,
        headers={"Content-Type": "application/json"}
    )
    print(f"Response status: {response.status_code}")
    print(f"Response content: {response.content}")

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
