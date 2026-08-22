/* Home: header, bio, news, selected work, footer. Chat floats on every page. */
const { TopNav, Footer } = V6;

const NEWS = [
  { d: 'Aug 2026', html: <span><a href="/papers/choudhuri2025copilot-beyond"><i>To Copilot and Beyond: 22 AI Systems Developers Want Built</i></a> received a Distinguished Paper Award in the ICSME 2026 Industry Track.</span> },
  { d: 'Aug 2026', html: <span><a href="/papers/pimenova2025vibe"><i>Good Vibrations?</i></a>, our study of vibe coding, passed 50 citations in under a year on arXiv, while still working its way through peer review.</span> },
  { d: 'Apr 2026', html: <span><a href="/papers/Miller2026MaybeWe"><i>&ldquo;Maybe We Need Some More Examples&rdquo;</i></a> received an ACM SIGSOFT Distinguished Paper Award at ICSE 2026.</span> },
  { d: 'Jan 2026', html: <span>Joined the advisory board of the <a href="https://halab.nd.edu/">Human-centered Analytics Lab</a> at Notre Dame&rsquo;s Mendoza College of Business.</span> },
  { d: 'Jan 2026', html: <span>U.S. Patent 12,524,647 granted: automated merge conflict resolution.</span> },
  { d: 'May 2025', html: <span><a href="/papers/DBLP_conf_icse_BacchelliB13">Our 2013 code review paper</a> received the ACM SIGSOFT Impact Paper Award. One paper across all of software engineering receives it each year, recognizing impact that has lasted a decade or more.</span> },
];

/* Selected work. Notes are drafts for Chris to re-voice.
   Tags encode real judgment; most entries have none. */
const SELECTED = [
  {
    id: 'Miller2026MaybeWe',
    t: '“Maybe We Need Some More Examples”: Individual and Team Drivers of Developer GenAI Tool Use',
    meta: 'ICSE 2026 · SIGSOFT Distinguished Paper',
    note: 'What actually determines whether developers adopt AI tools. The answer has less to do with the tools themselves than with the teams and habits around them.',
    pdf: '/pdfs/Miller2026MaybeWe.pdf',
  },
  {
    id: 'Choudhuri2026AIWhere',
    t: 'AI Where It Matters: Where, Why, and How Developers Want AI Support in Daily Work',
    meta: 'ICSE SEIP 2026',
    note: 'We asked developers where they want AI in their work, and where they would rather it stay out of the way. The answers don’t always match what’s being built.',
    pdf: '/pdfs/AI-Where-It_Matters.pdf',
  },
  {
    id: 'pimenova2025vibe',
    t: 'Good Vibrations? Co-Creation, Communication, Flow, and Trust in Vibe Coding',
    meta: 'arXiv 2025, under review',
    note: 'A close look at vibe coding as actually practiced, recorded before the term hardens into either a joke or a methodology.',
    pdf: '/pdfs/pimenova2025vibe.pdf',
  },
  {
    id: 'DBLP:conf/icse/BacchelliB13',
    t: 'Expectations, Outcomes, and Challenges of Modern Code Review',
    meta: 'ICSE 2013, with Alberto Bacchelli · SIGSOFT Impact Paper Award 2025',
    tag: 'most cited',
    note: 'We expected code review to be about finding defects. The data said it’s mostly about knowledge transfer and ownership. It took the industry about a decade to agree.',
    pdf: '/pdfs/bacchelli2013eoc.pdf',
  },
  {
    id: 'DBLP:conf/sigsoft/BirdNMGD11',
    t: 'Don’t Touch My Code! Examining the Effects of Ownership on Software Quality',
    meta: 'ESEC/FSE 2011 · Test of Time Award 2021',
    tag: 'changed practice',
    note: 'Code with many minor contributors fails more. Simple to state, awkward in its implications for how teams share work, and still cited in ownership debates today.',
    pdf: '/pdfs/bird2011dtm.pdf',
  },
  {
    id: 'DBLP:conf/msr/BirdRBHGD09',
    t: 'The Promises and Perils of Mining Git',
    meta: 'MSR 2009 · Most Influential Paper 2019',
    note: 'Version control history is evidence, and like all evidence it can mislead. What Git records, what it silently rewrites, and what that means for anyone drawing conclusions from it.',
    pdf: '/pdfs/bird2009ppm.pdf',
  },
];

V6.Home = function Home() {
  return (
    <div className="page">
      <header className="home">
        <h1>Christian Bird</h1>
        <p className="positioning">
          <strong>ACM Distinguished Scientist.</strong>{' '}
          Senior Principal Researcher at Microsoft Research. I study how software
          actually gets built, and how AI is changing that.
          {/* Held back for now, per Chris:
              {' '}I also consult as an expert witness in software forensics. */}
        </p>
        <p className="vitals">
          119 peer-reviewed publications &middot; 13 U.S. patents &middot;
          8 Distinguished or Best Papers &middot; 8 papers honored a decade later &middot;
          Redmond, WA
        </p>
      </header>

      <TopNav here="home" />

      <section id="about">
        <h2>About</h2>
        <div className="bio-body">
          <img className="headshot" src="/images/profile_pic_medium.jpeg"
            alt="Portrait of Christian Bird" />
          <p>I analyze the records that software projects leave behind: millions of code changes, code reviews, build results, and bug reports. Studied at scale, that evidence shows how engineering teams really work, where their time goes, and which practices measurably help. The field calls this empirical software engineering. The short version is that I treat software development as something you can study rather than argue about.</p>
          <p>My current focus is AI-assisted development: building and studying the systems that let AI coding tools understand large codebases, and watching closely what those tools do to the people who use them.</p>
          <p>I&rsquo;ve spent 16 years at Microsoft Research working alongside product teams at scale. The work has spanned code review, branching and release strategy, build systems, testing practice, and developer productivity, mostly on some of the largest codebases in existence. Ph.D. from UC Davis under Prem Devanbu; before graduate school, five years as a software engineer at Motorola. None of this was done alone, and the collaborators are the best part. <a href="about.html">More about me &rarr;</a></p>
        </div>
        <p className="ask-hint">
          In a hurry? <button type="button" onClick={() => V6.openChat && V6.openChat()}>Ask my research assistant</button>{' '}
          about any part of my work. It reads the actual papers before it answers.
        </p>
      </section>

      <section id="news">
        <h2>News</h2>
        <ul className="hang">
          {NEWS.map((n, i) => (
            <li key={i}><span className="hangdate">{n.d}</span>{n.html}</li>
          ))}
        </ul>
      </section>

      <section id="work">
        <h2>Selected work</h2>
        {SELECTED.map(p => (
          <article className="paper" key={p.id}>
            <h2 className="paper-title"><a href={`/papers/${V6.slugOf(p.id)}`}>{p.t}</a></h2>
            <p className="paper-meta">{p.meta}
              {p.tag && <span className="tag">{p.tag}</span>}
            </p>
            <p className="paper-note">{p.note}</p>
          </article>
        ))}
        <p className="all-papers-link">
          <a href="publications.html">Browse all 119 publications &rarr;</a>
        </p>
      </section>

      <Footer />
    </div>
  );
};
