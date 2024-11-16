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

def get_json_files(directory):
	json_files = glob.glob(os.path.join(directory, '*.json'))
	json_files_quoted = [f'{os.path.basename(file)}' for file in json_files]

	return json_files_quoted