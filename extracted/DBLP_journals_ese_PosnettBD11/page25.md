Sample size is only three projects, all of which are written in the Java programming language. While this gives evidence of the ability of our results to generalize, further study on more projects and different languages will increase our confidence in these findings as answers to the research questions on a broad level.

## 8 Conclusion

Our analysis of earlier papers on change-proneness of design pattern roles suggested that the differences in change-proneness of pattern roles might be explained by the simpler, purely structural metapattern roles. In fact, when we controlled for sizes, both pattern and metapattern roles showed only minor differences. Next, we also noted a significant association between both pattern and metapattern roles and size. We argue therefore that the previously reported association of pattern roles with change-proneness might, in fact, be due to the size variations in the classes playing the roles.

We believe that metapatterns can be useful in studying design pattern behaviors in software systems. We have shown that some beliefs about the intuition of design patterns can be captured by metapatterns. Metapatterns can yield interpretable results due to their abstract nature and smaller set of role behaviors.

E. B. Swanson identified three categories of maintenance: corrective, adaptive, and perfective (Swanson 1976). In this study, we do not distinguish between these different maintenance activities; hence, interpretation of our results may be dependent on the underlying distribution of change type. While the strength of this dependence is worthy of consideration, this is left as future work.

Measuring the size of a class is simple, fast, and accurate; finding its pattern roles (or even its meta-pattern roles) is substantially more difficult and error-prone. Therefore, pragmatically, if one is seeking to get an indication of which classes might be change-prone, our study suggests that it might be best to ignore pattern roles altogether, and just use size as an indicator.

However, pattern roles might be known early in the design process, and thus would be an early and useful indicator of the eventual future sizes of classes playing those roles. This expected future size, in turn, is a useful indicator of change-proneness.

### Acknowledgements

Our thanks to Yann-Gaël Guéhéneuc for allowing the use of the Ptidej toolset and pattern detection data, Beat Fluri for his change distiller tool, and to Sci-Tech corporation for providing academic use of Understand for Java.

### Open Access

> This article is distributed under the terms of the Creative Commons Attribution Noncommercial License which permits any noncommercial use, distribution, and reproduction in any medium, provided the original author(s) and source are credited.

## References

Aversano L, Canfora G, Cerulo L, Grosso CD, Di Penta M (2007) An empirical study on the evolution of design patterns. In: ESEC-FSE ’07: proceedings of the 6th joint meeting of the European software engineering conference and the ACM SIGSOFT symposium on the foundations of software engineering. ACM, New York, pp 385–394. ISBN 978-1-59593-811-4. doi:10.1145/1287624.1287680

Basili V, Elbaum S (2006) Empirically driven SE research: state of the art and required maturity. In: ICSE ’06: proceedings of the 28th international conference on software engineering. ACM, New York, pp 32–32. ISBN 1-59593-375-1. doi:10.1145/1134285.1134291