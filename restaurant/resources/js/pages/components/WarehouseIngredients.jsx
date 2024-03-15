import React from "react";
import { Table, Card } from "flowbite-react";
import { TfiReload } from "react-icons/tfi";

const WarehouseIngredients = ({ ingredients, loadInventory }) => {
    return (
        <Card className="max-w-xl md:w-1/2 p-4">
            <div className="mb-4 flex items-center justify-between">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    Inventory
                </h5>
                <button
                    onClick={() => loadInventory()}
                    className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                    <TfiReload />
                </button>
            </div>

            {!!ingredients?.length ? (
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Ingredient</Table.HeadCell>
                        <Table.HeadCell>Quantity</Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y">
                        {ingredients.map((item) => (
                            <Table.Row
                                key={item.id}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                <Table.Cell>{item.name}</Table.Cell>
                                <Table.Cell>{item.quantity}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            ) : (
                <p className="text-gray-900 dark:text-white">
                    No ingredients found
                </p>
            )}
        </Card>
    );
};

export default WarehouseIngredients;
