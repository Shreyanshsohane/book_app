import React from "react";
import "./AppBar.css";
import { useNavigate } from "react-router-dom";
const AppBar: React.FC<{ isHome: boolean; isOwner: boolean }> = ({
  isHome,
  isOwner,
}) => {
  const navigate = useNavigate();
  return (
    <header className="app-bar">
      <div
        className="app-title"
        onClick={() => {
          navigate("/home-page");
        }}
      >
        <div className="app-logo"></div>
        BookSwap
      </div>

      <div className="app-actions">
        {isHome && isOwner && (
          <div
            className="profile-icon"
            onClick={() => {
              navigate("/my-books");
            }}
          >
            <div className="store-icon-svg"></div>
          </div>
        )}
        <div className="profile-icon">
          <div
            className="profile-icon-svg"
            onClick={() => {
              navigate("/user-profile");
            }}
          ></div>
        </div>
      </div>
    </header>
  );
};
export default AppBar;
