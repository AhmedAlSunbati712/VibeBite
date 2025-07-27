import React from "react";
import Wave from "./Wave.jsx"

function RecipeCard(props) {
    console.log(props.items);
  const cardType = props.cardType;
  return (
    <div className="recipe-card">
      <h5 id={cardType}>
        {cardType === "instructions" ? "Instructions" : "Ingredients"}
        <div className={`line-${cardType}`}></div>
      </h5>
      <ul className={cardType}>
        {Array.isArray(props.items) &&
          props.items.map((item, index) => (
            <li key={index}>
              {cardType === "instructions" ? item.step : item.original}
            </li>
          ))}

      </ul>
      <Wave />
    </div>
  );
}

export default RecipeCard;
