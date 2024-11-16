from bs4 import BeautifulSoup
import re
import json
import os

def get_html_filenames(folder="."):
    """
    Get all filenames of HTML files in the current directory.
    
    Returns:
        list: A list of HTML filenames in the current directory.
    """
    # Get all files in the current directory
    files = os.listdir(folder)
    
    # Filter for .html files
    html_files = [file for file in files if file.endswith('.html')]
    
    return html_files


def split_into_paragraphs(text, min_sentences=3, max_sentences=10):
    """
    Split the text into paragraphs with a minimum and maximum number of sentences per paragraph.
    
    Args:
        text (str): The plain text as a single string.
        min_sentences (int): Minimum number of sentences in a paragraph.
        max_sentences (int): Maximum number of sentences in a paragraph.
        
    Returns:
        list: A list of paragraphs, each containing between min_sentences and max_sentences sentences.
    """
    # Split the text into sentences (using a regex to capture sentence-ending punctuation)
    sentences = re.split(r'(?<=[.!?]) +', text.strip())  # Split on punctuation followed by space
    
    # Create paragraphs by grouping sentences
    paragraphs = []
    current_paragraph = []
    
    for sentence in sentences:
        current_paragraph.append(sentence)
        
        # If the current paragraph has enough sentences, start a new paragraph
        if len(current_paragraph) >= max_sentences:
            paragraphs.append(' '.join(current_paragraph))
            current_paragraph = []
    
    # If there are remaining sentences, check if we should merge them into the last paragraph
    if current_paragraph:
        if len(paragraphs) == 0 or len(current_paragraph) >= min_sentences:
            paragraphs.append(' '.join(current_paragraph))
        else:
            # Merge with the previous paragraph if it's too short
            paragraphs[-1] += ' ' + ' '.join(current_paragraph)
    
    return paragraphs

def html_to_plain_text(html_content):
    """
    Convert HTML content to plain text, handling <br> tags as line breaks.
    
    Args:
        html_content (str): The HTML content as a string.
        
    Returns:
        str: The plain text extracted from the HTML.
    """
    # Parse the HTML content
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Replace <br> tags with newline characters
    for br in soup.find_all('br'):
        br.insert_before("\n")
        br.decompose()  # Remove <br> after inserting the newline
    
    # Get the text from the parsed HTML
    plain_text = soup.get_text()
    
    # Return the cleaned-up plain text
    return plain_text.strip()

def save_to_json(filename, paragraphs, folder="."):
    """
    Save the output in JSON format.
    
    Args:
        filename (str): The filename to use as the ID.
        paragraphs (list): The list of paragraphs to save.
        
    Returns:
        None
    """
    # Create a dictionary with the desired structure
    data = {
        "id": filename,
        "sections": paragraphs
    }
    
    # Save the data to a JSON file
    with open(f"{folder}/{filename}.json", 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, ensure_ascii=False, indent=4)

# Example Usage
if __name__ == "__main__":
    # Read an HTML file (replace 'example.html' with your file)
    html_files = get_html_filenames(folder="../data/dataset_hudoc_eng_html_article_6")
    for html_file in html_files:
        with open(f'{html_file}', 'r', encoding='utf-8') as file:
            html_content = file.read()
        
        # Convert to plain text
        plain_text = html_to_plain_text(html_content)
        
        # Print the result or save to a file
        sections =  split_into_paragraphs(plain_text)
        
        # Save the output in JSON format
        save_to_json(f'{html_file.split(".")[0]}', sections)
