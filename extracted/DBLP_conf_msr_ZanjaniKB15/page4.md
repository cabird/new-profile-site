The interaction log includes data such as the bug Id, attacher, the interacted source code, and the date on which the source code was interacted to fix this issue (see Figure 2 for an example). This data explains who interacted with the source code and when they did it. An attacher may contribute multiple interactions with the same file or multiple attachers may interact with the same file in different trace files. Therefore, interactions give an opportunity to analyze both the exclusive and shared contributions of attachers to a source code file.

### Developer Expertise Measures:
One measure of an attacher’s contribution is the total number of interactions on source code performed in the past [11]. An attacher who contributed a larger number of interactions on a specific part of the source code than another attacher can be considered as more knowledgeable on those parts.

Another consideration for attacher contributions is the workdays (i.e., activity) involved in the interactions that are attached as a trace file. The activity of a specific attacher is the percentage of their workdays over the total workdays of the system. Here, an attacher’s workday is considered as a day (calendar date) on which they interacted with at least one part of the source code, because an attacher can have multiple interactions on a given workday. A system’s workday is considered a day on which at least one part of the source code is interacted. A day on which no interactions exist is not considered a workday.

These two measures give us two different views on attachers’ development styles. Some may perform smaller interaction sessions and submit frequently in a workday (e.g., multiple attachments), while others may do it differently (e.g., single attachment). The third measure accounts for the recency of these interactions. We used these three measures, which were inspired by our previous work on commits [2], to determine the attachers that were more likely to be experts in a specific source code file, i.e., attacher–interaction map. The attacher–interaction map, AI for the attacher a and file f is given below:

AI(a, f) = ⟨I_f, A_f, R_f⟩  (1)

- I_f is the number of interactions that include file f and are interacted by the attacher a.
- A_f is the number of workdays in the activity of attacher a with interactions that include the file f.
- R_f is the most recent workday in the activity of the attacher a with an interaction that includes the file f.

Similarly, the file–interaction map FI represents the interaction contribution to the file f, and is shown below:

FI(f) = ⟨I'_f, A'_f, R'_f⟩

- I'_f is the number of interactions that include file f.
- A'_f is the total number of workdays in the activity of all attachers that include interactions with the file f.
- R'_f is the most recent workday with an interaction that includes the file f.

The measures I_f, A_f, and R_f are computed from the interaction log. More specifically, the dimensions attacher, date, and paths of the log entries are used in the computation. The dimension date is used to derive workdays or calendar days. The dimension attacher is used to derive the attacher information. The dimension path (StructureHandle) is used to derive the file information. The measures I'_f, A'_f, and R'_f are similarly computed. The log entries are readily available in the form of XML and straightforward XPath queries are formulated to compute the measures. The contribution or expertise factor, termed xFactor, for the attacher a and the file f is computed using the ratios of the attacher–interaction and file–interaction maps. The contribution factor, xFactor, is given below:

xFactor(a, f) = AI(a, f) / FI(f)  (2)

Expanded, xFactor(a, f) is computed as:

xFactor(a, f) =
- I_f / I'_f + A_f / A'_f + 1 / |R_f − R'_f|    if |R_f − R'_f| ≠ 0
- I_f / I'_f + A_f / A'_f + 1                 if |R_f − R'_f| = 0   (3)

The xFactor score is computed for each of the relevant source-code files to the given change request (see Section II-B). According to Equation 3, the maximum value of xFactor can be three because we have used three measures, each of which can have a maximum contribution ratio of 1.

Recommending developers based on xFactor scores: We now describe how the ranked-list of developers is obtained from all of the scored attachers of each relevant source code file to a given bug. From Section II-C, there is a one-to-many relationship between the source code files and attachers. That is, each file f_i may have multiple attachers; however, it is not necessary for all of the files to have the same number of attachers. For example, the file f_1 could have two attachers and the file f_2 could have three attachers.

The matrix D_a (see Equation 4) gives the list of unique attachers for each relevant file f_i. D_afi represents the set of attachers, with no duplication, for the file f_i, where 1 ≤ i ≤ n and n is the number of relevant files. a_ij is the jth attacher in the file f_i with l unique attachers.

D_a =
(
  f1: D_af1
  f2: D_af2
  ...
  fn: D_afn
)

D_afi = { ai1 ai2 ... ail }  (4)

Although a single file does not have any duplicate attachers, two files may have common attachers. In Equation 5, D_au is the union of all unique attachers from all relevant files.

D_au = ⋃_{i=1}^n D_afi  (5)

Score(a) = Σ_{i=1}^n xFactor_i(a, f_i)  (6)

Each attacher a for a file f has the xFactor score. To obtain the likelihood of the attacher a, i.e., Score(a), to resolve the given change request, we sum xFactor scores of the relevant files in which it appears (see Equation 6). The Score(a) value is calculated for each unique attacher a in the set D_au.

In Equation 7, we have a set of candidate developers. The developers in this set are ranked based on their Score(a) values. Once the developers are ranked in the descending order of their Score(a) values, we have a ranked list of candidate developers. By using a cutoff value of m, we recommend the top m candidate developers, i.e., with top m Score(a) values, from the ranked list obtained from the set DF.

DF = { (a, Score(a)) , ∀a ∈ D_au }  (7)