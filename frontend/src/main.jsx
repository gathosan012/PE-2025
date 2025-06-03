import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//import Authentication from "./pages/Authentication";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./pages/Home";
import Room from "./pages/Room";
import AddRoomForm from "./components/AddRoomForm";
import EditRoomForm from "./components/EditRoomForm";
import Service from "./pages/Service";
import ServiceForm from "./pages/ServiceForm";
import AddCustomerForm from "./components/AddCustomerForm";
import Electric from "./pages/Electric.jsx";
import Water from "./pages/Water.jsx";
import Welcome from "./pages/Welcome.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/rooms",
    element: <Room />,
  },
  {
    path: "/rooms",
    element: <AddRoomForm />,
  },
  { path: "/rooms/edit/:id", element: <EditRoomForm /> },
  { path: "/add-customer/:roomId", element: <AddCustomerForm /> },
  { path: "/add-customer/:roomId/:contractId", element: <AddCustomerForm /> },
  { path: "/service", element: <Service /> },
  { path: "/service/edit", element: <ServiceForm /> },
  {
    path: "/electric",
    element: <Electric />,
  },
  {
    path: "/water",
    element: <Water />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
