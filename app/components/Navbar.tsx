import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white/80 p-4 sticky top-0 drop-shadow-xl backdrop-blur z-10">
      <div className="prose prose-xl mx-auto flex justify-between flex-col sm:flex-row">
        <Link href="/" className="text-zinc-700/90 hover:text-zinc-700 no-underline">凝结尾迹</Link>
      </div>
    </nav>
  )
}
