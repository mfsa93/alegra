import React from "react";
import { FaBowlFood } from "react-icons/fa6";
import { Card } from "flowbite-react";

const RecipeCard = ({ recipe, selected, selectedRecipe }) => {
    return (
        <Card
            className={`max-w-sm border-2 ${selected ? "border-green-600" : ""}
                ${selectedRecipe ? "animate-bounce" : ""}
            `}
        >
            <div className="flex justify-end px-4 pt-4 "></div>
            <div className="flex flex-col items-center pb-10">
                <FaBowlFood className="w-16 h-16 text-cyan-600 mb-3" />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {recipe?.name}
                </h5>
            </div>
        </Card>
    );
};

export default RecipeCard;
