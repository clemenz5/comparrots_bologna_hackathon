import { ReactElement } from "react";
import { ColorModeButton } from "./ui/color-mode";
import { Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <div
      style={{
        width: "100%",
        padding: "20px",
        flexDirection: "row",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "backgroundColor.700",
        borderBottom: "1px solid #333",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
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
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "auto",
        }}
      >
        <Text
          fontSize={"30px"}
          style={{ fontSize: "30px" }}
          textAlign={"center"}
        >
          Comparrit
        </Text>
      </div> */}
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
