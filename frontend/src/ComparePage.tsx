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
  const relatedDocuments = urlParams.getAll("relatedDocuments");
  const numberOfRelatedDocuments = relatedDocuments.length;
  const navigate = useNavigate();
  const [relatedDocumentsToShow, setRelatedDocumentsToShow] = useState<
    string[] | undefined
  >();
  const [sectionClicked, setSectionClicked] = useState(false);

  useEffect(() => {
    if (sectionClicked) {
      setRelatedDocumentsToShow(relatedDocuments);
    }
  }, [sectionClicked, relatedDocuments]);

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
          onSectionClick={() => setSectionClicked(true)}
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
                      numberOfRelatedDocuments > 1
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
