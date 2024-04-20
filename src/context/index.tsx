import { createContext, useContext, useReducer, useMemo, useState, useEffect, Context } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MaterialUI = createContext<any>({});

type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string) => void;
  register: () => void;
  logout: () => void;
}

export const AuthContext: React.Context<AuthContextType> = createContext({
  isAuthenticated: false,
  login: (token: string) => {},
  register: () => {},
  logout: () => {},
} as AuthContextType);

const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const token = "placeholder-token";//localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    setIsAuthenticated(true);
    navigate(location.pathname);
  }, []);

  useEffect(() => {
    if (!token) return;

    setIsAuthenticated(isAuthenticated);
    navigate(location.pathname);
  }, [isAuthenticated]);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout } as AuthContextType}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthContextProvider');
  }
  return context;
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "CREATING_GAME": {
      return { ...state, creatingGame: action.value }
    }
    case "TRANSPARENT_SIDENAV": {
      return { ...state, transparentSidenav: action.value };
    }
    case "WHITE_SIDENAV": {
      return { ...state, whiteSidenav: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "DIRECTION": {
      return { ...state, direction: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    case "DARKMODE": {
      return { ...state, darkMode: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function MaterialUIControllerProvider({ children }: { children: React.ReactNode }) {
  const initialState = {
    miniSidenav: false,
    creatingGame: false,
    transparentSidenav: false,
    whiteSidenav: false,
    sidenavColor: "info",
    transparentNavbar: true,
    fixedNavbar: true,
    openConfigurator: false,
    direction: "ltr",
    layout: "dashboard",
    darkMode: false,
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <MaterialUI.Provider value={value}>{children}</MaterialUI.Provider>;
}

// Material Dashboard 2 React custom hook for using context
function useMaterialUIController() {
  const context = useContext(MaterialUI);

  if (!context) {
    throw new Error(
      "useMaterialUIController should be used inside the MaterialUIControllerProvider."
    );
  }

  return context;
}

const setMiniSidenav = (dispatch: any, value: boolean) => dispatch({ type: "MINI_SIDENAV", value });
const setCreatingGame = (dispatch: any, value: boolean) => dispatch({ type: "CREATING_GAME", value })
const setTransparentSidenav = (dispatch: any, value: string) => dispatch({ type: "TRANSPARENT_SIDENAV", value });
const setWhiteSidenav = (dispatch: any, value: string) => dispatch({ type: "WHITE_SIDENAV", value });
const setSidenavColor = (dispatch: any, value: string) => dispatch({ type: "SIDENAV_COLOR", value });
const setTransparentNavbar = (dispatch: any, value: string) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (dispatch: any, value: string) => dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (dispatch: any, value: string) => dispatch({ type: "OPEN_CONFIGURATOR", value });
const setDirection = (dispatch: any, value: string) => dispatch({ type: "DIRECTION", value });
const setLayout = (dispatch: any, value: string) => dispatch({ type: "LAYOUT", value });
const setDarkMode = (dispatch: any, value: string) => dispatch({ type: "DARKMODE", value });

export {
  MaterialUIControllerProvider,
  useMaterialUIController,
  AuthContextProvider,
  useAuth,
  setMiniSidenav,
  setCreatingGame,
  setTransparentSidenav,
  setWhiteSidenav,
  setSidenavColor,
  setTransparentNavbar,
  setFixedNavbar,
  setOpenConfigurator,
  setDirection,
  setLayout,
  setDarkMode,
}