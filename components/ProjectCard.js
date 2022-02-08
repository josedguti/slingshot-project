import { ArrowsExpandIcon } from "@heroicons/react/solid";
import Link from "next/link";

function ProjectCard({ projects }) {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((project) => (
        <li
          key={project.id}
          className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
        >
          <div className="w-full flex items-center justify-between p-6 space-x-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="text-gray-1800 text-sm font-medium truncate">
                  {project.name}
                </h3>
              </div>
              <p className="mt-1 text-gray-600 text-medium truncate">
                {project.description}
              </p>
            </div>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="w-0 flex-1 flex">
                <Link href={`/project/${project.id}`} passHref>
                  <a className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                    <ArrowsExpandIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-3">View Project</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ProjectCard;
