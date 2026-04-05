In Vista, we found a negligible difference in failures [29]. This difference becomes even less significant when controlling for the number of developers working on a binary. Furthermore, we also found that component characteristics (such as code churn, complexity, dependency information, and test code coverage) differ very little between distributed and collocated components. Based on discussions with stakeholders, and the software process used during the Vista development cycle, we enumerated certain practices in place that may have mitigated some of the difficulties of distributed development.

We identified the top contributors that made 95% of the changes over multiple major releases of FIREFOX and ECLIPSE and determined their geographic locations and organizational affiliations [30]. We found that FIREFOX is both organizationally and geographically distributed with over a third of its components receiving major contributions from developers on different continents. Although over half of contributions come from the California bay area (San Francisco and surrounding region), these come from a myriad of commercial organizations such as Google, Intel, and Red Hat. Interestingly, components that are highly distributed have no more defects than those that are not.

In contrast, we found that ECLIPSE does not fit the typical open source project profile. ECLIPSE is directed and developed largely by one company; with IBM making 96% of the total commits (49% coming from one lab in Ottawa, Canada). It is also not largely distributed, as 85% of the plugins can trace 3/4 of the commits to one development site. Further, software components in ECLIPSE that are geographically distributed have far more post-release bugs than those whose changes originate primarily at one site.

Although we have only studied three projects in depth (Vista, FIREFOX, and ECLIPSE), based on our findings and also discussions with managers and developers involved in geographically distributed development, we have developed a theory regarding quality:

> Software projects which have many distributed components will put measures in place to deal with the associated difficulties of distribution, thus mitigating the effect of such barriers on quality. In contrast, projects which are largely collocated lack such processes and policies, and the few distributed components will suffer greatly in terms of quality.

## C. Does ownership and expertise affect software quality?

Ownership is a key aspect of large-scale software development. We examined the relationship between different ownership measures and software faults/failures in three large software projects drawn from different process domains: Windows Vista, Windows 7, the ECLIPSE Java IDE, and the FIREFOX Web Browser. We found that in all cases, different measures of ownership such as the number of low-expertise developers, and the proportion of ownership for the top owner have a relationship with both pre-release faults and post-release failures [31]. However, we find that the strength of the effects is related to the development process used. Vista shows the strongest relationship with ownership level, followed by ECLIPSE, and then Firefox, suggesting that the more that a project uses an open source style process, the more that team sizes rather than ownership levels affect failures.

We evaluated three measures of ownership by examining their effects when controlling for code metrics known to have a relationship with failures: size, complexity, and churn. We use ownership as a proxy for expertise as followed by others [32], [33], [34] and evaluate the hypothesis that more changes by those with low expertise leads to more failures [35].

For each component we count the number of contributions and divide the proportion of total contributions down by contributing developer. Thus if foo.dll had 100 changes made and Clara made 40 of those changes, Clara’s ownership of foo.dll is 40%.

Ownership: The ownership of the top contributing developer for a particular software component is considered the ownership of the component. Higher ownership means that more commits were made by a developer with expertise.

Minor Contributor: A developer who has made changes to a component, but who made less than 5% of the commits to a particular component has low expertise.

Major Contributor: A developer who has made changes to a component and whose ownership is at or above 5% is a major contributor to the component and has a non-trivial amount of experience with the component.

After accounting for size, complexity, and code churn, there was a clear trend of ownership having a stronger relationship to failures in Vista and 7 than in ECLIPSE and stronger in ECLIPSE than FIREFOX. More minor contributors means more failures and a higher level of component ownership leads to fewer failures in all cases. In addition, across all projects, the effect of major contributors on quality was weak and often not statistically significant, indicating that the number of higher-expertise contributors has little effect on quality. In the context of Windows, where formal ownership policies are in place, the violation or adherence to such policies had a strong effect on software quality. In the two projects without such policies, we see an effect, but it is clearly not as strong.

In a deeper investigation into Windows, the project where the effect was the strongest, we found that 52% of the components had minor contributors who were major contributors to other components that the original had a dependency with. Thus, one common reason that a developer is a minor contributor to a component is that he is a major contributor to a depending component.

The major benefit of these findings is that this is an actionable result. For organizations where ownership has a strong relationship with defects (which should be easy to identify by replicating our lightweight analysis), we present the following recommendations. These are currently being evaluated at Microsoft.

1. Changes made by minor contributors should be reviewed with more scrutiny.
2. Potential minor contributors should communicate desired changes to developers experienced with the respective binary.

1 A sensitivity analysis with threshold values ranging from 2% to 10% yielded similar results.