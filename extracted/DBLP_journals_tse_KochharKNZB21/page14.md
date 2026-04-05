contributions can overwhelm the Microsoft developers as they need to perform testing and ensure that the new patch request does not break the software. A developer mentioned, “It may be a good thing that there are no swell of changes coming because you need to evaluate every single change. Even contributions within the team take considerable amount of time of my day. For e.g., if there were ten more people contributing at the same rate, I think it would be hard to manage.” (D8). Only 22% of the respondents agree that too many contributions from the community is hard to manage (S50).

## 7 DISCUSSION

As more and more organizations are interested in open-sourcing internal projects, it is important to ensure that the transition is smooth. Organizations must provide resources which will make it easier for internal developers to transition and aid external developers to contribute to the project. Based on our study findings, we provide some recommendations below for project teams to avoid pitfalls during the transition process. Furthermore, we perform statistical test on the hypotheses used in our survey.

### 7.1 Ratings of Hypotheses

In this section, we present the results of Scott-Knott Effect Size Difference (ESD) test, which is used for comparison of treatment means. Among the 50 hypotheses in our survey, we want to understand which hypotheses are considered more important by the survey respondents. This information will be useful for organizations planning to go open-source to prioritize and consider hypotheses which are higher ranked. Furthermore, the test statistically confirms the results observed in the survey.

Table 10 presents the hypotheses as ranked by the Scott-Knott Effect Size Difference (ESD) test [32] according to their Likert scores. The Scott-Knott test uses hierarchical clustering to divide the sample treatment means into statistically distinct groups (α = 0.05). As shown in [32], the original Scott-Knott test assumes data is normally distributed and it may create groups that are trivially different from one another. Scott-Knott ESD corrects the non-normal distribution of the dataset and merge two statistically distinct groups that have negligible effect size as per Cohen’s d.

We observe that the top 3 most highly rated hypotheses (Group 1) are:
- S1: To engage and build trust in the community
- S9: Sanitizing/Cleaning the source code
- S2: To receive faster feedback from the community

Next 3 highly rated hypotheses (Group 2) are:
- S15: Git is faster than TFS
- S40: Community members are excited about the project going open source
- S22: Continuous Integration can help detect merging issues early and easily

From the top ranked hypotheses (S1, S2, S15), we observe that community involvement is important and Microsoft developers want to make sure that community gets the platform to actively contribute and be engaged. The community has also reciprocated by getting actively involved and contributing through opening issues, submitting pull requests and posting comments on GitHub (see Figure ??-2).

### 7.2 Recommendations for Organizations

#### Infrastructure Support
As one of the developers described, projects need to differentiate between “developing in the open” and “developing open source”. “Developing in the open” means projects simply place their code on a publicly accessible platform without providing any means for the community to contribute. In contrast, “Developing open source” means a project solicits contributions from external developers and the project team provides resources to the community to facilitate the contribution process. “It’s not just dump the code in the open. You have to provide the ways to build and test it.” (D1) When Roslyn’s and Entity Framework’s source code was made open on CodePlex, most of the building and testing infrastructure was internal, making it difficult for external developers to contribute. Thus, a project that is considering open-sourcing should put in place infrastructure which will make it easy for external developers to seamlessly contribute to the project.

A developer said:
> “Prepare the infrastructure first. If they have any internal processes, just expect to put them in the open as soon as possible. If we have an internal process like our API review, they should tell three or four people on how to do it. Also, write some guidelines on how to contribute.” (D5)

#### Clear Goals
When a project is open-sourced, it is important to have a long-term vision of what the organization wants out of the project. Concise explanation of the goals of the project to the community can attract developers who would like to make significant contributions to the project, whereas unclear goals can drive away the developers from actively participating. A developer mentioned, “When you open source you kind of really need to understand how you are going to interact with the community. I don’t think we have done a great job of explaining to the community of where we are and where we want to go ... people from the community get upset about that sometime. It’s like I want to help but I don’t know how to.” (D2)

#### Uniform Processes
When an organization plans to open source multiple projects, it is important to keep uniform processes across the projects. This makes it easier for internal as well as external developers to contribute across projects without learning a new set of tools and techniques. It also persuades community members who have contributed to one project, to contribute to another as they only need to know the project details but not a new process. A developer mentioned, “... between CoreCLR, CoreFX and a bunch of other projects, we are using the same test harnesses xUnit. I know if I look at the WCF project, it’s going to work same as the CoreFX project. I can move between the two projects and contribute both places without learning a new set of processes.” (D3)

#### Hosting Platform
Choosing the right platform to host an open-sourcing project increases the chances of getting more participation from the community. Open source platform like GitHub provide social transparency and tools for developers to collaborate, which can enhance the project’s visibility and provide avenues for the developers to contribute. Recall that some of the Microsoft projects were