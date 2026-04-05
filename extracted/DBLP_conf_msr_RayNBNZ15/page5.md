## TABLE II: Study Subject

### Project A
- Total number of changed files: 2,485
- Number of File Commits: 6,264
- Number of Changed Lines: 364,737
- Number of Hunks: 50,102
- Development Period: 2010-12-03 to 2013-06-03
- Number of Developers: 289

### Project B
- Total number of changed files: 56,803
- Number of File Commits: 227,844
- Number of Changed Lines: 12,864,319
- Number of Hunks: 1,854,666
- Development Period: 2010-11-30 to 2013-06-11
- Number of Developers: 1,338

### Linux 3.0
- Total number of changed files: 17,695
- Number of File Commits: 166,749
- Number of Changed Lines: 4,623,333
- Number of Hunks: 798,399
- Development Period: 2011-05-19 to 2013-08-29
- Number of Developers: 4,216

![Plot of extent of unique changes vs token size in Linux](page5_img_1.png)

Fig. 2: Extent of unique changes over different token size in Linux

### RQ1. What is the extent of unique changes?

Figure 2 shows the extent of uniquely added and deleted lines with a varying token threshold (10 to 100), in Linux. Note that a threshold represents minimum number of contiguous tokens that need to be similar between two cloned regions. At threshold 10 (around 1–2 lines), 70.81% of changed lines is unique, while at threshold 100 (around 16–20 lines), 93.61% changed lines are unique. The median and average of uniquely changed lines are 88.38% and 85.61% respectively, which is also achieved at threshold 50. Thus, uniqueness increases with the increase of token threshold for both added and deleted lines.

Since source code in general lacks uniqueness [8], non-unique changes detected at a very low threshold like 10 may simply detect changes caused by program construct, for example an addition of a for loop. In contrast, if the threshold size is set to a very high value, we might ignore some important non-unique changes that developers introduce in purpose. This leads us to choose a middle ground—threshold 50 for the rest of our experiment. A non-unique change at threshold 50 means that there are at least 7 to 8 non-unique lines. These 7–8 lines can be either a large non-unique change or a small non-unique change with unchanged context above and below the change also being non-unique. Table III shows the extent of uniquely changed lines for all the studied projects at token threshold 50. Project B shows maximum non-unique changes (three million lines) over its entire evolution period.

## TABLE III: Extent of Uniquely Changed Lines (with a token threshold of 50)

Changed Lines (LOC)

| Project | Total | Unique | Non-Unique |
|---|---:|---:|---:|
| Project A | 364,737 | 82.77% | 17.44% |
| Project B | 12,864,319 | 74.82% | 25.18% |
| Linux | 4,623,333 | 87.41% | 12.59% |

## TABLE IV: Distribution of Non-Uniquely Changed Hunks. Note that these categories are not disjoint, because a hunk can share only non-unique addition with one hunk, while sharing non-unique deletion or modification with another.

|  | non-unique addition | non-unique deletion | non-unique modification |
|---|---:|---:|---:|
| Project A | 82.25% | 24.31% | 24.20% |
| Project B | 71.54% | 25.75% | 18.71% |
| Linux | 34.94% | 30.98% | 34.08% |

Now that we have seen the extent of non-unique changed lines in a project — 12% to 25% — we would like to shed light on their evolutionary pattern, i.e. whether they are added, deleted, or modified non-uniquely. Since it is difficult to identify mapping between individual added and deleted lines, we focus on added and deleted regions (i.e. hunks), as discussed in Section II-C. Table IV shows the distribution of hunk uniqueness across projects. In projects A and B, non-unique addition dominates significantly (82% and 71%), while non-unique deletion and modification share similar proportion. In Linux, all the three categories are in the same range (30% to 34%).

Finally, we check how many non-unique patterns are formed from the observed non-unique changes (see Section II-D). The following table shows the result. Three million non-unique changed lines in Microsoft codebase come from only 300K distinct non-unique patterns. In Linux, 582K non-unique changed lines come from 142K patterns. On average, these patterns occur 3.4 and 3.3 times in Microsoft projects and Linux respectively. They are often short-lived—average lifetime (last commit date − first commit date) is 63 and 67 days in Microsoft projects and Linux respectively. These results indicate developers often introduce non-unique change patterns, use them few times at quick succession, and then stop using them.

| Project | non-unique change (KLOC) | patterns | Occurrence | Lifetime |
|---|---:|---:|---:|---:|
| Microsoft (A+B) | 3,278 | 324,285 | 3.4 | 63.04 |
| Linux | 582 | 142,633 | 3.3 | 67.79 |

> Result 1: Unique changes are more common than non-unique changes. Non-unique changes form distinct patterns that often repeat multiple times in the code base within a short span of time.

Since the extent of non-unique changes is non-trivial, we wonder who commits such non-unique changes. Since developers usually have individual coding style [29], [14], it may be possible that some developers introduce more non-unique changes than others. It is also important to know whose changes they borrow. Especially, if we find that developers