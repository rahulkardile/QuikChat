
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOption, CustomSession } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import CreateChat from '@/components/groupChat/CreateChat';

export default async function dashboard() {

  const session: CustomSession | null = await getServerSession(authOption);

  if (session === null) {
    return redirect("/");
  }

  return (
    <div className='container'>
      
      <div className="flex justify-end mt-5 mr-9">
        <CreateChat user={session.user} />
      </div>

<h3>Dashbord</h3>

    </div>
  )
}
