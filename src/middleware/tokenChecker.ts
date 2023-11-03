import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  user?: any; // Replace 'any' with the actual type of 'user' if you have a specific type
}

export const checker = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Response => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(500).json({ error: true, message: "Token Required..." });
  }
  
  const auth = token.substring(7, token.length);

  try {
    const decode: any = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decode.user;
    next();
  } catch (error) {
    return res.status(401).json({ error: true, message: "Invalid Token..." });
  }
};

export const adminChecker = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Response => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: true, message: "Token Required..." });
  }
  const auth = token.substring(7, token.length);

  try {
    const decoded: any = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decoded.user;
    if (
      req.user.userRole == "admin" ||
      req.user.userRole == "Owner" ||
      req.user.userRole == "Patner"
    ) {
      next();
    } else {
      return res.status(401).json({ error: true, message: "Invalid Token..." });
    }
  } catch (error) {
    return res.status(401).json({ error: true, message: "Invalid Token..." });
  }
};
