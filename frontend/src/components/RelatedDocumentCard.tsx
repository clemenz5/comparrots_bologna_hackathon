import { Button } from "./ui/button";
import { Card } from "@chakra-ui/react";
import { CSSProperties, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSection } from "../QueryDocuments";
import { Text } from "@chakra-ui/react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "./ui/dialog";

export default function RelatedDocumentCard(props: {
  documentId?: string;
  style?: CSSProperties;
  accuracy?: number;
}) {
  const navigate = useNavigate();
  const navigateToComparePage = () => {
    navigate(`/compare?documentId=${props.documentId}`);
  };

  const { sections, isLoading } = useSection(props.documentId);
  const [open, setOpen] = useState(false);

  return (
    <Card.Root
      maxWidth="100%"
      minWidth="300px"
      width={["100%", "100%", "390px"]}
      zIndex={10}
      style={{ boxShadow: "0px 4px 20px -4px #00000080" }}
    >
      <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Document: {props.documentId}</DialogTitle>
          </DialogHeader>
          <DialogBody>
            {sections ? sections[0] : "No sections found."}
          </DialogBody>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
      <Card.Header>
        <Card.Title>{props.documentId}</Card.Title>
        <Text
          style={{
            display: "inline-block",
            padding: "5px",
            backgroundColor: "#F6E05E",
            borderRadius: "5px",
            width: "fit-content",
          }}
        >
          Similarity:{" "}
          {props.accuracy !== undefined && props.accuracy !== null
            ? `${Math.round((1 - props.accuracy) * 100)}%`
            : "N/A"}
        </Text>
        <Card.Description></Card.Description>
      </Card.Header>
      <Card.Body onClick={() => setOpen(true)}>
        {isLoading || !sections || !sections[0] ? (
          <div>Loading...</div>
        ) : sections[0].length > 300 ? (
          `${sections[0].slice(0, 300)}...`
        ) : (
          sections[0]
        )}
      </Card.Body>
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
