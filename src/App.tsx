import { useEffect, useState } from "react";

import "./App.css";
// import Home from "./components/Home";
import { Login } from "./components/Login";
// import WebPlayback from "./components/WebPlayback";
import WebPlayerV2 from "./components/WebPlayerV2";
import Home from "./components/Home";

function App() {
  const [token, setToken] = useState("");


  useEffect(() => {

    async function getToken() {
      const response = await fetch("http://localhost:8080/auth/token?user_id=0");
      const json = await response.json();
      // console.log("response: " + json);
      if (json.access_token === undefined) {
        console.log("undefined");
        setToken("");
      } else {
        setToken(json.access_token);
      }
    }

    getToken();

  }, []);


  return (
    <>
      {(token === "") ? <Login /> : <WebPlayerV2 token={token} />}
      {/* {(token === "") ? <Login /> : <WebPlayback token={token} />} */}
      {/* {(token === "") ? <Login /> : <Home token={token} />} */}
    </>
  );
}

export default App;
