import os, json, re, glob
from typing import List

def get_paragraphs(text: str) -> List[str]:
    """Split text into paragraphs"""
    return [p for p in text.split("\n")]

def normalize(text: str) -> str:
    """Normalize and make newlines to a single space"""
    normalized_text = re.sub(r'\s+', ' ', text).strip().lower()
    return normalized_text

def read_json(json_file) -> tuple:
	"""Extracts a html text"""
	file_path = os.path.join(os.getcwd(), 'data', json_file)
	with open(file_path, 'r', encoding='utf-8') as json_doc:
		json_obj = json.load(json_doc)        
	doc_id = json_obj['id']
	sections = json_obj['sections']
	
	return (doc_id, sections)

def get_name(doc_text):
	pattern = r'CASE OF[^  ]*'
	match = re.search(pattern, doc_text)
	if match:
		title = match.group(0)
		print("Title found:", title)
		return title
	else:
		print("Title not found:(")


def get_json_files(directory):
	"""Gives a list of every .json-file in the given directory"""
	json_files = glob.glob(os.path.join(directory, '*.json'))
	return [f'{os.path.basename(file)}' for file in json_files]