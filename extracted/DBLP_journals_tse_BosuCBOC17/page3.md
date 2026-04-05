important. The major challenge is understanding the code changes [2].

While these studies characterized the code reviews in commercial projects, only one study [45], which focused on quantitative aspects of code reviews, has compared and contrasted the code review practices of OSS and commercial projects. Since developers’ motivations and project governance differ between OSS and commercial organizations [32], [42], code review collaborations may also differ between OSS and commercial projects. This lack of research was one of the motivations for gathering information about contemporary code review from both OSS and commercial developers.

While most of the earlier exploratory studies focused on understanding the code review practices, a few recent studies have focused on understanding the impact of different factors on code reviews. Code review characteristics such as review size, component, priority, organization, reviewer characteristics, and author experience significantly influence both review completion time and outcome [5]. Moreover, a reviewer’s prior experience in changing or reviewing the artifact and the reviewer’s project experience increases the likelihood that s/he will provide useful feedback [14]. While these studies focused on technical human factors and characteristics of the code changes, no studies have focused on the non-technical human factors (i.e., author’s reputation, and relationship between an author and a reviewer). Because code review facilitates direct collaboration between people, a better understanding of the impacts of various human factors is crucial to improve the code review practices.

A few recent studies have investigated various technical benefits of code reviews. Although the primary goal of code reviews is defect detection, because three-fourths of the review comments are related to maintainability issues, code review may be more beneficial for projects which require highly maintainable code [6]. Code reviews have significant impact on software quality. A recent study found that both low code review coverage (i.e., the proportion of changes that have been reviewed) and low review participation (i.e., the number of reviewers) often increase the likelihood of post-release defects [38]. While these studies focused on the technical benefits of code review, only one study [2] has explored the non-technical benefits of code reviews. The evidence about the non-technical benefits (i.e., impression formation, knowledge sharing, and mentoring) has been mostly anecdotal. Empirical evidence regarding various benefits of code reviews can encourage project managers to adopt code reviews for their projects.

While this prior work provides several important insights into contemporary code review, a number of key aspects are yet unexplored. First, developers who regularly use code reviews should be able to describe scenarios when code reviews can be helpful or not useful. Second, experienced reviewers should also be able to describe the best strategies for code review and help other developers write acceptable code. Finally, because code reviews involve direct collaboration between participants, various types of social interactions are crucial for successful code reviews. However, these three aspects of code review have not received enough attention from researchers. One of the goals of our work is to provide a better understanding of these aspects to guide project managers’ decisions about the usefulness of code review and help improve code review effectiveness.

### 2.3 Our Previous Survey

The work in this paper builds on the results of our previous survey of contemporary code review practices in OSS projects [11]. In that paper, we developed and validated the survey instrument described in Section 4. We used that survey to gather data from 287 OSS developers who had been active in contemporary code review. That paper reported one of the primary quantitative results from the survey, specifically that there is a high level of trust, reliability, perception of expertise, and friendship between OSS peers who have participated in contemporary code review for a period of time. In this paper, we expand these results to include qualitative data from the first survey as well as to compare the results with those from a second survey conducted with commercial developers.

## 3 RESEARCH QUESTIONS

To address the study goal, we explore eight research questions. The remainder of this section defines each question.

### 3.1 Importance of Code Review

Code reviews require significant effort. They delay merging of code to the main branch by 1–2 days [45]. However, recent studies indicate that only one-fourth of code review comments relate to functional defects [6], [19], which raises questions whether developers perceive the effort spent in code review as beneficial. To better understand how developers view the importance of code review, the first research question is:

> RQ1: Why do developers consider code reviews important (or not important) for their projects?

### 3.2 Code Review Process

Because projects often mandate the use of code review, developers spend a significant amount of time performing code reviews. To quantify this effort, the second research question is:

> RQ2: How many hours, on average, do developers spend in code reviews?

In our prior study of code review-based social networks in OSS projects, we observed the presence of sub-communities and a higher volume of interactions between some developer pairs [12]. Subsequently, we found that, in OSS projects, experienced developers received more timely feedback on review requests than newcomers [13]. These results suggest that a history of interactions may influence a reviewer’s acceptance and prioritization of particular reviews. The next research question investigates this phenomenon.

> RQ3: How do developers decide whether to accept an incoming code review request?

Reviewers may use different criteria to determine whether a code change is of high quality. For example, reviewers may have different opinions on the effects of