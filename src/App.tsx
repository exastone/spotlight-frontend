import { useEffect, useState } from "react";

import "./App.css";
import { Login } from "./components/Login";
import WebPlayerV2 from "./components/WebPlayerV2";
import { AccessToken } from "@spotify/web-api-ts-sdk";
import WebAPI from "./components/WebAPI";
import WebAPIController from "./components/WebAPIController";
// import WebPlayback from "./components/WebPlayback";

function App() {
  const [token, setToken] = useState<AccessToken>(
    {
      access_token: "",
      token_type: "",
      expires_in: 0,
      refresh_token: "",
      expires: 0
    });


  useEffect(() => {

    async function getToken() {
      const response = await fetch("http://localhost:8080/auth/token?user_id=0");
      const json = await response.json();
      if (json.access_token === undefined) {
        console.log("undefined");
        setToken({
          access_token: "",
          token_type: "Bearer",
          expires_in: 0,
          refresh_token: "",
          expires: 0
        });
      } else {
        console.log(json)
        setToken(json);
      }
    }

    getToken();

  }, []);


  return (
    <>
      {token.access_token === "" ? <Login /> :
        <div>
          <WebPlayerV2 token={token} />
          <WebAPI token={token}>
            <WebAPIController />
          </WebAPI>
        </div>
      }
    </>
  );
}

export default App;
