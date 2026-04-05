Organizations in OSS. In my dissertation, we made an effort to cover different types of projects. For example Apache is a foundation with a well-organized, hierarchical governance structure and formalized policies. Postgres is a community, more informal, with consensual group decision making and Python is monarchist. Please see the original work for threats to validity and contexts in which we believe the results may or may not hold.

## II. Mining Open Source Data

To study and perform empirical analysis on OSS projects, one first has to obtain data from these projects relative to the questions that one hopes to answer.

Previous research exists that presents methods of gathering historical development behavior from source code repositories [4] as well as issue tracking systems [5] and even linking the data between them [6]. However, the dominant form of coordination within OSS is email communication [7], [8]. In my dissertation, we developed techniques for gathering collaborative behavior from mailing list archives and analyzing this behavior in a number of ways.

### A. Mining Email Social Networks

Most OSS projects archive their mailing list interactions because they provide a valuable resource to newcomer project members as well as a historical reference for what decisions were made and why. Fortunately, obtaining these archives and parsing them is not difficult, and we were able to obtain these for a number of prominent projects including Apache, Perl, Python, Postgres, and Ant.

Mailing list messages contain vital information in their headers, including who sent the message, when it was sent, and what message it is in response to. In addition, the content of the message is the actual payload and is amenable to easy lightweight analysis as well.

One non-trivial problem that crops up when analyzing mailing lists is the issue of email aliasing. Many developers use multiple email addresses (especially over a period of many years) and for accurate analysis, we need to be able to attribute all messages sent by a participant to that one participant and not multiple personas. For example, the developer Ian Holsman uses 7 different email aliases, including ian.holsman@cnet.com, ianh@holsman.net, and ianh@apache.org. Sometimes aliases have very little relationships to developers: the developer Ken Coar uses the name Rodent of unusual size associated with email address ken.coar@golux.com.

We developed a clustering method based on email similarity and email naming conventions to identify aliasing candidates [9]. The results of this clustering still require manual post-processing, but greatly reduces the amount of work required.

Once aliases have been removed, we determine who was talking about what and who has responded to who. These threads of messages between developers create social networks of their communication activity. From this point, techniques such as Social Network Analysis [10] provided valuable information about individual developers’ roles in a project community as well as the community as a whole that was used in subsequent studies.

### B. Mining Work Contributions

The content of the messages are just as important as the message metadata. Project participants who do not have write access to the source code can only contribute code in the form of patches and even core developers often post patches for review. Submitting a patch to a project mailing list is evidence of project expertise, an investment in time, and a willingness to contribute. We developed methods of mining these patch contributions from mailing lists and determining if they were accepted to the project, even in the presence of edits to the patches prior to applying them to the source code repository [11]. This data was valuable in a subsequent study on OSS project immigration phenomena [12].

## III. Sociotechnical Dynamics

Having developed mining techniques and mined communication data along with software repository data, we were able to conduct a number of empirical studies to answer questions that we and others have posed regarding how OSS projects actually work. We highlight our key results here.

### A. How are social interaction and development behavior related?

As an activity that involves hundreds and in some cases, thousands of people, we believe that OSS project development is an inherently social process. To investigate this belief, we gathered both social (mailing list) and technical (source code repository) historical data. We used social network analysis to identify the key participants in the communication social network in Apache using betweenness centrality, a global measure of network topological importance, and degree centrality, a more local measure [10], [9], and quantitatively examined the relationship between these measures and development behavior. Figure 1 shows a social network from Apache that is derived only of participants that send at least 150 messages. In a network this small, it is easy to identify the important participants, but the Apache mailing list has hundreds of participants.

We used standard statistical analysis, and details can be found in the original paper [9]. In short, we did find a strong relationship between development behavior and the level of importance that participants have in the social network.

In this study we found that:
- Participants who are core developers (have write access to the project repository) have positions of higher importance in the project social network than others.
- Both measures of network topological importance show a strong positive relationship with development activity. Developers who act as information brokers tend to be those that contribute the most.
- Betweenness centrality, a measure of global importance, is a better indicator of development behavior than degree centrality.
- There is a much lower correlation between documentation changes and social network importance than between source code changes and social network importance. Documentation contributors do not coordinate with others at a high level.