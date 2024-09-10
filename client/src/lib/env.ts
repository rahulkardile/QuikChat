class Env {
    static APP_URL: string = process.env.NEXT_PUBLIC_APP_URL as string;
    static BACKEND_URL: string = process.env.NEXT_PUBLIC_BACKEND_URL as string;
    static BACKEND_URL_FOR_SOCKET: string = process.env.NEXT_PUBLIC_BACKEND_URL_WITHOUT_API as string;
}

export default Env;
