import { useEffect, useState } from "react";

export const useDocumentSections = (documentId?: string) => {
  const [sections, setSections] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!documentId) return;
    const fetchDocumentSections = async () => {
      setIsLoading(true);
      try {
        const id = documentId.split(":");
        const response = await fetch(
          `https://lh9lxctqeb3213-644110db-8080.proxy.runpod.net/api/getFile?id=${id[0]}:${id[1]}`
        );
        const data = await response.json();
        setSections(data || ["No sections found."]);
      } catch (error) {
        console.error("Error fetching document sections:", error);
        setSections(["Failed to load sections."]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDocumentSections();
  }, [documentId]);

  return { sections, isLoading };
};

export const useSection = (sectionId?: string) => {
  const [sections, setSections] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!sectionId) return;
    const fetchDocumentSections = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://lh9lxctqeb3213-644110db-8080.proxy.runpod.net/api/getParagraphById?id=${sectionId}`
        );
        const data = await response.json();
        setSections(data || ["No sections found."]);
      } catch (error) {
        console.error("Error fetching document sections:", error);
        setSections(["Failed to load sections."]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDocumentSections();
  }, [sectionId]);

  return { sections, isLoading };
};
