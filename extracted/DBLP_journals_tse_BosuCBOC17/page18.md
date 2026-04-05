has identified several differences between paid and volunteer participants in terms of impression formation (i.e., paid participants were more likely to form impressions based on meeting in person) and perceived experiences (i.e., volunteers were more likely to perceive negative experiences working with peers) [10].

In response to RQ2, we found that paid OSS participants collaborate with significantly more peers and spend significantly more time in code reviews than volunteer OSS participants. This observation may indicate that paid OSS participants serve as the gatekeepers for the OSS projects.

For the remaining research questions, which dealt with the importance of code review, the code review process, and the impact of code reviews, the results did not show any differences between the paid OSS participants and the volunteer OSS participants. Therefore, whether an OSS participant is paid or is a volunteer does not seem to impact the key aspects of the code review process or how code reviews impact peer impression formation.

## 8 Threats to Validity

This section discusses the addressed and unaddressed threats to validity. It is organized around the four common types of validity threats.

### 8.1 Internal Validity

Participant selection is the primary threat to internal validity. The subject population consisted of reviewers who had participated in at least 30 code reviews (either as the author or reviewer). It is possible that using a different threshold would have produced different results, but we have no evidence to suggest this situation. Because seven of the eight research questions (RQ2–8) are related to the code review process (i.e., accepting review request, judging poor code, improving poor code, impact of good/bad codes), we strongly believe that without having adequate code review experiences, a developer cannot provide appropriate answers to these questions.

In addition, there is the threat that only those subjects who had positive experiences with code review took time to respond to the survey. There is no evidence to suggest that this self-selection occurred. But, even if it did, because the goal of the survey was to gather information about various aspects of code review, those who had positive experiences could likely provide the best feedback.

### 8.2 Construct Validity

The survey design process specifically focused on reducing construct validity threats. This process took approximately eight months and included both expert reviews and multiple pilot tests. The design process included the following bias-reducing practices:

- placing the questions about the topics of interest after the other survey questions to prevent hypothesis-guessing,
- presenting the scale questions in random order,
- providing clear definitions of code review partner and non-code review partner on all relevant pages, and
- carefully wording questions in an unbiased manner.

Third, we conducted multiple reliability and validity tests, with widely-used and highly recommended measures, to ensure construct validity.

### 8.3 External Validity

Due to the wide diversity within the OSS community, it is possible that the results may not be representative of all OSS projects. In fact, as most respondents came from well-known, successful OSS projects, they may have been among the higher skilled and more motivated OSS developers. The impacts of code review on software quality and on the social fabric of the team may differ in other types of OSS projects.

In terms of the Microsoft developers, they may not be representative of all commercial organizations. To reduce this potential threat, the respondents came from teams that differ in development process (e.g., waterfall versus agile), hardware platform (e.g., mobile, desktop, server, and data center software), deployment method (boxed products versus web services), operating system (iOS, Windows, Windows Phone, and Linux), location (U.S., Europe, and Asia), and workflow (e.g., some teams require two reviews on all sign-offs, others are more lax; some want review prior to checkin and test, others do review afterwards; some include testers and development leads on reviews and some do not). The software development processes, project management, and release cycles across different projects in Microsoft are quite varied. Interestingly, in a prior study of code review, Rigby and Bird investigated code review practices and metrics in multiple commercial organizations and open source projects [45]. Surprisingly, they found little difference between the different systems studied in terms of code review, supporting the notion that findings about code review at one company may be relevant for other organizations.

In addition, the code review workflow at Microsoft is similar to that used by other large commercial organizations such as Facebook [33], Google [56], VMWare [3], Cisco [18], and Oracle [55] that have adopted mandatory code review practices. In those organizations, code review has become an important software quality assurance practice similar to testing, tracking/fixing bugs, and automated build systems, which all are aspects of mature software engineering projects.

A common misconception about industrial research at large companies such as Microsoft is that software projects at Microsoft are not representative of other software projects. While projects might be larger in size, most development practices at Microsoft are adapted from the general software engineering community and also used outside Microsoft. Another frequent misconception is that empirical research within one company or one project is not good enough, provides little value for the academic community, and does not contribute to scientific development. Historical evidence shows otherwise. Flyvbjerg provides several examples of individual cases that contributed to discovery in physics, economics, and social science [24]. Again, W. I. Beveridge observed for social sciences: “More discoveries have arisen from intense observation than from statistics applied to large groups” [7]. Even in SE domain, prior case studies at large commercial companies such as: Microsoft [9], [39], Google [35], and Cisco [18] have provided useful insights. Please note that this argument should not be interpreted as a criticism of research that focuses on large samples or