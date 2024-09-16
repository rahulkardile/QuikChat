import ChatBase from '@/components/chat/ChatBase';
import { fetchChatGroup } from '@/fetch/fetchGroup';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { notFound } from 'next/navigation';
import React from 'react'
import { TChatGroups } from '../../../../types';

export default async function Chat({ params }: { params: { id: string } }) {

    const { id } = params;

    if(id.length !== 36){
        return notFound();
    }

    const group: TChatGroups | null = await fetchChatGroup(id);
    if(group === null){
        return notFound();
    }

    console.log(group);
    

    return (
        <div className="m-auto bg-red-200 p-2">
            <h3>Hello I am Chat . . .</h3>
            <ChatBase groupId={id} />
        </div>
    )
}
