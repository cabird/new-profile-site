implementation classes change less often. Second, metapatterns derived from detected design patterns do not explain appreciably more or less than those detected by Thex. We also observe that there exist fewer opportunities to play more than two roles with metapatterns as we have at most three roles. As a consequence, greater than two roles are only significant across metapatterns in Eclipse JDT.

> **Conclusion for RQ3**  
> When explaining change-proneness, while controlling for size, there is very limited additional explanatory power provided by pattern or metapattern roles. Furthermore, there is very little difference in the additional power provided by metapattern roles, as compared to the explanatory power of pattern roles. Metapattern roles do, however, follow a similar pattern of change-proneness and size as their design pattern cousins.

## 6.5 RQ4

We now turn to RQ4, viz., the relationship of pattern and metapattern roles with size. Note that we use just the roles and release factor as predictors in the model: size is now the response variable. As before, weighted effects codes for the roles indicate the relative effect on size when a class plays the corresponding role and the chosen symbol indicates the direction and significance of the effect. The overall R^2 indicates how much of the variance is explained by the roles.

The most striking observation regarding size is the strong agreement (both direction and significance) of the role coefficients with the corresponding role coefficients in Mvr. With only a few exceptions, whenever a role is significant in both models the direction of significance coincides. In most models, for example, hook classes are predicted to be less change-prone, and similarly, in most models, hook classes are predicted to be smaller.

The previous models have shown that size is the dominant feature in change-proneness; these models complete the picture by demonstrating that the change-proneness relationships between roles are largely a function of the size of the roles. This model also explains, in part, why roles lose significance in the Mvrs models. Roles are, in fact, strongly correlated with size. That is, they are in part explaining the same phenomena; thus when we include size in the model, many roles become insignificant. From these results we might conclude that roles affect size in at least two ways: 1) directly, albeit minimally, and 2) indirectly through size.

Therefore, roles, in fact, do partially influence change-proneness. However, the amount of indirect change is related to the product of the variances through the mediation variable size. A significant portion of the size change-proneness relationship will not be accounted for by roles through this indirect path.

We summarize many of the intuitions about design patterns previously reported by observing that they are common across metapattern roles. Hence, based on the intuitions reported by Di Penta et al. and our summary from Section 3 we would expect that classes that play the hook role will be smaller, and consequently less change-prone, than classes that play the implementation, and (sometimes) template roles.

> **Conclusion for RQ4**  
> Pattern and metapattern roles have a significant relationship with size