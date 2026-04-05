which showed a fairly constant monotonic increase, and Weka and Ant, which did not use annotations extensively.

Overall, the data and our analysis indicates that features are usually introduced by one or two contributors who “champion” their use and broad adoption by the project community is uncommon.

In further work, we plan to investigate and contact these early adopters to identify why and how they began introducing new features as well as the obstacles (both technological and social) that they encountered.

### 7.3 What Factors Affect Adoption?

Is backward compatibility the dominating concern, or do other factors such as risk, learning, or tool support play a role as well? In legacy codebases, are less risky features adopted earlier than more risky features? Do these trends disappear in more recent projects?

To evaluate Research Question 3, we focused on the factors of compatibility and IDE support. We separately analyzed established and recent projects where applicable to identify consistent trends.

#### 7.3.1 Compatibility or Other Factors

To evaluate the factor of compatibility, we examined the difference between adoption dates of annotations and adoption dates of generics. Our reasoning is that if concerns of compatibility were the primary factor holding back adoption, then we should observe near-simultaneous adoption of both features once the concerns had been removed. Alternatively, if we observe large differences in adoption dates between the features, then some other factors may have held back adoption of a particular feature.

##### Non-Simultaneous Adoption in Most Established Projects

We examined the dates of the first annotation and generic used in the established projects. Although we did find a few projects that introduced annotations and generics simultaneously, the majority of projects staggered adoption, often by years. Specifically, we found 4 projects adopted generics before annotations, ranging from months to years, while 7 projects adopted annotations before generics, ranging from several days to years (Subclipse annotations appeared 5 years before the first generic). Interestingly, Log4j introduced annotations in 2007, but never introduced generics. There were 5 projects that first used annotations and generics on the same day. Overall, established projects staggered adoption between features by an average of 296 days. Figure 9 shows box plots depicting the number of days between adoption of generics and annotations.

##### Near-Simultaneous Adoption in Recent Projects

Interestingly, the trend seen in established projects does not hold for recent projects. Instead, the recent projects were much quicker to use both features in a near-simultaneous fashion. We found 6 projects used generics before annotations, ranging from days to months, while 14 projects used annotations and generics on the same day. There was a near-simultaneous adoption of annotations and generics (an average 53 days lag), suggesting that projects used the available features in a major language upgrade together.