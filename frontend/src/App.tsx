import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import "./App.css";
import { SearchPage } from "./SearchPage";
import { ComparePage } from "./ComparePage";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "@/components/ui/provider";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <BrowserRouter>
          <NavBar>
            <Routes>
              <Route path="/search" element={<SearchPage />} />
              <Route path="/compare" element={<ComparePage />} />
            </Routes>
          </NavBar>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
