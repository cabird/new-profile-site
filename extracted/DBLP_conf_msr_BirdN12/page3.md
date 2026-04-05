![left column of page](txt_1)

## IV. Data Collection and Analysis

In this section we discuss the collection of data as well as the techniques used to analyze the data. As the novel data that we collected includes the organizational and geographic information for developers in ECLIPSE and FIREFOX, we have made this data available on the PROMISE Software Engineering Repository [20]^1.

### A. Data Collection

For our analysis, we collected a number of types of data. We gathered data from source code repositories and bug databases and also determined the locations of developers.

As an OSS project, Mozilla maintains a publicly available source code repository, which contains the sources for the FIREFOX browser. We mined the changes from this CVS repository, which comprised a total of 1,147,175 changes from March, 1998 to March, 2008. In our analysis, we only examined changes to the files that were included in two major releases of FIREFOX, 1.5 and 2.0 during their respective development cycles. There were 6,151 and 6,211 C and C++ source files that shipped as part of FIREFOX versions 1.5 and 2.0 respectively and a total of 44,877 changes made to these files during development of these releases. We also mined the changes from the ECLIPSE CVS repository, which comprised a total of 920,989 changes from April, 2001 to February, 2008.

We found that 227 accounts made commits to the FIREFOX codebase. However, the 77 most active contributors accounted for 95% of the source code commits. None of the other contributors accounted for more than 0.2% of the commits to FIREFOX during these development cycles. Although there were 208 ECLIPSE CVS accounts, we found that some people had multiple accounts. After dealing with the account aliasing, we found that 190 unique people made commits to the main project repository. Similar to FIREFOX, ECLIPSE contributions were skewed such that the 100 most active contributors accounted for over 95% of the commits and none of the remaining 90 contributors made more than 0.12% of the total commits.

We use FIREFOX pre- and post-release defects that had been mined previously for each of the C/C++ files as a part of this study. For our ECLIPSE bug data, we mined the project’s Bugzilla repository. This database contains information such as severity, version of the product, priority, assignments, resolution information and timestamps for 221,518 bug entries. We only include entries that are marked as bugs (e.g., no feature requests) and that are assigned to the ECLIPSE main platform.

We used automated techniques to link closed bugs in the database to the commits that fixed them in the software repository [21]. Each bug in the database includes the date that it was opened and also the version of ECLIPSE that the bug occurred in. We use this information along with the release dates of each version of ECLIPSE to categorize bugs into pre-release and post-release for each of the versions of ECLIPSE released during the period of study.

1 http://promisedata.org

![right column of page](txt_2)

ECLIPSE has a rigorous policy of manually attributing bug IDs in their log messages. We manually used text similarity and information from the internet to link CVS accounts with bug database accounts in ECLIPSE using techniques introduced by Bird et al. [22].

### B. Locating Developers

We are interested in where the developers are both in terms of organization (who do they work for) and geography (where do they work). We note that just because a developer works for a particular organization does not mean that the organization itself is a formal contributor. If a student from MIT or an employee from BEA commits code, that in no way indicates sponsorship from their organizations. However, we expect that ease of communication, commonality of goals, and cohesiveness of changes will differ based on whether developers are from different organizations or not. This information is not generally made public anywhere so deeper investigation is required. Fortunately, for each developer that contributed directly to the source code repository, we can extract their email address, name, and history of contributions. We identified the top contributors that made 95% of the commits to each project’s source repository.

We used a number of techniques to determine the geographic and organizational information for the developers.

- Email domain names — Many email addresses contain geographical or organizational information in the domain name. For instance, bzbarsky@mit.edu indicates a contributor from MIT. Companies like IBM are apparent from the domain name. Often the country is also indicated in the domain (for instance enndeakin@sympatico.ca is in Canada). Although the granularity is coarse (e.g., only narrowing down to a country), these give some indication of where else to look for identifying information.

- Social Networking sites — LinkedIn is a common professional networking site. Since most primary developers are professionals, many of them were on LinkedIn. Their profiles indicate the metropolitan area that they are living in and often list job history so we can see where they were at the time of commits. In cases where a name is common, such as “Jeff Brown”, it is possible to filter on employer or job domain. In addition, other networking sites such as Facebook, which often indicate geographical location or employer, were also helpful.

- Blogs — Since developers are heavily technical and active in the ECLIPSE or FIREFOX community, many maintain either technical programming or personal blogs. It is usually apparent where they live and who they work for from their postings on these blogs. As an example taken from our investigations, “I got back to MIT to begin the Spring Semester last week...” indicated an MIT student that made contributions.

- Emails — Often information is contained in the body of an email about the location of the sender. People may refer to others and include their location. For instance “…as Debbie (Ottawa/Can/IBM) has stated previously, the UI can’t…”