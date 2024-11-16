import { Grid, HStack, Stack } from "@chakra-ui/react";
import RelatedDocumentCard from "./components/RelatedDocumentCard";
import MainDocumentCard from "./components/MainDocumentCard.tsx";
import { useLocation } from "react-router-dom";
import { Key, useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { useNavigate } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";

export const ComparePage = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const documentId = urlParams.get("documentId");
  const navigate = useNavigate();
  const [relatedDocumentsToShow, setRelatedDocumentsToShow] = useState<
    string[] | undefined
  >();
  const [sectionClicked, setSectionClicked] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (sectionClicked) {
      (async () => {
        const response = await fetch(
          `https://lh9lxctqeb3213-644110db-8080.proxy.runpod.net/api/getSimilarParagraphs?paragraph=${sectionClicked}`
        );
        const data = await response.json();
        setRelatedDocumentsToShow(data.relatedDocuments);
      })();
    }
  }, [sectionClicked]);

  return (
    <Stack>
      <Button
        variant="outline"
        colorPalette="green"
        style={{
          width: "200px",
          marginRight: "20px",
          marginLeft: "10px",
        }}
        onClick={() => {
          navigate("/search");
        }}
      >
        <RiArrowLeftLine />
        Go back to search
      </Button>
      <HStack
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "30px",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <MainDocumentCard
          documentId={documentId ?? ""}
          onSectionClick={(section) => setSectionClicked(section)}
        ></MainDocumentCard>
        {relatedDocumentsToShow && (
          <Grid gap="30px">
            {relatedDocumentsToShow.map(
              (
                relatedDocument: string | undefined,
                index: Key | null | undefined
              ) => (
                <RelatedDocumentCard
                  key={index}
                  documentId={relatedDocument}
                  style={{
                    padding: `0 ${
                      relatedDocumentsToShow.length > 1
                        ? index === 0
                          ? "30px"
                          : "15px"
                        : "0"
                    }`,
                  }}
                ></RelatedDocumentCard>
              )
            )}
          </Grid>
        )}
      </HStack>
    </Stack>
  );
};
