als who were wealthy, which had a direct relationship with their political affiliation. Thus, the (incorrectly) predicted outcome of the election was based on data in which certain political parties were over-represented. Although telephone recipients were chosen at random for the sample, the fact that a respondent needed to own a telephone to participate introduced sampling bias into the data.

Sampling bias is a form of nonresponse bias because data is missing from the full population [45], making a truly random sample impossible. Likewise, bug-fix data sets, for example, might over-represent bug-fixes performed by more experienced or core developers, perhaps because they are more careful about reporting. Hypothesis-testing on this dataset might lead to the incorrect conclusion that more experienced developers make more mistakes; in addition, prediction models might tend to incorrectly signal greater likelihood of error in code written by experienced developers, and neglect defects elsewhere. We study these issues, and make the following contributions.

1. We characterize the bias problem in defect datasets from two different perspectives (as defined in Section 3), bug feature bias and commit feature bias. We also discuss the consequences of each type of bias.
2. We quantitatively evaluate several different datasets, finding strong statistical evidence of bug feature bias (Section 5).
3. We evaluate the performance of BugCache, an award-winning bug-prediction system, on decidedly biased data (which we obtain by feature-restricted sub-sampling of the original data set) to illustrate the potential adverse effect of bias. (Section 6)

## 2. RELATED WORK

We discuss related work on prediction models, hypothesis testing, work on data quality issues in software engineering, and considerations of bias in other areas of science.

### 2.1 Prediction Models in SE

Prediction Models are an active area of research. A recent survey by Catal & Diri [11] lists almost 100 citations. This topic is also the focus of the PROMISE conference, now in its 4th year [41]. PROMISE promotes publicly available data sets, including OSS data [42]. Some sample PROMISE studies include community member behavior [24], and the effect of module size on defect prediction [28].

Eaddy et al. [16] show that naive methods of automatic linking can be problematic (e.g. bug numbers can be indicative of feature enhancements) and discuss in depth their methodology of linking bugs.

To our knowledge, work on prediction models has not formalized the notion of bias, in terms of bug feature bias and commit feature bias, and attempted to quantify it. However, some studies do recognize the existence of data quality problems, which we discuss further below.

### 2.2 Hypothesis Testing in SE

There is a very large body of work on empirical hypothesis testing in software, for example Basili's work [5, 6, 7] with his colleagues on the Goal Question Metric (GQM) approach to software modeling and measurement. GQM emphasizes a purposeful approach to software process improvement, based on goals, hypotheses, and measurement. This empirical approach has been widely used (see, for instance [22] and [38]). Shull et al. [44] illustrate how important empirical studies have become to software engineering research and provide a wealth of quantitative studies and methods. Perry et al. [40] echo the sentiment and outline concrete steps that can be taken to overcome the biggest challenge facing empirical researchers: defining and executing studies that change how software development is done. Space considerations inhibit a further, more comprehensive survey.

In general terms, hypothesis testing, at its root, consists of gathering data relative to a proposed hypothesis and using statistical methods to confirm or refute the hypothesis with a given degree of confidence. The ability to correctly confirm the hypothesis (that is, confirm when it is in fact true, and vice versa) depends largely on the quality of the data used; clearly bias is a consideration. Again, in this case, while studies often recognize the threats posed by bias, to our knowledge, our project is the first to systematically define the notions of commit feature and bug feature bias, and evaluate the effects of bug feature bias.

### 2.3 Data Quality in SE

Empirical software engineering researchers have paid attention to data quality issues. Again, space considerations inhibit a full survey; we present a few representative papers. Koru and Tian [29] describe a survey of OSS project defect handling practices. They surveyed members of 52 different medium to large size OSS projects. They found that defect-handling processes varied among projects. Some projects are disciplined and require recording all bugs found; others are more lax. Some projects explicitly mark whether a bug is pre-release or post-release. Some record defects only in source code; others also record defects in documents. This variation in bug datasets requires a cautious approach to their use in empirical work. Liebchen et al. [32] examined noise, a distinct, equally important issue.

Liebchen and Shepperd [31] surveyed hundreds of empirical software engineering papers to assess how studies manage data quality issues. They found only 23 that explicitly referenced data quality. Four of the 23 suggested that data quality might impact analysis, but made no suggestion of how to deal with it. They conclude that there is very little work to assess the quality of data sets and point to the extreme challenge of knowing the “true” values and populations. They suggest that simulation-based approaches might help.

Mockus [35] provides a useful survey of models and methods to handle missing data; our approach to defining bias is based on conditional probability distributions, and is similar to the techniques he discusses, as well as to [48, 33].

In [4] we surveyed five open source and one closed source project in order to provide a deeper insight into the quality and characteristics of these often-used process data. Specifically, we defined quality and characteristics measures, computed them, and discussed the issues that arose from these observations. We showed that there are vast differences between the projects, particularly with respect to the quality in the link rate between bugs and commits.

### 2.4 Bias in Other Fields

Bias in data has been considered in other disciplines. Various forms of bias show up in sociological and psychological studies of popular and scientific culture.