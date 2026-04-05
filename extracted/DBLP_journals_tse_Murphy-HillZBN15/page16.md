## 7 IMPLICATIONS

The findings we present in this paper have several implications, a handful of which we discuss in this section.

### Additional Factors in Bug Prediction and Localization.

Previous research has investigated several approaches to predicting future bugs based on previous bugs [32][33], including our own [3]. The intuition behind these approaches appears reasonable: how engineers have fixed bugs in the past is a good predictor of how they should fix bugs in the future. However, the empirical results we present in this paper suggest a host of factors can cause a bug to be fixed in one way at one point in time, but in a completely different way at another. For example, a bug fixed just before release is likely to be fixed differently than a bug fixed during the planning phase. As a result, future research in prediction and localization may find it useful to incorporate, when possible, these factors into their models.

### Limits of Bug Prediction and Localization.

Although incorporating some factors, such as development phase, into historical bug prediction may improve the accuracy of these models, some factors appear practically outside the reach of what automated predictors can consider. For example, when analyzing past bugs, it seems unlikely that an automated predictor can know whether or not a past fix was made with an engineer’s full knowledge of why the bug occurred.

### Refactoring while Fixing Bugs.

The results of our study suggest that engineers frequently see code that should be refactored, yet still avoid refactoring. One way that this problem could be alleviated is through wider use of refactoring tools, which should help engineers refactor without spending excessive time doing so and at minimal risk of introducing new bugs. At the same time, such tools remain buggy [34] and difficult to use [35], so more research in that area is necessary.

### Usage Analytics.

In our study, it appeared that engineers often made decisions about how to fix bugs without a data-driven understanding of how real users use their software. While a better understanding would clearly be beneficial, gathering and querying that data appears to be time consuming. Microsoft, like many companies, has been gathering software usage data for some time, but querying that data requires engineers to be able to find and combine the right data sources, and write complex SQL queries. We envision a future where engineers, while deciding the design of a bug fix, can quickly query existing usage data with an easy-to-use tool. To build such a tool, research is first needed to discover what kinds of questions engineers ask about their usage data, beyond existing "questions engineers ask" studies [36].

### Utility Analytics.

Not only can it be difficult for developers to know how users behave, but our results also suggest that developers have difficulty determining whether a more sweeping bug fix is going to be useful to other developers. For instance, participants suggested that, if they knew a new architecture was useful to more than just their team, they would be more likely to implement that architecture.

### Fix Reconsideration.

Engineers in our study reported needing to reconsider bug fixes in the future, but sometimes used ad-hoc mechanisms for doing so, such as writing TODOs in code. Some of these mechanisms may be difficult to keep track of; for example, which TODOs should be considered sooner rather than later. Engineers need a better mechanism to reconsider fixes in the future, as well as the time to do so.

### Microsoft Developers and Other Developers.

As we mentioned earlier, the replication showed only two statistically significant differences between Microsoft developers’ responses and other developers’ responses. With respect to the questions we asked about bug fixing, this suggests that Microsoft developers are similar to the greater developer community, and that in some aspects of bug fixing, Microsoft developers can approximate the greater developer community. Nonetheless, Microsoft developers are likely different in some other dimensions that our survey did not capture.

## 8 CONCLUSION

In this paper, we have described a study that combined opportunistic interviews, firehouse interviews, meeting observation, and a survey. We had initially assumed that the design space was dominated by "root-cause fixes" versus "workarounds," but as the study wore on, the distinction between the two became less and less clear. What has become clear, however, is that the design space of bug fixes is multi-dimensional, and that engineers navigate the space by, for example, selecting the fix that is least disruptive when a release looms near. While our study has not investigated a new practice, we have taken the critical first step towards understanding a practice that engineers have always engaged in, an understanding that will enable researchers, practitioners, and educators to better understand and improve bug fixes.

## ACKNOWLEDGMENT

Emerson Murphy-Hill was a Visiting Researcher at Microsoft when this work was carried out. Thanks to all participants in our study, as well as Alberto Bacchelli, Michael Barnett, Andy Begel, Nicolas Bettenburg, Rob DeLine, Xi Ge, Jeff Huang, Brittany Johnson, Ekrem Kocaguneli, Tamara Lopez, Patrick Morrison, Shawn Phillips, Juliana Saraiva, Jim Shepherd, Nuo Shi, Jonathan Sillito, Gustavo Soares, and Yoonki Song.