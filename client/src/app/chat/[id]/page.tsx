import ChatBase from '@/components/chat/ChatBase';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import React from 'react'

export default function Chat({ params }: { params: { id: string } }) {

    const { id } = params;
    console.log("Group id is : " + id);


    return (
        <div className="">
            <h3>Hello I am Chat . . .</h3>
            <ChatBase />
        </div>
    )
}
