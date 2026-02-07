import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h2>Harbor Smile Studio</h2>
          <p>
            18 Bayline Avenue, Suite 204
            <br />
            Newport, CA 92660
          </p>
          <p>
            <a href="tel:+19495550118">+1 (949) 555-0118</a>
            <br />
            <a href="mailto:hello@harborsmile.studio">hello@harborsmile.studio</a>
          </p>
        </div>

        <div>
          <h3>Explore</h3>
          <ul>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/team">Meet the Team</Link>
            </li>
            <li>
              <Link href="/blog">Oral Health Journal</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>Hours</h3>
          <ul>
            <li>Mon - Thu: 8:00 AM - 6:00 PM</li>
            <li>Fri: 8:00 AM - 3:00 PM</li>
            <li>Sat: 9:00 AM - 1:00 PM</li>
            <li>Sun: Closed</li>
          </ul>
        </div>
      </div>
      <p className="footer-note">
        Built with Next.js static export and Decap CMS for easy publishing.
      </p>
    </footer>
  );
}
