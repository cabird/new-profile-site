# Learning from, Understanding, and Supporting DevOps Artifacts for Docker

Jordan Henkel  
University of Wisconsin–Madison, USA  
jjhenkel@cs.wisc.edu

Shuvendu K. Lahiri  
Microsoft Research, USA  
Shuvendu.Lahiri@microsoft.com

Christian Bird  
Microsoft Research, USA  
Christian.Bird@microsoft.com

Thomas Reps  
University of Wisconsin–Madison, USA  
reps@cs.wisc.edu

## ABSTRACT

With the growing use of DevOps tools and frameworks, there is an increased need for tools and techniques that support more than code. The current state-of-the-art in static developer assistance for tools like Docker is limited to shallow syntactic validation. We identify three core challenges in the realm of learning from, understanding, and supporting developers writing DevOps artifacts: (i) nested languages in DevOps artifacts, (ii) rule mining, and (iii) the lack of semantic rule-based analysis. To address these challenges we introduce a toolset, binnacle, that enabled us to ingest 900,000 GitHub repositories.

Focusing on Docker, we extracted approximately 178,000 unique Dockerfiles, and also identified a Gold Set of Dockerfiles written by Docker experts. We addressed challenge (i) by reducing the number of effectively uninterpretable nodes in our ASTs by over 80% via a technique we call phased parsing. To address challenge (ii), we introduced a novel rule-mining technique capable of recovering two-thirds of the rules in a benchmark we curated. Through this automated mining, we were able to recover 16 new rules that were not found during manual rule collection. To address challenge (iii), we manually collected a set of rules for Dockerfiles from commits to the files in the Gold Set. These rules encapsulate best practices, avoid docker build failures, and improve image size and build latency.

We created an analyzer that used these rules, and found that, on average, Dockerfiles on GitHub violated the rules five times more frequently than the Dockerfiles in our Gold Set. We also found that industrial Dockerfiles fared no better than those sourced from GitHub.

The learned rules and analyzer in binnacle can be used to aid developers in the IDE when creating Dockerfiles, and in a post-hoc fashion to identify issues in, and to improve, existing Dockerfiles.

## CCS CONCEPTS

- Software and its engineering → Empirical software validation; General programming languages.  
- Theory of computation → Program semantics; Abstraction.  
- Information systems → Data mining.

## KEYWORDS

Docker, DevOps, Mining, Static Checking

ACM Reference Format:  
Jordan Henkel, Christian Bird, Shuvendu K. Lahiri, and Thomas Reps. 2020. Learning from, Understanding, and Supporting DevOps Artifacts for Docker. In 42nd International Conference on Software Engineering (ICSE ’20), May 23–29, 2020, Seoul, Republic of Korea. ACM, New York, NY, USA, 12 pages. https://doi.org/10.1145/3377811.3380406

## 1 INTRODUCTION

With the continued growth and rapid iteration of software, an increasing amount of attention is being placed on services and infrastructure to enable developers to test, deploy, and scale their applications quickly. This situation has given rise to the practice of DevOps, a blend of the words Development and Operations, which seeks to build a bridge between both practices, including deploying, managing, and supporting a software system [23]. Bass et al. define DevOps as the “set of practices intended to reduce the time between committing a change to a system and the change being placed into normal production, while ensuring high quality” [11]. DevOps activities include building, testing, packaging, releasing, configuring, and monitoring software. To aid developers in these processes, tools such as TravisCI [9], CircleCI [1], Docker [2], and Kubernetes [6], have become an integral part of the daily workflow of thousands of developers. Much has been written about DevOps (see, for example, [16] and [22]) and various practices of DevOps have been studied extensively [20, 27, 31–33, 40].

DevOps tools exist in a heterogenous and rapidly evolving landscape. As software systems continue to grow in scale and complexity, so do DevOps tools. Part of this increase in complexity can be seen in the input formats of DevOps tools: many tools, like Docker [1], Jenkins [4], and Terraform [8], have custom DSLs to describe their input formats. We refer to such input files as DevOps artifacts.

Historically, DevOps artifacts have been somewhat neglected in terms of industrial and academic research (though they have received interest in recent years [28]). They are not “traditional” code, and therefore out of the reach of various efforts in automatic mining and analysis, but at the same time, these artifacts are complex. Our discussions with developers tasked with working on these artifacts indicate that they learn just enough to “get the job done.”