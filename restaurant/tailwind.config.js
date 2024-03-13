// tailwind.config.js
module.exports = {
    purge: ["./resources/**/*.{js,jsx,ts,tsx}", "./public/index.php"],
    darkMode: "selector",
    theme: {},
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "node_modules/flowbite-react/lib/esm/**/*.js",
    ],
    variants: {},
    plugins: [require("flowbite/plugin")],
};
