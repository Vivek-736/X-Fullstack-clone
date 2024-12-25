import React from 'react'
import Header from './components/Header'
import Form from './components/Form'
import PostFeed from './components/PostFeed'

const page = () => {
  return (
    <>
        <Header label="Home" />
        <Form placeholder="What is happening?!" />
        <PostFeed />
    </>
  )
}

export default page
