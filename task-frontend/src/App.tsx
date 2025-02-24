import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
  useNavigate,
} from "react-router-dom";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Task from "./components/task/Task";

export const AuthContext = React.createContext({
  auth: false,
  setAuth: (auth: boolean) => {
    console.log(auth);
  },
});

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { auth } = React.useContext(AuthContext);
  return auth ? children : <Navigate to="/login" />;
};

const NavBar = ({
  auth,
  setAuth,
}: {
  auth: boolean;
  setAuth: (auth: boolean) => void;
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          LUMAA
        </Typography>
        {!auth ? (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

const App = () => {
  const [auth, setAuth] = useState(!!localStorage.getItem("token"));

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <Router>
        <NavBar auth={auth} setAuth={setAuth} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "calc(100vh - 64px)",
            width: "100%",
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          <div style={{ width: "100%", maxWidth: "600px" }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/tasks"
                element={
                  <PrivateRoute>
                    <Task />
                  </PrivateRoute>
                }
              />
              <Route path="/" element={<Navigate to="/tasks" />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

const AuthContainer = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => (
  <div
    style={{
      marginTop: "8vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
      padding: "24px",
      borderRadius: "8px",
      backgroundColor: "white",
      maxWidth: "100%",
    }}
  >
    <Typography component="h1" variant="h5" style={{ marginBottom: "16px" }}>
      {title}
    </Typography>
    {children}
  </div>
);

export { AuthContainer };
