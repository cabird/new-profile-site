“Well, hang on,” you might say. “Isn’t this just your own bias speaking? Haven’t you just been remembering those few nasty developers who were stubborn, opinionated so-and-so’s and conveniently forgetting the virtuous majority of developers who are open-minded, always learning, and thoroughly evidence-based?”  

Well, we always wondered that ourselves. So, we went meta and got all evidence-based regarding this, our own long-held, “self-evident” belief.

## Gathering the Evidence

During the summer of 2015, Prem Devanbu visited Christian Bird and Thomas Zimmermann at Microsoft Research’s Empirical Software Engineering group. When discussing possible summer projects, Devanbu pitched this question as a subject worthy of investigation: Wouldn’t Microsoft want its developers’ practice to be evidence-based? If its developers’ beliefs weren’t evidence-based, then where did these beliefs come from? Did these beliefs arise from, and closely correspond with, actual data from the developers’ projects?

In the following, we summarize the results of investigating these questions. For more details, see the full paper.2

Early on, we had a series of discussions on how to explore these questions. We wanted to find out what people believed, why they believed it, and whether those beliefs corresponded with reality. We decided to pursue a triangulated3 experimental method, combining a survey with an observational study.

First, we designed the survey and selected the target audience. We aimed to compile a range of propositions—statements on which the respondents

could agree or disagree. In particular, we wanted propositions on which developers were likely to have informed opinions. That is, they were likely to have encountered pertinent evidence during their engineering practice. We also wanted to choose propositions for which we could actually gather evidence—that is, deploy an observational study based purely on archived project data.

Our survey included these types of propositions:

- Code quality (defect occurrence) depends on which programming language is used.
- Fixing defects is risker (more likely to cause future defects) than adding new features.
- Geographically distributed teams produce code whose quality is just as good as that of teams that aren’t geographically distributed.
- When it comes to producing code with fewer defects, specific experience in the project matters more than overall programming experience.
- Stronger code ownership (fewer people owning a module or a file) leads to better code quality.
- Merge commits are buggier than other commits.
- Components with more unit tests have fewer customer-found defects.
- More defects are found in more complex code.
- Using assertions improves code quality.
- Using static-analysis tools improves quality.
- Coding standards help improve software quality.
- Code reviews improve software quality.

We were also interested where these opinions came from and how strongly the respondents held them. To that end, we asked the respondents to indicate the strength of their belief in each proposition, using a simple 5-point Likert scale (from strongly disagree to strongly agree). We then had the respondents select from six possible origins (Personal Experience, Peer Opinion, Mentor or Manager, Trade Journal, Research Paper, and Other) of their opinion and rank those origins by importance.

We also requested demographic data, including the respondents’ age, gender, number of years as a developer, number of years at Microsoft, title at Microsoft, geographic location, and highest level of schooling, and whether they had a supervisory role. To identify relevant repositories (for the corroborating observational studies), we also asked for the name of the project and the organizational (high-level) division. We maintained the respondents’ anonymity throughout. We sent the survey to approximately 2,500 Microsoft developers; we received 564 responses—a response rate of approximately 23 percent.

### And the Survey Said …

Unfortunately, there isn’t enough space here to reproduce the full story. One area we won’t go into much here is the level of disagreement between the respondents. The propositions listed earlier are arranged by the level of controversy. The first proposition aroused the most controversy; the last one virtually none. For more details, see the full paper.2

Here, we focus on two major issues that gave us concern: the opinion’s source and whether developers’