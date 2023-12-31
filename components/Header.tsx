import Image from "next/image";
import Logo from "../public/logo.png";
import SignInLogo from "../public/signIn-logo.png";
import {
  ChevronDownIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();
  return (
    <div className="sticky top-0 z-50 bg-reddit_dark flex px-4 py-2 items-center">
      <div className="relative h-10 w-10 flex-shrink-0 cursor-pointer">
        <Link href="/">
          <Image src={Logo} alt={"Logo"} />
        </Link>
      </div>
      <div className="px-2 py-1 flex xl:min-w-[100px] cursor-pointer">
        <HomeIcon className="text-white h-6 w-6 m-1 mx-2" />
        <p className="text-white hidden mt-1 lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5 text-white mt-2 ml-2" />
      </div>
      <form
        className="bg-reddit_dark-brighter px-3 flex rounded-md border border-gray-600 
                mx-4 flex-1 items-center"
      >
        <MagnifyingGlassIcon className="text-gray-300 h-6 w-6 mt-1" />
        <input
          type="text"
          className="bg-reddit_dark-brighter flex-1 text-sm p-1 pl-2 pr-0 block 
                    focus:outline-none text-white"
          placeholder="Search"
        />
        <button type="submit" hidden />
      </form>
      {session ? (
        <div
          onClick={() => signOut()}
          className="flex cursor-pointer items-center space-x-1 ml-2"
        >
          <div className="relaive h-10 w-10 flex-shrink-0">
            <Image src={SignInLogo} alt={"SignIn logo"} />
          </div>
          <div className="flex-1 text-white text-xs">
            <p className="truncate">{session?.user?.name}</p>
            <p className="hidden text-gray-200 lg:flex">Log Out</p>
          </div>
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className="flex cursor-pointer items-center space-x-1 ml-2"
        >
          <ArrowLeftOnRectangleIcon className="icon" />
          <p className="hidden text-gray-200 lg:flex">Log In</p>
        </div>
      )}
    </div>
  );
}

