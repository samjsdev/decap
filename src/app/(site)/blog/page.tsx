import Link from 'next/link';

import { PageIntro } from '@/components/PageIntro';
import { getAllPostsMeta } from '@/lib/posts';

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString));
}

export default function BlogPage() {
  const posts = getAllPostsMeta();

  return (
    <>
      <PageIntro
        eyebrow="Oral Health Journal"
        title="Clinic updates and practical dental education"
        blurb="Explore prevention guides, treatment explainers, and care routines from our clinical team."
      />

      <section className="container blog-grid">
        {posts.map((post) => (
          <article key={post.slug} className="blog-card">
            <p className="meta">
              {formatDate(post.date)} • {post.author}
            </p>
            <h2>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p>{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="text-link">
              Read article
            </Link>
          </article>
        ))}
      </section>

    </>
  );
}
