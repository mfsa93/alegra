import React from "react";
import { Table, Card, Pagination } from "flowbite-react";
import { TfiReload } from "react-icons/tfi";

const WarehouseMarketPurchases = ({
    marketPurchases,
    load,
    currentPage,
    lastPage,
    showPagination = true,
}) => {
    return (
        <Card className="p-4">
            <div className="mb-4 flex items-center justify-between">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    Market Purchases
                </h5>
                <button
                    onClick={() => load()}
                    className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                    <TfiReload />
                </button>
            </div>
            {!!marketPurchases?.length ? (
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Ingredient</Table.HeadCell>
                        <Table.HeadCell>Quantity</Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y">
                        {marketPurchases.map((item) => (
                            <Table.Row
                                key={item.id}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                <Table.Cell>{item.ingredient_name}</Table.Cell>
                                <Table.Cell>{item.quantity}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            ) : (
                <div className="text-gray-900 dark:text-white">
                    No purchases found
                </div>
            )}

            <div className="pagination w-full flex-1 flex overflow-x-auto sm:justify-center">
                {!!marketPurchases?.length && showPagination ? (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={lastPage}
                        onPageChange={load}
                    />
                ) : null}
            </div>
        </Card>
    );
};

export default WarehouseMarketPurchases;
