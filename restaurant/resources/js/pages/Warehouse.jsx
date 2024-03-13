import React, { useEffect, useState } from "react";
import DefaultLayout from "../layout/DefaultLayouts";
import {
    fetchWarehouseInventory,
    fetchMarketPurchases,
} from "../api/warehouse";

import Loader from "../common/Loader";
import WarehouseIngredients from "./components/WarehouseIngredients";
import WarehouseMarketPurchases from "./components/WarehouseMarketPurchases";

function Warehouse() {
    const [inventory, setInventory] = useState([]);
    const [marketPurchases, setMarketPurchases] = useState({
        data: [],
        links: [],
    });

    const loadInventory = () => {
        fetchWarehouseInventory()
            .then((data) => {
                setInventory(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const loadMarketPurchases = (url = null) => {
        fetchMarketPurchases(url)
            .then((data) => {
                setMarketPurchases(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        loadInventory();
        loadMarketPurchases();
    }, []);

    return (
        <DefaultLayout>
            <div className="w-100 mb-10">
                <h1 className="text-3xl font-bold leading-none text-gray-900 dark:text-white">
                    Warehouse
                </h1>
            </div>
            <div className="flex flex-wrap justify-around w-100">
                <WarehouseIngredients
                    ingredients={inventory}
                    loadInventory={loadInventory}
                />
                <WarehouseMarketPurchases
                    marketPurchases={marketPurchases.data}
                    links={marketPurchases.links}
                    load={loadMarketPurchases}
                />
            </div>
        </DefaultLayout>
    );
}

export default Warehouse;
