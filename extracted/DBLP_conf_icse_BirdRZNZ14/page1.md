## Extrinsic Influence Factors in Software Reliability:  
A Study of 200,000 Windows Machines

Christian Bird *  Venkatesh-Prasad Ranganath #  Thomas Zimmermann *  
Nachiappan Nagappan *  Andreas Zeller +

* Microsoft Research, Washington, USA  
Kansas State University, Kansas, USA  
+ Saarland University, Saarbrücken, Germany

{cbird, tzimmer, nachin}@microsoft.com  rvprasad@ksu.edu  zeller@cs.uni-saarland.de

### ABSTRACT
Reliability of software depends not only on intrinsic factors such as its code properties, but also on extrinsic factors—that is, the properties of the environment it operates in. In an empirical study of more than 200,000 Windows users, we found that the reliability of individual applications is related to whether and which other applications are installed: While games and file-sharing applications tend to decrease the reliability of other applications, security applications tend to increase it. Furthermore, application reliability is related to the usage profiles of these applications; generally, the more an application is used, the more likely it is to have negative impact on reliability of others. As a consequence, software testers must be careful to investigate and control these factors.

### Categories and Subject Descriptors
D.2.4 [Software Engineering]: Software/Program Verification – reliability, statistical methods; D.4.5 [Operating Systems]: Reliability; C.4 [Performance of Systems] – measurement techniques; reliability, availability, and serviceability; D.2.5 [Software Engineering]: Testing and Debugging – monitors, tracing;

### General Terms
Reliability, Measurement

### Keywords
Windows

### 1. INTRODUCTION
When assessing the reliability of an application, for instance during in-house testing, one must make reasonable assumptions on what can and what cannot happen in the environment. For instance, a new application would be tested on a specific set of hardware and operating system configurations. As the operating system shields applications from influencing each other directly, one might assume that it should not matter whether other applications are installed or being used. But does this assumption hold?

As a computer user, you may have experienced applications being incompatible with each other. If you install the popular Steam games platform on your Windows PC, for instance, there are no less than 75 other applications known to cause issues with Steam and playing games [1]. The list includes popular anti-virus software such as BitDefender, communication software such as Skype, or backup software such as Western Digital Backup Anywhere. For six out of the 75 applications, Steam support recommends that they “be fully uninstalled from your system if disabling them does not resolve the issue.”

Such incompatibilities are not uncommon: When installing Kaspersky Anti-Virus software, it automatically uninstalls incompatible products (most of these being other anti-virus programs) from a list of 593 programs; another 173 are deleted after obtaining user confirmation [2]. Clearly, some programs are not meant to peacefully co-exist on your system.

In this paper we investigate how the environment of a software application determines its reliability. We address questions such as: How frequent are such incompatibilities between applications? How would an application’s reliability be affected by its environment—be it other applications, the system configuration, or hardware? What do such influences imply as it comes to assessing software reliability?

To answer these questions, we analyzed reliability data from more than 200,000 users of Microsoft Windows and associated crashes of the most frequently used applications with software and hardware features. We introduce and use a method of data analysis that we term “Influence Factors” – a general pattern that untangles the influences of many factors on many different outcomes that we describe in detail in Section 3.5. This pattern enabled us to determine which software and hardware configurations are the most failure-prone; and which extrinsic factors (factors in the environment) determine the reliability of individual applications. Our key findings include:

- A lower reliability of an application can be related to simply using another single application;
- Usage of file-sharing programs universally correlates with lower application reliability;
- The mere installation of one application may affect the reliability of others;
- While most security applications increase reliability, there are also ones that correlate with decreased reliability; and
- Less powerful hardware correlates with lower application reliability.

In practice, this means that even the best-written software may fail due to interference with other applications; and therefore, users do and will experience failures for which no single vendor is responsible. This alone may not come as a surprise to computer users. However, to our knowledge, this study is the first to analyze the problem and to quantify its extent.

Permission to make digital or hard copies of all or part of this work for personal or classroom use is granted without fee provided that copies are not made or distributed for profit or commercial advantage and that copies bear this notice and the full citation on the first page. To copy otherwise, or republish, to post on servers or to redistribute to lists, requires prior specific permission and/or a fee. ICSE'14, May 31 – June 7, 2014, Hyderabad, India. Copyright 2014 ACM 978-1-4503-2768-8/14/05... $15.00.

Our findings have a number of consequences for future research and development, ranging from inconvenient to challenging: