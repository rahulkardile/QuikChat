import { Request, Response, NextFunction } from "express"
import prisma from "../config/db_config";
import jwt from "jsonwebtoken";

interface LoginPayloadType {
    name: string;
    email: string;
    provider: string;
    oauth_id: string;
    image?: string;
}

class authController {

    static async login(req: Request, res:Response, next: NextFunction){
        try {
        
            const { name, email, provider, oauth_id, image }: LoginPayloadType = req.body;

            if(!name || !email || !provider || !oauth_id){

                console.log(req.body);
                return res.status(402).json({
                    success: false,
                    message: "Something is missing!"
                })
            }
  
            let findUser = await prisma.user.findUnique({
                where: {
                    email
                }
            });

            if(!findUser){
                findUser = await prisma.user.create({
                    data: {
                        name,
                        email,
                        provider,
                        oauth_id,
                        image: image ? image : '',
                        
                    }
                })
            }

            let JWTPayload = {
                name,
                email,
                id: findUser.id
            }

            const token = jwt.sign(JWTPayload, process.env.JWT_SECRET as string,{
                expiresIn: "365d"
            })

            return res.status(201).json({
                ...findUser,
                token: `Bearer ${token}`
            });

        } catch (error) {
            next(error);
        }
    }
}

export default authController;