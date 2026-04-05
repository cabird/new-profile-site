## Organizational Distribution

We define two organizational measures that draw on the results of Nagappan et al. [18].

First, we identified the number of organizations that contributed to a component as ORGANIZATIONS. Different organizations may have different agendas in mind when making contributions to an OSS project. Further, coordination between developers in separate organizations is most likely more difficult than coordination within an organization due to shared culture, background, and, in some cases, geographical colocation. We therefore expect that components that are contributed to by multiple organizations will exhibit higher defect rates.

Second, ORGANIZATIONAL OWNERSHIP measures the proportion of commits to a component contributed by the “owning” organization (the organization that made the most commits). If one organization has a high level of ownership, we expect that the organization has a vested interest in its success. Further, the organization may act as a point of contact for the component. We hypothesize that this will lead to fewer defects.

### D. Quality Analysis

In order to study the relationship of each of these measures with failures, we use them as independent variables in a linear regression model using pre and post-release bugs as dependent variables. In addition, we also include control variables in our models so as to control for the effects of code metrics known to have a strong relationship with failures [25]. We measure code size using lines of source code which we refer to as LOC. CHURN is the sum of the number of source lines added and deleted (a modified line is counted as one line removed and one line added) in a component between releases. Finally, COMPLEXITY measures the cyclomatic complexity of the code. LEVEL is included in our model as a series of binary variables, as it is standard for categorical data [26]. We include NATION, CONTINENT, and WORLDWIDE, only one of which can have value of 1 for any component. Components developed in one site have all of these variables set to 0, as same-site development is the baseline and included in the intercept.

Unfortunately, including all of the control variables, independent variables (our distribution measures), and dependent variables (pre and post-release defects) leads to potential problems. First, the validity of linear regression results rests on key assumptions holding. One of these assumptions is that the residuals in the models are normally distributed [26]. In all cases, we found that pre and post-release defects suffered from skew and the residuals were not normally distributed. In addition, some of our independent and control variables also were skewed and caused similar problems. To mitigate this, we performed a logarithm transformation on these variables before using them in the regression models. We indicate where this transformation was used in our discussion of results in the following sections.

Second, we note that some independent or control variables may be highly correlated. Models using these variables will potentially overfit on the data, leading to a problem known as multicollinearity [26]. We deal with this problem by examining the Variance Inflation Factor (VIF) for our linear models and removing variables with VIF values at 5 or above. As an example, in our models, we found that COMPLEXITY was highly correlated with LOC in all models (a not surprising result, given prior studies that also show a relation between LOC and many code metrics [27]). We therefore choose the best model that considers only one and use LOC.

We hasten to point out that although regression has been used with defect data to build accurate defect prediction models (see, for example, extensive work by Weyuker and Ostrand including [28]) our purpose is not to use regression for defect prediction. Rather we use it to identify the relationship, if any, between our measures of geographic and organizational distribution and defects when controlling for known factors.

## V. FIREFOX RESULTS

We answer the three previously stated questions regarding distributed development in FIREFOX in this section.

### A. Organizational Distribution

We are first interested in how distributed FIREFOX is along organizational boundaries. We used the organizational affiliations of developers to determine what proportion of FIREFOX development (measured by number of commits) come from different organizations. Note that the organization itself is not necessarily the contributor. For instance, University of Queensland and MIT indicate contributions made by students of those respective universities. The category labeled “self” represents people who identified themselves as self-employed contractors or “Full Time Hackers” that were not affiliated with any company. In addition, there were a number of individuals that we were able to identify geographic information for, but could not determine organizational information about. These make up the “Unknown” category and are not included in our organizational analysis.

Figure 2 shows the breakdown of contributions for release 2.0. We do not show breakdowns for release 1.5 because the difference was minimal. Our data shows that Mozilla Corp is the largest contributor to FIREFOX followed by Google. However, there are a number of contributions made by other companies with an interest in the browser market as well as academic institutions.

Therefore, our answer to RQ1 is that while Mozilla Corporation is by far the largest contributor to FIREFOX, a diverse group of companies and organizations account for more than half of the source code contributions.

### B. Geographic Distribution

We also examined how FIREFOX is geographically distributed. We were not able to determine building information for the developers in FIREFOX. Therefore we categorize the geographic distribution of components into four levels: same site, same nation, same continent, and worldwide.