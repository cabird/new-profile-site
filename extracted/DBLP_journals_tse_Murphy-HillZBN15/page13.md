### Table 7
WHO IS HELPFUL TO COMMUNICATE WITH WHEN CHOOSING AN OPTIMAL FIX

![heatmap table showing who is helpful to communicate with](page13_img_1.png)

### Table 8
WHO DECIDES WHICH FIX TO IMPLEMENT

![heatmap table showing who decides which fix to implement](page13_img_2.png)

She really wanted to download the file. P39 had to ask two other teams at Microsoft to assist with finding the problem, yet the “root cause” of the problem was not found. P39 eventually fixed the problem with a workaround.

We observe that cause understanding is sometimes dependent on the reproducibility of a bug. However, some of our findings suggest that the notion of a clear distinction between reproducible and non-reproducible can sometimes be artificial and appear largely to be a matter of time and resources available. Joorabchi and colleagues [29] presented a first characterization of non-reproducible bugs and more research is needed in this direction.

We asked survey respondents why they do not always make an optimal fix for a bug; 18% indicated that they have not had “time to figure out why the bug occurred.” This suggests that lack of cause understanding is sometimes a problem.

### Social Factors.
A variety of social factors appear to play a role in how bugs are fixed, including mandates from supervisors, ability to find knowledgeable people, and code ownership.

One example of this was P22, who was fixing a bug in a database system where records were not sorting in memory, causing reduced performance. The engineer proposed a fix based on “one week of discussions and bringing new ideas, [and] discussing [it with my] manager.” Other interviewees discussed their bugs with mentors (P28), peer engineers (P28), testers (P39), and development leads (P34).

In the survey we asked how communication with people helps inform the bug fix design (Table 7). The results suggest that peer software development engineers (SDEs) and the people who originally wrote the code related to where the fix might be applied usually play important roles in deciding how a bug gets fixed. Table 8 displays how participants responded about who decides on which bug fix design to implement. The results also suggest that the individual engineers tend to make the final decision about which fix to implement, and that managers rarely make the final design suggestions. Agreement with the statement about communicating with the people who wrote the code was significantly different between Microsoft developers and other developers (Mann–Whitney U Test, p<.05); Microsoft developers tended to communicate with the developers who wrote the code less often.

We also asked survey respondents how they communicate with others about bug design. Respondents indicated that they most often communicate by email (44%) {30%}, in unplanned meetings (38%) {46%}, planned meetings (7%) {3%}, and in the bug report itself (6%) {14%}. This behavior did not differ significantly between Microsoft developers and other developers (Fisher Exact Test, p>.05). A few respondents also indicated that they discussed design with instant messaging, video chat, and during online code review. However, in a study run in parallel with this one, we inspected 200 online code review threads at Microsoft, but found no substantial discussions of bug fix design [30]. We postulate that, by the time a fix is reviewed, engineers have