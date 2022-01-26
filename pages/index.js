import Image from "next/image";
import Link from "next/link";
import slingShot from "../public/Slingshot.svg";

export default function index() {
  return (
    <div className="container">
      <div className="grid grid-cols-1 px-20 pt-28 justify-items-center lg:grid-cols-2">
        <div className="ml-8 mx-auto  lg:pl-9">
          <Image src={slingShot} alt="slingshot image" />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className=" text-white lg:pl-10 text-7xl font-semibold  text-center ">
            Shoot your shot and start your new project with
            <span className="relative  text-4xl">
              <span className="block absolute -inset-1 -skew-y-3 bg-green-500"></span>
              <span className="relative text-white"> Slingshot</span>
            </span>
          </h2>
          <div className="mt-10 flex justify-center ">
            <button className="text-3xl  bg-green-500 p-2  rounded-lg text-white  hover:bg-green-400">
              <Link href="/CreateProject">Start a project</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
