## 6. THREATS TO VALIDITY

### Construct Validity
The data collection on a system the size of Windows Vista is automated. Metrics and other data were collected using production‑level quality tools and we have no reason to believe that there were large errors in measurement.

### Internal Validity
In Section 5 we listed observations about the distributed development process used at Microsoft. While we have reason to believe that these alleviate the problems associated with distributed development, a causal relationship has not been empirically shown. Further study is required to determine to what extent each of these practices actually helps. In addition, although we attempted an exhaustive search of differences in characteristics between distributed and collocated binaries, it is possible that they differ in some way not measured by our analysis in Section 4.3.

### External Validity
It is unclear how well our results generalize to other situations. We examine one large project and there is a dearth of literature that examines the effect of distributed development on post‑release failures. We have identified similarities in Microsoft’s development process with other successful distributed projects, which may indicate important principles and strategies to use. There are many ways in which distributed software projects may vary and the particular characteristics must be taken into account. For instance, we have no reason to expect that a study of an outsourced project would yield the same results as ours.

## 7. CONCLUSION
In our study we divide binaries based on the level of geographic dispersion of their commits. We studied the post‑release failures for the Windows Vista code base and concluded that distributed development has little to no effect. We posit that this negative result is a significant finding as it refutes, at least in the context of Vista development, conventional wisdom and widely held beliefs about distributed development. When coupled with prior work,1,11 our results support the conclusion that there are scenarios in which distributed development can work for large software projects. Based on earlier work,18 our study shows that organizational differences are much stronger indicators of quality than geography. An organizationally compact but geographically distributed project would be better than a geographically local, organizationally distributed project.

We have presented a number of observations about the development practices at Microsoft which may mitigate some of the hurdles associated with distributed development, but no causal link has been established. There is a strong similarity between these practices and those that have worked for other teams in the past1 as well as solutions proposed in other work.10 Directly examining the effects of these practices is an important direction for continued research in globally distributed software development. Devanbu and Bird acknowledge that their work is in part supported by the National Science Foundation, under Grant NSF‑SOD 0613949.

## References
1. Battin, R.D., Crocker, R., Kreidler, J., Subramanian, K. Leveraging resources in global software development. IEEE Softw. 18, 2 (Mar./Apr. 2001), 70–77.  
2. Bhat, J.M., Gupta, M., Murthy, S.N. Overcoming requirements engineering challenges: lessons from offshore outsourcing. IEEE Softw. 23, 6 (Sept./Oct. 2006), 38–44.  
3. Carmel, E. Global Software Teams: Collaborating across Borders and Time Zones. Prentice Hall, 1999.  
4. Carmel, E., Agarwal, R. Tactical approaches for alleviating distance in global software development. IEEE Softw. 18, 2 (Mar./Apr. 2001), 22–29.  
5. Cusick, J., Prasad, A. A practical management and engineering approach to offshore collaboration. IEEE Softw. 23, 5 (Sept./Oct. 2006), 20–29.  
6. Desouza, K.C., Awaza, Y., Baloh, P. Managing knowledge in global software development efforts: Issues and practices. IEEE Softw. 23, 5 (Sept./Oct. 2006), 30–37.  
7. Ebert, C., Neve, P.D. Surviving global software development. IEEE Softw. 18, 2 (2001), 62–69.  
8. Gumm, D.C. Distribution dimensions in software development projects: a taxonomy. IEEE Softw. 23 (2006), 545–551.  
9. Herbsleb, J. Global software engineering: the future of socio‑technical coordination. International Conference on Software Engineering, 2007, 188–198.  
10. Herbsleb, J., Grinter, R. Architectures, coordination, and distance: Conway’s law and beyond. IEEE Softw. (1999).  
11. Herbsleb, J., Mockus, A. An empirical study of speed and communication in globally distributed software development. IEEE Trans. Softw. Eng. (2003).  
12. Herbsleb, J.D., Mockus, A. Formulation and preliminary test of an empirical theory of coordination in software engineering. In Proceedings of 11th International Symposium on Foundations of Software Engineering (2003).  
13. Herbsleb, J.D., Paulish, D.J., Bass, M. Global software development at Siemens: experience from nine projects. In Proceedings of the 27th International Conference on Software Engineering (2005), ACM, 524–533.  
14. Holmstrom, H., Conchuir, E., Agerfalk, P., Fitzgerald, B. Global software development challenges: a case study on temporal, geographical and socio‑cultural distance. Proceedings of the IEEE International Conference on Global Software Engineering (2006), 3–11.  
15. Kommeren, R., Parviainen, P. Philips experiences in global distributed software development. Empirical Softw. Eng. 12, 6 (2007), 647–660.  
16. Mann, H.B., Whitney, D.R. On a test of whether one of two random variables is stochastically larger than the other. Ann. Math. Stat. 18, 1 (1947), 50–60.  
17. Nagappan, N., Ball, T., Zeller, A. Mining metrics to predict component failures. In Proceedings of the International Conference on Software Engineering (2006).  
18. Nagappan, N., Murphy, B., Basili, V. The influence of organizational structure on software quality: an empirical case study. In Proceedings of the 30th International Conference on Software Engineering (2008).  
19. Nguyen, T., Wolf, T., Damian, D. Global software development and delay: Does distance still matter? In Proceedings of the International Conference on Global Software Engineering (2008).  
20. Olson, G.M., Olson, J.S. Distance matters. Hum. Comp. Interact. 15, 2/3 (2000), 139–178.  
21. Rammasubbu, N., Balan, R. Globally distributed software development project performance: an empirical analysis. In Proceedings of the 6th Joint Meeting of the European Software Engineering Conference and the ACM SIGSOFT Symposium on the Foundations of Software Engineering (2007), ACM, New York, NY, USA, 125–134.  
22. Sosa, M., Eppinger, S., Pich, M., McKendrick, D., Stout, S., Manage, T., Insead, F. Factors that influence technical communication in distributed product development: an empirical study in the telecommunications industry. IEEE Trans. Eng. Manage. 49, 1 (2002), 45–58.  
23. Spinellis, D. Global software development in the FreeBSD project. In GSD ‘06: Proceedings of the 2006 International Workshop on Global Software Development for the Practitioner (Shanghai, China, 2006), 73–79.  
24. Zimmermann, T., Nagappan, N. Predicting defects using network analysis on dependency graphs. In Proceedings of the International Conference on Software Engineering (2008).

Christian Bird (cabird@ucdavis.edu), University of California, Davis, Davis, CA.  
Nachiappan Nagappan (nachin@microsoft.com), Microsoft Research, Redmond, WA.  
Premkumar Devanbu (ptdevanbu@ucdavis.edu), University of California, Davis, Davis, CA.  
Harald Gall (gall@ifi.uzh.ch), University of Zurich, Zurich, Switzerland.  
Brendan Murphy (bmurphy@microsoft.com), Microsoft Research, Cambridge, England.