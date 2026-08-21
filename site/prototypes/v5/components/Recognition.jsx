/* Recognition: honors and patents, one page. */
const { TopNav, Footer } = V5;

const HONORS = [
  ['2026', <span>ACM SIGSOFT Distinguished Paper Award, ICSE, for <i>&ldquo;Maybe We Need Some More Examples&rdquo;: Individual and Team Drivers of Developer GenAI Tool Use</i></span>],
  ['2026', <span>Distinguished Paper Award, ICSME Industry Track, for <i>To Copilot and Beyond: 22 AI Systems Developers Want Built</i></span>],
  ['2025', <span>ACM SIGSOFT Impact Paper Award, for <i>Expectations, Outcomes, and Challenges of Modern Code Review</i></span>],
  ['2025', <span>Test of Time Honorable Mention, ESEC/FSE, for <i>Suggesting Accurate Method and Class Names</i></span>],
  ['2009–25', <span>Work featured three times in <i>Communications of the ACM</i>, the flagship magazine of computing: the Windows Vista distributed-development study, selected as a Research Highlight and paired with a Technical Perspective (2009); an invited article, <i>Taking Flight with Copilot</i> (2023); and an interview on deep learning for program merge (2025)</span>],
  ['2024', <span><b>Distinguished Scientist</b>, Association for Computing Machinery</span>],
  ['2021', <span>Test of Time Award, ESEC/FSE, for <i>Don&rsquo;t Touch My Code! Examining the Effects of Ownership on Software Quality</i></span>],
  ['2020', <span>First Runner-Up, IEEE Software Best Paper, for <i>Designing Corporate Hackathons With a Purpose</i></span>],
  ['2019', <span>Test of Time Award, ESEC/FSE, for <i>Fair and Balanced? Bias in Bug-Fix Datasets</i></span>],
  ['2019', <span>Most Influential Paper, MSR, for <i>The Promises and Perils of Mining Git</i></span>],
  ['2019', <span>IEEE Software Best Paper, ICSE SEIP, for <i>Software Engineering for Machine Learning: A Case Study</i></span>],
  ['2019', <span>ISSRE 30-Year Highlight: one of the 26 most influential papers of the conference&rsquo;s three decades, for <i>Putting It All Together: Using Socio-Technical Networks to Predict Failures</i></span>],
  ['2018', <span>Test of Time Award, ESEC/FSE, for <i>Latent Social Structure in Open Source Projects</i></span>],
  ['2017', <span><b>ACM SIGSOFT Early Career Research Award</b></span>],
  ['2016', <span>Most Influential Paper, MSR, for <i>Mining Email Social Networks</i></span>],
  ['2014', <span>ACM SIGSOFT Distinguished Paper, FSE, for <i>Learning Natural Coding Conventions</i></span>],
  ['2013', <span>ACM SIGSOFT Distinguished Paper <b>and</b> ISSTA Best Paper, for <i>Collecting a Heap of Shapes</i></span>],
  ['2012', <span>ACM SIGSOFT Distinguished Paper, FSE, for <i>Assessing the Value of Branches with What-If Analysis</i></span>],
  ['2010', <span>Best Paper Award, MSR, for <i>Clones: What Is That Smell?</i></span>],
  ['2009', <span>ACM SIGSOFT Distinguished Paper, ICSE, for <i>Does Distributed Development Affect Software Quality? An Empirical Case Study of Windows Vista</i></span>],
];

const PATENTS = [
  ['2026', 'Automated Merge Conflict Resolution', '12,524,647'],
  ['2024', 'Automated Merge Conflict Resolution with Transformers', '12,159,211'],
  ['2023', 'Concurrent Edit Detection', '11,822,518'],
  ['2023', 'Natural Language Code Search', '11,715,006'],
  ['2023', 'Frequent Source Code Pattern Mining', '11,662,984'],
  ['2023', 'Detecting Misconfiguration and Bugs in Large Services Using Correlated Change Analysis', '11,599,354'],
  ['2023', 'Concurrent Edit Detection', '11,550,758'],
  ['2022', 'Frequent Source Code Pattern Mining', '11,392,354'],
  ['2018', 'Techniques to Identify Idiomatic Code in a Code Base', '10,042,740'],
  ['2017', 'Predicting Software Build Errors', '9,542,176'],
  ['2016', 'Analyzing Power Consumption in Mobile Computing Devices', '9,400,541'],
  ['2015', 'Analyzing Power Consumption in Mobile Computing Devices', '8,965,718'],
  ['2014', 'Software Development Automated Analytics', '8,745,572'],
];

V5.Recognition = function Recognition() {
  return (
    <div className="page">
      <header>
        <div className="mast">
          <div>
            <h1>Recognition</h1>
            <p className="identity">Awards the field gives for work that holds up, several of them a decade after publication.<br />
              And thirteen granted U.S. patents in automated software engineering.</p>
          </div>
        </div>
      </header>

      <TopNav here="recognition" />

      <section id="honors">
        <h2>Honors</h2>
        <ul className="hang">
          {HONORS.map((h, i) => (
            <li key={i}><span className="hangdate">{h[0]}</span>{h[1]}</li>
          ))}
        </ul>
      </section>

      <section id="patents">
        <h2>Patents</h2>
        <p style={{ marginTop: 0 }}>Inventor on thirteen granted U.S. patents in automated software engineering, all assigned to Microsoft.</p>
        <ul className="hang">
          {PATENTS.map((p, i) => (
            <li key={i}><span className="hangdate">{p[0]}</span>
              <span>{p[1]} <span className="sub">(U.S. Patent {p[2]})</span></span></li>
          ))}
        </ul>
      </section>

      <Footer />
    </div>
  );
};
