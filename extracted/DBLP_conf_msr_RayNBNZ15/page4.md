![Overview of methodology diagram](page4_img_1.png)

Fig. 1: Overview of Methodology. Hunk_a, Hunk_b, Hunk_c, Hunk_d, and Hunk_e are initial input. The deleted and added lines in each of the hunks are represented by ‘–’ and ‘+’. Here we assume that, between Hunk_a and Hunk_b, line a2 is deleted similarly to b2, and a3 is added similarly to b3. Between Hunk_b and Hunk_c, line b2 is deleted similarly to c2, and b3 is added similarly to c4. Likewise, c1 and d1 are similarly deleted, and a3 and d2 are similarly added.

the change. However, after the modification, the non-unique lines were deleted, and the region became unique with respect to each other, since unique program statements were added.

NA: non-unique Addition. Similar to ND, but there is non-unique addition of program statements, but no non-unique deletion. For example, hunk pair (Hunk_a, Hunk_d) in Figure 1 shows NA non-uniqueness since only a3 is added non-uniquely to Hunk_a and d2 to Hunk_d. NA indicates two unique code regions became non-unique after the modifications.

NM: non-unique Modification. Since a modification can be represented as a deletion in the old version and an addition in the new version, NM between two hunks indicates at least one non-unique edit pair between the two hunks is added and at least one non-unique edit pair is deleted. Consider the hunk pair (Hunk_a, Hunk_b) in Figure 1: a2 and b2 are non-unique deletions while a3 and b3 are non-unique additions. Thus, (Hunk_a, Hunk_b) belongs to NM. Likewise, (Hunk_b, Hunk_c) is NM. NM signifies the corresponding code region of the hunk pair was non-unique before, and even after the modification they remain non-unique.

A hunk is Unique, if all of its changes belong to the unique changed set (UC), i.e., none of its edits resemble other edits across all the studied hunks. In Figure 1, Hunk_e is unique since its edits -e1, +e2 are not similar to any of the changes.

Such fine grained categorization of hunk uniqueness shows how uniquely similar code evolve over time, similar to tracking clone genealogy [19]. For example, the code regions corresponding to Commit A and Commit B in Figure 1 were unique initially, but after the addition they become non-unique (NA). In this case, with time unique code becomes non-unique.

### D. Extracting Non-unique Patterns

As shown in Figure 1, program statements are often changed non-uniquely. Some of these non-unique changes always occur together to form a non-unique pattern. For example, all the three edits A9, A10, A11 of Commit A in Figure 1 repeat in Commit B as B9, B10, B11; thus showing a repeated change pattern. In this step, we extract such non-unique patterns from the non-unique hunks. Later, to build recommendation system in Section IV-B, we use these patterns as common change template.

If a list of edited lines E_i of hunk h_i is non-unique to a list of edits E_j of hunk h_j, a Non-unique Pattern (NP_ij) exists between hunks h_i and h_j. E_i and E_j represent the signature of NP_ij corresponding to hunks h_i and h_j respectively. For example, in Step 3 of Figure 1, edits [-a2, +a3] of Hunk_a are similar to [-b2, +b3] of Hunk_b; thus, they form a non-unique pattern NP_ab = {[-a2, +a3], [-b2, +b3]}, where [-a2, +a3] is the signature of NP_ab for Hunk_a, and [-b2, +b3] is the signature of NP_ab for Hunk_b.

A change pattern may be repeated across multiple hunks. If hunk h_i shares a non-unique pattern with hunk h_j and hunk h_k with identical signature, they are merged to form a single non-unique pattern NP_ijk. For example, NP_abc = {[-a2, +a3], [-b2, +b3], [-c2, +c4]} is a non-unique pattern extracted from Hunk_a, Hunk_b, Hunk_c, as shown in Step 3 of Figure 1.

This reduces to a maximal clique problem for a graph formed by non-unique hunk pairs. We adapted Carraghan et al.'s algorithm of maximal clique solving problem [2] to detect the non-unique patterns.

## III. STUDY OF CHARACTERISTICS

### Study Subjects

In this study, we analyzed uniqueness of changes in both open and closed source software development. We studied the evolution of proprietary projects A and B from Microsoft, and a large scale open source software, Linux 3.0 (see Table II). Project A and Linux are written in C, and Project B is written in C++. We analyze the changes made in the source files (.c, .cpp etc.), ignoring the interface declarations in the header files (.h), documentation etc.

First, from the version control system of a project we retrieve all the file commits that are made within the studied period (2011-05-19 to 2013-08-29). Next, we classify the changes associated with the commits into two categories: unique and non-unique. In total, we studied more than 17 million lines of changes in all the three projects in their two plus years of parallel evolution history. Around six thousand developers contributed those changes.

Prior to analyzing properties of unique and non-unique changes, we begin with a straightforward question that checks the proportion of unique and non-unique changes in a project.