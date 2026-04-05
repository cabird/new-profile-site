![Boxplot titled "Peer group vs. Hierarchy" comparing FreeBSD and Linux](page4_img_1.png)

Figure 3: Peer group vs. Hierarchy.

These “sideways” exchanges represent collaboration between small, task-focused groups of developers. In previous work, Bird et al. [10] found that OSS developers naturally group themselves into task-based groups who disband after the task is completed. However, they did not find evidence that these developers, who use CVS, created branches to work on these tasks. Instead, developers working in similar areas of the system collaborated via related threads on the developer mailing lists. The FreeBSD project uses this style of collaboration with all committers working together on a single repository [5].

In contrast, experienced users of DVC on the Linux project create separate repositories through which they can work on a particular topic and later have the code promoted to a release branch when it is finished. The "MAINTAINERS" file for Linux contains 62 official, public git repositories that cover 647 specific topics related to kernel development. 555 individuals maintain these topics. Many of these repositories represent long-lived development priorities (see Table I for example topics). These repositories are typically maintained by a single individual; however, they represent only a small number of the available Linux repositories. For example, on the social media based GitHub site we see that there are 416 separate forks of Torvalds' Linux repository. A further 3400 individuals are registered to receive updates when his repository changes.

Linux is modularized in two ways. Like FreeBSD the system is modularized in the directory hierarchy [1]. Unlike FreeBSD, Linux also isolates development into sandboxes: repositories dedicated to a particular topic.

![Table of topics, repositories, and maintainers (Table I)](page4_img_2.png)

Table I: A sample of topics and sandboxes in Linux.

## V. CONCLUSIONS AND FUTURE WORK

We reported preliminary results relating to DVC’s effect on project governance and collaboration among developers. Our conjectures and case study suggest that strongly hierarchical projects benefit from DVC, while peer groups tend to need a central repository to reach consensual decisions. However, most projects will lie somewhere on the continuum between the pure hierarchy and the pure peer group. Within this larger governance structure, DVC allow specialized subgroups to collaborate in a distributed manner on specific problems (i.e., in a sandbox), while still maintaining a repository that is used for integration and releases.

DVC has the potential to make releasing, developing, and coordinating large software projects much less rigid than its exclusively centralized predecessor. Future work is necessary to understand GitHub and other online social media environments that provide a simple and integrated way to fork repositories allowing individuals and projects of any size to collaborate in innovative ways.

## REFERENCES

[1] I. T. Bowman, R. C. Holt, and N. V. Brewster, “Linux as a case study: Its extracted software architecture,” in 21st ICSE, 1999, pp. 555–563.

[2] A. Sarma, Z. Noroozi, and A. Van der Hoek, “Palantír: raising awareness among configuration management workspaces,” in 25th ICSE, 2003, pp. 444–454.

[3] C. Bird, P. C. Rigby, E. T. Barr, D. J. Hamilton, D. M. German, and P. Devanbu, “The promises and perils of mining git,” in 6th Conf on Mining Software Repositories, 2009.

[4] J. Berkus, “The 5 types of open source projects,” 2007, http://www.powerpostgresql.com/5_types.

[5] T. Dinh-Trong and J. Bieman, “The FreeBSD Project: A Replication Case Study of Open Source Development,” IEEE ToSEM, vol. 31, no. 6, pp. 481–494, 2005.

[6] H. Simon, Administrative behavior: A study of decision-making processes in administrative organizations. Free Press, 1997.

[7] S. Krishnamurthy, “Cave or Community? An Empirical Examination of 100 Mature Open Source Projects,” First Monday, vol. 7, no. 6-3, 2002.

[8] D. Krackhardt, “Graph theoretical dimensions of informal organizations,” pp. 89–111, 1994.

[9] K. Crowston, J. Howison, K. Crowston, and J. Howison, “Hierarchy and centralization in free and open source software team communications,” Knowledge, Technology, and Policy, vol. 18, no. 4, pp. 65–85, 2006.

[10] C. Bird, D. Pattison, R. D’Souza, V. Filkov, and P. Devanbu, “Latent social structure in open source projects,” in 16th FSE. ACM, 2008, pp. 24–35.