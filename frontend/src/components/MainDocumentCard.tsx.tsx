import { Card, Stack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Highlight } from "@chakra-ui/react";
import { useDocumentSections, useSection } from "../QueryDocuments";

export const ComparableSection = ({
  sectionText,
  onSectionClick,
}: {
  sectionText: string;
  onSectionClick: (relatedSection: string) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleClick = () => onSectionClick(sectionText);
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
  onSectionClick: (relatedSection: string) => void;
}) {
  const { sections, isLoading } = useSection(props.documentId);

  return (
    <Card.Root
      width={"390px"}
      zIndex={10}
      style={{ boxShadow: "0px 4px 20px -4px #00000080" }}
    >
      <Card.Header
        style={{
          backgroundColor: "#C1FCD5",
          color: "green.800",
          paddingBottom: "20px",
        }}
      >
        <Card.Title>Selected document: {props.documentId}</Card.Title>
      </Card.Header>
      <Card.Body>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          sections.map((section, index) => (
            <ComparableSection
              key={index}
              sectionText={section}
              onSectionClick={props.onSectionClick}
            />
          ))
        )}
      </Card.Body>
    </Card.Root>
  );
}
