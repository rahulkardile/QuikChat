import React, { Suspense, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut } from 'next-auth/react';
import dynamic from 'next/dynamic';

const LogoutModal = dynamic(()=> import("../auth/LogoutModal"));

export default function ProfileMenu({ name, img }: { name: string, img: string }) {

    const [logoutOpen, setLogoutOpen] = useState(false);

    return (
        <>
        {
            logoutOpen && <Suspense fallback={<p>Loading . . . </p>}>
                <LogoutModal open={logoutOpen} setOpen={setLogoutOpen}/>
            </Suspense>
        }
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage src={img} />
                    <AvatarFallback>{name}</AvatarFallback>
                </Avatar>

            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>setLogoutOpen(true)}>Sign Out</DropdownMenuItem>
            
                {/* <DropdownMenuItem><LogoutModal /></DropdownMenuItem> */}
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    )
}
