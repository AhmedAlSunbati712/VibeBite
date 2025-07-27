import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

// Importing react components
import RecipeCard from "./RecipeCard";



function Recipe(props) {
    return (
        <div className="container py-5">
            <div className="row justify-content-center mb-3">
                <div className="col-auto">
                    <img src={props.recipe.image} className="recipe-img" alt="" />
                </div>
            </div>

            <div className="row justify-content-center mb-3">
                <div className="col-auto">
                    <h1 className="recipe-title text-center">{props.recipe.title}</h1>
                </div>
            </div>

            <div className="row g-4 px-3">
                <div className="col-12 col-md-6">
                    <RecipeCard cardType="ingredients" items={props.recipe.ingredients} />
                </div>
                <div className="col-12 col-md-6">
                    <RecipeCard cardType="instructions" items={props.recipe.steps} />
                </div>
            </div>
        </div>
    );
}

export default Recipe;
