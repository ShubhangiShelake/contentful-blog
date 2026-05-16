export const revalidate = 60;
import { Button } from "@/components/ui/button";
import { getPosts } from "@/lib/blog";
import Link from "next/link";

export default async function Home() {
  const posts = await getPosts();

  const latestPosts = posts.slice(0, 3);

  return (
    <main>
      {/* Hero */}
      <section className="bg-black text-white py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
            Explore the Future of Technology
          </h1>

          <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover insights about AI, robotics,
            quantum computing, and modern web
            development.
          </p>
              <Button asChild className="mt-6">
  <Link href="/blog">
    Read Blogs
  </Link>
</Button>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10">
          Latest Blog Posts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post: any) => (
            <div
              key={post.slug}
              className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition"
            >
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-semibold mb-3">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-4">
                  {post.excerpt ||
                    "Read more about this technology article."}
                </p>

                <p className="text-sm text-gray-400">
                  {post.publishedDate}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}