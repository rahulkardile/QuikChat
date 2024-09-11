"use client"
import { getSocket } from '@/lib/socket.config'
import { useSession } from 'next-auth/react';
import React, { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'
import { v4 as uuidv4 } from "uuid"
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function ChatBase() {

    const [message, setMessage] = useState<string>("")

    let socket = useMemo(() => {
        const socket = getSocket();

        return socket.connect();
    }, [])

    let session = useSession();

    useEffect(() => {

        socket.on("message", (data: any) => {
            console.log("The Socket message is ", data);
        });

        return () => {
            socket.close()
        }
    }, [])

    const handleClick = () => {
        console.log("Cliecked");

        socket.emit('message', { name: session.data?.user?.name, id: uuidv4(), message });
        setMessage("");
    }

    return (
        <div className='flex flex-col w-1/6 gap-5 my-5'>
            <input className='p-2' placeholder='Type Message . . . ' value={message} onChange={(e) => { setMessage(e.target.value) }} />
            <Button onClick={handleClick}>Send Message</Button>
        </div>
    )
}
