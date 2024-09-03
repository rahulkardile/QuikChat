import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import Image from 'next/image'
import { signIn } from 'next-auth/react'

const LoginModal = () => {
    
    const handleLogin = () => {
        signIn("google", {
            callbackUrl: "/dashboard",
            redirect: true
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Getting Start</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-2xl'>Welcome to QuickChat</DialogTitle>
                    <DialogDescription>
                        Quick Chats makes it effortless
                        to create secure chat links
                        and start conversations in seconds.
                    </DialogDescription>
                </DialogHeader>
                <Button variant="outline" onClick={()=> handleLogin()}>
                    <Image
                        src="/images/google.png"
                        className='mr-4'
                        width={25}
                        height={25}
                        alt='google_logo'
                    />
                    Continue with google
                </Button>
            </DialogContent>
        </Dialog>
    )
}

export default LoginModal