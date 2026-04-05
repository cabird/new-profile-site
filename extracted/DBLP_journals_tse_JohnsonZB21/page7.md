There has been a debate on whether linear regression can be used to analyze Likert response items; we discuss the debate in more detail in Section 8. Norman stated that the use of linear regression is acceptable with Likert data ("parametric statistics can be used with Likert data, with small sample sizes, with unequal variances, and with non-normal distributions") [89]. Carifio and Perla [20] suggest using a higher standard for appropriate p-values when Likert scores are used in linear regression models. To enable the reader to understand which items would be excluded through a more stringent statistical significance requirement, we report the p-values for the regression coefficients.

To address concerns of collinearity, we checked for high correlations among explanatory variables. We chose 0.7 as the threshold for high correlations because it has been used in other studies based on linear regression [80]. For each pair of two highly correlated variables, we included only one variable. As a result, the factors "Ability to personalize workspace" and "Noise control" were removed from the satisfaction and productivity models because of high correlations with the factor "Ability to work privately, with little to no interruptions." In addition, we checked for Variable Inflation Factors (VIF). A common practice is to remove any variables in the final model that have a VIF score higher than 5 as suggested by Fox [46]. None of the factors in our models had a VIF score higher than 5; most scores were lower than 2.5.

For the discussion of the results, we chose simple effect sizes over standardized effect sizes because the range and unit of variables is the same within all models (Likert agreement from 1 to 5 for Tables 3 and 4 and binary variables for Table 5). Although standardized effect sizes can be valuable, they are not always to be preferred over a simple effect size on the original measurement scale [51], [103]. Baguley [5] lists two main advantages of simple effect sizes: (1) robustness: "the scale is independent of the variance [...] avoids all problems that arise solely from standardization" and (2) interpretability: "simple effect size is scaled in terms of the original units of analysis, it will nearly always be more meaningful than standardized effect size [...] many consumers of research will be familiar with the interpretation of common units of measurement." Simple effect sizes are commonly used in the software engineering literature, for example in work by Cataldo and Herbsleb [23] or Burnett and colleagues [18].

### Data Analysis #1 (Demographics)

To identify how certain demographics responded differently to certain questions, we used logistic regression (for checkbox questions, binary) and linear regression models (for Likert-scale questions, from 1 to 5). Both linear and logistic regression are standard, statistical techniques to analyze and model data [127]. We chose regression models over statistical tests, as it allowed us to control for gender and age and at the same time model how multiple factors affect a response. This was important as the populations had different gender and age distributions; for example, Marketing and BPO had more females than Software Engineering and IT Operations.

In the demographic models, we typically controlled for Population, Gender, Age, and whether the office is Shared. For example, for the question "When it comes to personalization..." and the response "I personalize my work environment", we built a logistic regression model. The dependent variable was whether the response was checked (0 or 1); the independent variables were population, gender, age, and whether the office is shared.

The coefficients that are statistically significant in the regression model point to the demographics that responded differently to the question.

For logistic regression models, which we used for checkbox questions, the effect of the independent variables is often reported as Odds Ratios. An odds ratio indicates the change in odds for a one unit increase of the independent variable assuming all other variables in the model remain constant. As odds ratios can sometimes be difficult to interpret, we report the actual percentages from the survey when possible.

The demographic differences that were identified will be discussed throughout Section 4. In this paper, if not stated otherwise, the findings are statistically significant with a p-value of 0.05 or less. We completed all survey analyses in the R statistical software [104].

## 4 ENVIRONMENT THEMES DISCUSSION

In the following sections, we discuss findings from our study. From our interviews and surveys, we identified various themes and factors related to work environments.

### 4.1 Personalization

A survey conducted by Lingwood explored office workers' ability to personalize their work space [77]. During our interviews, we asked participants how they felt about personalization and whether it was of importance to them. Most participants had some form of personalization and found value in personalizing, but not all participants had strong feelings regarding the ability to personalize. P17, a software engineer, stated the following during his interview:

> "That shelf could completely go away and I would be totally fine with it. But the office looks stark without it. I would probably just have the picture frame, the awards, the crystal could go away."

Based on our observations made during our interviews, we asked questions in the survey related to how workers personalize their environments.

How many people do personalize? In the survey, 67.4% of participants reported that they personalize their work environment (When it comes to personalization, I personalize my work environment). Male participants were less likely to personalize their work space than female participants (63.4% vs. 76.7%, p < .012). With respect to reasons for not personalizing, male participants mentioned more frequently than female participants that they simply do not want to personalize (When it comes to personalization, I do not personalize because I don't want to, 18.6% vs. 5.3%, p < .0001) and that they do not want to bother others in their environment (When it comes to personalization, I do not personalize because I don't want to bother or offend others around me, 6.3% vs. 2.0%, p < .05). After controlling for gender and age, we did not observe any significant difference between the job disciplines.

How do people personalize their work environment? The survey participants personalized their work environment with a variety of things (On or around my desk you will find...):

- Personal or family photos (65.6%)
- Awards (62.0%)
- Coffee mugs (59.7%)
- Posters (35.5%)
- Plants (16.2%)
- Games (18.0%)
- Stuffed animals (12.0%)

Other items that were mentioned were books, art (for example from kids), or food.