import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import "./App.css";
import { SearchPage } from "./SearchPage";
import { ComparePage } from "./ComparePage";
import { Provider } from "./components/ui/provider";
function App() {
  return (
    <div className="App">
      <Provider>
        <BrowserRouter>
          <NavBar>
            <Routes>
              <Route path="/" element={<Navigate to={"/search"} />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/compare" element={<ComparePage />} />
            </Routes>
          </NavBar>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
