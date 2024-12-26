"use client";
import useSWR from "swr";
import fetcher from "../libs/fetcher";

const usePost = (postId?: string) => {
    const url = postId ? `/api/posts/${postId}` : null;

    const { data, error, mutate } = useSWR(url, fetcher);

    return {
        data: data || [],
        error,
        isLoading: !data && !error,
        mutate,
    };
};

export default usePost;
