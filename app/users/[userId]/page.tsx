"use client";

import Header from "@/app/components/Header";
import useUser from "@/app/hooks/useUser";
import { useParams } from "next/navigation";
import React from "react";
import { ClipLoader } from "react-spinners";
import UserHero from "../components/UserHero";
import UserBio from "../components/UserBio";
import PostFeed from "@/app/components/PostFeed";

const UserView = () => {
  const params = useParams();
  const userId = Array.isArray(params?.userId) ? params.userId[0] : params?.userId;

  const { data: fetchedUser, isLoading } = useUser(userId);

  if (isLoading || !fetchedUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="#ffffff" />
      </div>
    );
  }

  return (
    <div>
      <Header showBackArrow label={fetchedUser.name} />
      <UserHero userId={userId} />
      <UserBio userId={userId} />
      <PostFeed userId={userId} />
    </div>
  );
};

export default UserView;
