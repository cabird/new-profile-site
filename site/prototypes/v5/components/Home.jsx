/* Home: a hub, not a document. One screen; every card is a real destination. */
const { TopNav, Footer, AskInline } = V5;

const CARDS = [
  {
    href: 'expertise.html', title: 'Expertise',
    desc: 'What I can speak to, grouped by area, with the papers that back each claim.',
  },
  {
    href: 'publications.html', title: 'Publications',
    desc: 'All 119, searchable by subject, each with PDF, BibTeX, and readable full text.',
  },
  {
    href: 'recognition.html', title: 'Recognition',
    desc: 'Honors and awards across two decades, and thirteen granted U.S. patents.',
  },
  {
    href: 'about.html', title: 'About',
    desc: 'Bio, timeline, the book, service, and recent news.',
  },
  {
    href: '/cv/cv_academic.pdf', title: 'Curriculum Vitae',
    desc: 'The complete formal record as a PDF, updated August 2026.',
  },
  {
    href: '/ide/', title: 'This Site as an IDE',
    desc: 'The interactive version: a working IDE with an AI assistant over the papers.',
  },
];

V5.Home = function Home() {
  return (
    <div className="page">
      <header>
        <div className="mast">
          <img className="headshot" src="/images/profile_pic_medium.jpeg" alt="Christian Bird" />
          <div>
            <h1>Christian Bird</h1>
            <p className="identity"><span className="dsci">ACM Distinguished Scientist</span><br />
              Senior Principal Researcher, Microsoft Research<br />
              I study how software actually gets built, and how AI is changing that.</p>
          </div>
        </div>
      </header>

      <TopNav here="home" />

      <section className="askfront">
        <h2>Ask my work a question</h2>
        <p className="askfront-sub">I build and study AI systems over software records. This one answers from my 119 papers and CV, live.</p>
        <AskInline />
      </section>

      <p className="cred"><b>ACM Distinguished Scientist</b> &middot; <b>119</b> publications &middot; <b>13</b> U.S. patents &middot;<br />
        <b>8</b> papers honored a decade later &middot; <b>8</b> Distinguished or Best Papers</p>

      <section>
        <div className="cards">
          {CARDS.map(c => (
            <a className="card" href={c.href} key={c.href}>
              <span className="card-t">{c.title}</span>
              <span className="card-d">{c.desc}</span>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};
