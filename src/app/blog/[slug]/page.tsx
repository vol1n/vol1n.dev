import React from "react";
import { format, parseISO } from "date-fns";
import { allPosts } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";

export const generateStaticParams = async () => 
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const post = allPosts.find((post) => post._raw.flattenedPath === slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  return { title: post.title };
};

const PostLayout = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const post = allPosts.find((post) => post._raw.flattenedPath === slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

  return (
    <article className="relative mx-auto max-w-3xl py-8">
      {/* Back Button */}
      

      {/* Content Section */}
      <div className="bg-black/70 p-8 h-full rounded-lg shadow-lg backdrop-blur-md">
        <div className="absolute top-0 left-0 right-0 h-96 w-full overflow-hidden">
          <Image
            src={`${post.imageUrl}`}
            alt={post.title}
            fill
            className="opacity-40"
          />
        </div>
        <Link href="/blog">
          <span className="relative ml-4 mt-96 text-sm text-gray-400 hover:text-gray-200 transition">
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
        <div className="text-gray-300 [&>*]:mb-3 [&>*:last-child]:mb-0" 
          dangerouslySetInnerHTML={{ __html: post.body.html }} 
        />
      </div>
    </article>
  );
};

export default PostLayout;