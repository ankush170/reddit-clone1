import React from 'react'
import {ArrowDownIcon,
        ArrowUpIcon,
        BookmarkIcon,
        ChatBubbleOvalLeftEllipsisIcon,
        GiftIcon,
        ShareIcon
    } from '@heroicons/react/24/outline'
import Avatar from './Avatar'
import TimeAgo from 'react-timeago'

type Props = {
    post: Post
}

function Post({post}: Props) {
  return (
    <div className='flex cursor-pointer bg-reddit_dark-brighter shadow-sm hover:border hover:border-gray-700'>
        <div className='flex flex-col items-center justify-start space-y-1
        rounded-l-md bg-gray-50 p-4 text-gray-400'>
            <ArrowUpIcon className='voteButton text-white hover:text-blue-400'/>
            <p className='text-xs font-bold text-white'>0</p>
            <ArrowDownIcon className='voteButton text-white hover:text-red-400'/> 
        </div>

        <div className='p-3 pb-1'>
            <div className='flex items-center space-x-2'>
                <Avatar seed={post.subreddit[0]?.topic}/>
                <p className='text-sm text-gray-500'>
                    <span className='font-bold text-white hover:text-blue-400 hover:underline'>
                        r/{post.subreddit[0]?.topic}</span> • Posted by u/{post.username} <TimeAgo date={post.created_at} />
                </p>
            </div>

            <div className='py-4'>
                <h2 className='text-xl font-semibold'>{post.title}</h2>
                <p className='mt-2 text-sm font-light'>{post.body}</p>
            </div>

            <img className='w-full' src={post.image} alt=''/>

            <div className='flex space-x-4 text-gray-500'>
                <div className='postButtons'>
                    <ChatBubbleOvalLeftEllipsisIcon className='h-6 w-6'/>
                    <p className=''>{post.comments.length} Comments</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post;