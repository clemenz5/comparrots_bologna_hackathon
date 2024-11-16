import { Button, Card, HStack } from "@chakra-ui/react";
import { CSSProperties } from "react";

export default function RelatedDocumentCard(props: {
  documentId?: string;
  style?: CSSProperties;
}) {
  return (
    <Card.Root
      width={"390px"}
      zIndex={10}
      style={{ boxShadow: "0px 4px 20px -4px #00000080" }}
    >
      <Card.Body>
        <Card.Header>
          <Card.Title>{props.documentId}</Card.Title>
          <Card.Description>
            <HStack>
              <Button size="sm" variant={"outline"} color={"green"}>
                Close
              </Button>
              <Button size="sm" variant={"solid"} color={"green"}>
                Delete
              </Button>
            </HStack>
          </Card.Description>
        </Card.Header>
      </Card.Body>
    </Card.Root>
  );
}
