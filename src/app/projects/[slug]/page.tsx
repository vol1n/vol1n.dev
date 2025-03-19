import React from 'react';
import { format, parseISO } from "date-fns";
import { allProjects, allPosts } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";
import { MainLink } from "@/components/MainLink";

export const generateStaticParams = async () =>
  allProjects.map((project) => ({ slug: project._raw.sourceFileName }));

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const project = allProjects.find((p) => p._raw.sourceFileName.split('.')[0] === slug);
  if (!project) throw new Error(`Project not found for slug: ${params.slug}`);
  return { title: project.name };
};

const ProjectLayout = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const project = allProjects.find((p) => p._raw.sourceFileName.split('.')[0] === slug);
  if (!project) throw new Error(`Project not found for slug: ${params.slug}`);

  // Find all related blog posts that reference this project
  const relatedPosts = allPosts.filter((post) => post.projectId === slug);

  return (
    <article className="relative mx-auto max-w-3xl py-8">
      {/* Project Image Background */}
      <div className="absolute top-0 left-0 right-0 h-96 w-full overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.name}
          fill
          className="opacity-40 object-cover"
        />
      </div>

      {/* Back Button */}
      <Link href="/projects">
        <span className="relative ml-4 mt-96 text-sm text-gray-400 hover:text-gray-200 transition">
          ← Back to Projects
        </span>
      </Link>

      {/* Project Details */}
      <div className="relative z-10 mt-96 bg-black/70 p-8 rounded-lg shadow-lg backdrop-blur-md">
        <h1 className="text-5xl font-bold text-white">{project.name}</h1>

        {/* Links */}
        <div className="mt-3 flex gap-4">
          {project.githubUrl && (
            <MainLink href={project.githubUrl} text="GitHub" />
          )}
          {project.liveUrl && (
            <MainLink href={project.liveUrl} text="Live Demo" />
          )}
        </div>
      </div>

      {/* Blog Posts Related to This Project */}
      {relatedPosts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-white mb-4">Related Blog Posts</h2>
          <div className="flex flex-col gap-6">
            {relatedPosts.map((post) => (
              <Link key={post._id} href={post.url} className="block bg-gray-800 p-4 rounded-md hover:bg-gray-700 transition">
                <h3 className="text-lg font-semibold text-blue-400">{post.title}</h3>
                <p className="text-gray-400 text-sm">{format(parseISO(post.date), "LLLL d, yyyy")}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default ProjectLayout;
