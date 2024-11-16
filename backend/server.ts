import express, { Request, Response } from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

// Test endpoint
app.get('/test', (req: Request, res: Response) => {
    res.send('This is a test endpoint!');
});

// Query endpoint
app.get('/query', (req: Request, res: Response) => {
    const queryParam = req.query.q as string;
    if (queryParam) {
        res.send(JSON.stringify({accuracies: [0.2, 0.3, 0.4, 0.5, 0.6], documents: ["001-71946", "001-71946", "001-71946", "001-71946", "001-71946"]}));
    } else {
        res.status(400).send('Error: "q" parameter is required.');
    }
});

// Get File endpoint
app.get('/getFile', (req: Request, res: Response) => {
    const fileId = req.query.id as string;
    if (fileId) {
        const filePath = path.join(__dirname, `${fileId}.json`);
        res.sendFile(filePath, (err) => {
            if (err) {
                res.status(500).send('Error: File not found.');
            }
        })
    } else {
        res.status(400).send('Error: "id" parameter is required.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
