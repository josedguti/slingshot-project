import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

function Nav() {
  const { data: session } = useSession();

  return (
    <div>
      <nav className="text-white body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <div className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            {session ? (
              <div className="flex fled-row items-center">
                <div className="h-16 w-16 relative">
                  <Image
                    src={session.user.image}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full mr-4"
                    alt="user profile image"
                  />
                </div>

                <p className="text-xl bold mr-4 ml-4">Hi,{session.user.name}</p>
              </div>
            ) : (
              ""
            )}
            <Link href="/" passHref>
              <div className="mr-5 cursor-pointer text-white">Home</div>
            </Link>
            <Link href="/Projects" passHref>
              <div className="mr-5 cursor-pointer text-white">Projects</div>
            </Link>
            {session ? (
              <span onClick={() => signOut()}>
                <div className="cursor-pointer text-white">Sign out</div>
              </span>
            ) : (
              <span onClick={() => signIn()}>
                <div className="mr-5 cursor-pointer text-white">Sign in</div>
              </span>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
