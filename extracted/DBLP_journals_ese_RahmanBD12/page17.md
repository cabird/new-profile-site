### Table 7 Comparison of defect density for conservative setting in file-scattered and file-collocated clone groups

![Table 7: defect density (conservative setting)](page17_img_1.png)

Name  Median ratio for collocated  Median ratio for scattered  Median difference  Wilcoxon p-value

Nautilus 0.1504 0.1034 0.0469 6.000e-03

> Alternative hypothesis set to “defect density in (file) scattered clones is higher”. All p-values have been adjusted using the Benjamini–Hochberg procedure

In RQ2 we again work with clone ratio which is robust against the mentioned linking problem. We ignore bugs that are not linked and consider clone ratio in linked bugs. As long as there is no systematic bias in linking process to leave out bugs that have cloned code in them, our results of RQ1 is also robust and statistically sound.

### RQ4 Are scattered clones more buggy than collocated clones?

For this research question, we consider two different granularities. First, we try to find the impact of file scattering on defect proneness; and next, we assess the impact of directory scattering on defect proneness. We partition clone groups based on the number of files (or directories) they span. Clone groups whose members reside in the same file (or directory) are considered collocated. Scattered clone groups comprise the rest. We assess the impact of scattering on defect proneness by comparing the defect density (number of buggy lines per cloned line, buggy lines / total lines) for scattered and collocated clone groups. Like RQ3, we only consider clone groups that contribute at least one line in some buggy code.

Figure 4 compares the defect densities for collocated and scattered clone groups at file level. We also test for statistical significance of the difference of mean defect density across these two sample sets using the one tailed (alternative hypothesis set to “defect density in (file) scattered clones are lower”) Wilcoxon signed rank test with continuity correction. The results are shown in Tables 7 and 8. As is apparent from the figure and the corresponding p-values, file-scattered clones may not induce more defective code. Indeed file-scattered clones seem to have lower defect density.

The above result invited further study, particularly at a higher analysis granularity. A logical extension is to do the same for directory scattering. We therefore partition clone groups based on their directory scattering. The result is depicted in Fig. 5. As

### Table 8 Comparison of defect density for liberal setting in file-scattered and file-collocated clone groups

![Table 8: defect density (liberal setting)](page17_img_2.png)

Name  Median ratio for collocated  Median ratio for scattered  Median difference  Wilcoxon p-value

Nautilus 0.1111 0.0889 0.0222 3.000e-04

> Alternative hypothesis set to “defect density in (file) scattered clones is higher”. All p-values have been adjusted using the Benjamini–Hochberg procedure