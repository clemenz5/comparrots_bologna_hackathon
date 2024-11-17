import { Box, Grid, Input, Spinner, VStack } from "@chakra-ui/react";
import { InputGroup } from "./components/ui/input-group";
import { LuSearch } from "react-icons/lu";
import { CSSProperties, useEffect, useState } from "react";
import RelatedDocumentCard from "./components/RelatedDocumentCard";
import PhotoAnalyzer from "./components/CameraButton";
import { Text } from "@chakra-ui/react";

function Searchbar(props: {
  style?: CSSProperties;
  query: string;
  setQuery: (query: string) => void;
}) {
  const [debouncedQuery, setDebouncedQuery] = useState(props.query);

  useEffect(() => {
    const handler = setTimeout(() => {
      props.setQuery(debouncedQuery);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedQuery]);

  return (
    <Box
      style={{
        ...props.style,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Text
        fontSize={"2xl"}
        textAlign="center"
        padding={"24px"}
        fontWeight={"bold"}
      >
        Welcome to the Comparrit document analyzer!
      </Text>
      Search for or scan your document below to find related cases and compare
      them
      <InputGroup
        style={{
          padding: "20px",
          width: "90%",
          maxWidth: "500px",
        }}
        startElement={<LuSearch />}
      >
        <Input
          onChange={(e) => setDebouncedQuery(e.target.value)}
          placeholder="Search for a document name or an ID"
          size={"xl"}
        />
      </InputGroup>
      <PhotoAnalyzer onResult={(result) => props.setQuery(result)} />
    </Box>
  );
}

function SearchResults(props: { style?: CSSProperties; query: string }) {
  const [documents, setDocuments] = useState<string[]>([]);
  const [accuracies, setAccuracies] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!props.query || props.query.trim() === "") {
      setDocuments([]);
      setAccuracies([]);
      setError(null); // Clear the error when no query is made
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
        setDocuments(data.documents[0] || []);
        setAccuracies(data.accuracy[0] || []);
      })
      .catch((err) => {
        console.log(err.message);
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
        padding: "24px",
        overflowY: "scroll",
        scrollbarWidth: "thin",
        justifyItems: "center",
        justifyContent: "center",
        gap: 12,
      }}
      templateColumns={{
        base: "repeat(auto-fit, minmax(280px, 1fr))",
        md: "repeat(auto-fit, minmax(380px, 1fr))",
      }}
      width="100%"
    >
      {documents.length > 0 ? (
        documents.map((doc, index) => (
          <RelatedDocumentCard
            key={doc}
            documentId={doc}
            accuracy={accuracies[index]}
          />
        ))
      ) : (
        <div></div>
      )}
    </Grid>
  );
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  return (
    <Box
      style={{
        padding: "20px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Searchbar query={query} setQuery={setQuery} />
      <SearchResults query={query} />
    </Box>
  );
}
