import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container page-intro">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p className="intro-blurb">
        The page you requested is not available. Return to the homepage to keep
        exploring.
      </p>
      <Link href="/" className="button-solid">
        Go Home
      </Link>
    </section>
  );
}
