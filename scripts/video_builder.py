import cv2
# import numpy as np

# Load your background image
background_image_path = '/home/tanj85/projects/hackmit2024/scripts/backgrounds/frame_0s.jpg'
background = cv2.imread(background_image_path)


# Define the codec and create VideoWriter object
output_file_path = '/home/tanj85/projects/hackmit2024/scripts/videos/01.mp4'
fourcc = cv2.VideoWriter_fourcc(*'mp4v')  # Use a codec supported by your file format
out = cv2.VideoWriter(output_file_path, fourcc, 25.0, (background.shape[1], background.shape[0]))


# Ensure the background is loaded
if background is None:
    raise ValueError("Background image not found")

# Location to place the 500x500 video on the background
x_offset, y_offset = 70, 100  # Change these values based on where you want to place the overlay

test_frames = 0

while True:
    background_copy = background.copy()

    # print(background_copy.shape)

    animal_path = f'/home/tanj85/projects/hackmit2024/scripts/test_animals/frame_{(test_frames//25 % 10) + 20}s.jpg'  # Make sure this path is correct
    animal = cv2.imread(animal_path)
    if animal is None:
        print(animal_path)
        raise ValueError("Animal image not found")

    y1, y2 = y_offset, y_offset + animal.shape[0]
    x1, x2 = x_offset, x_offset + animal.shape[1]

    # # Check if the regions to be combined are of the same dimensions
    if y2 <= background_copy.shape[0] and x2 <= background_copy.shape[1]:
        # Combine images: Place the animal on the background
        for c in range(0, 3):
            background_copy[y1:y2, x1:x2, c] = animal[:, :, c]

    # Write the background to the output file (with or without the video overlay)
    out.write(background_copy)

    test_frames += 1
    if test_frames > 500:
        break
    # Break the loop if no frame is returned
    # if not ret:
    #     break

# Release everything if job is finished
out.release()
# cv2.destroyAllWindows()