import { LOGIN_URL } from "@/lib/apiEndPoint";
import axios from "axios";
import { Account, AuthOptions, ISODateString, Session, User as NextAuthUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

export interface CustomSession {
    user: CustomUser,
    expires: ISODateString
}

export interface CustomUser {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    provider?: string | null;
    token?: string | null;
}

export interface CustomSession extends Session {
    user: CustomUser;
}

// export interface CustomUser extends NextAuthUser {
//     id?: string | null;
//     provider?: string | null;
//     token?: string | null;
// }

export const authOption: AuthOptions = {
    pages: {
        signIn: "/"
    },

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                }
            }
        })
    ],

    callbacks: {

        async signIn({ user, account, }: { user: CustomUser, account: Account | null }) {

            try {
                const payload = {
                    email: user.email,
                    name: user.name,
                    oauth_id: account?.providerAccountId,
                    provider: account?.provider,
                    image: user?.image,
                }

                const { data, status } = await axios.post(LOGIN_URL, payload, {});

                if (data) {
                    user.id = data.id;
                    user.token = data.token;
                    user.provider = data.provider;
                } else {
                    throw new Error('Server response does not contain data');
                }

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },

        async jwt({ token, user }: { token: JWT, user?: CustomUser }) {
            if (user) {
                token.user = user;
            }
            return token;
        },

        async session({ session, token }: { session: Session; token: JWT }) {
            session.user = token.user as CustomUser;
            return session;
        }
    }

}