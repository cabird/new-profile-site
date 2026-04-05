![Venn diagram of reasons for DVCS scaling issues](page6_img_1.png)

Figure 6: Major reasons for DVCS scaling issues for Microsoft products (colored). ‘No issues’ represents the case where DVCS scales by default. The survey also had options ‘Other reasons’ and ‘Impossible to scale’ which are selected by 4 and 0 participants, respectively.

That composite products affect DVCS scaling negatively. Some Microsoft products contain multiple sub-products. For example, Microsoft Office contains Microsoft Word, Excel, PowerPoint, and OneNote in all versions. Storing all these products inside one VCS repository makes it easier to share code and dependencies between these products. On the downside, the repository contains the development history for four products instead of one, which causes a scaling problem when DVCSs attempt to check-out the whole history locally. CVCSs do not suffer from the same overhead as whole history is stored on the server only, which scales better than development machines.

(iii) Long development history: The final scaling problem is due to the long development history for the products. Four survey participants believe that scaling can be achieved by limiting the history checked-out from the VCS. Some Microsoft products have active development history longer than a decade. It is very rare that a developer needs the history from a decade back to understand or resolve a problem. Most of the time, the developers use very recent history – maybe from a milestone back. However, DVCSs check-out the whole development history by default, which increases the initial check-out time. In general, developers seem to start experiencing scaling issues when the repository is larger than a few GBs and has a history longer than several years. Considering that this is a one-time cost, the developers generally tolerate it as long as the process completes overnight. A developer states:

"In my case [the initial check-out] was ten hours with one interruption and that was okay for me."

This section discussed the scaling issues that developers face during the transition. Figure 6 shows that 53 (88%) survey participants believe that DVCS scaling can be achieved for Microsoft products by solving a combination of these issues. Section 7.2 will discuss alternative workflows and advanced DVCS operations that can mitigate these issues.

## 6. TRANSITION OUTCOMES

This section discusses the transition outcomes. Section 6.1 revisits the transition expectations and problems with CVCSs and discusses how DVCSs meet these expectations. Section 6.2 discusses the transition’s effect on developers’ perception for productivity. For the survey (Figure 5), we asked the developers to limit their answer only to their experience at Microsoft.

### 6.1 REALITY MEETS EXPECTATIONS

This section revisits the transition expectations described in Section 4 and discusses which DVCS features are used to meet these expectations.

> Ability to work offline: DVCSs check-out the whole history. Consequently, all operations except synchronization with another repository can be done offline, using the local information. The developers can checkpoint their work with local commits, create a private local branch for another task, or learn who changed some file recently. As shown in Figure 5, 95% of the survey participants agree that B/DVCSs let them work offline.
> 
> Incremental workflow: Figure 5 shows that 97% of the survey participants agree that using B/DVCSs let them work incrementally through local commits. With each local commit, the developer checkpoints the work, so that s/he can revert back to a recent version when there is a problem with some recent change. The ability to put checkpoints within a task makes debugging the problems along the way easier. For example, a developer states:
> 
> "Frequent[ly], you want to see your recent [changes] … With Git, it is very likely that I had several commits in the morning and I can go back to see what is just broken."
> 
> Incremental workflow with frequent commits raises a debate on whether the developer should check-in the local commits directly or transform these commits into a few logical and larger commits first, and check-in these logical commits. Most DVCSs, including Git, provide advanced commands, such as rebasing [9], to squash multiple commits into one. One developer states:
> 
> "I use rebase often. I think the history is a code deliverable."
> 
> Some developers we interviewed felt that changing history is wrong. However, most of the times, the developers change history to replace many small commits with one larger, cohesive logical commit. One alternative approach to this workflow would be abstracting the development history rather than re-writing it. Another developer agrees with this observation:
> 
> "Rebasing should not be used for making [the history] more readable. The VCS should know about the deltas, the [readability] is just a representation problem."
> 
> Fast and easy context switches: Figure 5 shows that 98% of the survey participants agree that B/DVCSs let them efficiently context switch using lightweight branches. Unlike most CVCSs, DVCS branches record deltas with respect to an ancestor in the history. So, switching to a branch brn requires the DVCS to check-out the ancestor of brn and apply the deltas. When the developer completes the task, s/he can merge brn to a master branch and check-in the changes from the master branch. For other developers, brn never existed; it is as if the developer worked on the master branch the whole time.
> 
> All developers we interviewed, except one, confirmed that Git branches provide fast and easy context switching in large products at Microsoft. One developer points the following quirk:
> 
> "Benefit of using multiple branches were detrimental because of the long build times between branch switching."
> 
> This developer points out the following problem: when a developer switches to a branch, the codebase changes and needs to be rebuilt. For incremental builds, assuming that the difference between two branches is not very large, this is not an issue. However, if the build is not incremental and assuming a full build requires several minutes, then the developer cannot switch branches very frequently. In such cases, having one repository for each task and manually managing these repositories might be more efficient.
> 
> Fast and easy exploratory coding: Similar to context switching, the developers can do exploratory coding efficiently using DVCS branches. When the developer has an idea, s/he creates a private ...