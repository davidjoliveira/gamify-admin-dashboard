import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { Button, Divider, Icon } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import GVBox from "components/GVBox";
import GVTypography from "components/GVTypography";
import SidenavRoot, { SidenavRootType } from "./SidenavRoot";

import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
  setCreatingGame,
} from "context";
import { ExtraColorKeys, GradientKeys } from "assets/theme/base/colors";

type SidenavType = {
  color?: GradientKeys & ExtraColorKeys;
  brand?: string;
  brandName?: string
  routes?: Array<any>;
} & Partial<SidenavRootType>

export default function Sidenav({ color, brand, brandName, routes, ...rest }: SidenavType) {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } = controller;

  let textColor = "text";
  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  }

  const closeSidenav = () => setMiniSidenav(dispatch, !miniSidenav);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(dispatch, window.innerWidth < 1200 ? false : transparentSidenav);
      setWhiteSidenav(dispatch, window.innerWidth < 1200 ? false : whiteSidenav);
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch]);

  const handleCreateGame = () => setCreatingGame(dispatch, true);

  return (
    <SidenavRoot variant="permanent" component="aside" open={miniSidenav} {...rest} ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}>
      <GVBox variant="inherit" pt={3} pb={1} px={4} textAlign="center">
        <GVBox
          variant="inherit"
          display={{ xs: "block" }}
          position="absolute"
          top={0}
          right={0}
          p={1.225}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <GVTypography variant="h6" color={"secondary" as GradientKeys & ExtraColorKeys}>
            <CloseIcon sx={{ fontWeight: "bold" }} />
          </GVTypography>
        </GVBox>
        {!miniSidenav && 
          <GVBox variant="inherit" component={NavLink} to="/" display="flex" alignItems="center">
            {brand && <GVBox component="img" src={brand} alt="Brand" width="2rem" />}
            <GVBox
              variant="inherit"
              width={!brandName && "100%"}
              // sx={(theme: Theme) => sidenavLogoLabel(theme, { miniSidenav })}
            >
              <GVTypography component="h6" variant="button" fontWeight="bold" color={textColor as GradientKeys & ExtraColorKeys}>
                {brandName}
              </GVTypography>
            </GVBox>
          </GVBox>
        }
        {miniSidenav && 
          <></>
        }
      </GVBox>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <Button onClick={handleCreateGame}>Create game</Button>
    </SidenavRoot>
  );
}