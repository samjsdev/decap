'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/team', label: 'Team' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className="brand">
          <span className="brand-mark" aria-hidden>
            HS
          </span>
          <span>
            Harbor Smile Studio
            <small>Dental Clinic</small>
          </span>
        </Link>

        <nav aria-label="Main">
          <ul className="nav-list">
            {links.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={isActive ? 'nav-link active' : 'nav-link'}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link href="/contact" className="cta-chip">
          Book Visit
        </Link>
      </div>
    </header>
  );
}
