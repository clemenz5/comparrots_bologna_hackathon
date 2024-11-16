import { Grid, HStack } from "@chakra-ui/react";
import RelatedDocumentCard from "./components/RelatedDocumentCard";
import MainDocumentCard from "./components/MainDocumentCard.tsx";
import { useLocation } from "react-router-dom";

export const ComparePage = () => {
  const location = useLocation();
  const documentId = location.state?.documentId;
  return (
    <HStack
      style={{
        display: "flex",
        flexDirection: "row",
        padding: "30px",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <MainDocumentCard documentId={documentId}></MainDocumentCard>
      <Grid>
        <RelatedDocumentCard documentId="2"></RelatedDocumentCard>
        <RelatedDocumentCard documentId="3"></RelatedDocumentCard>
      </Grid>
    </HStack>
  );
};
