import { Grid, IconButton, Input, Spinner, VStack } from "@chakra-ui/react";
import { InputGroup } from "./components/ui/input-group";
import { LuSearch } from "react-icons/lu";
import { CSSProperties, useEffect, useState } from "react";
import RelatedDocumentCard from "./components/RelatedDocumentCard";

function Searchbar(props: {
  style?: CSSProperties;
  query: string;
  setQuery: (query: string) => void;
}) {
  const [debouncedQuery, setDebouncedQuery] = useState(props.query);
  // UseEffect to implement the debouncing
  useEffect(() => {
    const handler = setTimeout(() => {
      props.setQuery(debouncedQuery); // Update the parent's query state after 5 seconds
    }, 1000); // 5 seconds debounce delay

    // Cleanup function: clears timeout if the component unmounts or the input changes before 5 seconds
    return () => {
      clearTimeout(handler);
    };
  }, [debouncedQuery]); // Only trigger when `debouncedQuery` changes

  return (
    <div style={{ ...props.style }}>
      <InputGroup style={{ width: "100%" }} startElement={<LuSearch />}>
        <Input
          onChange={(e) => setDebouncedQuery(e.target.value)}
          placeholder="Search for documents"
        />
      </InputGroup>
    </div>
  );
}

function SearchResults(props: { style?: CSSProperties; query: string }) {
  const [documents, setDocuments] = useState<string[]>([]);
  const [accuracies, setAccuracies] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!props.query) {
      setDocuments([]);
      setAccuracies([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    fetch(
      `https://lh9lxctqeb3213-644110db-8080.proxy.runpod.net/api/query?q=${encodeURIComponent(
        props.query
      )}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setDocuments(data.documents || []);
        setAccuracies(data.accuracies || []);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [props.query]);

  if (isLoading) return <Spinner />;
  if (error) return <div color="red.500">{error}</div>;

  return (
    <Grid
      style={{
        height: "100%",
        backgroundColor: "grey.[100]",
        borderRadius: "10px",
        padding: "10px",
        overflowY: "scroll",
        scrollbarWidth: "thin",
        justifyItems: "center",
      }}
      templateColumns={"repeat(auto-fit, minmax(380px, 1fr))"}
      gap={4}
    >
      {documents.length > 0 ? (
        documents.map((doc, index) => (
          <RelatedDocumentCard
            key={doc}
            documentId={doc}
            accuracy={accuracies[index]} // Pass accuracy as a prop
          />
        ))
      ) : (
        <div>No results found.</div>
      )}
    </Grid>
  );
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  return (
    <VStack
      style={{
        marginTop: "100px",
        height: "100%",
        width: "40%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Searchbar query={query} setQuery={setQuery} />

      <SearchResults query={query} />
    </VStack>
  );
}
