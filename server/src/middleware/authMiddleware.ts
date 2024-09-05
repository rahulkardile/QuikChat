import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader === null || authHeader === undefined) {
        return res.status(401).json({
            success: false,
            status: 401,
            message: "UnAuthorized!"
        })
    }
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) return res.status(401).json({
            success: false,
            status: 401,
            message: "Data is not valid!"
        })

        req.user = user as AuthUser;
        next();
    })

}