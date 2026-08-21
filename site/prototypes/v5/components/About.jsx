/* About: bio, timeline, book, service, news. The narrative page. */
const { TopNav, Footer } = V5;

const NEWS = [
  { d: 'Aug 2026', html: <span><i>To Copilot and Beyond: 22 AI Systems Developers Want Built</i> received a Distinguished Paper Award in the ICSME 2026 Industry Track.</span> },
  { d: 'Aug 2026', html: <span><i>Good Vibrations?</i>, our study of vibe coding, passed 50 citations in under a year on arXiv, while still working its way through peer review.</span> },
  { d: 'Apr 2026', html: <span><i>&ldquo;Maybe We Need Some More Examples&rdquo;</i> received an ACM SIGSOFT Distinguished Paper Award at ICSE 2026.</span> },
  { d: 'Jan 2026', html: <span>Joined the advisory board of the <a href="https://halab.nd.edu/">Human-centered Analytics Lab</a> at Notre Dame&rsquo;s Mendoza College of Business.</span> },
  { d: 'Jan 2026', html: <span>U.S. Patent 12,524,647 granted: automated merge conflict resolution.</span> },
  { d: 'May 2025', html: <span>Our 2013 code review paper received the ACM SIGSOFT Impact Paper Award. One paper across all of software engineering receives it each year, recognizing impact that has lasted a decade or more.</span> },
];

V5.About = function About() {
  return (
    <div className="page">
      <header>
        <div className="mast">
          <img className="headshot" src="/images/profile_pic_medium.jpeg" alt="Christian Bird" />
          <div>
            <h1>About</h1>
            <p className="identity">Christian Bird. Senior Principal Researcher, Microsoft Research.<br />
              The longer story: where the work comes from and where it&rsquo;s been.</p>
          </div>
        </div>
      </header>

      <TopNav here="about" />

      <section id="bio">
        <h2>Bio</h2>
        <p>I analyze the records that software projects leave behind: millions of code changes, code reviews, build results, and bug reports. Studied at scale, that evidence shows how engineering teams really work, where their time goes, and which practices measurably help. The field calls this empirical software engineering. The short version is that I treat software development as something you can study rather than argue about.</p>
        <p>My current focus is AI-assisted development: building and studying the systems that let AI coding tools understand large codebases, and watching closely what those tools do to the people who use them.</p>
        <p>I&rsquo;ve spent 16 years at Microsoft Research working alongside product teams at scale: understanding their workflows firsthand, prototyping solutions, and seeing them through to adoption. The work has spanned code review, branching and release strategy, build systems, testing practice, and developer productivity, mostly on some of the largest codebases in existence. I care more about changes teams actually adopt than about the paper count, though the papers happened anyway. Ph.D. from UC Davis under Prem Devanbu; before graduate school, five years as a software engineer at Motorola. None of this was done alone, and the collaborators are the best part.</p>
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

      <section id="service">
        <h2>Service</h2>
        <p>Program co-chair, IEEE/ACM International Conference on Automated Software Engineering (2023). Advisory board, <a href="https://halab.nd.edu/">Human-centered Analytics Lab</a>, Mendoza College of Business, University of Notre Dame. Editor of five journal and magazine special issues, including two IEEE Software issues on release engineering. Review panelist for the National Science Foundation and NSERC. Doctoral committees at Notre Dame, Waterloo, George Mason, Wichita State, and Victoria. Program committees and reviewing: see the CV.</p>
      </section>

      <section id="news">
        <h2>News</h2>
        <ul className="hang">
          {NEWS.map((n, i) => (
            <li key={i}><span className="hangdate">{n.d}</span>{n.html}</li>
          ))}
        </ul>
      </section>

      <Footer />
    </div>
  );
};
