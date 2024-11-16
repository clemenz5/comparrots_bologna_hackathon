import { IconButton, Input, VStack } from "@chakra-ui/react";
import { InputGroup } from "./components/ui/input-group";
import { LuSearch } from "react-icons/lu";

export const SearchPage = () => {
  return (
    <div>
      <VStack align="middle">
        <InputGroup startElement={<LuSearch />}>
          <Input placeholder="Search for documents" />
        </InputGroup>
      </VStack>
    </div>
  );
};
