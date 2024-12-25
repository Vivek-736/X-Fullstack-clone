"use client";
import React, { useCallback, useState } from 'react'
import useLoginModal from '../hooks/useLoginModal'
import Input from '../components/Input';
import Modal from '../components/Modal';
import useSignUpModal from '../hooks/useSignUpModal';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

const LoginModal = () => {
    const LoginModal = useLoginModal();
    const SignUpModal = useSignUpModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }
        LoginModal.onClose();
        SignUpModal.onOpen();
    }, [isLoading, SignUpModal, LoginModal]);

    const onSubmit = useCallback(async() => {
        try {
            setIsLoading(true);
            await signIn('credentials', {
                email,
                password,
                redirect: false
            })

            toast.success('Logged in successfully');

            LoginModal.onClose();
        }
        catch (error) {
            console.error(error);
            toast.error('Invalid credentials');
        }
        finally {
            setIsLoading(false);
        }
    }, [LoginModal, email, password]);

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} disabled={isLoading} />
            <Input placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)} value={password} disabled={isLoading} />
        </div>
    )

    const footerContent = (
        <div className='text-neutral-400 text-center mt-4'>
            <p>
                Don&apos;t have an account? <span> </span>
                <span onClick={onToggle} className='text-white cursor-pointer hover:underline'>
                    SignUp
                </span>
            </p>
        </div>
    )

    return (
        <Modal
            isOpen={LoginModal.isOpen}
            onClose={LoginModal.onClose}
            title='LogIn'
            body={bodyContent}
            disabled={isLoading}
            actionLabel='Log In'
            onSubmit={onSubmit}
            footer={footerContent}
        />
    )
}

export default LoginModal
