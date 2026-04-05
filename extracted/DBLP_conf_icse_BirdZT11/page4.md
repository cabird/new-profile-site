We also examined cases of pairs of branches that had either (or both) high team or high goal similarity. Within Windows 7, we found, of the branch pairs that are similar in terms of virtual teams or goals, 68% have higher team similarity than goal similarity. A binomial test showed that this is a statistically significant result as well, with p << 0.01.

Figure 2 shows the heatmap for Windows Vista. Again, observe that the density of branch pairs above the x = y line is higher than below, indicating that it is rare for branches to be similar in terms of goals, but not in terms of the virtual teams accomplishing them. The Spearman correlation of goal and virtual team similarity in Vista was 0.47 with p << 0.01, indicating a slightly higher, but still moderate and statistically significant correlation between similarities. In our analysis of how often team similarity is higher than goal similarity in Vista, team similarity was higher 75% of the time, again with a binomial test significance of p << 0.01.

Our empirical analysis indicates that our theory of branch similarity in terms of goals and teams is supported by the development activity in the last two releases of Windows.

## 4. RELATED WORK

Space limits our discussion of the wealth of prior work related to awareness, collaboration of software teams, and use of branching. Sarma et al. developed [14] and evaluated [15] Palantir, a tool for workspace awareness. While we are not aware that Palantir has been evaluated in the context of branches in source code management systems, fundamentally there is no reason that it would not work in such a setting. Palantir addresses the same high level concern as our own, awareness between contributors to software projects. Guimaraes et al. implemented a novel continuous integration system, WeCode, to be employed by teams using branches to collaboratively deal with integration issues early and improve checkin quality [7].

Tools such as Palantir and WeCode are aimed at mitigating existing issues and identify very concrete problems after or as they occur. In contrast we are interested in identifying disparate teams working on the same parts of the system that have the potential to make changes which may conflict at the syntactic or, much worse, the semantic or design level. Our target audience differs in that we aim to provide awareness to project management rather than developers, so that they may avoid these scenarios or coordinate these efforts without adverse effects. As soon as a virtual team knows which files need work to realize their goals (as early as design time) management may use such information to identify which virtual teams may require additional coordination.

## 5. LOOKING FORWARD

These results represent the first step in our exploration of the relationship between teams and goals on branches. While encouraging for this line of research, more must be done for it to be useful and actionable. In this paper, we have proposed a theory and have found that it generally holds across two releases of Windows. We have not, however, shown that the results of software development are any different when this hypothesis holds from when it does not. That is, we have not shown that there are better outcomes when high team similarity accompanies high goal similarity. As our next step, we will examine this question. If this relationship leads to positive outcomes or the lack of this relationship is associated with negative outcomes (such as delay, lower software quality, or increased maintenance cost), there is value in developing tools and practices to avoid branches with similar goals that are contributed to by disparate teams.

Further, we exhort other researchers studying various development contexts to ask the same or similar questions regarding division of work and teams using branches and report their results.

## 6. REFERENCES

[1] Cataldo, M., Wagstrom, P., Herbsleb, J., and Carley, K. Identification of coordination requirements: implications for the Design of collaboration and awareness tools. In Proceedings of the 20th anniversary of the Conference on Computer supported cooperative work (2006).

[2] Nagappan, N., Victor, B., and Brendan, M. The Influence of Organizational Structure on Software Quality: An Empirical Case Study. In Proceedings of the 30th International Conference on Software Engineering (2008).

[3] Parnas, D. On the Criteria to be Used in Decomposing Systems into Modules. Communications of the ACM, 14 (1972), 221-227.

[4] Conway, M. How do committees invent. Datamation, 14, 4 (1968), 28-31.

[5] Bird, C., Rigby, P., Barr, E., Hamilton, D., German, D., and Devanbu, P. The Promises and Perils of Mining Git. In Proceedings of the Sixth Working Conference on Mining Software Repositories (2009), IEEE Computer Society.

[6] International Working Conference on Mining Software Repositories. (2004-2010).

[7] Guimaraes, M.L. and Rito-Silva, A. Towards Real-Time Integration. In Proceedings of the Workshop on Cooperative and Human Aspects of Software Engineering (2010).

[8] Dourish, P. and Bellotti, V. Awareness and Coordination in Shared Workspaces. In Proceedings of the ACM Conference on Computer Supported Cooperative Work (1992).

[9] Damian, D., Izquierda, L., Singer, J., and Kwan, I. Awareness in the Wild: Why Communication Breakdowns Occur. In Proceedings of the International Conference on Global Software Engineering (2007).

[10] Tan, P.-N., Steinbach, M., and Kumar, V. Introduction to Data Mining. Addison Wesley, 2005.

[11] Dowdy, S., Wearden, S., and Chilko, D. Statistics for Research. John Wiley & Sons, 2004.

[12] Conover, W.J. Practical Nonparametric Statistics. Wiley & Sons, New York, 1971.

[13] Benjamini, Y. and Hochberg, Y. Controlling the False Discovery Rate: A Practical and Powerful Approach to Multiple Testing. Journal of the Royal Statistical Society. Series B (Methodological), 57, 1 (1995), 289-300.

[14] Sarma, A., Noroozi, Z., and van der Hoek, A. Palantir: Raising Awareness among Configuration Management. In Proceeding of the 25th International Conference on Software Engineering (2003), 444-454.

[15] Sarma, A., Redmiles, D., and van der Hoek, A. Empirical Evidence of the Benefits of Workspace Awareness in Software Configuration Management. In Proceedings of the 16th ACM SigSoft International Symposium on Foundations of Software Engineering (2008), 113-123.