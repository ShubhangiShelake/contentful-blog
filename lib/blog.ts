import client from "./contentful";

export async function getPosts() {
  const response = await client.getEntries({
    content_type: "pageBlogPost",
  });

  return response.items.map((item: any) => ({
    title: item.fields.title,
    slug: String(item.fields.slug).trim(),
    excerpt: item.fields.excerpt,
    publishedDate: item.fields.publishedDate,
    coverImage:
      "https:" + item.fields.featuredImage.fields.file.url,
    content: item.fields.content,
  }));
}

export async function getPostBySlug(slug: string) {
  const response = await client.getEntries({
    content_type: "pageBlogPost",
  });

  const item: any = response.items.find(
    (post: any) =>
      String(post.fields.slug).trim() ===
      String(slug).trim()
  );

  if (!item) {
    return null;
  }

  return {
    title: item.fields.title,
    slug: item.fields.slug,
    excerpt: item.fields.excerpt,
    publishedDate: item.fields.publishedDate,
    coverImage:
      "https:" + item.fields.featuredImage.fields.file.url,
    content: item.fields.content,
  };
}