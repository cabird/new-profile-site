### Threats to Validity

Our formulation of distribution levels is based on prior analysis of the same data; however, our quantization of distribution might fail to capture more subtle effects, such as those relating to personal relationships. In addition we interpret software quality directly as relating to defects; other aspects of quality (such as maintainability, readability, etc.) are not modeled.

## 6. RELATED WORK

There have been several prior reports of surveys of developers in several settings. Surveys have been done to explore developer attitudes, such as work habits [30], or motivation [19]. Others have explored what developers do [49, 28]. Most related to our work are studies of the epistemic attitudes of developers, viz., what they know, believe, or would like to know about. Begel & Zimmermann [5] used a survey methodology to find questions that are of most interest to developers. More recently, Lo et al. [31] surveyed developers as to their views on the relevance of various research results from software engineering. That survey asked for developer views on the relevance of the research, not on the correctness thereof. To our knowledge, we are the first to survey developers explicitly as to their agreement with claims from empirical software engineering, and then attempt to relate some of the survey results with statistical analysis of data drawn directly from the project in which the respondents work.

There has been a considerable body of work on the factors that drive methodology adoption. Hardgrave et al. [16] find that developers’ opinions play a strong role in choice of software development methodology than other factors, including social and organizational pressure. Sultan & Chan [51] study the influence of individual attributes on the adoption of OO technologies. Others have studied how beliefs affect the adoption of C by COBOL programmers [1]. Roberts et al. study the attributes of software development methods that influence adoption [47].

There has been considerable interest in the field of medicine on the interaction of belief and evidence, which we discussed in the background section at the beginning of this paper.

The results of our study are very much in support of Kitchenham et al.’s project [27, 13] to promote systematic, prompt, and wide dissemination of empirical study results.

## 7. CONCLUSIONS

Our goal in this paper was to explore the relationship between quantitative evidence and practitioner belief in software engineering settings. We conducted a survey of developer beliefs with respect to several claims of practical importance. We found that some claims attracted more agreement, and dissension than others. Surprisingly, the level of agreement didn’t always correspond very well with the strength of evidence in regards to the claim.

Indeed, we found that programmers give “personal experience” as the strongest influence in forming their opinions. Interestingly, “Research papers” were ranked the second lowest, just above “Other”. We also selected a specific question regarding the quality effects of geographic distribution, where respondents from one team tended to believe that geographic distribution was bad for software quality, and from a different team tended to believe it had no bad effect. Based on a quantitative analysis of the project repositories of both, we found that geographic distribution had a barely measurable effect on quality; it was statistically significant, but only because of very large sample sizes (in the hundreds of thousands). Furthermore, the effect was not always in the expected direction; sometimes the effect was good, and sometimes bad. Thus, we found that one team’s beliefs were consistent with the evidence, and another team’s wasn’t. This finding illustrates the risks that programmers might face by relying too much on their personal experience; subjective, personal recollection is notoriously error-prone.

We draw two recommendations from our findings:

### Dissemination

Our findings reinforce those of Kitchenham et al. in regards to evidence-based software engineering. Given the volume of findings and publications in empirical software engineering, greater efforts should be made to set up systematic ways to collect, organize, disseminate our research to practitioners, so that they (as do Medical Doctors) come to rely on verified evidence, rather than personal observation, which can be biased, error-prone and spotty. Initiatives like the Cochrane Collaboration offer a practical model.

### Research Directions

However, prior experience in Medicine, notably the work of Ioannidis, Chaloner and colleagues, suggests that practitioner belief should be given due attention. Especially in areas where research results are few and preliminary, or where large sample-sizes are hard-won, we would be well-advised to take practitioner belief into account both in developing hypotheses for study, as well as designing experimental methods. In our study, for example, developers strongly endorse Coding Standards, and the use of Static analysis tools; there is limited empirical understanding of the effects of these practices, and further study could well be warranted.

## 8. ACKNOWLEDGMENTS

We thank all survey participants for responding to our survey.

## 9. REFERENCES

[1] R. Agarwal and J. Prasad. A field study of the adoption of software process innovations by information systems professionals. Engineering Management, IEEE Transactions on, 47(3):295–308, 2000.

[2] M. Allamanis, E. T. Barr, C. Bird, and C. Sutton. Learning natural coding conventions. In Proceedings of the 22nd ACM SIGSOFT International Symposium on Foundations of Software Engineering, pages 281–293. ACM, 2014.

[3] M. F. Aniche, G. Oliva, M. Gerosa, et al. What do the asserts in a unit test tell us about code quality? a study on open source and industrial projects. In Software Maintenance and Reengineering (CSMR), 2013 17th European Conference on, pages 111–120. IEEE, 2013.

[4] B. Baudry, Y. L. Traon, and J.-M. Jézéquel. Robustness and diagnosability of oo systems designed by contracts. In