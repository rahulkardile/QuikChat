
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
    <div className='container m-auto'>

      <div className="flex justify-end my-5 mr-9">
        <CreateChat user={session.user} />
      </div>

      {/* If Groups */}
      <div className="grid grid-cols-1 p-4 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {groups.length > 0 &&
          groups.map((item, index) => (
            <GroupChatCard group={item} key={index} user={session?.user!} />
          ))}
      </div>

      <h3>Dashbord</h3>

    </div>
  )
}
