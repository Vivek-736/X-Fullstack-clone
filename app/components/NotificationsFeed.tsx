/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react'
import useCurrentUser from '../hooks/useCurrentUser';
import useNotifications from '../hooks/useNotifications';
import { IoNotificationsCircleSharp } from 'react-icons/io5';

const NotificationsFeed = () => {
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

    useEffect(() => {
        mutateCurrentUser();
    }, [mutateCurrentUser])

    if (fetchedNotifications.length === 0) {
        return (
            <div className='text-white text-center p-6 text-xl'>
                No notifications
            </div>
        )
    }
    return (
        <div className='flex flex-col'>
            {fetchedNotifications.map((notification: Record<string, any>) => (
                <div key={notification.id} className='flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800'>
                    <IoNotificationsCircleSharp color='blue' size={32} />
                    <p className='text-white'>
                        {notification.body}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default NotificationsFeed
