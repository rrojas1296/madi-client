const NEXT_PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "my-access-secret";
const NODE_ENV = process.env.NODE_ENV;
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "my-refresh-secret";
console.log({
  NEXT_PUBLIC_API_URL,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  NODE_ENV,
});
export { NEXT_PUBLIC_API_URL, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET };
