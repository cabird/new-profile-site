# Quantitative Study of Open Source Immigration

Christian Bird, Alex Gourley, Prem Devanbu  
Dept. of Computer Science  
UC Davis  
Davis, CA 95616, USA  
cabird, acgourley, devanbu@ucdavis.edu

Anand Swaminathan, Greta Hsu  
Graduate School of Business  
UC Davis  
Davis, CA 95616, USA  
aswaminathan, grhsu@ucdavis.edu

## Abstract

Open source software is built by teams of volunteers. Each project has a core team of developers who have the authority to commit changes to the repository; this team is the elite core of the project, selected through a meritocratic process from a larger number of people who participate on the mailing list. Understanding the factors that influence the “who, how and when” of this process is critical for the sustainability of FLOSS projects and for outside stakeholders who want to gain entry and succeed. Prior research indicates that certain types of behaviors, such as the duration and intensity of participation on the developer mailing list, and the submission of patches, play a role in immigration. However, this work has largely been qualitative and/or descriptive. We use quantitative hazard rate modeling, which supports the statistical testing of hypotheses concerning the influence of these factors on the rate of immigration. We develop a theory of open source project joining, and use data from Postgres, Python, and the Apache web server to statistically evaluate it using a piecewise-constant proportional hazard rate model. Quantitative modeling reveals variations across the projects in the effects of a participant's a) duration in a FLOSS community; b) their volume of patch submission; and c) their social status. These variations can be attributed to differences across the projects in institutional norms for joining, technical complexity of the

## 1. Introduction

Brooks [6], in his classic The Mythical Man‑Month, made an enduring observation about the risks of adding new people into software project teams: the costs of training and absorbing these new people into the team, he warned, might well exceed the benefits. Brooks' comments were made in the context of traditional, “closed‑source” software projects. How does his warning translate to the new world of free/libre open source software (FLOSS) projects? FLOSS projects are completely dependent on volunteer labor; as such, the vitality of a project depends on its ability to attract, absorb and retain developers or face stagnancy and failure. How do FLOSS projects absorb newcomers without falling afoul of Brooks' man‑month paradox? FLOSS projects uniquely make their source code freely available even to outsiders (not just developers — by developers we refer to people who have write access to the source code repository). In addition, this process in most cases begins with mailing list participation. FLOSS projects have mailing lists on which public discussions (open to anyone) concerning the engineering and design of the project are conducted. Outsiders can read the source code, educate themselves on their own time, and join the discussion. Through sustained interest and contributions to the technical discussions, outsiders win the trust of the project's inner circle, and attain developer status along with the keys to the project's source code repository. This process (which we refer to as immigration) is unique to FLOSS projects, and is in fact a critical element of the phenomenal success of the FLOSS process. It has been the subject of study by many researchers [7, 10, 11, 19, 26].