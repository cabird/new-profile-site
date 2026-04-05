## 6.3 Implications

Our results have implications for language design and in fact have already begun to inform language designers. As an example, TouchDevelop5, a language designed to enable easy development on mobile devices, currently has no support for generics. After we discussed our empirical results with the language’s designers, they chose not to add support for generics in an upcoming release. They concluded that adding generics would bring too much complexity for little gain and most functionality could be provided with special collection libraries based on our findings (1) that collections of strings (e.g., sets, lists, dictionaries) account for a large majority of generics use and (2) that developers use standard generic classes much more than they create them.

## 7 Conclusion

Throughout the empirical study of C# generics, we investigated the claimed benefits from language designers and whether the benefits hold in real open-source projects. We compared the results of C# generics with those of Java generics. The results suggest that the percentage of C# developers using generics is larger than that of Java developers using generics. Specifically, we showed that several benefits of the generics feature are manifested more clearly in C# than in Java. Based on these results and those for Ada and Java generics, we have found that developers may not always reap the benefits of language features in different implementations. While our results are interesting, there remain several limitations to our approach, and further research is necessary to validate whether our findings apply more broadly. Nonetheless, we hope that our experimental results can assist language designers in making evidence-based decisions when introducing language features, which in turn will amplify the benefits of those features in practice.

## A Appendix

In this Appendix, we show extended figures for all projects.

5 http://www.touchdevelop.com