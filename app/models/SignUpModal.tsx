"use client";
import React, { useCallback, useState } from 'react'
import useLoginModal from '../hooks/useLoginModal'
import Input from '../components/Input';
import Modal from '../components/Modal';
import useSignUpModal from '../hooks/useSignUpModal';
import axios from 'axios';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

const SignUpModal = () => {
    const LoginModal = useLoginModal();
    const SignUpModal = useSignUpModal();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        if(isLoading) {
            return;
        }
        SignUpModal.onClose();
        LoginModal.onOpen();
    }, [isLoading, SignUpModal, LoginModal]);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            await axios.post('/api/register', {
                email,
                name,
                username,
                password
            });

            toast.success('Account created successfully');

            await signIn('credentials', {
                email,
                password,
                redirect: false
            });

            SignUpModal.onClose();
        }
        catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        }
        finally {
            setIsLoading(false);
        }
    }, [SignUpModal, email, name, username, password]);

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} disabled={isLoading} />
            <Input placeholder='Name' onChange={(e) => setName(e.target.value)} value={name} disabled={isLoading} />
            <Input placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username} disabled={isLoading} />
            <Input placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)} value={password} disabled={isLoading} />
        </div>
    )

    const footerContent = (
        <div className='text-neutral-400 text-center mt-4'>
            <p>
                Already have an account? <span> </span>
                <span onClick={onToggle} className='text-white cursor-pointer hover:underline'>
                    LogIn
                </span>
            </p>
        </div>
    )

    return (
        <Modal
            isOpen={SignUpModal.isOpen}
            onClose={SignUpModal.onClose}
            title='Create an account'
            body={bodyContent}
            disabled={isLoading}
            actionLabel='Sign Up'
            onSubmit={onSubmit}
            footer={footerContent}
        />
    )
}

export default SignUpModal;
