import { Button, Card, Stack } from "@chakra-ui/react";
import { CSSProperties, useState, useEffect } from "react";
import { Highlight } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const ComparableSection = ({
  documentText,
}: {
  documentText: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Stack
      px={4}
      py={2}
      borderRadius={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <Highlight
          query={documentText}
          styles={{
            px: 1,
            py: 0.5,
            borderRadius: "md",
            bg: "green.100",
            fontSize: "sm",
            color: "green.800",
          }}
        >
          {documentText}
        </Highlight>
      ) : (
        documentText
      )}
    </Stack>
  );
};

export default function MainDocumentCard(props: {
  documentId?: string;
  style?: CSSProperties;
  accuracy?: number;
}) {
  const [sections, setSections] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDocumentSections() {
      // Replace this with actual API or logic to fetch document sections
      if (props.documentId) {
        const response = await fetch(
          `/api/documents/${props.documentId}/sections`
        );
        const data = await response.json();
        if (data.sections) {
          setSections(data.sections);
        } else {
          setSections(["No sections found."]);
        }
      }
    }
    fetchDocumentSections();
  }, [props.documentId]);

  return (
    <Card.Root
      width={"390px"}
      zIndex={10}
      style={{ boxShadow: "0px 4px 20px -4px #00000080" }}
    >
      <Card.Header>
        <Card.Title>Selected Document: {props.documentId}</Card.Title>
        <Card.Description></Card.Description>
      </Card.Header>
      <Card.Body>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          sections.map((section, index) => (
            <ComparableSection key={index} documentText={section} />
          ))
        )}
      </Card.Body>
      <Card.Footer>
      </Card.Footer>
    </Card.Root>
  );
}
