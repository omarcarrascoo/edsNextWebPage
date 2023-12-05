"use client"
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react'

function AuthLinks() {
    const {status} = useSession()
  return (
    <>
    {
        status ==="unauthenticated" ? (
            <li className='clascicBlue'><Link href={"/login"}>Login</Link></li>
        ):(
            <>
            <li><Link href={"/write"}>Write</Link></li>
            <li className='clascicBlue'><Link href={"/login"} onClick={signOut}>Logout</Link></li>
            </>
        )
    }
    </>
  )
}

export default AuthLinks
