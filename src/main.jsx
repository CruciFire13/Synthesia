import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { PlayerProvider } from "./context/PlayerProvider";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY =
  "pk_test_bWFzc2l2ZS1zaGVlcC05OS5jbGVyay5hY2NvdW50cy5kZXYk";

if (!PUBLISHABLE_KEY || PUBLISHABLE_KEY.includes("YOUR_ACTUAL_KEY")) {
  throw new Error("Missing Clerk Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <PlayerProvider>
        <App />
      </PlayerProvider>
    </ClerkProvider>
  </React.StrictMode>,
);
