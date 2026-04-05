## Adoption and use of Java generics

Chris Parnin · Christian Bird · Emerson Murphy-Hill

Published online: 6 December 2012  
© Springer Science+Business Media New York 2012

## Abstract
Support for generic programming was added to the Java language in 2004, representing perhaps the most significant change to one of the most widely used programming languages today. Researchers and language designers anticipated this addition would relieve many long-standing problems plaguing developers, but surprisingly, no one has yet measured how generics have been adopted and used in practice. In this paper, we report on the first empirical investigation into how Java generics have been integrated into open source software by automatically mining the history of 40 popular open source Java programs, traversing more than 650 million lines of code in the process. We evaluate five hypotheses and research questions about how Java developers use generics. For example, our results suggest that generics sometimes reduce the number of type casts and that generics are usually adopted by a single champion in a project, rather than all committers. We also offer insights into why some features may be adopted sooner and others features may be held back.

### Keywords
Generics · Annotations · Java · Languages · Post-mortem analysis

> Communicated by Arie van Deursen, Tao Xie, and Thomas Zimmermann  
>  
> C. Parnin  
> College of Computing, Georgia Institute of Technology, Atlanta, GA 30332, USA  
> e-mail: chris.parnin@gatech.edu  
>  
> C. Bird  
> Microsoft Research, Redmond, WA 98052, USA  
> e-mail: cbird@microsoft.com  
>  
> E. Murphy-Hill (✉)  
> Department of Computer Science,  
> North Carolina State University, Raleigh, NC 27695, USA  
> e-mail: emerson@csc.ncsu.edu