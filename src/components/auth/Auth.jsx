import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import "../../css/auth/Auth.css";

const Auth = () => {
  const { user } = useUser();

  return (
    <div className="auth-wrapper">
      {/* 1. VIEW WHEN LOGGED OUT (Show Login/Signup Buttons) */}
      <SignedOut>
        <div className="auth-container">
          {/* Clerk Signup Button Trigger */}
          <SignUpButton mode="modal">
            <button className="auth-btn signup">Signup</button>
          </SignUpButton>

          {/* Clerk Login Button Trigger */}
          <SignInButton mode="modal">
            <button className="auth-btn login">Login</button>
          </SignInButton>
        </div>
      </SignedOut>

      {/* 2. VIEW WHEN LOGGED IN (Show User Profile) */}
      <SignedIn>
        <div className="flex items-center gap-4 bg-white/10 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
          {/* Greeting */}
          <span className="text-white font-medium text-sm hidden md:block">
            Hi, {user?.firstName || "User"}
          </span>

          {/* Clerk Profile Circle (Handles Logout automatically) */}
          <UserButton afterSignOutUrl="/" />
        </div>
      </SignedIn>
    </div>
  );
};

export default Auth;
