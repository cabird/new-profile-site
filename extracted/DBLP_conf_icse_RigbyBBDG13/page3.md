![Diagrams showing exchanges for CVC and DVC (four panels)](page3_img_1.png)

(a) Peers using CVC (b) Peers using DVC (c) Dictatorship using CVC (d) Dictatorship using DVC  
Figure 1: Exchanges required for the programmer p to obtain the most recent changes in a peer group or dictatorship for both CVC and DVC.

![Diagrams for dictatorship exchanges (two panels)](page3_img_2.png)

(b) Dictatorship using DVC  
Figure 2: Exchanges needed for a dictator to update his repository from the rest of the development team using CVC and DVC.

hierarchy:  
h = |x − y| / (x + y). (1)

For a pure hierarchy, h = 1 and for a pure peer group h = 0. In a pure hierarchy, no individual will review or sign-off on any individual above them in the hierarchy. If Linux is a pure hierarchy, nobody would ever sign off Torvalds' work. In contrast, in a peer group, a pair of individuals would sign off on each other's work. On the continuum from pure hierarchies and pure peer groups, the metric examines the degree to which relationships between pairs of developers are hierarchical.

Results: We now employ the hierarchy metric h to evaluate, in the context of this case study, whether our hypothesis holds.

The number of purely hierarchical pairs of developers (i.e. h = 1) dominates both distributions: 73% for FreeBSD and 94% for Linux. However it is clear that FreeBSD has far fewer purely hierarchical developer pairs.

Although OSS projects typically have a small number of core developers that do most of the work, there is a much larger group of developers that submit a small number of contributions. These developers do not have the authority to sign off on code in either Linux or FreeBSD [5].

We examine pairs of developers who have reviewed each other at least once (i.e. have a reciprocal relationship). Figure 3 shows that, conditioned on reciprocal relationships, FreeBSD, whose median is h = 0.75, is again less hierarchical than Linux at h = 0.96. A Wilcoxon test indicates that this result is statistically significant at p < .001.

In light of these findings, we revise our hypothesis.

1) Hierarchical relationships dominate OSS projects. Large OSS projects are oligarchies or dictatorships that have a large number of external developers who do not have sign-off authority. This hypothesis is supported by previous literature on project structure [5], [9].

2) Socially central projects using DVC (Linux) are organized in a more hierarchical manner than socially distributed projects using CVC (FreeBSD).

Our conjectures compare pure DVC to pure CVC. However, on all projects there is a need for individual collaboration as well as some form of centralization from which official product releases can be made. Most DVC systems, like git or Hg, can be set up so that a publicly shared central repository can be pushed to by each developer’s personal repository. We suspect that the choice of version control system will not cause a project to change its governance structure. Future work is necessary to understand the value of this mixed VC configuration.

## IV. DEVELOPMENT SANDBOXES

Fogel, a prominent Subversion developer, states that DVC is much more difficult for people to grasp than CVC2. We believe that this is because changes to a CVC always move through the central repository (i.e. ‘up’ and ‘down’), while on a DVC changes can move between individual developers or between a repository shared by a group of developers.

2 Email, 2006, http://svn.haxx.se/dev/archive-2007-06/0780.shtml.