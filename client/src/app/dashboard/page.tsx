
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOption, CustomSession } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default async function dashboard() {

  const session: CustomSession | null = await getServerSession(authOption);

  if (session === null) {
    return redirect("/");
  }

  return (
    <div>
      <p>{JSON.stringify(session.user)}</p>
      <br />
      dashboard
    </div>
  )
}
