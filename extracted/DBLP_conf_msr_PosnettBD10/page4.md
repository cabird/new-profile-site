![Table II: metapattern data for JHotDraw 5.1](page4_img_1.png)

Table II: Summary metapattern data for JHotDraw 5.1 (*Factory Method and Singleton do not contain metapatterns in JHotDraw)

design pattern roles. We first run THEX on the relatively simple Huston Design Pattern Catalog which contains short Java examples for each GOF design pattern [9]. Next we examine the results of running THEX on JHotDraw 5.1. In each case, we manually inspect the design pattern instances to determine what metapatterns exist and calculate recall by noting how many metapatterns THEX actually detects.

Metapatterns in the Huston Patterns. In all, there are 70 fairly small classes in the Huston catalog and the structure of the design patterns used are fairly canonical. We present the design pattern to metapattern role mappings that THEX detected in Table I. This table also reflects the mappings presented by Hayashi et al. in their work on detecting design patterns using metapatterns [10]. THEX identified every metapattern in the design pattern instances. THEX also identified other metapatterns that were not part of design pattern instances. Due to the small size of the codebase we were able to manually examine all combinations of variables and methods that might induce a metapattern. From this analysis we conclude that THEX has a recall of 100% and precision of 100% on the Huston design patterns data set.

Metapatterns in JHotDraw. The P-MART repository contains a database of manually identified design patterns in several small open source projects [11]. One such project is JHotDraw 5.1 and the database contains 21 design pattern instances. We compared metapatterns extracted from JHotDraw 5.1 with THEX to the P-MART identified design patterns by examining the TEMPLATE/HOOK combination in each instance.

One STATE pattern is not detected by our tool. The HOOK method call is standard. StandardDrawingView calls tool().mouseDown() which in turn calls fEditor.tool(). Strictly speaking this is not a metapattern according to our definition as the TEMPLATE does not contain the member variable of the correct type. However it behaves somewhat like a metapattern since the end result is to invoke a method on fEditor.tool, which could be considered a compound attribute of the TEMPLATE class, and a multi-level inter-procedural analysis would have made detection possible.

We summarize our results in Table II. All but 3 classes that fulfill design pattern roles also fulfill metapattern roles. In 16 of 17 design pattern instances we find either the expected metapattern or a variant. We could not perform an analysis of precision due to the size of the code base. However, these results indicate a 94% recall rate.

We have presented THEX, a tool for extracting metapatterns from Java bytecode. In practice, THEX quickly and accurately finds metapattern design motifs. We plan to use the results of THEX on evolving code bases to empirically evaluate the effect of design decisions on software engineering outcomes. In addition, we plan to make THEX available under the GPL and hope that others will be able to make use of THEX to detect and study metapatterns in their own research.

## REFERENCES

[1] W. Pree, “Metapatterns - a means for capturing the essentials of reusable object-oriented design,” Lecture Notes in Computer Science, vol. 821, no. 150, pp. 19–27, 1994.

[2] E. Gamma, R. Helm, R. Johnson, and J. Vlissides, Design patterns: elements of reusable object-oriented software. Addison-Wesley Reading, MA, 1995.

[3] N. Shi and R. A. Olsson, “Reverse engineering of design patterns from java source code,” in 21st IEEE/ACM International Conference on Automated Software Engineering, 2006, pp. 123–134.

[4] Y.-G. Guéhéneuc and G. Antoniol, “Demima: A multilayered approach for design pattern identification,” IEEE Trans. Software Eng., vol. 34, no. 5, pp. 667–684, 2008.

[5] J. Gil and I. Maman, “Micro patterns in Java code,” in Proceedings of the 20th annual ACM SIGPLAN conference on Object oriented programming systems languages and applications, vol. 40, no. 10. ACM New York, NY, USA, 2005, pp. 97–116.

[6] T. Tourwé and T. Mens, “Automated support for framework-based software,” in Software Maintenance, 2003. ICSM 2003. Proceedings. International Conference on, 2003, pp. 148–157.

[7] J. King, “Symbolic execution and program testing,” Communications of the ACM, vol. 19, no. 7, p. 394, 1976.

[8] E. Bruneton, R. Lenglet, and T. Coupaye, “ASM: a code manipulation tool to implement adaptable systems,” Adaptable and extensible component systems, 2002.

[9] V. Huston, “Huston design patterns,” accessed January, 2007. [Online]. Available: http://www.vincehuston.org/dp

[10] S. Hayashi, J. Katada, R. Sakamoto, T. Kobayashi, and M. Saeki, “Design Pattern Detection by Using MetaPatterns,” IEICE Transactions on Information and Systems, vol. 91, no. 4, 2008.

[11] Y. G. Guéhéneuc, “P-mart: Pattern-like micro architecture repository,” accessed January, 2010. [Online]. Available: http://www.ptidej.net/downloads/pmart/