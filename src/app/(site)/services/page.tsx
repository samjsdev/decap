import { PageIntro } from '@/components/PageIntro';

const categories = [
  {
    title: 'Preventive & Family',
    items: ['Routine exams', 'Hygiene cleanings', 'Sealants', 'Fluoride therapy'],
  },
  {
    title: 'Cosmetic Dentistry',
    items: ['Professional whitening', 'Porcelain veneers', 'Smile contouring', 'Bonding'],
  },
  {
    title: 'Restorative Care',
    items: ['Ceramic crowns', 'Implant restorations', 'Bridge work', 'Inlays and onlays'],
  },
  {
    title: 'Urgent Care',
    items: ['Toothache triage', 'Cracked tooth repair', 'Infection management', 'Trauma response'],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="What We Offer"
        title="Complete dental programs for every stage of life"
        blurb="Every treatment path combines diagnostics, preventive coaching, and a clear follow-up timeline so results hold over time."
      />

      <section className="container card-grid">
        {categories.map((category) => (
          <article key={category.title} className="service-card">
            <h2>{category.title}</h2>
            <ul className="bullet-list compact">
              {category.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </>
  );
}
