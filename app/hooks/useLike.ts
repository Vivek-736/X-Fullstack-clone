import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser"
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";
import axios from "axios";
import toast from "react-hot-toast";

const useLike = ({ postId, userId }: { postId: string, userId?: string }) => {
    const { data: currentUser } = useCurrentUser();
    const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
    const { mutate: mutateFetchedPosts } = usePosts(userId);

    const loginModal = useLoginModal();

    const hasLiked = useMemo(() => {
        const list = fetchedPost?.likedIds || [];

        return list.includes(currentUser?.id || "");
    }, [currentUser?.id, fetchedPost?.likedIds]);

    const toggleLike = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;

            if (hasLiked) {
                request = axios.delete(`/api/like`, { data: { postId } });
            } else {
                request = axios.post(`/api/like`, { postId });
            }
            await request;
            mutateFetchedPost();
            mutateFetchedPosts();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            toast.error("Something went wrong");
        }
    }, [currentUser, hasLiked, loginModal, mutateFetchedPost, mutateFetchedPosts, postId]);

    return { hasLiked, toggleLike };
}

export default useLike;
