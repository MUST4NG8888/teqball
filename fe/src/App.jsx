import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./routes/RootLayout";
import Home from "./pages/Home";
import LoginFinished from "./pages/LoginFinished";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/loginfinished", element: <LoginFinished /> },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
