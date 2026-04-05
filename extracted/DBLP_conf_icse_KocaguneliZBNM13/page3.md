## III. FIVE HYPOTHESES

of FreeBSD [31]. He reports that geographical dispersion of developers does not have a significant effect on the code quality or on the bug density. Nagappan et al. use a novel approach to dispersion [22]. Instead of geographical, they investigate the relationship of organizational structure to software quality. Their results reveal that organizational metrics are significantly related to post release failure-proneness.

Bird et al. investigate the effects of distributed development on the binaries of Windows Vista [4]. Their findings are aligned with that of Spinellis [31] although the investigated products have different development strategies. Bird et al. report that the geographical dispersion of the commits to binaries has little to no effect on the post release failures.

The prior work, as summarized in Section II, helps us identify and check the implications of code ownership and distributed development. Although there are counter examples [11], [33], the code ownership is reported to be strongly associated with software quality [5], [6], [19], [21], [26]. Prior results show that distributed development is affected by the issues of communication and coordination [12], [28] as well as geographical dispersion [3], [31], which may have impacts on the produced software in terms of software quality [4], [27].

A standard way to test the above implications is to form the associated null hypotheses, i.e., to check their opposite viewpoint. Forming the null hypothesis and testing its significance is one of the most widely used standard analysis techniques in empirical software engineering [16]. The null hypothesis is basically a statement, which is formed in a way so that it has the possibility of being rejected. Note that the null hypothesis cannot be proven; one can only “fail to reject” it. Because the set of collected data is only a sample, which can help us reject a hypothesis, but which is not enough to prove it. Once the null hypothesis is formed, it is checked with the appropriate statistical test, which shows us whether we reject or fail to reject it. If we ignore the minority reports of Weyuker and Graves, then the implications of the related work on code ownership and distributed development can be summarized as follows: the following five hypotheses will be rejected.

It is possible that the existence of developers who are experienced on a file is likely to have different impacts on collocated and distributed files. Even if a distributed file has a major developer (who is deemed to be experienced on this particular file), there may still be edits to this file performed by developers located in a remote geographical component. The communication between experienced and inexperienced developers is possibly more difficult in such cases of distributed files. Hence, it may be the case that collocated and distributed files associated with major developers have different bug counts. This leads to the hypothesis:

H1: Collocated and distributed files associated with major developers (MaDC > 0) have similar post-release quality.

The variable MaDC is a measure that detects if there are a small number of developers working on the code. MaDC is the number of developers, who commit more than 40% of all the edits on a file.

In a similar manner, even if a collocated file has no major developers (i.e. no experienced developer with a considerable percentage of the edits) then if:

- The developers of collocated teams are still located within close proximity of each other;
- They have better communication and coordination opportunities compared to the developers of a distributed file;

then the files of collocated teams without any major developers (i.e. MaDC = 0) may have less bugs compared to distributed files with only minor developers. Hence, the hypothesis:

H2: Collocated and distributed files without any major developers (i.e. MaDC = 0) have similar post-release quality.

Prior studies have used binary level information to investigate the relation of distributed development to post-release quality [3], [4]. Their findings show that there is negligible difference between collocated and distributed binaries in terms of post release failures and code metrics. The related hypotheses that will be tested in this research at the file level are:

H3: Collocated and distributed files are equally failure prone.

H4: Collocated and distributed files have similar change and size metrics.

Finally, the ownership properties are shown to be effective information sources for software products [5], [19], [24], [26]. Battin et al. names ownership of a component as one of the critical strategies among the development tasks [2]. In this research we investigate ownership from a distributed development point of view. We need to test if there is a significant difference among different ownership metrics. This leads to our last hypothesis:

H5: Collocated and distributed files have similar ownership metrics.

## IV. METHODS USED IN THIS STUDY

This section describes the metrics, data collection, and statistical analyses used to test H1, H2, H3, H4, H5.

### A. Definition of Metrics

This section explains the metrics used in our research. So as to position our study accordingly, we used the goal question metric approach as proposed by Basili [1]. We group the metrics used in this research under 4 categories: Distribution, ownership, change and size metrics.

Distribution Metrics: Geographical distribution of a file is defined using 5 divisions: Building, City, State, Country and World. A file can be owned by a group of people working in the same building, same city, same state and so on:

- Owned By Building (OBB): If 75% or more of the edits to a file come from a single building, then this variable is 1, indicating that this file is owned at the building level. Otherwise, it is set to 0.
- Owned By City (OBCi): When none of the buildings can claim ownership to a file, then we look at the city level. If