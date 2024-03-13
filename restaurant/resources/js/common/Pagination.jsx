import React from "react";

const Pagination = ({ links, load }) => {
    return (
        <div className="w-100">
            <nav className="w-60 m-auto">
                <ul className="pagination justify-content-center w-100 justify-between flex">
                    {links.map((link, index) => (
                        <li
                            key={index}
                            className={`page-item ${
                                link.active
                                    ? "font-bold underline-offset-1"
                                    : ""
                            }`}
                        >
                            <button
                                onClick={() => load(link.url)}
                                className="page-link"
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            ></button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
