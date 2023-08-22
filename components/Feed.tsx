import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import React from "react";
import Post from "./Post";

type Props = {
  topic?: string;
};

function Feed({ topic }: Props) {
  const { data, error} = topic
    ? useQuery(GET_ALL_POSTS_BY_TOPIC, {
      variables: {
        topic: topic,
      },
    })
    : useQuery(GET_ALL_POSTS);

  const posts: Post[] = topic ? data?.postlistByTopic : data?.postList;
  console.log(error);
  console.log(data?.postlistByTopic)

  return (
    <div className="w-full mt-5 space-y-4">
      {posts?.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
}

export default Feed;
