## 2) RQ2: Under what circumstances does CORAL perform better than a rule-based model (and vice versa)?

In Table V, we show the recommendation precision of rule-based model and CORAL. Specifically, on the sampled data for the CORAL model and rule-based model, precision is calculated as the percentage of the recommended reviewers who are willing to engage in reviewing the pull requests. For the rule-based model, reviewers who either change the status of the pull request or add a code review comment are considered as engaged. For CORAL, reviewers who say that the pull request is relevant and they would take some action are considered as engaged.

Generally, there is “no model to rule them all”. Neither of the models performs consistently better than the other in all the pull requests from repositories of all categories. As shown in Table V, CORAL performs better on pull requests from large repositories and medium repositories while the rule-based model does well on pull requests from small repositories. However, when we statistically tested for differences, Fisher exact tests [34] only showed a statistically significant difference between the two approaches for large repositories (p = 0.013).

One observation that may explain this result is that due to their size, large software projects dominate the graph. Thus, CORAL is trained on many more pull requests from large projects than from smaller projects. If the mechanisms, factors, behaviors, etc., for reviewer selection are different in smaller projects than large ones, then the model is likely to learn those used in larger projects. This hypothesis could be confirmed by splitting the training data by project size and training multiple models. However, as reviewer recommendation is most important in projects with many developers and that appears to be where CORAL excels, we do not pursue this line of inquiry.

We have observed that in small repositories, usually with few developers, one or two experienced developers are more likely to take the responsibility of reviewing pull requests which accounts for the high accuracy of the rule-based model. However, this phenomenon in which a small number of experienced people in a particular repository are assigned the lion’s share of reviews is problematic, and heuristics have been used to “share the load” [15]. As the socio-technical graph contains historical information about a developer across many repositories and PRs from different repositories may be semantically related, CORAL is able to leverage more information per developer and per PR, which may avoid this problem.

The following feedback received from the user study (question (2)) also demonstrates that CORAL identifies relevant and qualified reviewers who traditional reviewer recommenders miss:

> “This PR is created in a repository on which our service has a dependency on. I would love to review these PRs. In fact, I am thinking of asking x on these PRs going forward.”

> “I never reviewed y’s PRs. I work with her on the same project and know what she is doing. I am happy to provide any feedback (of course if she’d like :))”


TABLE VI: Distribution of qualitative user study responses.

| Category | # of responses (%) |
|---|---|
| I will review this pull request | 170 (59.23%) |
| I’d like to be added to this pull request | 24 (8.36%) |
| This pull request is not relevant to me | 93 (32.40%) |


> “The content of the PR might impact another repository that I have ownership of because we use some of the components in that lib. Based on that I would say it is a relevant PR and I will not mind reviewing it.”

## 3) RQ3: What are developer’s perceptions about an automated reviewer recommendation model?

We show the distribution of user study responses in Table VI. Out of 500 user study messages we sent, 287 users responded. 67.6% of the users give positive feedback saying that the given pull request is relevant to them to some degree. In this, 8.36% of the users say they would like to be informed about the given pull request. 59.23% of the users say that they would like to take some action and/or leave comment on the pull request. 32.4% of the users give negative feedback saying that the given pull request is not relevant.

To understand the reason that users do not like CORAL’s recommendations, we analyze the negative feedback (comments/anecdotes from the developers) and classify them into 3 categories with their distribution shown in Table VII. To offer an impression, we show some typical negative quotes that we received from users.

91.03% of the negative feedback we received said that the pull request is no longer relevant to them and 69.23% of them said it is because they started to work in a different area and 21.79% of them mentioned that they do not work in this repository because of switching groups or transferring teams: “Not relevant since I no longer work on the team that manages this service.” 6.41% of the users mentioned that they are actually never involved in code review: “I’m a PM. I’m less interested in PR in general. Only when I’m needed by the devs and then they mention me there.” Two users said that the pull requests we provided does not need to be reviewed: “Let me explain. This is an automated commit that updates the version number of the product as part of the nightly build. It pretty much happens every night. So it doesn’t need reviewer like a traditional pull request would.”

From users’ negative feedback, we learn that in order to improve CORAL we need to include several extra factors. First, our socio-technical graph should take the people movement into consideration and update the graph dynamically, namely identifying inactive users and removing edges or decaying the weight on the edges between user nodes and repository nodes. Second, CORAL should include and learn the job role for every user in the socio-technical graph through node embeddings, such as SDE, PM, so that it can filter those irrelevant users and suggest the reviewers more precisely. Third, before running CORAL, some heuristic rules can be designed to filter the automatic, deprecated pull requests.