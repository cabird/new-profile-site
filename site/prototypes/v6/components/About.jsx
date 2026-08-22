/* About: timeline, book, service. Bio and news live on the home page. */
const { TopNav, Footer } = V6;

V6.About = function About() {
  return (
    <div className="page">
      <header>
        <h1>About</h1>
        <p className="positioning">The longer story: where the work has been,
          the book, and service to the field.</p>
      </header>

      <TopNav here="about" />

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
            <p style={{ margin: 0 }}><b>The Art and Science of Analyzing Software Data</b>{' '}
              <span className="sub">Morgan Kaufmann, 2015. Edited by Christian Bird, Tim Menzies, and Thomas Zimmermann.</span></p>
            <p className="aside" style={{ marginTop: '0.5rem' }}>Chapters from the people who mine software data for a living, on drawing honest conclusions from repositories, telemetry, bug reports, and review records, and on the many ways the data can fool you.</p>
          </div>
        </div>
      </section>

      <section id="service">
        <h2>Service</h2>
        <ul className="exp">
          <li>Program co-chair, IEEE/ACM International Conference on Automated Software Engineering (2023)</li>
          <li>Advisory board, <a href="https://halab.nd.edu/">Human-centered Analytics Lab</a>, Mendoza College of Business, University of Notre Dame</li>
          <li>Editor of five journal and magazine special issues, including two IEEE Software issues on release engineering</li>
          <li>Review panelist for the National Science Foundation and NSERC</li>
          <li>Doctoral committees at Notre Dame, Waterloo, George Mason, Wichita State, and Victoria</li>
          <li>Program committees and reviewing: see the <a href="/cv/cv_academic.pdf">CV</a></li>
        </ul>
      </section>

      <Footer />
    </div>
  );
};
