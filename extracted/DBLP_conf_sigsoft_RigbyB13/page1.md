# Convergent Contemporary Software Peer Review Practices

Peter C. Rigby  
Concordia University  
Montreal, QC, Canada  
peter.rigby@concordia.ca

Christian Bird  
Microsoft Research  
Redmond, WA, USA  
cbird@microsoft.com

## ABSTRACT

Software peer review is practiced on a diverse set of software projects that have drastically different settings, cultures, incentive systems, and time pressures. In an effort to characterize and understand these differences we examine two Google-led projects, Android and Chromium OS, three Microsoft projects, Bing, Office, and MS SQL, and projects internal to AMD. We contrast our findings with data taken from traditional software inspection conducted on a Lucent project and from open source software peer review on six projects, including Apache, Linux, and KDE. Our measures of interest include the review interval, the number of developers involved in review, and proxy measures for the number of defects found during review. We find that despite differences among projects, many of the characteristics of the review process have independently converged to similar values which we think indicate general principles of code review practice. We also introduce a measure of the degree to which knowledge is shared during review. This is an aspect of review practice that has traditionally only had experiential support. Our knowledge sharing measure shows that conducting peer review increases the number of distinct files a developer knows about by 66% to 150% depending on the project. This paper is one of the first studies of contemporary review in software firms and the most diverse study of peer review to date.

### Categories and Subject Descriptors

D.2.8 [Software Engineering]: [Metrics]; K.6.3 [Software Management]: [Software development; Software process]

### General Terms

Management, Measurement

### Keywords

Peer code review, Empirical Software Engineering, Inspection, Software firms, Open source software

## 1. INTRODUCTION

Software peer review, in which an independent evaluator examines software artifacts for problems, has been an engineering best practice for over 35 years [9, 10]. While effective in identifying defects, the rigidity of traditional formal review practices has been shown to limit adoption and review efficiency [12, 29]. In contrast, contemporary or modern peer review encompasses a series of less rigid practices [6, 22]. These lightweight practices allow peer review to be adapted to fit the needs of the development team. For example, peer review is widely practiced on open source software (OSS) projects. Rigby et al. [23] described a minimalist OSS process that efficiently fit the development team. However, there was a lack of traceability and tools to support review that made it difficult to externally monitor the progress and quality of an OSS system. Despite a large body of research on peer review in the software engineering literature, little work focuses on contemporary peer review in software firms. There are practitioner reports, but these are experiential [20] or biased by a commercial interest in the review tool being examined [6]. To date, practitioners have driven the development of contemporary peer review and the tools that support it [26, 6]. The proliferation of reviewing tools (e.g., CodeCollaborator, ReviewBoard, Gerrit, Crucible) and the growing number of companies using lightweight review indicates success in terms of adoption (e.g., Google, Cisco, Microsoft), but there is no systematic examination of the efficacy of contemporary peer review in software firms.

We posit that contemporary peer review (review practiced today by many commercial and OSS projects) evolved from the more traditional practice of formal inspections of a decade or more ago. In this paper, we present an exploration of aspects of contemporary peer review in software projects that span varying domains, organizations, and development processes in an attempt to aggregate and synthesize more general results. Our primary conjecture is that if the peer review practices and characteristics in multiple disparate projects (See Table 2) have become similar as they have naturally or organically evolved, then such characteristics may be indicative of convergent practices that represent generally successful and efficient methods of review. As such, these can be prescriptive to other projects choosing to add peer review to their development process.

Our overarching research question is how do the parameters of peer review differ in multiple disparate projects? We operationalize this question for each parameter of review: