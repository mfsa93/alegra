import React from "react";
import { FaTimes } from "react-icons/fa";

const MenuModal = ({ recipe, visible }) => {
    return (
        visible && (
            <div className="relative z-10" role="dialog" aria-modal="true">
                <div className="fixed inset-0 hidden bg-black bg-opacity-75 transition-opacity md:block"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                        <div className="flex w-full transform text-left text-base transition md:my-8 md:max-w-xl md:px-4 lg:max-w-2xl">
                            <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                <button
                                    type="button"
                                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                                >
                                    <span className="sr-only">Close</span>
                                    <FaTimes className="w-6 h-6 font-normal" />
                                </button>

                                <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                                    <div className="sm:col-span-8 lg:col-span-7">
                                        <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                                            Basic Tee 6-Pack
                                        </h2>

                                        <section
                                            aria-labelledby="information-heading"
                                            className="mt-2"
                                        >
                                            <h3
                                                id="information-heading"
                                                className="sr-only"
                                            >
                                                Product information
                                            </h3>

                                            <p className="text-2xl text-gray-900">
                                                $192
                                            </p>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default MenuModal;
