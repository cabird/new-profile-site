modified to fix a bug. So, buggy code for i-th bug fixed in revision r: BC_i = {L_{f,j}} where L_{f,j} is the j-th changed line in file f for fixing that bug (note: changed lines in a file may not be contiguous and buggy code for a single bug can span multiple files).

To determine buggy code, we first identify a revision which fixes a bug. If a bug is fixed in revision r we take the immediate preceding revision r − 1 and then we identify all the files that were changed in revision r. We then find the lines changed in each of these files. {L_{f,j}} = diff(f_r, f_{r−1}). Where diff is traditional Unix diff tool and f_r is the version of the file f at revision r. For all changed files f the set of changed lines {L_{f,j}} comprises our buggy code for i-th bug. Note: we ignore any newly introduced lines at revision r as they, by definition, could not be the cause of original bug.

### F. Bug Staging Snapshot

Each of the bugs is associated with its closest preceding snapshot which is called its staging snapshot (ss_b). So, if a bug b is fixed in revision r and revision r − 1 (the last revision prior to fixing that bug) occurs in month i of the project history, then i-th snapshot is its staging snapshot. The staging snapshot is where buggy code for a bug is analyzed. This is necessary because we do not have clone information available for some arbitrary revisions other than the chosen snapshots.

Due to possible intervening changes to buggy files between ss_b and r − 1, each of the buggy lines in a buggy code at revision r − 1 may have different line number at its staging snapshot. But for our purposes we need the older line number at ss_b instead of the newer line number at r − 1. To map a line at l_{r−1} to l_{ss}, we used Unix diff utility to find all the changes made to that file during this time period. So, if n lines were added and m lines were deleted on top of a given line number l_{r−1} between releases ss_b and r − 1, we adjust the overall difference to find l_{ss}. Also, if l_{r−1} was newly added sometime after revision ss_b (i.e. l_{r−1} was nonexistent in ss_b), then we ignore that line.

### G. Buggy Cloned Code and Bug Clone Ratio

Each of the lines in a buggy code fragment can be classified as either a copy or unique, based on whether that line is part of any of the clones recognized by DECKARD. We called the copied lines of buggy code buggy cloned code. We then calculate the ratio of such copied code in the buggy code, which we call bug clone ratio. Note, to determine any such partitioning of buggy code, we first mapped all the buggy codes to its staging snapshot and then determined intersection between buggy code and copied lines of that snapshot.

## IV. EXPERIMENTAL METHODS

We chose 4 different medium- to large-sized open-source projects for our study. All have long development history, but hail from different domains. All of our projects are written in C. We summarize our projects below.

1) Apache httpd – Apache httpd is a widely used open source web server. We converted the repository from SVN to git for ease of use.  
2) Nautilus – Nautilus is the default file manager for the Gnome desktop. We were able to use their git repository directly.  
3) Evolution – Evolution is the default email client for the Gnome desktop with support for integrated mail, address book and calendar functionality. We used their git repository directly.  
4) Gimp – Gimp is most popular open source image manipulation program. We used their git repository directly.

A summary of descriptive statistics of the projects studied is presented in table I. They range in size from 124K lines to about 755K lines. The table presents quite a bit of details about the number of snapshots, and average (computed over all snapshots) statistics on the average total number of clone lines, number of members (clone) per clone group, clone size in lines, number of cloned lines per snapshot, and total number of linked bugs (over the entire period).

For all the projects, we first identify monthly snapshots and then run DECKARD to detect clones in those snapshots. We tag each of the lines of a snapshot as either a copy or a unique line. We then identify all the bug fix revisions. Buggy code is then identified by running diff on the bug fix revision and its immediately preceding revision. We then map those buggy lines to their corresponding staging snapshots. A simple set intersection is performed to classify each of the buggy lines as either copy or unique. We then find the buggy cloned code and calculate the clone ratio in the bugs. We stored all of our information in a PostgreSQL database before processing them.

In one specific Apache snapshot, we found abnormal (4 fold) increase of source code line count and a corresponding spike in the clone ratio. We believe this was due to some accidental copying of major project elements, and we therefore ignored that snapshot. All the bugs that have that snapshot as their staging snapshot, were mapped back to the immediate preceding snapshot.

Our experimental approaches to the research questions are detailed below:

### RQ1 To what extent does cloned code contribute to bugs?

For each bug in the project, we consider how much cloned code contributes to that bug, viz., its bug clone ratio. Now we can consider cumulative bug clone ratio distribution for all the bugs in a given project. So for example, if the cumulative distribution indicates that most of the bugs have a clone ratio (defined earlier, in III-G above) between 80% and 100%, we can conclude that clones contribute heavily to bugs; alternatively, if most of the bugs have 1% or lower