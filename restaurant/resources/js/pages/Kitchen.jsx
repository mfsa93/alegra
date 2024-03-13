import React, { useEffect, useState } from "react";
import DefaultLayout from "../layout/DefaultLayouts";
import { fetchRecipes } from "../api/kitchen";
import RecipeCard from "./components/RecipeCard";
import { Card } from "flowbite-react";
import CookingActivities from "./components/CookingActivities";

const Kitchen = () => {
    const [recipes, setRecipes] = useState([]);
    const loadRecipes = () => {
        fetchRecipes()
            .then((data) => {
                setRecipes(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        loadRecipes();
    }, []);

    return (
        <DefaultLayout>
            <h1 className="text-3xl font-bold leading-none text-gray-900 dark:text-white">
                Kitchen
            </h1>
            <div className="w-100 mb-10 grid md:grid-cols-2">
                <CookingActivities />

                <Card className="p-4 mt-5">
                    <div className="mb-4 flex items-center justify-between">
                        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                            Recipes
                        </h5>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-1 items-center justify-center gap-5">
                        {recipes.map((recipe) => (
                            <RecipeCard recipe={recipe} />
                        ))}
                    </div>
                </Card>
            </div>
        </DefaultLayout>
    );
};

export default Kitchen;
