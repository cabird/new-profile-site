![Violin plots of reviews per month by project](page6_img_1.png)

Figure 2: The number of reviews per month

remarkable consistency across all projects. Figure 1 also shows the amount of time it takes for the first response to a review. We can see for all projects that most reviews are picked up within a few hours, indicating that reviewers are regularly watching and performing review.

The number of reviews per month, or the review frequency, is very high in comparison to traditional inspection practices, but tends to vary with the stage, development style, and size of the project (a divergent finding). In Figure 2, we can see three distinct types of projects: adoption (e.g., Bing), cyclic (e.g., Office), and stable (e.g., Chrome). The long tails in each beanplot show that adoption took place, and with AMD and Bing the amount of review is still increasing with each month. This trend can be seen in Figure 3, which plots Bing data as a time series. In contrast to this monotonic trend, cyclic projects, like Android, FreeBSD, and Office show an irregular cone shape, with gradual fluctuations in the amount of development and review (see Office in Figure 2). Finally, Chrome and SQL show a relatively stable number of reviews. Linux and KDE exhibit similar trends.

> Convergent Practice 3: Change sizes are small

Having a short interval cannot be achieved without changes to other aspects of software development. By creating smaller changes, developers can work in shorter intervals. For example, Mockus et al. noted that Apache and Mozilla had much smaller change sizes than the industrial projects they used for comparison, but did not understand why [15, 22]. On the OSS projects studied by Rigby et al., the median change on OSS projects varies from 11 to 32 lines changed. They argued that the small change on OSS projects facilitates frequent review of small independent changes.

![Scatter plot of reviews per month for Bing and Office](page6_img_2.png)

Figure 3: Number of reviews per month in Bing and Office. We were requested to keep raw numbers and dates confidential, but this plot shows the trends in code review as a tool is adopted (Bing) and over the course of a release cycle (Office).

From Figure 4, both Android and AMD have a median change size of 44 lines. This median change size is larger than Apache, 25 lines, and Linux, 32 lines, but much smaller than Lucent where the number of non-comment lines changed is 263 lines. Bing, Office, SQL, and Chrome have larger median changes than the other projects examined, but are still much smaller than Lucent. For example, Chrome’s median change is 78 lines and includes 5 files. However, for Chrome, only 23% of changes are the same size or larger than a median Lucent change. Furthermore, the distribution of changes on Google-led and the other OSS projects are left skewed indicating that the majority of changes are small. While the distribution for the commercial firms is also left skewed, it is almost log normal.

### 4.2 Selecting Reviewers

Traditionally, developers are assigned to review an artifact. On OSS projects, developers select the changes that they are interested in reviewing and no reviews are assigned. Many review tools allow for assignment as well as self-selection incorporating a positive mix of both techniques [26, 11, 6]. The self-selection used in review tools is accomplished by adding a group (e.g., a mailing list) to the reviewer list, then individuals from this group can find the review [20, 2]. In this section, we discuss the optimal number of reviewers as well as different reviewer selection techniques.

The optimal number of inspectors involved in a meeting has long been contentious (e.g., [5, 30]). Reviews are expensive because they require reviewers to read, understand, and critique an artifact. Any reduction in the number of reviewers that does not lead to a reduction in the number of defects found will result in cost savings. Buck [5] found no difference in the number of defects found by teams of three, four, and five individuals. Bisant and Lyle [4] proposed two person inspection teams that eliminated the moderator. In examining the sources of variation in inspections, Porter