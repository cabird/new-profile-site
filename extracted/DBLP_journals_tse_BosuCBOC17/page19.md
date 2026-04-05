### 8.4 Conclusion Validity

The number of responses to each survey was sufficiently large to mitigate any threats arising from small sample sizes. In addition, the Chi-square test (used most frequently in this analysis) does not assume normality in the data. For variables that were not normally distributed (according to the Shapiro-Wilk test), we used non-parametric tests.

## 9 CONCLUSION

This paper describes the results of two surveys to better understand the practice and motivation for performing code reviews. These results have several implications for researchers and for practitioners. First, although only one-fourth of the code review comments are about functional defects, practitioners should not be discouraged to practice code reviews. Code review offers several other benefits (i.e., knowledge dissemination, relationship building, better designs, and ensuring maintainable code) that are crucial for large scale or long term projects. Interestingly, most code review research focuses on defect detection. These other aspects of code review that are considered more important by the developers have not received much attention. Therefore, these other aspects of code reviews (i.e., relationship building, knowledge sharing, achieving better designs) warrant additional focused research.

Second, the results of these surveys indicate that code reviews have a large impact on relationship building and future collaborations. Carelessness in wording a review comment can lead to negative feelings from the code author and hinder future collaborations. For example, an author is more likely to make the required changes if the reviewer provides constructive criticism and is more likely to argue with the reviewer if the reviewer comments are viewed as an attack. Therefore, reviewers should carefully consider how their review comments will be heard by the code author. This finding warrants further research in two directions: 1) empirical validation of how the expression of sentiment (i.e., positive or negative) in code review comments influences the code review outcomes and long term collaborations, and 2) how to assist reviewers in articulating appropriate comments during code reviews.

Finally, effective code reviews require a significant amount of effort from the reviewers to thoroughly understand the code. The results of this study suggest that reviewers prefer to review code changes that are simple, self-documenting and easy to comprehend. Authors should keep those code characteristics in mind when submitting code changes for review. This result could also be of interest to program comprehension researchers. The large amount of time devoted to understanding code changes could be improved with appropriate program comprehension techniques.

### ACKNOWLEDGMENTS

This research is partially supported by the US National Science Foundation Grant No. 1322276, 1156563. Any opinions expressed in this material are those of the authors and do not necessarily reflect the views of the National Science Foundation. We would also like to thank Brook Bowers and Luis Aguiar for assistance in data analysis.

## REFERENCES

[1] J. Asundi and R. Jayant, “Patch review processes in open source software development communities: A comparative case study,” in Proc. 40th Annu. Hawaii Int. Conf. Syst. Sci., 2007, pp. 166c–166c.

[2] A. Bacchelli and C. Bird, “Expectations, outcomes, and challenges of modern code review,” in Proc. 2013 Int. Conf. Softw. Eng., 2013, pp. 712–721.

[3] V. Balachandran, “Reducing human effort and improving quality in peer code reviews using automatic static analysis and reviewer recommendation,” in Proc. 2013 Int. Conf. Softw. Eng., 2013, pp. 931–940.

[4] V. R. Basili, F. Shull, and F. Lanubile, “Building knowledge through families of experiments,” IEEE Trans. Softw. Eng., vol. 25, no. 4, pp. 456–473, Jul./Aug. 1999.

[5] O. Baysal, O. Kononenko, R. Holmes, and M. W. Godfrey, “The influence of non-technical factors on code review,” in Proc. 20th Work. Conf. Reverse Eng., 2013, pp. 122–131.

[6] M. Beller, A. Bacchelli, A. Zaidman, and E. Juergens, “Modern code reviews in open-source projects: Which problems do they fix?” in Proc. 11th Work. Conf. Min. Softw. Repositories, 2014, pp. 202–211.

[7] W. I. B. Beveridge, et al., “The art of scientific investigation,” Art Sci. Investigation, 1950.

[8] C. Bird, T. Carnahan, and M. Greiler, “Lessons learned from building and deploying a code review analytics platform,” in Proc. 12th Int. Conf. Min. Softw. Repositories, 2015, pp. 191–201.

[9] C. Bird and T. Zimmermann, “Assessing the value of branches with what-if analysis,” in Proc. ACM SIGSOFT 20th Int. Symp. Found. Softw. Eng., 2012, Art. no. 45.

[10] A. Bosu, J. Carver, R. Guadagno, B. Bassett, D. McCallum, and L. Hochstein, “Peer impressions in open source organizations: A survey,” J. Syst. Softw., vol. 94, pp. 4–15, 2014.

[11] A. Bosu and J. C. Carver, “Impact of peer code review on peer impression formation: A survey,” in Proc. 2013 ACM / IEEE Int. Symp. Empir. Softw. Eng. Meas., 2013, pp. 133–142.

[12] A. Bosu and J. C. Carver, “How do social interaction networks influence peer impressions formation? A case study,” in Open Source Software: Mobile Open Source Technologies, L. Corral, A. Sillitti, G. Succi, J. Vlasenko, and A. Wasserman, Eds. Berlin, Germany: Springer, 2014, pp. 31–40, 427.

[13] A. Bosu and J. C. Carver, “Impact of developer reputation on code review outcomes in OSS projects: An empirical investigation,” in Proc. 8th ACM/IEEE Int. Symp. Empir. Soft. Eng. Meas., 2014, pp. 33:1–33:10.

[14] A. Bosu, M. Greiler, and C. Bird, “Characteristics of useful code reviews: An empirical study,” in Proc. 12th Work. Conf. Min. Soft. Repositories, 2015, pp. 146–156.

[15] L. C. Briand, B. Freimut, and F. Vollei, “Using multiple adaptive regression splines to support decision making in code inspections,” J. Syst. Softw., vol. 73, no. 2, pp. 205–217, 2004.

[16] W. M. Bukowski, B. Hoza, and M. Boivin, “Measuring friendship quality during pre- and early adolescence: The development and psychometric properties of the friendship qualities scale,” J. Soc. Pers. Relationships, vol. 11, no. 3, pp. 471–484, 1994.

[17] J. Cohen, Statistical Power Analysis for the Behavioral Sciences. NJ, USA: Lawrence Erlbaum, 1988.

[18] J. Cohen, E. Brown, B. DuRette, and S. Teleki, Best Kept Secrets of Peer Code Review. Beverly, MA, USA: SmartBear Software, 2006.

[19] J. Czerwonka, M. Greiler, and J. Tilford, “Code reviews do not find bugs. How the current code review best practice slows us down,” in Proc. Int. Conf. Softw. Eng.-Companion, May, 2015, pp. 27–28.

[20] R. F. DeVellis, Scale Development: Theory and Applications, vol. 26. Thousand Oaks, CA, USA: Sage Publications, 2011.

[21] M. Fagan, “A history of software inspections,” Softw. Pioneers, pp. 562–573, 2002.

[22] M. E. Fagan, “Design and code inspections to reduce errors in program development,” IBM Syst. J., vol. 15, no. 3, pp. 182–211, 1976.

[23] A. Fink, The Survey Handbook, vol. 1. Thousand Oaks, CA, USA: Sage Publications, 2003.