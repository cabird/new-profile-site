/* Expertise: the consulting pitch. Areas grouped, then representative work. */
const { TopNav, Footer } = V5;

const AREAS = [
  {
    title: 'Repository & version-control forensics',
    items: [
      'Version control forensics: Git, Subversion, CVS, TFS',
      'Reconstructing development timelines from commits, builds, and reviews',
      'Authorship, ownership, and contribution attribution from version control',
      'Integrity, completeness, and bias of software engineering records',
    ],
  },
  {
    title: 'Code, quality, and review',
    items: [
      'Source code analysis; code clones, copied and reused code',
      'Code review practice and industrial quality assurance',
      'Defect prediction and reliability measurement at commercial scale',
    ],
  },
  {
    title: 'AI-assisted development',
    items: [
      'AI-assisted code generation: Copilot and LLM coding tools',
      'Machine learning on source code: naming, conventions, types, merge',
      'Program analysis tooling and its adoption by working developers',
    ],
  },
  {
    title: 'Open source and empirical methods',
    items: [
      'Open source practice, contributor provenance, and governance',
      'Large-scale statistical and qualitative study of repositories and developers',
    ],
  },
];

/* Selected publications: annotations are drafts, to be rewritten in Christian's voice. */
const SELECTED = [
  {
    year: '2026', id: 'Miller2026MaybeWe',
    t: '“Maybe We Need Some More Examples”: Individual and Team Drivers of Developer GenAI Tool Use',
    v: '· ICSE.', honor: 'sigsoft distinguished paper',
    note: 'What actually determines whether developers adopt AI tools. The answer has less to do with the tools themselves than with the teams and habits around them.',
    pdf: '/pdfs/Miller2026MaybeWe.pdf',
  },
  {
    year: '2026', id: 'Choudhuri2026AIWhere',
    t: 'AI Where It Matters: Where, Why, and How Developers Want AI Support in Daily Work',
    v: '· ICSE SEIP.',
    note: 'We asked developers where they want AI in their work, and where they would rather it stay out of the way. The answers don’t always match what’s being built.',
    pdf: '/pdfs/AI-Where-It_Matters.pdf',
  },
  {
    year: '2025', id: 'pimenova2025vibe',
    t: 'Good Vibrations? Co-Creation, Communication, Flow, and Trust in Vibe Coding',
    v: '· arXiv, under review.',
    note: 'A close look at vibe coding as actually practiced, recorded before the term hardens into either a joke or a methodology.',
    pdf: '/pdfs/pimenova2025vibe.pdf',
  },
  {
    year: '2013', id: 'DBLP:conf/icse/BacchelliB13',
    t: 'Expectations, Outcomes, and Challenges of Modern Code Review',
    v: '· ICSE.', honor: 'sigsoft impact paper award, 2025',
    note: 'We expected code review to be about finding defects. The data said it’s mostly about knowledge transfer and ownership. It took the industry about a decade to agree.',
    pdf: '/pdfs/bacchelli2013eoc.pdf',
  },
  {
    year: '2011', id: 'DBLP:conf/sigsoft/BirdNMGD11',
    t: 'Don’t Touch My Code! Examining the Effects of Ownership on Software Quality',
    v: '· FSE.', honor: 'test of time award, 2021',
    note: 'Code with many minor contributors fails more. Simple to state, awkward in its implications for how teams share work, and still cited in ownership debates today.',
    pdf: '/pdfs/bird2011dtm.pdf',
  },
  {
    year: '2009', id: 'DBLP:conf/msr/BirdRBHGD09',
    t: 'The Promises and Perils of Mining Git',
    v: '· MSR.', honor: 'most influential paper, 2019',
    note: 'Version control history is evidence, and like all evidence it can mislead. What Git records, what it silently rewrites, and what that means for anyone drawing conclusions from it.',
    pdf: '/pdfs/bird2009ppm.pdf',
  },
];

V5.Expertise = function Expertise() {
  return (
    <div className="page">
      <header>
        <div className="mast">
          <div>
            <h1>Expertise</h1>
            <p className="identity">Sixteen years studying software development with evidence: repositories,
              reviews, builds, and the people who produce them.<br />
              Each area below is backed by published, peer-reviewed work.</p>
          </div>
        </div>
      </header>

      <TopNav here="expertise" />

      {AREAS.map(a => (
        <section key={a.title}>
          <h2>{a.title}</h2>
          <ul className="exp exp-one">
            {a.items.map(it => <li key={it}>{it}</li>)}
          </ul>
        </section>
      ))}

      <section id="selected">
        <h2>Representative work</h2>
        <ul className="pubs">
          {SELECTED.map(p => (
            <li key={p.id}>
              <span className="hangdate">{p.year}</span>
              <span>
                <span className="t">{p.t}</span>{' '}
                <span className="v">{p.v}</span>{' '}
                {p.honor && <span className="honor">{p.honor}</span>}
                <span className="note">{p.note} <span className="links"><a href={p.pdf}>pdf</a></span></span>
              </span>
            </li>
          ))}
        </ul>
        <p className="allpubs"><a href="publications.html">all 119, searchable, with PDF, BibTeX, and readable full text &rarr;</a></p>
      </section>

      <Footer />
    </div>
  );
};
