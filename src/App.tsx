import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./components/routes/Routes";
import "./components/styles/index.css";

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
