tools, and Collaboration tools was highly correlated and we combined the factors into the composite factor Engineering system. When combining the factors, we averaged the scores. For example, if the satisfaction with the three base factors was 4, 5, and 4, the score for the composite factor Engineering system was (4 + 5 + 4) / 3 = 4.33.

To further check for collinearity among the explanatory variables in the regression models, we checked for Variable Inflation Factors (VIF). A common practice is to remove any variables in the final model that have a VIF score higher than 5 as suggested by Fox [35]. None of the factors in our models had a VIF score higher than 5; most scores were lower than 2.5.

To facilitate ranking and comparison of coefficients for the different models [36], we centered and scaled the input data for the regression models. Specifically, we transformed each factor X with (X − mean(X)) / sd(X). Subtracting the mean centered all factors around 0. Dividing by the standard deviation (sd) scaled all factors to the same unit.

In this paper, if not stated otherwise, the findings from the regression analysis are statistically significant with a p-value of 0.05 or less. We completed all analysis in the R statistical software and in PowerBI.

In RQ3.2, part of our exploration of work context involved dividing developers into groups based on their “type of work”. To obtain these groupings, we used the Partitioning Around Medoids (PAM) clustering algorithm [37] on the self-reported time spent on different activities from the survey. Most clustering algorithms require the user to specify the number of clusters. One of the benefits of the PAM algorithm is that for each possible k (number of clusters), the algorithm computes a clustering and then returns the clustering with the optimum average silhouette width [38]. We then used the same regression analysis as above on these clusters of developers.

### 3.4 Survey Demographics

As mentioned earlier, we received 640 responses to our survey, of which 465 indicated they were developers and we focus solely on these responses for the remainder of this paper. Here we report a summary of general demographics of the responses. Not all of the survey questions were required, so not all of the categories we report sum to 465. In terms of gender, 381 (86%) identified as male and 61 (14%) as female. 97 (21%) respondents indicated they are in a management position, while 363 (79%) have no people reporting to them. The experience of the respondents (measured via multiple choice questions) ranged from one year (101, 22%) to more than 20 years (11, 2%) with a median of between two and five years (107, 23%). Responses came from North America (322, 71%), Europe (52, 11%), and Asia (82, 18%), with North America representing the majority. In terms of working environment, 161 (35%) work in their own office, while 303 (65%) share their office or open workspace with others (247 of those share their workspace with at least five other people, 53%). From a collaborative perspective, 413 developers (89%) responded that they coordinate their work with at least three people, and 184 (40%) indicated they coordinate with six or more people, evidence that development at the company is a highly collaborative activity.

## 4 WHICH SOCIAL AND TECHNICAL FACTORS MATTER TO DEVELOPERS? (RQ1)

### RQ1.1: Which social and technical factors impact job satisfaction and perceived productivity?

From the three month site visit (which consisted of informal interviews with internal organizations and analysis of previous organization specific internal surveys), literature review, and analysis of the open-ended questions from the first deployment of our survey in March 2017, we arrived at the 44 factors shown in the left-hand column of Table 1.6

The work complexity factors (shown near the bottom of the table) deserve special mention. These were added to our final survey when the type of work factor emerged as an important factor in the Spring 2017 survey. Shaw et al. propose [30] that certain job complexity factors impact job performance and well-being. In our survey, we did not ask about importance nor satisfaction for these factors, but rather we asked the respondents for their agreement (along a 5-point Likert-type scale) with statements for these factors (e.g., “I can complete my tasks” and “My job takes a long time to learn”).

We reviewed the open-ended questions for potential additional factors. No additional factors emerged from our final survey deployment with the exception of privacy and contributing to social good; we have not included these in our analysis as they were mentioned only one time each.

### RQ1.2: What is the perceived importance of these factors?

For each factor, respondents were asked to rate its importance using Likert-type choices of “not important”, “slightly important”, “moderately important”, “important”, and “very important”.

The 2nd column of Table 1 shows the relative perceived importance of the factors as rated by the developer survey respondents. Close to half of the respondents felt the factors were all somewhat important (as we included factors that showed importance in the literature or previous surveys). The percentage next to the distribution indicates the percentage of responses that rated the factor as being “important” (4) or “very important” (5). The rank represents the order of factors by percentage. Having a good manager (rank #1), feeling productive (rank #2), being fairly rewarded and having a positive team culture are ranked as important or very important by over 94% of the respondents. While using one’s skills effectively and having impact at work are ranked as moderately important or important by over 93%.

Training (for tools, soft skills, and technologies) has lower perceived importance than other factors (but still important to over 43% of the respondents). A surprising result was that having a private office is important or very important to only 44% of the respondents. This factor featured prominently in many of the internal surveys we reviewed during the site visit and we expected to see this emerge as important.

### RQ1.3: How satisfied are developers with these factors?

We asked developers how satisfied they are with each of the factors we identified. The third column of Table 1 shows the levels of developer satisfaction with the different factors,

6. The origin of the factors (in terms of literature, on-site visit, or coded from the first survey) is shown in the supplemental material [31].