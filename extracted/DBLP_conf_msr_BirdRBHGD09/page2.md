differences that lead to very different practices in SCMs and DSCMs. Entirely new phenomena are observable in DSCM data, that lead to many new questions. The data offers researchers many new opportunities, but it also is rife with both conceptual and pragmatic risks. In the course of mining and analysis, we suffered many setbacks and came to false initial conclusions due to incomplete understandings about the data and what processes led to the data we observed.

We compare SVN and git, popular and representative SCMs of the centralized and decentralized flavors. The most fundamental difference between the two is that, under git, developers can share code in a managed way without making use of a master repository, commits to which affect all other developers. This is because developers have their own repositories, each of which can tell a different part of a software project's story.

> Promise 1: Since any developer on a git project can make their own repository publicly accessible, it is possible to recover more history, including work in progress and work that never makes it into the stable codebase.

Any person may make their own git repository publicly accessible and there already exists free git hosting services, such as GitHub, Gitorious, and repo.or.cz. For example, at the time of this writing there are 481 publicly accessible developer git repositories cloned from Ruby on Rails2.

Different developers can have different content in their repositories. For instance, Ubuntu maintains its own repositories of the Linux kernel which contains changes of their own, some of which never make it into the official kernel tree. David Miller, a Linux developer, maintains a repository named net-next-2.6 which contains new or experimental code and is the staging area for network code in the kernel.

Despite the decentralized model, many OSS projects have an "official" repository from which releases are made and which developers use as the source. These repositories, and those of the more active developers, are likely to be the most interesting to researchers.

In projects using SVN, commits often only make it into the repository after being vetted; the rest of the activity (false starts, experiments) are largely invisible. With git, by mining from developers' repositories, it is possible to recover a more complete picture of the development process, including unpolished, experimental work that does not make it into the stable code base.

We begin our discussion of the promises and perils of mining git, with a clarification of the conceptual differences between the centralized and decentralized SCM worlds.

2. As reported by Github.com in February, 2009.

![Diagram of decentralized git usage with Tom, Bob, Alice, and Ram](page2_img_1.png)

Figure 2. Sample decentralized usage of git

## 2. Conceptual Differences

> Peril 1: Git nomenclature differs from that of centralized SCMs (CSCMs): a) similar actions have different commands; and b) shared terms can have different meanings.

Figure 2 illustrates the DSCM world for a 4-person team consisting of Tom, Bob, Alice and Ram, who collaborate on a large project. There is no centralized repository: each developer has their own, which they use to make commits, check out different versions, compare version differences, and so on.

This looks very different from a centralized SCM world and engenders nomenclature differences that can perplex even those who have some familiarity with git; especially those terms whose semantics differ subtly. To bootstrap our analysis, we broadly delineate these differences here, diving into more subtle differences as needed in the context of specific promises and perils.

In both SVN and git, the working copy is the current checked-out state of the repository. The developer Alice executes svn checkout or git clone to create a working copy. Alice can now work and, when she is ready, commit her contributions, using the commit command in both SVN and git. The fundamental difference is that in SVN commits are sent to the central repository, but in git they remain local. Hence, SVN commits are visible to all developers; git commits may not be. In SVN, Ram would have to issue a svn update to see the changes just committed by Alice. Under git, Alice’s commits move to another repository only when a) another developer, e.g. Ram, pulls changes into current branch of his repository via git pull or b) Alice pushes her changes to a remote repository using git push.

Pulling in git differs from an SVN update in that a developer may pull from any number of remote repositories into his own. It is much more common for a git developer to pull than push because a push requires write access and because each developer "owns" his repository and decides what goes into it. However, git does support a centralized workflow via a bare repository. A bare repository is not