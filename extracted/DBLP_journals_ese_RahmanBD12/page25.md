## 8 Conclusion

We have studied several medium to large projects to verify whether cloning is really a “bad smell”. We took an empirical approach, based on actual bug-fix data to evaluate the extent to which clones are associated with code implicated in bug fixes. We find that 1) most bugs have very little to do with clones; 2) cloned code, in fact, contains less “buggy code” (viz., code implicated in bug fixes) than the rest of the system; 3) larger clone groups do not have more bugs than smaller clone groups, and in fact, making more copies of code does not introduce more defects; and furthermore, larger clone groups have lower bug density per line than smaller clone groups; 4) scattered clones across files or directories may not induce more defects; and 5) bugs with high clone content may require less effort to fix (as measured in number of lines changed to fix a bug). While others have made the argument before that clones are not to be feared, our study is the first to quantitatively validate this claim using data mined from version control and bug repositories. In addition, to our knowledge ours is the first study to consider differences between smaller and larger clone groups.

> Acknowledgements  We would like to thank Adrian Bachmann and Avi Bernstein for the Univ. of Zurich bug linking data. We also thank Lingxiao Jiang, Ghassan Mishergi, Zhendong Su and Stephane Glondu for providing us DECKARD. We extend our gratitude to anonymous reviewers for valuable comments on this paper. We acknowledge support from an IBM Faculty Fellowship, and a gift from Microsoft Research. Most of all we acknowledge with gratitude support from the NSF Science of Design Program, grant No. SoD-TEAM 0613949. Any opinions, findings, and conclusions or recommendations expressed in this material are those of the authors and do not necessarily reflect the views of the National Science Foundation.

## References

Alkhatib G (1992) The maintenance problem of application software: an empirical analysis. J Softw Maint: Res Pract 4(2):83–104. doi:10.1002/smr.4360040203

Bachmann A, Bernstein A (2009) Data retrieval, processing and linking for software process data analysis. Technical report, University of Zurich. http://www.ifi.uzh.ch/ddis/people/adrian-bachmann/pdq/. Accessed May 2009

Baker BS (1995) On finding duplication and near-duplication in large software systems. In: WCRE ’95: proceedings of the 2nd working conference on reverse engineering. IEEE Computer Society, Washington, pp 86–95. http://portal.acm.org/citation.cfm?id=836911

Balazinska M, Merlo E, Dagenais M, Lague B, Kontogiannis K (1999) Partial redesign of java software systems based on clone analysis. In: WCRE ’99: proceedings of the 6th working conference on reverse engineering. IEEE Computer Society, Washington, pp 326–336. http://portal.acm.org/citation.cfm?id=837061

Barbour L, Khomh F, Zou Y (2011) Late propagation in software clones

Baxter ID, Yahin A, Moura L, Sant’Anna M, Bier L (1998) Clone detection using abstract syntax trees. In: Proceedings of the international conference on software maintenance, pp 368–377. doi:10.1109/ICSM.1998.738528

Berkus J (2007) The 5 types of open source projects. http://www.powerpostgresql.com/5_types. Accessed 20 March 2007

Bird C, Bachmann A, Aune E, Duffy J, Bernstein A, Filkov V, Devanbu P (2009) Fair and balanced?: bias in bug-fix datasets. In: ESEC/FSE ’09: proceedings of the the 7th joint meeting of the European software engineering conference and the ACM SIGSOFT symposium on the foundations of software engineering. ACM, New York, pp 121–130. doi:10.1145/1595696.1595716

Bruntink M, van Deursen A, van Engelen R, Tourwé T (2005) On the use of clone detection for identifying crosscutting concern code. IEEE Trans Softw Eng 31(10):804–818. doi:10.1109/TSE.2005.114

Cai D, Kim M (2011) An empirical study of long-lived code clones. Fundamental approaches to software engineering, pp 432–446