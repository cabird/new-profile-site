- Effective Size - The number of components that are connected to a component minus the average number of edges between these components.
- Efficiency - Normalizes the effective size of the network by the total size of the network.
- Constraint - Measures how strongly a component is constrained by its neighbors. The idea is that neighbors that are connected to other neighbors can constrain a component.
- Hierarchy - Quantifies how the constraint above is distributed across neighbors. When most of the constraint comes from a single neighbor, the hierarchy is higher.

## Local Measures

Degree centrality [7] is a basic network measure. In an undirected unweighted network, degree is simply the number of edges incident upon a node. Weighted networks use a sum of the weights of the edges and directed networks include in-degree and out-degree based on edge direction.

Ego network measures [17] are based on the neighborhood for any particular node. The node being evaluated is denoted ego, and the neighborhood includes ego, the set of nodes connected to ego by an edge, and the complete set of edges between this set of nodes. The set of nodes connected can be chosen in the following three ways:
- In-neighborhood - nodes that have an edge directed towards ego
- Out-neighborhood - nodes that have an edge directed away from ego towards them
- InOut-neighborhood - nodes that have either of the above

We create all three ego networks for each node and compute the following ego network measures:
- Size - The number of nodes in the ego network
- Ties - Number of edges in the ego network
- Pairs - Number of possible directed edges in the ego network
- Density - Proportion of possible ties that actually are present (Ties/Pairs)
- Weak Components - Number of weakly connected components
- Normalized Weak Components - Number of weakly connected components normalized by size, i.e., (Weak Components/Size)
- Two Step Reach - The proportion of nodes that are within two hops of ego
- Reach Efficiency - Two Step Reach normalized by size of the network. Higher reach efficiency indicates that ego’s primary contacts are influential in the network.
- Brokerage - Number of pairs of nodes that are connected only by ego. Thus ego acts as the sole broker for the pair
- Normalized Brokerage - Brokerage normalized by number of pairs
- Ego Betweenness - Betweenness of ego within its ego network
- Normalized Ego Betweenness - Ego Betweenness normalized by size of the network

> Table 1: Correlation of some network metrics with number of bugs in ECLIPSE 3.3 in each of the three networks. In all cases shown except eigenvector centrality the socio-technical metrics had higher values to a statistically significant degree. This is true of the majority of network metrics. The only metrics out of all that had a significantly higher value than socio-technical was eigenvector centrality.

### Correlation with Failures

As a preliminary study of Windows Vista and Eclipse, we examined the correlation of all of the above described SNA measures on the three graphs with failures. In over 90% of the cases, the SNA measures for the socio-technical network had higher correlations with post-release failures than the dependency and contributions networks to a statistically significant degree. We found only one case, eigenvector centrality, where a metric on a non-socio-technical network had a higher correlation at a statistically significant level. Due to space limitations, a comprehensive listing of correlations is prohibitive. We present a sample of these correlations in ECLIPSE 3.3 in Table 1. Since the metric values were not normally distributed, a Spearman rank-correlation was used.

In both Windows Vista and ECLIPSE, the SNA measures on the socio-technical networks have much higher levels of correlation with failures than code complexity metrics such as number of functions, class hierarchy depth, lines of code, or cyclomatic complexity. This initial result is encouraging that combining software component relationships will increase the predictive power of defect prediction models.

Based on the above observations, conjectures, and preliminary results we state the following research hypotheses.

### Hypothesis 1 - The role of a software component in the dependency network and its role in the developer contribution network together influence defect proneness.

### Hypothesis 2 - Software components that play key roles in the joint socio-technical network are more prone to defects than those that don’t.

Note the difference in these hypotheses. The first examines the roles played by a component in two networks and uses information from both. The second looks at a component’s properties in the aggregate socio-technical network. We evaluate these hypotheses on two large software systems in the following sections.

## 4. Projects and Data Collection

In an effort to evaluate our approach in multiple contexts, we gathered data from two large software engineering efforts: one commercial, and one open-source project: Windows Vista and the ECLIPSE integrated development environment and examined post-release defects in these