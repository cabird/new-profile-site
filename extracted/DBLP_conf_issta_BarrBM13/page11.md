the SpecJVM Raytracer (mtrt) merges 4 cyclic structures, 4 list structures, and 30 atomic sets of objects into a single component (via their dominator-based abstraction), as shown in [27, Figure 4c]. Our abstraction preserves this structural information. This increased resolution enables us to count List/Cycle/Atomic shapes and their sharing relations, instead of reporting a single cyclic structure [26].

The work in [19] performs an extensive evaluation of reachability in the context of understanding object lifetime for garbage-collection applications. The paper [3] introducing the DaCapo benchmarks (used in this work) includes an extensive evaluation of both general properties of the benchmarks and how they allocate and use memory.

Work by Hackett and Aiken in [16] explores how aliasing is used in systems software and, much like the work in this paper, relates the observed aliasing relations to concepts in the source code. Their work focuses on aliasing on individual pointers instead of larger scale conceptual components and therefore does not explore as wide a range of properties as the work presented in this paper. Work by Ma and Foster [23] explores a rich set of sharing and structural annotations and develops a static analysis to extract them. Their empirical study employs their static analysis to construct a conservative over-approximation of actual program behavior and identify the prevalence of various properties. Thus, their work provides a lower bound (possibly a very conservative one) on these numbers while our work uses runtime sampling to compute an upper bound (which we believe is quite precise) for the prevalence of the properties measured. Abi-Antoun and Aldrich computed ownership domain information whose quality was evaluated by developers [1].

## 6. FUTURE WORK AND CONCLUSION

In an effort to understand the heaps of real-world programs, we analyzed the heap structures of a number of DaCapo applications. We found that the organization of heap structures is fairly simple, with the vast majority made up of atomic shapes and that approximately half of all data structures on the heap are locally owned. Sharing occurs between conceptual components more often than within them and, although a high proportion (37% to 61%) of objects are shared, this sharing is frequently of immutable objects or, in smaller proportions, unique or global objects. In practice, sharing occurs via fairly simple and common development idioms. Our abstraction classifies a large majority of sharing relations (89% of fields and 87% of edges) and partitions the heap into categories that 1) show clear statistical differences in occurrence, 2) model simple and common programming practices, and 3) are useful and intuitive to practitioners. These results call into question the commonly held belief that the heap exhibits intricate sharing and show, rather, that the heap is, in practice, a fundamentally simple structure which is primarily constructed from a small number of basic structures and sharing idioms. Finally, our results have actionable implications for rethinking the design of annotation systems, memory management, and program analyses.

## 7. ACKNOWLEDGMENTS

We would like to thank the reviewers for their constructive feedback on earlier drafts of this paper. This research was supported in part by the NSF, grant 0964703. This paper’s content does not necessarily reflect the position or policy of the government; no official endorsement should be inferred.

## 8. References

[1] M. Abi-Antoun and J. Aldrich. A field study in static extraction of runtime architectures. In PASTE, 2008.  
[2] J. Berdine, C. Calcagno, B. Cook, D. Distefano, P. O’Hearn, T. Wies, and H. Yang. Shape analysis for composite data structures. In CAV, 2007.  
[3] S. Blackburn, R. Garner, C. Hoffman, A. Khan, K. McKinley, R. Bentzur, A. Diwan, D. Feinberg, D. Frampton, S. Guyer, M. Hirzel, A. Hosking, M. Jump, H. Lee, J. Moss, A. Phansalkar, D. Stefanović, T. VanDrunen, D. von Dincklage, and B. Wiedermann. The DaCapo benchmarks: Java benchmarking development and analysis (2006-mr2). In OOPSLA, 2006.  
[4] N. R. Cameron, J. Noble, and T. Wrigstad. Tribal ownership. In OOPSLA, 2010.  
[5] D. R. Chase, M. N. Wegman, and F. K. Zadeck. Analysis of pointers and structures. In PLDI, 1990.  
[6] S. Cherem and R. Rugina. Region analysis and transformation for Java programs. In ISMM, 2004.  
[7] D. Clarke, J. Potter, and J. Noble. Ownership types for flexible alias protection. In OOPSLA, 1998.  
[8] A. Deutsch. Interprocedural may-alias analysis for pointers: Beyond k-limiting. In PLDI, 1994.  
[9] I. Dillig, T. Dillig, and A. Aiken. Precise reasoning for programs using containers. In POPL, 2011.  
[10] S. Dowdy, S. Wearden, and D. Chilko. Statistics for research. John Wiley & Sons, third edition, 2004.  
[11] M. Ernst, J. Perkins, P. Guo, S. McCamant, C. Pacheco, M. Tschantz, and C. Xiao. The Daikon system for dynamic detection of likely invariants. SCP, Dec. 2007.  
[12] M. Fähndrich and R. DeLine. Adoption and focus: Practical linear types for imperative programming. In PLDI, 2002.  
[13] C. Gordon, M. Parkinson, J. Parsons, A. Bromfield, and J. Duffy. Uniqueness and reference immutability for safe parallelism. In OOPSLA, 2012.  
[14] S. Guyer, K. McKinley, and D. Frampton. Ulterior reference counting: Fast garbage collection without a long wait. In OOPSLA, 2003.  
[15] S. Guyer, K. McKinley, and D. Frampton. Free-Me: A static analysis for automatic individual object reclamation. In PLDI, 2006.  
[16] B. Hackett and A. Aiken. How is aliasing used in systems software? In FSE, 2006.  
[17] Heap abstraction code. http://heapdbg.codeplex.com/.  
[18] M. Hirzel, A. Diwan, and M. Hertz. Connectivity-based garbage collection. In OOPSLA, 2003.  
[19] M. Hirzel, J. Henkel, A. Diwan, and M. Hind. Understanding the connectivity of heap objects. In ISMM, 2002.  
[20] ikvm. http://www.ikvm.net/.  
[21] M. Jump and K. McKinley. Dynamic shape analysis via degree metrics. In ISMM, 2009.  
[22] C. Lattner and V. Adve. Automatic pool allocation: Improving performance by controlling data structure layout in the heap. In PLDI, 2005.  
[23] K.-K. Ma and J. Foster. Inferring aliasing and encapsulation properties for Java. In OOPSLA, 2007.  
[24] M. Marron. Heap analysis design: An empirical approach. In Submission, 2012.  
[25] M. Marron, M. Méndez-Lojo, M. Hermenegildo, D. Stefanovic, and D. Kapur. Sharing analysis of arrays, collections, and recursive structures. In PASTE, 2008.  
[26] M. Marron, C. Sanchez, Z. Su, and M. Fähndrich. Abstracting runtime heaps for program understanding. IEEE TSE, 2013.  
[27] N. Mitchell. The runtime structure of object ownership. In ECOOP, 2006.  
[28] N. Mitchell, E. Schonberg, and G. Sevitsky. Making sense of large heaps. In ECOOP, 2009.  
[29] Nlucene. http://nlucene.sourceforge.net/.  
[30] S. Pheng and C. Verbrugge. Dynamic data structure analysis for Java programs. In ICPC, 2006.  
[31] A. Potanin, J. Noble, and R. Biddle. Checking ownership and confinement: Research articles. Concurrency and Computation: Practice and Experience, 2004.  
[32] J. Reynolds. Separation logic: A logic for shared mutable data structures. In LICS, 2002.  
[33] S. Sagiv, T. Reps, and R. Wilhelm. Parametric shape analysis via 3-valued logic. In POPL, 1999.