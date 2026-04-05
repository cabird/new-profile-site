> Figure 3. Histograms of the number of failures per binary for distributed (left) and collocated (right) binaries. Although numbers are not shown on the axes, the scales are the same in both histograms.

![Post-Release Failures histograms (distributed left, collocated right)](page6_img_1.png)

MRs were positively correlated with the level of distribution of the participants. After further analysis, they discovered that the level of distribution was not significant when controlling for the number of people participating. We performed a similar analysis on our data.

We used linear regression to examine the effect of distributed development on the number of failures. Our initial model contained only the binary variable indicating whether or not the binary was distributed. The number of developers working on a binary was then added to the model and we examined the coefficients in the model. In these models, distributed is a binary variable indicating if the binary is distributed and numdevs is the number of developers that worked on the binary. We show here the results of analysis when splitting the binaries at the regions level. The F-statistic and p value show how likely the null hypothesis (the hypothesis that the predictor variable has no effect on the response variable) is. We give the percentage increase in failures when the binaries are distributed based on the parameter values. As numdevs is only included in the models to examine effect of distribution when controlling for number of developers we do not include estimates or percentage increase.

We performed this analysis on all five splits of the binaries (one at each level as shown in Figure 2). The estimates for distributed coefficient for all models were below 17%, and dropped even further to below 9% when controlling for number of developers (many were below this value, but the numbers cited are upper bounds). In addition, the effect of distributed in models that accounted for the number of developers was only statistically significant when dividing binaries at the continents level. In concrete terms, this indicates that a binary contributed to by 20 developers in Redmond will have relatively the same number of defects as one that has commits from 20 developers around the world.

We also used linear regression to examine the effect of the level of distribution on the number of failures of a binary. Since the level of distribution is a nominal variable that can take on six different values, we encode it into five binary variables. The variable diff_buildings is 1 if the binary was distributed among different buildings that all were served by the same cafeteria and 0 otherwise, etc. The percentage increase for each diff represents the increase in failures relative to binaries that are developed by engineers in the same building.

### Model 1. F statistic = 12.43, p < .0005

| Variable    | % Increase | Standard Error | Significance    |
|-------------|-----------:|---------------:|-----------------|
| (Constant)  | 0.30       |                | p < .0005       |
| distributed | 9.2%       | 0.31           | p < .0005       |

### Model 3. F statistic = 25.48, p < .0005

| Variable         | % Increase | Standard Error | Significance    |
|------------------|-----------:|---------------:|-----------------|
| (Constant)       | 0.09       |                | p < .0005       |
| diff_buildings   | 15.1%      | 0.50           | p < .0005       |
| diff_cafeterias  | 16.3%      | 0.21           | p < .0005       |
| diff_campuses    | 12.6%      | 0.35           | p < .0005       |
| diff_localities  | 2.6%       | 1.47           | p = .824        |
| diff_continents  | -5.1%      | 0.31           | p = .045        |

This indicates that on average, a distributed binary has 9.2% more failures than a collocated binary. However, the result changes when controlling for the number of developers working on a binary. The parameter estimates of the model indicate that binaries developed by engineers on the same campus served by different cafeterias have, on average, 16% more post-release failures than binaries developed in the same building. Interestingly, the change in number of failures is quite low for those developed in multiple regions and continents. However, when controlling for development team size, only binaries categorized at the levels of different cafeterias and different campuses show a statistically significant increase in failures.

### Model 2. F statistic = 720.74, p < .0005

| Variable    | % Increase | Standard Error | Significance    |
|-------------|-----------:|---------------:|-----------------|
| (Constant)  | 0.25       |                | p < .0005       |
| distributed | 4.6%       | 0.25           | p = .056        |
| numdevs     | 0.00       |                | p < .0005       |