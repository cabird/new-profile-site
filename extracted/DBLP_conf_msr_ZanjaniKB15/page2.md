histories. It only needs developer-interaction sessions from the issue repository of a system, which are typically attached to issue/bug reports (e.g., in the Mylyn prescribed XML format).

To evaluate the accuracy of our technique, we conducted an empirical study on two open source systems Mylyn and Eclipse Project. Recall and Mean Reciprocal Rank (MRR) metric values of the developer recommendations on a number of bug reports sampled from this system are presented. That is, how effective our iHDev approach is at recommending the actual developer who ended up fixing these bugs. Additionally, our iHDev approach is empirically compared with two other approaches that use the commit and/or source-code authorship information [3], [6], [2]. The results show that the proposed iHDev approach outperformed these baseline competitors. Lowest recall gains of 6.17% and 9.72% were recorded against the two respective approaches. Highest recall gains of 125% and 127.27% were recorded against the two respective approaches. These gains came without incurring any decreased Mean Reciprocal Rank (MRR) values; rather iHDev recorded improvements in them. That is, iHDev would typically recommend the correct developers at higher ranks than the subjected competitors.

Our paper makes the following noteworthy contributions in the context of recommending relevant developers to resolve incoming change requests:

1. To the best of our knowledge, our iHDev approach is the first to utilize developers’ source-code interaction histories involved with past change requests.
2. We performed a comparative study with two other approaches that use commit and/or source-code authorship information.

The rest of the paper is organized as follows: Our approach is discussed in Section II. The empirical study on Mylyn and Eclipse Project, and its results are presented in Section III. Threats to validity are listed and analyzed in Section IV. Related work is discussed in Section V. Finally, our conclusions and future work are stated in Section VI.

## II. APPROACH

Our approach iHDev to assign an incoming change request to the appropriate developer(s) consists of the following steps:

1. Locating Relevant Entities to Change Request: We use the K-Nearest Neighbor (KNN) algorithm to locate relevant units of source code (e.g., files and classes) that match the given textual description of a change request or reported issue. The indexed source-code release/snapshot is typically between the one in which an issue is reported and before the change request is resolved (e.g., a bug is fixed).
2. Mining Interaction Histories to Recommend Developers: The interaction histories of the units of source code from the above step are then analyzed to recommend a ranked list of developers that are the most experienced and/or have substantial contributions in dealing with those units (e.g., classes). The interaction histories are extracted from the issue-tracking system.

### A. Key Terms and Definition

Interaction: Interaction is the activity of programmers in an IDE during a development session (e.g., editing a file or referencing an API documentation).

Tools, such as Mylyn, have been developed to model programmers’ actions in IDEs [9]. Mylyn monitors programmers’ activities inside the Eclipse IDE and uses the data to create an Eclipse user interface focused around a task. The Mylyn interaction consists of traces of interaction histories. Each historical record encapsulates a set of interaction events needed to complete a task (e.g., a bug fix). Once a task is defined and activated, the Mylyn monitor records all the interaction events (the smallest unit of interaction within an IDE) for the active task. For each interaction, the monitor captures about eleven different types of data attributes. The most important of these is the structure handle attribute, which contains a unique identifier for the target element affected by the interaction. For example, the identifier of a Java class contains the names of the package, the file to which the class belongs, and the class. Similarly, the identifier of a Java method contains the names of the package, the file and the class the method belongs to, the method name, and the parameter type(s) of the method. Figure 1 shows an example of the Mylyn interaction edit event.

Trace file: For each active task, Mylyn creates an XML trace file, typically named Mylyn-context.zip or its derivative. A trace file contains the interaction history of a task. This file is typically attached to the project’s issue tracking system (e.g., Bugzilla or JIRA). The trace files for the Mylyn project are archived in the Bugzilla as attachments to a bug report. For example for issue #315184 there is one trace file named Mylyn-context.zip1.

Attacher: Each issue/bug could have trace files. A developer submits these trace files to the project’s issue tracking system and are attached to the associated issue report. We term this developer as the attacher. This term helps differentiate from the use of committers and developers in the context of source-code repositories. There is no explicit information to distinguish between the attacher and the actual developer who performed the interaction session. We assume that the attacher is the developer who performed the attached interaction session. This issue is similar to the distinction between the developer who performed and the committer who committed the changes to a source-code repository. For example, Steffen Pingel attached the file Mylyn-context.zip for issue #315184. Considering the Mylyn workflow for interactions, we did not expect nor found any instances where the attacher was not the developer who performed the interaction session.

### B. Locating Relevant Entities to Change Request

In our approach, we use techniques from natural language processing and machine learning to locate textually relevant source code files to a given change request for which we need to assign developers. The specific steps are given below:

1. Creating a corpus from software: The source code of a release, in or before which the change request is resolved, is parsed using a developer-defined granularity level (e.g.,

1https://bugs.eclipse.org/bugs/show_bug.cgi?id=315184