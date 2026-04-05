Meanwhile, bugs in the bug database also have their own set of features, which we call bug features, which capture the properties of the bug, and its history. Properties include severity of the bug, the number of people working on it, how long it remains open, the experience of the person finally closing the bug, and so on. By analogy with commit features, we define bug features f^b_1 ... f^b_n, with values drawn from domains D^b_1 ... D^b_n. We note here that both commit features and bug features can be measured for the entire set of bugs and the entire set of commits. However, B_fl represents only a portion of the fixed bugs, B_f. Similarly we can only examine C_fl, since the full set of bug-fixing commits, C_f, is unknown. The question that we pose is, are the sets B_fl and C_fl representative of B_f and C_f respectively, or is there some sort of bias. Next, we more formally define this notion, first for bug features, and then for commit features.

### Bug Feature Bias

Consider the set B_fl, representing bugs whose repair is linked to source files. Ideally, all types of fixed bugs would be equally well represented in this set. If this were the case, predictive models, and hypotheses of defect causation, would be use data concerning every type of bug. If not, it is possible that certain types of bugs might be systematically omitted from B_fl, and thus any specific phenomena pertaining to these bugs would not be considered in the predictive models and/or hypothesis testing. Informally, we would like to believe that the properties of the bugs in B_fl look just like the properties of all fixed bugs. Stated in terms of conditional probability, the distributions of the bug features over the linked bugs and all fixed bugs would be equal:

p(f^b_1 ... f^b_n | B_fl) = p(f^b_1 ... f^b_n | B_f) (1)

If Eqn (1) above isn’t true, then bugs with certain properties could be over- or under-represented among the linked bugs; and this might lead to poor bug prediction, and/or threaten the external validity of hypothesis testing. We call this bug feature bias.

> Observation 3.2. Using datasets that have bug feature bias can lead to prediction models that don’t work equally well for all kinds of bugs; it can also lead to mistaken validation of hypotheses that hold only for certain types of bugs.

### Commit Feature Bias

Commit features can be used in a predictive mode, or for hypothesis testing. Given a commit c that changes or deletes code, we can use version history to identify the prior commits that introduced the code that c affected. The affected code might have been introduced in more than one commit. Most version control systems include a “blame” command, which, given a commit c, returns a set of commits that originally introduced the code modified by c:

blame : C → 2^C

Without ambiguity, we can promote blame to work with sets of commits as well: thus, given the set of linked commits C_fl, we can meaningfully refer to blame(C_fl) the set of commits that introduced code that were later repaired by linked commits, as well as blame(C_f), the set of all commits that contained code that were later subject to defect repair. Ideally, there is nothing special about the linked, blame set blame(C_fl), as far as commit features are concerned:

p(f^c_1 ... f^c_m | blame(C_fl)) = p(f^c_1 ... f^c_m | blame(C_f)) (2)

If Eqn (2) does not hold, that suggests that certain types of commit features are being systematically over-represented (or under-represented) among the linked bugs. We call this commit feature bias. This would bode ill both for the accuracy of prediction models, and for the external validity of hypothesis testing, that made use of the features of the linked blame set blame(C_fl).

The empirical distribution of the commit features properties on the linked blame set, blame(C_fl), can certainly be determined. The real problem, again, here, is that we have no (automated) way of identifying the exact set of bug fixes, C_f. Therefore, in general, we come to the following rather disappointing conclusion:

> Observation 3.3. Given a set of linked commits C_fl, there is no way to know if commit feature bias exists, lacking access to the full set of bug fix commits C_f.

However, bug feature bias per se can be observed, and can be a concern, as we argue below.

## 4. DATA GATHERING

### Pre-existing Data

We used the Eclipse and AspectJ bug dataset from the University of Saarland [49, 14]. The Eclipse dataset2 is well-documented and has been widely used in research [13, 49, 36] as well as in the MSR Conferences’ mining challenges in the years 2007 and 2008. We also used the iBugs dataset3 for linked bug-fix information in AspectJ; the full set of bug fixes is actually in the Eclipse bugzilla repository, since AspectJ is part of the Eclipse effort. We also attempted to use other datasets, specifically the PROMISE dataset [42]. However, for our study, we also needed a full record of closed bugs, the set B_f. These datasets included only files that were found to include bug fixes, and in many cases, do not identify the bugs that were fixed, and thus it is impossible to tell if they are a biased sample of the entire set of bugs.

### Data Retrieval and Preprocessing

Additionally, we gathered data for five projects: Eclipse, Netbeans, the Apache Webserver, OpenOffice, and Gnome. They are clearly quite different sorts of systems. In addition, while they are all open-source, they are developed under varied regimes. Eclipse is under the auspices of IBM, while OpenOffice and Netbeans are influenced substantially by Sun Microsystems. Gnome and Apache, by contrast, do not experience such centralized influence, and are developed by diffuse, sizeable, motley teams of volunteers. We were concerned with two data sources: source code management systems (SCM), and the bug tracker databases (primarily Bugzilla and IssueZilla); also critical was the link between bug fixes and the bug-fixing commits in the SCM. Our procedures were consistent with currently adopted methods, and we describe them below.

We extracted change histories from the SCM commit logs using well-known prior techniques [19, 50]: information included commit date, committer identity, lines changed, and log message. In addition to this information, we also need information on rework: when a new commit c_n changes code introduced by an earlier commit c_o, c_n is said to rework

2 Please see http://www.st.cs.uni-saarland.de/softevo/bug-data/eclipse (release 1.1)
3 See http://www.st.cs.uni-saarland.de/ibugs (release 1.3)