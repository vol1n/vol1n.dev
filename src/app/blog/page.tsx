import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts, Post } from 'contentlayer/generated'
import Link from 'next/link'
import Image from 'next/image';


function PostCard(post: Post) {
  return (
    <Link href={post.url}>
      <div className="relative mb-8 overflow-hidden rounded-lg border border-gray-700 bg-zinc-900 p-6 shadow-md transition-transform duration-300 hover:scale-103 hover:shadow-xl">
        {/* Purple Accent Line */}
        <div style={{ background: 'hsl(240, 88%, 62%)' }} className="absolute left-0 top-0 h-full w-1" />
        <div className="flex gap-4">
          {/* Image */}
          {post.imageUrl && (
            <div className="relative h-20 w-32 flex-shrink-0 overflow-hidden rounded-md">
              <Image
                src={`${post.imageUrl}`}
                alt={post.title}
                width={600}
                height={300}
                className="w-full rounded-md object-cover"
              />
            </div>
          )}
          <div>
            {/* Post Title */}
            <h2 className="mb-1 text-xl font-semibold text-zinc-400 transition-colors duration-200" >{post.title}</h2>

            {/* Post Date */}
            <time dateTime={post.date} className="mb-2 block text-xs text-gray-400">
              {format(parseISO(post.date), "LLLL d, yyyy")}
            </time>

            {/* Post Content */}
            <div className="text-sm text-gray-300">
              {post.blurb}
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
}

export default function Home() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="mb-8 text-center text-2xl font-black">Blog</h1>
      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  )
}