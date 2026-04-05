### 3.4 Influence Networks

If none is present (all xi = 0), the expected likelihood of an application not failing would still be 1/(1 + e^-0.9) = 0.71.

In logistic regression models, the coefficient βi corresponds to the change in the log of the odds for a one unit change in factor xi given that all other factors remain fixed. The odds ratio between absence and presence of a factor x1 can be computed by raising e to the power of the logistic coefficient, that is OR = e^{βi}. In order to focus on strong effects, we considered only coefficients with a corresponding odds ratio of greater or equal than 3/2, i.e., βi ≥ ln 1.5 = 0.40546, or an odds ratio less or equal than 2/3, βi ≤ ln(2/3) = −0.40546. In the hypothetical regression model above, we would only consider the antivirus program (β1 = 0.41) and the office application (β1 = −0.5) to have strong effects on reliability.

Since all factors in our logistic regression model are binary, the direction (positive or negative) and magnitude of the coefficients can be directly compared to each other.

We built logistic models for each application to model if the application failed in the first week after OS startup based on hardware features and other applications installed. We then used the coefficients to construct influence networks (similar to Heckerman et al. [8]). Each hardware feature and application is represented as a node. We create an edge between two nodes X and Y (where Y is an application) if the coefficient β for X in the reliability model for Y was:

- statistically significant at p < 0.05 after adjusting for multiple hypothesis testing [7], and
- strong, that is ≥ 0.40546 or ≤ −0.40546, corresponding to an odds ratio of 3/2 and 2/3 respectively.

Each edge is annotated with its corresponding coefficient β. The polarity of an edge is the sign of the coefficient; it can either be positive or negative.

In the resulting graph, the degree of nodes is an indicator of influence: nodes with many outgoing edges have strong influence on other applications, while nodes with many incoming edges are strongly influenced by others. We quantify influence of factors (nodes) within the graph as follows:

- Strength. The strength of a group of factors is the total number of outgoing edges from the group (actual influence) normalized by the total number of edges that are possible (maximum possible influence).
- Positivity. The positivity of a group of factors is the percentage of outgoing edges from the group that have positive coefficients, that is βi ≥ 0.40546.

Let us explain these measures with a few examples. The factor Processor speed influenced 11 out of 53 applications in our experiments, resulting in a strength of 11/53 = 20.8%. All coefficients were positive and correlated with an increase in the reliability of the applications, resulting in a positivity of 11/11 = 100%. The factor Internet-1 influenced 8 out of 52 applications, a strength of 19.6%. (Note that here we have only 52 applications because we did not include the factor Internet-1 in the model for Internet-1.) Out of the 9 coefficients 8 were positive, resulting in a positivity of 88.9%.

We also compute strength and positivity between groups of applications, for example to characterize the influence between Internet and other Internet applications or Internet and Security applications. The examples above are for influence relations, but strength and positivity can be computed in a similar way for relationships of type influenced by: instead of outgoing edges, one would consider ingoing edges.

### 3.5 The “Influence Factors” Analysis Pattern

> Name: Influence Factors
>
> Intent: Uncover the influence of a set of entities on an outcome for each of those entities.
>
> Input: A series of observations/instances, such that each instance includes factors for each of the entities and an outcome for each entity.
>
> Output: The influence relationships. Either in table form or visualized as a network of influences [8].
>
> Analysis Steps:
>
> 1. For each entity, e, build a logistic regression model which includes one independent variable for each of the other entities. For building the model for e, only use the input instances that include the outcome for e.
> 2. Select a threshold for the minimum level of influence that is of interest.
> 3. For each entity, e, the influences on e are determined by examining the model for e from step 1. The model coefficients that are both statistically significant and with a magnitude larger than the threshold indicate the entities that influence the outcome for e.
> 4. Record the influences of each entity on each other entity from step 3 into a table or into a graph in which an edge from entity e to entity f exists iff the model for e shows an influence from f.
>
> Discussion:
>
> The steps for this pattern and their use in this paper use logistic regression to identify influences. However, logistic regression is just a parameter in the analysis. Other machine learning methods such as decision trees could also be used as long as the method indicates the relationship between the factor for each entity and the outcome for the entity of interest.
>
> In addition, to ease analysis and assure consistency, the factor for each entity should be a binary factor. In the case of this paper, we use the presence of an application as a factor. We suggest that other factors be dichotomized, such as categorizing values based on a threshold (e.g., we used the median as a threshold for hardware features).
>
> Example Contexts:
>
> This pattern can be used in any context in which there are relationships between entities and an outcome at the entity-level. Such relationships include use of libraries, dependence of packages, and co-change of files. Outcomes of interest might comprise defects, build failures, or security vulnerabilities (similar to Neuhaus’s examination of RedHat Packages [9]). The entities can also represent developers, for example to examine the influence that communication with different developers has on an OSS participant becoming a core developer (similar to Bird’s study of open source participant immigration [10]).
>
> As a more concrete example, we could use this pattern to evaluate the effects of component source code changes on build breaks in other components. The following table shows a portion of the input data. Each instance indicates which of the three components were changed and also what component was built and what the outcome was. In this example, the analysis would indicate that when A is