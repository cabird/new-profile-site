The key contributions of this work were:

- We found that using technical and contribution relationships together have more power than either in isolation for predicting bugs.
- We showed that such techniques are general by using them on projects that differ in size, domain, and process (commercial vs. open source).
- We demonstrated how such techniques can be used in practice to accurately predict failure-prone modules in one release using data from a prior release.

In all of these models, the inclusion of developer behavior significantly improved the results over models that did not. Clearly, the human side of software engineering has a profound effect on quality.

## Does Organizational Structure Affect Bugs?

One of the unique advantages of working within an organization like Microsoft is that we have access to types of data that may not be available in academia. One such form of data is the organizational structure of the teams that develop the software.

Brooks stated that product quality is strongly affected by organization structure [1]. In order to empirically evaluate this claim, Nachi and a visiting researcher, Vic Basili, developed a suite of metrics to quantify organizational complexity [7] and investigated the relationship of these measures with software quality that we summarize below. The term “owning organization” is used to denote the organization that owns the binary.

- Number of engineers that worked on a binary
- Number of engineers who worked on a binary and left the organization prior to release
- Total number of contributions to a binary
- Number of levels up the organization required to reach the person who oversees the engineers making at least 75% of the contributions to a binary
- Proportion of engineers in the owning organization who contributed to a binary
- Proportion of edits to a binary that were made by the owning organization
- Ratio of proportion of engineers reporting to the owning manager relative to the total number of engineers editing a binary
- Number of different organizations that contribute at least 10% of the edits to a binary

Each of these measures is based on a hypothesis related to software quality. For instance, a large loss of team members (2nd measure) affects knowledge retention and thus quality. The more cohesive the contributors are (organizationally, 5th measure) the higher the quality.

We gathered these metrics for Windows Vista and correlated each with post-release faults in the first six months. We also evaluated the accuracy of a predictive model based on these metrics. Our results indicate that all eight measures are important because a step-wise regression retained every measure. We also created a predictor based on principal component analysis (due to high correlation between some measures) and compared it to prior approaches that included attributes such as code churn, code complexity, dependencies, code coverage during testing, and pre-release bugs. Surprisingly, the model based purely on organizational metrics performed better, in terms of precision and recall, than all of these models to a statistically significant degree.

We were able to build a better predictor using attributes of the organization that developed the software instead of using attributes of the software itself. This finding highlights the importance of coordination and collaboration in software development, as it implies that perhaps high levels of coordination are able to maintain code quality in the face of factors known to result in faults such as higher levels of complexity or code churn.

Vista is a large project, in terms of code and developers. In an attempt to determine how large a project needs to be before these organizational measures begin to have an effect, we replicated our study on a smaller data set and found that a team size of 30 engineers and three levels of organizational depth should be sufficient for a model to predict failure-proneness.

## Investigating the Effects of Geographic Distribution

An additional form of information that we have related to software development is the geographic location of all developers. This enabled us to address an issue that many have wondered about and that may have consequences for Microsoft’s development process, “Does distributed development affect software quality?”

In 2009, Chris and Nachi investigated this question by examining the locations of the developers that worked on each binary that shipped with Windows Vista [8]. We grouped binaries into 6 categories depending on how spread out the developers were that contributed to them. Some binaries were developed mostly by developers in the same building while others had a team that spanned multiple countries.

When we compared the defect rates for the different groups, we found that no group had more than 16% more defects than binaries developed by engineers in the same building. While this is not a trivial increase, we had expected the effect of geographic distribution to be much larger due to the barriers imposed such as lack of familiarity, time zone issues, and less-rich communication. Following a similar type of analysis to that of Herbsleb and Mockus [9], we examined the effects of distribution when controlling for team size. There was very little difference in failures, 6% at most, between distributed and collocated binaries.

We also examined attributes of the binaries in each group in order to determine if, for instance, managers only distributed binaries that were smaller, less critical to the system, or made up for distribution by testing more. In all, we exam-