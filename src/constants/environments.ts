const NEXT_PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "my-access-secret";
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "my-refresh-secret";
const NODE_ENV = process.env.NODE_ENV;
export { NEXT_PUBLIC_API_URL, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET };

if (NODE_ENV !== "production") {
  console.log({ NEXT_PUBLIC_API_URL, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET });
}
