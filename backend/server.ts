import express, { Request, Response } from "express";
var cors = require("cors");
import { ChromaClient } from "chromadb";
import path from "path";
import {OllamaEmbeddingFunction} from "chromadb";

const embedder = new OllamaEmbeddingFunction({
    url: "http://127.0.0.1:11434/api/embeddings",
    model: "mxbai-embed-large:v1",
})


interface QueryResults {
  ids: string[]; // Array of IDs for the matching embeddings
  distances: number[]; // Array of distances (similarity scores)
  metadatas?: Record<string, any>[]; // Optional metadata for each result
}

const app = express();
const PORT = 3000;

const client = new ChromaClient({
  path: "http://localhost:8000", // Replace with your ChromaDB endpoint
});

const collection = client.getCollection({ name: "comparrit_collection", embeddingFunction: embedder });

app.use(cors());
// Test endpoint
app.get("/test", (req: Request, res: Response) => {
  res.send("This is a test endpoint!");
});

// Query endpoint
app.get("/query", (req: Request, res: Response) => {
  const queryParam = req.query.q as string;
  if (queryParam) {
    console.log(queryParam);
    const chroma = new ChromaClient({ path: "http://localhost:8000" });
    chroma
      .getOrCreateCollection({
        name: "comparrit_collection",
        embeddingFunction: embedder,
      })
      .then((collection: any) => {
        console.log(collection)
        collection
          .query({
            queryTexts: queryParam,
            nResults: 10,
          })
          .then((res: any) => {
            console.log(res)
            console.log({ ids: res.ids, distances: res.distances });
          });
      });
  } else {
    res.status(400).send('Error: "q" parameter is required.');
  }
});

// Get File endpoint
app.get("/getFile", (req: Request, res: Response) => {
  const fileId = req.query.id as string;
  if (fileId) {
    const filePath = path.join(__dirname, `${fileId}.json`);
    res.sendFile(filePath, (err) => {
      if (err) {
        res.status(500).send("Error: File not found.");
      }
    });
  } else {
    res.status(400).send('Error: "id" parameter is required.');
  }
});

// app.get("/getSimilarParagraphs", async (req: Request, res: Response) => {
//   const paragraph = req.query.paragraph as string;
//   if (paragraph) {
//     try {
//       const result = await collection.query({
//         queryEmbeddings: embedder.embed(paragraph),
//         nResults: 5,
//       });
//       const similarParagraphs = result.ids.map((id, index) => ({
//         id,
//         similarity: result.distances[index],
//       }));
//       res.json(similarParagraphs);
//     } catch (error) {
//       res.status(500).send("Error: Unable to retrieve similar paragraphs.");
//     }
//   } else {
//     res.status(400).send('Error: "paragraph" parameter is required.');
//   }
// });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
