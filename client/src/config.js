let API_URL;

if (process.env.NODE_ENV === "production") {
  API_URL = "/api";
} else {
  API_URL = "http://localhost:3001";
}

export { API_URL };
