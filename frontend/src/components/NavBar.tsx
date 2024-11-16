import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { ColorModeButton } from "./ui/color-mode";

const Header = () => {
  
  return (
    <div
      style={{
        width: "100%",
        padding: "20px",
        flexDirection: "row",
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        backgroundColor: "#F2F2F2",
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
      <ColorModeButton style={{ marginLeft: "20px" }} />
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
