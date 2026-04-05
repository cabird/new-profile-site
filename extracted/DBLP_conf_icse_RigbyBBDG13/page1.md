# What Effect does Distributed Version Control have on OSS Project Organization?

Peter C. Rigby∗, Earl T. Barr†, Christian Bird‡, Prem Devanbu§, Daniel M. German¶  
∗Concordia University, Montreal, Canada  
†University College London, London, UK  
§University of California, Davis, USA  
‡Microsoft Research, Redmond, USA  
¶University of Victoria, Canada  
peter.rigby@concordia.ca, etbarr@ucl.uk, cbird@microsoft.com, ptdevanbu@ucdavis.edu, dmg@cs.uvic.ca

> **Abstract—** Many Open Source Software (OSS) projects are moving from Centralized Version Control (CVC) to Distributed Version Control (DVC). The effect of this shift on project organization and developer collaboration is not well understood. In this paper, we use a theoretical argument to evaluate the appropriateness of using DVC in the context of two very common organization forms in OSS: a dictatorship and a peer group. We find that DVC facilitates large hierarchical communities as well as smaller groups of developers, while CVC allows for consensus-building by a peer group. We also find that the flexibility of DVC systems allows for diverse styles of developer collaboration. With CVC, changes flow up and down (and publicly) via a central repository. In contrast, DVC facilitates collaboration in which work output can flow sideways (and privately) between collaborators, with no repository being inherently more important or central. These sideways flows are a relatively new concept. Developers on the Linux project, who tend to be experienced DVC users, cluster around “sandboxes:” repositories where developers can work together on a particular topic, isolating their changes from other developers. In this work, we focus on two large, mature OSS projects to illustrate these findings. However, we suggest that social media sites like GitHub may engender other original styles of collaboration that deserve further study.

## I. INTRODUCTION

Large, complex software systems must be modularized to allow for effective collaboration among developers working on related areas and to isolate developers from changes that are unrelated to their work [1]. Version control (VC) complements this modularity by allowing developers to work independently and then merge their changes with other developers’ changes [2]. The traditional, Centralized VC (CVC) model is simple: developers work on a change and then commit it to a central repository, merging and resolving any conflicting changes. This centrality forces developers to constantly deal with changes from a diverse set of developers and limits the ability of developers to isolate their work and collaborate with others. In contrast, with Distributed VC (DVC), there is no inherently central repository. Each developer has a full copy of the entire history of the system, and developers are free to share changes between any repository, provided that at some point the repositories had

a common ancestor [3]. However, certain repositories can become organizationally important within the development community. With this flexibility comes complex interactions that have not been adequately studied by the software engineering community. In this paper, we examine the styles of project governance that DVC can support as well as the ways in which small groups of developers cooperate on topic specific (i.e., “sandbox”) repositories. The paper is organized around two research questions:

### Q1: How well does DVC support the two common styles of OSS project governance?
Most large, successful OSS projects are structured around a single developer or integrator (a “dictator”) or a group of trusted peers (an oligarchy) [4]. Using these two governance models, we compare DVC to CVC in terms of the number of exchanges a developer must make to acquire the current version of the system. We develop a hypothesis and test it in a case study comparing Linux to FreeBSD.

### Q2: What impact does DVC have on the way individual developers and small subgroups collaborate?
With a central repository developers must discuss and reach a consensus on which changes to include. In contrast, with DVC, each developer has the final say in what makes it into his or her personal repository. Like-minded developers can come together to work on a particular topic in relative isolation. They collaborate in a development sandbox, a set of branches that represents a project fork that can be used by other developers or incorporated into the repository from which “official” releases are made. We illustrate the concept of sandboxes with examples from Linux.

## II. METHOD AND PROJECTS

We use Linux to evaluate hypotheses and questions regarding advanced DVC usage because the Linux kernel project has never used a CVC and its developers are generally very experienced with the DVC git. As a contrast to Linux, we select FreeBSD, which at the time of our analysis used CVS and has now transitioned to SVN, both CVCs. While both projects are UNIX kernels, we do not compare these projects technically or in terms of productivity, since