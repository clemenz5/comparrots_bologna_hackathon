import { Box, Card, Stack } from "@chakra-ui/react";
import { useSection } from "../QueryDocuments";

export const ComparableSection = ({
  sectionText,
  onSectionClick,
}: {
  sectionText: string;
  onSectionClick: () => void;
}) => {
  return (
    <Stack
      px={4}
      py={2}
      borderRadius={4}
      onClick={() => onSectionClick()}
      cursor="pointer"
      _hover={{
        bg: "yellow.100",
        borderRadius: "md",
        transition: "background-color 0.2s ease",
      }}
    >
      <Box as="span" bg="inherit">
        {sectionText}
      </Box>
    </Stack>
  );
};

export default function MainDocumentCard(props: {
  documentId?: string;
  style?: React.CSSProperties;
  accuracy?: number;
  onSectionClick: (section: string) => void;
}) {
  const { sections, isLoading } = useSection(props.documentId);

  return (
    <Card.Root
      maxWidth="100%"

    minWidth="300px"
      width={["100%", "100%", "390px"]}
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
              onSectionClick={() => props.onSectionClick(props.documentId!)}
            />
          ))
        )}
      </Card.Body>
    </Card.Root>
  );
}
