## Cohesive and Isolated Development with Branches

Earl T. Barr1, Christian Bird2, Peter C. Rigby3, Abram Hindle4,  
Daniel M. German5, and Premkumar Devanbu1

1 UC Davis, Davis CA, USA  
2 Microsoft, Redmond WA, USA  
3 McGill University, Montreal QC, Canada  
4 University of Alberta, Edmonton AB, Canada  
5 University of Victoria, Victoria BC, Canada

### Abstract

The adoption of distributed version control (DVC), such as Git and Mercurial, in open-source software (OSS) projects has been explosive. Why is this and how are projects using DVC? This new generation of version control supports two important new features: distributed repositories and histories that preserve branches and merges. Through interviews with lead developers in OSS projects and a quantitative analysis of mined data from the histories of sixty projects, we find that the vast majority of the projects now using DVC continue to use a centralized model of code sharing, while using branching much more extensively than before their transition to DVC. We then examine the Linux history in depth in an effort to understand and evaluate how branches are used and what benefits they provide. We find that they enable natural collaborative processes: DVC branching allows developers to collaborate on tasks in highly cohesive branches, while enjoying reduced interference from developers working on other tasks, even if those tasks are strongly coupled to theirs.

### 1 Introduction

Version control (VC) is tool support for concurrent, collaborative software processes. VC allows developers to create a branch, an isolated workspace, from a particular state of the source code. They can share this branch and work on their tasks within it without impacting the rest of the project and later merge (or integrate) their changes back into the main line of development.

Intuitively, branches should be cohesive (i.e. collect related changes [26]) allowing a team to work together on a focused task and isolated from the rest of the project so that rapid and volatile development is not interrupted or impacted by external changes. The rich history provided by recent VC and their adoption by a number of projects provide a unique opportunity to address these intuitions and quantitatively measure how cohesive and isolated branches are in practice.

The evolution of VCs is marked by increasing fidelity of the histories they record. A commit is the write of a change into VC history. First generation VC, such as RCS, record the history of individual file commits. This enabled rolling back changes to a single file and reviewing file-specific changes. Second generation, or centralized VC (CVC), such as Subversion, stored sets of file changes committed together (i.e., a changeset) in