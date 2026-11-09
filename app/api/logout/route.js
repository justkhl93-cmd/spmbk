export async function POST() {
  const cookie = [
    "spmb_session=",
    "HttpOnly",
    "Path=/",
    "SameSite=Lax",
    "Max-Age=0",
  ];

  if (process.env.NODE_ENV === "production") {
    cookie.push("Secure");
  }

  const response = Response.json({ message: "Logout berhasil." });
  response.headers.append("Set-Cookie", cookie.join("; "));

  return response;
}