import os
import shutil
from text_embedder import get_closest_documents

def find_and_copy_file(file_id, current_folder, destination_folder):
    found = False
    file_name = f"{file_id}.json"
    
    for entry in os.listdir(current_folder):
        entry_path = os.path.join(current_folder, entry)
        
        if os.path.isdir(entry_path):
            # Indicate that we are recursing into a subdirectory
            print(f"Recursing into directory: {entry_path}")
            # Recurse into the subdirectory
            found_sub = find_and_copy_file(file_id, entry_path, destination_folder)
            found = found or found_sub
        
        elif os.path.isfile(entry_path) and entry == file_name:
            # File found
            relative_path = os.path.relpath(current_folder, source_folder)
            print(f"Relative path for {file_name}: {relative_path}")

            destination_dir = os.path.join(destination_folder, relative_path)
            if not os.path.exists(destination_dir):
                print(f"Creating directory: {destination_dir}")
                os.makedirs(destination_dir)
                
            destination_file = os.path.join(destination_dir, file_name)
            print(f"Copying from {entry_path} to {destination_file}")
            shutil.copy2(entry_path, destination_file)
            found = True

    return found

# Example usage
query = "Hei hur det går"
id_list = get_closest_documents(query=query, no_results=5)
print(f"ID List: {id_list}")

source_folder = "data"
destination_folder = "found_docs"

# Ensure the destination folder exists
if not os.path.exists(destination_folder):
    os.makedirs(destination_folder)

# Iterate through each ID in the list
for file_id in id_list:
    print(f"Searching for: {file_id}.json")
    file_found = find_and_copy_file(file_id, source_folder, destination_folder)
    
    if not file_found:
        print(f"File {file_id}.json not found in {source_folder} or its subfolders.")
