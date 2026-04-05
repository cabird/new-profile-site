### Table 6
The most frequent mechanisms used by engineers to determine usage frequencies. * Indicates statistically significant differences at p < .05

![Table 6: mechanisms used by engineers to determine usage frequencies](page12_img_table_1.png)

None of the Above 12% 5%

fixed the bug by using the build system in a way consistent with how it was being used by other teams. However, he felt that a change that was inconsistent with the way the build system currently worked would have produced better build performance, at least for his product. Table 4C lists survey respondents’ attitudes towards the importance of maintaining design consistency when fixing bugs.

### User Behavior
This factor describes the effect of how users of the software behave on the fix. If users have strong opinions about the software, or use a certain part of the software heavily, engineers may choose a fix that suits the user better.

One example is from P32, who was fixing a graphical processing unit bug, where large images were being displayed improperly in his software. P32’s team considered disallowing images over a certain size, but immediate customer feedback suggested that some customers would no longer use the software if large images were disallowed.

Another example is from T1, where the team discussed bugs in a code analysis tool. The team wondered how often users used a certain code pattern in practice. They acknowledged that their analysis did not work when the pattern was used, but how they fixed the bug depended on how often users actually wrote code in that pattern. They judged, apparently based either on intuition or experience, that several of these bugs were so unlikely to arise in practice that the effort to implement a comprehensive fix for the problem was not justified.

After hearing about T1 and some interviewees talk about frequency of user behavior, we became interested in how engineers know what users actually do. Thus, we asked two questions in the survey. In the first we asked how often fixes depended on usage frequency (Table 4D). These results suggest that how frequently a situation occurs in practice sometimes influences how engineers design fixes.

The second question was a multiple-choice question about how engineers most often determine frequency (Table 6). In this table, SQM refers to a usage data collector used in a variety of Microsoft products. The most common follow up to answering “None of the Above” was to ask the product manager. In Table 6, we were somewhat surprised to find that so many engineers write queries over usage data. However, it still appears that many engineers use ad-hoc methods for estimating user behavior, including convenience sampling, estimation, and guessing. The data in this table revealed two significant differences between Microsoft developers and other developers (Fisher Exact Test, p<.05); Microsoft developers less often make estimates based on their own experience as users, and more often make decisions based on convenience samples.

We also asked survey respondents about the advantages and disadvantages of each method of determining bug frequency. Overall, respondents reported there being a major tradeoff between accuracy of the data versus the time needed to calculate it. For example, using usage data takes a significant amount of time but accurately reflects the customer’s behavior, whereas making estimates based on a developer’s own experience is quite fast but may also be inaccurate.

Even if developers have sufficient time, respondents reported several other challenges to analyzing usage data. First, respondents noted that frequency is only part of the story because severity matters too; one respondent noted, frequency “doesn't represent how [angry the user gets when the] user meets the bug.” Second, even if usage data is captured, there “there may not be data for the question I want to answer.” Third, usage data is not useful in situations where the software has not yet been released. Fourth, even if usage data exists, “there's still the problem of how to interpret [it].” Finally, in some cases usage data cannot be used to “calculate certain metrics due to privacy concerns.”

### Cause Understanding
This factor describes how thoroughly an engineer understands why a particular bug occurs. In interviews, we were surprised how often engineers fixed bugs without understanding why those bugs occurred. Without thoroughly understanding a bug, the bug may re-appear at some point in the future. On the other hand, gaining a complete understanding of why a bug is occurring can be an extremely time-intensive task.

P3 provided an example of fixing a bug without a full understanding of the problem. The symptom of his bug was that occasionally an error message appeared to the user whenever his software submitted a particular job. Rather than understanding why the error was occurring, he fixed the job by simply resubmitting the job, which usually completed without error. Rather than understanding the problem, as he explained it, “my time is better spent fixing the other ten bugs that I had.”

P39 provided another example, where the engineer was fixing a web application that exhibited a strange bug, where a file was being downloaded through the web browser but the browser was not asking the user whether