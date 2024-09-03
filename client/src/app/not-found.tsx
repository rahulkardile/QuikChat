import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

export default function NotFound(){
    return (
        <div className="h-screen flex justify-center items-center flex-col">
            <Image src={"/images/404.svg"} alt='not found img' width={500} height={500} />

            <Link href="/">
                <Button>Go Back To Home</Button>
            </Link>

        </div>
    )
}
