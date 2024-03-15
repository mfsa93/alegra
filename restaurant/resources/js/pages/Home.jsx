import React, { useState, useEffect } from "react";
import DefaultLayout from "../layout/DefaultLayouts";
import { fetchRecipes, fetchRandomRecipe } from "../api/kitchen";
import RecipeSelectorCard from "./components/RecipeSelectorCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
    const [recipes, setRecipes] = useState([]);
    const [isRouletteSpinning, setIsRouletteSpinning] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const loadRecipes = () => {
        fetchRecipes()
            .then((data) => {
                setRecipes(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const highlightSelectedRecipe = (randomRecipe) => {
        setRecipes(
            recipes.map((recipe) => ({
                ...recipe,
                selected: recipe.name === randomRecipe.recipe,
            }))
        );
    };

    const initiateRoulette = () => {
        setIsRouletteSpinning(true);
        fetchRandomRecipe()
            .then((data) => {
                setTimeout(() => {
                    setSelectedRecipe(data);
                    setIsRouletteSpinning(false);
                    highlightSelectedRecipe(data);
                    toast.success(`🎉 ${data.recipe} is the lucky recipe!`, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setTimeout(() => {
                        setSelectedRecipe(null);
                        toast.info("🍽️ Enjoy your meal is cooking!", {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }, 3000);
                }, 1000);
            })
            .catch((error) => {
                console.error("Error fetching random recipe:", error);
                setIsRouletteSpinning(false);
            });
    };

    const handleRoulette = async () => {
        initiateRoulette();
    };

    useEffect(() => {
        loadRecipes();
    }, []);

    useEffect(() => {
        let intervalId;
        if (isRouletteSpinning) {
            intervalId = setInterval(() => {
                setRecipes((prevRecipes) => {
                    const newRecipes = [...prevRecipes];
                    const index = newRecipes.findIndex(
                        (recipe) => recipe.selected
                    );
                    const nextIndex = (index + 1) % newRecipes.length;
                    newRecipes[index] = {
                        ...newRecipes[index],
                        selected: false,
                    };
                    newRecipes[nextIndex] = {
                        ...newRecipes[nextIndex],
                        selected: true,
                    };
                    return newRecipes;
                });
            }, 150);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isRouletteSpinning, recipes.length]);

    return (
        <DefaultLayout>
            <div className="w-100">
                <button
                    onClick={() => handleRoulette()}
                    className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 -my-2.5"
                >
                    <span>
                        Get a free random meal <span aria-hidden="true">→</span>
                    </span>
                </button>
            </div>
            <div className="w-100 my-5">
                <h2 className="py-5">
                    <span className="text-3xl  font-bold leading-none text-gray-900 dark:text-white">
                        Recipes
                    </span>
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                    {recipes.map((recipe) => (
                        <RecipeSelectorCard
                            recipe={recipe}
                            selected={recipe?.selected}
                            selectedRecipe={
                                selectedRecipe?.recipe === recipe.name
                            }
                        />
                    ))}
                </div>
            </div>
            <ToastContainer />
        </DefaultLayout>
    );
}

export default Home;
