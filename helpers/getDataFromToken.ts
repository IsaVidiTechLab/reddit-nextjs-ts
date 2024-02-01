import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export default function getDataFromToken(req: NextRequest) {
  try{
    const token = req.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
    return decodedToken.id

  } catch (error) {
    console.error(error);
  }
}