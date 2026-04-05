![Figure 7: colored bar chart of developers' perception of code quality](page7_img_1.png)

My code is more correct.

S. Agree Agree Neutral Disagree S. Disagree N/A

Figure 7: Transition’s effect on developer’s perception of code quality (colored). Half of the developers agree that, after the transition, they implement more code faster and their code had higher velocity. However, for code correctness, the developers have mixed feelings (33% agree vs. 19% disagree).

branch, exp, and commits a few changes. Then, the developer switches back to other branches to work on other issues and forgets exp. If the work in exp becomes important later on, the developer switches back to exp, updates it, and continues the implementation from where s/he left. DVCS branches encourage the developers to try out difficult and complex tasks that might not ship immediately without the fear of failure. A developer confirms this observation:

> Logistics of doing [exploratory coding] was effortless. I create a branch … I can make changes without worrying.

A B/DVCS can improve a developer’s workflow with local history and lightweight branching. However, these advantages will be useful only if the developer’s project scales to the B/DVCS and the developer can still use the existing external tools in her/his workflow. If the obstacles outweigh the benefits, it is less likely that the developer will be willing to change her/his current workflow. The survey shows that out of 59 participants who transitioned, 12 of them are no longer using a B/DVCS. The most popular reasons for returning back to CVCSs are: (1) limited integration with the remaining of the development workflow, (2) scaling issues, and (3) the fact that the remaining of the team still uses a CVCS.

## 6.2 PERCEPTION FOR PRODUCTIVITY

During developer interviews, we specifically asked the developers whether their perception for the following productivity metrics have changed after the transition: (1) code volume produced daily, (2) implementation speed, (3) code velocity, and (4) code correctness. This section discusses our findings on transition’s effect on developers’ perception for these productivity metrics. Figure 7 summarizes the survey results.

**Code volume:** Half of the developers we interviewed and 52% of the survey participants felt producing more code after the transition whereas the other half felt no difference in terms of the code volume produced daily (Our question on code volume had no implications on developer productivity and was just used as a measure to identify developers’ perceptions towards code volume). The most popular explanation for the increase in volume is local commits in B/DVCSs. The developers could produce more code because they were able to work more (offline) and they could commit frequently without worrying about going through quality gates each time.

**Implementation speed:** Six developers we interviewed and 60% of the survey participants felt faster after the transition whereas four developers we interviewed and 13% of the survey participants felt no difference in terms of implementation speed. The most popular explanation for the increase in implementation speed is using lightweight B/DVCS branches for context switching. The developers spent less time on manually managing the context for each task, which lets them do the same work faster.

**Code velocity:** Code velocity is defined as how fast a check-in reaches one of the release branches. Although the developers we interviewed felt no difference, 59% of the survey participants felt that their code velocity has increased after the transition. Most developers we interviewed made a transition to a DVCS. Therefore, once the developers synchronize with the CVCS, their check-ins would still go through the same integration process to reach a release branch. A developer states:

[Shipping code] is a team process, it does not change with the VCS you use.

**Code correctness:** All developers we interviewed, except one, felt no difference in terms of code correctness after the transition. Similarly, only 33% of the survey participants agreed that their code correctness increased after the transition. Similar to code velocity, the developers seem to believe that the code correctness depends on personal practices and the quality gates used by the team, rather than the VCS used during the development.

Regardless of the VCS used to store the product, using a DVCS seems to make the developers write more code, faster without reducing the quality of the code or deployment speed. The developers get more productive because the DVCSs support some important development workflows, such as frequent, incremental check-ins, and efficient context switching, which leaves the developers more time to work on the actual implementation.

## 7. DISCUSSION

This section discusses the findings in-depth. Section 7.1 tries to identify whether the benefits provided by the DVCSs are essential. Section 7.2 revisits the DVCS scaling issues and presents alternative workflows and advanced DVCS features to mitigate these issues. Section 7.3 discusses the importance of a fine-grained security model for commercial companies. Section 7.4 discusses a B/DVCS workflow for incubation projects that can be immediately adopted by existing CVCS products. Finally, Section 7.5 concludes the discussion with some recommendations for the people who consider transitioning. Figure 8 presents the related survey results.

### 7.1 ESSENTIAL VERSUS NON-ESSENTIAL

Section 6.1 identified two major DVCS features that let the developers meet the expectations outlined in Section 4: (1) offline commits that enable incremental workflow, and (2) lightweight branches that enable efficient context switching and exploratory coding.

DVCSs offer offline commits with ease because each developer’s private repository contains the whole development history, which makes it seamless to record all required information, such as the parent of the commit and the branch the commit has happened in, to check-in this commit to the master (or another developer’s) repository. We believe that CVCSs could offer ad-hoc offline commits where the developers can only commit on top of the existing checked-out versions (most of the time only the latest version). However, we believe that the CVCSs are built on the philosophy where whenever a developer commits, this commit is immediately recorded on the server and available to other developers. Therefore, we believe offline commits and incremental workflow are essential to DVCSs.

Most CVCSs use file-system based heavyweight branches compared to pointer-based lightweight DVCS branches. For example, when a new branch is created, Perforce creates a symbolic link from each file in the new branch to the actual files [11]. Using symbolic links is quite efficient in general since Perforce only needs to materialize the files that are modified in the new branch. However, if a product has a very large number of files, creating lots of symbolic links might take considerable amount of time and introduce sub-