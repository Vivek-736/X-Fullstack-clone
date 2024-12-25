"use client";
import Avatar from '@/app/components/Avatar';
import { formatDistanceToNowStrict } from 'date-fns/formatDistanceToNowStrict';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react'

interface CommentItemProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: Record<string, any>;
}

const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
    const router = useRouter();

    const goToUser = useCallback(() => {
        router.push(`/users/${data.user.id}`);
    }, [router, data.user.id]);

    const createdAt = useMemo(() => {
        if (!data.createdAt) {
            return null;
        }
        return formatDistanceToNowStrict(new Date(data.createdAt));
    }, [data?.createdAt]);
    return (
        <div className='border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition'>
            <div className='flex flex-row items-start gap-3'>
                <Avatar hasBorder userId={data.user.id} />
                <div className='flex-1'>
                    <div className='flex flex-row items-center gap-2'>
                        <p onClick={goToUser} className='text-white font-semibold cursor-pointer hover:underline'>
                            {data.user.name}
                        </p>
                        <span className='text-neutral-500 cursor-pointer hover:underline hidden md:block'>
                            @{data.user.username}
                        </span>
                        <span className='text-neutral-500 text-sm'>
                            {createdAt}
                        </span>
                    </div>
                    <div className='text-white mt-1'>
                        {data.body}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentItem
