and occurring before the code is added to a version control repository that many developers depend upon (e.g., the master branch). This process contrasts sharply with traditional software inspection where large completed artifacts are reviewed in co-located meeting with rigidly defined goals and participant roles. Contemporary OSS review is lightweight and fits the development team, but when it is conducted on a mailing list it is difficult to track. Some OSS projects and all the software firms we examine use a review tool, which makes the process traceable through the collection of review metrics. Contemporary reviews are typically conducted asynchronously and measures of review are recorded automatically.

> Convergent Practice 1: Contemporary peer review follows a lightweight, flexible process

In general, contemporary review involves the following steps.

1. The author creates a change and submits it for review.
2. Developers discuss the change and suggest fixes. The change can be re-submitted multiple times to deal with the suggested changes.
3. One or more reviewers approve the change and it is added to the "main" version control repository. The change may also be rejected.

## 3. METHODOLOGY AND DATA

We use Yin’s multiple cases study methodology [32]. Case study findings “generalize” or are transferable through analytical generalizations. Unlike statistical generalization, which derives samples from and generalizes to a defined population, analytic generalization requires researchers to develop a theory or framework of findings related to a particular phenomenon. We use theoretical sampling to select a diverse set of cases and then contrast our findings developing a framework that describes the convergent and divergent practices of contemporary peer review.

We began by collecting data on Microsoft review practices and were surprised to see convergences with the practices observed by Rigby on OSS projects [23]. These practices tended to coincide with those seen at AMD [20] and Cisco [6]. We collected data on the Google-led OSS projects, Chromium OS and Android, to understand the practices of hybrid projects. We also have data on the traditional inspection practices at Lucent [19] that we use for comparison purposes.

We quantify how lightweight, tool-supported review is conducted. Since each case study has different data points and measures, a further contribution of this work is the conversion of raw and summary data from past and current cases to report comparable measures. We contribute a unified set of findings across a large, diverse sample of projects.

In this section, we give an overview of the data we have for each project. In each subsequent section, we discuss in detail the pertinent data and measures. We also discuss limitations in our data and construct validity issues.

### 3.1 Data Extraction

The data extraction for the following projects is described in other work: Lucent [19], OSS projects [23], and AMD [20]. The former two data sets are used for comparison purposes, while the AMD data had not been quantitatively reported in previous work. In previous work, we described the extraction process and resulting data for Google Chrome and Android; the data is also available for other researchers [17]. This work did not involve analysis of the data. In the remainder of this section, we discuss what constitutes a review for each project and briefly describe how we extracted peer review data.

Microsoft: The Microsoft data for this study was collected from the CodeFlow tool. This tool stores all data regarding code reviews in a central location. We built a service to mine the information from this location and keep a database up to date for tools to leverage and for empirical analysis. For each review, we record information including who created the review, what files were modified, how many sets of changes were submitted, the comments that reviewers added, and who signed off.

One difficulty with this data is knowing when a review is complete. There are a number of states that a review can be in, one of which is “Closed”. However, to be in the “Closed” state, someone must explicitly set the review to that state. We observed that in practice, a developer may check in his changes once reviewers had signed off without first changing the review to “Closed”. In other cases, there was evidence that a member of a project closed reviews as a form of maintenance (one person closed thousands of reviews in a matter of minutes). To deal with this, we use the heuristic that a review is considered completed at the time of the last activity by a participant in the review (i.e., the date of the last comment or the last sign off, whichever is later). For all the case studies in this work, reviews with no comments or sign offs were excluded from the data set as no review discussion occurs.

Google Chrome and Android: We consider reviews in the merged and abandoned states; open reviews are not considered in this work. Reviews must also have one comment from a human reviewer who is not the author (verifications by bots are removed). To collect peer review data from these projects, we reverse engineered the Gerrit JSON API and queried the Gerrit servers for data regarding each review for both projects, gathering information such as the author’s and reviewers’ activity, files changed, comments made, and dates of submission and completion. We stored this information on peer reviews in a database for further analysis. The extracted data and details of our technique are available to other researchers [17].

AMD: We attained a summary of the data dump from the CodeCollaborator tool [20]. Unfortunately, this data set does not have all the parameters of review we wish to measure, such as the number of comments per review. In this data set, we only include review discussions that have at least one reviewer.

Lucent: Siy attended inspection meetings and collected self-report data from reviewers on a compiler project at Lucent [19]. The roles and number of participants were