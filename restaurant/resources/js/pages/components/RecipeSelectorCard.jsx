import React from "react";
import { FaBowlFood } from "react-icons/fa6";
import { Card } from "flowbite-react";

const RecipeSelectorCard = ({ recipe, selected, selectedRecipe }) => {
    return (
        <Card
            className={`max-w-sm border-2 ${selected ? "border-green-600" : ""}
                ${selectedRecipe ? "animate-bounce" : ""}
            `}
        >
            <div className="flex justify-end px-4 pt-4 "></div>
            <div className="flex flex-col items-center pb-10">
                <FaBowlFood className="w-16 h-16 text-cyan-600 mb-3" />
                <h5 className="px-3 mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {recipe?.name}
                </h5>
                <div className="w-full pt-4 px-4">
                    <h6 className="text-sm font-medium text-gray-900 dark:text-white">
                        Ingredients
                    </h6>

                    <div className="flex-1 w-1/1 mt-3">
                        <ul className="flex flex-wrap gap-1 w-full">
                            {recipe?.ingredients.map((ingredient) => (
                                <li
                                    key={ingredient.id}
                                    className="px-2 py-1 text-xs font-medium text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-white rounded-full"
                                >
                                    {ingredient.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default RecipeSelectorCard;
