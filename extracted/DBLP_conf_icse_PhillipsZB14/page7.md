### 4.8 Peer Monitoring

Although each interview participant could recall conflicts between builders and developers, it was generally felt that “most people feel bad when they break the build and they do not want to do it again” (P6). Yet, for repeat offenders, a question that generated a lot of discussion was how they can be “incentivized [sic] to not do it again,” because “you do not want to let them off the hook” (P6).

Historical approaches to build-break accountability varied from the humorous, such as wearing a funny hat for the day, to the somber, reporting to “ship room” (P7) and account for the break in front of one’s peers. Today, accountability tends to be computer-mediated, e.g., broadcasts to email distribution lists describing what changes broke the build. Recent work has called these types of actions peer monitoring [27], where coworkers attempt to deter disruptive behaviour. The term one participant used was “public shaming” (P4).

The feeling was that public shaming does promote caution as it makes people “petrified of breaking the build” (P7); however, there was no evidence that it reduced the overall number of build failures. On the contrary, some felt that the “same amount of failures still occur” (P6), which indicates that careless submissions, while frustrating, may not be very common.

Nevertheless, all participants stated that computer-mediated public shaming is something they have used, and will likely use in the future — it was described as “a valuable tool... but you need to know when to use it” (P1). The variance stemmed from frequency: use it often, occasionally, or only as a “last resort for the most severe offenses” (P4).

## 5. IMPLICATIONS FOR ORGANIZATIONS

In the previous section, we presented our findings on the characteristics and dynamics of build teams that can influence their effectiveness. In this section, we synthesize the findings into tools and practices that can potentially be used to improve build team effectiveness. As the challenges we have described are mostly social, we leverage theories from group dynamics and organization science, some of which have decades of supporting research, in our designs.

While the ideas we present here are grounded in qualitative data and established theories, there is a risk that they are impractical, ineffective, or otherwise have little value to practitioners. To mitigate this risk, we conducted a focus group study with Microsoft employees to evaluate, refine, and assess the feasibility and value of the ideas.

This section is structured around our four ideas: role redefinition, social knowledge sharing, intergroup process transparency, and reducing intergroup conflict. After each idea is described, the feedback from the focus group is presented.

### 5.1 Role Redefinition

*Use empirical data to reduce role ambiguity.*

Our findings indicate that the role of “builder” is ambiguous and the definition can vary between organizations. There is some evidence based on interviews and the focus group that this ambiguity can lead to job dissatisfaction and movement out of the build discipline. To prevent the loss of talented builders, our idea is to redefine the role with clear responsibilities, as recommended in other work [21, 41], but to do so based on empirical data.

Our survey data in Table 4 shows the general shape of the build role after years of organic growth. The two most frequent tasks, build operations and build automation, are different in that operations is closely aligned with project management, while automation is aligned with development. To reduce ambiguity, we propose a bucketing approach where build operations and build automation are the buckets, and the remaining tasks are sorted based on whether they primarily involve management or development duties.

Based on the bucketing, the builder role should be partitioned into the roles of build operator and build engineer. Build operators will manage the build operations and team coordination, while build engineers will create and maintain build automation and tools as specialized developers. This measured approach to role definition accounts for an organization’s actual needs by broadly examining how an ambiguous role has evolved over time.

Feedback: The focus group confirmed our findings of role ambiguity by describing a builder as “whatever it needs to be” (F5) and that “you cannot have one definition for a place as diverse as Microsoft” (F6). Support for redefining the builder role along our proposed boundaries was strong, as there was agreement that build engineering and build operations are “separate disciplines” (F8).

It was felt that, under our proposal, build engineers could be more fairly evaluated against developers as they would have a clear focus on development tasks. A limitation, however, was that build operators might not receive the same benefit:

> “There are huge amounts of obfuscation in the build process. If you are good, no one ever knows about it.” (F1)

That is, a skilled build operator is able to understand and manage the “obfuscation” while shielding others from it such that they are unaware that it even exists. The concern is that build operators would lose visibility if they were no longer involved in development tasks (i.e., if the build is successful, people don’t spend time thinking about the build operator), so they should have some avenue to report their achievements.

### 5.2 Social Knowledge Sharing

*Promote intergroup communication with social build tools.*

Our interview participants discussed several challenges with sharing knowledge across group boundaries; in particular, the large amount data to share and the discoverability of relevant information. A solution from the Microsoft Visual Studio build team had the most enthusiastic support, where custom build rules are verified at desktop compilation; for example, when a developer creates a dependency between two projects that, while technically correct, crosses an architectural boundary that could break parallelism in the build system. In this case, a warning or error message is displayed to the developer.

Our idea is to enhance this solution by incorporating a social component. Majchrzak et al.’s findings also show the value of transferring data “fragments,” but they additionally advocate for continual intergroup engagement [29]. Applying their findings to our context, each build best practice will have an owner and their contact information will be included in the corresponding error message. Developers will then know exactly who to contact on the build team for guidance, and will be encouraged, or possibly required, to do so.

Feedback: The focus group, before being presented with our idea, discussed how they have written documents about build best practices, but “developers do not know what to search for in them” (F2), supporting our earlier findings on intergroup knowledge sharing. The group suggested two refinements to improve the likelihood of our idea being adopted. First, it was noted that “tribal knowledge” can vary “between branches” (F4) and not just at the product level. In other words, certain rules will apply to some branches, but not to others (e.g., branches that contain user interface work vs. branches for database changes). The knowledge sharing tool will need to be aware of what branch the developer is working in.