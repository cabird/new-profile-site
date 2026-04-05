Step 3: Score and Recommend Reviewers: Finally, the cumulative contributions of the reviewer in Step 2 for all the source code files in Step 1 are scored to arrive at a ranked list of candidate reviewers. A user defined parameter m is used to recommend the top m candidates from this list. The choice of m can be guided by the organizational or project practices or historical information on the typical number of reviewers.

### 3.1 Formulating Reviewer Expertise Model

The review comments are a mechanism that reviewers use to express their feedback and communicate with the owner and other peer reviewers of a code change. That is, these comments are a primary means for discussion and discourse in modern peer code review. They can be considered a manifestation of their expertise. Now, the question is how these valuable source can be used to quantify the expertise of reviewers. We use three metrics to quantify reviewers’ expertise from their contributed review comments.

One measure of a reviewer’s contribution is the total number of review comments they contributed to previous code changes. A particular reviewer who contributed a larger number of review comments than another peer to specific units of source code (i.e., files) can be considered more knowledgeable on those parts. Although, this count measure may capture valuable expertise information, it may not be the only reflection of expertise. Depending on the complexity and nature of each code change, different levels of effort may be needed. We consider time as a proxy measure of effort, which is typically used in other domains [18]. We consider the smallest unit of work, i.e., effort, devoted by a reviewer to be a workday. A reviewer’s workday is considered as a day (calendar date) on which they contributed at least one review comment (to at least one file) in a code change, because a reviewer can have multiple review comments on a given workday. A day on which no such review comments exist is not considered a workday. Two reviewers are considered to have made the same overall effort in reviewing changes to the same source code file if they wrote all their review comments (regardless of the variation in their counts) in the same number of calendar (work) days. Accounting for the frequency (review count) and effort (workday) may not suffice, if they are not relevant to the submitted code change under review. The third measure accounts for the recency of the review comments. Recent review comments are given a higher weight than the distant ones, i.e., it is an inverse measure. Each of these three measures is normalized with respect to the total contributions on each source code file.

Previously, these three measures were used and validated in the context of commit history and developer recommendation, i.e., finding the developers who are most likely experts in particular source code units and/or fixing a bug [17]. Therefore, using this foundation, we contextualized and redefined them for the reviewer recommendation task, i.e., to determine the reviewers who are more likely to be experts in reviewing a specific source code file than others, i.e., reviewer-expertise map. The reviewer-expertise map, RE, for the reviewer r and file f is given by

RE(r, f) = (C_{r,f}, W_{r,f}, T_{r,f}),

where C_{r,f} is the number of review comments contributed by the reviewer r for the file f. W_{r,f} is the number of workdays of the reviewer r on which they contributed review comments for the file f. T_{r,f} is the most recent workday of the reviewer r with the file f. Similarly, the file–review map, FR, represents the review contribution to the file f and is given by

FR(f) = (C'_{f}, W'_{f}, T'_{f}),

where C'_{f} is the number of review comments that are written for the file f. W'_{f} is the total number of workdays on which review comments were contributed for the file f. T'_{f} is the most recent workday on which a review comment was contributed for the file f.

The contribution or expertise factor, termed xFactor, for the reviewer r and the file f is computed using the ratios of the reviewer-expertise and file–review maps. The contribution factor, xFactor, is given below:

xFactor(r, f) = RE(r, f) / FR(f)    (1)

xFactor(r, f) =
- C_{r,f} / C'_{f} + W_{r,f} / W'_{f} + 1 / |T_{r,f} − T'_{f}|    if |T_{r,f} − T'_{f}| ≠ 0
- C_{r,f} / C'_{f} + W_{r,f} / W'_{f} + 1                         if |T_{r,f} − T'_{f}| = 0    (2)

The xFactor score is computed for each of the source-code files that exist in the code change. According to Equation 2, the maximum value of xFactor can be three because we have used three measures, each of which can have the maximum contribution ratio of 1.

### 3.2 Scoring and Recommending reviewers

We now describe how the ranked-list of reviewers is obtained from all of the scored reviewers of each source code file in the code change. There is a one-to-many relationship between the source code files and reviewers. That is, each file f_i may have multiple reviewers; however, it is not necessary for all of the files to have the same number of reviewers. For example, the file f1 could have two reviewers and the file f2 could have three reviewers. The matrix D_r (see Equation 3) gives the list of unique reviewers for each file f_i. D_{rfi} represents the set of reviewers, with no duplication, for the file f_i, where 1 ≤ i ≤ n and n is the number of unique files in patch. r_{ij} is the jth reviewer in the file f_i with l unique reviewers.

Dr =
( Dr_{f1}
  Dr_{f2}
  ...
  Dr_{fn} )

D_{rfi} = { r_{i1} r_{i2} ... r_{il} }    (3)

Although a single file does not have any duplicate reviewers, two files may have common reviewers. In Equation 4, D_{ru} is the union of all unique reviewers from all files.

D_{ru} = ⋃_{i=1}^{n} D_{rfi}    (4)

Score(r) = Σ_{i=1}^{n} xFactor(r, f_i)    (5)