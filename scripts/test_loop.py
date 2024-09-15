import os
import shutil
import time

def cycle_images(source_folder, destination_file):
    # List all the image files in the source folder
    image_files = [f for f in os.listdir(source_folder) if f.lower().endswith(('png', 'jpg', 'jpeg', 'bmp', 'gif'))]
    
    # Ensure there are images to process
    if not image_files:
        print("No images found in the source folder.")
        return

    image_files.sort()

    # Cycle through the images, copying each to the destination file
    while True:  # Use a loop to continuously cycle through images
        for image_file in image_files:
            # Full path for source image
            source_image_path = os.path.join(source_folder, image_file)
            
            # Copy the image to the destination, overwriting the previous file
            shutil.copy(source_image_path, destination_file)
            
            # Print status message
            print(f"Displayed {image_file}")
            
            # Wait for one second
            time.sleep(1)

# Define the source folder and destination file path
source_folder = '/home/tanj85/projects/hackmit2024/scripts/test_animals'
destination_file = '/home/tanj85/projects/hackmit2024/scripts/animals/01/1.jpg'

# Start the image cycling process
cycle_images(source_folder, destination_file)
