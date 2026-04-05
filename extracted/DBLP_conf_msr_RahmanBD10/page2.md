elsewhere?

Finally, we'd like to know whether clones with many copies ("prolific clones") are worse than clones with fewer copies ("non-prolific clones"). One can easily imagine that as copies proliferate, it is likely that the chance of accidentally introducing errors will increase.

RQ3: Are prolific clone groups more buggy than non-prolific clone groups?

We try to answer our questions empirically by analyzing four major open source projects, namely: Apache, Evolution, Gimp and Nautilus. Our study suggests that clones occur less often in bugs than overall code. In all projects, we found that most bugs have nothing at all to do with cloned code (RQ1). Furthermore, we found buggy code is less likely to have cloned code, when compared to the project overall (RQ2). Finally, we found no evidence to support the claim that prolific clones have more buggy code than the non-prolific ones.

Our results might encourage researchers to put more effort on automatic clone maintenance than refactoring and eliminating them, so that when consistent change is required, a developer could be pointed to all the available clone fragments. In addition, and rather surprisingly, one might well conclude that bug-prediction tools could use cloned content as a negative indicator of defect-proneness!

## II. RELATED WORKS

### A. Clone Evolution

Several studies have investigated the extent and evolution of cloning in different software projects. These studies report between 5 to 50% of the source code being cloned [11], [12]. Kim et al. [8] have investigated evolution of clones and built a clone genealogy. Their findings indicate that most of the clones are short lived, and therefore over-aggressive refactoring may be overkill. They also found that the long-lived clones diverge so much, that they can no longer be refactored with existing language support. Geiger et al. [13] examined whether clones in different files induce change coupling. Kim et al. [14] have studied the copy-paste behavior of programmers and have proposed a taxonomy of clones in their paper. Kapser et al. [9] proposed a categorization of patterns of clones, and analyzed the motivation, maintenance impact, advantage, disadvantage, structural manifestation of the patterns. They conclude that cloning is a reasonable design decision and tools should be developed with long term maintenance of duplicates in mind. Krinke [15] studied consistent and inconsistent changes to clones and found that only 50% of the clone groups underwent consistent changes; once made inconsistent, the groups remained inconsistent. Krinke studied cloned code stability [16] where he concluded that cloned code is more stable than non-cloned code.

> ### B. Tool Support
>
> There has been quite a bit of research on tools for clone maintenance. Ekoko et al. [17] proposed a tool for tracking clones in evolving software. Their tool supports simultaneous editing of clones, along with notification to developer when one of the clones changes. A clone tracking tool could reduce possible bug inducing inconsistent changes while allowing developers greater latitude. Bruntink et al. [18] proposed automatic aspect mining based on clone detection. SHINOBI [19] tries to identify clones in real time and is integrated with Microsoft Visual Studio to aid maintenance. Clever [20] integrates with SVN to facilitate better management of clones. Toomim et al. [21] suggested linked editing to edit multiple regions without much programmer intervention.
>
> ### C. Clones and Bugs
>
> Researchers have studied the effect of clones on software quality. Juergens et al. [22] studied inconsistent clones as detected by their tool. They used manual annotations by developers to determine faults in inconsistent clones, and concluded that unintentionally made inconsistent clones are more likely to contain defects. Statistical tests of significance are not presented. As described below, our approach relies on data mined from bug repositories, rather than manual annotation. Jiang et al. [4] proposed an approach on detecting clone related bugs based on context. Their approach tries to detect similar sections of clones, and then based on their contextual difference suggests whether a possible bug is lurking. Thummalapenta et al. studied clone maintenance [10] and their evolution pattern. They found that clones were consistently propagated when needed and developers actually seem to remember the clone locations that require such propagation. They also found cloning often used as a templating mechanism. They found that clone characteristics such as clone granularity or clone radius have little impact on clone evolution. As a whole their study views clones positively; they argue that while better tool support for clone maintenance would help, aggressive refactoring out of clones was probably not worthwhile. Sliwerski et al. [23] studied source code changes that induce fixes. Their approach of determining fix-inducing-change is similar to our buggy code determination approach. However, instead of finding the origination of a buggy code, we map the buggy code to some intermediate snapshot and analyze its properties at that point in time.
>
> ### III. TERMINOLOGIES
>
> In this section we will define all the terminologies and background of our experiment.
>
> #### A. Snapshot and Revision
>
> Source code management systems (SCM) typically provide a rich version history of software projects. This information includes file history, such as when a file was