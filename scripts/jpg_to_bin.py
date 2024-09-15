def image_to_binary_string(image_path, output_text_file):
    # Step 1: Read the image in binary mode
    with open(image_path, 'rb') as image_file:
        binary_data = image_file.read()
    
    # Step 2: Convert binary data to a binary string
    binary_string = ''.join(f'{byte:08b}' for byte in binary_data)
    
    # Step 3: Write the binary string to a text file
    with open(output_text_file, 'w') as text_file:
        text_file.write(binary_string)

# Replace 'path_to_image.jpg' with the path to your JPG image
# and 'output_file.txt' with your desired text file's name
image_to_binary_string('/home/tanj85/projects/hackmit2024/scripts/animals/01/1.jpg', 'test_animal_bin.txt')