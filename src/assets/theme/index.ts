import { PaletteOptions, createTheme } from "@mui/material/styles";

import colors, { PalletCollorsFull } from "assets/theme/base/colors";

import breakpoints from "assets/theme/base/breakpoints";
import globals from "assets/theme/base/globals";
import borders, { SystemBorders } from "assets/theme/base/borders";
import boxShadows, { BoxShadowsType } from "assets/theme/base/boxShadows";
import systemConsts, { SystemConstsType } from "assets/theme/base/systemConsts";

import container from "assets/theme/components/container";
import sidenav from "assets/theme/components/sidenav";
import icon from "assets/theme/components/icon";
import button from "assets/theme/components/button";
import input from "assets/theme/components/form/input";
import inputLabel from "assets/theme/components/form/inputLabel";
import inputOutlined from "assets/theme/components/form/inputOutlined";
import textField from "assets/theme/components/form/textField";
import breadcrumbs from "assets/theme/components/breadcrumbs";
import link from "assets/theme/components/link";

import pxToRem from "assets/theme/functions/pxToRem";
import linearGradient from "assets/theme/functions/linearGradient";
import boxShadow from "assets/theme/functions/linearGradient";

declare module "@mui/material/styles" {
  interface Theme {
    functions: {
      [key: string]: (...p: any) => any;
    };

    palette: PaletteOptions & PalletCollorsFull;
    borders: SystemBorders;
    boxShadows: BoxShadowsType;
    systemConsts: SystemConstsType;
  }
  interface ThemeOptions {
    functions?: {
      [key: string]: (...p: any) => any;
    };
    borders: SystemBorders;
    boxShadows: BoxShadowsType;
    systemConsts: SystemConstsType;
  }
}

export default createTheme({
  breakpoints: { ...breakpoints },
  palette: { ...colors },
  borders: { ...borders },
  boxShadows: { ...boxShadows },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
        ...container,
      },
    },
    MuiDrawer: { ...sidenav },
    MuiButton: { ...button },
    MuiInput: { ...input },
    MuiInputLabel: { ...inputLabel },
    MuiOutlinedInput: { ...inputOutlined },
    MuiTextField: { ...textField },
    MuiIcon: { ...icon },
    MuiBreadcrumbs: { ...breadcrumbs },
    MuiLink: { ...link },
  },
  systemConsts: { ...systemConsts },
  functions: {
    pxToRem,
    linearGradient,
    boxShadow,
  }
});