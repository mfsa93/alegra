const API_URL = "http://localhost:8001/api/";
export const fetchRecipes = async () => {
    const response = await fetch(`${API_URL}recipes`);
    return response.json();
};

export const fetchRandomRecipe = async () => {
    const response = await fetch(`${API_URL}prepare-meal`);
    return response.json();
};

export const fetchCookingActivities = async (url) => {
    const response = await fetch(url ?? `${API_URL}cooking-activities`);
    return response.json();
};
