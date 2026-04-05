### Table 5 Comparison of defect density for conservative setting in non-prolific and prolific clone groups

![Table 5: defect density (conservative setting)](page15_img_tbl5.png)

Nautilus 0.1304 0.0694 0.061 1.000e-02  
Alternative hypothesis set to “defect density in non-prolific group > defect density in prolific group”. All p-values have been adjusted using the Benjamini–Hochberg procedure

very similar and thereby we omitted them for brevity. Note that the bug density may occasionally go above 1.0. This is due to clone groups that contribute multiple bugs to the same buggy code. In these cases, some lines will be counted more than once, making the number of buggy lines greater than the total number of lines in a clone group. We find that prolific clone groups have a lower defect density than non-prolific clone groups. Tables 5 and 6 shows the effect size (difference of medians) and adjusted p-values (using Benjamini–Hochberg method) of Wilcoxon one-sided rank sum test with continuity correction. The alternative hypothesis is set to “defect density in non-prolific group is greater than defect density of prolific group”. All the p-values are statistically significant; thus we reject the null hypothesis. Clearly, there is a strong signal observed in all the studied projects; more copies does not mean more defects. In fact, the more copies, the lower the observed defect density.

We hasten to point out that others, for example (Göde and Koschke 2011; Kapser and Godfrey 2006, 2008; Kim et al. 2005; Krinke 2008; Thummalapenta et al. 2009) have argued that the fear of clones is perhaps overstated. To our knowledge, however, this is the first study to use data mined from version-control repositories and reported bug-fixes to provide quantitative evidence that clones are not necessarily to be feared. While Thummalapenta et al. (2009) study the clone evolution pattern and their relation with bug-fixing change sets, we mine data from source code management systems and issue tracking systems to identify buggy code and their association with cloned code. We also study the impact of quantitatively classified clones (based on their defect proneness) and complement the research of Kapser and Godfrey (2008), which study the relative presence of qualitatively classified clones. Also, to our knowledge, ours is the first study to indicate that larger clone groups are different from smaller clone groups with respect to defect attribution.

### Table 6 Comparison of defect density for liberal setting in non-prolific and prolific clone groups

![Table 6: defect density (liberal setting)](page15_img_tbl6.png)

Nautilus 0.1026 0.0698 0.0328 8.920e-03  
Alternative hypothesis set to “defect density in non-prolific group > defect density in prolific group”. All p-values have been adjusted using the Benjamini–Hochberg procedure