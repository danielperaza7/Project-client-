import React from "react";
import ReturnItem from "../ReturnItem/ReturnItem";

export default ({
  items, changeItem, selects, reviewMode, input
}) => {
  console.log("selects", selects);
  if (!items) return <div>No items</div>;
  const list = items.map((item, index) => {
    return (
      <div key={index}>
        <ReturnItem
          item={item}
          changeItem={changeItem}
          status={selects[index]}
          index={index}
          reviewMode={reviewMode}
          input={input}
        />
      </div>
    );
  });
  return <div>{list}</div>;
};
