tailed, power-law-like degree distributions that previously studied social networks exhibit. In fact, the degree distributions of the sub-areas are almost identical, save for a scaling factor, and thus do not make good discriminators in our case. We demonstrate the scale-free nature of these networks by showing the degree distribution for the entire collaboration network in figure 1 and include the exponent of the best power law fit, α, for each area in table 2. The best fit α was obtained according to the methods from Clauset et al. [9] using code obtained from them.

![Degree distribution of the collaboration network](page5_img_1.png)

Figure 1: Degree distribution of authors in the collaboration network from first-tier publications in DBLP

In naturally occurring networks, edges (or interactions) depend not only on the vertex degree distribution but also on the connectivities of the vertex neighbors, i.e., there is apparent statistical dependence in the joint degree–degree probability distribution [28]. To better characterize networks in terms of node–node interactions, a number of network measures have been developed that capture effects beyond the first-order degree distributions. We describe and use them next.

### 4.2 Assortativity

Assortative mixing in networks is the tendency of vertices to be connected to like vertices. For example, highly connected vertices may be joined to other highly connected vertices more often than to lowly connected ones [28]. Scalar vertex properties other than degree can be used to assess how much alike are vertices in the network, so long as they are discrete or enumerative.

Here we follow the formal definitions from Newman [28]. We define a set of properties over a graph’s vertices; in our graph, these properties include degree and the author’s career length. Each vertex is labeled with its value for each property, e.g., a vertex of degree 4 has a label with the value 4. Let e_xy be the fraction of all edges in the graph that start at a vertex labeled x and end at a vertex labeled y. e is known as the mixing matrix. For undirected networks e_xy = e_yx. Let a_x be the fraction of all edge ends incident to a vertex labeled x. By definition, ∑_y e_xy = a_x and ∑_x a_x = 1.

Assortativity is the Pearson correlation coefficient of the property values of any two vertices connected by an edge:

r = (∑_{x,y} x y (e_{xy} − a_x a_y)) / σ_a^2,

where σ_a^2 is the variance in the distribution of a_x. The assortativity ranges from 1, which indicates that all vertices are connected only to vertices that have similar values for that property, to −1, which indicates a perfect negative correlation in the values of connected vertices. For example, social networks (like collaboration and coauthorship graphs) typically have positive degree assortativity, while technological and biological networks have negative degree assortativity [28].

### 4.3 Longitudinal Assortativity

Assortativity is a static measure of a graph at a particular point in time; it does not incorporate longitudinal data, i.e., graph evolution. We propose longitudinal assortativity to measure the correlation of dynamic properties of nodes at the time that an edge is created (i.e., a collaboration occurs). To apply this metric, we timestamp edges and vertex properties (such as career length or number of publications) when they change or are added. We associate a single timestamp with each edge, so our collaboration graph becomes a multigraph with an edge for each collaboration between two authors. We then use these timestamps to decompose the multigraph into the sequence of multigraphs from which it evolved. Each multigraph in this sequence contains only those property values and edges whose timestamp is earlier than the point in time under consideration. Since a property may have many values whose timestamp is less than a given time, we take the value with the greatest timestamp. The sequence of multigraphs formed by updates itself forms a multigraph in which each multigraph in the sequence is a disconnected component. Longitudinal assortativity returns the value of applying assortativity to this multigraph.

![Illustration of longitudinal assortativity (sequence of small graphs)](page5_img_2.png)

Figure 2: Longitudinal Assortativity

Consider a small collaboration graph with 4 authors in Figure 2c. The value at each node is number of publications. Figure 2c evolved from Figure 2a in time step t0 and Figure 2b in time step t1. In Figure 2a, authors a and b wrote a single paper together, while c and d wrote 10; in Figure 2b,