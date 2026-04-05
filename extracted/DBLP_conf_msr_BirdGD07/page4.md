### 4.1 Evaluation

In order to evaluate our patch mining process we need to measure both the recall and precision of our results [4]. Measuring precision requires testing for false positives, which turns out to be quite easy. We can examine a patch and the file that the patch was applied to according to our tool and a quick inspection can usually determine if the two do in fact match. A random sampling of 100 patch applications indicated by our tool yielded 97% accuracy. All of the errors were within natural language text (comments or documentation); we are looking into addressing this problem.

Recall, which measures the false negative rate, is harder to determine in the absence of a benchmark or a codebase where the true patch acceptance information is known. In lieu of either of the above we use the results of analysis of the Apache project by Alonso et al. [1]. In CVS log messages in Apache, developers (who commit the change) acknowledge submitters (who provide the change). We consider only the submissions that came from non-developers; in Apache, these change submissions can be expected to appear on the mailing list3. This is not a perfect benchmark, since change (or patch) submissions may be received by private email or may be informal change submissions rather than actual patches; or they may be heavily modified before application. However, we can place a lower bound on the recall of our approach by determining which of the commits containing submissions made by non-developers in the CVS logs were also flagged as files that had successful patch applications by our tool. When evaluating recall in this way, we show a minimum 46% recall rate. Indeed, we conceptually categorize patch submissions into three categories: rejected, accepted, and accepted with modification, the latter of which, in general, is difficult (if not impossible) to recognize. For the accepted category, we believe that our implementation will give very good results; for the modified category, we find those that only have whitespace changes and consistent identifier renamings. It's possible that some patches were accepted but the proportion of accepted hunks was below our threshold of 3/4. We plan to study the effect of threshold on recall.

Finally, even as we attempt to improve the recall performance (by trying to deal with patches accepted after modification) we argue that patches that are accepted without modification are per se a phenomenon worthy of study, since they indicate a high level of expertise by the patch submitter.

## 5 Uses of Patch Data

The data produced from data mining patches can shed light on how and why OSS projects work. In a companion paper in MSR 20074, we mounted a quantitative statistical analysis of how and when OSS mailing list participants became full‑fledged developers for three of the projects studied in this paper [2]. Data such as the number of patches submitted and the percentage of patches accepted was included. We found that this data represented highly significant predictors in the Apache and Python projects and improved the model for the PostgreSQL project.

3 Developers may communicate changes privately

We plan to use this data to help in our investigation of questions such as: Are certain areas of the codebase more prone to patch submission/acceptance than others? This could indicate code with more bugs or code that is more easily understood for newcomers. Are there particular developers who accept most of the patches submitted by non‑developers? This may help us understand the roles played by different developers within a project. What is the distribution of patch submissions/acceptances across time and relative to releases? This could aid in examining the development cycle within an OSS project.

## 6 Conclusion

We have presented a method of collecting data related to OSS communities that to our knowledge has largely been overlooked until now. This data has implications in its ability to augment analysis of both the software artifact itself and the social community that exists surrounding an OSS project. Although this form of data is just one tile in the mosaic of information that has been gathered with respect to the open source movement, we believe that it is an important one. We have discussed some of the technical hurdles that have been overcome in the collection of patch related data, given a somewhat preliminary evaluation of our methods, and shared possible uses of this data. In the future, we plan to refine our tools in conjunction with seeking better ways to evaluate them.

### References

[1] O. Alonso, P. Devanbu, and M. Gertz. Extraction of contributor information from software repositories. Unpublished http://www.csif.cs.ucdavis.edu/~bird/papers/alonsomsr2006.pdf.

[2] C. Bird, A. Gourley, P. Devanbu, A. Swaminathan, and G. Hsu. Open Borders? Immigration in Open Source Projects. In Proceedings of the 4th International Workshop on Mining Software Repositories, 2007.

[3] N. Ducheneaut. Socialization in an Open Source Software Community: A Socio‑Technical Analysis. Computer Supported Cooperative Work (CSCW), 14(4):323–368, 2005.

[4] F. W. Lancaster. Information Retrieval Systems: Characteristics, Testing, and Evaluation. Wiley, 2nd edition, 1979.

[5] G. von Krogh, S. Spaeth, and K. Lakhani. Community, joining, and specialization in open source software innovation: a case study. Research Policy, 32(7):1217–1241, 2003.

4 Please see http://www.csif.cs.ucdavis.edu/~bird/papers/bird2007obi.pdf