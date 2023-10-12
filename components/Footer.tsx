import Link from '@/components/Link';

export default function Footer() {
  return (
    <footer className="absolute bottom-0 w-full bg-gray-100 py-8">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} zS1m. All rights reserved.
        </p>
        <p className="mt-4">
          Powered by <Link href="https://nextjs.org/" className="text-emerald-500" target="_blank">Next.js</Link> |
          Designed and developed by{' '}
          <Link href="https://github.com/zS1m" className="text-emerald-500" target="_blank">zS1m</Link>
        </p>
      </div>
    </footer>
  );
}
