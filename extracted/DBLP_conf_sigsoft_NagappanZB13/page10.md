Our technique also extends to researchers analyzing closed source projects. They can now describe the universe and space of their projects without revealing confidential information about the projects or their metrics and place their results in context. Companies can use our technique to place academic research into the context of their own development by computing the coverage against a company-specific universe and space.

## 7. ACKNOWLEDGMENTS

We would like to thank our colleagues at the SAIL lab at Queen’s University and at the ESE group at Microsoft Research as well as the anonymous reviewers of ESEC/FSE and the artifact evaluation committee for valuable feedback on this idea and paper. We would also like to thank all the researchers whose work we looked at! Lastly, we would like to thank Black Duck Software and Ohloh (www.ohloh.net) for collecting and making the data available.

## 8. APPENDIX

### 8.1 How to Compute the Coverage Score

This example below uses the Ohloh universe to score the Mozilla Firefox project along the space (Lines of Code, Developers). The text id ~ total_code_lines+twelve_month_contributor_count is R syntax and commonly used to define models.

```r
url <- "http://sailhome.cs.queensu.ca/replication/representativeness/masterdata.txt"
ohloh <- read.delim(url, header=T, na.strings=c("", "NA"))
sample <- ohloh[ohloh$name=="Mozilla Firefox",]
score <- score.projects(sample, universe=ohloh, id ~ total_code_lines+twelve_month_contributor_count)
```

The resulting total score is in score$score and the dimension scores are in score$dimension.score.

### 8.2 How to Select the Next Projects

This example adds 10 more projects to the sample from the previous example. The result is a data frame np$new.projects with the projects to be added to the sample and the score object of the combined sample np$score.

```r
np <- next.projects(10, sample, universe=ohloh, id ~ total_code_lines+twelve_month_contributor_count)
```

### 8.3 How to Change the Configuration

Provide a list with the similarity functions. Values NA indicates that the default similarity function should be used for a dimension. In the example below the function custom.similarity will be used the first dimension.

```r
score <- score.projects(sample, universe=ohloh, ..., configuration=c(custom.similarity, NA))
```

## 9. REFERENCES

[1] Basili, V.R., Shull, F., and Lanubile, F. Building knowledge through families of experiments. Software Engineering, IEEE Transactions on, 25 (1999), 456--473.

[2] Robbes, R., Tanter, E., and Rothlisberger, D. How developers use the dynamic features of programming languages: the case of smalltalk. Proceedings of the International Working Conference on Mining Software Repositories (2011).

[3] Gabel, M. and Su, Z. A study of the uniqueness of source code. In FSE'10: Proceedings of the International Symposium on Foundations of Software Engineering (2010), 147-156.

[4] NIH. NIH Guideline on The Inclusion of Women and Minorities., 2001. http://grants.nih.gov/grants/funding/women_min/guidelines_amended_10_2001.htm.

[5] Allmark, P. Should research samples reflect the diversity of the population? Journal Medical Ethics, 30 (2004), 185-189.

[6] DEPARTMENT OF HEALTH. Research governance framework for health and social care., 2001.

[7] Mulrow, C.D., Thacker, S.B., and Pugh, J.A. A proposal for more informative abstracts of review articles. Annals of internal medicine, 108 (1988), 613--615.

[8] The R Project for Statistical Computing. http://www.r-project.org/.

[9] Kitchenham, B.A., Mendes, E., and Travassos, G.H. Cross versus Within-Company Cost Estimation Studies: A Systematic Review. IEEE Trans. Software Eng. (TSE), 33, 5 (2007), 316-329.

[10] Hill, P.R. Practical Software Project Estimation. McGraw-Hill Osborne Media, 2010.

[11] BLACK DUCK SOFTWARE. Ohloh, http://www.ohloh.net/.

[12] Sands, R. Measuring Project Activity. http://meta.ohloh.net/2012/04/measuring-project-activity/. 2012.

[13] Apel, S., Liebig, J., Brandl, B., Lengauer, C., and Kästner, C. Semistructured merge: rethinking merge in revision control systems. In ESEC/FSE'11: European Software Engineering Conference and Symposium on Foundations of Software Engineering (2011), 190-200.

[14] Beck, F. and Diehl, S. On the congruence of modularity and code coupling. In ESEC/FSE'11: European Software Engineering Conference and Symposium on Foundations of Software Engineering (2011), 354-364.

[15] Uddin, G., Dagenais, B., and Robillard, M.P. Temporal analysis of API usage concepts. In ICSE'12: Proceedings of 34th International Conference on Software Engineering (2012), 804-814.

[16] Jin, W. and Orso, A. BugRedux: Reproducing field failures for in-house debugging. In ICSE'12: Proceedings of 34th International Conference on Software Engineering (2012), 474-484.

[17] Zhou, J., Zhang, H., and Lo, D. Where should the bugs be fixed? More accurate information retrieval-based bug localization based on bug reports. In International Conference on Software Engineering (2012).

[18] Kitchenham, B.A. and Mendes, E. A comparison of cross-company and within-company effort estimation models for web applications. In Proceedings of the 8th International Conference on Empirical Assessment in Software Engineering (2004), 47-55.

[19] Hall, T., Beecham, S., Bowes, D., Gray, D., and Counsell, S. A systematic review of fault prediction performance in software engineering. IEEE Transactions on Software Engineering, 99 (2011).

[20] Murphy-Hill, E., Murphy, G.C., and Griswold, W.G. Understanding Context: Creating a Lasting Impact in