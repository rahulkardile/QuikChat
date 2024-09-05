import { Request, Response, NextFunction } from "express";
import prisma from "../config/db_config";

class ChatGroupController {
    static async store(req: Request, res: Response, next: NextFunction) {
        try {
            
            const { title, passcode } = req.body;
            const user = req.user;

            await prisma.chatGroup.create({
                data: {
                    title,
                    passcode,
                    user_id: user?.id!,
                }
            })

            return res.status(201).json({
                success: true,
                message: "Chat Group is created successfully!"
            });

        } catch (error) {
            next(error);
        }
    }
}

export default ChatGroupController;