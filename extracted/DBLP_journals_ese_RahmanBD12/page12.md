detector settings. So, e.g., we can say that for Gimp about 85% of bugs have lower clone ratio than overall project clone ratio. This finding suggests that only a small number of bugs are attributable to cloning.

### RQ2 Do clones occur more often in buggy code than elsewhere?

We compare all the bugs' clone ratio (proportion of cloned code, in all bugs, taken together) against the overall clone ratio in the project at the time that bug is fixed. So, if a bug is fixed at the r-th revision, and x% of the total code of the project, in the (r − 1)-th revision, was from clones, we ask if the buggy code in that revision has a bigger or smaller proportion of cloned code, compared to the overall project code. Since we do not have clone information for all possible revisions, we just project each line number back in the history to its staging snapshot and see whether a line is a clone or not. We then compare the staging snapshot's clone ratio against all the bugs' combined clone ratio that pertain to that staging snapshot. So, if a staging snapshot ss_b has n different bugs that include a combined total m lines, of which c total lines are contributed by clones, we compare c/m against clone ratio of ss_b. We consider two samples: each

![Four-panel boxplots showing clone ratio in snapshots and bugs for Apache and Gimp (conservative and liberal)](page12_img_1.png)

Fig. 2 Clone ratio in bugs and snapshots for a Apache (Conservative) b Apache (Liberal) c Gimp (Conservative) d Gimp (Liberal)