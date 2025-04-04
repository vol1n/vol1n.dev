import React from 'react';
import { allProjects, allPosts } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";
import { MainLink } from "@/components/MainLink";
import PostCard from '@/components/PostCard';
import { useMDXComponent } from 'next-contentlayer2/hooks';

export const generateStaticParams = async () =>
  allProjects.map((project) => ({ slug: project._raw.sourceFileName.split('.')[0] }));

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const project = allProjects.find((p) => p._raw.sourceFileName.split('.')[0] === slug);
  if (!project) throw new Error(`Project not found for slug: ${slug}`);
  return { title: project.name };
};

const MdxRenderer = ({ code }: { code: string | null }) => {
  const MDXContent = code ? useMDXComponent(code) : () => <></>;
  return <MDXContent />;
};

const ProjectLayout = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const project = allProjects.find((p) => p._raw.sourceFileName.split('.')[0] === slug);
  if (!project) throw new Error(`Project not found for slug: ${slug}`);

  // Find all related blog posts that reference this project
  const relatedPosts = allPosts.filter((post) => post.projectId === slug);

  return (
    <article className="relative mx-auto max-w-3xl py-8 mt-8">
      {/* Project Image Background */}
      <div className="absolute top-16 left-0 right-0 h-96 w-full overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Back Button */}
      <Link href="/projects">
        <span className="z-10 relative ml-4 mt-96 text-sm text-gray-400 hover:text-gray-200 transition">
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
      
      <MdxRenderer code={project.body.code}/>
      {/* Blog Posts Related to This Project */}
      {relatedPosts.length > 0 && 
        <div className="mt-12 gap-4 flex flex-col">
          {relatedPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>}
    </article>
  );
};

export default ProjectLayout;
