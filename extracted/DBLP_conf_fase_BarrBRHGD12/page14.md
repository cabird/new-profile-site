Branching in VCs have received a fair bit of attention [11]. Some have recommended "patterns" of workflows for disciplined use of branching [29]. Others advocate ways of branching and merging approaches [6] that mitigate the difficulties experienced with the branch and merge operations of earlier version control systems. Merging is a complex and difficult problem [19], which, if anything, will become more acute as a result of the transition to DVC and the corresponding surge in the use of branching we have shown. Bird et al. [4] developed a theory of the relationship between the goals embodied by the work going on in branches and the "virtual" teams that work on such branches.

Perry et al. [24] study parallel changes during large-scale software development. They find surprising parallelism and conclude "current tool, process and project management support for this level of parallelism is inadequate". Their conclusion anticipates the rapid transition to DVC that we chronicle in this paper.

The influential work of Viégas et al. [30] uses a visualization methodology to study the historical record of edits in Wikipedia, and report interesting patterns of work (such as "edit wars"). To our knowledge, our paper is the first detailed study of the impact of DVC and its history-preserving branching and merging operations on the practice of large-scale, collaborative software engineering.

## 6 Conclusion and Future Work

Contrary to conventional wisdom, branching, not distribution, has driven the adoption of DVC: most projects still use a centralized repository, while branching has exploded (RQ1). These branches are used to undertake cohesive development tasks (RQ2) and are strongly coupled (RQ3). In the course of investigating these questions, we have defined two new measures: branch cohesion and distracted commits, a type of task interruption that occurs when integration work intrudes into development.

We intend to investigate how projects select branches to merge. The isolation that branches afford carries the risk that the work done on that branch may be wasted if the upstream branch evolves too quickly. We intend to investigate the impact of history-preserving branching on the use of named stable bases [2].

## References

1. D. Atkins. Version sensitive editing: Change history as a programming tool. System Configuration Management, pages 146–157, 1998.  
2. S. Berczuk. Configuration Management Patterns. In Third Annual Conference on Pattern Languages of Programs, 1996.  
3. C. Bird, P. C. Rigby, E. T. Barr, D. J. Hamilton, D. M. German, and P. Devanbu. The promises and perils of mining git. In Proc. 6th MSR, 2009.  
4. C. Bird, T. Zimmermann, and A. Teterev. A Theory of Branches as Goals and Virtual Teams. In Proceedings of the International Workshop on Cooperative and Human Aspects of Software Engineering, 2011.  
5. I. T. Bowman, R. C. Holt, and N. V. Brewster. Linux as a case study: Its extracted software architecture. In Proc. ICSE 1999, 1999.  
6. J. Buffenbarger and K. Gruell. A Branching/Merging Strategy for Parallel Software Development. System Config. Management, 1999.