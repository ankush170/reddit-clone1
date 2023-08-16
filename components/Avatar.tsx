import { useSession } from 'next-auth/react';
import React from 'react'
import Image from 'next/image'

type Props = {
    seed?: string;
    large?: boolean;
}

function Avatar({seed, large}: Props) {
    const {data:session} = useSession();
  return (
    <div className={`relative rounded-full border-gray-500 bg-white ml-4 overflow-hidden 
    ${large? 'h-20 w-20' : 'h-9 w-9'}`
    }>
        <Image 
            alt=''
            layout='fill'
            src={
                `https://avatars.dicebear.com/api/open-peeps/
                ${seed || session?.user?.name || "placeholder"}.svg`
            }
        />
    </div>
  )
}

export default Avatar