/* Patents: thirteen granted U.S. patents, each linked to its Google Patents record. */
const { TopNav, Footer } = V6;

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

V6.Patents = function Patents() {
  return (
    <div className="page">
      <header>
        <h1>Patents</h1>
        <p className="positioning">Inventor on thirteen granted U.S. patents in
          automated software engineering, all assigned to Microsoft. Each number
          links to the full record.</p>
      </header>

      <TopNav here="patents" />

      <section id="patents">
        <h2>Granted U.S. patents</h2>
        <ul className="hang">
          {PATENTS.map((p, i) => (
            <li key={i}><span className="hangdate">{p[0]}</span>
              <span>{p[1]}<br />
                <span className="sub"><a href={`https://patents.google.com/patent/US${p[2].replace(/,/g, '')}`}>U.S. Patent {p[2]}</a></span></span></li>
          ))}
        </ul>
      </section>

      <Footer />
    </div>
  );
};
