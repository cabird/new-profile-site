# Gerrit Software Code Review Data from Android

Murtuza Mukadam  
Concordia University  
Montreal, QC, Canada  
m_mukadam@concordia.ca

Christian Bird  
Microsoft Research  
Redmond, WA, USA  
cbird@microsoft.com

Peter C. Rigby  
Concordia University  
Montreal, QC, Canada  
peter.rigby@concordia.ca

> Abstract—Over the past decade, a number of tools and systems have been developed to manage various aspects of the software development lifecycle. Until now, tool-supported code review, an important aspect of software development, has been largely ignored. With the advent of open source code review tools such as Gerrit along with projects that use them, code review data is now available for collection, analysis, and triangulation with other software development data. In this paper, we extract Android peer review data from Gerrit. We describe the Android peer review process, the reverse engineering of the Gerrit JSON API, our data mining and cleaning methodology, database schema, and provide an example of how the data can be used to answer an empirical software engineering question. The database is available for use by the research community.

## I. INTRODUCTION

The tools used to support software projects have provided a rich source of data for software engineering research. For example, common tools include source code management systems, build systems, bug databases, and test infrastructures. The results of such research have included insight into software development practices (e.g. [5]) and tools to aid practitioners (e.g. [6]). However, there are few mining scripts and datasets available for studying tool supported peer review.

Software inspection has been an engineering "best practice" for over 35 years [3]. Email based Open Source Software (OSS) peer review has been extensively studied and been shown to be effective [7]. It is important to understand how tool supported peer review is impacting the effectiveness of this engineering practice. In this data paper, we describe how we mine the Gerrit [4] peer review system to extract reviews done by Android developers. We provide a dataset that includes information about which software changes are reviewed (and implicitly, which are not), who typically looks at such changes, how long reviews take, and what types of discussions and feedback are given during code review.

The paper is structured as follows: we describe the Gerrit based peer review process used by the Android project (section II), the source of the data, the methods we used to collect the data along with challenges and limitations (section III), a description of the data schema (section IV), and finally we show an example of how such data can be used to answer questions relating to review practices and discuss future avenues of research with the data (section V).

## II. DESCRIPTION OF PROJECT AND DATA

Android is an operating system developed with a goal to create real-world products which improve the experience for users using mobile and tablet devices. It was initiated by Android Inc., and was bought by Google in 2005. Open Source Software development for Android was initiated by a group of companies known as the Open Handset Alliance in 2007, which is led by Google [1]. The Android community uses the free web-based software code review tool Gerrit [4]. We downloaded a total of 19k reviews from Gerrit.

Gerrit is integrated with git and serves as a barrier between developers' private repositories and the official, centralized Android source tree [2]. Developers make local changes and then submit these changes for review. Reviewers make comments via the Gerrit web interface. For a change to be merged into the Android source tree, it must be approved and verified by a senior developer. Android is an example of a review-then-commit policy [7] that has additional change approval steps [2]:

1. "Verified" - Before a review begins, someone must verify that the change merges with the current master branch and does not break the build. In many cases, this step is done automatically.
2. "Approved" - While anyone can comment on the change, someone with appropriate privileges and expertise must approve the change.
3. "Submitted/Merged" - Once the change has been approved it is merged into Google's master branch so that other developers can get the latest version of the system.

The example in Figure 1 illustrates a review in Android.1 A Gerrit review begins when the owner (Shuo Gao) posts a patch to be reviewed. Reviewers are assigned (Jeffrey Brown, Christophe Bransiec, etc.) so that they can take part in the reviewing of the patch uploaded by the owner. Unassigned reviewers can also make comments. Reviewers can provide comments on individual lines that have changed (2 comments) or they can provide general comments (Jean Baptiste Queru comments "Patch Set 1: Verified"). Reviewers can approve (Christophe Bransiec gives a value +1) or reject (Jeffrey Brown, a value of -2) the uploaded patch. The bot (Deckard Autoverifier) comments, "Patch Set 2 is verified". A patch set encapsulates details regarding the author, committer and also the inline comments made by the reviewers. Multiple patch sets can be uploaded during a review (2 patch sets have been uploaded).

1 https://android-review.googlesource.com/#/c/41591/