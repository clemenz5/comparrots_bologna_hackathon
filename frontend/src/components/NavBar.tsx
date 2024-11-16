import { Button } from "@chakra-ui/react";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "100%",
        padding: "20px",
        flexDirection: "row",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#282c34",
      }}
    >
      <img
        style={{
          height: "50px",
          width: "50px",
          marginLeft: "20px",
          borderRadius: "10px",
        }}
        src={"/comparrotor_logo.png"}
        className="App-logo"
        alt="logo"
      />
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
      <nav style={{ justifyContent: "space-between", alignItems: "center", marginRight: "20px" }}>
        <Button
          onClick={() => {
            navigate("/search");
          }}
        >
          Search
        </Button>
        <Button
          onClick={() => {
            navigate("/compare");
          }}
        >
          Comparison
        </Button>
      </nav>
      </div>
    </div>
  );
};

export const NavBar = (props: { children: ReactElement }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Header />
      {props.children}
    </div>
  );
};
