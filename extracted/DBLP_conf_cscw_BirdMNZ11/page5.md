> - Provide a powerful, yet simple and easy-to-use search feature. Several respondents to our survey complained about the limited search functionality, which is often only basic keyword search.

For a complete list of recommendations, we refer to our main publication on this work [10].

### Reassignment of Bug Reports

Many people collaborate on fixing bugs and bug reports are often reassigned to other developers. Together with Gaeul Jeong and Sung Kim, Tom proposed bug tossing graphs [11] to capture frequent reassignment patterns. In these graphs, nodes represent developers and weighted edges represent the number of reassignments between two developers. On two large open-source projects, we showed that bug tossing graphs combined with Markov chains can reduce the number of reassignments substantially (also known as the ticket routing problem [12]).

However, not all bug reassignments are necessarily bad. Sometimes reassignments are actually needed to locate the root cause for a bug and to find the right person who can fix the bug. Such "beneficial" reassignments can increase the chances of a bug report getting fixed (see next subsection). We are currently working on a characterization of bug report reassignments to identify potential improvements for bug tracking systems.

### Characterizing which Bugs Get Fixed

Often, the cost or risk of fixing a bug can be too high, or the impact of a bug report can be too low (only few people affected, easy workaround). Thus not all bug reports get fixed in real software development. In joint work with Philip Guo, we characterized which bugs get fixed in Windows Vista and Windows 7 [13]. We made several observations related to how people collaborate and coordinate:

- People who have been more successful in getting their submitted bugs fixed are more likely to get their bugs fixed in the future.
- Reassignments are not always detrimental to bug-fix likelihood; several might be needed to find the optimal bug fixer.
- Bugs assigned across teams or locations are less likely to get fixed, due to less communication and lowered trust.

### Collaboration and Information Needs in Bug Reports

Especially in open source, bug tracking systems play a central role in supporting collaboration between the developers and the users of the software. To better understand this collaboration, we quantitatively and qualitatively analyzed the questions asked in a sample of 600 bug reports from the MOZILLA and ECLIPSE projects (joint work with Silvia Breu, Rahul Premraj, and Jonathan Sillito) [14].

We categorized the questions into a catalogue of frequently asked questions (eight categories, 40 subcategories) and then analyzed response rates and times by category and project. Key findings of this study include:

- Empirical analysis of response rate and time. Out of all questions, 67.66% were responded to. Of the questions with responses, 79.4% received responses within the day.
- Evolving information needs. We learned that the kind of questions and thus the information needs change over a bug’s life cycle.
- Community-based bug tracking. Bug reporting and tracking should be understood as a social activity within a community, supported by the bug tracking system.

Our results showed that the role of users goes beyond simply reporting bugs: their active and ongoing participation is important for making progress on the bugs they report. Based on the results, we suggested four ways in which bug tracking systems can be improved (see the main publication on this work [14]).

## DATA-DRIVEN SOFTWARE ENGINEERING

A significant proportion of empirical research is done via case studies which collect and analyze data from software artifacts and the associated processes and variables to quantify, characterize and explore the relationship between different variables to deliver high quality secure software on time and within budget. Data-Driven Software Engineering forms a crucial part of empirical software engineering as it can be used to understand the successful development of software systems. Nachi Nagappan and Brendan Murphy were some of the first at Microsoft to begin collecting and analyzing software engineering artifact data for this purpose.

In this section we will explain three of our projects at a very high level that involve data driven software engineering. They range from software product to software practice issues. The three projects are,

1. Software product – Failure-prediction/Risk analysis: Using software development data obtained during the development process to predict failures and identify the best predictors.
2. Software practice – Does test-driven development work? If so is there any supporting data for teams to make decisions to use test-driven development.
3. Software practice – Is there data available on how effective Unit testing is? What is the cost associated with unit testing and do developers offer a resistance to unit testing.

### Failure-Prediction/Risk Analysis

An important application of data-driven software engineering is in the field of failure-prediction. Failure prediction can be used to understand the overall success of the development process and plan for maintenance activities. Software organizations can benefit greatly from an early estimation regarding the quality of their product. Because product quality information is available late in the process, corrective actions tend to be expensive [15].