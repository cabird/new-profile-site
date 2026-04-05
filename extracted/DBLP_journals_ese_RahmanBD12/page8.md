less than 0.99 could give an increasingly more false positive clones. Also, smaller token size such as 30 could detect a large number of uninteresting clones (e.g. very small clones which involve declaration or boilerplate looping definition). Moreover, we chose a stride size of 2, as Deckard detects highest amount of clones (for a given token and similarity setting) at this stride setting (Jiang et al. 2007a). Also, as Deckard detects only syntactically similar clones (including Type III clones), we do not study semantically similar clones—also known as Type IV clones (Roy and Cordy 2007)—in this paper.

We call the cardinality of the clone group g_i as its order. So, Order_i = |g_i|. We found that on the average clone groups contain around three members (Table 2). Moreover, the third quartile of the order of the clone groups is also around three. Therefore, we partition clone groups into two sets: prolific clone groups, with more than three members; and non-prolific clone groups, with up to three members.

### 3.3 Scattered and Collocated Clones

If all the members of a clone group belong to the same file, we call them collocated clones. On the other hand, if a clone group has members that span more than one file, we designate these members as scattered clones. We also define similar measure at directory level.

### 3.4 Copy and Unique

For this study, we flatten all the clones detected by Deckard and consider them at individual line level. So, for each of the lines in any of the file f_i of snapshot s, if that line is part of any of the detected clones by Deckard, we call that a copy; otherwise it is called unique. Note, occasionally Deckard may detect clones that overlap with each other. This could make a single line part of multiple clones but we declare a line “copy” whether it appears in one clone or many.

### 3.5 Bug Fixing History

For each of the systems that we studied, we focused only on bugs that had been discovered and recorded within the project’s issue tracking system. However, issue tracking systems, such as Bugzilla, are typically used to monitor both bug reporting/fixing as well as the implementation of new features, or “enhancements”. Consequently, we have ignored any entries marked as the latter. We define bug as B = <OD, FD, D>, where OD represents date when a bug was opened; FD as the date when the bug was fixed and marked in the system as fixed; and D as the description of the bug.

We link a fixed bug from issue tracker to a particular revision in the SCM. We call this a bug fixing revision. We identify a bug fixing revision based on several different heuristics. Various key words such as “bug”, “fixed” etc. in the SCM commit log typically indicate a bug fixing revision (Mockus and Votta 2000). Also, a numerical bug ID is typically mentioned in a bug fixing commit log, which can then be linked back to issue tracking system’s issue identifier (Fischer et al. 2003; Čubranić and Murphy 2003). We also crosscheck with the issue tracking system to see whether such an issue identifier exists and whether its status changes after fixing the bug.