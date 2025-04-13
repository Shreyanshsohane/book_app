import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import AppBar from "../components/AppBar";
import getUser from "../services/api/user";

interface UserData {
  _id: string;
  name: string;
  email: string;
  mobileNumber: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface SnackbarProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

// Simple Snackbar component
const Snackbar: React.FC<SnackbarProps> = ({ message, type, onClose }) => {
  return (
    <div className={`snackbar ${type}`}>
      <span>{message}</span>
      <button className="snackbar-close" onClick={onClose}>
        ×
      </button>
    </div>
  );
};

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [editMode, setEditMode] = useState<Record<string, boolean>>({
    name: false,
    mobileNumber: false,
  });
  const [editedData, setEditedData] = useState<Partial<UserData>>({});
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    show: false,
    message: "",
    type: "success" as "success" | "error",
  });
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isOwner, setIsOwner] = useState<boolean>();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setIsOwner(parsedUser.role === "owner");
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const response = await getUser();
      setUserData(response.user);
      setEditedData({
        name: response.user.name,
        mobileNumber: response.user.mobileNumber,
      });
    } catch (error) {
      showSnackbar("Error fetching user data", "error");
      console.error("Error fetching user:", (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleEditMode = (field: string) => {
    const newEditMode = { ...editMode, [field]: !editMode[field] };
    setEditMode(newEditMode);
    setShowSaveButton(Object.values(newEditMode).some(Boolean));

    // If canceling edit, reset to original value
    if (editMode[field] && userData) {
      setEditedData((prev) => ({
        ...prev,
        [field]: userData[field as keyof UserData],
      }));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveChanges = async () => {
    try {
      setIsLoading(true);

      // Here you would call your saveUser API with the editedData
      // const response = await saveUser(editedData);

      // Mock API call for demonstration
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update user data with edited values
      if (userData) {
        const updatedUserData = {
          ...userData,
          ...editedData,
        };
        setUserData(updatedUserData);
      }

      // Reset edit modes
      const resetEditMode: Record<string, boolean> = {};
      Object.keys(editMode).forEach((key) => {
        resetEditMode[key] = false;
      });
      setEditMode(resetEditMode);
      setShowSaveButton(false);

      showSnackbar("Profile updated successfully", "success");
    } catch (error) {
      showSnackbar("Failed to update profile", "error");
      console.error("Error saving user:", (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelChanges = () => {
    if (userData) {
      setEditedData({
        name: userData.name,
        mobileNumber: userData.mobileNumber,
      });

      const resetEditMode: Record<string, boolean> = {};
      Object.keys(editMode).forEach((key) => {
        resetEditMode[key] = false;
      });
      setEditMode(resetEditMode);
      setShowSaveButton(false);
    }
  };

  const showSnackbar = (message: string, type: "success" | "error") => {
    setSnackbar({
      show: true,
      message,
      type,
    });

    // Auto-hide snackbar after 5 seconds
    setTimeout(() => {
      setSnackbar((prev) => ({ ...prev, show: false }));
    }, 5000);
  };

  const closeSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, show: false }));
  };

  const openPasswordDialog = () => {
    setPasswordDialogOpen(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
  };

  const closePasswordDialog = () => {
    setPasswordDialogOpen(false);
  };

  const handlePasswordChange = async () => {
    // Validate passwords
    if (!currentPassword) {
      setPasswordError("Current password is required");
      return;
    }

    if (!newPassword) {
      setPasswordError("New password is required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords don't match");
      return;
    }

    try {
      setIsLoading(true);

      // Here you would verify the current password and update to the new one
      // const response = await verifyAndUpdatePassword(currentPassword, newPassword);

      // Mock API call for demonstration
      await new Promise((resolve) => setTimeout(resolve, 1000));

      closePasswordDialog();
      showSnackbar("Password updated successfully", "success");
    } catch (error) {
      setPasswordError(
        "Failed to update password. Please check your current password."
      );
      console.error("Error updating password:", (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !userData) {
    return (
      <div className="app-container">
        <AppBar isHome={false} isOwner={isOwner!} />
        <div className="profile-loading">Loading user profile...</div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="app-container">
        <AppBar isHome={false} isOwner={isOwner!} />
        <div className="profile-error">Failed to load user profile</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <AppBar isHome={false} isOwner={isOwner!} />
      <div className="profile-container">
        <h1 className="profile-title">My Profile</h1>

        <div className="profile-card">
          <div className="profile-section">
            {/* Name Field */}
            <div className="field-container">
              <div className="field-group">
                <label htmlFor="name">Name</label>
                <div className="input-with-edit">
                  <input
                    id="name"
                    type="text"
                    value={editedData.name || userData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={!editMode.name}
                    className={editMode.name ? "editable" : ""}
                  />
                  <button
                    className={`edit-button ${editMode.name ? "active" : ""}`}
                    onClick={() => toggleEditMode("name")}
                    aria-label="Edit name"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="field-container">
              <div className="field-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={userData.email}
                  disabled={true}
                  className="email-field"
                />
              </div>
            </div>

            {/* Mobile Number Field */}
            <div className="field-container">
              <div className="field-group">
                <label htmlFor="mobile">Mobile Number</label>
                <div className="input-with-edit">
                  <input
                    id="mobile"
                    type="text"
                    value={editedData.mobileNumber || userData.mobileNumber}
                    onChange={(e) =>
                      handleInputChange("mobileNumber", e.target.value)
                    }
                    disabled={!editMode.mobileNumber}
                    className={editMode.mobileNumber ? "editable" : ""}
                  />
                  <button
                    className={`edit-button ${
                      editMode.mobileNumber ? "active" : ""
                    }`}
                    onClick={() => toggleEditMode("mobileNumber")}
                    aria-label="Edit mobile number"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="field-container">
              <div className="field-group">
                <label htmlFor="password">Password</label>
                <div className="password-field-with-button">
                  <input
                    id="password"
                    type="password"
                    value="••••••••••••"
                    disabled={true}
                  />
                  <button
                    className="change-password-button"
                    onClick={openPasswordDialog}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>

            {/* Role Field */}
            <div className="field-container">
              <div className="field-group">
                <label htmlFor="role">Role</label>
                <input
                  id="role"
                  type="text"
                  value={userData.role}
                  disabled={true}
                />
              </div>
            </div>

            {/* Member Since Field */}
            <div className="field-container">
              <div className="field-group">
                <label htmlFor="member-since">Member Since</label>
                <input
                  id="member-since"
                  type="text"
                  value={new Date(userData.createdAt).toLocaleDateString()}
                  disabled={true}
                />
              </div>
            </div>
          </div>

          {showSaveButton && (
            <div className="button-container">
              <button
                className="cancel-button"
                onClick={cancelChanges}
                disabled={isLoading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                Cancel
              </button>
              <button
                className="save-button"
                onClick={saveChanges}
                disabled={isLoading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Custom Snackbar */}
        {snackbar.show && (
          <Snackbar
            message={snackbar.message}
            type={snackbar.type}
            onClose={closeSnackbar}
          />
        )}

        {/* Password Dialog */}
        {passwordDialogOpen && (
          <div className="dialog-overlay">
            <div className="password-dialog">
              <div className="dialog-header">
                <h2>Change Password</h2>
                <button
                  className="dialog-close-button"
                  onClick={closePasswordDialog}
                >
                  ×
                </button>
              </div>

              <div className="dialog-content">
                <div className="password-field-container">
                  <label htmlFor="current-password">Current Password</label>
                  <div className="password-input-group">
                    <input
                      id="current-password"
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <button
                      className="password-toggle"
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="password-field-container">
                  <label htmlFor="new-password">New Password</label>
                  <div className="password-input-group">
                    <input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button
                      className="password-toggle"
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="password-field-container">
                  <label htmlFor="confirm-password">Confirm New Password</label>
                  <div className="password-input-group">
                    <input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      className="password-toggle"
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {passwordError && (
                  <div className="password-error">{passwordError}</div>
                )}
              </div>

              <div className="dialog-actions">
                <button className="cancel-button" onClick={closePasswordDialog}>
                  Cancel
                </button>
                <button
                  className="save-button"
                  onClick={handlePasswordChange}
                  disabled={isLoading}
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
