import { Request, Response, NextFunction } from "express";
import prisma from "../config/db_config";

class ChatGroupController {
    
    static async index(req: Request, res: Response, next: NextFunction) {
        try {

            const user = req.user;

           const data = await prisma.chatGroup.findMany({
                where: {
                    user_id: user?.id
                },
                orderBy: {
                    created_at: "desc"
                }
            })

            return res.status(200).json({
                success: true,
                message: "Chat Group is Fetched successfully!",
                data
            });

        } catch (error) {
            next(error);
        }
    }

    

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