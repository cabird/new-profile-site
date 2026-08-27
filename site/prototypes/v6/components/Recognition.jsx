/* Recognition: honors grouped by kind. Patents have their own page. */
const { TopNav, Footer } = V6;

const CAREER = [
  ['2020', <span><b>Distinguished Scientist</b>, Association for Computing Machinery</span>],
  ['2017', <span><b>ACM SIGSOFT Early Career Research Award</b></span>],
  ['2009–25', <span>Work featured three times in <i>Communications of the ACM</i>, the flagship magazine of computing: the Windows Vista distributed-development study, selected as a Research Highlight and paired with a Technical Perspective (2009); an invited article, <i>Taking Flight with Copilot</i> (2023); and an interview on deep learning for program merge (2025)</span>],
];

const DECADE = [
  ['2025', <span>ACM SIGSOFT Impact Paper Award, for <i>Expectations, Outcomes, and Challenges of Modern Code Review</i></span>],
  ['2025', <span>Test of Time Honorable Mention, ESEC/FSE, for <i>Suggesting Accurate Method and Class Names</i></span>],
  ['2021', <span>Test of Time Award, ESEC/FSE, for <i>Don&rsquo;t Touch My Code! Examining the Effects of Ownership on Software Quality</i></span>],
  ['2019', <span>Test of Time Award, ESEC/FSE, for <i>Fair and Balanced? Bias in Bug-Fix Datasets</i></span>],
  ['2019', <span>Most Influential Paper, MSR, for <i>The Promises and Perils of Mining Git</i></span>],
  ['2019', <span>ISSRE 30-Year Highlight: one of the 26 most influential papers of the conference&rsquo;s three decades, for <i>Putting It All Together: Using Socio-Technical Networks to Predict Failures</i></span>],
  ['2018', <span>Test of Time Award, ESEC/FSE, for <i>Latent Social Structure in Open Source Projects</i></span>],
  ['2016', <span>Most Influential Paper, MSR, for <i>Mining Email Social Networks</i></span>],
];

const DISTINGUISHED = [
  ['2026', <span>ACM SIGSOFT Distinguished Paper Award, ICSE, for <i>&ldquo;Maybe We Need Some More Examples&rdquo;: Individual and Team Drivers of Developer GenAI Tool Use</i></span>],
  ['2026', <span>Distinguished Paper Award, ICSME Industry Track, for <i>To Copilot and Beyond: 22 AI Systems Developers Want Built</i></span>],
  ['2020', <span>First Runner-Up, IEEE Software Best Paper, for <i>Designing Corporate Hackathons With a Purpose</i></span>],
  ['2019', <span>IEEE Software Best Paper, ICSE SEIP, for <i>Software Engineering for Machine Learning: A Case Study</i></span>],
  ['2014', <span>ACM SIGSOFT Distinguished Paper, FSE, for <i>Learning Natural Coding Conventions</i></span>],
  ['2013', <span>ACM SIGSOFT Distinguished Paper <b>and</b> ISSTA Best Paper, for <i>Collecting a Heap of Shapes</i></span>],
  ['2012', <span>ACM SIGSOFT Distinguished Paper, FSE, for <i>Assessing the Value of Branches with What-If Analysis</i></span>],
  ['2010', <span>Best Paper Award, MSR, for <i>Clones: What Is That Smell?</i></span>],
  ['2009', <span>ACM SIGSOFT Distinguished Paper, ICSE, for <i>Does Distributed Development Affect Software Quality? An Empirical Case Study of Windows Vista</i></span>],
];

function HonorList({ items }) {
  return (
    <ul className="hang">
      {items.map((h, i) => (
        <li key={i}><span className="hangdate">{h[0]}</span>{h[1]}</li>
      ))}
    </ul>
  );
}

V6.Recognition = function Recognition() {
  return (
    <div className="page">
      <header>
        <h1>Recognition</h1>
        <p className="positioning">Eight papers honored a decade or more after
          publication, eight Distinguished or Best Paper awards, and the
          field&rsquo;s career honors. Patents have <a href="patents.html">their own page</a>.</p>
      </header>

      <TopNav here="recognition" />

      <section id="career">
        <h2>Career honors</h2>
        <HonorList items={CAREER} />
      </section>

      <section id="decade">
        <h2>Honored a decade later</h2>
        <p className="exp-intro">Test of Time, Impact Paper, and Most Influential
          Paper awards go to work the field still uses ten or more years on.
          Eight papers have received one.</p>
        <HonorList items={DECADE} />
      </section>

      <section id="distinguished">
        <h2>Distinguished and Best Papers</h2>
        <p className="exp-intro">Awarded at publication time to the strongest
          papers of a conference.</p>
        <HonorList items={DISTINGUISHED} />
      </section>

      <Footer />
    </div>
  );
};
