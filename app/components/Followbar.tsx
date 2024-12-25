"use client";
import React from "react";
import useUsers from "../hooks/useUsers";
import Avatar from "./Avatar";

const Followbar = () => {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) {
    return (
      <div className="px-6 py-4 hidden lg:block">
        <div className="bg-neutral-800 rounded-xl p-4">
          <h2 className="text-white text-xl font-semibold">Loading...</h2>
        </div>
      </div>
    );
  }

  if (error || !users || users.length === 0) {
    console.error("Error or no users found:", error);
    return null;
  }

  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {users.map((user: { id: string; name: string, username: string }) => (
            <div key={user.id} className="flex flex-row gap-4">
              <Avatar userId={user.id} />
              <div className="flex flex-col">
                <p className="text-white font-semibold text-sm">{user.name}</p>
                <p className="text-neutral-400 text-sm">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Followbar;
