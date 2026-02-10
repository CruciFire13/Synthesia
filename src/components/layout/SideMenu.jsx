import React, { useState } from "react";
import { IoIosSettings } from "react-icons/io";
import "../../css/sidemenu/SideMenu.css";
import { CiUser } from "react-icons/ci";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineClose,
} from "react-icons/ai";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const SideMenu = ({ setView, view, user }) => {
  const [showModal, setShowModal] = useState(false);

  // Modal State
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const getNavBtnClass = (item) =>
    `sidemenu-nav-btn ${view === item ? "active" : ""}`;

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Saving changes...", { currentPass, newPass });
    // Add your API call logic here
    setShowModal(false);
  };

  return (
    <>
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

        {/* 3. Profile Footer (Clickable to Open Modal) */}
        <div
          className="sidemenu-profile-row"
          onClick={() => user && setShowModal(true)}
          style={{ cursor: user ? "pointer" : "default" }}
        >
          <div className="profile-placeholder">
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
              <CiUser size={24} />
            )}
          </div>

          <div className="sidemenu-username-wrapper">
            <div className="sidemenu-username">
              {user ? user.name : "Guest"}
            </div>
          </div>

          <div className="settings-container">
            <button type="button" className="sidemenu-settings-btn">
              <IoIosSettings size={20} />
            </button>
          </div>
        </div>
      </aside>

      {/* --- EDIT PROFILE MODAL --- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
            {/* Header */}
            <div className="modal-header">
              <h3>Edit Profile</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <AiOutlineClose size={20} />
              </button>
            </div>

            <p className="modal-subtitle">Update your account Details</p>

            <form onSubmit={handleSave}>
              {/* Current Password */}
              <div className="input-group">
                <label>Current Password</label>
                <div className="input-wrapper">
                  <input
                    type={showCurrentPass ? "text" : "password"}
                    placeholder="Enter current password"
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                  >
                    {showCurrentPass ? <BsEyeSlash /> : <BsEye />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="input-group">
                <label>New Password</label>
                <div className="input-wrapper">
                  <input
                    type={showNewPass ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                  >
                    {showNewPass ? <BsEyeSlash /> : <BsEye />}
                  </button>
                </div>
              </div>

              <div className="modal-link">
                <a href="#">Cancel Password Change</a>
              </div>

              {/* Footer Buttons */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  SAVE CHANGES
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SideMenu;
