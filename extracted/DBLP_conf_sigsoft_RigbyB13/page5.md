specified in advance. Since this is comparison data, we discuss differences, but do not present this data in figures.

OSS project: Rigby et al.'s work considered six OSS projects, Apache, Subversion, Linux, FreeBSD, KDE, and Gnome [24, 25, 23]. The review data was extracted from developer mailing lists. For a review to be considered valid it had to contain the following: 1) a change or 'diff' and 2) one or more emails from reviewers (i.e. not the author of the change). Both accepted and rejected changes that were reviewed are in the data set. Like the Lucent data, we do not report this data in our figures.

Plotting the Data: We use two types of plots: beanplots and boxplots. Beanplots show the distribution density for multiple samples along the y-axis (rather than more commonly along the x-axis) to enable easy visual comparison and in this work contain a horizontal line that represents the median [13]. Beanplots are best for a large range of non-normal data as they show the entire distribution (they essentially show the full distribution drawn vertically, and show whether there are peaks and valleys in a distribution) while boxplots are better for smaller ranges. When we have count data that is highly concentrated, we use a boxplot. For all the boxplots in this work, the bottom and top of the box represent the first and third quartiles, respectively. Each whisker extends 1.5 times the interquartile range. The median is represented by the bold line inside the box. Since our data are not normally distributed, regardless of the style of plot, we report and discuss median values.

## 4. MULTIPLE CASE STUDY FINDINGS

In this section, we present our convergent and divergent findings in the context of iterative development, reviewers selection practices, review discussions and defects, and knowledge sharing through review. For each finding, we place it in the context of the Software Engineering literature on peer review, summarize it in a "Convergent Practice" box, and then discuss the evidence that we have for each practice.

### 4.1 Iterative Development

The concept of iterative development is not new and can be traced back to the many successful projects in the early days of software development [14]. However, progressive generations of software developers have worked in shorter and shorter intervals. For example, "continuous builds" [8] and "release early, release often" [21]. Peer review is no exception.

An original goal of software inspection was to find software defects by exposing artifacts to criticism early in the development cycle. For example, Fagan inspection introduced early and regular checkpoints (e.g., after finishing a major component) that would find defects before the software’s release. However, the time from when the review started to when the discussion ended (i.e. the review interval) was on the order of weeks [9]. In 1998, Porter [19] reported inspection intervals at Lucent to have a median of 10 days. OSS projects like Apache and Linux have review intervals on the order of a few hours to a day [23].

![Beanplots/violin plots of review intervals across projects](page5_img_1.png)

Figure 1: First Response on left (we do not have first response data for AMD) and Full interval on right

> Convergent Practice 2: Reviews happen early (before a change is committed), quickly, and frequently

AMD, Microsoft, and the Google-led projects exemplify the convergent practice of frequent reviews, Figure 2, that happen quickly, Figure 1. The reviews are always done early (i.e. before the code is checked into the version control system).

AMD: AMD has short review intervals, with the median review taking 17.5 hours. The number of reviews per month is also high and increases from a few reviews per month when the tool and practice was introduced, to over 500 reviews per month.

Microsoft: Bing, SQL, and Office also show short intervals for reviews with median completion times of 14.7, 19.8, and 18.9 hours respectively. In terms of reviews per month, all three projects are very active, but show different trends. SQL has a median of 3739 reviews per month and is fairly consistent month to month. In contrast, Bing has a median of 2290, but has shown a steady increase over time since its initial adoption of CodeFlow. Office has the highest median at 4384, and it follows a typical release cycle with an initial ramp up of reviews and a fall-off near release.

Google Chrome and Android: The median frequency is 1576 and 310 for Chrome and Android, respectively. The median completion time is 15.7 and 20.8 hours, for Chrome and Android, respectively.

Project Comparisons: The review interval, which is on the order of hours and with a median around a day, shows