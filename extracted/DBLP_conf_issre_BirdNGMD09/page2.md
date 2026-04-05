Dependency information that performs better than previous research.

3) We compare our approach directly with prior network analysis based prediction methods by evaluating each on the same data sets.
4) We show that our method works in multiple, diverse contexts with different processes by using it on large code bases in both a traditional industrial setting (Windows Vista) and an open source software (OSS) setting (Eclipse).
5) We demonstrate how this approach can be used in practice by accurately predicting failure prone components in one release based on models built from prior releases.

## 2. Background and Prior Work

Our work arises from two lines of work: studies of *social networks* within project teams, and *technical networks* of components within systems.

Technical networks have been used in previous work to build prediction models for failures. Zimmermann et al. [4], [3] constructed networks from dependency information for binaries and subsystems in Windows Server 2003. This study used social network analysis on dependency information to build prediction models for post-release failures. Their results indicated that models built on social network metrics were better indicators of future failures than models based on standard source code metrics. Their approach leveraged SNA metrics to capture both local and global effects of network connectivity on defect-proneness.

Prior work has also shown that software artifact properties are directly influenced by social network properties of teams, such as their email interactions, and their contribution history of developers. In earlier work, Bird et al. [5] constructed email social networks from open source project mailing lists and found that social network analysis measures were highly correlated with development activity. In addition, they found that global connectivity measures such as betweenness [6] were better indicators of development activity than local measures such as degree centrality. Pinzger et al. [2] used contribution history to construct the networks of binaries and the developers that contributed to them. They found that measures such as degree centrality, closeness centrality, and Bonacich power (see [7], [8], [9], [10] for a survey of these measures) in contribution networks also had very good predictive power in determining failure-prone binaries.

Meneely et al. [11] created networks that consisted solely of developers where edges between developers were based on collaboration on common files. They used social network analysis to assign values of metrics such as betweenness, degree, and closeness to developers. The value of a metric for a file was based on the values of the developers that contributed to that file (such as maximum, sum, or average of a metric for developers for a file). They evaluated their approach on an industrial product from Nortel. They

found that a model using these metrics explained 60% of the variance of failures during the testing phase, but only 2.6% of the post-release failures.

Combining social and technical networks has recently become a subject of study. Socio-technical networks encode connections between people, connections between technical artifacts and connections between people and artifacts. Although we do not include developer social interaction via email, IM, or other communication media, we do capture collaboration through joint work artifacts.

Amrit et al. [12] first proposed use of socio-technical networks which he calls "affiliation networks" in the context of evaluating Conway’s Law and claimed that important information is embedded in the topology of these networks. He posited that "We can use the idea of the affiliation network to improve current design, execution, and productivity of software process models".

Indeed, Valetto et al. [13] do just that by examining socio-technical networks and measuring the socio-technical congruence, degree of communication and coordination between developers who are related to the same software component or dependent software components.

Cataldo et al. [14], [15] looked at time to resolution for modification requests (MRs) at a commercial software development company. They found that time to resolution for an MR, a, with a dependency on another MR, b, was decreased if those responsible for a had some form of contact (geographical locality, IRC, etc.) with those responsible for b. They find that developers take 32% less time to complete tasks when this form of "congruence" is in the socio-technical network.

## 3. Theory

In this section we present arguments for combining dependency and contribution topological information when examining defect proneness.

### 3.1. Network Definitions

We begin by formally describing the three networks of binaries that are used in our analysis. To illustrate our methods, we include a running example of a simple software system and its corresponding networks in figure 1. In these networks, circles represent software components and boxes represent developers. A solid edge between two components is directed and denotes a dependency relationship. A dashed edge between a developer and a binary is undirected and denotes a source code contribution from the developer to the binary.

#### Contribution Network

The contribution network captures the contributions of developers to software components within the system. We use a mapping from source files to software components along with development logs which include which developers contributed to which files to build a bipartite network.