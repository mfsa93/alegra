const API_URL = "http://warehouse.michaelsanchez.co/api/";

export const fetchWarehouseInventory = async () => {
    const response = await fetch(`${API_URL}ingredients`);
    return response.json();
};

export const fetchMarketPurchases = async (url) => {
    const response = await fetch(url ?? `${API_URL}market-purchases`);
    return response.json();
};
