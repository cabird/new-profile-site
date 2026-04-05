## TABLE 1. The first 15 projects returned by next_projects (N = 20028, projects P = ∅, universe U = ohloh, space D, config C) with the increase in coverage

| Name | Language | Lines | Contributors | Commits | Churn | Age | Activity | Increase |
|---|---:|---:|---:|---:|---:|---|---|---:|
| serialize_with_options | Ruby | 301 | 2 | 10 | 147 | Normal | Increasing | 0.574% |
| Java Chronicle | Java | 3892 | 4 | 81 | 8629 | Young | Stable | 0.569% |
| Hike | Ruby | 616 | 3 | 11 | 333 | Normal | Stable | 0.559% |
| Talend Service Factory | Java | 20295 | 8 | 162 | 27803 | Normal | Stable | 0.549% |
| OpenObject Library | Python | 1944 | 5 | 36 | 1825 | Normal | Stable | 0.459% |
| ruote-amqp-pyclient | Python | 315 | 4 | 7 | 139 | Normal | Stable | 0.454% |
| sign_server | Python | 1791 | 3 | 63 | 3415 | Young | Stable | 0.414% |
| redcloth-formatters-plain | Ruby | 655 | 4 | 5 | 82 | Normal | Decreasing | 0.384% |
| python-yql | Python | 1933 | 2 | 11 | 93 | Normal | Decreasing | 0.369% |
| mraspaud's mpop | Python | 12664 | 7 | 160 | 22124 | Normal | Stable | 0.369% |
| appengine-toolkit | JavaScript | 18253 | 5 | 110 | 20572 | Normal | Stable | 0.364% |
| socket.io-java | Java | 23533 | 4 | 187 | 46254 | Young | Stable | 0.335% |
| Glinux | C | 41052 | 8 | 55 | 3114 | Very Old | Decreasing | 0.335% |
| Pax URL | Java | 31467 | 7 | 73 | 6923 | Old | Decreasing | 0.330% |
| Honeycrm | Java | 14864 | 2 | 45 | 3810 | Normal | Decreasing | 0.315% |

## TABLE 2. The representativeness of all ICSE and FSE papers in the past 2 years as well as the five most representative papers. The universe is the active Ohloh projects, the space is (Main language, Total lines of code, Contributors, Churn, Commits, Project age, Project activity) and the configuration consists of the default similarity functions.

![Representativeness table and bar charts](page6_img_1.png)

software engineering community. Rather, results should only be viewed in the context of the papers in those two years of those two conferences (ICSE 2011, 2012 and FSE 2010, 2011).

To create the dataset the first author read each (full) paper of the main technical research track in each conference, looked for the software projects that were analyzed and recorded the number — and, if mentioned, the names of the projects in a spreadsheet. We then queried Ohloh for each of the software projects to find the corresponding identifier, which we used to cross-reference the data with our corpus.

Some projects we could not cross reference with our dataset because of any one of the following reasons: (a) the project was not indexed by Ohloh; (b) the paper used an aggregated set of projects, and particular projects were not named in the paper; (c) the project does not meet the criteria to be included in the universe, e.g., the project has not been under development in the past year, has only one developer, or has missing or invalid data.

The analysis of the ICSE and FSE conferences revealed several large-scale studies that analyzed hundreds, if not thousands, of projects. Some of these papers we had to exclude from our analysis as they either analyzed closed-source projects or did not report the names of the individual projects analyzed or analyzed inactive Ohloh projects.

### What are the most frequently used projects in the ICSE and FSE conferences?

We found 635 unique projects that were analyzed by the ICSE and FSE conferences in the two-year period. Out of these we could map 207 to the universe of active Ohloh projects.

The most frequently studied projects were the Eclipse Java Development Tools (JDT) in 16 papers, Apache HTTP Server in 12 papers, gzip, jEdit, Apache Xalan C++, and Apache Lucene each in 8 papers, and Mozilla Firefox in 7 papers. Another frequently studied project is Linux, which was analyzed in 12 papers. While the Linux project is listed on Ohloh, the code analysis has not yet completed.