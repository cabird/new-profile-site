## Using Large Language Models to Support the Workflow of Differential Testing

Arun Krishna Vajjala^1, Ajay Krishna Vajjala^1, Carmen Badea^2, Christian Bird^2, Jade D’Souza^2, Robert DeLine^2, Mikhail Demyanyuk^2, Jason Entenmann^2, Nicole Forsgren^2, Aliaksandr Hramadski^2, Haris Mohammad^2, Sandeepan Sanyal^2, Oleg Surmachev^2, Thomas Zimmermann^3

1 George Mason University, 2 Microsoft Corp., 3 University of California, Irvine

{akrishn, akrish}@gmu.edu  
{cabadea, cbird, jadedsouze, rdeline, midemyan, jentenmann, niforsgr, ahramadski, harismo, ssanyal, olegsu}@microsoft.com  
tzimmer@uci.edu

### Abstract

Many software development teams use differential testing as a quality gate in their release process. Differential testing — namely, comparing behavioral differences between a system in production and a system in test — is a laborious process to label changes as regressions, expected changes, or incidental changes (e.g., those due to nondeterminism or timing). This manual process involves inspecting large textual artifacts, like logs, pull requests, and team discussions, which suggests that Large Language Models (LLMs) could be helpful. In this paper, we engage with the team developing a central Azure service to understand their work practice for differential testing. We used a design probe method to elicit feedback about several ways to use LLMs to improve their work practice, including automatically labeling behavior differences and providing summaries of various artifacts and discussions. Release engineers on the team report that predicting a difference’s label would save them effort, but they want an explicit rationale to improve their trust in the prediction; they found the generated summaries to be informative, if a bit wordy.

> CCS Concepts  
> • Software and its engineering → Software testing and debugging.
> 
> Keywords  
> AI for SE, Differential Testing, Release Engineering, Developer Productivity, Large Language Models, Human-Computer Interaction
> 
> ACM Reference Format:  
> Arun Krishna Vajjala^1, Ajay Krishna Vajjala^1, Carmen Badea^2, Christian Bird^2, Jade D’Souza^2, Robert DeLine^2, Mikhail Demyanyuk^2, Jason Entenmann^2, Nicole Forsgren^2, Aliaksandr Hramadski^2, Haris Mohammad^2, Sandeepan Sanyal^2, Oleg Surmachev^2, Thomas Zimmermann^3. 2025. Using Large Language Models to Support the Workflow of Differential Testing. In 33rd ACM International Conference on the Foundations of Software Engineering (FSE Companion ’25), June 23–28, 2025, Trondheim, Norway. ACM, New York, NY, USA, 11 pages. https://doi.org/10.1145/3696630.3728559
> 
> This work is licensed under a Creative Commons Attribution 4.0 International License.  
> FSE Companion ’25, Trondheim, Norway  
> © 2025 Copyright held by the owner/author(s).  
> ACM ISBN 979-8-4007-1276-0/2025/06  
> https://doi.org/10.1145/3696630.3728559

### 1 Introduction

The increasing complexity of software development and release processes has highlighted a challenge for large organizations: maintaining high software quality while improving developer productivity and workflows [4, 6, 7]. In fast-paced environments at companies such as Microsoft, where millions of users rely on seamless and reliable updates, software engineers often face overwhelming demands during the release phase. For engineers tasked with ensuring the reliability of new builds, traditional workflows can become a significant bottleneck, imposing cognitive burdens and inefficiencies that hinder productivity.

Developer productivity is not merely a technical concern but a business imperative [13, 26, 27]. In an industry where time-to-market and software reliability are imperative, inefficiencies in software engineer workflows directly impact operational costs, product quality, and customer satisfaction [6, 24, 31]. Tools that enable engineers to work more effectively can save organizations millions of dollars annually, reduce time-to-market for new features, and ensure smoother software rollouts [22]. Improving productivity in the release engineering phase of the software engineering life cycle, therefore, aligns with broader business objectives, enhancing organizational competitiveness in the software market.

Release engineering [2], a cornerstone of the software engineering lifecycle, often involves techniques like differential testing [11], where the behaviors of test and production builds are compared on identical data input to uncover potential regressions or inconsistencies [12, 19, 33]. While effective at identifying issues, these methods rely heavily on manual workflows, requiring engineers to investigate extensive logs and differential information [3, 16, 17]. In particular, software engineers need to distinguish regressions from expected behavior differences due to feature enhancements and bug fixes. This process is complicated by the presence of inconsequential differences ("noise") caused by asynchrony, timing differences, non-determinism, etc. Deciding whether a behavioral difference is expected, a regression or noise may require inspecting team artifacts beyond the logs themselves, like recent code changes, bug databases, and team communication channels. To ensure release quality, this process of categorizing differences is repeated for each new build.

The overall workflow involves the inspection of many textual artifacts, which suggests that Large Language Models (LLMs) could be helpful in providing support and automation for aspects of this work. Historically, release engineering tools have been designed to