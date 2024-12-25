"use client";
import React from 'react'
import { BsBellFill, BsHouseFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import SidebarLogo from './SidebarLogo'
import SidebarItem from './SidebarItem'
import { BiLogOut } from 'react-icons/bi'
import SidebarPostButton from './SidebarPostButton'
import { signOut, useSession } from 'next-auth/react'
import useCurrentUser from '../hooks/useCurrentUser';

const Sidebar = () => {
    const {data: session} = useSession();
    const {data: curentUser} = useCurrentUser();

    const items = [
        {
            label: 'Home',
            href: "/",
            icon: BsHouseFill,
        },
        {
            label: 'Notifications',
            href: "/notifications",
            icon: BsBellFill,
            auth: true,
            alert: curentUser?.hasNotification,
        },
        {
            label: 'Profile',
            href: `/users/${curentUser?.id}`,
            icon: FaUser,
            auth: true
        }
    ]

    return (
        <div className='col-span-1 h-full pr-4 md:pr-6'>
            <div className='flex flex-col items-end'>
                <div className='space-y-2 lg:w-[230px]'>
                    <SidebarLogo />
                    {items.map((item) => (
                        <SidebarItem
                            key={item.href}
                            label={item.label}
                            href={item.href}
                            icon={item.icon}
                            auth={item.auth}
                            alert={item.alert}
                        />
                    ))}
                    {session ? (<SidebarItem onClick={() => signOut()} icon={BiLogOut} label='LogOut' />) : (null)}
                    <SidebarPostButton />
                </div>
            </div>
        </div>
    )
}

export default Sidebar
