## Validity of Network Analyses in Open Source Projects

Roozbeh Nia, Christian Bird, Premkumar Devanbu, Vladimir Filkov  
Computer Science Department  
University of California, Davis  
{nia, bird, devanbu, filkov}@cs.ucdavis.edu

> Abstract—Social network methods are frequently used to analyze networks derived from Open Source Project communication and collaboration data. Such studies typically discover patterns in the information flow between contributors or contributions in these projects. Social network metrics have also been used to predict defect occurrence. However, such studies often ignore or side-step the issue of whether (and in what way) the metrics and networks of study are influenced by inadequate or missing data.
>
> In previous studies email archives of OSS projects have provided a useful trace of the communication and co-ordination activities of the participants. These traces have been used to construct social networks that are then subject to various types of analysis. However, during the construction of these networks, some assumptions are made, that may not always hold; this leads to incomplete, and sometimes incorrect networks. The question then becomes, do these errors affect the validity of the ensuing analysis? In this paper we specifically examine the stability of network metrics in the presence of inadequate and missing data. The issues that we study are: 1) the effect of paths with broken information flow (i.e. consecutive edges which are out of temporal order) on measures of centrality of nodes in the network, and 2) the effect of missing links on such measures. We demonstrate on three different OSS projects that while these issues do change network topology, the metrics used in the analysis are stable with respect to such changes.
>
> Index Terms—Open Source, Social Networks, Information Flow

a quantitative, systemic type of analysis, it is appealing on multiple levels, especially to the empirical software engineering discipline which is growing in rigor and maturity.

There has recently been some criticism of this approach, focusing on data quality issues, the proper application of social network metrics, their adequacy for studying the problems of concern, and the interpretation of the results [1].

Of specific interest to this work are the SNA of developer communication networks constructed from correspondence mined from online developer mailing lists. These mailing lists are used for communication and coordination amongst the project workers (e.g., to review possible changes to the source code [2]). One can derive social networks from the online mailing list archives. The nodes are the people sending messages on the list. If a person A replies to a message from another person B, then there is an edge connecting the node representing A to that representing B. Software engineering is a very knowledge-centric activity, and the mailing lists are the critical media for information exchange between developers. Information flow in the social network is naturally a critical area of study. The majority of what we know about the information flow in developers' social networks is based on these mailing list interactions.1

The email social networks have been analyzed in the past to determine the mediators of knowledge (hubs in those networks) as well as the emergence of community structure [4], [5].

Here we focus on two concerns about the validity of such studies due to the effects of inadequate data and metrics on information flow in email networks.

#### A. Incorrect Information Flow due to Temporal Aggregation

If developer A posts a message on the discussion groups (e.g., announcing a new feature that has been added), and developer B replies to developer A’s message (warning that a duplication of function may have occurred), and C replies to B’s message (concurring with B), one can reasonably conclude that there is information flowing from A to C. Alternatively,

1 There has been research on developer communication via IRC [3]; however, this research was interested in the length and attendance of meetings on IRC rather than actual information flow in a network.

### I. INTRODUCTION

Some Open Source Software (OSS) projects have been runaway successes, sometimes besting commercial competitors. Their success, and the open availability of OSS project histories, including communication, development and maintenance activities, have made them valuable guinea pigs (similar to Caenorhabditis Elegans and Arabidopsis Thaliana, in Biology) in the search for more effective ways of organizing distributed teams that collaborate using Internet modalities. Their email archives are a particularly interesting source of information concerning task-oriented communication behaviors of the OSS project collaborators. Social Network Analysis (SNA) on these networks has proven valuable for generating a “bird’s eye view” of networks of collaborating individuals, making it a natural setting for studying information flow and emerging organization in OSS projects by examining the social and communication networks of developers. Since SNA offers a quantitative, systemic type of analysis, it is appealing on multiple levels, especially to the empirical software engineering discipline which is growing in rigor and maturity.