import React, { useEffect, useState } from "react";
import { FaBowlFood } from "react-icons/fa6";
import { Card, Pagination } from "flowbite-react";
import { fetchCookingActivities } from "../../api/kitchen";

const CookingActivities = () => {
    const [cookingActivities, setCookingActivities] = useState({
        data: [],
        current_page: 1,
        last_page: 1,
    });

    const loadCookingActivities = (url = null) => {
        fetchCookingActivities(url)
            .then((data) => {
                setCookingActivities(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        loadCookingActivities();
    }, []);
    console.log(
        "🚀 ~ CookingActivities ~ cookingActivities:",
        cookingActivities
    );

    const onPageChange = (page) => {
        console.log("🚀 ~ onPageChange ~ page:", page, cookingActivities.links);
        const item = cookingActivities.links.find(
            (link) => link.label === page.toString()
        );
        loadCookingActivities(item.url);
    };

    return (
        <Card className="p-4 mt-5 max-w-xl">
            <div className="mb-4 flex items-center justify-between">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    Cooking Activities
                </h5>
            </div>
            <ul class="p-4 divide-y divide-gray-200 dark:divide-gray-700 w-full">
                {cookingActivities?.data?.length &&
                    cookingActivities.data.map((activity) => (
                        <li class="pb-3 sm:pb-4">
                            <div class="flex items-center space-x-4 rtl:space-x-reverse p-4">
                                <div class="flex-shrink-0">
                                    <FaBowlFood className="w-16 h-16 text-cyan-600 mb-3" />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h6 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                        {activity?.recipes?.name}
                                    </h6>
                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Ingredients
                                    </p>

                                    <ul class="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400 grid grid-cols-2">
                                        {activity?.recipes?.ingredients.map(
                                            (ingredient) => (
                                                <li class="flex items-center">
                                                    <svg
                                                        class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                                    </svg>
                                                    <span>
                                                        {ingredient.name}{" "}
                                                        {
                                                            ingredient.pivot
                                                                .quantity
                                                        }
                                                    </span>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    {activity.started_at ? (
                                        <span class="inline-flex items-center px-2.5 py-0.5 ml-2 text-sm font-medium bg-green-100 text-green-800 rounded-full dark:bg-green-700 dark:text-green-200">
                                            Cooking
                                        </span>
                                    ) : (
                                        "Pending"
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
            </ul>

            <div className="pagination w-full flex-1 flex overflow-x-auto sm:justify-center">
                <Pagination
                    currentPage={cookingActivities.current_page}
                    totalPages={+cookingActivities.last_page}
                    onPageChange={onPageChange}
                />
            </div>
        </Card>
    );
};

export default CookingActivities;
