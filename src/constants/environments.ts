const {
  NEXT_PUBLIC_API_URL: API_URL = "http://localhost:8000",
  JWT_ACCESS_SECRET = "my-access-secret",
  JWT_REFRESH_SECRET = "my-refresh-secret",
} = process.env;
export { API_URL, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET };
