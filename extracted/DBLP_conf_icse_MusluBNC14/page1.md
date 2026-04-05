# Transition from Centralized to Distributed VCS:  
A Microsoft Case Study on Reasons, Barriers, and Outcomes

Kıvanç Muşlu  
University of Washington, Seattle, WA, USA  
kivanc@cs.washington.edu

Christian Bird, Nachiappan Nagappan  
Microsoft Research, Redmond, WA, USA  
{cbird, nachin}@microsoft.com

Jacek Czerwonka  
Microsoft, Redmond, WA, USA  
jacekcz@microsoft.com

## ABSTRACT
In recent years, software development has started to transition from centralized version control systems (CVCSs) to decentralized (DVCSs) version control systems. Although CVCSs and DVCSs have been studied extensively, there has been very little research on the transition across these systems.

This paper investigates the transition process, from the developer’s point of view, in a large company. The paper captures the transition reasons, barriers, and results through ten developer interviews, and investigates these findings through a survey, participated by 70 developers. We found that the majority of the developers need incremental, small commits, and lightweight branches to work efficiently. DVCSs fulfill these developer needs; however the transition comes with a cost depending on the previous development workflow. The paper discusses the transition reasons, transition barriers and outcomes, and provides recommendations for teams planning such a transition. Our analysis showed that lightweight branches and local, incremental commits were the main reasons for developers wanting to move to a DVCS. Further, the main problems with the transition process were identified as: steep DVCS learning curve; tool immaturity; and DVCS scaling issues.

de Alwis and Sillito [1] investigated the transition process, challenges, and anticipated benefits for OSS. To our best knowledge, there is no study that investigates the transition process from the developer’s view in a large commercial company. This paper aims to understand transition reasons, barriers, and outcomes from a qualitative perspective to expand the scientific knowledge for the whole transition process. To identify the transition reasons, barriers, and outcomes, this paper uses interviews of developers who transitioned from a CVCS to a DVCS within the same project. The paper also investigates and quantifies the findings from the interviews by presenting the results of a comprehensive survey, participated by 70 developers. The paper identified that, at Microsoft, DVCSs are preferred for some simple but key operations, such as incremental workflow through small and local commits, and efficient context switching through lightweight branches. This raises the question whether all DVCS features — and specifically being distributed — are essential for large, commercial companies. Section 7 discusses this question in-depth.

The paper makes the following contributions:
- A novel, qualitative study with professional developers who transitioned from a CVCS to a DVCS within the same project (Section 3).
- Identification of the key concepts for transition reasons, barriers, and outcomes, and quantification of these findings through a comprehensive survey, participated by 70 developers (Sections 4, 5, and 6).
- In-depth discussion of the DVCS features that are favored by the developers to understand whether these features are essential to DVCSs. This discussion concludes with guidelines to people who consider transitioning (Section 7).

The remainder of the paper is organized as follows: Section 2 defines VCS terminology. Section 3 explains the methodology. Sections 4, 5, and 6 explain transition reasons, barriers, and outcomes, respectively. Section 7 discusses some of our findings in-depth and provides guidance to people who consider transitioning. Section 8 discusses threats to validity in the findings. Section 9 puts the paper in the context of the related work. Section 10 concludes.

## Categories and Subject Descriptors
D.2.7 [Software Engineering]: Distribution, Maintenance, and Enhancement — version control

## General Terms
Measurement, Human Factors.

## Keywords
Version control system, DVCS, CVCS, distributed, centralized, productivity, barriers, empirical.

## 1. INTRODUCTION
Version control systems (VCSs) help developers to implement and maintain large systems by letting them collaborate and work on the same product at the same time. A centralized VCS (CVCS) keeps all development history in a central server whereas a decentralized VCS (DVCS) keeps the development history on each development machine locally. Historically, DVCSs came later than CVCSs, trying to address the limitations of CVCSs, such as enabling lightweight branching, local VCS operations, and easier collaboration between developers [1].

Although CVCSs and DVCSs have been available for quite a while, to the best of our knowledge, there is little research on why developers transition from a CVCS to a DVCS. For a developer, who is already proficient with a CVCS, transitioning to an unknown DVCS would require considerable effort, which would only make sense if the benefits of using the DVCS would eventually outweigh this transition effort. Barr et al. [2] investigated how the transition affects the project branching structure and the way the developers use branches in open-source software (OSS). de Alwis and Sillito [1] investigated the transition process, challenges, and anticipated

The remainder of the paper is organized as follows: Section 2 defines VCS terminology. Section 3 explains the methodology. Sections 4, 5, and 6 explain transition reasons, barriers, and outcomes, respectively. Section 7 discusses some of our findings in-depth and provides guidance to people who consider transitioning. Section 8 discusses threats to validity in the findings. Section 9 puts the paper in the context of the related work. Section 10 concludes.

## 2. DEFINITIONS
This section defines VCS terminology used throughout the paper.

A version control system (VCS) is a tool that helps the developers manage the source code and the development history of a product with the following core functionality: (1) backing up the source code seamlessly, and (2) letting multiple developers collaborate efficiently.

A repository is the combination of the source code and metadata — including all previous versions — stored in a VCS. To work on the source code, the developer checks out a version of the history from a repository to a local workspace. The developer makes changes to the workspace and checks in these changes to the VCS to make the changes accessible to other developers. During a check-in, the developer’s changes might conflict with changes checked in by other developers. All VCSs provide a textual merge algorithm that finds