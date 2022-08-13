import React from "react";
import { PrismaClient } from "@prisma/client";
import { ArrowsExpandIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { getSession, useSession } from "next-auth/react";
import Loading from '../components/Loading';
import AccessDenied from '../components/AccessDenied';

export async function getServerSideProps(context) {
  const prisma = new PrismaClient();

  const session = await getSession(context);

  if (!session) {
    return {
      props: {
        session: null,
      },
    };
  }

  const projects = await prisma.project.findMany({
    where: {
      user: {
        email: session.user.email,
      },
    },
  });

  return {
    props: {
      projects,
      session,
    },
  };
}

function Projects({ projects }) {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    return <AccessDenied />;
  }

  return (
    <div className="pb-40">
      <div className="text-center text-3xl font-extrabold text-gray-900 mb-6">
        Projects
      </div>
      <ul
        role="list"
        className="flex justify-between grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mx-12"
      >
        {projects.map((project) => (
          <li
            key={project.id}
            className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
          >
            <div className="w-full flex items-center justify-between p-6 space-x-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="text-gray-1800 text-xl truncate">
                    {project.name}
                  </h3>
                </div>
                <p className="mt-1 text-gray-600 text-sm truncate">
                  {project.description}
                </p>
              </div>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="w-0 flex-1 flex">
                  <Link href={`/project/${project.id}`} passHref>
                    <div className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 cursor-pointer">
                      <ArrowsExpandIcon
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="mx-3">View Project</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Projects;
