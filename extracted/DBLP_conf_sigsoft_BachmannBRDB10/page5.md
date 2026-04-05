documentation (Javadoc), and architectural information to aid source code exploration. Linkster is more concerned with process-related artifacts (e.g., changes, discussions, bug reports, and fixes) than understanding the source code itself.

### 4.1 Commit Information

Figure 1-a shows the Commit Information Window of Linkster. The top (1) contains a list of commits that satisfy some query, e.g., commits within a time window or changes made by a particular author. Each line shows the revision identifier (as used in the original repository), commit time, author, and the first line of the commit message. The entire commit message is shown in a tooltip when the mouse hovers over an entry.

When a commit entry in the list is selected, the metadata is updated in the bottom half (2). The list of files modified in the commit (3) is also displayed. Double clicking a file brings up the Blame & Diff Information for the file allowing the user to examine the exact changes that were made. For annotation purposes, the user may select the reason(s) for the commit by checking boxes (4) or drag and drop (or remove) a bug record from the Bug Information Window into the list of bug IDs (5), which is populated with the set of automatically identified links between the commit and bug records. Finally, the user may enter free form notes for the commit (6).

### 4.2 Bug Information

Figure 1-b contains the Bug Information Window. The top portion (7) is a scrollable list of bugs from the bug database. Each entry contains the bug ID, the date of creation, and a one line summary of the bug. Hovering over an entry shows the bug severity in a tooltip. Any of these entries may be dragged to the bug IDs list (5) in the commit information window to indicate a commit that is associated with the bug.

Selecting a bug entry populates the bottom half of the window with detailed information. The left side (8) contains short attributes of the bug, while the right side (9) displays the full bug description followed by all of the comments in chronological order with author and date. Clicking on the Bug Activity tab (10) displays a list (not shown) of all changes to the bug record, such as assigning the bug to a developer or marking a bug as closed. Each entry indicates when the change was made and who made it along with old and new values for the changed field as appropriate. Finally, clicking on the Fixing Files tab (11) presents a list (not shown) of all of the commits to files that are associated with the fix of the bug. This list is comprised of files automatically or manually linked to the bug. Double clicking on any file in this list will bring up a blame & diff window for the commit.

### 4.3 Blame & Diff Information

Figure 1-c shows the Blame & Diff Information Window for the changes to a file in a particular commit. The left view (13) shows the content of the file prior to the change, and the right view (14) shows the content after the change. Removed lines are prefixed with “−” and are highlighted red, and added lines are in green with a “+” prefix. Each line is also prefixed with the revision identifier of the commit that introduced the line. Selecting a line highlights all other lines introduced in the same commit, and also updates the metadata area (12) with information about that commit. This

can help the user learn why, when, and by whom, the line was originally added. If additional information is desired, double clicking a line will bring up a new Blame & Diff window for the commit which introduced the line (if, for example, one desires to see why a line that was removed in one revision was originally added in a prior revision). An annotator can, thus, gradually step back through version history.

The views are synchronized such that scrolling up, down, left, or right in one view causes the other to change accordingly. The thumbnail view (15) graphically shows the differences for the entire file with red indicating removed lines and green, added lines. Clicking on a location in the thumbnail view will cause the pre and post views to jump to that location, making it easier to identify and examine changes in larger files.

## 5. APACHE DATA EVALUATION

To address our research questions, we began our evaluation with the creation of an evaluation dataset, as defined in Section 3.3. Armed with Linkster to facilitate browsing and annotation, we engaged the services of an informant: an experienced Apache developer, Dr. Justin Erenkrantz, to manually annotate a temporal sample of commits using Linkster. Clearly, the quality of this completely annotated evaluation dataset is predicated on the expertise of the annotator. Justin is a core developer of the Apache HTTP web server project (since January 2001), the President of the Apache Foundation and serves on the Foundation’s Board of Directors. He also develops for Apache Portable Runtime, Apache flood and Subversion5.

Using Linkster, Justin annotated each commit, to flag it as a bug fix, an implemented feature request, a maintenance task or other. With this information, we obtain fully annotated commit data, providing a complete picture of all the changes during the given period and how/why/by whom these changes were made. This data can be used to verify our automated linking approach (which includes mainly bug fixes and some feature requests). Indeed, annotating program code commits dating back months or years in the past is a challenge, even for an experienced core developer like Justin. Linkster was very helpful, providing an integrated view of all the relevant information. Based on the log message, the changed files and the file diffs of the changed files, Justin was able to annotate all commits, and, in most cases, provided additional information about the commits.

Justin’s familiarity with the Apache project gives us confidence that the results of our evaluation can be trusted. In addition, detailed discussions and interviews with him revealed facts about the tools and processes used in the Apache HTTP web server project, and also ideas for improving Linkster.

## 6. RESULTS

All 493 commits in our selected temporal sample were annotated. In addition to the annotation into the four categories above: bug fix, feature request, maintenance/refactoring, and other, our informant helped us further sub-classify the commits. Table 2 summarizes the annotation results including the sub-classification. Note, a single commit can have many annotations, e.g., a commit may be annotated as both a “bug fix” and a “feature request”.

5 See http://www.erenkrantz.com/ for more details.