import useSWR from "swr";
import fetcher from "../libs/fetcher";

const usePosts = (userId?: string) => {
    const url = userId ? `/api/posts?userId=${userId}` : "/api/posts";

    const { data, error, mutate } = useSWR(url, fetcher);

    return {
        data: data || [],
        error,
        isLoading: !data && !error,
        mutate,
    };
};

export default usePosts;
