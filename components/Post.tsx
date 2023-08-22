import React, { useEffect, useState } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import Avatar from "./Avatar";
import TimeAgo from "react-timeago";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_VOTES_BY_POST_ID } from "@/graphql/queries";
import { ADD_VOTE } from "@/graphql/mutations";
import {Jelly} from '@uiball/loaders'

type Props = {
  post: Post;
};

function Post({ post }: Props) {
  const [vote, setVote] = useState<boolean>()
  const {data: session } = useSession()

  const {data, loading} = useQuery(GET_VOTES_BY_POST_ID, {
    variables: {
      post_id: post?.id
    }
  })

  const [addVote] = useMutation (ADD_VOTE, {
    refetchQueries: [GET_VOTES_BY_POST_ID, 'voteUsingVote_post_id_fkey']
  })

  useEffect (()=>{
    const votes: Vote[] = data?.voteUsingVote_post_id_fkey;

    const vote = votes?.find(
      (vote) => vote.username == session?.user?.name
    )?.upvote

    setVote(vote)
  }, [data])

  const upVote = async (isUpvote : boolean) => {
    if (!session) {
      toast("You'll need to sign in to vote!")
      return
    }

    if (vote && isUpvote) return;
    if (vote === false && !isUpvote) return;


    const {data: {insertVote: newVote},}= await addVote({
      variables: {
        post_id: post.id,
        username: session?.user?.name,
        upvote: isUpvote,
      }
    })

    console.log(data)
  }

  const displayVotes = (data: any) => {
    const votes: Vote[] = data?.voteUsingVote_post_id_fkey
    const displayNumber = votes?.reduce(
      (total, vote) => (vote.upvote ? (total += 1) : (total -= 1)), 0
    )

    if (votes?.length === 0) return 0

    if (displayNumber === 0) {
      return votes[0]?.upvote ? 1 : -1
    }

    return displayNumber;
  }

  if (!post)
    return (
      <div className="flex w-full items-center justify-center p-10 text-xl">
        <Jelly size={50} color="#FF4501" />
      </div>
    );

  return (
    <Link href={`/post/${post.id}`}>
      <div className="flex cursor-pointer bg-reddit_dark-brighter shadow-sm hover:border hover:border-gray-700">
        <div
          className="flex flex-col items-center justify-start space-y-2
        rounded-l-md bg-reddit_dark-brighter p-4 text-gray-400"
        >
          <ArrowUpIcon 
          onClick={() => upVote(true)}
          className={`h-5 w-5 cursor-pointer voteButton text-white hover:text-blue-400 ${vote ? 'text-blue-400' : ''}`} />
          <p className="text-s font-bold text-white">
            {displayVotes(data)}
          </p>
          <ArrowDownIcon 
          onClick={() => upVote(false)}
          className={`voteButton cursor-pointer text-white hover:text-red-400 ${vote === false ? "text-red-400" : ''}`} />
        </div>

        <div className="p-3 pb-1">
          <div className="flex items-center space-x-2">
            <Avatar seed={post.subreddit[0]?.topic} />
            <p className="text-sm text-gray-500">
              <Link href={`/subreddit/${post.subreddit[0]?.topic}`}>
                <span className="font-bold text-white hover:text-blue-400 hover:underline">
                  r/{post.subreddit[0]?.topic}
                </span>
              </Link>
              {' '}• Posted by u/{post.username} <TimeAgo date={post.created_at} />
            </p>
          </div>

          <div className="py-4">
            <h2 className="text-xl text-white font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm text-white font-light">{post.body}</p>
          </div>

          <img className="w-full" src={post.image} alt="" />

          <div className="flex space-x-4 text-gray-500">
            <div className="postButtons">
              <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
              <p className="">{post.comments.length} Comments</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Post;
