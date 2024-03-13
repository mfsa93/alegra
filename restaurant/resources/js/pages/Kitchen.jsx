import React, { useEffect } from "react";
import DefaultLayout from "../layout/DefaultLayouts";
import { fetchRecipes } from "../api/kitchen";

const Kitchen = () => {
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
            <div className="w-100 mb-10">
                <h1 className="text-3xl font-bold leading-none text-gray-900 dark:text-white">
                    Kitchen
                </h1>
            </div>
        </DefaultLayout>
    );
};

export default Kitchen;
