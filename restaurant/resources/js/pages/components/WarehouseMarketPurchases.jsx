import React from "react";
import { Table, Card } from "flowbite-react";
import { TfiReload } from "react-icons/tfi";
import Pagination from "../../common/Pagination";

const WarehouseMarketPurchases = ({ marketPurchases, links, load }) => {
    return (
        <Card className="w-1/2 p-4">
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
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Ingredient</Table.HeadCell>
                    <Table.HeadCell>Quantity</Table.HeadCell>
                </Table.Head>

                <Table.Body className="divide-y">
                    {marketPurchases?.length
                        ? marketPurchases.map((item) => (
                              <Table.Row
                                  key={item.id}
                                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                              >
                                  <Table.Cell>
                                      {item.ingredient_name}
                                  </Table.Cell>
                                  <Table.Cell>{item.quantity}</Table.Cell>
                              </Table.Row>
                          ))
                        : null}
                </Table.Body>
            </Table>

            <div className="mt-4 w-100">
                <Pagination links={links} load={load} />
            </div>
        </Card>
    );
};

export default WarehouseMarketPurchases;
