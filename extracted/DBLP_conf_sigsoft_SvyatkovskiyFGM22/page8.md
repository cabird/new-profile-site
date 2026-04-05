Table 4: Detailed evaluation results for (top) monolingual JavaScript, TypeScript, Java, and C# models, and (bottom) multilingual MergeBERT model trained on all four programming languages. The table shows precision and accuracy of merge resolution synthesis.

| Test (Train) Languages | Precision (Top-1) | Precision (Top-3) | Accuracy (Top-1) | Accuracy (Top-3) |
|---|---:|---:|---:|---:|
| JavaScript (JS) | 66.9 | 75.4 | 65.6 | 73.9 |
| TypeScript (TS) | 69.1 | 76.6 | 68.2 | 75.6 |
| Java (Java) | 63.9 | 76.1 | 63.2 | 75.2 |
| C# (C#) | 68.7 | 76.4 | 67.3 | 74.8 |
| JavaScript (JS, TS, C#, Java) | 66.6 | 75.2 | 65.3 | 73.8 |
| TypeScript (JS, TS, C#, Java) | 68.5 | 76.8 | 67.6 | 75.8 |
| Java (JS, TS, C#, Java) | 63.6 | 76.0 | 62.9 | 75.1 |
| C# (JS, TS, C#, Java) | 66.3 | 76.2 | 65.1 | 74.8 |

shows performance when MergeBERT is trained on data for that specific language. The bottom section shows performance for each language when MergeBERT is trained on a data set comprising data for all languages (we term this the multilingual model). Note that for the language specific models, performance is fairly consistent across all four languages with Top-1 precision ranging from 63.9% to 69.1% and Top-1 Accuracy ranging from 63.2% to 68.2%. We also find that over 97% of MergeBERT suggestions are syntactically correct across all programming languages.

We had no a priori expectations of the performance of the multilingual model, as it is trained on more data, which could lead to improvement, but it is not language specific, which could lead to poorer results. Overall, the multilingual variant of the model generates results that are just slightly below the monolingual versions. Thus performance on one language isn’t improved by adding more data in other languages. Thus, from a pragmatic perspective, if one chooses to simplify their use of MergeBERT by training just one model instead of one model per language, then the performance takes only a negligible hit.

RQ3: How do different choices of context encoding impact performance of MergeBERT?

We conduct an ablation study on the edit type embedding to understand the impact of edit-awareness of encoding on the model performance. As shown in Tab. 5, use of the edit type embedding improves MergeBERT from 63% to 68%.

Table 5: Evaluation results for MergeBERT and the model variant without edit-type embedding for merge conflicts in TypeScript programming language test set. The table shows top-1 precision and accuracy metrics.

| Approach | Precision | Accuracy |
|---|---:|---:|
| w/o edit type embeddings | 65.2 | 63.1 |
| MergeBERT w/ edit type embeddings | 69.1 | 68.2 |

![Methodology diagram for identifying candidate conflicts](page8_img_fig4.png)

Figure 4: Methodology to identify candidate conflicts for the user study.

Table 6: Summary of projects in user study, total number of conflicts per project, number of conflicts evaluated in the study, and the survey participants.

| Language | Project | Conflicts | Survey Conflicts | Participants |
|---|---|---:|---:|---|
| Java | Azure-Cosmosdb | 341 | 6 | P1 |
| Java | Azure-SDK | 997 | 14 | P2-4 |
| Java | ApplicationInsights | 313 | 10 | P5-6 |
| TS | MakeCode | 106 | 12 | P7-8 |
| TS | VSCode | 2256 | 48 | P9-17 |
| C# | AspNetCore | 567 | 11 | P18-19 |
| C# | EFCore | 397 | 7 | P20-21 |
| C# | Roslyn | 1894 | 14 | P22-25 |
| Total | 8 projects | 6871 | 122 | 25 |

## 9 USER EVALUATION

### 9.1 User Study Design

To better understand how MergeBERT performs in practice, we ask developers about conflicts that MergeBERT is unable to correctly resolve. Since MergeBERT’s resolution suggestions are evaluated against user resolutions using a verbatim string match (modulo whitespace), asking study participants to confirm identical resolutions predicted by MergeBERT is not informative. Therefore, we extract conflicts where MergeBERT suggestions are not a direct match to the user resolution to determine what the limitations of the suggestions are, and how they might be perceived in practice.

To build an oracle of merge conflicts and resolutions we identify 8 open source projects hosted on GitHub. The selected projects are active, with multiple contributors, and contain a large number of conflict scenarios in one of the languages supported by MergeBERT. Tab. 6 contains a list of projects chosen. For each project, we follow the same steps outlined in Section 7 to extract candidate conflicts and user resolutions to use in the survey.

Fig. 4 explains the methodology used to identify candidate merge conflicts. We identify the set of conflicts MergeBERT is unable to correctly merge (within the top-3 suggestions). From this set of conflicts, we identify candidate conflicts to use as part of the user study. We filter candidate files with the following criteria:

(1) Conflicts should have been recently resolved i.e., at most within the past 12 months. Participants may not retain the context needed to evaluate suggestions for older conflicts.