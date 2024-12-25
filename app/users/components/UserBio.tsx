"use client";
import useUser from '@/app/hooks/useUser';
import React, { useMemo } from 'react';
import { format } from 'date-fns';
import Button from '@/app/components/Button';
import useCurrentUser from '@/app/hooks/useCurrentUser';
import { BiCalendar } from 'react-icons/bi';
import useEditModal from '@/app/hooks/useEditModal';
import useFollow from '@/app/hooks/useFollow';

interface UserBioProps {
    userId: string
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
    const { data: fetchedUser } = useUser(userId);
    const { data: currentUser } = useCurrentUser();

    const editModal = useEditModal();

    const { isFollowing, toggleFollow } = useFollow(userId);

    const createdAt = useMemo(() => {
        if (!fetchedUser?.createdAt) {
            return null;
        }
        return format(new Date(fetchedUser.createdAt), 'MMMM yyyy');
    }, [fetchedUser?.createdAt]);

    return (
        <div className='border-b-[1px] border-neutral-800 pb-4'>
            <div className='flex justify-end p-2'>
                {currentUser?.id === userId ? (
                    <Button onClick={editModal.onOpen} label='Edit Profile' secondary />
                ) : (
                    <Button onClick={toggleFollow} label={isFollowing ? "Unfollow": "Follow"} secondary={!isFollowing} outline={isFollowing} />
                )}
            </div>
            <div className='mt-8 px-4'>
                <div className='flex flex-col'>
                    <p className='text-white text-2xl font-semibold'>
                        {fetchedUser?.name}
                    </p>
                    <p className='text-lg text-neutral-500'>
                        @{fetchedUser?.username}
                    </p>
                </div>
                <div className='flex flex-col mt-4'>
                    <p className='text-white'>
                        {fetchedUser?.bio}
                    </p>
                    <div className='flex flex-row items-center gap-2 mt-4 text-neutral-500'>
                        <BiCalendar size={24} />
                        <p>
                            Joined {createdAt}
                        </p>
                    </div>
                </div>
                <div className='flex flex-row items-center mt-4 gap-6'>
                    <div className='flex flex-row items-center gap-1 ml-1'>
                        <p className='text-white'>
                            {fetchedUser?.followindIds?.length}
                        </p>
                        <p className='text-neutral-500'>
                            Following
                        </p>
                    </div>
                    <div className='flex flex-row items-center gap-1'>
                        <p className='text-white'>
                            {fetchedUser?.followersCount || 0}
                        </p>
                        <p className='text-neutral-500'>
                            Followers
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserBio
