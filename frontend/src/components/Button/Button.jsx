import React from "react";
import "./button.css"

export const ButtonSmall = ({ message, isInverted, Icon }) => {
  return (
    <button className={isInverted ? "button-small-inverted" : "button-small"}>
      <span>{message}</span>
      {Icon && <Icon/>}
    </button>
  );
};

export const ButtonLarge = ({ message, isInverted, Icon }) => {
  return (
    <button className={isInverted ? "button-large-inverted" : "button-large"}>
      <span>{message}</span>
      {Icon && <Icon/>}
    </button>
  );
};

export const ButtonRound = ({ isInverted, Icon }) => {
  return (
    <button className={isInverted ? "button-round-inverted" : "button-round"}>
      <Icon/>
    </button>
  );
};

