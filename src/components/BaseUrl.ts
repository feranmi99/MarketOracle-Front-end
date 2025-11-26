const baseUrl =
    process.env.NODE_ENV === "production"
        ? "https://marketoracle-1.onrender.com"
        : "http://localhost:8000";

export default baseUrl;
