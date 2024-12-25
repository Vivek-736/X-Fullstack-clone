"use client";
import React from 'react'
import CommentItem from './CommentItem';

interface CommentsFeedProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    comments?: Record<string, any>[];
}

const CommentsFeed: React.FC<CommentsFeedProps> = ({ comments }) => {
  return (
    <>
        {comments?.map((comment) => (
            <CommentItem
                key={comment.id}
                data={comment} 
            />
        ))}
    </>
  )
}

export default CommentsFeed
