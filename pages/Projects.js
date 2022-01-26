import React from "react";
import { PrismaClient } from "@prisma/client";
import ProjectCard from "../components/ProjectCard";

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const projects = await prisma.project.findMany();
  return {
    props: {
      projects,
    },
  };
}
function Projects({ projects }) {
  return (
    <div className="container mx-auto p-10 lg:p-20">
      <h2 className="text-3xl text-white">Projects</h2>
      <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default Projects;
