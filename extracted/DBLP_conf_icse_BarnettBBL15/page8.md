trivial changes to one of the partitions. These were cases in which the analysis we employ could not identify the relationships. Most pertain to interface method usage and entities referenced by XML files or event-based framework calls. We discuss these cases with more details in Section VI.

Overall, developers were quite positive about our partitioning. All the aforementioned 16 developers confirmed that the partitions are indeed unrelated to each other and could be reviewed separately. In particular, three scenarios caught our attention.

In the first scenario, a developer mentioned that, before the interview, she realized that the commit could be split in two different changesets. She actually did split the changes and said that her commits match our two partitions:

> “These were actually two different changes and I actually split them in two different things after this review” [P7]

Six other participants mentioned that they should have split their changes according to our partitioning and committed them separately. For example, “When I was writing this I was thinking to myself to separate this commit in two separate commits” [P5].

In the second scenario, at the beginning of the interview, the participant was skeptical about our approach and mentioned that her changes were all related. However, when we presented the partitions to her, she seemed surprised:

> “You are actually doing a good job. Actually you surprised me. It is quite intelligent” [P6]

Third, according to a developer, we correctly split changes from two components into two different partitions. He mentioned that one of the components is responsible for the direct calls made to a service provider, while the other contained the callback methods which get called by the same service provider. In this case, the developer had changed the two components and added tests for each one. CLUSTERCHANGES created two partitions: one for each component and its tests. The developer mentioned that if he could, he would name partition 1 “Changes and tests for component 1” and partition 2 to “Changes and tests for component 2”. In eight other interviews, developers mentioned we were able to separate different components into different partitions.

### 2) RQ2:

As already mentioned, there were cases in which participants considered some of the trivial partitions incorrect: they should have been included in a non-trivial partition. Our questions about trivial partitions excluded those and focused on those that participants certified as being correct.

There were indeed several cases where the trivial method partitions identified by CLUSTERCHANGES were correct, i.e. they can be reviewed in isolation. The most common cases correspond to comments, log statements, blank lines, and internal logic changes (e.g. changes to if statements). For this reason, we had conjectured that trivial partitions were less important than non-trivial partitions. Surprisingly, 8 participants mentioned that trivial partitions are neither less or more important than non-trivial ones. Ten participants confirmed that they are less important than non-trivial ones, while the remaining 2 participants could not give an answer to our question. With respect to the 8 participants who said that trivial partitions are relatively equally important to the non-trivial ones, we found that they were somewhat not confident in assigning them less or more importance than other changes. As an example, a participant said:

> “I would not say that isolated changes are less important. It makes sense to separate them out. It is nice to see that they are not in that component, but they are still important” [P11]

We also found a scenario in which a developer changed the internal logic of a method that doesn’t directly impact its signature, but changed its semantics. The participant considered this change equally important as the ones within non-trivial partitions.

There was more consensus about whether trivial partitions were easier to understand than non-trivial partitions. Most participants (16) found them easier to understand, while 3 could not definitively answer the question, and 1 participant was unable to differentiate trivial partitions understanding from non-trivial ones. Overall, participants appreciated the fact that we separated trivial partitions. Among other reasons, participants mentioned the ability to prioritize non-trivial partitions, the fact that they need less context to understand trivial ones, and the fact that they are separated from the “meat” of the change.

### 3) RQ3:

All participants were positive about the general concept of our approach in the sense that it can help reviewers to understand their changes. Some of them were quite optimistic, using terms such as “perfect” [P1] or “amazing” [P11], while others pointed that it could be helpful if we worked more on GUI details of our tool [P3, P7, P14]. We understand that participants tend to be positive during user studies and might be uncomfortable to point out negative aspects. While our intent was to gather observations from our qualitative study and not to perform a statistical analysis, we found some similarities among the answers. For example, 6 participants mentioned that, especially for large code changes, CLUSTERCHANGES could be helpful. During the interview, 1 of these 6 participants called the actual reviewer of the change to analyze the partitions. The participant started to explain the meaning of each partition and the reviewer agreed that it would help him to review the change as it was presented.

Also, 8 participants mentioned that our approach can be used to help assign reviewers to a specific partition based on expertise. Hence, reviewers could also prioritize partitions in which they could better contribute:

> “[Decomposing changes] is useful because allow different reviewers with different purposes to focus on what they want” [P12]

Finally, 5 developers mentioned that breaking changes into partitions would help reviewers to not spend too much time trying to understand the change among different contexts. Three mentioned the current view of CodeFlow and asked if we would combine both tools. CodeFlow currently organizes files in a review as a flat list: the diff-regions are organized only within the directories/files in which they occur.

> I think that could be really helpful. Usually when I am reviewing I open up CodeFlow and maybe there are hundreds of files and I start at the top and go in a directory order. Sometimes I find myself jumping around and saying there is this thing that was defined and I do not know where was defined and then I try to figure out what is going on and come back to