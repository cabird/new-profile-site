Finally we use manual inspection to remove spurious linking as much as possible. Our approach uses Bachmann’s linking heuristics; in fact, we gratefully acknowledge the direct use of data derived by Bachmann and Bernstein (2009).

### 3.6 Buggy Code

In an ideal situation, a set of source code lines that introduced a bug can be defined as buggy code. However, it is very difficult to precisely find the culpable code, so we approximated the notion of buggy code. In this paper buggy code refers to a set of source code lines which were modified to fix a bug. So, buggy code for i-th bug fixed in revision r: BC_i = {L_{f,j}} where L_{f,j} is the j-th changed line in file f for fixing that bug (note: changed lines in a file may not be contiguous and buggy code for a single bug can span multiple files).

To determine buggy code, we first identify a revision that fixes a bug. If a bug is fixed in revision r we take the immediate preceding revision r−1 and then we identify all the files that were changed in revision r. We then find the lines changed in each of these files. {L_{f,j}} = Diff(f_r, f_{r−1}), where Diff is traditional Unix Diff tool and f_r is the version of the file f at revision r. For all changed files f the set of changed lines {L_{f,j}} comprises our buggy code for i-th bug. Note: we ignore any newly introduced lines at revision r as they, by definition, could not be the cause of the original bug.

### 3.7 Bug Staging Snapshot

We associate every bug with its closest preceding snapshot which we call its staging snapshot (ss_b). So, if a bug b is fixed in revision r and revision r−1 (the last revision prior to fixing that bug) occurs in month i of the project history, then i-th snapshot is its staging snapshot. The staging snapshot is where buggy code for a bug is analyzed. This is necessary because we do not have clone information available for some arbitrary revisions other than the chosen snapshots.

Due to possible intervening changes to buggy files between ss_b and r−1, each of the buggy lines in a buggy code at revision r−1 may have different line number at its staging snapshot. However, for our purposes we need the older line number at ss_b instead of the newer line number at r−1. To map a line at l_{r−1} to l_{ss}, we used Unix Diff utility to find all the changes made to that file during this time period. So, if n lines were added and m lines were deleted on top of a given line number l_{r−1} between releases ss_b and r−1, we adjust the overall difference to find l_{ss}. Also, if l_{r−1} was newly added sometime after revision ss_b (i.e., l_{r−1} was nonexistent in ss_b), then we ignore that line.

### 3.8 Buggy Cloned Code and Bug-Clone Ratio

Each of the lines in a buggy code fragment can be classified as either a copy or unique, based on whether that line is part of any of the clones recognized by Deckard. We called the copied lines of buggy code buggy cloned code. We then calculate the ratio of such copied code in the buggy code, which we call bug-clone ratio. Note, to determine any such partitioning of buggy code, we first mapped all the buggy code