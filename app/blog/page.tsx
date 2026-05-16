export const revalidate = 60;
import { getPosts } from "@/lib/blog";
import Link from "next/link";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default async function BlogPage() {
  const posts = await getPosts();

  if (!posts.length) {
    return (
      <p className="text-center mt-20 text-lg">
        No posts found
      </p>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center sm:text-left">
        All Blog Posts
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: any) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.slug}
          >
            <Card className="overflow-hidden hover:shadow-2xl transition duration-300 cursor-pointer h-full rounded-2xl border">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-56 object-cover"
              />

              <CardContent className="p-5 flex flex-col h-full">
                <h2 className="text-xl font-semibold mb-3 line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                  {post.excerpt ||
                    "Read more about this technology article."}
                </p>

                <p className="text-sm text-gray-400 mt-auto">
                  {post.publishedDate}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}