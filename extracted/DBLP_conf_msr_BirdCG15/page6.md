People felt that it was easy to get started. Several interviewees reported that they were up and running quickly, whether they used Excel or the database entry point. One interviewee told us, "The vendor on my team just grabbed the thing and he got it working in, I think, the matter of an hour." We believe this has to do with the fact that CFA data can be accessed via multiple interfaces, allowing people to use whatever means is most comfortable and familiar to them. Many engineers, and especially the ones that used direct database access on the raw data, explained that the data schema was intuitive and easy to work with. As one person expressed it: "The way of organizing the data is very natural and self-explanatory. I don't need to read a lot of documents and I can understand most of them." We believe that this was the case because the raw collected data maps clearly to the concrete entities and activity in the CodeFlow tool, such as comments, files, and reviewers.

A few engineers that used Excel as a basis for their investigations and used the dimensional model which included the facts (computed metrics) and various dimensions as filters, mentioned that some of the names of facts were not self-explanatory, and that they would like a more explicit definition for the indicators they see.

> Provide a clear set of definitions for both the data and the metrics. For some users it will be essential, others can use it to gain confidence in their intuitive understanding.

On the other hand, as people progressed with their analysis and moved on to answer specific questions or reach a specific goal, analysis was experienced as more difficult as questions about the data began to pop up and they were less confident. Several engineers expressed that translating their original questions into something that could be measured was hard. We describe these challenges in a dedicated challenges section (Section III-H), as these were most often experienced after the first steps and analysis with CFA. In general, the support through direct contact and mailing lists has been crucial to helping people handle challenges and deal with the learning curve of using a new system. Interviewees expressed that they appreciated the quick responses and had confidence in the community. One developer told us, "We work with Trevor closely and he helps a lot. Most of my requirements he takes care of so it's fine."

> Users are more likely to invest time in a solution if they know that the community is active and that they can get help when needed.

## E. Why and how is CodeFlow Analytics used?

One of the most important questions we asked in interviews was why people chose to use CFA and how they were able to use it. That is, what was the impetus to search for, find, and use code review data? The answers that we received were varied and many individuals actually provided multiple reasons for using it. In this subsection we have organized their responses into categories and provided descriptions and illustrations.

### Empirically Confirming Beliefs

Six of the interviewees indicated that they had beliefs about their code review practices and how well they were working, but they wanted to have empirical evidence to support their anecdotal experiences. They believed that such evidence would provide support for taking actions to change code review practices in their teams.

For example, one development lead that works with two teams said that he felt like one team was much faster doing code reviews than the other, and since a change requires code review prior to checking in, their development speed had slowed down. He turned to CFA to confirm his suspicions and to help drive change by adopting the faster team’s practices. In his words, "So I wanted to just gather the data to back up my hypothesis and try to inflict the change. Hey, this other team is getting things done much quicker—what are we doing here?" When the data supported his beliefs, he began trying to understand what the faster team was doing differently so that he could help the slower team.

The manager of the Office internationalization team felt that the distributed nature of his team (some in Russia, some in Brazil, etc.) was hurting productivity because it would take eight hours or longer for an issue to be discussed or resolved (e.g., one person would be sleeping while the other was working and vice versa). His team initially didn’t believe there was an issue, but they were more receptive once they saw the data. "So I just gathered the data to see if I was the crazy one or if my team was off."

### Education

Five interviewees told us that they used data from code reviews to find areas that they could improve through team education. For example, one of the teams looks through all of the comments made in code reviews every two weeks to look for patterns indicative of bad practices, poor understanding of the system, or incorrect use of tools. If there are many questions about how a component works or comments point out errors in an author’s change to a component, then the topic of the next training session is teaching about that component. In one instance, they saw many comments about issues in a change that would have been easily caught by StyleCop, a tool to enforce style and consistency rules that the team is supposed to use. As a result, they conducted training on the use of StyleCop so that authors would use it prior to review, saving reviewers’ time.

Another developer from Visio manually inspected thousands of comments and created a taxonomy of the types of things to look for during code review. He developed a set of patterns and anti-patterns and wrote a paper for Microsoft’s ThinkWeek, a forum for any employee to submit ideas around topics that impact the future of the company.

Another individual looked at behavior in code reviews to understand the communication style of the team. This helped uncover the team dynamics and how various members of the team provide and respond to feedback so that they could address problems.

### Reports and Dashboards

Almost all of the subjects we interviewed used the data in CFA to generate reports of some kind, including dashboards. The audience for these fell into two main categories. The first