import React, { useState } from "react";
import { updateProfile } from "@/contracts/contractInteractions"; // Adjust the import path as needed

const UpdateProfileForm = () => {
    const [username, setUsername] = useState("sampleUser");
    const [bio, setBio] = useState("This is a sample bio.");
    const [profilePicture, setProfilePicture] = useState("https://example.com/sample.jpg");
    const [statusMessage, setStatusMessage] = useState("");

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateProfile(username, bio, profilePicture);
            setStatusMessage("Profile updated successfully!");
            setUsername("");
            setBio("");
            setProfilePicture("");
        } catch (error) {
            console.error("Error updating profile:", error);
            setStatusMessage("Updating profile failed.");
        }
    };

    return (
        <div>
            <h2>Update Profile</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Bio:
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Profile Picture URL:
                    <input
                        type="text"
                        value={profilePicture}
                        onChange={(e) => setProfilePicture(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">Update Profile</button>
            </form>
            {statusMessage && <p>{statusMessage}</p>}
        </div>
    );
};

export default UpdateProfileForm;
