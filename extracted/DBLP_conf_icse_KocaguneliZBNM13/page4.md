If 75% or more of the edits to a file come from developers located in the same city, then this variable is 1; else, 0.

- Owned By State (OBS): If 75% or more of the edits come from the same state, then OBS is 1; otherwise 0.
- Owned By Country (OBCo): If 75% of the edits to a file come from the same country, then 1; otherwise, 0.
- Owned By World (OBW): If no geographical component can own up to 75% of the edits, then file OBW = 1.

The rationale for the above metrics is as follows. These metrics indicate the smallest geographical entity in which the developers account for 75% of the edits to a file. Note that distribution metrics are exclusive; a file can be owned at only one geographical division. The geographical division at which a file is owned influences how much a file is affected by the issues of distributed development [4]. For example, if a file is owned at the building level, then the developers are walking distance apart from one another. On the other hand, if it is owned at the country level, then the developers are relatively more affected by communication issues inherent in distributed development. These metrics enable us to define different scenarios of distributed development (see Section IV-C for 4 different scenarios). The reason for choosing a threshold of 75% of the edits for the distribution metrics is twofold. The first reason is based on the prior research on organizational [22] as well as geographical distribution [3], [4], where the same threshold value has been utilized. Also, a sensitivity analysis of threshold values from 65% to 85% with increments of 5% yielded no dissimilar results.

### Ownership Metrics:

**Edit Frequency (EF):** The total number of times a file is edited. An edit can be defined as the activity of a developer checking out a file, performing changes on this file and committing it back. Note that since EF forms the basis for multiple other ownership metrics, it is listed under ownership metrics in this study. However, EF can also be used as a basis for organizational metrics, e.g., Nagappan et al. lists EF as an organizational metric [22].

The purpose of EF is twofold. Firstly, if a file is being edited too many times, then it can be an indicator that the file is unstable or that the file is likely to have issues of post-release stability. Secondly, EF serves as a basis for the following ownership and experience metrics.

**Major Developer Count (MaDC):** The number of developers who commit more than 40% of all the edits on a file.

The rationale for this metric is that specialized component-based experience is important [26] and developers with more experience on a component are less likely to cause failures [21]. That is, major developers with higher edit percents on a file are deemed to have expertise on that file.

**Top Ownership Percentage (TOP):** The percentage of edits by the developer who has done most of the edits.

Similar to the major developer count, the value of the highest edit percentage on a file can inform us about the expertise of the developers working on a particular file.

**Total Developer Count (ToDC):** The number of all the developers editing a file.

The total number of developers working on a file is also important for a component [19], [33]. We are interested to see if collocated and distributed files are edited by a considerably different number of developers.

### Change Metrics:

- Total Added LOC (ALOC): Total LOC added to a file.
- Total Deleted LOC (DLOC): Total LOC file deletions.
- Total Edited LOC (CLOC): Total LOC edited in a file.

We use these change metrics since the total added, deleted and edited lines of code in all edits to a file can convey information that is useful to observe files that experience bigger amounts of change, hence become more susceptible to post-release problems.

### Size Metrics:

- Number of Functions (NOF): Functions per file.
- Number of Classes (NOC): Classes per file.

We use these size metrics since the total number of functions and classes in a file inform us about the functional properties of a file. A file with a much higher number of functions and classes may be more likely to have post-release issues. Hence, we include these metrics into our analysis.

### B. Data Collection

The data collected for this study enables us to investigate post-release quality of a distributed project at file level. The collected data also enables us to test hypotheses regarding the code ownership properties in collocated and distributed files as well as their relation to post-release quality. This study examines Office 2010. Office 2010 is developed within Microsoft by a total of 1500+ developers. It is composed of tens of thousands of source code files. The development history is traced from the release to manufacture (RTM) date of Office 2007 until the RTM date of Office 2010.

For our research there was the need for various different types of data, among which the most important was the commit information. The software commit information of Office 2010 (as well as other products) is stored in the software repositories of Microsoft. The repository data contains information regarding the name of the developer who performed the change, the time-stamp of the change, which file and what lines of this file were changed, what the intention of the change was (e.g. development for a new feature, enhancement, fixing a bug etc.), on which branch this change was performed and so on. Note that there is a complex branch structure associated with Office 2010. Some of the changes performed on files are associated with the movement of development activity towards the main branch (i.e. trunk). Such activities are not related to development, hence they are ignored.

For our analysis, we collected the number of edits performed by each developer on Office 2010 source files. We also recorded the change metrics associated with each edit. Then we mined the geographical information of each developer’s location to map files to different geographical components.

To collect the post-release bug information, we traced the bug correction activity of Office 2010 from RTM until the