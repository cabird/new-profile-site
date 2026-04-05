![Table 3: Community structure of different conferences](page9_img_1.png)

Table 3: Community structure of different conferences. In general, theoretical conferences are the least modular, indicating that researchers in the field are well-integrated. Systems conferences tend to be more fragmented. Database conferences, while quite large, don't have significant sub-communities.

different fields can reveal a great deal about the intellectual fragmentation of an area. However, the interpretation of these communities requires specialized knowledge of the technical content and folklore of an area. We have therefore created visualizations depicting the communities in each conference and made them available at http://janus.cs.ucdavis.edu/~cabird/sdm09/.

It is important to note that analysis and interpretation is largely influenced by classification of areas within computer science and mapping of papers to these fields.

## 5 Network-wide Metrics

We are also interested in the relationship between the research areas in computer science, and how these relationships change over time. The explanation of these “Network-wide Metrics” are described below.

### 5.1 Area Overlap

Many researchers publish in more than one research area. We examine the relationship between areas that “share” authors by examining area overlap, the number of authors that have published in two areas during the same time period. Since we have the venue and area for each paper, calculating area overlap is fairly straightforward. Let a and b be two research areas in computer science and let A(a, t) be the set of authors who have published in area a during time period t. The area overlap is defined in terms of these two sets.

O_a(b, t) = |A(a, t) ∩ A(b, t)| / |A(a, t)|  (5.6)

This measure is an asymmetric ratio, normalized on the size of the area that we’re examining overlap for. We have defined it, rather than employ the symmetric Jaccard Index, because it better captures our intuitive notion of the overlap of one field with another and allows for relative comparison.

To see this, assume that in 1990 |PL| = 10, |AI| = 100, and |PL ∩ AI| = 5, while in 2000 |PL| = 20, |SEC| = 20, and |PL ∩ SEC| = 10. Under our index the overlap of PL with AI in 1990 and SEC in 2000 are both 0.5, indicating that in each case, half of the authors publishing in PL are also publishing in the other area as well. In contrast, the Jaccard Index yields 0.09 in 1990 and 0.33 in 2000, neither of which accurately reflects the overlap of PL with each area. We examine this measure across time to see how the relationship between various subdisciplines has changed and report our findings below.

### 5.2 Migration

The migration patterns of researchers over time are an interesting area of study that can give a high-level view of relationships between areas and longitudinal trends. We analyze migration patterns by assigning each researcher to a specific area for each year based on publication history and examining how their assigned areas change.

For each author, we create a score for each computer science research area based on past publication history that favors recent publications. The intuition behind this method is that an author’s publication history captures their interests, but those interests also change with time. For example, a prolific author may publish heavily in databases for 10 years, change interests, and publish strictly in graphics for the next 6. If we simply aggregated this author’s output, we could mis-classify her current area as databases when she is in fact focused on graphics. We therefore introduce a decay into the publication count in the following two scoring equations. Publications lose twenty percent of their weight with each year in the first score, while publications retain their full weight during their initial three years followed by a drop of a third each year thereafter in the second score. Let P(r, a, y) be the number of publications by author r in area a in year y. We calculate the research “score” for each author per area per year in the following two ways.

S1(r, a, y) = sum_{i=1}^5 P(r, a, y-i) * (6 - i) / 5  (5.7)

S2(r, a, y) = sum_{i=1}^3 P(r, a, y-i) + sum_{i=4}^5 P(r, a, y-i) * (6 - i) / 3  (5.8)

From these scores, we determine the research area of researcher r for a particular year y, A(r, y), by choosing the area with the highest score.