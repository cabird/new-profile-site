/* Expertise: areas grouped by theme. Selected work lives on the home page. */
const { TopNav, Footer } = V6;

const AREAS = [
  {
    title: 'Repository and version-control forensics',
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

V6.Expertise = function Expertise() {
  return (
    <div className="page">
      <header>
        <h1>Expertise</h1>
        <p className="positioning">Sixteen years studying software development with
          evidence: repositories, reviews, builds, and the people who produce them.
          Each area below is backed by published, peer-reviewed work.</p>
      </header>

      <TopNav here="expertise" />

      {AREAS.map(a => (
        <section key={a.title}>
          <h2>{a.title}</h2>
          <ul className="exp">
            {a.items.map(it => <li key={it}>{it}</li>)}
          </ul>
        </section>
      ))}

      <p className="all-papers-link">
        <a href="publications.html">The publications behind these claims, searchable by subject &rarr;</a>
      </p>

      <Footer />
    </div>
  );
};
