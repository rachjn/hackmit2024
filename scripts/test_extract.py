import cv2
import os

def extract_and_save_frames(video_path, output_folder, start_second, duration, interval, crop_x, crop_y, crop_width, crop_height):
    # Open the video file
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise IOError("Cannot open video file")

    # Determine the frame rate of the video
    fps = cap.get(cv2.CAP_PROP_FPS)

    # Calculate the starting frame
    start_frame = int(start_second * fps)

    # Set the video position to the starting frame
    cap.set(cv2.CAP_PROP_POS_FRAMES, start_frame)

    # Create the output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Read and save frames
    for i in range(duration):
        ret, frame = cap.read()
        if not ret:
            break

        # Crop the frame
        cropped_frame = frame[crop_y:crop_y+crop_height, crop_x:crop_x+crop_width]

        print(frame.shape)

        # Save the cropped frame to an image file
        cv2.imwrite(os.path.join(output_folder, f"frame_{start_second+i}s.jpg"), cropped_frame)

        # Skip frames according to the specified interval
        for _ in range(int(fps * interval) - 1):
            cap.read()

    # Release the video capture object
    cap.release()


video_path = '/home/tanj85/projects/hackmit2024/scripts/Bear Video Test - Made with Clipchamp (1).mp4'
output_folder = 'test_animals'
start_second = 20  # Start at 10 seconds
duration = 10  # Duration of 10 seconds
interval = 1  # Interval of 1 second
crop_x, crop_y = 70, 100
crop_width, crop_height = 200, 100

# Call the function
extract_and_save_frames(video_path, output_folder, start_second, duration, interval, crop_x, crop_y, crop_width, crop_height)