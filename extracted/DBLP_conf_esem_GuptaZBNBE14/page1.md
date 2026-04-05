## Mining Energy Traces to Aid in Software Development:  
An Empirical Case Study

Ashish Gupta1, Thomas Zimmermann2, Christian Bird2,  
Nachiappan Nagappan2, Thirumalesh Bhat3, Syed Emran3  
1 Stanford University, Stanford, CA, USA  
2 Microsoft Research, Redmond, WA, USA  
3 Windows Phone, Microsoft Corporation, Redmond, WA, USA  
ashgup@stanford.edu {tzimmer, cbird, nachin, thirub, semran}@microsoft.com

### ABSTRACT
With the advent of increased computing on mobile devices such as phones and tablets, it has become crucial to pay attention to the energy consumption of mobile applications. The software engineering field is now faced with a whole new spectrum of energy-related challenges, ranging from power budgeting to testing and debugging the energy consumption. In this paper, we present our work on analyzing energy patterns for the Windows Phone platform. We first describe the data that is collected for testing (power traces and execution logs). We then present several approaches for describing power consumption and detecting anomalous energy patterns and potential energy defects. Finally we show prediction models based on usage of individual modules that can estimate the overall energy consumption with high accuracy. The techniques presented in the paper allow assessing the individual impact of modules on the overall energy consumption and support overall energy planning.

Categories and Subject Descriptors  
D.2.5 [Software Engineering]: Testing and Debugging.

General Terms  
Measurement, Experimentation.

1. INTRODUCTION
For several decades, power consumption has been a secondary concern (if a concern at all) in software engineering.1 Most software has been developed for desktop computers, which have a continuous power supply. While industries like satellite sciences and healthcare have been traditionally more power-aware, the general software engineering community did not have the need to research power consumption. This is about to change—or depending on the viewpoint has changed now. With mobile phones and tablets gaining wide usage in everyday life, new challenges are brought to software development. There are many stakeholders that now care about power: end-users realize that certain applications can reduce battery life dramatically and consider energy consumption as an important quality attribute.

Permission to make digital or hard copies of all or part of this work for personal or classroom use is granted without fee provided that copies are not made or distributed for profit or commercial advantage and that copies bear this notice and the full citation on the first page. To copy otherwise, or republish, to post on servers or to redistribute to lists, requires prior specific permission and/or a fee.  
ESEM’14, September 18–19, 2014, Torino, Italy.  
Copyright 2014 ACM 978-1-4503-2774-9/14/09...$15.00

> “I have researched all the many ways to save battery life. I have apps that kill other apps. I turn off Wi-Fi and 4G and Bluetooth until I need them.”  
> —Scott Adams, creator of Dilbert [1]
>
> As a consequence building energy-efficient applications becomes important for developers, both application and operating system (OS) developers. There are many ways that a developer can influence the power consumption of a mobile app, for example, the decision to use TCP vs. UDP, or keeping sockets and connections open longer than needed. Another example is making a lot of requests to a server instead of batching up requests so that they utilize wireless connectivity (a high energy component) effectively. Ultimately power consumption comes down to how the hardware components are used, but these are driven by software design decisions. In this paper, we introduce a methodology for collecting and analyzing power data on mobile devices running Windows Phone 7. Our methodology focuses on three parts: (1) describe and quantify power consumption, (2) detect anomalies in power consumption, and (3) predict power consumption. Anomalies identified by our approach have been confirmed as true defects by developers who used the anomalies to perform root-cause-analysis to detect defects in phone software. More specifically, we focus on the following questions:

questions:
- What modules consume the most power?2 (Section 5)  
- What are characteristic energy shape patterns of certain modules? Can we find anomalous energy patterns? (Section 6)  
- Can we predict power consumption? (Section 7)

These results hold value for major stakeholders in mobile devices. The OS platform developers and application developers specifically need to be aware of individual energy consumption patterns and can use overall prediction models to determine the energy usage in a particular scenario to decide on the need for energy optimizations or rethink the design aspects of the scenario. End-users need to be aware of the energy consumption levels to plan better for the battery life under different load conditions. These are two simple situations where knowing about energy patterns is of value.

1 Throughout the rest of this paper we use the term energy and power interchangeably.  
2 We use the term modules (or components) for executable files and shared libraries.