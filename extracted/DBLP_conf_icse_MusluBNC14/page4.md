![Venn diagram of CVCS techniques used for context switching](page4_img_1.png)

Figure 4: CVCS techniques that are used for context switching (colored). Most of the ‘other’ techniques boil down to careful management of multiple changes manually.

With the central server, it is as if the private branch never existed. Therefore, the developers believe that they can context switch efficiently using DVCS branches.

(iv) The ability to do exploratory coding efficiently: Half of the developers we interviewed mentioned that CVCSs limit their ability to do exploratory coding. Exploratory coding is basically when developers pursue a new feature/prototype development to explore its feasibility without complete knowledge of its ability to be successful or not. Exploratory coding can be seen as a task that requires a new context, however differs from the usual context switches in two aspects: (1) exploratory coding might take a long time before it becomes a prototype that can be checked-in, and (2) some exploratory coding never makes it to the product. Therefore, exploratory coding might be viewed as a longer and potentially disposable context switch. With strict and pre-defined branches, the developer has to manually manage any exploratory coding, which makes it more difficult and not worthwhile. The developers believe that DVCS branches will let them do exploratory coding efficiently.

This section identified four important CVCS drawbacks. We discuss how a DVCS can remove these drawbacks in Section 6.1.

## 5. TRANSITION BARRIERS

This section focuses on three major problems faced by the developers during the transition. Section 5.1 discusses the learning curve, Section 5.2 discusses problems caused by tool immaturity, and Section 5.3 discusses the DVCS scaling issues with huge products with long histories. Figure 5 summarizes the survey results.

### 5.1 LEARNING CURVE

Most DVCSs have higher learning curves compared to CVCSs because of two reasons: (1) the centralized model — where all development goes through a central repository — is easier conceptually, and (2) DVCSs have more advanced concepts, such as rebasing [9] and transplanting [10], which have no CVCS correspondence. 58% of the survey participants agree with the higher learning curve.

With CVCSs, the developers interact with one repository: the central master. All developers synchronize through this master. On the other hand, in DVCSs, developers have local repositories. The developers commit their changes to their local repositories first, and then check-in to a master repository. The content in the master repositories can be different than the content in the developers’ local repositories, which can be different than the content in the developers’ workspaces. Although not frequently used in big projects [2], the developers can directly synchronize through another developer’s local repository. With increased number of repositories and multiplied possibilities for sharing code, DVCSs are harder to reason about.

CVCSs do not let developers modify the development history easily. Once a change is checked-in to the central server, it is remembered indefinitely. DVCSs give more control to the developers in terms of history management. However, with great power comes great responsibility: a developer can easily modify the development history in an irrevocable way using the advanced DVCS commands. A developer mentions:

> Git is so open ended … If people do whatever they want, [they] can irrevocably lose data.

Another difficulty in learning a DVCS — for a developer who already knows a CVCS — is the conflicting terminology. DVCSs have some commands that have the same name as a CVCS command, but have a different meaning. For example, in CVCSs when a developer commits, her/his changes are checked-in to the central repository. However, in DVCSs, when a developer commits, her/his changes are only stored in her/his private local repository. Unless the developer shares her/his local repository with other developers, these changes are not accessible until the developer pushes them. We would like to note that the learning curve due to conflicting terminology is bidirectional; the developers who learn a DVCS first might also experience similar problems. For the same example, the developer who started using CVCS later would be surprised when her/his changes are immediately accessible to other developers the moment s/he commits.

In addition to the higher DVCS learning curve, three developers we interviewed mentioned that the BVCS increases the learning curve since the developers need to additionally understand how the bridge interacts with both VCSs and learn bridge-specific commands. The transition process requires the developers to change their perception of how VCSs work, learn a new VCS and learn any bridge tooling around the DVCS, which comes with a learning curve. However, three developers we interviewed mentioned that there is a tremendous amount of documentation for the popular DVCSs on the web, which might mitigate the learning curve. One developer notes:

> Another thing I like about Git is there is so much documentation available online.

### 5.2 TOOL IMMATURITY

The developers might not fully appreciate the B/DVCS features due to two major reasons: (1) incomplete bridge implementation, and (2) missing tooling around the B/DVCSs. This section focuses on the bridge (BVCS) between Git and the CVCSs in Microsoft, and discusses these problems in detail. Although 61% of the survey participants do not think that B/DVCSs are missing important features, the participants have mixed feelings (41% agree, 46% disagree) on whether B/DVCSs are integrated with the remaining of the development workflow.

Some BVCSs at Microsoft do not support all features available in the surrounding VCSs they bridge. A developer states:

> Git and [CVCS] have power individually, however these powers are not exposed by [the BVCS].

A particular BVCS uses the same file system location as a Git and a CVCS repository at the same time, which causes interaction problems between VCSs. A developer mentions:

> [BVCS] looked was something between two worlds. Some tools would think that there was a [CVCS] enlistment in the workspace, sometimes Git operations would not work.