import { PageIntro } from '@/components/PageIntro';

const team = [
  {
    name: 'Dr. Lena Marlow, DDS',
    role: 'Clinical Director & Restorative Specialist',
    bio: 'Leads complex restorative plans and full-arch rehabilitation with a focus on function-first outcomes.',
  },
  {
    name: 'Dr. Aiden Park, DMD',
    role: 'Cosmetic Dentistry Lead',
    bio: 'Designs conservative veneer and whitening treatment pathways that preserve natural enamel.',
  },
  {
    name: 'Nora Ruiz, RDH',
    role: 'Senior Hygienist',
    bio: 'Develops preventive routines for families and periodontal maintenance protocols for long-term stability.',
  },
  {
    name: 'Kai Thompson',
    role: 'Patient Care Coordinator',
    bio: 'Handles scheduling, insurance coordination, and treatment financing with transparent communication.',
  },
];

export default function TeamPage() {
  return (
    <>
      <PageIntro
        eyebrow="Our Team"
        title="A multidisciplinary clinic built around trust"
        blurb="Our dentists, hygienists, and care coordinators work as one unit so every patient receives a cohesive treatment experience."
      />

      <section className="container card-grid">
        {team.map((member) => (
          <article key={member.name} className="team-card">
            <h2>{member.name}</h2>
            <p className="role">{member.role}</p>
            <p>{member.bio}</p>
          </article>
        ))}
      </section>
    </>
  );
}
