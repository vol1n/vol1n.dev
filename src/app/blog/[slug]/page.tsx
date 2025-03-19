import React from "react";
import { format, parseISO } from "date-fns";
import { allPosts } from "contentlayer/generated";
import { useMDXComponent } from 'next-contentlayer2/hooks'
import Image from "next/image";
import Link from "next/link";

export const generateStaticParams = async () => 
  allPosts.map((post) => ({ slug: post._raw.sourceFileName.split('.')[0] }));

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const post = allPosts.find((p) => p._raw.sourceFileName.split('.')[0] === slug);
  if (!post) throw new Error(`Post not found for slug: ${slug}`);
  return { title: post.title };
};

const MdxRenderer = ({ code }: { code: string | null }) => {
  const MDXContent = code ? useMDXComponent(code) : () => <></>;
  return <MDXContent />;
};

const PostLayout = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const post = allPosts.find((p) => p._raw.sourceFileName.split('.')[0] === slug);
  if (!post) throw new Error(`Post not found for slug: ${slug}`);

  return (
    <article className="relative mx-auto max-w-3xl py-8">
      {/* Content Section */}
      <div className="bg-black/70 p-8 h-full rounded-lg shadow-lg backdrop-blur-md">
        <div className="absolute top-16 left-0 right-0 h-96 w-full overflow-hidden">
          <Image
            src={`${post.imageUrl}`}
            alt={post.title}
            fill
            className=""
          />
        </div>
        <Link href="/blog">
          <span className="z-10 relative ml-4 mt-96 text-sm text-gray-400 hover:text-gray-200 transition">
            ← Back
          </span>
        </Link>
        <div className="relative z-10 mt-96 bg-black/70 p-8 rounded-lg shadow-lg backdrop-blur-md">
          <time dateTime={post.date} className="mb-1 text-xs text-gray-400">
            {format(parseISO(post.date), "LLLL d, yyyy")}
          </time>
          <h1 className="text-3xl font-bold text-white">{post.title}</h1>
        </div>

        {/* Blog Content */}
        <MdxRenderer code={post.body.code} />
      </div>
    </article>
  );
};

export default PostLayout;