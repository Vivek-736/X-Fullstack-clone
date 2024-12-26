"use client";
import useSWR from "swr";
import fetcher from "../libs/fetcher";

const useUser = (userId: string | undefined) => {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/users/${userId}` : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUser;
