'use client'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    const navData = [
        {
            name: 'homepage',
            url: '/'
        },
        {
            name: 'get started',
            url: '/get-started'
        },
        {
            name: 'assessment',
            url: '/assessment'
        },
        {
            name: 'courses',
            url: '/courses'
        }
    ]

    return (
        <nav className="fixed right-4 flex justify-end py-4">
            <div className="border border-[255,255,255,0.1] text-white flex space-x-8 px-6 py-2 rounded-full">
                {
                    navData.map((nav, index) => {
                        return (
                            <Link key={index} href={nav.url}>
                                {nav.name}
                            </Link>
                        )
                    })
                }
            </div>
        </nav>
    )
}

export default Navbar