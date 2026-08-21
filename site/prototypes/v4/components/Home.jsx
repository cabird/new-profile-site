/* Home page */
const { TopNav, AskInline } = V4;

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

const NEWS = [
  { d: 'Aug 2026', html: <span><i>To Copilot and Beyond: 22 AI Systems Developers Want Built</i> received a Distinguished Paper Award in the ICSME 2026 Industry Track.</span> },
  { d: 'Aug 2026', html: <span><i>Good Vibrations?</i>, our study of vibe coding, passed 50 citations in under a year on arXiv, while still working its way through peer review.</span> },
  { d: 'Apr 2026', html: <span><i>&ldquo;Maybe We Need Some More Examples&rdquo;</i> received an ACM SIGSOFT Distinguished Paper Award at ICSE 2026.</span> },
  { d: 'Jan 2026', html: <span>Joined the advisory board of the <a href="https://halab.nd.edu/">Human-centered Analytics Lab</a> at Notre Dame&rsquo;s Mendoza College of Business.</span> },
  { d: 'Jan 2026', html: <span>U.S. Patent 12,524,647 granted: automated merge conflict resolution.</span> },
  { d: 'May 2025', html: <span>Our 2013 code review paper received the ACM SIGSOFT Impact Paper Award. One paper across all of software engineering receives it each year, recognizing impact that has lasted a decade or more.</span> },
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

V4.Home = function Home() {
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

      <section id="news">
        <h2>News</h2>
        <ul className="hang">
          {NEWS.map((n, i) => (
            <li key={i}><span className="hangdate">{n.d}</span>{n.html}</li>
          ))}
        </ul>
      </section>

      <section id="about">
        <h2>About</h2>
        <p>I analyze the records that software projects leave behind: millions of code changes, code reviews, build results, and bug reports. Studied at scale, that evidence shows how engineering teams really work, where their time goes, and which practices measurably help. The field calls this empirical software engineering. The short version is that I treat software development as something you can study rather than argue about.</p>
        <p>My current focus is AI-assisted development: building and studying the systems that let AI coding tools understand large codebases, and watching closely what those tools do to the people who use them.</p>
        <details>
          <summary>longer bio</summary>
          <p>I&rsquo;ve spent 16 years at Microsoft Research working alongside product teams at scale: understanding their workflows firsthand, prototyping solutions, and seeing them through to adoption. The work has spanned code review, branching and release strategy, build systems, testing practice, and developer productivity, mostly on some of the largest codebases in existence. I care more about changes teams actually adopt than about the paper count, though the papers happened anyway. Ph.D. from UC Davis under Prem Devanbu; before graduate school, five years as a software engineer at Motorola. None of this was done alone, and the collaborators are the best part.</p>
        </details>
        <AskInline />
      </section>

      <section id="expertise">
        <h2>Expertise</h2>
        <ul className="exp">
          <li>Source code analysis; code clones, copied and reused code</li>
          <li>Authorship, ownership, and contribution attribution from version control</li>
          <li>Version control forensics: Git, Subversion, CVS, TFS</li>
          <li>Reconstructing development timelines from commits, builds, and reviews</li>
          <li>Integrity, completeness, and bias of software engineering records</li>
          <li>Open source practice, contributor provenance, and governance</li>
          <li>Code review practice and industrial quality assurance</li>
          <li>Defect prediction and reliability measurement at commercial scale</li>
          <li>AI-assisted code generation: Copilot and LLM coding tools</li>
          <li>Machine learning on source code: naming, conventions, types, merge</li>
          <li>Program analysis tooling and its adoption by working developers</li>
          <li>Large-scale statistical and qualitative study of repositories and developers</li>
        </ul>
      </section>

      <section id="timeline">
        <h2>Timeline</h2>
        <ul className="hang">
          <li><span className="hangdate">2010 &ndash; now</span><span><b>Microsoft Research</b>, Redmond<br />
            <span className="sub">Postdoc to Senior Principal Researcher (2022): empirical software engineering, AI-assisted development</span></span></li>
          <li><span className="hangdate">2010</span><span><b>Ph.D., Computer Science</b>, UC Davis<br />
            <span className="sub">Sociotechnical coordination in open-source software, with Prem Devanbu (M.S. 2008)</span></span></li>
          <li><span className="hangdate">2000 &ndash; 05</span><span><b>Motorola</b>, software engineer<br />
            <span className="sub">Embedded software development tools: five years shipping to other engineers</span></span></li>
          <li><span className="hangdate">2003</span><span><b>B.S., Computer Science</b>, Brigham Young University</span></li>
        </ul>
      </section>

      <p className="cred"><b>ACM Distinguished Scientist</b> &middot; <b>119</b> publications &middot; <b>13</b> U.S. patents &middot;<br />
        <b>8</b> papers honored a decade later &middot; <b>8</b> Distinguished or Best Papers</p>

      <section id="pubs">
        <h2>Selected Publications</h2>
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

      <section id="book">
        <h2>Book</h2>
        <div className="book">
          <a href="https://shop.elsevier.com/books/the-art-and-science-of-analyzing-software-data/bird/978-0-12-411519-4">
            <img className="bookcover" src="/images/book_art_science_cover.jpg"
              alt="The Art and Science of Analyzing Software Data book cover" />
          </a>
          <div>
            <p style={{ margin: 0 }}><span className="t" style={{ fontWeight: 600 }}>The Art and Science of Analyzing Software Data</span>{' '}
              <span className="v">Morgan Kaufmann, 2015. Edited by Christian Bird, Tim Menzies, and Thomas Zimmermann.</span></p>
            <p style={{ margin: '.5rem 0 0', color: 'var(--muted)', fontSize: '.95rem' }}>Chapters from the people who mine software data for a living, on drawing honest conclusions from repositories, telemetry, bug reports, and review records, and on the many ways the data can fool you.</p>
          </div>
        </div>
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

      <section id="honors">
        <h2>Honors</h2>
        <ul className="hang">
          {HONORS.map((h, i) => (
            <li key={i}><span className="hangdate">{h[0]}</span>{h[1]}</li>
          ))}
        </ul>
      </section>

      <section id="service">
        <h2>Service</h2>
        <p>Program co-chair, IEEE/ACM International Conference on Automated Software Engineering (2023). Advisory board, <a href="https://halab.nd.edu/">Human-centered Analytics Lab</a>, Mendoza College of Business, University of Notre Dame. Editor of five journal and magazine special issues, including two IEEE Software issues on release engineering. Review panelist for the National Science Foundation and NSERC. Doctoral committees at Notre Dame, Waterloo, George Mason, Wichita State, and Victoria. Program committees and reviewing: see the CV.</p>
      </section>

      <section id="cv">
        <h2>Curriculum Vitae</h2>
        <p><a href="/cv/cv_academic.pdf"><b>Download the CV</b></a> <span style={{ color: 'var(--muted)' }}>(PDF, updated August 2026: publications, patents, service, the lot.)</span></p>
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <p>chris [at] cabird [dot] com<br />
          <a href="https://scholar.google.com/citations?user=aDVlS-wAAAAJ">Google Scholar</a> &middot;{' '}
          <a href="https://github.com/cabird">GitHub</a> &middot;{' '}
          <a href="https://www.linkedin.com/in/christian-bird-1896494/">LinkedIn</a></p>
      </section>

      <p className="aside">I build and study AI developer tools, so this site also exists as one: <a href="/ide/">the interactive version</a> runs as a working IDE, with an AI assistant over my publications. It hallucinates occasionally. The papers don&rsquo;t.</p>

      <footer>Built with AI assistance. No analytics, nothing tracks you. Set in Charter.<br />
        Last updated August 10, 2026.</footer>
    </div>
  );
};
