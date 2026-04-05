**Table 1. Summary of studied systems**

| Name     | Max size | Total snapshots | Lines per snapshot | Number of linked bugs |
|----------|----------:|----------------:|--------------------:|----------------------:|
| Apache   | 208,388  | 155             | 124,462.62         | 453                   |
| Evolution| 531,342  | 129             | 324,487.14         | 1,440                 |
| Gimp     | 947,073  | 130             | 755,511.68         | 2,103                 |
| Nautilus | 366,894  | 116             | 131,062.94         | 747                   |

![Table 1 inset showing project sizes and snapshot statistics](page10_img_1.png)

to its staging snapshot and then determined intersection between buggy code and copied lines of that snapshot.

## 4 The Data Sets

We chose four different medium- to large-sized open-source projects for our study. All have a long development history, but are from different domains. All of the projects are written in C. We summarize our projects below.

1. APACHE httpd — Apache httpd is a widely used open source web server. We converted the repository from SVN to Git for ease of use.
2. NAUTILUS — Nautilus is the default file manager for the Gnome desktop. We were able to use their Git repository directly.
3. EVOLUTION — Evolution is the default email client for the Gnome desktop with support for integrated mail, address book and calendar functionality. We used their Git repository directly.
4. GIMP — Gimp is the most popular open source image manipulation program. We used their Git repository directly.

A summary of descriptive statistics of the projects studied is presented in Tables 1 and 2. They range in size from 124 k lines to about 755 k lines. The tables present details concerning the number of snapshots; average (computed over all snapshots) statistics on the average total number of clone lines; number of members (clone) per clone group; clone size in lines; number of cloned lines per snapshot; and total number of linked bugs (over the entire period).

For all the projects, we first identify monthly snapshots and then run Deckard to detect clones in those snapshots. We tag each of the lines of a snapshot as either a “copy” or a “unique” line. We then identify all the bug fix revisions. Buggy code is then identified by running Diff on the bug fix revision and its immediately preceding revision. We then map those buggy lines to their corresponding staging snapshots.

**Table 2. Summary of detected clones**

| Name     | Cloned lines per snapshot (conservative) | Clones per group (conser.) | Lines per clone (conser.) | Cloned lines per snapshot (liberal) | Clones per group (liberal) | Lines per clone (liberal) |
|----------|------------------------------------------:|---------------------------:|--------------------------:|------------------------------------:|---------------------------:|--------------------------:|
| Apache   | 13,817.02                                | 3.24                       | 14.79                    | 16,611.14                           | 3.25                      | 14.76                    |
| Evolution| 26,322.54                                | 2.49                       | 15.27                    | 33,011.09                           | 2.56                      | 15.34                    |
| Gimp     | 167,160.73                               | 3.38                       | 22.08                    | 176,090.99                          | 3.45                      | 22.04                    |
| Nautilus | 14,878.97                                | 2.20                       | 18.13                    | 17,495.76                           | 2.24                      | 17.85                    |

![Table 2 inset showing detected clone statistics](page10_img_2.png)

Data is averaged over all snapshots.