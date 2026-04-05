## Java Generics Adoption: How New Features are Introduced, Championed, or Ignored

Chris Parnin  
College of Computing, Georgia Institute of Technology  
Atlanta, Georgia  
chris.parnin@gatech.edu

Christian Bird  
Microsoft Research  
Redmond, Washington  
cbird@microsoft.com

Emerson Murphy-Hill  
Dept. of Computer Science, North Carolina State University  
Raleigh, North Carolina  
emerson@csc.ncsu.edu

### ABSTRACT
Support for generic programming was added to the Java language in 2004, representing perhaps the most significant change to one of the most widely used programming languages today. Researchers and language designers anticipated this addition would relieve many long-standing problems plaguing developers, but surprisingly, no one has yet measured whether generics actually provide such relief. In this paper, we report on the first empirical investigation into how Java generics have been integrated into open source software by automatically mining the history of 20 popular open source Java programs, traversing more than 500 million lines of code in the process. We evaluate five hypotheses, each based on assertions made by prior researchers, about how Java developers use generics. For example, our results suggest that generics do not significantly reduce the number of type casts and that generics are usually adopted by a single champion in a project, rather than all committers.

### Categories and Subject Descriptors
D.3.3 [Language Constructs and Features]: Data types and structures; F.3.3 [Studies of Program Constructs]: Type structure

### General Terms
Languages, Experimentation

### Keywords
generics, Java, languages, post-mortem analysis

## 1. INTRODUCTION
Programming languages and tools evolve to match industry trends, revolutionary shifts, or refined developer tastes. But not all evolutions are successes; the technology landscape is pocked with examples of evolutionary dead-ends and dead-on-arrival concepts.

Permission to make digital or hard copies of all or part of this work for

Far too often, greatly heralded claims and visions of new language features fail to hold or persist in practice. Discussions of the costs and benefits of language features can easily devolve into a religious war with both sides armed with little more than anecdotes [13]. Empirical evidence about the adoption and use of past language features should inform and encourage a more rational discussion when designing language features and considering how they should be deployed. Collecting this evidence is not just sensible but a responsibility of our community.

In this paper, we examine the adoption and use of generics, which were introduced into the Java language in 2004. When Sun introduced generics, they claimed that the language feature was "a long-awaited enhancement to the type system" that "eliminates the drudgery of casting." Sun recommended that programmers "should use generics everywhere [they] can. The extra efforts in generifying code is well worth the gains in clarity and type safety." But is it?

Here, we take the first look at how features of Java generics, such as type declarations, type-safe collections, generic methods, and wildcards, have been introduced and used in real programs. With the benefit of six years of hindsight, we investigate how the predictions, assertions, and claims that were initially made by both research and industry have played out in the wild. Further, we investigate the course and timeline of adoption: what happens to old code, who buys in, how soon are features adopted, and how many projects and people ignore new features? The results allow us to adjust our expectations about how developers will adopt future language features.

We make the following contributions in this paper:
- we enumerate the assumptions and claims made in the past about Java generics (Section 3);
- we investigate how 20 open source projects have used—and have not used—Java generics (Section 5 to 7); and
- we discuss the implications of the adoption and usage patterns of generics (Section 8).

## 2. AN OVERVIEW OF GENERICS
In this section we briefly describe the motivation and use of generics. In an effort to maintain consistent terminology, we present in bold the terms that we use in this paper, drawing from standard terminology where possible. Readers who are familiar with Java generics may safely skip this section.

1 http://download.oracle.com/javase/1.5.0/docs/guide/language/generics.html