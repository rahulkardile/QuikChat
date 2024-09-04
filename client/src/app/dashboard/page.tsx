import { getServerSession } from 'next-auth'
import React from 'react'
import { authOption, CustomSession } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation';

export default async function dashboard() {

  const session: CustomSession | null = await getServerSession(authOption);

  if (session === null) {
    return redirect("/");
  }

  return (
    <div>dashboard</div>
  )
}
