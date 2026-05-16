export const revalidate = 60;
import { getPostBySlug } from "@/lib/blog";

import { notFound } from "next/navigation";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: Props) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  return {
    title: post?.title,
    description: post?.excerpt,
  };
}

export default async function BlogDetailPage({
  params,
}: Props) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <img
        src={post.coverImage}
        alt={post.title}
        className="w-full h-[400px] object-cover rounded-2xl mb-8"
      />

      <h1 className="text-5xl font-bold mb-4">
        {post.title}
      </h1>

      <p className="text-gray-500 mb-10">
        {post.publishedDate}
      </p>

      <div className="prose prose-lg max-w-none">
        {documentToReactComponents(post.content)}
      </div>
    </main>
  );
}