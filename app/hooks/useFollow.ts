"use client";
import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser"
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";
import axios from "axios";
import toast from "react-hot-toast";

const useFollow = (userId: string) => {
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(userId);

    const loginModal = useLoginModal();

    const isFollowing = useMemo(() => {
        const list = currentUser?.followindIds || [];

        return list.includes(userId);
    }, [userId, currentUser?.followindIds]);

    const toggleFollow = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;
            if (isFollowing) {
                request = () => axios.delete('/api/follow', { data: { userId } });
            } else {
                request = () => axios.post('/api/follow', { userId });
            }
            await request();

            mutateCurrentUser();
            mutateFetchedUser();
        }
        catch {
            toast.error("Failed to follow user");
        }
    }, [currentUser, isFollowing, userId, mutateCurrentUser, mutateFetchedUser, loginModal]);

    return {
        isFollowing,
        toggleFollow
    }
}

export default useFollow;
