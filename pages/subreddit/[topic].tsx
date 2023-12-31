import Avatar from "@/components/Avatar";
import Feed from "@/components/Feed";
import Postbox from "@/components/Postbox";
import { useRouter } from "next/router";
import React from "react";

function Subreddit() {
  const {
    query: { topic },
  } = useRouter();
  return (
    <div className={`h-24 bg-reddit_dark p-8`}>
      <div className="-mx-8 mt-10 bg-reddit_dark-brighter">
        <div className="mx-auto flex max-w-5xl items-center space-x-4 pb-3">
          <div className="-mt-5">
            <Avatar seed={topic as string} large />
          </div>
          <div className="py-2">
            <h1 className="text-3xl font=semibold text-white">
              Welcome to the r/{topic} subreddit
            </h1>
            <p className="text-sm text-gray-300">r/{topic}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mx-w-5xl mt-5 pb-10">
        <Postbox subreddit={topic as string} />
        <Feed topic={topic as string} />
      </div>
    </div>
  );
}

export default Subreddit;
