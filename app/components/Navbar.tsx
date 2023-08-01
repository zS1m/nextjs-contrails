import Link from 'next/link';

export default function Navbar() {
  return (
      <div className="sticky top-0 bg-white/70 drop-shadow-md backdrop-blur z-10">
        <nav className="mx-auto py-4 px-4 md:px-6">
          <ul className="flex space-x-6 text-lg md:text-xl justify-start">
            {[
              ['主页', '/'],
              ['关于', '/about']
            ].map(([title, url]) => (
              <li key={url}>
                <NavLink href={url}>{title}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
  )
}

const NavLink = ({ href, children }: { href: string, children: string }) => {
  return (
    <Link
      className="
        relative after:absolute after:bg-stone-500
        after:-bottom-0.5 after:left-0 after:h-[2px]
        after:w-full after:origin-bottom-right after:scale-x-0
        hover:after:origin-bottom-left hover:after:scale-x-100
        after:transition-transform after:ease-in-out after:duration-300"
      href={href}
    >
      {children}
    </Link>
  );
}
