of names were added to our database to increase accuracy.

As our goal is to investigate whether there are different styles of collaboration among subareas of computer science and as well as how these areas interrelate, we need a mechanism to divide the large computer science community into subareas. For this purpose, we define the research areas in computer science as sets of first tier conferences. We restrict our definition to first tier conferences as practitioners are more likely to associate these conferences with a single area and, further, such assignments are both less controversial and better known than those for up and coming conferences. The results of our analyses are highly sensitive to the mapping of first tier conferences into areas. To determine these assignments, we surveyed expert opinion and consulted Citeseer’s impact rating [5,7,41].

Table 1 shows the areas of computer science research that we investigate. We manually validated DBLP’s assignment of papers to conferences as follows: Because some conferences change their name, we examined several papers in each conference and year to discover the name used that year. Then we histogrammed the counts of papers for each conference and year, looking for and fixing any irregularities. As an example, we found that some papers marked as FSE were from Fast Software Encryption, a cryptography and security conference, while others were published in Foundations of Software Engineering, a software engineering conference.

![Table of areas and conferences](page4_img_table_1.png)

Table 1: Areas and Conferences

Once the process of assigning papers to conferences and identifying top tier conferences in each area was complete, we created the collaboration graphs. In all, there were 76,598 distinct authors, 83,587 papers, and 194,243 collaboration pairs (where we count a collaboration between author a and b only once even if they have collaborated on multiple papers). Let C(p) represent some predicate or constraint on papers that identifies only those publications that we are interested in. An example is “publications in the area of Machine Learning in 2003.” Let P be the set of all papers, A be the set of all authors, and let W(a,p) be a predicate that is true if and only if author a is an author, or writer, of paper p. We then create the graph G = (V, E) as follows:

(3.1)
V = {a : a ∈ A, p ∈ P, C(p) ∧ W(a,p)}

(3.2)
E = {(a,b) : a, b ∈ V, p ∈ P, C(p) ∧ W(a,p) ∧ W(b,p)}

Thus, each node in a graph is an author and each edge connects two authors who have collaborated on a paper for which the constraint C is true. It is important to note the edges in these graphs are undirected. Furthermore, we can weight the edges based on the number of papers that the two authors have collaborated on. The graphs that result from various choices of C represent the data used in our network analyses.

In the following sections, we explain the various forms of analysis we performed on the collaboration graphs we extract, before we present the results of each analysis. We found ample evidence for folkloric beliefs in our results, but here present only a subset of those results due to space constraints. For completeness and repeatability, comprehensive figures, data and code for each research area and analytic method can be found at http://janus.cs.ucdavis.edu/~cabird/sdm09/. Finally, we include information necessary for repeatability such as locations of public data, experimental parameters, and tools used.

## 4 Within-Area Analysis

We seek an understanding of the differences between the various sub-disciplines of computer science research by examining the collaboration graphs for each area in isolation. In this section, we first describe the measures from complex network theory that we employ to characterize the area networks, then the results we obtained from applying them.

### 4.1 Degree Distribution

The importance of node degree to the whole-network behavior is well-studied and understood, especially for highly connected vertices, or hubs [1]. Naturally occurring networks have long-tailed node degree distributions, i.e., hubs do occur in them. Growth models, most notably preferential attachment, have been proposed that explain such distributions from first principles. We have found that the computer science collaboration network, and the networks of its sub-areas, both manifest the same long-