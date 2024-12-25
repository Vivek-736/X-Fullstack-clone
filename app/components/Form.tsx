"use client";
import React, { useCallback, useState } from 'react'
import useSignUpModal from '../hooks/useSignUpModal';
import useLoginModal from '../hooks/useLoginModal';
import useCurrentUser from '../hooks/useCurrentUser';
import usePosts from '../hooks/usePosts';
import toast from 'react-hot-toast';
import axios from 'axios';
import Button from './Button';
import Avatar from './Avatar';
import usePost from '../hooks/usePost';

interface FormProps {
    placeholder: string;
    isComment?: boolean;
    postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
    const SignUpModal = useSignUpModal();
    const LoginModal = useLoginModal();

    const { data: currentUser } = useCurrentUser();
    const { mutate: mutatePosts } = usePosts();
    const { mutate: mutatePost } = usePost(postId);

    const [body, setBody] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            const url = isComment ? `/api/comments?postId=${postId}` : '/api/posts';

            await axios.post(url, { body });
            toast.success('Post created successfully');
            setBody('');
            mutatePosts();
            mutatePost();
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        catch (error) {
            toast.error("Something went wrong");
        }
        finally {
            setIsLoading(false);
        }
    }, [body, mutatePosts, isComment, postId, mutatePost]);
    return (
        <div className='border-b-[1px] border-neutral-800 px-5 py-2'>
            {currentUser ? (
                <div className='flex flex-row gap-4'>
                    <div>
                        <Avatar hasBorder userId={currentUser?.id} />
                    </div>
                    <div className='w-full'>
                        <textarea disabled={isLoading} onChange={(e) => { setBody(e.target.value) }} value={body} placeholder={placeholder} className='disabled:opacity-80 resize-none mt-3 w-full bg-black ring-0 text-[20px] placeholder-neutral-500  text-white outline-none'>
                        </textarea>
                        <hr className='opacity-100 h-[1px] w-full border-neutral-800 transition' />
                        <div className='mt-2 flex flex-row justify-end'>
                            <Button secondary disabled={isLoading} onClick={onSubmit} label='Post' />
                        </div>
                    </div>
                </div>
            ) : (
                <div className='py-8'>
                    <h1 className='text-white text-2xl text-center mb-4 font-bold'>
                        Welcome to X Clone😂
                    </h1>
                    <div className='flex flex-row items-center justify-center gap-4'>
                        <Button label="LogIn" onClick={LoginModal.onOpen} />
                        <Button label="SignUp" secondary onClick={SignUpModal.onOpen} />
                    </div>
                </div>)}
        </div>
    )
}

export default Form
