import Link from 'next/link';

const highlights = [
  {
    title: 'Preventive care, redesigned',
    body: 'Digital diagnostics and low-radiation imaging catch issues early while keeping every visit calm and precise.',
  },
  {
    title: 'Comfort-first interiors',
    body: 'Private treatment suites, noise-softened rooms, and a hospitality approach remove the typical clinical stress.',
  },
  {
    title: 'Transparent plans',
    body: 'You get phased care roadmaps with clear treatment logic, timelines, and insurance support.',
  },
];

const servicePreview = [
  'Smile design and veneers',
  'Implants and restorative dentistry',
  'Children and teen preventive care',
  'Emergency same-day relief',
];

export default function HomePage() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <p className="eyebrow">Coastal Modern Dentistry</p>
          <h1>
            Clinical precision with
            <span> calm, human-centered care.</span>
          </h1>
          <p>
            Harbor Smile Studio is a multi-specialty dental clinic built for
            families, busy professionals, and cosmetic cases that need exacting
            detail.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="button-solid">
              Book Consultation
            </Link>
            <Link href="/services" className="button-outline">
              Explore Services
            </Link>
          </div>
        </div>

        <aside className="hero-panel">
          <h2>Why patients stay with us</h2>
          <ul>
            <li>98% patient satisfaction score</li>
            <li>Flexible evening appointments</li>
            <li>In-house sedation and emergency slots</li>
          </ul>
          <Link href="/blog" className="panel-link">
            Read our Oral Health Journal
          </Link>
        </aside>
      </section>

      <section className="container trust-strip">
        {highlights.map((item) => (
          <article key={item.title} className="trust-card">
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </section>

      <section className="container split-section">
        <div>
          <p className="eyebrow">Signature Services</p>
          <h2>Treatment programs built around long-term oral health.</h2>
          <ul className="bullet-list">
            {servicePreview.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
          <Link href="/services" className="text-link">
            View full service matrix
          </Link>
        </div>

        <div className="cms-card">
          <p className="eyebrow">Decap CMS Highlight</p>
          <h3>Publish blog updates in minutes.</h3>
          <p>
            The oral health journal is connected to Decap CMS, so your clinic
            team can create new articles and update old posts without touching
            code.
          </p>
          <div className="cms-actions">
            <Link href="/blog" className="button-solid">
              See Live Blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
