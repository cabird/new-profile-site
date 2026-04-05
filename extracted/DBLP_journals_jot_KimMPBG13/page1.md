## The Reaction of Open-Source Projects to New Language Features: An Empirical Study of C# Generics

Donghoon Kim^a, Emerson Murphy-Hill^a, Chris Parnin^b, Christian Bird^c, Ronald Garcia^d

a. North Carolina State University, Raleigh, USA  
http://www.csc.ncsu.edu/  
b. Georgia Institute of Technology, Atlanta, USA  
http://www.cc.gatech.edu/  
c. Microsoft Research, Redmond, USA  
http://research.microsoft.com/en-us/  
d. University of British Columbia, Vancouver, Canada  
https://www.cs.ubc.ca/

### Abstract

Language designers introduce new language features in programming languages because those features are claimed to be beneficial. In this paper, we investigate claims made about the generics language feature, and compare how those claims stack up in C# versus Java. Through an empirical study of the generics feature in open-source projects, we found that (1) although they have the same claimed benefits in different programming languages, generics are more readily used in C# than in Java and that the benefits of generics are manifested more clearly in C# programs, and (2) programmers rarely use the var keyword with generics, except when using very long generic expressions, suggesting that programmers prefer readability over succinct syntax, as long as the syntax does not become overly verbose.

Many of these observed differences may be attributed to subtle differences in implementation and are consistent with the notion that crafting the user experience of a programming language feature can impact how the feature is adopted and embraced by developers.

**Keywords:** empirical study, generics, C#, static analysis