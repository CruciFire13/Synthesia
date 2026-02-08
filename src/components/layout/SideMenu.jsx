import React from "react";
import { IoIosSettings } from "react-icons/io";
import "../../css/sidemenu/SideMenu.css"; // Ensure this path is correct
import { CiUser } from "react-icons/ci";
import { AiOutlineHome, AiOutlineSearch, AiOutlineHeart } from "react-icons/ai";

const SideMenu = ({ setView, view, user }) => {
  const getNavBtnClass = (item) =>
    `sidemenu-nav-btn ${view === item ? "active" : ""}`;

  return (
    <aside className="sidemenu-root">
      {/* 1. Logo Section */}
      <div className="sidemenu-header">
        <h2 className="sidemenu-logo-title">Synthesia</h2>
      </div>

      {/* 2. Navigation Links */}
      <nav className="sidemenu-nav" aria-label="Main navigation">
        <ul className="sidemenu-nav-list">
          <li>
            <button
              className={getNavBtnClass("home")}
              onClick={() => setView("home")}
            >
              <AiOutlineHome className="sidemenu-nav-icon" size={20} />
              <span>Home</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setView("search")}
              className={getNavBtnClass("search")}
            >
              <AiOutlineSearch className="sidemenu-nav-icon" size={20} />
              <span>Search</span>
            </button>
          </li>
          <li>
            <button
              className={getNavBtnClass("favourite")}
              onClick={() => setView("favourite")}
            >
              <AiOutlineHeart className="sidemenu-nav-icon" size={20} />
              <span>Favourite</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* 3. Profile Footer (The Update) */}
      <div className="sidemenu-profile-row">
        <div className="profile-placeholder">
          {/* Check if user exists and has a profile picture */}
          {user && user.profilePic ? (
            <img
              src={user.profilePic}
              alt={user.name}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            // Default Icon if no user or no picture
            <CiUser size={24} />
          )}
        </div>

        <div className="sidemenu-username-wrapper">
          {/* Display User Name or Fallback to Guest */}
          <div className="sidemenu-username">{user ? user.name : "Guest"}</div>
        </div>

        <div className="settings-container">
          <button type="button" className="sidemenu-settings-btn">
            <IoIosSettings size={20} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideMenu;
