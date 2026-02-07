interface PageIntroProps {
  eyebrow: string;
  title: string;
  blurb: string;
}

export function PageIntro({ eyebrow, title, blurb }: PageIntroProps) {
  return (
    <section className="page-intro container">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="intro-blurb">{blurb}</p>
    </section>
  );
}
