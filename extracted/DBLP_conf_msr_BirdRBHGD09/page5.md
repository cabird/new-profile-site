![git DAG after branches master and feature](page5_img_1.png)

Figure 6. The git DAG after branches master and feature are each merged with each other.

Alice’s git repository would look like if the commits in 5(a) were flattened (removing the branch and the merge commit) and reordered.

Rebasing is often used to “clean” a branch prior to having it pulled into another repository. Thus, the history in a git repository (especially a stable official project repository) may not reflect what actually happened to arrive at that particular state. Use of rebasing is one reason to mine satellite repositories, those developers use to write new features, as these repositories may contain the complete, unmodified development history.

> Peril 5: You cannot always determine what branch a commit was made on.

Although a commit is explicitly created on a specific branch of a specific git repository, the commit does not record the branch on which it was created. It can be difficult or impossible to recover this information. Figure 6 shows what the git DAG looks like after a crisscross merge. Alice merges a branch named feature to master, then master into feature. These merges share a single merge commit, as shown.

The commits prior to the crisscross merge at t4 are all ancestors of the heads of both subsequent branches. Commits are rarely annotated with the name of the branch to which they were written and the default commit message of the merge commit is merge branch 'master' into feature, which does not helpfully distinguish its parents. Thus, if the repository were mined at time t6, it usually is not possible to tell which commits prior to the merge were made on master (green-line before t4) and which were made on feature (orange-line before t4).

> Peril 6: It is not always possible to track the source of a merge or even determine if a merge occurred.

Typically, when a developer pulls commits from some branch in a remote git repository to his local repository, the branch must be merged into the current local working branch. We’d like to know the source of that merge, both in

![Alice and Bob commit sequences illustrating fast-forward merge](page5_img_2.png)

(a) Avoid (b) Perform

Figure 7. Alice’s repository if git was told explicitly to avoid a fast forward merge (a) and normally, when performing a fast forward merge (b) after pulling Bob’s changes.

terms of the git repository and branch within that repository.

This is possible under most, but not all, conditions. By default, git creates a log message for the merge commit with one of the following forms. Text in brackets may not always appear.

Merge branch 'branchname' [into branch_name]  
Merge [branch 'branchname' of] remote_repo_url

Using this information and the relationships between commits on the DAG, it is possible to see which branches were merged together and where.

One situation in which detecting a merge is not possible is when a fast forward merge, depicted in Figure 7, occurs. Alice makes two commits to her master, which Bob pulls into his repository and then makes two commits. After t4, if Alice were to pull Bob’s changes, one would expect her history to look like figure 7(a). However, nothing changed in her repository since Bob pulled from it, so no merging actually needs to take place. Unless git is explicitly told not to, it adds Bob’s commits in sequence and “fast forwards” Alice’s HEAD to the last commit pulled from Bob. In this scenario no merge commit is created.

The situations where the merge source is not available in the commit messages follow:

1) If a merge of two branches results in a fast forward merge, no merge commit is created and thus no log message that contains the string will exist in the log.  
2) If there are conflicts during a merge, the developer will resolve the conflicts and commit their resolution with a log message that may not include the default text.  
3) If a developer rebases a series of commits which contain branches and merges, the result may be “flattened” and not include the merge commit.  
4) If a developer amends the commit message of a merge commit to something other than the default merge message (this is unlikely, but possible).

Figure 8 illustrates this peril. At t3, Bob creates a merge commit when he pulls from Carol; its commit message specifies the url of Carol’s repository. Assume that Alice overwrites the default merge text at t5 when she pulls from Bob. In Alice’s DAG, it is not trivial to know which branch is Bob’s and which one is Carol’s. Mining Alice’s repository, one would miss the fact that Alice pulled from Bob and also