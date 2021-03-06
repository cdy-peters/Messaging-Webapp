import React from "react";
import { useContextProvider } from "../../utils/context";

const SettingsHeader = (props) => {
  const { setActiveComponent, setShowSettings } = useContextProvider();

  const handleClick = (e) => {
    e.preventDefault();
    setActiveComponent("messages");
    setShowSettings(false);
  };

  return (
    <div id="settings-header">
      <h3>Conversation Settings</h3>

      <button id="settings-button" onClick={handleClick}>
        Close
      </button>
    </div>
  );
};

export default SettingsHeader;
