import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
}

export interface PostData extends PostMeta {
  contentHtml: string;
}

function normalizeMeta(slug: string, data: Record<string, unknown>): PostMeta {
  return {
    slug,
    title: typeof data.title === 'string' ? data.title : slug,
    excerpt: typeof data.excerpt === 'string' ? data.excerpt : '',
    date: typeof data.date === 'string' ? data.date : '1970-01-01',
    author: typeof data.author === 'string' ? data.author : 'Harbor Smile Team',
  };
}

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}

export function getAllPostsMeta(): PostMeta[] {
  const postSlugs = getPostSlugs();

  const posts = postSlugs.map((slug) => {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return normalizeMeta(slug, data as Record<string, unknown>);
  });

  return posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    return dateB - dateA;
  });
}

export async function getPostBySlug(slug: string): Promise<PostData | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);

  return {
    ...normalizeMeta(slug, data as Record<string, unknown>),
    contentHtml: processedContent.toString(),
  };
}
