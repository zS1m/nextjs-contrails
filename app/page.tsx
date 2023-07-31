import Posts from '@/app/components/Posts';

export const revalidate = 86400;

export default function Home() {
  return (
    <div className="mx-auto">
      <Posts />
    </div>
  )
}
