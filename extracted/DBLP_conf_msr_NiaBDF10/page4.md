| Project | # of People | # of Messages | # of Edges | Timespan |
|---|---:|---:|---:|---|
| Apache | 1573 | 101250 | 11227 | 1995–2005 |
| Perl | 2411 | 112514 | 16026 | 1999–2007 |
| MySQL | 804 | 33678 | 1989 | 2000–2006 |

TABLE I: Original data details.

information flow, we only include messages that have received replies, since we have no evidence that a message without a reply was actually read by anyone (it clearly did not contain information worthy of a reply). One of the problems with email data is that one person may use multiple email addresses to send messages on a mailing list. We therefore use a semi-automatic alias resolution algorithm so that all messages are ascribed to the correct people. We refer the reader to previous work for details of the process [4]. Table I contains summary statistics for all of the projects.

For each of these projects, we construct an information flow network based on messages that are sent as replies to previous messages. When someone replies to a message on a mailing list, the id of the message being replied to is contained in the header of the message that is the reply. If message B is sent as a reply to message A, then there is information flow from the person that posted message A to the person that posted message B. There may also be information flow from the poster of B to the poster of A, but we have no way of knowing that the poster of A actually read the reply (unless of course the poster of A sends a second message in reply to B, in which case the methodology described here will create an edge of information flow). We use this methodology on all mined data to create a network of mailing list participants.

## IV. METHODOLOGY

### A. Networks and Transitive faults

We generated reply-to networks from the discussion groups for each project as described in the data section. We construct these networks by aggregating all the messages over a given time interval, and constructing the social networks for this interval. In the following studies we experimented with different aggregation time intervals, δt, from 1 hour up to the total lifespan of the project. Once a start time and an interval δt were chosen, we divide the messages into partitions, based on which interval they fall into (e.g. messages sent in first month of activity, messages in second month, etc.). Finally, a network was generated for each time interval, comprising all reply-to relationships in the time interval (ti, ti + δt). Each edge is directed and labeled with the time the message was sent. Using this timing information, we gauge the extent to which a given network actually may give rise to spurious information flow.

We now define a transitive fault as a directed path of length exactly two where the time label on the first edge is later than the time label on the second edge along the path, i.e. a directed 2-path with decreasing edge time stamps. The node transitive fault rate is the fraction of transitive faults over all 2-paths through that node. The network transitive fault rate is the sum of the node transitive fault rates over all nodes, divided by the number of nodes in the network. Clearly, these fault rates depend on topology, and we intend to investigate the fault rates in OSS email social networks.

### B. Network Measures

In this paper we use the following SNA measures.

- Number of 2-paths (2P) — The number of 2-paths through a node is a measure of local social status as defined previously [27].
- Betweenness Centrality (BW) — The betweenness centrality of a node is a function of how many communication paths a node lies on and is often used as a measure of global social status [28].
- Clustering Coefficient (CC) — The clustering coefficient measures the local connectivity density, or local structure in the graphs [29].

We now formally define these measures. Let a graph g be defined as a set of vertices V and edges E : V × V. Let g_ij be the number of shortest paths from i ∈ V to j ∈ V, and let g_ij(v) be the number of shortest paths from i to j that pass through node v. For some node v ∈ V in graph g, the betweenness centrality, BW, is defined as follows:

BW(v) = sum_{i,j, i≠j, i≠v, j≠v} ( g_ij(v) / g_ij )   (1)

This is a measure of the global importance, or centrality, of a node. The closer the betweenness of a person is to 1, the harder it is for others to communicate efficiently without information flowing through this person.

For a node v in a graph g, the clustering coefficient quantifies the density of the neighborhood of v with values ranging from 0, which indicates a star topology around v, to 1, indicating that the network formed by v and all immediate neighbors forms a clique.

C_v = |{e_jk}| / (k_v (k_v − 1)) : v_j, v_k ∈ N_v, e_jk ∈ E.   (2)

where N_v is the neighborhood of v, defined as:

N_v = { u : e_vu ∈ E ∧ e_uv ∈ E }   (3)

e_vu is an edge, connecting v to u and k_v is the degree of a node defined as the number of vertices, |N_v|, in its neighborhood N_v. The clustering coefficient of a person in a social network is a measure of the connectedness of that person’s neighbors among each other, and thus is indicative of the local clique strength that a person is in. (In undirected graphs, for any node this is just the number of triangles in which that node

2 Note that there may be more than one shortest path between two nodes if multiple paths are of the same length.