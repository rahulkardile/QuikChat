import { z } from "zod";

export const createChatSchema = z.object({
    title: z.string().min(3, {message: "Chat title must be 3 character long."}).max(50, {message: "Chat titleshould be under 50 character."}),
    passcode: z.string().min(4, {message: "Chat title must be 4 character long."}).max(20, {message: "Chat passcode should be under 20 character."}),
}).required();

export type createChatSchemaType = z.infer<typeof createChatSchema>;
