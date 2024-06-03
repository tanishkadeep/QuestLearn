'use client'
import { navData } from '@/utils/constants'
import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import authContext from '@/context/Auth/authContext'
import { useRouter } from 'next/navigation'

const Navbar = () => {

    const { user, signout } = useContext(authContext)
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push('/sign-in')
        }
    }, [user])


    return (
        <nav className="fixed right-4 flex space-x-4 justify-end py-4 font-poppins">
            <div className="border border-[255,255,255,0.1] text-white flex space-x-8 px-6 py-2 rounded-full">
                {
                    navData.map((nav, index) => {
                        return (
                            <Link className='flex items-center' key={index} href={nav.url}>
                                {nav.name}
                            </Link>
                        )
                    })
                }
            </div>
            <div className="auth">
                {
                    user ? (
                        <button onClick={signout} className="btn px-8 text-lg rounded-full text-white bg-transparent hover:bg-[#f064cb]">Sign Out</button>
                    ) : (
                        <Link href="/sign-in">
                            <button className='btn bg-[#ff36ca] px-8 text-lg border-none rounded-full text-white hover:bg-[#f064cb]'>Sign In</button>
                        </Link>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar