import ollama
import chromadb
from tqdm import tqdm
from text_handlers import read_json, get_json_files

chroma_client = chromadb.Client()
chroma_client = chromadb.HttpClient(host='localhost', port=8000)
collection = chroma_client.get_or_create_collection(name="comparrit_collection",
                                                    metadata={"hnsw:space": "cosine"})
#model = SentenceTransformer("mixedbread-ai/mxbai-embed-large-v1")

def add_docs_to_chromadb(doc_tuple_list):
    for id, sections in tqdm(doc_tuple_list):
        embeddings = []
        ids = []
        id_counter = 0
        for section in sections:
            response = ollama.embeddings(model="mxbai-embed-large:v1", prompt=section)
            embedding = response["embedding"]
            embeddings.append(embedding)
            ids.append('hudoc:' + str(id)+':'+str(id_counter))
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



if __name__ == '__main__':
    doc_list = get_json_files("/workspace/DFJ/hackathon_hudoc_article_6_data/dataset_hudoc_eng_json_article_6")
    doc_tuples = [read_json(doc) for doc in doc_list]
    add_docs_to_chromadb(doc_tuples[:100])
