![scatter plots of keyterm counts for Postgres, Apache, and Python](page4_img_1.png)

Figure 3: Three-month interval counts of keyterm occurrence on hunks (x-axis) and emails (y-axis), for projects (left to right) Postgres, Apache, and Python. The relationship is substantially weaker in this case.

For this popular apr function was extremely high in the early period, in fact, just when the portability layer per se was being defined. Afterwards, the ratio drops. Later on, this important utility function does continue to be used in hunks, but it was not discussed nearly as much.

This suggests a tentative observation: although the level of discussion surrounding the use of a function may vary with time, good engineering principles dictate that the design of more important and useful functions must be well discussed. On the contrary, well-used functions that were not subject to good initial review and discussion will later become troublesome and require lots of discussion. Further study is clearly warranted.

![time series plot for apr_snprintf portability layer function](page4_img_2.png)

Figure 4: portability layer function apr_snprintf. Notice initial peak followed by low values over the duration.

## 5. THREATS TO VALIDITY

We have only studied a small portion of OSS projects and it is entirely possible that these results may not generalize to all projects.

We also assume that the developer email lists are the only possible medium of communication between developers, whereas individuals can contact each other through other mediums such as IRC, or direct emails; however, in most cases, community norms dictate that substantive discussions do occur on the mailing list.

## 6. CONCLUSION

We studied the relationship between the use of keyterms in hunks and the mentions of those same keyterms in email discussions. We found a striking, strong relationship between the two when the occurrence counts are cumulated over the life of the project, but a much weaker relationship when broken into 3 month intervals. This leads to a puzzling set of irregular relationships cumulatively leading to a much more regular relationship. We speculate on why: more popular and useful functions may undergo a careful review and discussion period where they are discussed heavily, after which, thanks to good design, they can be used without much further ado. If not carefully designed first, such functions might eventually become troublesome and require much discussion later on. Thus overall, work and talk become closely related.

## 7. REFERENCES

[1] C. Baldwin and K. Clark. Design Rules: Vol 1. MIT Press, 2000.

[2] C. Y. Baldwin and K. B. Clark. Managing in an age of modularity. Harvard Business Review, pages 84–93, September-October 1997.

[3] C. Bird, P. Devanbu, and A. Gourley. Detecting patch submission and acceptance in oss projects. In Workshop on Mining Software Repositories, 2007.

[4] C. Bird, A. Gourley, P. Devanbu, M. Gertz, and A. Swaminathan. Mining email social networks. Proceedings of the 2006 international workshop on Mining software repositories, pages 137–143, 2006.

[5] L. Lopez, J. M. Gonzalez-Barahona, and G. Robles. Applying social network analysis to the information in cvs repositories. In Proceedings of the International Workshop on Mining Software Repositories, 2004.

[6] A. Mockus, J. D. Herbsleb, and R. T. Fielding. Two case studies of open source software development: Apache and mozilla. ACM Transactions on Software Engineering and Methodology, 11(3):309–346, July 2002.

[7] D. Parnas. The criteria to be used in decomposing systems into modules. Communications of the ACM, 14(1):221–227, 1972.

[8] P. Rigby and A. Hassan. What Can OSS Mailing Lists Tell Us? A Preliminary Psychometric Text Analysis of the Apache Developer Mailing List. Proceedings of the Fourth International Workshop on Mining Software Repositories, 2007.

[9] G. Salton, A. Wong, and C. S. Yang. A vector space model for automatic indexing. Commun. ACM, 18(11):613–620, 1975.

[10] T. Zimmermann and P. Weiβgerber. Preprocessing CVS data for fine-grained analysis. In In Proceedings of the International Workshop on Mining Software Repositories, 2004.