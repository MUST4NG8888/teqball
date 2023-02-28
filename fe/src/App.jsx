import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./routes/RootLayout";
import Home from "./pages/Home";
import LoginFinished from "./pages/LoginFinished";
import { UserProvider } from "./context/UserContext";
import { ChakraProvider } from "@chakra-ui/react";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/loginfinished", element: <LoginFinished /> },
      { path: "/dashboard", element: <Dashboard /> },
    ],
  },
]);

const App = () => {
  return (
    <ChakraProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ChakraProvider>
  );
};

export default App;
