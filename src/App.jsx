import React, { useState } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";

// 1. Layout Imports
import SideMenu from "./components/layout/SideMenu";
import MainArea from "./components/layout/MainArea";

// 2. Player Import (CORRECTED based on your file tree)
// Use ControlArea if that is your main player footer
import Player from "./components/layout/Footer";

import { PlayerProvider } from "./context/PlayerProvider";
import "./App.css";

function App() {
  const [view, setView] = useState("home");
  const { user: clerkUser, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();

  const user =
    isSignedIn && clerkUser
      ? {
          name: clerkUser.fullName || clerkUser.firstName,
          profilePic: clerkUser.imageUrl,
        }
      : null;

  const handleLogout = async () => {
    await signOut();
  };

  if (!isLoaded)
    return <div style={{ color: "white", padding: "20px" }}>Loading...</div>;

  return (
    <PlayerProvider>
      <div className="app-container">
        <SideMenu view={view} setView={setView} user={user} />

        <MainArea view={view} user={user} onLogout={handleLogout} />

        {/* The Player Footer */}
        <div className="player-container">
          <Player />
        </div>
      </div>
    </PlayerProvider>
  );
}

export default App;
