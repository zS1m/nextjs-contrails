import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="sticky flex items-center justify-between px-4 md:px-6 top-0 bg-white/80 drop-shadow-md backdrop-blur z-10">
      <Link href="/">
        <Image alt="凝结尾迹" src="/images/avatar.png" width="60" height="60"></Image>
      </Link>
      <nav className="py-5 px-4 md:px-6">
        <ul className="flex space-x-6 text-lg md:text-xl justify-start">
          {[
            ['关于', '/about']
          ].map(([title, url]) => (
            <li key={url}>
              <NavLink href={url}>{title}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
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
