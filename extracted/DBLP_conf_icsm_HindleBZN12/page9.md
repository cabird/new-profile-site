### B. Commit-Topic Plot

We found that the per-author commit-topic plots were often relevant to the developers. Some higher-level topics seemed out of touch with the developers' activity. If a plot did not match a developer's perception, it seemed to be due to a lack of familiarity with the topic or the topic being unclear rather than the plot missing efforts that they expected: matching noise to noise produces noise. Many respondents indicated that we should talk to the team that produced the requirements we used. This lends further evidence that it is easier for those familiar with the source requirements to label topics than those who are not as closely associated. Since respondents validated the majority of the plots as accurate, this provides evidence that the results are not spurious.

## VII. RECOMMENDATIONS ON THE USE OF TOPIC ANALYSIS IN SOFTWARE ENGINEERING

Based on our experience, the discussions we had with respondents and the results of our surveys, we have compiled general recommendations for the use of topic analysis techniques in software engineering.

Many found that labelling a set of personally relevant topics are easier to interpret. Respondents found that topics about familiar artifacts tended to be easier to label. One should use the most specific domain experts to label topics. For optimal results, the team responsible for the requirements should label those topics.

Remove confusing, irrelevant and duplicated topics. Some topics do not actually say anything. Some are structural and filled with common terms, some are about the use of language itself and not relevant to requirements. Most importantly, not all topics need to be shown.

Use domain experts to label topics! We found that non-experts have questionable labelling accuracy (only 50%, with confidence interval of 35%–65%). Respondents with the most familiarity gave the most relevant topic labels.

Unlabelled topics are not enough! It took respondents 1 to 4 minutes to interpret a topic from its top 20 topic words. Thus multiple topics multiply the cost of interpretation.

## VIII. THREATS TO VALIDITY

Relevant construct validity threats include the fact we used only one large project and that personal topic-plots are relevant only to a single person. We were able to partially mitigate this threat by evaluating with multiple people. However, the largest threat facing the construct validity of this work is that we did not have enough respondents. Thus we need to rely on qualitative evidence. Training and verbal administration of surveys can also bias results.

In terms of internal validity, we built explanations and theories based on the feedback we received from respondents. Since we lacked a large number of respondents we were not able to do statistical analysis, but Ko et al. have argued that this size of result is still relevant [23] qualitatively, as we observed repeated answers.

External validity is threatened by the fact this study took place on one project, within one organization. We could not find an alternative project that was publicly available that had enough requirements and maturity.

## IX. FUTURE WORK

Future work relevant to this study includes further validation by expanding the scope in terms of software domains, developers, managers, projects and organizations.

The survey respondents had many great ideas. One respondent desired a UI to dive deep into the relevant artifacts to explain behaviour. Others suggested that providing your own word distribution as a topic would help exploration. One PM suggested that Figure 2 would be useful as a project dashboard. Thus this work can be leveraged in research relevant to knowledge management, project dashboards, project effort models and software quality models.

## X. CONCLUSIONS

In conclusion, we conducted an evaluation of the commonly used practice of LDA topic analysis for traceability research with Microsoft developers, rather than students, in a large project with comprehensive requirements documents.

We investigated the relevance of topics extracted from requirements to development effort by interviewing developers and managers. To relate requirements and development activities, we extracted topics from requirements documents using LDA, and then inferred the relationship to the version control commit messages.

We combined a large corpus of requirements documents with the version control system and had stakeholders validate if these topics were relevant and if the extracted behaviours were accurate. Many topics extracted from requirements were relevant to features and development effort. Stakeholders who were familiar with the requirements documents tended to be comfortable labelling the topics and identifying behaviour, but those who were not, showed some resistance to the task of topic labelling. Non-expert topic labelling suffered from inaccuracy.

Stakeholders indicated that many of the commit-topic plots were perceptually valid. The efforts depicted often met with their expectation or experiences. Managers could spot trends in the global plots while developers tended to spot trends in their personal topic-plots. But we also found that some topics were confusing and not easy for practitioners to interpret and label. Our recommendations were that topics need to be interpreted, pruned, and labelled by experts and future topic-related research should use labelled topics.

We have shown that topics extracted from requirements are relevant, that their version control inferred behaviour is perceptually valid. In short, we have provided evidence that validates some of the assumptions that researchers had