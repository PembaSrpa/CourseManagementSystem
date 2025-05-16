const Button = ({ children, onClick, variant = "primary", ...props }) => {
    const variants = {
        primary: "bg-blue-500 hover:bg-blue-600 text-white",
        danger: "bg-red-500 hover:bg-red-600 text-white",
        outline: "border border-gray-300 hover:bg-gray-50",
    };

    return (
        <button
            className={`px-4 py-2 rounded-md transition ${variants[variant]}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
