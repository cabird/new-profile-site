## 8. DISCUSSION AND FUTURE WORK

Overall, we were surprised by several of our findings about generics, which are at odds with our initial hypotheses. For instance, we were surprised that over half of the projects and developers we studied did not use generics; for those that did, use was consistently narrow. Empirically, we have found that generics are almost entirely used to either hold or traverse collections of objects in a type-safe manner. Indeed, had the language designers of Java generics instead opted to introduce a single StringList class, then they would have succeeded in satisfying 25% of Java generic usage.

Although we found some merit to claims of reducing code duplication, we found the impact to be limited in scope. A surprisingly dubious argument is that casts are reduced with use of generics. In future studies, we would like to investigate in more detail the underlying reason.

This could well indicate that a language enhancement as large scale and sweeping as generics may have been more than what was really needed. Perhaps, language designers can take this to heart: in addition to the many difficulties inherent in adding generics to the Java language, designers had heated debates regarding the finer points of semantics. James Gosling, known as the father of the Java language, portrayed discussion of generics as a “food fight” and that “generics is the thing that caused Bill Joy and I to get as close to physical violence as we’ve ever gotten” [12].

While our results have painted a broad picture of how generics are used, different projects adopted generics at different times, and different people made use of generics in different ways. In the future we plan to better understand what are deciding factors or barriers for adopting new language features by contacting the developers to understand their thoughts and opinions of generics. We have measured use of generics by examining the frequency of their occurrences within the source code, but there may be other measures of impact such as number of uses dynamically at run-time and we are investigating these measures. Further, we plan on manually inspecting less-frequently used aspects of generics to more qualitatively identify the value and impact of generics on the software.

## 9. CONCLUSION

We have explored how Java developers have used, and not used, Java generics over the past few years. We uncovered surprising generics usage trends, but also observed variation between projects and between developers. However, the results presented here illustrate only broad trends; future work will explain why these trends and variations exist.

While we expect that our retrospective results will, at this point, have little impact on Java generics, our results may help us adjust our expectations about the adoption of future language features. For example, based on our results, developers may not replace old code with new language features, so perhaps the introduction of a language feature alone is not enough to assure adoption. In future language-design wars, we hope that empirical data about how developers use language features may be an antidote to anecdotes.

### Acknowledgements

Thanks to NCSU students Brad Herrin, Michael Kolbas, and Chris Suich, who contributed code to our analysis framework. Thanks to Jonathan Aldrich, Andrew Black, Prem Devanbu, Mike Ernst, Ron Garcia, Gail Murphy, Zhendong Su, and Thomas Zimmerman, who provided valuable advice.

## 10. REFERENCES

[1] H. Basit, D. Rajapakse, and S. Jarzabek. An empirical study on limits of clone unification using generics. In Proceedings of the 17th International Conference on Software Engineering and Knowledge Engineering, pages 109–114, 2005.

[2] Y. Benjamini and Y. Hochberg. Controlling the False Discovery Rate: A Practical and Powerful Approach to Multiple Testing. Journal of the Royal Statistical Society. Series B (Methodological), 57(1):289–300, 1995.

[3] J. Bloch. Effective Java. Prentice-Hall PTR, 2nd edition, 2008.

[4] G. Bracha. Lesson: Generics. Web. http://download.oracle.com/javase/tutorial/extra/generics/index.html.

[5] G. Bracha. Generics in the Java programming language. Web, July 2005. http://java.sun.com/j2se/1.5/pdf/generics-tutorial.pdf.

[6] A. Donovan, A. Kieźun, M. S. Tschantz, and M. D. Ernst. Converting java programs to use generic libraries. In OOPSLA ’04: Proceedings of the 19th annual ACM SIGPLAN conference on Object-oriented programming, systems, languages, and applications, 2004.

[7] S. Dowdy, S. Wearden, and D. Chilko. Statistics for research. John Wiley & Sons, third edition, 2004.

[8] N. Ducheneaut. Socialization in an Open Source Software Community: A Socio-Technical Analysis. Computer Supported Cooperative Work (CSCW), 14(4):323–368, 2005.

[9] R. Fuhrer, F. Tip, A. Kieżun, J. Dolby, and M. Keller. Efficiently refactoring Java applications to use generic libraries. European Conference on Object Oriented Programming, pages 71–96, 2005.

[10] R. Geiger, B. Fluri, H. Gall, and M. Pinzger. Relation of code clones and change couplings. Fundamental Approaches to Software Engineering, 3922:411–425, 2006.

[11] W. S. Humphrey. A Discipline for Software Engineering. Addison-Wesley Longman Publishing, 1995.

[12] D. Intersimone. New additions to the Java language. Java One 2001 Keynote delivered by James Gosling. Web. http://edn.embarcadero.com/article/27440.

[13] S. Markstrum. Staking claims: A history of programming language design claims and evidence. In Proceedings of the Workshop on the Evaluation and Usability of Programming Languages and Tools, 2010.

[14] A. Mockus, R. Fielding, and J. Herbsleb. Two case studies of open source software development: Apache and Mozilla. ACM Transactions on Software Engineering and Methodology (TOSEM), 11(3):309–346, 2002.

[15] A. Monden, D. Nakae, T. Kamiya, S. Sato, and K. Matsumoto. Software Quality Analysis by Code Clones in Industrial Legacy Software. In Proceedings of the 8th International Symposium on Software Metrics, 2002.

[16] M. Naftalin and P. Wadler. Java generics and collections. O’Reilly Media, Inc., 2006.

[17] S. O’Mahony and F. Ferraro. The emergence of governance in an open source community. Academy of Management Journal, 50(5):1079–1106, 2007.

[18] V. Pankratius, A. Adl-Tabatabai, and F. Otto. Does Transactional Memory Keep Its Promises?: Results from an Empirical Study. Technical Report 2009-12, Universität Karlsruhe, Fakultät für Informatik, 2009.

[19] D. Vandevoorde and N. Josuttis. C++ templates: the Complete Guide. Addison-Wesley Professional, 2003.

[20] T. Zimmermann. Fine-grained Processing of CVS Archives with APFEL. In Proceedings of the OOPSLA Workshop on Eclipse Technology eXchange. ACM Press, 2006.