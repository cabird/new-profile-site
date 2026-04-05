global minimization of edge crossings. A brute-force algorithm exists for finding the optimal arrangement between two timesteps, but there is a larger problem: the cluster node layout of one timestep affects the ones immediately above and below it. Therefore, arranging the clusters in one timestep optimally may lead to suboptimal arrangements in later timesteps. Simulated annealing, though expensive, may be one way to obtain a satisfactory arrangement of nodes.

In order to visualize an email network, which is a time-varying graph, we use the Sankey diagram as our visual construct. We believe that Sankey diagrams can be used to show the evolution of clusters in any time-varying graph. These include evolving social networks, citation networks, and any other “living” network. We would like to perform more case studies to determine our method’s effectiveness at capturing the characteristics of these additional networks.

Ideally we would like to include both repository and mailing list information in one coherent visualization construct. This would provide a better overview of the entire software process. The challenge will be to represent a hierarchy (the repository) and a network (the mailing list) together in the same view and link them together. We are currently working on such a representation. We would also like to incorporate other aspects of software projects, such as the source code. Data such as the specific lines changed by each author and the function call graphs may prove useful in the study of relationships between design, collaboration and communication in software engineering.

## 9 CONCLUSION

Network visualization and graph drawing are well-studied fields. However, as discussed in Section 2, there are few existing methods for visualizing evolving networks. We believe that the time-varying aspect of graphs will be increasingly desirable to analyze because most real-world graphs are evolving (e.g. the internet, social networks and citation networks).

We have applied the Sankey diagram — a classic visualization of energy flow — in a novel way to visualize network evolution over time. Specifically, we abstract the individual graph timesteps with clustering and draw edges to emphasize the transitions between timesteps. We have also added our own modifications to the Sankey design, such as discretized nodes and translucent edges, which enhance comprehension. We created a system which allows the exploration of these diagrams with simple, intuitive interaction mechanisms. We then presented case studies which apply our technique to the domain of open source software development. In those case studies we found examples of social behavior which were related to events in the project’s development. The ability to visualize a large, evolving social network is of great use to software engineering researchers and open source project participants. Our system allows them to make sense of the complex dynamics of evolving networks and see features that would otherwise remain unnoticed.

## REFERENCES

[1] Apache mailing list: dev@httpd.apache.org.

[2] C. Bird, A. Gourley, P. Devanbu, A. Swaminathan, and M. Gertz. Mining email social networks. In ICSE 2006 Workshop on Mining Software Repositories (MSR 2006), 2006.

[3] U. Brandes and S. R. Corman. Visual unrolling of network evolution and the analysis of dynamic discourse. Information Visualization, 2(1):40–50, 2003.

[4] S. Branigan and B. Cheswick. The effects of war on the yugoslavian network, 1999.

[5] C. Chen and S. Morris. Visualizing evolving networks: Minimum spanning trees versus pathfinder networks. infovis, 00:9, 2003.

[6] E. H. Chi, J. Pitkow, J. Mackinlay, P. Pirolli, R. Gossweiler, and S. K. Card. Visualizing the evolution of web ecologies. In CHI ’98: Proceedings of the SIGCHI conference on Human factors in computing systems, pages 400–407, New York, NY, USA, 1998. ACM Press/Addison-Wesley Publishing Co.

[7] C. de Souza, J. Froehlich, and P. Dourish. Seeking the source: software source code as a social and technical artifact. In GROUP ’05: Proceedings of the 2005 international ACM SIGGROUP conference on Supporting group work, pages 197–206, New York, NY, USA, 2005. ACM Press.

[8] J. Donath. A semantic approach to visualizing online conversations. Commun. ACM, 45(4):45–49, 2002.

[9] S. G. Eick, J. L. Steffen, and J. Eric E. Sumner. Seesoft - a tool for visualizing line-oriented software statistics. IEEE Trans. Softw. Eng., 18(11):957–968, 1992.

[10] T. Erickson, C. Halverson, W. A. Kellogg, M. Laff, and T. Wolf. Social translucence: designing social infrastructures that make collective activity visible. Communications of the ACM, 45(4):40–44, 2002.

[11] Y. Frishman and A. Tal. Dynamic drawing of clustered graphs. In INFOVIS ’04: Proceedings of the IEEE Symposium on Information Visualization (INFOVIS ’04), pages 191–198, Washington, DC, USA, 2004. IEEE Computer Society.

[12] B. Kerr, L.-T. Cheng, and T. Sweeney. Growing bloom: design of a visualization of project evolution. In CHI ’06: CHI ’06 extended abstracts on Human factors in computing systems, pages 93–98, New York, NY, USA, 2006. ACM Press.

[13] P. A. Mansfield. Programmatic rendering of directed, weighted graphs. In Proceedings of 2nd Annual Conference on Scalable Vector Graphics, 2003.

[14] N. Nakazono, K. Misue, and J. Tanaka. Nel2: Network drawing tool for handling layered structured network diagram. In K. Misue, K. Sugiyama, and J. Tanaka, editors, Asia Pacific Symposium on Information Visualisation (APVIS 2006), volume 60 of CRPIT, pages 109–115, Tokyo, Japan, 2006. ACS.

[15] P. Riehmann, M. Hanfler, and B. Froehlich. Interactive sankey diagrams. In Proceedings of the 2005 IEEE Symposium on Information Visualization (INFOVIS ’05), 2005.

[16] E. Tufte. Envisioning Information. Graphics Press, 1990.

[17] E. Tufte. Beautiful Evidence. Graphics Press, 2006.

[18] S. van Dongen. Graph Clustering by Flow Simulation. PhD thesis, University of Utrecht, 2000.

[19] F. B. Viegas and J. S. Donath. Chat circles. In CHI ’99: Proceedings of the SIGCHI conference on Human factors in computing systems, pages 9–16, New York, NY, USA, 1999. ACM Press.

[20] F. B. Viegas, S. Golder, and J. Donath. Visualizing email content: portraying relationships from conversational histories. In CHI ’06: Proceedings of the SIGCHI conference on Human Factors in computing systems, pages 979–988, New York, NY, USA, 2006. ACM Press.

[21] F. B. Viegas, M. Wattenberg, and K. Dave. Studying cooperation and conflict between authors with history flow visualizations. In CHI ’04: Proceedings of the SIGCHI conference on Human factors in computing systems, pages 575–582, New York, NY, USA, 2004. ACM Press.

[22] L. Voinea, A. Telea, and J. J. van Wijk. Cvsscan: visualization of code evolution. In SoftVis ’05: Proceedings of the 2005 ACM symposium on Software visualization, pages 47–56, New York, NY, USA, 2005. ACM Press.

[23] A. R. Zinman. Open sources: http://smg.media.mit.edu/projects/opensources/.