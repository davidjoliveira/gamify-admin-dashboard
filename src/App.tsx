import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import theme from "assets/theme";

import "./App.css";
import Sidenav from "components/Sidenav";
import { Navigate, Route, Routes } from "react-router-dom";
import Games from "layouts/games";
import ViewGame from "layouts/games/view-game/ViewGame";
import CreateGame from "layouts/create-game";
import CreateAttributes from "layouts/create-attributes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Sidenav brandName="Marca" />
      <CreateGame />
      <Routes>
        <Route path="/" Component={Games} />
        <Route path="/game/:id" >
          <Route index Component={ViewGame} />
          <Route path="attributes" element={<CreateAttributes />} />
          <Route path="edit" element={<h1>Edit gameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
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
