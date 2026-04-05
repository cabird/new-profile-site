A simple set intersection is performed to classify each of the buggy lines as either "copy" or "unique". We then find the buggy cloned code and calculate the clone ratio in the bugs. We stored all of our information in a PostgreSQL database before processing them.

In one specific Apache snapshot, we found abnormal (4 fold) increase of source code line count and a corresponding spike in the clone ratio. We believe this was due to some accidental copying of major project elements, and we therefore ignored that snapshot. All the bugs that have that snapshot as their staging snapshot were mapped back to the immediate preceding snapshot.

## 5 Findings

### RQ1 To what extent does cloned code contribute to bugs?

For each bug in the project, we consider how much cloned code contributes to that bug, viz., its bug-clone ratio. Now we can consider cumulative bug-clone ratio distribution for all the bugs in a given project. So for example, if the cumulative distribution indicates that most of the bugs have a clone ratio (defined earlier, in Section 3.8 above) between 80 and 100%, we can conclude that clones contribute heavily to bugs; alternatively, if most of the bugs have 1% or lower clone ratio, then we know that clones contribute almost no bugs.

Figure 1 shows the cumulative bug coverage at different clone ratios. We show only Apache and Gimp as they are representative. The plot shows the fraction of bugs that have a clone ratio ≤ a given clone ratio. So, if b bugs have a clone ratio ≤ r, and there are total t bugs, then the plot shows b/t on the Y axis against r on the X axis. 1 − b/t portion of bugs have higher clone ratio than r. As is evident from the plot, most of the bugs in both liberal and conservative clone detector settings contain hardly any cloned code. In fact, besides Gimp, 80% or more bugs in the other projects contain no cloned code at all. Even for Gimp, this threshold is close to 80%. The vertical lines depict the average clone ratio across all snapshots for different clone

![Cumulative coverage plots for Apache and Gimp](page11_img_1.png)

Fig. 1 Cumulative coverage of bugs at a given clone ratio (a) Apache (b) Gimp