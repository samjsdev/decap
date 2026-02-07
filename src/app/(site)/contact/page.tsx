import Link from 'next/link';

import { PageIntro } from '@/components/PageIntro';

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Get In Touch"
        title="Book a consultation with Harbor Smile Studio"
        blurb="Need preventive care, cosmetic planning, or urgent treatment? Reach us by phone, email, or clinic visit."
      />

      <section className="container split-section contact-section">
        <article className="contact-card">
          <h2>Visit the Clinic</h2>
          <p>
            18 Bayline Avenue, Suite 204
            <br />
            Newport, California 92660
          </p>
          <p>
            Monday - Thursday: 8:00 AM - 6:00 PM
            <br />
            Friday: 8:00 AM - 3:00 PM
            <br />
            Saturday: 9:00 AM - 1:00 PM
          </p>
        </article>

        <article className="contact-card">
          <h2>Appointments</h2>
          <p>
            Call <a href="tel:+19495550118">+1 (949) 555-0118</a> for immediate
            scheduling.
          </p>
          <p>
            Email <a href="mailto:hello@harborsmile.studio">hello@harborsmile.studio</a>{' '}
            for treatment inquiries and referrals.
          </p>
          <div className="hero-actions">
            <a href="mailto:hello@harborsmile.studio" className="button-solid">
              Email Clinic
            </a>
            <Link href="/blog" className="button-outline">
              Read Care Guides
            </Link>
          </div>
        </article>
      </section>
    </>
  );
}
