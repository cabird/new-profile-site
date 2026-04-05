## Empirical Software Engineering at Microsoft Research

http://research.microsoft.com/en-us/projects/esm/

Christian Bird — cbird@microsoft.com  
Brendan Murphy — bmurphy@microsoft.com  
Nachiappan Nagappan — nachin@microsoft.com  
Thomas Zimmermann — tzimmer@microsoft.com

Microsoft Research, Redmond, USA and Cambridge, UK  
(Authors are in alphabetical order.)

### ABSTRACT
We describe the activities of the Empirical Software Engineering (ESE) group at Microsoft Research. We highlight our research themes and activities using examples from our research on socio-technical congruence, bug reporting and triaging, and data-driven software engineering to illustrate our relationship to the CSCW community. We highlight our unique ability to leverage industrial data and developers and the ability to make near-term impact on Microsoft via the results of our studies. We also present the collaborations our group has with academic researchers.

### Author Keywords
Software engineering, socio-technical congruence, bug tracking and triaging, data-driven software engineering

### ACM Classification Keywords
D.2.5 [Software Engineering]: Testing and Debugging; D.2.7 [Software Engineering]: Distribution, Maintenance, and Enhancement

### ACM General Terms
Human Factors, Management, Measurement

### INTRODUCTION
The Empirical Software Engineering (ESE) group at Microsoft Research focuses on working in the intersection of the Software Engineering and CSCW communities.

> “Over the last decade, it has become clear that empirical studies are a fundamental component of software engineering research and practice: Software development practices and technologies must be investigated by empirical means in order to be understood, evaluated, and deployed in proper contexts. This stems from the observation that higher software quality and productivity have more chances to be achieved if well-understood, tested practices and technologies are introduced in software development. Empirical studies usually involve the collection and analysis of data and experience that can be used to characterize, evaluate and reveal relationships between software development deliverables, practices, and technologies.”  
> (Empirical Software Engineering journal, http://www.springer.com/computer/swe/journal/10664)

> At a high level the goals of the ESE follow two guiding principles,
> - Empower software development teams
> - To gain insight from product, process, people and customers
>
> by employing a qualitative and quantitative approach to the software development process.
>
> In this paper we discuss three broad themes of the ESE group,
> - Socio-technical congruence;
> - Bug reporting and triaging; and
> - Data-driven software engineering.

In each of these sections our studies leverage techniques and methods from both the Software Engineering and CSCW communities to adapt case studies in practice from the empirical domain with the CSCW aspects as all software systems which are built by teams inherently have a significant collaborative aspect. We also present our collaborations and discuss the uniqueness of our fit in the middle of these two communities.

### SOCIO TECHNICAL CONGRUENCE
> “Design and programming are human activities; forget that and all is lost”  
> – Bjarne Stroustrup

As software projects grow in size and complexity, so do the teams of engineers that develop and maintain them. Brooks, in his seminal work, “The Mythical Man-Month” [1] discussed coordination as one of the key problems of running a software project with many developers. The coordination effort required to help each member of a team stay in sync and keep a project on schedule is enormous.

Socio-technical congruence is a term that has emerged recently in the software engineering literature to describe the relationship between the “social” side of development, meaning the developers, their relationships to each other, how they communicate, work together on software, etc., and the “technical” side which encapsulates features of the software itself such as dependencies between components, component complexity, and software quality. The idea behind the term has its origins in Conway’s Law, originally presented in Conway’s paper “How Do Committees Invent” [2]. This is of importance to the CSCW community because