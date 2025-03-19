import { allProjects, Project } from 'contentlayer/generated'
import Link from 'next/link'
import Image from 'next/image';

function ProjectCard({ name, url, imageUrl }: Project) {
  return (
    <Link href={url} className="block">
      <div className="relative aspect-square overflow-hidden rounded-lg border border-gray-700 bg-zinc-900 p-4 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-center justify-center">
        {/* Purple Accent Line */}
        <div className="absolute left-0 bottom-0 h-1 w-full bg-purple-500" />
        
        {/* Image */}
        {imageUrl && (
          <div className="relative w-48 h-36 mb-3">
            <Image
              src={imageUrl}
              alt={name}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        )}

        {/* Project Title */}
        <h2 className="text-center text-lg font-semibold text-blue-500 hover:text-purple-400 transition-colors duration-200">
          {name}
        </h2>
      </div>
    </Link>
  );
}

export default function Home() {
  const projects = allProjects.sort((a, b) => a.order - b.order);

  return (
    <div className="mx-auto max-w-5xl py-8">
      <h1 className="mb-8 text-center text-2xl font-black">Projects</h1>
      
      {/* Grid Layout */}
      <div className="grid grid-cols-3 gap-6">
        {projects.map((project, idx) => (
          <ProjectCard key={idx} {...project} />
        ))}
      </div>
    </div>
  );
}