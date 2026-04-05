indicates that Debbie (whose full name we identify earlier in the email thread) works at IBM’s Ottawa site.

**Presentations and Conferences —** Many developers attend conferences or give presentations to others. The title slide in presentations online often included the name of the presenters along with their location of employment. Online conference programs also usually give a brief bio of the presenter which included their location and employer.

**Direct Communication —** In rare cases, we contacted contributors directly. As an example, when searching for Billy Biggs, a developer for ECLIPSE, we encountered a web site for someone with that name that listed ECLIPSE as one of his projects. We contacted him through his site and asked questions regarding where he lived and who he worked for (as well as the same information for other hard to locate contributors) [23].

**Company sites —** Some companies contain biographical pages for their employees or allow employees to create their own pages (e.g., Microsoft Research has this facility for its employees). Often there is a link to the site that the employee works at and the location can be inferred from that.

**Web Articles —** In one case a web “journalist” for an online news site had written an article about ECLIPSE and mentioned that he’d talked to an ECLIPSE developer where he worked in San Francisco at BEA. This indicated both the location and employer of the developer.

**Association —** For some individuals, we could not find their location directly, but another person whose location we had already determined indicated that they worked at the same location, either in a blog entry or an email. Thus we were able to determine the location by association.

**SCM History —** File logs from the source code management system can also provide valuable clues for identifying contributors. In one notable case for ECLIPSE, the CVS user name for an unknown contributor was torres. Unfortunately, we were able to identify four people with the last name of Torres that are associated with ECLIPSE and were unable to determine which person used the torres CVS account. Upon examining the CVS logs, we found that the vast majority of the files that torres committed to had to do with SWT (the GUI toolkit in ECLIPSE). This additional information allowed us to improve our search and we were immediately able to determine which of the four corresponded to the committer (in this case Elias Torres) along with his blog which indicated his location.

For a number of sites, we were able to get the exact address of the company. In cases where we were unable to determine the organization that a developer was affiliated with (or when the developer indicated that he was self-employed or not employed) we had to settle for the city. For each person we identified the city, state or province (where such existed in the country), country, and company. From these, we determined the latitude and longitude, used for time zone data and distances between sites.

Using these methods, we identified the locations for the top 77 contributors in FIREFOX and the top 100 contributors to ECLIPSE. In both cases, the contributors account for over 95% of the contributions to the project.

### C. Measures of Distribution

We include a number of measures of geographic and organizational distribution.

#### Distribution Level

Similar to a prior study on distributed development in a commercial setting [9], we categorized the level (which we denote LEVEL) of geographic distribution for each component based on the smallest geographic entity that we could trace 75% of the commits back to. Thus, if we could identify one city from which 75% of the commits came from, we categorized the component as distributed at the city level. If not, we examined the different nations that contributed to the binary and then the number of continents that contributed. If we were unable to identify a continent that contributed at least 75% of the commits, we categorized the component at the worldwide level.

The threshold of 75% was chosen for two reasons. First, prior studies [9], [18] used this threshold and using the same value allows for an equitable comparison between our findings and previous findings. Second, our measure is discrete rather than continuous and using a threshold of 100% would allow just one commit to a component make LEVEL jump from being distributed within a city to being distributed worldwide. We did not want LEVEL to be susceptible to such phenomena.

#### Spatial and Temporal Dispersion

Following the methodology of Cataldo and Nambiar [17], we use the definition of Spatial Dispersion introduced originally by O’Leary and Cummings [24]. In the dispersion equations, N is the total number of developers that contributed to a component, L is the set of locations of the developers making contributions, and N_i and N_j are the number of developers at locations i, j ∈ L respectively. For our measure, SPATIAL, KM_ij is the distance in kilometers between location i and location j.

SPATIAL = (sum_{i,j ∈ L} KM_ij · N_i · N_j) / ((N^2 − N) / 2)    (1)

Similarly, in the definition of Temporal Dispersion, TEMPORAL, TZ_ij is the absolute value of the timezone difference between locations i and j in hours.

TEMPORAL = (sum_{i,j ∈ L} TZ_ij · N_i · N_j) / ((N^2 − N) / 2)    (2)

For both definitions of dispersion, if developers in only one location made contributions to a component, the dispersion is zero. Similar to Cataldo and Nambiar, we measured distances between sites in the same city (when such resolution was possible), but did not measure distances between buildings at the same site.