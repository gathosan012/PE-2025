import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Authentication from "./pages/Authentication";
import Home from "./pages/Home";
import Room from "./pages/Room";
import AddRoomForm from "./components/AddRoomForm";
import EditRoomForm from "./components/EditRoomForm";
import Service from "./pages/Service";
import ServiceForm from "./pages/ServiceForm";
import AddCustomerForm from "./components/AddCustomerForm";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Authentication />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/rooms",
    element: <Room />,
  },
  /*{
    path: "/rooms",
    element: <AddRoomForm />,
  },
  {
    path: "/rooms/edit/:id",
    element: <EditRoomForm />,
  },*/
  { path: "/service", element: <Service /> },
  { path: "/service/edit", element: <ServiceForm /> },
  { path: "/add-customer/:roomId", element: <AddCustomerForm /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
