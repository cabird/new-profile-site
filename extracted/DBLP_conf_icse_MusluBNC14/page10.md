smaller products. It is future work to expand our study to other development settings to generalize the findings. We plan to use the diversity metrics introduced by Nagappan et al. [15] to expand the results as much as possible. In general, for empirical studies, it is necessary to build an empirical body of knowledge [16]. Towards this end, we hope that our study helps to contribute to this body of knowledge on VCSs.

## 9. RELATED WORK

To the best of our knowledge, the closest work that compares CVCSs and DVCSs is Barr et al.’s [2] investigation on how the use of branches and development history changed after the transition of large open source software (OSS). They combine the interviews with the lead developers in OSS projects with mined data from 60 OSS projects and find that the developers started using VCS branches more frequently and effectively after the transition to DVCS, specifically for collaborating on the same task. Similarly, de Alwis and Sillito [1] summarized the transition challenges and anticipated benefits for four OSS projects using the developer notes and documentation related to the transition. Our work focuses on the transition process at a large commercial company, from the developer’s point of view and tries to identify the transition reasons, barriers, and outcomes.

VCSs, the idea to store the development history in a structured way for future access and creating back-ups, have been used for a long time. Rochkind proposed Source Code Control System (SCCS) as one of the earliest VCSs [17]. Initial VCSs, including SCCS, Revision Control System [18] and ClearCase [19], versioned each file separately rather than bundling all developer changes into an atomic entity. Concurrent Version System (CVS) was one of the first CVCS to introduce the notion of change-sets, atomic entities for bundling changes on multiple files [3]. Consecutive CVCSs, such as Subversion [4], including the commercial ones, such as Perforce [20] and Team Foundation Server [21], continued using the change-set notion.

BitKeeper [22] and Bazaar [23] started a new era for VCSs by introducing the DVCSs. DVCSs, including Git [6] and Mercurial [5], aimed to improve the limited branching and merging capabilities offered by CVCSs and offer an easier development workflow for collaboration, especially in OSS projects, where developers join to and leave from periodically. Existing research investigated the effects of branching [24] and merging [25] on software development. This paper investigates the importance of the new features added by DVCSs in large commercial products that have been using CVCSs for a long time.

Previous research showed that by mining software repositories and VCS history, it is possible to improve software quality by predicting files that have higher chance of generating defects [26, 27]. Our study aims to understand transition reasons, barriers, and outcomes.

## 10. CONCLUSIONS

This paper is one of the first attempts to understand the transition costs and benefits to a DVCS in a large company. This paper presents a study investigating such a transition based on qualitative interviews and survey data. In this study, we identified offline operations, local and incremental commits, and lightweight branches as the major transition reasons. Additionally, lightweight branches and offline commits satisfy two popular developer needs: efficient context switching and offline, incremental workflow. Using the interviews and survey results, this work identifies that the developers might face problems, during the transition, due to steep DVCS learning curve, limited DVCS integration with the remaining of the development workflow, and DVCS scaling issues. This study focuses on DVCS scaling issues and identifies checked-in binary dependencies, composite products, and long development history as the major reasons, and discusses how these scaling issues can be mitigated with alternative development workflows and advanced DVCS commands.

We conclude this discussion by providing some guidelines for the developers, teams, and managers who consider transitioning. We hope that our findings and guidelines will help these people to make a better decision, and if they decide to transition, plan for the transition better and go through the transition with fewer number of problems. In future, we plan to perform controlled studies where a reasonably sized project is developed concurrently using DVCS and CVCS in order to compare and contrast productivity and quality metrics in a comparable experimental scenario.

## ACKNOWLEDGEMENTS

We would like to thank the developers at Microsoft for their interest, input, and help with the study. Thomas Zimmermann helped us with the design, distribution and the analysis of the survey. Emerson Murphy-Hill, Thomas Zimmermann, Gifford Cheung, and Thomas Debeauvais helped during the card sorting. Emerson Murphy-Hill provided insight for Section 7.

## REFERENCES

[1] B. de Alwis and J. Sillito, "Why Are Software Projects Moving From Centralized to Decentralized Version Control Systems?," in International Conference on Software Engineering Workshop on Cooperative and Human Aspects on Software Engineering, Vancouver, BC, Canada, 2009.

[2] E. T. Barr, C. Bird, P. C. Rigby, A. Hindle, D. M. German and D. Premkumar, "Cohesive and Isolated Development with Branches," in International Conference on Fundamental Approaches to Software Engineering, Tallinn, Estonia, 2012.

[3] D. Grune, "Concurrent Versions System, a Method for Independent Cooperation," Vrije Universiteit, Amsterdam, The Netherlands, 1986.

[4] B. Collins-Sussman, "The Subversion Project: Building a Better CVS," Linux Journal, no. 94, p. 3, February 2002.

[5] "Mercurial," [Online]. Available: http://mercurial.selenic.com. [Accessed 13 September 2013].

[6] "Git," [Online]. Available: http://git-scm.com. [Accessed 13 September 2013].

[7] T. D. LaToza, G. Venolia and R. DeLine, "Maintaining Mental Models: A Study of Developer Work Habits," in the 28th International Conference on Software Engineering, Shanghai, China, 2006.

[8] F. Shull, J. Singer and D. I. K. Sjøberg (Editors), Guide to Advanced Empirical Software Engineering, 2008.

[9] "Git Branching - Rebasing," [Online]. Available: http://git-scm.com/book/en/Git-Branching-Rebasing. [Accessed 13 September 2013].

[10] "Mercurial: Transplant Extension," [Online]. Available: http://mercurial.selenic.com/wiki/TransplantExtension. [Accessed 13 September 2013].