from bs4 import BeautifulSoup
import re

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

# Example Usage
if __name__ == "__main__":
    # Read an HTML file (replace 'example.html' with your file)
    with open('/home/kron/projects/hackathon_bologna_2024/data/dataset_hudoc_eng_html_article_6/001-71938.html', 'r', encoding='utf-8') as file:
        html_content = file.read()
    
    # Convert to plain text
    plain_text = html_to_plain_text(html_content)
    
    # Print the result or save to a file
    for element in split_into_paragraphs(plain_text):
        print(element)
        print("------------------------")
    
    # Optionally, save the plain text to a file
    with open('output.txt', 'w', encoding='utf-8') as output_file:
        output_file.write(plain_text)
