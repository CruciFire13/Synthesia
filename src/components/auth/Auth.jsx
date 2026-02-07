import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

const Auth = () => {
  return (
    <div className="flex items-center justify-end gap-6">
      {/* 1. VIEW WHEN LOGGED OUT */}
      <SignedOut>
        {/* Sign Up Button (Text Style) */}
        <SignUpButton mode="modal">
          <button className="text-gray-400 hover:text-white font-medium text-sm transition tracking-wide cursor-pointer">
            Signup
          </button>
        </SignUpButton>

        {/* Login Button (White Pill Style) */}
        <SignInButton mode="modal">
          <button className="bg-white text-black px-8 py-2 rounded-full text-sm font-bold hover:scale-105 transition shadow-lg shadow-purple-500/10 cursor-pointer">
            Login
          </button>
        </SignInButton>
      </SignedOut>

      {/* 2. VIEW WHEN LOGGED IN */}
      <SignedIn>
        <div className="flex items-center gap-4">
          <span className="text-white font-medium text-sm hidden md:block">
            {/* Optional: Show user's name if you want */}
          </span>
          {/* The Circular Profile Menu */}
          <UserButton afterSignOutUrl="/" />
        </div>
      </SignedIn>
    </div>
  );
};

export default Auth;
