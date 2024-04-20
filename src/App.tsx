import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import theme from "assets/theme";

import logo from "./logo.svg";
import "./App.css";
import Sidenav from "components/Sidenav";
import { Routes } from "react-router-dom";
import Games from "layouts/games";
import CreateGame from "layouts/create-game";

declare module "@mui/material/styles" {
  interface Theme {
    functions: {
      [key: string]: (...p: any) => any;
    };
  }
  interface ThemeOptions {
    functions?: {
      [key: string]: (...p: any) => any;
    };
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Sidenav brandName="Marca" />
      <CreateGame />
      <Games></Games>
      {/* <Routes>
        
      </Routes> */}
    </ThemeProvider>
  )
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
