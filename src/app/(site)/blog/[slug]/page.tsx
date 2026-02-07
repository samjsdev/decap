import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getAllPostsMeta, getPostBySlug, getPostSlugs } from '@/lib/posts';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString));
}

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post not found | Harbor Smile Studio',
    };
  }

  return {
    title: `${post.title} | Harbor Smile Studio`,
    description: post.excerpt,
  };
}

export const dynamicParams = false;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const morePosts = getAllPostsMeta()
    .filter((candidate) => candidate.slug !== slug)
    .slice(0, 2);

  return (
    <article className="container article-wrap">
      <Link href="/blog" className="text-link back-link">
        Back to Journal
      </Link>
      <p className="meta">
        {formatDate(post.date)} • {post.author}
      </p>
      <h1>{post.title}</h1>
      <p className="lead">{post.excerpt}</p>
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {morePosts.length > 0 && (
        <section className="related-posts">
          <h2>More from the clinic</h2>
          <div className="blog-grid">
            {morePosts.map((item) => (
              <article key={item.slug} className="blog-card">
                <p className="meta">{formatDate(item.date)}</p>
                <h3>
                  <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                </h3>
                <p>{item.excerpt}</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
