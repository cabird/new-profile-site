When preparing for a review, interviewees said they are unsure how to document changes for review. It was interesting that less than one third of respondents reported writing descriptions of the change when they prepared code for review, but that many more recognize it should be done more often and more thoroughly.

Some interviewees noted that receiving a rejection can be harsh and that they prefer being given a reason why a change is rejected. Others also noted that the feedback and discussion around code review is ephemeral and not easy to refer to later, especially if they use communication channels such as face-to-face rather than a code reviewing tool that maintains a history of discussions.

Richer channels may be preferred when trying to reach consensus about next steps, though some discussed how it can be tough managing multiple communication channels.

Some of our interviewees also stated that tooling slows down code velocity and tools should be modified to better suit the team’s context, workflow, and policies.

## Challenges faced by code reviewers

Our code reviewers said they struggle with large reviews. Participants discussed how it's hard finding time to perform all the code reviews requested of them, as well as understanding the code’s purpose, the motivations for the change, and how the change was implemented. For code changes that are large and difficult to understand, one developer expressed frustration around the value of his review:

> “It’s just this big incomprehensible mess... then you can’t add any value because they are just going to explain it to you and you’re going to parrot back what they say.” (Participant 13)

Related to comprehension, finding relevant documentation about changes was another frequently reported challenge. One interviewee provided his thoughts on good documentation:

> “Typically [a good code review] has a good description of what the problem was, what the solution is, and if it’s a big change, it has [documentation explaining] what it’s doing and how it’s integrated with everything else.” (Participant 4)

From our interviews, we also learned that understanding the history of comments was an issue. Other challenges reported by survey respondents include a lack of training on the review process itself, and that their reviewing activities are perceived as not being valued enough. Some mentioned that they lack insights into how their code review activities impact job evaluations.

## 4. BEST PRACTICES

Our participants shared insights on how to avoid or mitigate some of the challenges they face. For example, one participant shared how to get reviewer buy-in:

> “Usually I try to get the person who I’m going to have review the thing to actually sit down and talk with them before I put out the code review” (Participant 7)

We synthesized insights from our survey into best practices for code change authors, code reviewers, as well as teams or organizations. These best practices are summarized in Fig. 2, organized by the different phases of the code review process (underlined below) and by stakeholder (author, reviewer, organization). Many of these best practices (shown in bold) have been suggested by other researchers who studied different development contexts, including open source projects [1, 7, 10, 11].

## Best practices for code change authors

To save reviewers time, while preparing a change for review, authors should be conscientious and read through the change thoroughly before sending it out for review. Viewing changes in a code review tool can expose simple issues (such as code style) to the author.

Authors should aim for small, incremental changes that are easier to understand. This is especially important for novices whose understanding of the codebase can be superficial. Furthermore, clustering related changes, documenting the motivation for a change, and describing the change and how to approach the review will help reviewers. Authors should also take time to test their changes, and if no test exists, they should create one. Running automated analysis tools can expose formatting and low-level issues that would otherwise waste reviewers’ time.

Finally, code change authors should carefully consider when to skip a review while referring to their organization’s code review policy (if one exists). Many survey respondents suggested that reviews should be skipped for small or trivial changes that do not change the logic of the code, i.e., commenting or formatting issues, renaming of local variables, or stylistic fixes.

Once code has been prepared for review, authors need to select their reviewers. In particular, they need to carefully decide how many reviewers are needed, consulting their organization’s policy if needed. Similar to the findings by Rigby et al., our study participants explicitly recommended using two reviewers. It is important to select appropriate reviewers—authors may select based on code expertise, they may select individuals who are responsible for the code, or they may choose reviewers to build expertise. If not against a team policy, it may be advisable to allow reviewers to volunteer for motivational reasons.

In addition, authors need to consider who to notify, choosing people that will benefit from being exposed to the code change and the resulting discussion, but they should also decide who should NOT be informed. Reducing the load for senior engineers was reported as an important consideration in our study. We also found that notifying potential reviewers in advance and explaining the upcoming change could help achieve buy-in and speed up reviews.

While responding to a review after their code has been reviewed, authors should show gratitude to their reviewers and carefully consider their feedback in a respectful manner. It is also important to promote ongoing dialog with the reviewers while tracking and confirming problems are fixed after receiving feedback.

Finally, when it comes time to commit code changes, authors should confirm that any decisions made are documented, and periodically reflect on the process as there