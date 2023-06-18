import { useLogin } from "@refinedev/core";
import { useEffect, useRef } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { CredentialResponse } from "../interfaces/google";
import { yariga } from "assets";

// Todo: Update your Google Client ID here
const GOOGLE_CLIENT_ID =
'328665443497-bs1os2arpmldt1pmokr0ro29oqanljhe.apps.googleusercontent.com'

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "filled_blue",
          size: "medium",
          type: "standard",
        });
      } catch (error) {
        console.log(error);
      }
    }, []);

    return <div ref={divRef} />;
  };

  return (
    <Container component="div" sx={{ backgroundColor: "#fcfcfc"}}
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        display="flex"
        gap="36px"
        justifyContent="center"
        flexDirection="column"
      >
       
        <Typography align="center" color={"text.secondary"} fontSize="12px">
          <img
            style={{ padding: "0 5px" }}
            alt="yariga Logo"
            src={yariga}
          />
        </Typography>

        <GoogleButton />

        
      </Box>
    </Container>
  );
};
