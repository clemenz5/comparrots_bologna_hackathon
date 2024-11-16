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
      }}
    >
      <img style={{height:"50px", width:"50px", marginLeft:"20px", borderRadius:"10px"}} src={"/comparrotor_logo.png"} className="App-logo" alt="logo" />
      <nav>
        <Button
          onClick={() => {
            navigate("/search");
          }}
        >
          Home
        </Button>
        <Button
          onClick={() => {
            navigate("/compare");
          }}
        >
          Compare
        </Button>
      </nav>
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
