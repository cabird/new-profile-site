Results from an annual survey from software tool manufacturer, VersionOne (http://www.versionone.com/).

The rest of this paper is organized as follows. In Section 2, we provide information on related work. Sections 3-5 present our data collection and analysis methods, research questions, and results, respectively. In Section 6 we reflect on our findings, Section 7 discusses threats to validation, and we conclude in Section 7.

## RELATED WORK

While many reports of individual teams have been published, generally little empirical data exists to support the growth of agile software development methodologies or individual practices in the software development industry. Forrester analyst Dave West presented in 2009 that agile software development presented a means for dealing with the problem of increasing software development complexity [8]. At this time, Forrester also announced that 30% of the organizations they surveyed reported using agile practices. A survey conducted two years prior with a different sample group found that only between 8–10% were using agile practices [8].

A survey of 399 project managers and ten post-hoc case studies [9] indicated that the agility dimensions response extensiveness and response efficiency are traded off. Response efficiency positively affects on-time completion, on-budget completion, and software functionality. Response extensiveness positively affects only software functionality. The results also suggest that team autonomy, as espoused in agile methodologies, has a positive effect on response efficiency and a negative effect on response extensiveness.

A case study in large-scale development [10] at Ericsson AB identified issues and advantages with agile software development. Ericsson used a hybrid agile methodology consisting of Scrum and Extreme Programming as well as other incremental and iterative development practices. The principal results of the case study are that issues arise when using agile in large-scale software development. For example, using small and coherent sub-teams increases control over the project, but leads to new issues on the management level where the coordination of the sub-teams has to take place.

## DATA COLLECTION AND ANALYSIS

### III.A. Data Collection

Over the course of six years, five annual surveys, internal to Microsoft, were administered. The years that the survey was collected were 2006, 2007, 2008, 2009 and 2012. The questions contained in the survey expanded to reflect changes in agile practices and also the lessons learned from running prior surveys. Additionally, interviews were conducted with five engineers and managers in 2012 to explore in more depth survey responses.

### III.B. Survey Audience

The target audiences for the survey are people in a variety of product groups within Microsoft. Any person who filled in the survey in a previous year were excluded from the target audience for future surveys, ensuring people with strong views on the subject did not bias the results. The survey was sent out to a large target audience and traditionally about a third of people responded to the survey.

As part of the survey the respondents filled in their job role with 97% of the people fitted into one of the following roles:
- Developers (46%). Engineers whose primary focus is in software development.
- Testers (32%). Engineers whose primary responsibility is component or system testing of products.
- Project Managers (PM) (19%). Engineers or Business Managers whose primary focus is to manage the interface between the developers and other internal product groups and external customers.

Within Microsoft, these three positions form what is often referred to as the “triad organization.” The remaining 3% of job roles could not be categorized into one of the above roles (e.g., director), so their responses were ignored in the analysis. A total of 1,969 people fitted into these categories, 427 in 2006, 369 in 2007, 330 in 2008, 451 in 2009 and 392 in 2012. Table 1 provides the breakout of respondents who say they use agile techniques versus those that use non-agile techniques.

### III.C. Analysis

While the design of the survey did attempt to maintain consistency in the format of the question and response type, variations did still exist. Respondents always had the option to not answer a question. For some questions, the response choice included: Yes; No; Not Applicable (N/A). For questions probing sentiment, respondents could answer Strongly Agree; Agree; Neutral; Disagree; Strongly Disagree; and N/A.

The Likert scale allows the option of a number of different ordered responses. No agreed standard exists on whether to use a balanced scale (an even number of positive or negative responses and include a neutral response) or a forced scale which removes the neutral response [1]. Not allowing a neutral response simplifies analysis. However, not providing the neutral response on the survey precludes the survey respondent from legitimately indicating he or she had no opinion.

In our analysis, all responses were grouped into four categories
1. Agree: includes Strongly Agree, Agree and Yes responses.
2. Disagree: includes Strongly Disagree, Disagree and No responses.
3. Neutral
4. N/A and no responses

For the analysis, no assumptions were made when a person responded in the last category of N/A or did not answer the question. The paper includes the first three categories of Agree, Disagree and Neutral in all analysis.

### III.D. VersionOne Survey

VersionOne, an agile project management tool producer, has conducted an annual global survey of agile adoption and practices since 2006. VersionOne aggressively publicizes this survey at conferences and via email campaigns asking people to participate. In this paper, we compare with survey results