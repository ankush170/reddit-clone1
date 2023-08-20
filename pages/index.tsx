import Feed from "@/components/Feed";
import Postbox from "@/components/Postbox";
import type { NextPage } from "next";
import Head from "next/head";


const Home: NextPage = () => {
  return (
    <div className="max-w-5xl my-6 mx-auto">
      <Head>
        <title>Reddit Clone</title>
      </Head>

      <Postbox/>

      <div className="flex">
        <Feed />
      </div>
    </div>
  )
}

export default Home;
