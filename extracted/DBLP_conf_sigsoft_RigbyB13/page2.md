Table 1: Project data sets: The time period we examined in years and the number of reviews  
Project  Period  Years  Reviews

![Table 1: Project data sets](page2_img_table_1.png)

1. What peer review process (e.g., Fagan inspection vs Commit-then-review) does the project use?  
2. How long do reviews take and how often are reviews performed?  
3. What is the size of artifact under review?  
4. How many people are involved in review?  
5. How effective is review in terms of problems discussed?  
6. Does review spread knowledge about the system across the development team?

With the exception of the last question, these parameters of review have been studied in many experiments over the past 35 years [9, 19, 24]. Our contribution is to compare a large diverse set of projects on these parameters.

This paper is organized as follows. In Section 2, we provide a brief overview of the software peer review literature and describe the review practices of the projects we study in this paper. In Section 3, we describe the data that we mine and our multiple case study methodology. In Section 4, we present our case study findings and describe convergent and divergent practices. In Section 5, we provide a first measurement of the impact of peer review on knowledge sharing in a development team. While we discuss threats to validity throughout the paper, we provide a fuller discussion of them in Section 6. In Section 7, we conclude the paper.

## 2. BACKGROUND AND PROJECT INFORMATION

In this section we introduce three types of peer review: traditional inspection, OSS email-based peer review, and lightweight tool supported review. We also describe the projects and data we have for each review type. The novel data in this paper comes from Advanced Micro Devices (AMD), Microsoft, and Google-led projects. Table 2 is intended to show the time periods and size of data set we have for each project, and is not intended for comparisons among projects. In the remainder of this paper, we normalize and convert the raw data to perform meaningful comparisons.

### 2.1 Software Inspection

Software inspections are the most formal type of review. They are conducted after a software artifact meets predefined exit criteria (e.g., a particular requirement is implemented). The process, originally defined by Fagan [9], involves some variation of the following steps: planning, overview, preparation, inspection, reworking, and follow-up. In the first three steps, the author creates an inspection package (i.e., determines what is to be inspected), roles are assigned (e.g., moderator), meetings are scheduled, and the inspectors examine the inspection package. The inspection is conducted, and defects are recorded but not fixed. In the final steps, the author fixes the defects and the mediator ensures that the fixes are appropriate. Although there are many variations on formal inspections, “their similarities outweigh their differences” [31].

Comparison data: We used data that Porter et al. collected in inspection experiments at Lucent [19] to compare our findings for contemporary review with traditional software inspection. Their study was conducted in a semi-controlled industrial setting. Each condition in their study was designed to emulate a particular variation in inspection process. However, they found that variation in inspection processes accounted for very little variation in the number of defects found during review. People and product measures, such as the expertise of the review, accounted for much more of the variance.

### 2.2 Open Source Software Peer Review

Peer review is a natural way for OSS developers, who rarely meet in person, to ensure that the community agrees on what constitutes a good code contribution. Most large, successful OSS projects see peer review as one of their most important quality assurance practices [23, 18, 1]. On OSS projects, a review begins with a developer creating a patch. A patch is a development artifact, usually code, that the developer feels will add value to the project. Although the level of formality of the review processes varies among OSS projects, the general steps are consistent across most projects:
1. The author submits a contribution by emailing it to the developer mailing list or posting to the bug or review tracking system.  
2. One or more people review the contribution.  
3. It is modified until it reaches the standards of the community.  
4. It is committed to the code base.

Many contributions are ignored or rejected and never make it into the code base [3]. This style of review is called review-then-commit (RTC). In contrast to RTC, some projects allow trusted developers to commit contributions (i.e., add their contributions to the shared code repository) before they are reviewed. The main or core developers for the project are then expected to review all commits. This style of review is called commit-then-review (CTR). All projects use RTC, but some also use CTR depending on the status of the committer and the nature of the patch [23].

Comparison data: We have data from six large, successful OSS projects (which we will refer to as the “OSS projects” in this paper1): the Apache httpd server, the Subversion version control system, the Linux operating system, the FreeBSD

1 Although Chrome and Android have open source licenses, they are led by Google.