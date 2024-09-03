import { LOGIN_URL } from "@/lib/apiEndPoint";
import axios from "axios";
import { Account, AuthOptions, ISODateString } from "next-auth";
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

export const authOption: AuthOptions = {
    pages: {
        signIn: "/"
    },

    callbacks: {

        async signIn({ user, account, }: { user: CustomUser, account: Account | null }) {
            console.log("inside of callback");

            try {

                console.log("User data: " + user);
                console.log("account data: " + account);

                const payload = {
                    email: user.email,
                    name: user.name,
                    oauth_id: account?.providerAccountId,
                    provider: account?.provider,
                    image: user?.image,
                }

                const { data, status } = await axios.post(LOGIN_URL, payload);

                console.log(data);

                user.id = data?.user?.id?.toString();
                user.token = data?.user?.token;
                user.provider = data?.user?.provider;

                return true;

            } catch (error) {
                console.log(error);
                return false;
            }
        },

        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },

        async session({
            session,
            token,
            user,
        }) {
            session.user = token.user as CustomUser;
            return session;
        },
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
    ]

}