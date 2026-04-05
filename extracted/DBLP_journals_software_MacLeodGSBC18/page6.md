system.

Rigid policies, such as always requiring two sign-offs or execution of a complete test suite, can lead to long delays in committing code. Developers, aware of the process burden, might avoid making the change, or will bundle it with others, causing reviews to become larger, less coherent, and harder to review. However, lax or unclear policies might reduce the value a team gets from code reviews.

Several trade-offs have to be considered when choosing practices regarding reviewer selection. Getting feedback from experts and senior developers must be balanced with several things. First of all, it may mean fewer opportunities for junior team members to learn and be mentored or fewer opportunities for knowledge dissemination while also distracting the senior developers from directly working on other coding tasks. Furthermore, requiring expert feedback might also create delays due to a lack of reviewer availability. Thus requesting less experienced reviewers can increase review speed and balance the team’s workload. In terms of whether reviewers volunteer or not, reviewers who volunteer may be motivated to do a good job, but in some cases it may be more efficient to directly assign the review to experts rather than waiting for experts to self-select.

It may be prudent to trade traceability of review activities with richer communication channels. Particularly tense situations call for face-to-face discussions but these discussions are hard to capture and are rarely documented. In some situations, recording every decision might be required for legal compliance.

The policy and tools that promote awareness can lead to notification overload. A developer may want to notify a large group about a review, but overload leads to notifications being ignored. Likewise, the use of sophisticated tooling may save or waste time. Tools can automate some tedious tasks (e.g., check code formatting) but may incur huge costs for configuration and familiarization, or may even slow down processes (e.g., handling false positives of static analysis tools). Automation in the tool chain increases consistency but may lead to a feeling of loss of control.

In summary, the only way to manage these trade-offs is to be aware of them, to search for additional trade-offs, and to periodically evaluate not just workflow velocity and code quality but also the impact the practices have on developer satisfaction, personal goals, and team culture.

## 6. CONCLUDING REMARKS

Code review has been a popular research topic in the past few years and it continues to be an ongoing topic of importance to practitioners and researchers. Through this article, we aimed to gather insights from the dispersed research to date and add findings from a large industrial study where we closely observed and surveyed developers that author or review code changes. We presented the key challenges faced by authors and reviewers of code changes, and provided a number of suggested best practices for authors, reviewers, and organizations to consider that may alleviate these challenges. We discuss the inevitable trade-offs practitioners may face. We hope that these insights will be useful to researchers and practitioners alike as new tools, processes, and research emerge from our community.

> Acknowledgments
>
> We thank our study participants, the CodeFlow team for their input on our research designs, and Cassandra Petrachenko for editing our paper.

## 7. REFERENCES

[1] A. Bacchelli and C. Bird, “Expectations, outcomes, and challenges of modern code review,” in Proceedings of the 2013 international conference on software engineering. IEEE Press, 2013, pp. 712–721.

[2] G. Gousios, M. Pinzger, and A. v. Deursen, “An exploratory study of the pull-based software development model,” in Proceedings of the 36th International Conference on Software Engineering. ACM, 2014, pp. 345–355.

[3] P. Rigby, B. Cleary, F. Painchaud, M. Storey, and D. German, “Contemporary peer review in action: Lessons from open source development,” Software, IEEE, vol. 29, no. 6, pp. 56–61, Nov 2012.

[4] V. K. Gurbani, A. Garvert, and J. D. Herbsleb, “A case study of a corporate open source development model,” in Proceedings of the 28th international conference on Software engineering. ACM, 2006, pp. 472–481.

[5] M. Greiler et al., “Appendix to code reviewing in the trenches: Understanding challenges, best practices and tool needs,” Microsoft Corp., Tech. Rep. MSR-TR-2016-27, May 2016, (http://research.microsoft.com/apps/pubs/default.aspx?id=266476). [Online]. Available: http://research.microsoft.com/apps/pubs/default.aspx?id=266476

[6] P. Thongtanunam, R. G. Kula, A. E. C. Cruz, N. Yoshida, and H. Iida, “Improving code review effectiveness through reviewer recommendations,” in Proceedings of the 7th International Workshop on Cooperative and Human Aspects of Software Engineering (CHASE), 2014, pp. 119–122.

[7] P. C. Rigby and C. Bird, “Convergent contemporary software peer review practices,” in Proceedings of the 2013 9th Joint Meeting on Foundations of Software Engineering (ESEC/FSE), 2013, pp. 202–212.

[8] M. Barnett, C. Bird, J. Brunet, and S. Lahiri, “Helping developers help themselves: Automatic decomposition of code review changesets.”

[9] Y. Tao, Y. Dang, T. Xie, D. Zhang, and S. Kim, “How do software engineers understand code changes?: an exploratory study in industry,” in Proceedings of the ACM SIGSOFT 20th International Symposium on the Foundations of Software Engineering. ACM, 2012, p. 51.

[10] J. Cohen, E. Brown, B. DuRette, and S. Teleki, Best kept secrets of peer code review. Smart Bear, 2006.

[11] M. Petre and G. Wilson, “Code review for and by scientists,” arXiv preprint arXiv:1407.5648, 2014.

## 8. AUTHOR BIOS