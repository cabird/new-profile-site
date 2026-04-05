operating system, KDE desktop environment, and Gnome desktop environment. The results from these projects have been published by Rigby et al. [24, 25] and are used here only for comparison purposes.

## 2.3 Peer Review at Microsoft

Microsoft has slowly been evolving its code review process. While code review has been an integral practice at Microsoft for many years, the method used has shifted from sending patches and discussing them on large email lists to using centralized tools.

A few years ago, Microsoft developed an internal tool, CodeFlow, to aid in the review process. In many projects (including the Microsoft projects that we examined for this study), code review is primarily accomplished via CodeFlow and occurs once a developer has completed a change, but prior to checkin into the version control system. A developer will create a review by indicating which changed files should be included, providing a description of the change (similar to a commit message), and specifying who should be included in the review. Those included receive email notifications and then open the review tool which displays the changes to the files and allows the reviewers to annotate the changes with their own comments and questions. The author can respond to the comments within the review and can also submit a new set of changes that addresses issues that the reviewers have brought up. Once a reviewer is satisfied with the changes, he can “sign off” on the review in CodeFlow.

While many teams have policies regarding code review sign off, there is no explicit connection between the review system and version control that disables checkin until a review has been signed off. Teams’ review policy may vary in many ways. For example, some require just one reviewer to sign off while others require more; some specify who should sign off for changes in different components and some leave it up to the developer; etc. For more details, we refer the reader to an earlier empirical study [2] in which we investigated the purposes for code review (e.g., finding defects, sharing knowledge) along with the actual outcomes (e.g., creating awareness and gaining code understanding) at Microsoft.

New Data: In this paper, we present the results of analyzing review data drawn from three large projects at Microsoft that use CodeFlow as the primary mechanism for code review and that differ in their domain and development methodology – Bing, Microsoft Office 2013, and Microsoft SQL Server. Bing is an Internet search engine; it is continuously being developed and deployed and undergoes constant development. Office is a suite of business applications that ships as a boxed product and follows a more traditional process with phases for planning, implementation, stabilization, and shipping. SQL Server is a database management and business intelligence application that follows a development cycle similar to Office. We present details of data gathering for these projects in subsection 3.1.

## 2.4 Google-based Gerrit Peer Review

When the Android project was released as OSS, the Google engineers working on Android wanted to continue using the internal Mondrian code review tool used at Google [28]. Gerrit is an OSS, git-specific implementation of the code review practices used internally at Google, created by Google Engineers [11]. Gerrit centralizes git, acting as a barrier between a developer’s private repository and the shared centralized repository. Developers make local changes in their private git repositories and then submit these changes for review. Reviewers make comments via the Gerrit web interface. For a change to be merged into the centralized source tree, it must be approved and verified by another developer. The review process has the following stages:

1. "Verified" - Before a review begins, someone must verify that the change merges with the current master branch and does not break the build. In many cases, this step is done automatically.
2. "Approved" - While anyone can comment on the change, someone with appropriate privileges and expertise must approve the change.
3. "Submitted/Merged" - Once the change has been approved it is merged into Google’s master branch so that other developers can get the latest version of the system.

New Data: In this paper, we present results from two Google-led, OSS projects that use the Gerrit peer review tool: Android and Chromium OS. Android is an operating system developed for mobile and tablet devices. It is Open Source Software and was initiated by a group of companies known as Open Handset Alliance, which is led by Google.2 Google Chromium OS, referred to as Chrome, is an operating system which runs only web apps and revolves around the Chromium web browser.3 We present details of data gathering for these projects in subsection 3.1.

## 2.5 AMD and CodeCollaborator

Ratcliffe [20] presented a practitioners report on the adoption of a CodeCollaborator-based peer review practice on an internal AMD project, which served as the model for other projects at AMD. The practice used at AMD involves the following steps: 1) the author uploads the software artifacts for review in the web interface, 2) reviewers are assigned to the review, 3) a review discussion occurs and problems are fixed, 4) once a review is approved it is committed. The CodeCollaborator tool allows for assignment of rules and the specification and enforcement of business rules (e.g., a review must be approved by 2 reviewers before it can be committed). While asynchronous discussion can occur, a chat interface can also be used. Cohen, the founder of the company that sells CodeCollaborator, performed a detailed evaluation of the tool at Cisco [6].

New data: Ratcliffe’s practitioners report was mainly qualitative. In this work, we present the quantitative results from the use of CodeCollaborator at AMD. The AMD data set is limited, so we indicate below when we are unable present results for AMD.

## 2.6 Contemporary Peer Review Process

Comparing the above review processes, we find that contemporary peer review is characterized by being lightweight

2http://source.android.com/
3http://www.chromium.org/chromium-os