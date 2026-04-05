## 4.2 Architectural and Organizational Congruence

In the previous section, we examined topological characteristics of the relationships between changes to components on branches and post-release failures. An equally important question is how the branching structure should align with the architecture of the system being developed and the organization of the teams developing the system. According to Conway’s Law [18], in an ideal setting the decomposition of the system into subsystems and subsystems into components would match the division of the developers into teams. In practice, due to cross-cutting concerns, architectural coupling, and external organizational factors such as geography [19], pre-existing organizational structures, and organizational churn [20], there is rarely perfect congruence between system architecture and organizational structure. Thus, a branching structure can match organizational structure at the cost of spanning subsystem and component boundaries, or it may closely align with the system architecture and cross-cut the organization.

The decision is not clear. Prior work suggests that components with changes spanning organizations increase failures [13]. However, cross-cutting concerns – functionality requiring changes that span system architecture – also lead to failures [21].

Therefore, in an effort to provide actionable results to software teams to assist them to decide on effective branching strategies, we examine the effect of aligning the branching structure to architectural or organizational structure on branch quality. This leads to two competing hypotheses:

### H4a. Branching according to architectural structure: Branches with higher architectural mismatch have more failures.

One strategy to follow when creating branches is to dedicate one branch per component. Doing so allows software components to be developed in isolation. However, in certain cases multiple components are modified in a single branch, causing branches to cross-cut the architecture (i.e., architectural mismatch). We expect branches that include work on multiple components to have more failures.

Architectural Mismatch – is the number of individual systems, subsystems, areas, components and subcomponents (forming a hierarchy) that are affected by the changes on a branch. We expect that a branch that contains only changes to one subsystem has fewer failures than a branch that changes many.

### H4b. Branching according to organizational structure: Branches with higher organizational mismatch have more failures.

In many cases multiple teams need to coordinate when developing a software component. Therefore, having the branching structure match the organizational structure may be ideal. We expect that branches that are contributed to from multiple organizations (i.e., organizational mismatch) have more failures.

To answer the aforementioned question, we measure the effect that architectural and organization mismatch has on branch quality. To measure architectural and organizational mismatch of the branch, we define the following metrics:

Organizational Mismatch – includes the number of managers, development leads, and engineers (counted and used in our models separately) that make changes to files on the branch. The number of engineers that work in a branch serve to represent the size of the group working in a branch. However, each team has one development lead and a number of leads report to one development manager. Thus, each lead and each manager is indicative of

additional teams working in a branch. We expect a branch with twenty engineers, six leads, and two managers to have more failures than a branch with twenty engineers, one lead, and one manager because the former spans organizational structure.

We quantify branch quality by mapping components (and their post-release failures) to the branches they were changed on. Using a technique similar to the approach used by Ostrand et al. to calculate the failure ratios of developers [22], we use the ratio of a component’s changes on a branch (analogous to changes made by a developer in Ostrand’s approach) to map post-release failures to that specific branch. For example, assume that a component A had 8 post-release failures and that A had a total of 20 development changes, 15 changes on branch B1 and 5 changes on branch B2. We map 6 (15/20 * 8 = 6) failures to branch B1 and 2 (5/20 * 8 = 2) failures to B2.

These metrics enable us to study the effect of mismatch on branch quality. As before, we build linear regression models and use the goodness-of-fit measure to compare which of architectural or organizational mismatch better explain branch failures. We also report direction and magnitude of the relationship to quality (derived from regression coefficients).

## 4.3 Analysis Techniques and Statistical Modeling

We use multiple linear regression models to study the effect of branching on software quality.

Linear regression models are generally used in empirical studies to model an outcome of a response variable (e.g. model the number of post-release failures) or to model the relationship between an observed phenomena (represented by the model independent variables) and an observed outcome (represented as the dependent variable). In this paper, we use linear regression models to achieve the latter, to study the relationship. Prediction is not the aim of this paper. In particular, we use linear regression to examine the relationship of one or more of the branching metrics with software quality, while controlling for code and process metrics.

The independent variables in our linear regression models are the branching activity, scatter and depth metrics; the dependent variable is the number of post-release failures. All of our measurements are performed at the software component level.

One of the assumptions of linear regression is that the residuals must be normally distributed. We observed that, similar to many other software metrics, our control variables and some branch metrics here were highly skewed, leading to non-normality of residuals. To alleviate this problem, we used a log transformation on these metrics with high skew and/or kurtosis values.

As our evaluation criteria, we examine the statistical significance, magnitude, and direction of the variable’s contribution in the model. In addition, similar to previous work (e.g. [23]) we use model fit (variance explained, also known as adjusted R^2) as evaluation as well. We begin by building a base model, which contains our control variables, and record the adjusted R^2. Then, we incrementally add one variable at a time and measure the improvement in adjusted R^2.

We employed Variance Inflation Factor (VIF) analysis to measure the level of multicollinearity between independent variables [24] and removed highly correlated variables from the linear regression models, i.e. any variables that had a VIF value above 10, as recommended by Kutner et al. [24]. To test for statistical