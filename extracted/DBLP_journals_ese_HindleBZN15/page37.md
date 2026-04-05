LDA has many derivations since it is a probabilistic technique. In our FLOSS replication we did not apply stemming as we had in our Microsoft study.

External validity is threatened by the fact that the requirements study took place on one project, within one organization. We could not find an alternative project that was publicly available that had enough requirements and maturity. Thus we had to replicate using issue reports due to a general lack of formal requirements documentation internal to FLOSS projects (some exists but we would also need willing participants from those projects). External validity was harmed by failing to replicate the utility questions on our FLOSS developer survey that we used on our Microsoft developer survey.

## 9 Future Work

Future work relevant to this study includes further validation by expanding the scope in terms of software domains, developers, managers, projects and organizations.

The survey respondents had many great ideas. One respondent desired a UI to dive deep into the relevant artifacts to explain behaviour. Others suggested that providing your own word distribution as a topic would help exploration. One PM suggested that Figure 2 would be useful as a project dashboard. Thus this work can be leveraged in research relevant to knowledge management, project dashboards, project effort models and software quality models.

We would like to investigate the effectiveness of automatic topic labels versus those labels given by developers using methods such as those suggested by Kuhn et al. [21] and De Lucia et al. [9]. The intersection of automatic topic labelling and manual topic labelling could help evaluate automatic topic label quality.

## 10 Conclusions

In conclusion, we conducted an evaluation of the commonly used practice of LDA topic analysis for traceability research (at a high-level) with Microsoft developers, rather than students, in a large project with comprehensive requirements documents. We also replicated the Microsoft case study on 13 FLOSS developers from 13 FLOSS projects with similar conclusions.

We investigated the relevance of topics extracted from requirements to development effort by interviewing developers and managers. To relate requirements and development activities, we extracted topics from requirements documents using LDA, and then inferred the relationship to the version control commit messages.

We combined a large corpus of requirements documents with the version control system and had stakeholders validate if these topics were relevant and