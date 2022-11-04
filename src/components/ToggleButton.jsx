import React from "react";
import "./toggleButton.css";

export function ToggleButton(props) {
  return (
    <div>
      <label className="switch">
        <input
          type="checkbox"
          name={props.name}
          checked={props.checked}
          onChange={props.onChange}
          disabled={props.disabled}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
}
