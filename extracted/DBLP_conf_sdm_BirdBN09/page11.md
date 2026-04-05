of the covariance matrix. If the scree plot falls sharply, then the first few eigenvectors explain a large amount of variance in the data set. In our context, this means that the profiles of the authors for the conferences are fairly uniform and implies that the conference is not very diverse. We also examine the loadings on the principal eigenvectors to see which areas contain the most variation in their author profiles. Areas that have low loadings have low variance. In our data, we have found that this is almost always indicative of negligible publication counts. For each venue, we report the variance explained in the first two eigenvectors and the areas with highest loadings.

The following example illustrates one limitation of our approach. Suppose a conference attracts only authors who each have equally strong publication records in the same three areas. In this case, the principal eigenvector accounts for the majority of the variance, leading to a conclusion that the conference is not interdisciplinary. This contrasts starkly with the publication profiles of the authors, who are interdisciplinary by definition. We observe that in practice, this does not occur in the data.

RESULTS: Table 5 contains the cumulative variance explained in the first three eigenvectors produced via PCA, in its columns labeled Var 1–3. The columns Area 1–3 capture the areas of highest loading across these three eigenvectors. Although eigenvectors are linear combinations of all areas, we found that each eigenvector had one or two areas (dimensions) that predominated. We see that SYS accumulates the least proportion of its variance in its first three eigenvectors, while architecture’s sum rises sharply. This confirms the folklore that systems is highly interdisciplinary, while architecture, which differs from other areas in that it is closer to the metal and must consider physical constraints, is not. Since it is foundational, we expect theory to appear often in the loading columns and indeed it does, appearing 8 times.

![Table 5: PCA Results by Area](page11_img_2.png)

Table 5: PCA Results by Area

To confirm widely held beliefs about the interdisciplinary reputations of particular conferences, we performed the same analysis on SDM, ICSE, FOCS, and STOC. SDM and ICSE are widely believed to draw authors who have diverse research interests, while FOCS and STOC are thought to attract authors who are more narrowly focused. Our analysis confirms these stereotypes. Figure 7 shows the proportion of variance explained by each principal component.

![Scree plot for PCA of FOCS and ICSE](page11_img_1.png)

Figure 7: Scree plot for PCA of FOCS and ICSE

## 6 Conclusions and Future Work

In this paper, we have presented a quantitative study of collaboration patterns of the computer science research community. In particular, we have examined the collaboration network derived from the DBLP bibliographic database. We first divided the network into computer science subareas and then applied various network analysis metrics to find differences in the research styles of the areas and how these areas interrelate in terms of author overlap and migration. Our results are informative—they not only confirm computer science folklore, but also highlight some patterns that we found surprising. For example, we found that the areas differed greatly in their level of integration and the degree to which they are interdisciplinary. We have also identified areas that are dominated by a few researchers. These findings may highlight potential problems within our community and suggest policies and actions to guide us towards a more effective scientific community.

There are many potential directions for future research. First, this exploratory work has generated a number of preliminary results for which we intend to formulate, test, and validate hypotheses. Second, we plan to extend our analysis to journals and less well recognized conferences besides those first-tier conferences considered in this work to investigate whether the patterns are similar or different. Finally, we plan to examine people’s citation patterns to see whether or how they may correlate with collaboration patterns. The goal is to gain a good understanding of the structure and dynamics of our research community.

References

[1] R. Albert and A.-L. Barabasi. Statistical mechanics of complex networks. Reviews of Modern Physics, 74:47–97, 2002.

[2] U. Alon. Biological Networks: The Tinkerer as an Engineer, 2003.