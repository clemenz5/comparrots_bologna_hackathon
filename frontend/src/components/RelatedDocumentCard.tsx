import { Button } from "./ui/button";
import { Card } from "@chakra-ui/react";
import { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { useDocumentSections } from "../QueryDocuments";

export default function RelatedDocumentCard(props: {
  documentId?: string;
  style?: CSSProperties;
  accuracy?: number;
}) {
  const navigate = useNavigate();
  const navigateToComparePage = () => {
    navigate(`/compare?documentId=${props.documentId}`);
  };

  const { sections, isLoading } = useDocumentSections(props.documentId);

  return (
    <Card.Root
      maxWidth="100%"
      width={["100%", "100%", "390px"]}
      zIndex={10}
      style={{ boxShadow: "0px 4px 20px -4px #00000080" }}
    >
      <Card.Header>
        <Card.Title>{props.documentId}</Card.Title>
        <Card.Description></Card.Description>
      </Card.Header>
      <Card.Body>{isLoading ? <div>Loading...</div> : sections[0]}</Card.Body>
      <Card.Footer style={{ justifyContent: "center" }}>
        <Button
          colorPalette="green"
          onClick={navigateToComparePage}
          disabled={!props.documentId} // Disable button if no documentId is provided
        >
          Compare Document
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
