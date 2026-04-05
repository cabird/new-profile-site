![Diagram of Alice's repository timeline (Figure 8)](page6_img_1.png)

Figure 8. Alice’s repository after pulling from Bob’s repository. There is no explicit information in the logs that records that Alice pulled from Bob, and one can incorrectly infer that Alice pulled directly from Carol.

One might falsely conclude that Alice pulled from Carol. Any analysis that is based on information about pulls between repositories should be sensitive to these issues.

In the first two cases above, there is no evidence that a merge occurred. Since it is not possible to determine how many merges are being missed due to these constraints, miners must be careful when performing any analysis that depends on branching and merging. In the last two, there is still evidence because there is a commit with two parents; however, source information may be lost. Since the merge is known in these cases, it is possible to measure the information loss. We found that use of the heuristics works in 98% of the cases for a sample of 30 git projects. Details of the analysis and results are presented in section 5.

> Promise 3: Git records the information needed to correct Perils 3–6 in private logs.

When Bob clones Alice and Ram’s repositories, his view into the history of those repositories is obscured. He cannot be sure when and from whom Alice and Ram pulled, when and how they rebased, and so forth. However, this information is not necessarily lost, even if it is not trivially accessible. Git stores information about fast-forward merges, rebases, and pulls in a logs directory. In fact, even more information about a developer’s workflow can be found there — each checkout is recorded, so a researcher could observe when a developer switched between branches.

This promises the possibility of mining data that includes extensive information about developer workflows and project history, but only under certain conditions. The miner must have access to the private repository of each developer whose logs she wishes to mine. Thus, it may well be possible to write tools that take advantage of this information, for use by organizations for their internal projects.

In some cases, researchers may be fortunate enough to have access to, or copies of, some private developer repositories for projects they wish to mine. When this opportunity arises, it is important for researchers to realize that a great deal more information has been made available than from regular repository cloning.

A caveat exists. Git has a cleanup command, gc. Normal execution of gc will not disturb the log files; however, it has an aggressive mode which will. If developers have been running gc --aggressive, some of the log entries may have been deleted.

> Peril 7: The accessible data may only contain commits that are success-selected.

History may be lost or modified due to other reasons. In one workflow, a developer creates a branch that contains changes to be pulled and reviewed by other developers. Once the review has occurred, the branch may be destroyed if the changes are not accepted. Alternately, the developer may modify the branch through rebasing or adding commits prior to inclusion. This process is similar to submitting a patch for review in an SVN project: that patch may be rejected or eventually committed (after possible modifications). Just as recovering the patch and review process is difficult in SVN-based projects [19], [20], a commit’s review history is not directly reflected in git. Initially, we naively thought that we would see more of the review process in the git history. We have found some success in using mailing lists along with signed-off-by, reviewed-by, and tested-by fields when they exist.

> Promise 4: The signed-off-by and other attributes create a “paper trail.”

In response to IP infringement allegations made by SCO, Linus Torvalds added a facility for people to “sign off” on a commit by adding a line such as signed-off-by: John Doe <jdoe@foobar.com> to the end of a commit message. There are also other attributes: acked-by, Cc, reported-by, reviewed-by, and tested-by. These attributes are explicitly added to commits using the -s flag and append a line to the commit log message using a standard format that is easy to parse. A commit may have multiple fields appended as it moves from repository to repository and is reviewed and tested.

This information can be used to (for example) determine certain roles within a community such as reviewer or tester. It can also be used to assess expertise within a project or recreate the organization of the community. We show one use of this data in determining expertise and visualizing the Linux social organization hierarchy in section 5.

To date, we have observed that few projects outside of the Linux kernel use these facilities, but we expect that, as projects with more rigorously enforced policies adopt git, they will take advantage of this added ability to record information about the history of a commit.