import requests

def upload_image_to_convex(image_path, url, author=None):
    # Open the image file in binary mode
    with open(image_path, 'rb') as f:
        files = {'file': f}


        # Send the POST request with the image file
        response = requests.post(url, files=files)

        # Check the response status
        if response.status_code == 200:
            print("Image uploaded successfully.")
        else:
            print(f"Failed to upload image. Status code: {response.status_code}, Response: {response.text}")

# Usage example
upload_image_to_convex('/home/tanj85/projects/hackmit2024/scripts/test_animals/frame_20s.jpg', 'https://kindred-ocelot-952.convex.site/sendImage')
