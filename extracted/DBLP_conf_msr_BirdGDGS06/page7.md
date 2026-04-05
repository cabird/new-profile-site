projects decentralize, to simplify C&C activities. This paper is more centered on the study of individual developers and how their email activity and social status changes with their commit activity.

Commit behaviour in versioned repositories has been used as indicator of social linkage. Lopez-Fernandez et al [12] consider two developers to be linked if they committed to the same module, and two modules to be linked if they were committed to by the same developer. The resulting social networks are similar in structure to ours. The work of De Souza et al [6] is similar, except that they study files instead of modules. This work also visualizes the changes in social position of developers within the social network over time, and that of modules in the module dependency network. Developers become more “central” in the social network over time. Turning to modules, they found that code ownership in some parts of the system was more stable than others. Finally, we note that these papers study collaboration networks, whereas our focus is more on communication networks; the relationship between the two is a subject of our current research.

## 7. CONCLUSION

We describe here our work on mining the email social network on the Apache HTTP server project. We had to face head-on the challenge of resolving multiple email aliases that were used by the same individuals; failing to do this would have seriously affected our ability to study the social network of developers. We have hand-inspected our alias resolution for errors; however, we acknowledge that our alias-resolution step is in need of further validation. Our goal is to do this by mailing a sample of participants to get an idea of the accuracy of our alias resolution. Furthermore, a small number (less than 1.3%) of email headers could not be parsed; we are also working on resolving this. However, we believe that a) there are likely to be only a few errors in the aliasing and b) that the preliminary results reported here are quite robust and unlikely to change significantly even as our data extraction improves.

Our analysis indicates that the email social network is a typical electronic community; a few members account for the bulk of the messages sent, and the bulk of the replies. The in-degree and the out-degree distribution of the social network exhibit typical long-tailed, small-world characteristics. We also note that there is a strong relationship between the number of messages sent, and the number of different people who respond to them; this merits further study.

Our preliminary data also indicates a strong relationship between the level of email activity and the level of activity in the source code, and a less strong relationship with document change activity. Our data also gives strong indications that developers play a much more significant social role among all the participants in the mailing list. Furthermore, the data also supports preliminary finding that the level of activity in the source code is a strong indicator of the social status of a developer (among other developers); the document activity is not as strong an indicator.

Our near-term goal is to study these effects in a time-series basis, to investigate if there are causal relationships between development activity and social status. We are also very interested in studying the relationship between the architecture of the system, and social network of the developers (which is also known as Conway’s Law).

## 8. REFERENCES

[1] R. Agrawal, S. Rajagopalan, R. Srikant, and Y. Xu. Mining newsgroups using networks arising from social behavior. In WWW ’03: Proceedings of the 12th international conference on World Wide Web, 2003.

[2] A.-L. Barabási and R. Albert. Emergence of scaling in random networks. Science, 286:509–512, 1999.

[3] C. Bird, A. Gourley, P. Devanbu, A. Swaminathan, and M. Gertz. Mining email social networks in postgres. In MSR ’06: Proceedings of the International Workshop on Mining Software Repositories, 2006.

[4] F. Brooks. The Mythical Man-Month: Essays on Software Engineering, 20th Anniversary Edition. Addison-Wesley, 1995.

[5] S. Chapman. Sam’s string metrics page. www.dcs.shef.ac.uk/sam/stringmetrics.html.

[6] J. F. P. D. Cleidson de Souza. Seeking the source: Software source code as a social and technical artifact, 2005. http://opensource.mit.edu/papers/desouza.pdf.

[7] K. Crowston and J. Howison. The social structure of free and open source software development. opensource.mit.edu/papers/crowstonhowison.pdf, November 2004.

[8] B. J. Dempsey, D. Weiss, P. Jones, and J. Greenberg. Who is an open source software developer? Communications of the ACM, 45(2):67–72, February 2002.

[9] L. C. Freeman. Centrality in social networks I. Conceptual clarification. Social Networks, 1:215–239, 1979.

[10] M. Granovetter. The strength of weak ties. American Journal of Sociology, 78:1360–1380, 1973.

[11] K. Kuwabara. Linux: A bazaar at the edge of chaos. First Monday, 5(3), March 2000.

[12] L. Lopez, J. M. Gonzalez-Barahona, and G. Robles. Applying social network analysis to the information in cvs repositories. In Proceedings of the International Workshop on Mining Software Repositories, 2004.

[13] G. Navarro. A guided tour to approximate string matching. ACM Comput. Surveys, 33(1):31–88, 2001.

[14] M. E. J. Newman. The structure and function of complex networks. SIAM Review, 45:167–256, 2003.

[15] J. Nieminen. On centrality in a graph. Scandinavian Journal of Psychology, 15:322–336, 1974.

[16] E. S. Raymond. The Cathedral and the Bazaar: Musings on Linux and Open Source by an Accidental Revolutionary. O’Reilly and Associates, Sebastopol, California, 1999.

[17] E. Ukkonen. Algorithms for approximate string matching. Information & Control, 64(1-3), 1985.

[18] P. A. Wagstrom, J. D. Herbsleb, and K. Carley. A social network approach to free/open source software simulation. In Proceedings First International Conference on Open Source Systems, pages 16–23, 2005.

[19] J. Xu, Y. Gao, S. Christley, and G. Madey. A topological analysis of the open source software development community. In HICSS ’05: Proceedings of the 38th Annual Hawaii International Conference on System Sciences (HICSS’05) - Track 7, 2005.