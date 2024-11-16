import { Button, Card, Stack } from "@chakra-ui/react";
import { CSSProperties, useState, useEffect } from "react";
import { Highlight } from "@chakra-ui/react";
import { useDocumentSections } from "../QueryDocuments";

export const ComparableSection = ({
  sectionText,
  findRelatedCases,
}: {
  sectionText: string;
  findRelatedCases: (text: string) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleClick = () => findRelatedCases(sectionText);
  return (
    <Stack
      px={4}
      py={2}
      borderRadius={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      cursor="pointer"
    >
      {isHovered ? (
        <Highlight
          query={sectionText}
          styles={{
            px: 1,
            py: 0.5,
            borderRadius: "md",
            bg: "green.100",
            fontSize: "sm",
            color: "green.800",
          }}
        >
          {sectionText}
        </Highlight>
      ) : (
        sectionText
      )}
    </Stack>
  );
};

export default function MainDocumentCard(props: {
  documentId?: string;
  style?: React.CSSProperties;
  accuracy?: number;
  onSectionClick: () => void;
}) {
  const { sections, isLoading } = useDocumentSections(props.documentId);
  return (
    <Card.Root
      width={"390px"}
      zIndex={10}
      style={{ boxShadow: "0px 4px 20px -4px #00000080" }}
    >
      <Card.Header>
        <Card.Title>Selected Document: {props.documentId}</Card.Title>
      </Card.Header>
      <Card.Body>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          sections.map((section, index) => (
            <ComparableSection
              key={index}
              sectionText={section}
              findRelatedCases={function (text: string): void {
                throw new Error("Function not implemented.");
              }}
            />
          ))
        )}
      </Card.Body>
    </Card.Root>
  );
}
