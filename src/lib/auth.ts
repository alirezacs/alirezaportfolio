import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE = "admin_session";

type AdminPayload = {
  email: string;
};

function getEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name} in environment.`);
  }
  return value;
}

export async function verifyAdminCredentials(email: string, password: string) {
  const adminEmail = getEnv("ADMIN_EMAIL");
  const passwordHash = getEnv("ADMIN_PASSWORD_HASH");

  if (email.toLowerCase() !== adminEmail.toLowerCase()) {
    return false;
  }

  return bcrypt.compare(password, passwordHash);
}

export async function createAdminSession(email: string) {
  const secret = getEnv("JWT_SECRET");
  const token = jwt.sign({ email } satisfies AdminPayload, secret, {
    expiresIn: "30d",
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    path: "/",
  });
}

export async function getAdminSession() {
  const secret = getEnv("JWT_SECRET");
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, secret) as AdminPayload;
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}
