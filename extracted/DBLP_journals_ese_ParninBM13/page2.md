## 1 Introduction

Programming languages and tools evolve to match industry trends, revolutionary shifts, or refined developer tastes. But not all evolutions are successes; the technology landscape is pocked with examples of evolutionary dead-ends and dead-on-arrival concepts.

Far too often, greatly heralded claims and visions of new language features fail to hold or persist in practice. Discussions of the costs and benefits of language features can easily devolve into a religious war with both sides armed with little more than anecdotes (Markstrum 2010). Empirical evidence about the adoption and use of past language features should inform and encourage a more rational discussion when designing language features and considering how they should be deployed. Collecting this evidence is not just sensible but a responsibility of our community.

In this paper, we examine the adoption and use of generics, which were introduced as Java version 5 in 2004. We take the first look at how features of Java generics, such as type declarations, type-safe collections, generic methods, and wildcards, have been introduced and used in real programs. With the benefit of seven years of hindsight, we investigate how the predictions, assertions, and claims that were initially made by both research and industry have played out in the wild. Further, we investigate the course and timeline of adoption: what happens to old code, who buys in, how soon are features adopted, and how many projects and people ignore new features? The results allow us to adjust our expectations about how developers will adopt future language features.

This paper extends our prior MSR 2011 paper (Parnin et al. 2011), where we made the following contributions:

- We enumerate the assumptions and claims made in the past about Java generics (Section 3);
- We investigate how 20 open source projects have used—and have not used—Java generics (Sections 5–7); and
- We discuss the implications of the adoption and usage patterns of generics (Section 9).

In the prior paper, we examined our research questions and hypotheses from the perspective of established projects, projects which started before generics. This perspective was unique in that it allowed us to observe the impact of a new feature on an existing code base. In the present paper, we contrast our prior results with the adoption patterns of recent projects, projects which started after generics and may offer different perspectives. Second, we also wanted to compare the adoption of Java generics with another feature, Java annotations, that were released in conjunction with generics in the Java 5 release. By examining annotations, an arguably less risky and simpler feature, we have the ability to tease apart some of the factors that influence adoption; for instance, was Java Virtual Machine compatibility the main barrier to adoption, or was it something else?

In this paper, we add the following new contributions:

- We explore 20 new open source projects that were initiated after the introduction of generics; and
- We contrast our findings about generics with data on another language feature, Java annotations.