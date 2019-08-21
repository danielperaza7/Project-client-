import React from "react";

export default ({ name, action, hidden }) => {
  if (hidden) return null;
  return (
    <div>
      <button onClick={action}>{name}</button>
    </div>
  );
};
