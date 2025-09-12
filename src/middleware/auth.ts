import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose"; // asegúrate de estar usando jose
import { JWT_ACCESS_SECRET, API_URL } from "@/constants/environments";

export const auth = async (
  req: NextRequest,
): Promise<{ isAuthenticated: boolean; res: NextResponse | null }> => {
  const secret = new TextEncoder().encode(JWT_ACCESS_SECRET);

  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  // Si no hay ningún token, no está autenticado
  if (!accessToken && !refreshToken) {
    return { isAuthenticated: false, res: null };
  }

  try {
    // 🔹 Caso 1: Hay accessToken válido
    if (accessToken) {
      await jwtVerify(accessToken, secret);
      return { isAuthenticated: true, res: null };
    }

    // 🔹 Caso 2: No hay accessToken, pero sí refreshToken
    if (!accessToken && refreshToken) {
      const newAccess = await refreshAccessToken(refreshToken);
      if (!newAccess) return { isAuthenticated: false, res: null };

      const res = NextResponse.next();
      res.cookies.set("accessToken", newAccess, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60, // 1h
      });

      return { isAuthenticated: true, res };
    }

    return { isAuthenticated: false, res: null };
  } catch (err: any) {
    // 🔹 Caso 3: Access token expiró → intentar con refresh
    if (err.code === "ERR_JWT_EXPIRED" && refreshToken) {
      const newAccess = await refreshAccessToken(refreshToken);
      if (!newAccess) return { isAuthenticated: false, res: null };

      const res = NextResponse.next();
      res.cookies.set("accessToken", newAccess, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60, // 1h
      });

      return { isAuthenticated: true, res };
    }

    // 🔹 Otros errores → no autenticado
    return { isAuthenticated: false, res: null };
  }
};

// 🔹 Función auxiliar para pedir un nuevo access token al backend
async function refreshAccessToken(
  refreshToken: string,
): Promise<string | null> {
  try {
    const response = await fetch(`${API_URL}/auth/refreshToken`, {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) return null;

    const { accessToken } = await response.json();
    return accessToken || null;
  } catch {
    return null;
  }
}
