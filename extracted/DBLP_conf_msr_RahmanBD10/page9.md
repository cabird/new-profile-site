### C. External Validity

In an attempt to address the generalizability of our findings, we have studied four real software projects that represent varying software processes and governance styles [32], with fairly consistent results across the different projects. However, while it is reasonable to believe that our results are representative of open source software, it is unclear how well they generalize to commercial software. Again, we have provided evidence that clones may in fact benefit code and plan to evaluate the relationship of clones with software quality in more diverse contexts.

## VII. CONCLUSION

We have studied several medium to large projects to verify whether cloning is really a “bad smell”. We took an empirical approach, based on actual bug-fix data to evaluate the extent to which clones are associated with code implicated in bug fixes. We find that 1) most bugs have very little to do with clones, 2) cloned code, in fact, contains less “buggy code” (viz., code implicated in bug fixes) than the rest of the system, and 3) larger clone groups don’t have more bugs than smaller clone groups. In fact, making more copies of code doesn’t introduce more defects. Furthermore, larger clone groups have lower bug density per line than smaller clone groups. While others have made the argument before that clones aren’t to be feared, our study is the first to quantitatively validate this claim using data mined from version control and bug repositories. In addition, to our knowledge ours is the first study to consider differences between smaller and larger clone groups.

### ACKNOWLEDGMENT

We would like to thank Adrian Bachmann and Avi Bernstein for the Univ. of Zurich bug linking data. We also thank Lingxiao Jiang, Ghassan Misherghi, Zhendong Su and Stephane Glondu for providing us DECKARD. We extend our gratitude to anonymous reviewers for valuable comments on earlier versions of this paper. We acknowledge support from an IBM Faculty Fellowship, and a gift from Microsoft Research. Most of all, we acknowledge with gratitude support from the NSF Science of Design Program, grant No. SoD-TEAM 0613949. Any opinions, findings, and conclusions or recommendations expressed in this material are those of the authors and do not necessarily reflect the views of the National Science Foundation.

## REFERENCES

[1] G. Alkhatib, “The maintenance problem of application software: An empirical analysis,” Journal of Software Maintenance: Research and Practice, vol. 4, no. 2, pp. 83–104, 1992. [Online]. Available: http://dx.doi.org/10.1002/smr.4360040203

[2] M. Fowler, K. Beck, J. Brant, W. Opdyke, and D. Roberts, Refactoring: Improving the Design of Existing Code, 1st ed. Addison-Wesley Professional, July 1999. [Online]. Available: http://www.amazon.com/exec/obidos/redirect?tag=citeulike07-20&path=ASIN/0201485672

[3] M. Mäntylä and C. Lassenius, “Subjective evaluation of software evolvability using code smells: An empirical study,” Empirical Software Engineering, vol. 11, no. 3, pp. 395–431, September 2006. [Online]. Available: http://dx.doi.org/10.1007/s10664-006-9002-8

[4] L. Jiang, Z. Su, and E. Chiu, “Context-based detection of clone-related bugs,” in ESEC-FSE ’07: Proceedings of the the 6th joint meeting of the European software engineering conference and the ACM SIGSOFT symposium on The foundations of software engineering. New York, NY, USA: ACM, 2007, pp. 55–64. [Online]. Available: http://dx.doi.org/10.1145/1287624.1287634

[5] R. Komondoor and S. Horwitz, “Effective, automatic procedure extraction,” in IWPC ’03: Proceedings of the 11th IEEE International Workshop on Program Comprehension. Washington, DC, USA: IEEE Computer Society, 2003, pp. 33+. [Online]. Available: http://portal.acm.org/citation.cfm?id=857023

[6] Y. Higo, T. Kamiya, S. Kusumoto, and K. Inoue, “Aries: refactoring support tool for code clone,” SIGSOFT Softw. Eng. Notes, vol. 30, no. 4, pp. 1–4, 2005. [Online]. Available: http://dx.doi.org/10.1145/1082983.1083306

[7] M. Balazinska, E. Merlo, M. Dagenais, B. Lague, and K. Kontogiannis, “Partial redesign of java software systems based on clone analysis,” in WCRE ’99: Proceedings of the Sixth Working Conference on Reverse Engineering. Washington, DC, USA: IEEE Computer Society, 1999, pp. 326+. [Online]. Available: http://portal.acm.org/citation.cfm?id=837061

[8] M. Kim, V. Sazawal, D. Notkin, and G. Murphy, “An empirical study of code clone genealogies,” SIGSOFT Softw. Eng. Notes, vol. 30, no. 5, pp. 187–196, September 2005. [Online]. Available: http://dx.doi.org/10.1145/1095430.1081737

[9] C. Kapser and M. W. Godfrey, “"Cloning considered harmful" considered harmful,” Reverse Engineering, Working Conference on, vol. 0, pp. 19–28, 2006. [Online]. Available: http://dx.doi.org/10.1109/WCRE.2006.1

[10] S. Thummalapenta, L. Cerulo, L. Aversano, and M. Di Penta, “An empirical study on the maintenance of source code clones,” Empirical Software Engineering, pp. 1–34, 2009. [Online]. Available: http://dx.doi.org/10.1007/s10664-009-9108-x

[11] B. S. Baker, “On finding duplication and near-duplication in large software systems,” in WCRE ’95: Proceedings of the Second Working Conference on Reverse Engineering. Washington, DC, USA: IEEE Computer Society, 1995, pp. 86+. [Online]. Available: http://portal.acm.org/citation.cfm?id=836911