import ollama
import chromadb
from text_handlers import read_json

chroma_client = chromadb.Client()
#chroma_client = chromadb.HttpClient(host='localhost', port=8000)
collection = chroma_client.get_or_create_collection(name="comparrit_collection",
                                                    metadata={"hnsw:space": "cosine"})
#model = SentenceTransformer("mixedbread-ai/mxbai-embed-large-v1")

def add_docs_to_chromadb(doc_tuple_list):
	for id, sections in doc_tuple_list:
		embeddings = []
		ids = []
		id_counter = 0
		for section in sections:
			response = ollama.embeddings(model="mxbai-embed-large:v1", prompt=section)
			embedding = response["embedding"]
			embeddings.append(embedding)
			ids.append(str(id)+':'+str(id_counter))
			id_counter += 1
		
		collection.upsert(ids=ids,
						embeddings=embeddings,
						documents=sections
                        )

def get_closest_embeddings(query, no_results=10):
	response = ollama.embeddings(model="mxbai-embed-large:v1", prompt=query)
	results = collection.query(
        query_embeddings=[response["embedding"]],
        n_results=no_results
        )
	return results

def get_most_similar_section(query_section):
	print("==== INPUT SECTION ====")
	print(query_section)
	result = get_closest_embeddings(query_section, no_results=1)
	print("==== MOST SIMILAR SECTION ====")
	print(f"Document {result['ids'][0][0].rsplit(':')[0]} - Cosine similarity {result['distances'][0][0]}")
	print(result["documents"][0][0])

def test_paragraph_distances(query) -> None:
	closest = get_closest_embeddings(query)
	print("==TEST PARAGRAPH SIMILARITY==")
	print([f"{id}: {res}" for id, res in zip(closest["ids"][0], closest["distances"][0])])

doc_list = ["001-71938.json",
			"001-71940.json",
			"001-71946.json",
			"001-71983.json",
			"001-71988.json",
			"001-72031.json",
			"001-72037.json",
			"001-72039.json",
			"001-72043.json",
			"001-72046.json"]

if __name__ == '__main__':
	doc_tuples = [read_json(doc) for doc in doc_list]
	add_docs_to_chromadb(doc_tuples[1:])
	first_doc_sections = doc_tuples[0][1]
	test_paragraph_distances(first_doc_sections[0])
	get_most_similar_section(first_doc_sections[4])