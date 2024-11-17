import { Grid, HStack, Stack } from "@chakra-ui/react";
import RelatedDocumentCard from "./components/RelatedDocumentCard";
import MainDocumentCard from "./components/MainDocumentCard.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { Key, useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { RiArrowLeftLine } from "react-icons/ri";

export const ComparePage = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const documentId = urlParams.get("documentId");
  const navigate = useNavigate();
  const [relatedDocumentsToShow, setRelatedDocumentsToShow] = useState<
    { documents: string[]; accuracy: number[] } | undefined
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
        setRelatedDocumentsToShow(data);
      })();
    }
  }, [sectionClicked]);

  return (
    <Stack>
      <HStack justifyContent="space-between" px="40px" py="20px">
        <Button
          variant="outline"
          colorPalette="green"
          onClick={() => {
            navigate("/search");
          }}
        >
          <RiArrowLeftLine />
          Go back to search
        </Button>
      </HStack>
      <HStack alignItems="flex-start" justifyContent={"center"} px="30px">
        <MainDocumentCard
          documentId={documentId ?? ""}
          onSectionClick={(section) => setSectionClicked(section)}
        />
        {relatedDocumentsToShow && (
          <Grid gap={4}>
            {relatedDocumentsToShow.documents[0].map(
              (relatedDocument: string | undefined, index: number) => (
                <RelatedDocumentCard
                  key={index! as Key}
                  documentId={relatedDocument}
                  accuracy={relatedDocumentsToShow.accuracy[0][index]}
                  style={{
                    padding:
                      relatedDocumentsToShow.length > 1
                        ? index === 0
                          ? "30px"
                          : "15px"
                        : "0",
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
