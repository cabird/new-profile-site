![Three scatter plots of keyterm counts for Postgres, Apache, and Python](page3_img_1.png)

Figure 2: Cumulative counts of keyterm occurrence on hunks (x-axis) and emails (y-axis), for projects (left to right) Postgres, Apache, and Python. Correlation in all cases is very high and highly significant.

Both of these were measured as simple occurrence counts. We studied this relationship in two ways: cumulatively over the entire life of the project, and sequentially, comparing talk and work over successive time periods.

### 4.1 Talk & Work: Cumulative

There is a strong relationship between the hunk counts (representing work) and email counts (representing talk) in all four projects studied. Figure 2 shows the scatter plots of the counts for Postgres, Apache, and Python. Since the data is heavily left skewed, and has a high range, we use a log-log plot. Ant shows similar (even stronger) correlation, but is omitted due to space reasons. Table 2 gives the correlations of all the different projects.

The consistency of this behavior across different projects is quite striking. The prima facie interpretation is that, cumulatively over the life of each project, if a keyterm is frequently mentioned in hunks (i.e., it is frequently a subject in code changes) then it is frequently discussed in emails. For example, the function apr_thread_exit is used in hunks 15 times, and mentioned in messages 52 times, whereas the function apr_thread_mutex_lock is used in hunks 176 times and mentioned in email 179 times. Likewise apr_thread_mutex_unlock is used 285 times and mentioned 219 times.

This result suggests an overall, consistent relationship between work and talk: the more a keyterm is used in code, the more it needs to get discussed. This finding suggests an obvious next step: is this result consistent over time?

### 4.2 Talk & Work: Intervals

The next study we did was to check if there is a consistent relationship between “work” and “talk” for keyterms during successive intervals. To study this, we broke down the available lifespan of each project into 3 month intervals. For each 3 month interval, we gathered data on keyterm occurrence in hunks and in emails, and did the same analysis. To our surprise, the results were quite different (see figure 3). In this plot, each keyterm might give rise to several points on the graph, corresponding to hunk use and message counts at different intervals.

In two of the four projects, viz., Ant and Python we found strong correlations; however, Apache and Postgres were much lower. Even the strongest correlation in this experiment, Ant, was not as strong as it was in the first experiment. However, the results in Python and Ant are still significant. We show the same 3 projects as before in figure 3, omitting Ant for reasons of space. The results are summarized in Table 2. While all correlations are statisti-

![Table of correlations for projects and time intervals](page3_img_2.png)

for projects and different time intervals

### 4.3 Discussion

The above results leave us in a quandary. The cumulative data show such a strikingly strong relationship between use in hunks and mentions in messages, whereas the interval data show a weaker relationship. It is quite puzzling that a relationship that is weak in pieces should cumulatively turn into a strong one. Why does this happen? The conclusive answer is left for future work, but we offer a tentative theory in the ensuing discussion.

The implication here is that there is somehow a cumulative conservation of the “talk” ratio. If a function is used a lot, there is a lot of discussion about it at some point in time, but not necessarily at the same time when it is used. Perhaps this is because very useful functions are carefully designed, and are therefore a subject of a lot of discussion earlier in their life cycle. On the contrary, if they are used heavily without prior careful discussion and design, then they become troublesome later, and get discussed a lot. This theory would explain why the relationship may be weaker over intervals, but is strong when cumulated.

As a preliminary investigation into this working hypothesis, we looked at the Apache portability run-time functions which are well used and designed functions in the Apache software platform; these functions form a portability layer that is used to keep the core HTTPD software relatively easy to port. All the functions in this layer have a name that begins with “apr_” and are easy to identify. For all these functions, we computed the ratio mentions in emails and mentions in hunks + 1, then grouped the values by 3 month intervals and studied the changes. While we have not yet completed the analysis, we show an especially telling sample for a popular string printing function (Figure 4). The x-axis shows the year and interval within the year; the y-axis is the ratio above. This plot suggests that the ratio of email mentions to hunk use