## Table 9
HOW MANY PEOPLE ARE INVOLVED IN BUG FIXING ACTIVITIES

![Heatmap table showing how many people are involved in bug fixing activities (Microsoft and Other Developers)](page14_img_1.png)

already discussed and agreed upon the basic design of that fix.

We asked survey respondents how many people, including themselves, were typically involved in the bug fixing process. Table 9 shows the results. These results suggest that while finding the cause of a bug and implementing a solution are generally 1- or 2-person activities, choosing a solution tends more often to be a collaborative activity.

One of the more surprising things we heard from some interviewees was that when they made sub-optimal changes, they were sometimes hesitant to file new bug reports so that the optimal changes were reconsidered in the future. The rationale for not doing so seemed to be at least partly social – respondents were not sure whether other engineers would find a more optimal fix useful to them as well. For instance, P2 said the optimal fix to his bug would be a change to the way mobile applications are built in the build system, but he was not sure that he would advocate for this change unless other teams would find it useful as well. Ideally, this is what “feature enhancement” bug reports with engineer voting should help with. However, P2 didn’t fill out a bug report for this enhancement at all, because he judged the time he spent filling out the report would be wasted if other engineers didn’t need it. As he put it,

> If I had more data... that other teams did it... if I could eyeball it quickly... then I'd [say], "Hey, you know, other teams are doing this. Clearly, it's a [useful] scenario."

This made us wonder why engineers avoid filing bug reports, so we asked survey respondents to estimate the frequency of several possible rationales that we heard about during the interviews (Table 10). These results suggest that survey respondents rarely avoid filing bugs for reasons that the interviewees discussed. We view these somewhat contradictory findings as inconclusive; more study, likely using a different study methodology, is necessary to better understand how often and why engineers do not file bug reports.

Demographics. For the Microsoft population, we investigated the effect of different demographics (product division, work area, experience at Microsoft, and experience in software industry) on the survey responses. For each Likert-style question, we built logistic regression models to describe whether respondents selected “Usually” or “Always” (binary dependent variable) with the demographics (independent variables). For the following statements, we observed differences that were statistically significant at .01:

- I notice code that should be refactored. (Testers were less likely to agree, p=.0023)
- How often do the following factors influence which fix you choose?

## Table 10
FREQUENCY OF REASONS FOR NOT FILING BUGS
Microsoft

![Heatmap table showing frequency of reasons for not filing bugs (Microsoft and Other Developers)](page14_img_2.png)