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
  return <div>111</div>;
}
