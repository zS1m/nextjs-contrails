import { allPosts } from 'contentlayer/generated';

type Props = {
  params: {
    slug: string[]
  }
}

export async function generateStaticParams() {
  const paths = allPosts.map((post) => ({
    slug: post.slug.split('/')
  }));
  return paths;
}

export default function Page({ params }: Props) {
  const slug = decodeURI(params.slug.join('/'));
  return <div>slug: {slug}</div>;
}
