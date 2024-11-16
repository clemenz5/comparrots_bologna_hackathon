import { Button, Card } from "@chakra-ui/react";
import { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";

export default function RelatedDocumentCard(props: {
  documentId?: string;
  style?: CSSProperties;
  accuracy?: number;
}) {
  const navigate = useNavigate();
  const navigateToComparePage = () => {
    navigate(`/compare?documentId=${props.documentId}`);
  };

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
      <Card.Body></Card.Body>
      <Card.Footer>
        <Button
          colorScheme="blue"
          onClick={navigateToComparePage}
          disabled={!props.documentId} // Disable button if no documentId is provided
        >
          Compare Document
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
