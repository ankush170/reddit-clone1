import Postbox from "@/components/Postbox";
import Head from "next/head";


export default function Home() {
  return (
    <div className="max-w-5xl my-6 mx-auto">
      <Head>
        <title>Reddit Clone</title>
      </Head>

      <Postbox/>

      <div className="flex">
        {/* {Feed} */}
      </div>
    </div>
  )
}
