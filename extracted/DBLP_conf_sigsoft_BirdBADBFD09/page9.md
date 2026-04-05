![four bar charts labeled (a)–(d)](page9_img_1.png)

(a) (b) (c) (d)  
Figure 4: Recall of BugCache when trained on all fixed bugs (a), only “minor” fixed bugs (b), only “critical” bugs (c), and a dataset biased towards more severe bugs (d) in EclipseZ. Similar results were observed in other severity levels and in EclipseB.

Does bug feature bias affect the performance of prediction systems? The above study examines this using a specific model, BugCache, with respect to two types of bug-feature bias. We made two observations: 1) if you train a prediction model on a specific kind of bug, it performs well for that kind of bug, and less well for other kinds. 2) If you train a model on a sample including all kinds of bugs, but which accentuates the observed bias even further, then the performance of the model reflects this accentuation. These observations cast doubt on the effectiveness of bug prediction models trained on biased models.

### Potential Threat
Sadly, we do not have an unbiased oracle to truly evaluate BugCache performance. Thus, BugCache might be overcoming bias, but we are unable to detect it, since all we have is a biased linked sample to use as our oracle. First, we note that BugCache is predicated on the locality and recency effects of bug occurrence. Second, the data indicates that there is strong locality of bugs, when broken down by the severity and experience bug features. For BugCache to overcome bug-feature bias, bugs with features that are over-represented in the linked sample would have to co-occur (in the same locality) with unlinked bugs with features that are under-represented. It seems unlikely that this odd coincidence holds for both EclipseZ and EclipseB.

## 7. CONCLUDING DISCUSSION
In this paper we defined the notions of bug-feature bias and commit feature bias in defect datasets. Our study found evidence of bug-feature bias in several open source data sets; our experiments also suggest that bug-feature bias affects the performance of the award-winning BugCache defect prediction algorithm. Our work suggests that this type of bias is a serious problem. Looking forward, we ask, what can be done about bias?

One possibility is the advent of systems like Jazz that force developers to link commits to bugs and/or feature requests; however, experience in other domains suggests that enforcement provides little assurance of ample data quality [51].

So the question remains: can we test hypotheses reliably, and/or build useful predictive models even when stuck with biased data? As we pointed out in section 2.4 some approaches for building models in the presence of bias do exist.

We are pursuing two approaches. First, we have engaged several undergraduates to manually create links for a sample of unlinked bugs in Apache. It is our hope that with this hard-won data set, we can develop a better understanding of the determinants of non-linking, and thus build statistical models that jointly describe both bug occurrence and linking; we hope such models can lead to more accurate hypothesis-testing and bug-prediction. Second, we hope to use commercial datasets that have nearly 100% linking to conduct Monte-Carlo simulations of statistical models of biased non-linking behaviour, and then develop and evaluate, also in simulation, robust methods of overcoming them (e.g., using partial training sets as described above).

We acknowledge possible threats to validity. The biases we observed may be specific to the processes adopted in the projects we considered; however, we did choose projects with varying governance structures, so the results seem robust. As noted earlier, our study of bias-effects may be threatened by highly specific (but rather unlikely) coincidences in bug-occurrence and linking. It is possible that our data gathering had flaws, although as we noted, our data has been carefully checked. Replications of this work, by ourselves and (we hope) others will provide greater clarity on these issues.

## 8. REFERENCES
[1] A. Agresti and B. Coull. Approximate Is Better Than “Exact” for Interval Estimation of Binomial Proportions. The American Statistician, 52(2), 1998.  
[2] C. Ambroise and G. McLachlan. Selection bias in gene extraction on the basis of microarray gene-expression data. Proceedings of the National Academy of Sciences, 99(10):6562–6566, 2002.  
[3] A. Bachmann and A. Bernstein. Data retrieval, processing and linking for software process data analysis. Technical report, University of Zurich, 2009. Published May, 2009. http://www.ifi.uzh.ch/ddis/people/adrian-bachmann/pdq/.  
[4] A. Bachmann and A. Bernstein. Software process data quality and characteristics - a historical view on open and closed source projects. IWPSE-EVOL 2009, 2009.  
[5] V. Basili, G. Caldiera, and H. Rombach. The Goal Question Metric Approach. Encyclopedia of Software Engineering, 1:528–532, 1994.  
[6] V. Basili and R. Selby Jr. Data collection and analysis in software research and management. Proc. of the American Statistical Association and Biomeasure Society Joint Statistical Meetings, 1984.