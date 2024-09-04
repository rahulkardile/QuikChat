import React, { Dispatch, SetStateAction } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { signOut } from 'next-auth/react'
import { Button } from '../ui/button'

const LogoutModal = ({open, setOpen}:{open: boolean, setOpen: Dispatch<SetStateAction<boolean>>}) => {
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            {/* <AlertDialogTrigger>Sign Out</AlertDialogTrigger> */}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Do You Wan't To Sign Out!</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently remove your accout from  the browser.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={()=> signOut({redirect: true, callbackUrl: "/"})}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default LogoutModal