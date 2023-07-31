import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';

type Filetree = {
  tree: [
    { path: string }
  ]
}

export async function getPostByName(fileName: string): Promise<BlogPost | undefined> {
  const res = await fetch(`https://raw.githubusercontent.com/zs1m/blog-posts/master/${fileName}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  if (!res.ok) {
    return undefined;
  }
  const rawMDX = await res.text();
  if (rawMDX === '404: Not Found') {
    return undefined;
  }
  const { frontmatter, content } = await compileMDX<{ title: string, date: string, abbrlink: string, tags: string[] }>({
    source: rawMDX,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [rehypeHighlight]
      }
    }
  })

  const id = fileName.replace(/\.mdx$/, '');
  const blogPostObj: BlogPost = {
    meta: {
      id,
      title: frontmatter.title,
      date: frontmatter.date,
      abbrlink: frontmatter.abbrlink,
      tags: frontmatter.tags
    },
    content
  }
  return blogPostObj;
}

export async function getPostsMeta(): Promise<Meta[] | undefined> {
  const res = await fetch('https://api.github.com/repos/zs1m/blog-posts/git/trees/master?recursive=1', {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "X-GitHub-Api-Version": '2022-11-28'
    }
  })
  if (!res.ok) {
    return undefined;
  }
  const repoFiletree: Filetree = await res.json();
  const filesArr =
    repoFiletree.tree
      .map((obj) => obj.path)
      .filter((path) => path.endsWith('.mdx'));

  const posts: Meta[] = [];
  for (const file of filesArr) {
    const post = await getPostByName(file)
    if (post) {
      const { meta } = post;
      posts.push(meta);
    }
  }
  return posts.sort((a, b) => a.date < b.date ? 1 : -1);
}
