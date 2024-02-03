import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GameRoom from "./pages/GameRoom";
import JoinRoom from "./pages/JoinRoom";
import { ProtectedRoutes } from "./pages/ProtectedRoute";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/room/:roomId",
        element: <GameRoom />,
      },
      {
        path: "/join/:roomId",
        element: <JoinRoom />,
      },
    ],
  },
]);
