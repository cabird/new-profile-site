# Learning Natural Coding Conventions

Miltiadis Allamanis†  Earl T. Barr‡  Christian Bird*  Charles Sutton†  
† School of Informatics, University of Edinburgh, Edinburgh, EH8 9AB, UK  
‡ Dept. of Computer Science, University College London, London, UK  
* Microsoft Research, Microsoft, Redmond, WA, USA  
{m.allamanis, csutton}@ed.ac.uk  e.barr@ucl.ac.uk  cbird@microsoft.com

## ABSTRACT

Every programmer has a characteristic style, ranging from preferences about identifier naming to preferences about object relationships and design patterns. Coding conventions define a consistent syntactic style, fostering readability and hence maintainability. When collaborating, programmers strive to obey a project's coding conventions. However, one third of reviews of changes contain feedback about coding conventions, indicating that programmers do not always follow them and that project members care deeply about adherence. Unfortunately, programmers are often unaware of coding conventions because inferring them requires a global view, one that aggregates the many local decisions programmers make and identifies emergent consensus on style. We present NATURALIZE, a framework that learns the style of a codebase, and suggests revisions to improve stylistic consistency. NATURALIZE builds on recent work in applying statistical natural language processing to source code. We apply NATURALIZE to suggest natural identifier names and formatting conventions. We present four tools focused on ensuring natural code during development and release management, including code review. NATURALIZE achieves 94% accuracy in its top suggestions for identifier names. We used NATURALIZE to generate 18 patches for 5 open source projects: 14 were accepted.

Categories and Subject Descriptors: D.2.3 [Software Engineering]: Coding Tools and Techniques  
General Terms: Algorithms  
Keywords: Coding conventions, naturalness of software

A convention is “an equilibrium that everyone expects in interactions that have more than one equilibrium” [74]. For us, coding conventions arise out of the collision of the stylistic choices of programmers. A coding convention is a syntactic restriction not imposed by a programming language’s grammar. Nonetheless, these choices are important enough that they are enforced by software teams. Indeed, our investigations indicate that developers enforce such coding conventions rigorously, with roughly one third of code reviews containing feedback about following them (Section 4.1).

Like the rules of society at large, coding conventions fall into two broad categories: laws, explicitly stated and enforced rules, and mores, unspoken common practice that emerges spontaneously. Mores pose a particular challenge: because they arise spontaneously from emergent consensus, they are inherently difficult to codify into a fixed set of rules, so rule-based formatters cannot enforce them, and even programmers themselves have difficulty adhering to all of the implicit mores of a codebase. Furthermore, popular code changes constantly, and these changes necessarily embody stylistic decisions, sometimes generating new conventions and sometimes changing existing ones. To address this, we introduce the coding convention inference problem, the problem of automatically learning the coding conventions consistently used in a body of source code.

Conventions are pervasive in software, ranging from preferences about identifier names to preferences about class layout, object relationships, and design patterns. In this paper, we focus as a first step on local, syntactic conventions, namely, identifier naming and formatting. These are particularly active topics of concern among developers, for example, almost one quarter of the code reviews that we examined contained suggestions about naming.

We introduce NATURALIZE, a framework that solves the coding convention inference problem for local conventions, offering suggestions to increase the stylistic consistency of a codebase. NATURALIZE can also be applied to infer rules for existing rule-based formatters. NATURALIZE is descriptive, not prescriptive1: it learns what programmers actually do. When a codebase does not reflect consensus on a convention, NATURALIZE recommends nothing, because it has not learned anything with sufficient confidence to make recommendations. The naturalness insight of Hindle et al. [35], building on Gabel and Su [28], is that most short code utterances, like natural language utterances, are simple and repetitive. Large corpus statistical inference can discover and exploit this naturalness to improve developer productivity and code robustness. We show that coding conventions are natural in this sense.

Learning from local context allows NATURALIZE to learn syntactic restrictions, or sub-grammars, on identifier names like camelcase

Keywords: Coding conventions, naturalness of software

## 1 Introduction

To program is to make a series of choices, ranging from design decisions—like how to decompose a problem into functions—to the choice of identifier names and how to format the code. While local and syntactic, the latter are important: names connect program source to its problem domain [13, 43, 44, 68]; formatting decisions usually capture control flow [36]. Together, naming and formatting decisions determine the readability of a program’s source code, increasing a codebase’s portability, its accessibility to newcomers, its reliability, and its maintainability [55, §1.1]. Apple’s recent, infamous bug in its handling of SSL certificates [7, 40] exemplifies the impact that formatting can have on reliability. Maintainability is especially important since developers spend the majority (80%) of their time maintaining code [2, §6].