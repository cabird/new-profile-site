## An Empirical Study of Practitioners’ Perspectives on Green Software Engineering

Irene Manotas α · Christian Bird β · Rui Zhang γ · David Shepherd δ  
Ciera Jaspan ε · Caitlin Sadowski ε · Lori Pollock α · James Clause α

α University of Delaware, Newark, DE, USA. {imanotas,pollock,clause}@udel.edu  
β Microsoft Research, Redmond, WA, USA. christian.bird@microsoft.com  
γ IBM Research — Almaden, San Jose, CA, USA. ruiz@us.ibm.com  
δ ABB Corporate Research, Raleigh, NC, USA. {david.shepherd,will.snipes}@us.abb.com  
ε Google, Inc., Mountain View, CA, USA. {ciera,supertri}@google.com

### ABSTRACT

The energy consumption of software is an increasing concern as the use of mobile applications, embedded systems, and data center-based services expands. While research in green software engineering is correspondingly increasing, little is known about the current practices and perspectives of software engineers in the field. This paper describes the first empirical study of how practitioners think about energy when they write requirements, design, construct, test, and maintain their software. We report findings from a quantitative, targeted survey of 464 practitioners from ABB, Google, IBM, and Microsoft, which was motivated by and supported with qualitative data from 18 in-depth interviews with Microsoft employees. The major findings and implications from the collected data contextualize existing green software engineering research and suggest directions for researchers aiming to develop strategies and tools to help practitioners improve the energy usage of their applications.

#### Categories and Subject Descriptors

D.2.0 [Software Engineering]: General

#### General Terms

Human Factors, Management

#### Keywords

Green Software Engineering; Empirical Study, Survey

### 1. INTRODUCTION

The past decade has seen a dramatic shift in the type of computing devices used by consumers and enterprises. Whereas in 2010, traditional personal computer (PC) sales (desktops and laptops) outnumbered other computing platforms, in 2013, roughly 317 million PCs were sold compared to 206 million tablets and 1.2 billion smartphones [14]. This shift has not only necessitated the development of applications that run on mobile and embedded platforms, but also the development of the data center-based services on which these mobile applications often depend. As the use of these applications and services has expanded, so too have concerns about the amount of energy that they consume.

The research community has not been blind to these changes and, as a result, green software engineering — the process of helping practitioners (architects, developers, testers, managers, etc.) write more energy efficient applications — is increasingly targeted as an important problem area by software engineering researchers. The growing number of publications in events such as the International Workshop on Green and Sustainable Software (GREENS) [16], International Workshop on Measurement and Metrics for Green and Sustainable Software (MEGSUS) [37], and the Energy Aware Software-Engineering and Development Workshop (EASED) [11] as well as tracks at conferences such as the International Conference on Software Engineering (ICSE) [23] and the International Conference on Software Maintenance and Evolution (ICSME) [24], are examples of the growing and widespread interest in this research area.

Despite its increasing popularity as a research topic, little is known about practitioners’ perspectives on green software engineering. Even basic questions such as “What types of software commonly have requirements about energy usage?”, “How does the importance of reducing energy usage compare to other requirements?”, and “How do developers find and correct energy usage issues?” do not have clear answers. Without understanding practitioners' needs, researchers may find themselves in a situation where, despite the investment of significant amounts of time and effort, tools and techniques designed to make practitioners’ lives easier are underused in practice (e.g., [3, 25]).

To help inform research in green software engineering, we have conducted both in-depth interviews of 18 Microsoft practitioners from a wide range of application domains and a quantitative, targeted survey of 464 ABB, Google, IBM, and Microsoft developers and testers. To the best of our knowledge, the interviews and survey compose the first broad-based empirical study of practitioners’ perspectives on green software engineering — how they think about battery life/