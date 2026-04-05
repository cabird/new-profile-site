### 5.4 Measuring Liveness and Isolation

We now describe the two measures that we use to quantify the benefit and cost of branches: delay and provided isolation. We present an intuitive description here. A more formal definition is available for the interested reader in the online appendix [12].

Delay. Recall that transit time is the time that it takes for an edit to reach the root from the branch that it was checked into. Once an alternative history has been created through branch removal operations from the original history, the transit time for some edits may have changed (for example, see checkins e and f in Figure 7). The delay that branches within a scenario incur is the difference in total transit time (the sum of transit times for all edits) for all edits between the original history H0 and an alternative history H1.

Delay = TotalTransitTime(H0) − TotalTransitTime(H1)

Isolation. We quantify the isolation that a branch provides by determining the number of conflicts that are avoided because of the existence of the branch. If there was concurrent activity to the same file in a branch and its parent or in a branch and its children, then the branch provided a level of development isolation and was beneficial. However, if development in a file on a branch had no potential conflicting changes in its children or parent, then this isolation was likely not needed. We calculate this by examining the checkins on the parent in the alternative history H1 and counting the number of conflicts. A conflict is a pair of subsequent edit checkins on a branch in the alternative history H1 that occurred on different branches in the original history H0 (for example, edits a in conflict with b in Figure 7.b). These are indicative of checkins that may be incompatible; even if the algorithm used by the SCM to merge textual changes runs without error, a developer must still validate (e.g., through builds and test runs) that the merged file does not contain any problems. Thus each conflict introduced by the removal of a branch represents a non-trivial amount of additional work for a developer. We compare the number of conflicts in H1 against the number of conflicts in H0 during integrations.

Isolation = Conflicts(H1) − Conflicts(H0)

While we cannot know what exactly would have actually happened had a branch not existed, our alternative history effectively quantifies the isolation provided and delay introduced by a given branch. Even if developers coordinated their changes to avoid conflicts, this would be additional effort.

#### 5.5 Normalization

Some branches have an order of magnitude more changes than others. Thus total delay and total isolation may be misleading, especially when comparing different branches. As an example, branches with many edits will have more influence on total delay just because of the high number of edits. Therefore, depending on the question that we are interested in answering, delay and isolation may need to be normalized: For scenarios related to comparisons and decisions on individual branches (or subtrees), we normalize the delay and isolation measures. For scenarios related to branch structure as a whole, we do not normalize. More specifically, for the scenarios presented in this paper, we normalize in the following ways.

Normalized delay. The removal of branches can only affect the transit time of edits on the victim branches and on their children (recursively). We call the edits on these branches the affected edits (regardless of if their transit time is changed). Therefore, when normalizing delay, we divide the sum of the differences in transit time by the number of affected edits:

NormalizedDelay = Delay / NumberAffectedEdits(H0, H1)

Put simply, the normalized delay for a branch is the average change in transit times for edits that occur on or below the branches that have been removed. We say that the branches incur this delay per edit for edits on and below them.

Normalized isolation. Here we normalize by the maximum number of possible conflicts that can be introduced. All edit checkins on the removed branches end up in the victims’ parent branches (there may be multiple victims if multiple branch removal steps are taken from H0 to create H1). Thus, the maximum number of conflicts occurs when there is perfect interleaving of edits that were created on different branches in H0:

PossibleConflicts = NumberOfEditsOnVictims + NumberOfEditsOnParents − 1

We normalize isolation by dividing the number of conflicts that the branch avoids by the maximum number of possible conflicts.

NormalizedIsolation = Isolation / PossibleConflicts

Intuitively, the normalized isolation indicates how many conflicts per edit checkin a branch prevents.

## 6. DECISION SUPPORT SCENARIOS

Having described our methodology, we now illustrate these scenarios by using our analysis on Windows 7 development history.

### 6.1 Branch Health

Our branch assessment metrics can provide awareness of branch health to project stakeholders such as developers, managers, and build engineers. In the same way that test results or code coverage metrics can alert project members to potentially problematic parts of the software, the measures of isolation and liveness can be used to alert project members to parts of the branch structure that are unnecessarily impeding progress. Over the past year, we have provided branch health reports to Windows, Windows Mobile, and Bing. For each branch the reports contain standard measures such as number of edits, integrations, edit/conflict ratio as well as delay and isolation based on the scenarios listed in Section 5.3. Our analysis helped the product groups identify what specific parts of the branch structure were responsible for low liveness.

Note that high-delay-low-isolation branches do not necessarily have to be removed from the branch hierarchy. As with most, if not all metrics, the actions to be taken depend highly on the context [13]. For example, branches might exhibit a high delay because of a temporary code freeze or because they are integral parts of the quality assurance and serve as quality gates; these branches should likely not be removed. Other than removing a branch, a team can also decide to integrate more frequently to the parent branch to decrease delay.

### 6.2 Separating the Sheep from the Goats

Figure 8 contains a scatterplot showing the normalized delay and isolation of all branches during the complete development cycle of Windows 7. The graph shows the results for recursive branch removal (removing a branch and all of its descendants). Isolation

2 Separating the sheep from the goats is an English idiom and an allusion to a biblical metaphor (Matthew 25:32–34) in which sheep provide value and are blessed while goats do not and are cursed.