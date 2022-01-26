import React from "react";
import Link from "next/link";
import Image from "next/image";
import Go from "../public/right-arrow.png";

function ProjectCard({ project }) {
  return (
    <div
      key={project.id}
      className="p-8 space-y-3 border-2 border-green-400  rounded-xl bg-green-300"
    >
      <h1 className="text-2xl font-semibold text-gray-700 capitalize">
        {project.name}
      </h1>
      <p className="text-gray-600">{project.description}</p>
      <div className="mt-4">
        <Link href={`/project/${project.id}`} passHref>
          <Image
            src={Go}
            width={30}
            height={30}
            className="cursor-pointer"
            alt="arrow pointer"
          />
        </Link>
      </div>
    </div>
  );
}

export default ProjectCard;
