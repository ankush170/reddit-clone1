import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import Avatar from './Avatar';
import { LinkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import {useForm} from 'react-hook-form'
import { useMutation } from '@apollo/client';
import { ADD_POST, ADD_SUBREDDIT } from '@/graphql/mutations';
import client from '@/apollo-client';
import { GET_SUBREDDIT_BY_TOPIC } from '@/graphql/queries';
import { toast } from 'react-hot-toast';

type FormData = {
    postTitle: string;
    postBody: string;
    postImage: string;
    subReddit: string;
}




function Postbox() {
    const {data:session} = useSession();
    const [addPost] = useMutation(ADD_POST)
    const [addSubreddit] = useMutation(ADD_SUBREDDIT)

    const [imageBoxOpen, setImageBoxOpen] = useState(false);
    const{
        register,
        setValue,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<FormData>()

    const onSubmit = handleSubmit(async (formData) => {
        console.log(formData)
        const notification = toast.loading('Creating New Post...')

        try {
            const {data: {subredditListByTopic},}=await client.query({
                query: GET_SUBREDDIT_BY_TOPIC,
                variables: {
                    topic: formData.subReddit,
                },
            })

            const subredditExists = subredditListByTopic.length > 0;

            if (!subredditExists){
                console.log('Subreddit is new -> creating a new subreddit')

                const {data: {insertSubreddit: newSubreddit}}=await addSubreddit({
                    variables: {
                        topic: formData.subReddit
                    }
                })

                console.log('Creating Post...', formData)

                const image = formData.postImage || ''

                const {data: {insertPost: newPost}}=await addPost({
                    variables: {
                        body: formData.postBody,
                        image: image,
                        subreddit_id: newSubreddit.id,
                        title: formData.postTitle,
                        username: session?.user?.name
                    }
                })

                console.log('New Post Added', newPost)
            }else{
                console.log('Using existing Subreddit')
                console.log(subredditListByTopic)

                const image = formData.postImage || ''
                
                const {data: {insertPost: newPost}}=await addPost({
                    variables: {
                        body: formData.postBody,
                        image: image,
                        subreddit_id: subredditListByTopic[0].id,
                        title: formData.postTitle,
                        username: session?.user?.name
                    }
                })
                console.log('New Post Added', newPost)
            }

            setValue('postBody', '')
            setValue('postImage', '')
            setValue('postTitle', '')
            setValue('subReddit', '')

            toast.success('New Post Created', {
                id: notification,
            })

        } catch (error) {
            toast.error('Whoops! Something went wrong', {
                id: notification,
            })
        }
    })
  return (
    <form 
    onSubmit={onSubmit}
    className='sicky top-16 z-50 rounded-md bg-reddit_dark-brighter p-2'>
        <div className='flex items-center space-x-3'>
            <Avatar/>
            <input 
             {...register('postTitle', {required:true})}
             disabled={!session}
             className='flex-1 rounded-md bg-reddit_dark-brighter p-2 pl-5 outline-none text-white'
             type='text'
             placeholder={ session? "Create a post by entering a title!"
            : "You have to sign in o post!"}/>

            <PhotoIcon 
            onClick={()=> setImageBoxOpen(!imageBoxOpen)}
            className={`icon ${imageBoxOpen && 'text-blue-300'}`}/>
            <LinkIcon className='icon'/>
        </div>

        {!!watch('postTitle') && (
            <div className='flex flex-col py-2 ml-2'>
                <div className='flex items-center px-2'>
                    <p className='text-white min-w-[90px]'>Body</p>
                    <input 
                    className='m-2 flex-1 bg-gray-300 p-2 outline-none'
                    {...register('postBody')}
                    type='text' 
                    placeholder='Text (optional)'/>
                </div>


                <div className='flex items-center px-2'>
                    <p className='text-white min-w-[90px]'>Subreddit</p>
                    <input 
                    className='m-2 flex-1 bg-gray-300 p-2 outline-none'
                    {...register('subReddit', {required:true})}
                    type='text' 
                    placeholder='e.g: r/ksi'/>
                </div>

                {imageBoxOpen && (
                <div className='flex items-center px-2'>
                    <p className='text-white min-w-[90px]'>Image URL</p>
                    <input 
                    className='m-2 flex-1 bg-gray-300 p-2 outline-none'
                    {...register('postImage')}
                    type='text' 
                    placeholder='Optional...'/>
                </div>
                )}

                {Object.keys(errors).length > 0 && (
                    <div className='space-y-2 p-2 text-red-500'>
                        {errors.postTitle?.type === 'required' && (
                            <p>- A Post Title is required -</p>
                        )}

                        {errors.subReddit?.type === 'required' && (
                            <p>- A SubReddit is required -</p>
                        )}
                    </div>
                )}

                {!!watch('postTitle') && (
                    <button 
                    type='submit'
                    className='w-full rounded-full bg-blue-400 p-2 text-white'>
                        Create Post
                    </button>
                )}

            </div>
        )}
    </form>
  )
}

export default Postbox
