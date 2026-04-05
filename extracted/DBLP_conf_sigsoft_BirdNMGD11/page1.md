# Don’t Touch My Code!
## Examining the Effects of Ownership on Software Quality

Christian Bird  
Microsoft Research  
cbird@microsoft.com

Nachiappan Nagappan  
Microsoft Research  
nachin@microsoft.com

Brendan Murphy  
Microsoft Research  
bmurphy@microsoft.com

Harald Gall  
University of Zurich  
gall@ifi.uzh.ch

Premkumar Devanbu  
University of California, Davis  
ptdevanbu@ucdavis.edu

## ABSTRACT

Ownership is a key aspect of large-scale software development. We examine the relationship between different ownership measures and software failures in two large software projects: Windows Vista and Windows 7. We find that in all cases, measures of ownership such as the number of low-expertise developers, and the proportion of ownership for the top owner have a relationship with both pre-release faults and post-release failures. We also empirically identify reasons that low-expertise developers make changes to components and show that the removal of low-expertise contributions dramatically decreases the performance of contribution based defect prediction. Finally we provide recommendations for source code change policies and utilization of resources such as code inspections based on our results.

Our knowledge, the effect of ownership has not been studied in depth in commercial contexts. Based on our observations and discussions with project managers, we suspect that when there is no clear point of contact and the contributions to a software component are spread across many developers, there is an increased chance of communication breakdowns, misaligned goals, inconsistent interfaces and semantics, all leading to lower quality.

Interestingly, unlike some aspects of software which are known to be related to defects such as dependency complexity, or size, ownership is something that can be deliberately changed by modifying processes and policies. Thus, the answer to the question: “How much does ownership affect quality?” is important as it is actionable. Managers and team leads can make better decisions about how to govern a project by knowing the answer. If ownership has a big effect, then policies to enforce strong code ownership can be put into place; managers can also watch out for code which is contributed by developers who have inadequate relevant prior experience. If ownership has little effect, then the normal bottlenecks associated with having one person in charge of each component can be removed, and available talent reassigned at will.

We have observed that many industrial projects encourage high levels of code ownership. In this paper, we examine ownership and software quality. We make the following contributions in this paper:

1. We define and validate measures of ownership that are related to software quality.  
2. We present an in depth quantitative study of the effect of these measures of ownership on pre-release and post-release defects for multiple large software projects.  
3. We identify reasons that components have many low-expertise developers contributing to them.  
4. We propose recommendations for dealing with the effects of low ownership.

### Categories and Subject Descriptors
D.2.8 [Software Engineering]: Metrics — Process metrics

General Terms  
Measurement, Management, Human Factors

Keywords  
Empirical Software Engineering, Ownership, Expertise, Quality

## 1. INTRODUCTION

Many recent studies [6, 9, 26, 29] have shown that human factors play a significant role in the quality of software components. Ownership is a general term used to describe whether one person has responsibility for a software component, or if there is no one clearly responsible developer. Within Microsoft, we have found that when more people work on a binary, it has more failures [5, 26]. However, to

## 2. THEORY & RELATED WORK

A number of prior studies have examined the effect of developer contribution behavior on software quality. Rahman & Devanbu [30] examined the effects of ownership & experience on quality in several open-source projects, using a fine-grained approach based on fix-inducing fragments of code, and report findings similar to those of our