import { Button, Card, HStack, Icon, Stack, Tag } from "@chakra-ui/react";
import { CSSProperties, useState } from "react";

const ComparableSection = () => {
  return <Stack>Comparable Section</Stack>;
};

export default function MainDocumentCard(props: {
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
            <ComparableSection></ComparableSection>
            <HStack>
              <Button size="sm" colorScheme="green">
                Close
              </Button>
              <Button size="sm" colorScheme="red">
                Delete
              </Button>
            </HStack>
          </Card.Description>
        </Card.Header>
      </Card.Body>
    </Card.Root>
  );
}
