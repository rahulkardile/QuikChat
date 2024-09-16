import { NextFunction, Request, Response } from "express";
import prisma from "../config/db_config";

class ChatGroupUserController {
    static async index(req: Request, res: Response, next: NextFunction){
        try {

            const { group_id } = req.query;
            const users = await prisma.groupUser.findMany({
                where: {
                    group_id: group_id as string
                }
            })

            return res.status(200).json({
                success: true,
                message: "Data Fetched Successfull"
            });

        } catch (error) {
            next(error);
        }
    }

    static async store(req: Request, res: Response, next: NextFunction){
        try {

            const body = req.body;

            const user = await prisma.groupUser.create({
               data: body
            });

            return res.status(201).json({
                success: true,
                message: "User added successfully"
            });
            
        } catch (error) {
            next(error);
        }
    }
}

export default ChatGroupUserController;