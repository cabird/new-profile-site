# Relating Requirements to Implementation via Topic Analysis:  
Do Topics Extracted from Requirements Make Sense to Managers and Developers?

Abram Hindle  
*Department of Computing Science*  
*University of Alberta*  
*Edmonton, Canada*  
Email: abram.hindle@softwareprocess.es

Christian Bird and Thomas Zimmermann and Nachiappan Nagappan  
*Microsoft Research*  
*Redmond, WA, USA*  
Email: {cbird,tzimmer,nachin}@microsoft.com

## Abstract
Large organizations like Microsoft tend to rely on formal requirements documentation in order to specify and design the software products that they develop. These documents are meant to be tightly coupled with the actual implementation of the features they describe. In this paper we evaluate the value of high-level topic-based requirements traceability in the version control system, using Latent Dirichlet Allocation (LDA). We evaluate LDA topics on practitioners and check if the information extracted matches the perception that Program Managers and Developers have about the effort put into addressing certain topics. We found that effort extracted from version control that was relevant to a topic often matched the perception of the managers and developers of what occurred at the time. Furthermore we found evidence that many of the identified topics made sense to practitioners and matched their perception of what occurred. But for some topics, we found that practitioners had difficulty interpreting and labelling them. In summary, we investigate the high-level traceability of requirements topics to version control commits via topic analysis and validate with the actual stakeholders the relevance of these topics extracted from requirements.

Keywords—latent Dirichlet allocation (LDA); requirements; version control; traceability; topics; requirements engineering

## I. INTRODUCTION
For many organizations, requirements and specifications provide the foundation for the products that they produce. As requirements are implemented, the link between requirements and implementation weaken, especially during maintenance. Later, development artifacts often stop referencing the requirements documents that they were based on. Current research shows that there is a lack of traceability between requirements and implementation [1] whereas the managers we interviewed expected and wanted requirements and implementation to be in sync (Section V-B). The volume of traceability research confirms its importance (see, for example, [2]–[4]). In this paper we extract topics, word distributions, from a large body of requirements documents and then search for commits that mention these topics within the version control system. Once labelled, these topics provide some high-level traceability between requirements

and implementation, yet at the same time they can provide an overview of development effort for each topic.

Furthermore we attempt to validate these overviews between requirements and implementation by asking developers and program managers if their perception of their behaviour matches the behaviour highlighted by the topic. Stakeholder based validation of topics (extracted by Latent Dirichlet Allocation (LDA) [5]) in terms of relevance, labelling and the recovery of behaviour [6] is critical, but to date has not been applied to the domain of software engineering. Our contributions include:
- A technique for linking requirements to code commits via topics.
- An evaluation of the relevance of topics extracted by LDA from requirements with developer and managers.
- An analysis of if topic highlighted behaviour matches the perception of developers and managers.
- Insight into the difficulties that practitioners face when labelling topics and the need for labelled topics.
- Validation of non-expert topic labelling with practicing experts.

We are investigating if LDA topics make sense to practitioners, and can they label LDA topics. For this study, we have at our disposal many skilled Microsoft developers who work on a very large software system that has many requirements documents. Thus we investigate if practitioners face difficulties interpreting topics, if unlabelled topics are enough, and if familiarity with the source and domain of the topic matter.

### A. Motivation
Latent Dirichlet Allocation (LDA) and Latent Semantic Indexing (LSI) are popular tools in software engineering research [7]–[10] used for traceability and information retrieval, but their use is built upon assumptions, such as usability, that have not been validated with stakeholders, such as developers. Often these topics are interpreted solely by the researchers themselves (e.g., [11]). Thus the use of topic analysis, LDA and LSI, and topics in software engineering has not been validated rigorously with actual