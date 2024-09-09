'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createChatSchema, createChatSchemaType } from '@/validations/groupChatValidation';
import { Input } from '../ui/input';
import { CustomUser } from '@/app/api/auth/[...nextauth]/options';
import { toast, Toaster } from 'sonner';
import axios, { AxiosError } from 'axios';
import { CREATE_CHAT_GROUP_URL } from '@/lib/apiEndPoint';
import { headers } from 'next/headers';
import { clearCache } from '@/actions/common';

export default function CreateChat({ user }: { user: CustomUser }) {

    const [open, setopen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<createChatSchemaType>({
        resolver: zodResolver(createChatSchema),
    })

    const SubmitHandler = async (payload: createChatSchemaType) => {
        try {

            setLoading(true);
            const { data } = await axios.post(CREATE_CHAT_GROUP_URL, { ...payload, user_id: user.id }, {
                headers: {
                    authorization: user.token
                }
            })

            if (data.success == true) {
                clearCache("dashboard");
                setLoading(false);
                setopen(false);
                toast.success(data.message)
            }

        } catch (error) {
            setLoading(false);
            if (error instanceof AxiosError) {
                toast.error(error.message);
            } else {
                toast.error("Something went wrong. Please try again!");
            }
        }
    }

    return (
        <Dialog open={open} onOpenChange={setopen}>
            <DialogTrigger asChild>
                <Button>Create Group</Button>
            </DialogTrigger>
            <DialogContent onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        From here you can create your own chat group.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(SubmitHandler)}>
                    <div className="">
                        <Input placeholder='Enter chat title' {...register('title')} />
                        <span className='text-red-400 text-xs'>{errors.title?.message}</span>
                    </div>
                    <div className="mt-4">
                        <Input placeholder='Enter chat passcode' type='password' {...register('passcode')} />
                        <span className='text-red-400 text-xs'>{errors.passcode?.message}</span>
                    </div>
                    <div className="mt-4">
                        <Button className='w-full' disabled={loading}>{loading ? 'Processing . . .' : 'Submit'}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
