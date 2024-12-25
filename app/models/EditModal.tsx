"use client";
import React, { useCallback, useEffect, useState } from 'react'
import useCurrentUser from '../hooks/useCurrentUser'
import useEditModal from '../hooks/useEditModal';
import useUser from '../hooks/useUser';
import toast from 'react-hot-toast';
import axios from 'axios';
import Modal from '../components/Modal';
import Input from '../components/Input';
import ImageUpload from '../components/ImageUpload';

const EditModal = () => {
    const { data: currentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
    const editModal = useEditModal();

    const [name, setName] = useState<string>(currentUser?.name || '');
    const [coverImage, setCoverImage] = useState<string | undefined>(undefined);
    const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
    const [bio, setBio] = useState<string>(currentUser?.bio || '');
    const [username, setUsername] = useState<string>(currentUser?.username || '');

    useEffect(() => {
        setProfileImage(currentUser?.profileImage);
        setCoverImage(currentUser?.coverImage);
        setName(currentUser?.name);
        setUsername(currentUser?.username);
        setBio(currentUser?.bio);
    }, [currentUser])

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            await axios.patch("/api/edit", {
                name,
                coverImage,
                profileImage,
                bio,
                username
            })
            mutateFetchedUser();
            toast.success("Profile updated successfully");
            editModal.onClose();
        }
        catch (error) {
            toast.error("Something went wrong")
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    }, [bio, name, coverImage, profileImage, username, mutateFetchedUser, editModal]);

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <ImageUpload
                value={profileImage}
                disabled={isLoading}
                onChange={(image) => setProfileImage(image)}
                label='Upload profile image'
            />
            <ImageUpload
                value={coverImage}
                disabled={isLoading}
                onChange={(image) => setCoverImage(image)}
                label='Upload cover image'
            />
            <Input
                placeholder='Name'
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />
            <Input
                placeholder='Username'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}
            />
            <Input
                placeholder='Bio'
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                disabled={isLoading}
            />
        </div>
    )
    return (
        <Modal
            disabled={isLoading}
            isOpen={editModal.isOpen}
            title='Edit your profile'
            onClose={editModal.onClose}
            onSubmit={onSubmit}
            actionLabel='Save'
            body={bodyContent}
        />
    )
}

export default EditModal
