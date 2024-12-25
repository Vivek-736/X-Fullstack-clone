"use client";
import Form from '@/app/components/Form';
import Header from '@/app/components/Header';
import PostItem from '@/app/components/PostItem';
import usePost from '@/app/hooks/usePost';
import { useParams } from 'next/navigation';
import React from 'react';
import { ClipLoader } from 'react-spinners';
import CommentsFeed from '../components/CommentsFeed';

const PostView = () => {
  const params = useParams();
  const postId = Array.isArray(params?.postId) ? params.postId[0] : params?.postId;

  const { data: fetchedPost, isLoading } = usePost(postId);

  if (isLoading || !fetchedPost) {
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color="white" />
      </div>
    );
  }

  return (
    <>
      <Header label="Post" showBackArrow />
      <PostItem data={fetchedPost} />
      <Form postId={postId} isComment placeholder="Post your reply" />
      <CommentsFeed comments={fetchedPost?.comments} />
    </>
  );
};

export default PostView;
