
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOption, CustomSession } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import CreateChat from '@/components/groupChat/CreateChat';
import { fetchChatGroups } from '@/fetch/fetchGroup';
import { TChatGroups } from '../../../types';
import GroupChatCard from '@/components/groupChat/GroupChatCard';

export default async function dashboard() {

  const session: CustomSession | null = await getServerSession(authOption);

  if (session === null) {
    return redirect("/");
  }

  const groups: Array<TChatGroups> | [] = await fetchChatGroups(session.user.token!);

  console.log(groups);

  return (
    <div className='container'>

      <div className="flex justify-end mt-5 mr-9">
        <CreateChat user={session.user} />
      </div>

      <GroupChatCard />

      <h3>Dashbord</h3>

    </div>
  )
}
