import { Request, Response, NextFunction } from "express";
import prisma from "../config/db_config";
import { error } from "console";

class ChatGroupController {
    // get all chat group of a user
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
                message: "Chat Groups is Fetched successfully!",
                data
            });

        } catch (error) {
            next(error);
        }
    }

    // get one chat group of a user
    static async show(req: Request, res: Response, next: NextFunction){
        try {
            const { id } = req.params;
            const data = await prisma.chatGroup.findUnique({
                where: {
                    id
                }
            })

            return res.status(200).json({
                success: true,
                message: "Data has been fetched!",
                data
            });

        } catch (error) {
            next(error);
        }
    }

    // create a chat group
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

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            
            const { title, passcode } = req.body;
            const { id } = req.params;

            await prisma.chatGroup.update({
                data: {
                    title,
                    passcode,
                },
                where :{
                    id: id
                }
            })

            return res.status(201).json({
                success: true,
                message: "Chat Group is updated successfully!"
            });

        } catch (error) {
            next(error);
        }
    }

    static async destroy(req: Request, res: Response, next: NextFunction){
        try {
            const { id } = req.params;
            const data = await prisma.chatGroup.delete({
                where: {
                    id
                }
            })

            return res.status(200).json({
                success: true,
                message: "Data has deleted!",
                data
            });

        } catch (error) {
            next(error);
        }
    }

}

export default ChatGroupController;