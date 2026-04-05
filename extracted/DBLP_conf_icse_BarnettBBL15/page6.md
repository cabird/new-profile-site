but were kept separate due to relationships that CLUSTERCHANGES does not capture. For instance, the addition of a method call to a method in a base class was not put in the same partition as a change to an overriding method in a subclass (see Section VI-A for a discussion of these sorts of missing relationships).

We observed no cases of spurious relationships in non-trivial partitions. That is, whenever CLUSTERCHANGES put a group of diff-regions into one partition, we never found a case where the partition should have been split into multiple partitions.

### B. Reviews with ≥ 10 trivial partitions

We randomly sampled 15 out of 119 changes with 10 or more trivial partitions, and performed manual investigation. It seemed very unlikely that there could be so many unrelated changes. Indeed, manual inspection revealed almost all of them were due to missing relationships. The three most prevalent missing relationships that we encountered are: (a) annotating several methods with common C# attributes such as Serializable or Obsolete, (b) a common refactoring (e.g., addition of a log message or variable renaming) across a large number of methods, and (c) relationships between overridden methods and their implementations. See Section VI-A for a detailed discussion of these and other missing relationships.

Next, we describe our user study where we approached review creators with the partitionings (2–5 non-trivial partitions).

## V. User Study

In this section we describe our user study methodology and its results. The following three research questions guided our user study:

- RQ1: Do developers agree with our decomposition of their changes? Our technique groups related code changes into partitions that should be independent. We were interested in whether participants agree with our decomposition.

- RQ2: What role do trivial partitions play? Our partitioning results in both non-trivial partitions and trivial partitions. We investigated how participants perceive the trivial partitions regarding their relevance and understanding with respect to the non-trivial partitions.

- RQ3: Can organizing a changeset using our decomposition help reviewers? We were interested in participants’ opinion about whether our decomposition would make it easier for reviewers to understand their code changes.

To answer these research questions, we conducted semi-structured interviews with developers. We present the study and discuss some limitations of our approach identified during the study.

### A. Methodology

We used a firehouse research study design [14], [15] to conduct 20 interviews with participants from 13 projects; we refer to them as P1 through P20. This research method gets its name from the fact that the research requires events to occur that cannot be induced by the researchers themselves. Researchers wishing to study those affected by fires must literally sit in a firehouse waiting for a fire to be reported. In our study we would “rush to the scene” soon after a change was submitted as a code review so that the author still had a mental model of his or her change fresh in mind. Through this method, we were able to interview developers within at most three days from the day they submitted a code change to be reviewed. Hence, we could get fresh feedback on their reasoning about their own changes, since developers were still familiar with them.

### B. Participant Selection

We selected interviewees based on two criteria: i) their office should be located inside the Microsoft Redmond Campus, and ii) they should have submitted a code change that contained two to five non-trivial partitions, and we could easily travel to the building where the code change author worked so that our decomposition had enough structure but was still simple enough to fit in a twenty-minute interview. In summary, the reviews we chose have: between 2 and 5 non-trivial partitions (median 2), between 2 and 13 changed files (median 5), between 7 and 52 diff-regions (median 25), and between 1 and 8 trivial partitions (median 2).

Each morning, we identified interview candidates by querying code review data for reviews that were created on the previous day. Then we sent out an email to review authors briefly describing our study and inviting the code change owner to participate by letting us visit them for approximately 20 minutes. In total, we sent out 43 invitations. Our response rate was 46%.

We interviewed 20 developers from 13 different projects. Participants have between 6 months and 13 years of experience at Microsoft (median 6 years). Among the 20 developers, 5 of them have the term “tester” in their job description.

### C. Protocol

Once we had scheduled an interview, we went to the author’s office. We started each interview by briefly explaining why we were there and the general purpose of our study. Before showing CLUSTERCHANGES, we made clear to developers that they were not under evaluation. Rather, our approach was. After that, we showed our decomposition of their code change and explained how they could use it to inspect code changes. Then, we let them use CLUSTERCHANGES to look through their own change and drove the interview according to each participant’s behavior. Most of the participants were quite communicative and, right after spending some time learning how to use the tool, they started explaining their change, the meaning of the partitions, if they made sense or not, if we missed any information, etc. For these participants, we tried to not interrupt them and let them drive the conversation during the interview. For the few participants that were less communicative, we asked questions to stimulate them to think aloud, such as, “Would you explain what this partition means?” or “Can you tell us the difference between these partitions?”