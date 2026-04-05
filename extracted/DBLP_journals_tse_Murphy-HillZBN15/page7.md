for each group.

| Years' Experience | Open Source | Closed Source |
| --- | ---: | ---: |
| Minimum | 0.5 | 1 |
| Maximum | 13 | 32 |
| Median | 8.5 | 8 |
| Median in Current Project or Company | 3 | 4 |

All participants but two reported being in the role of “developer”; one reported being in a research role, one in a cross-functional software role.

In the results section, we do not treat open-source developers separately from closed-source developers for this survey. From a theoretical perspective, we treat the two the same because the main effect of interest is not differences between open and closed source, but to what extent Microsoft developers differ from all other developers. From a practical perspective, the main phenomena of interest (measured in terms of the answer to the question “Of the bugs that you fix, what percentage are there multiple potential fixes?”) did not vary significantly between closed- and open-source developers (Mann–Whitney U-test, p = .226). Overall, the replication showed just two statistically significant differences between Microsoft developers’ responses and other developers’ responses in the replicated survey.

## 5 RESULTS

We next characterize the design options that engineers have when selecting a bug fix (Section 5.1), and then describe how engineers choose which fix to implement (Section 5.2).

### 5.1 Description of the Design Space

In our interviews, we asked participants to estimate what percentage of their bugs had multiple possible solutions. The median was 52%, with a wide range of variance, with individual responses ranging from 0% to 100%. Similarly, 62% of interviewees indicated that of their bugs they fix, “more than one fix will satisfy all stakeholders.” Although these numbers should be interpreted as a rough estimate, it suggests that many bugs can be fixed in multiple ways.

With respect to the dimensions of the design space, we obtained answers to this research question by asking interviewees to explain the different fixes that they considered when fixing a single bug. In bold below, we present several dimensions on which bugs may be fixed, a description of each dimension, and example vignettes from our interviews. Note that a single fix can be considered a point in this design space; for example, a fix may have low error surfacing and high refactoring, and simultaneously be placed in the other dimensions. Figure 3 shows an example of a single, hypothetical bug that has two different fixes that illustrate the concept.

![Two fixes for the same hypothetical bug plotted in the design space](page7_img_1.png)

© Microsoft Corporation same bug: fix A fix B. Fig. 3. Two fixes for the same hypothetical bug plotted in our design space.

We expect that the dimensions are likely not completely independent, and further research is necessary to determine the kind and degree of interdependence. The dimensions are also not intended to be exhaustive, yet we believe that the number of interviews we performed suggests that this list represents a solid foundation on which to build a theory of bug fix design.

#### Data Propagation Across Components

This dimension describes how far information is allowed to propagate across a piece of software, where the engineer has the option of fixing the bug by intercepting the data in any of the components. At one end of the dimension, data is corrected at its source, and at the other, just before it is displayed at its destination, such as the user interface.

For example, P15 described a bug that manifested as an exception that was erroneously reported to the end user. He could have placed a try-catch block anywhere between where the exception was originally thrown and the user interface. Placement of the block at any of these locations would have fixed the bug from the end-user’s perspective by eliminating the exception being thrown.

As another example, P25 worked on software with a layered architecture, with at least four layers, the top-most being the user interface. The bug was that the user interface was reporting disk space sizes far too large, and the engineer found that the problem could be traced back to the lowest-level layer, which was reporting values in kilobytes when the user interface was expecting values in megabytes. The interviewee could have fixed the bug by correcting the calculation in the lowest layer, or by transforming the data (dividing by a thousand) as it is passed through any of the intermediate layers.

#### Error Surfacing

This dimension describes how much error information is revealed to users, whether that information is for end users or other engineers. At one end of the dimension, the user is made aware of detailed error information; at the other, the existence of an error is not revealed.

P28 described a bug in which the software he was developing crashed when the user deleted a file. When fixing the bug, the engineer decided to catch the exception to prevent the crash, but also considered whether or not the user