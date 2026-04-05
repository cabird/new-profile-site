# Visualizing Social Interaction in Open Source Software Projects

Michael Ogawa*  Kwan-Liu Ma†  Christian Bird‡  Premkumar Devanbu§  Alex Gourley¶

Department of Computer Science  
University of California, Davis

## ABSTRACT

Open source software projects such as Apache and Mozilla present an opportunity for information visualization. Since these projects typically require collaboration between developers located far apart, the amount of electronic communication between them is large. Our goal is to apply information visualization techniques to assist software engineering scientists and project managers with analyzing the data.

We present a visualization technique that provides an intuitive, time-series, interactive summary view of the social groups that form, evolve and vanish during the entire lifetime of the project. This visualization helps software engineering researchers understand the organization, structure, and evolution of the communication and collaboration activities of a large, complex software project.

We present a method for visualizing the evolving networks present in project mailing lists. Past visualizations of these time-varying networks have used animation or a layered technique to depict the flow of time. They focused on the representations of individual timesteps rather than the transitions between them. Our technique abstracts the individual timesteps and puts the emphasis on the transitions. Graph abstraction is accomplished through clustering. The clusters are represented in a modified Sankey diagram with edges showing the transitions between timesteps. We make our own modifications to the Sankey diagram in order to enhance clarity and provide more information, explained in detail in Section 5. Using Sankey diagrams in a novel way and emphasizing the transitions between timesteps are the key elements of our approach. We combine the evolving network visualization with an easily navigable view of the file repository. Users are able to see the commit changes for each file, which includes who modified it, when it was modified, and how many lines were added or removed. We then present two case studies of open source software projects: the Apache webserver project and the PostgreSQL database manager project.

> Keywords: software visualization, social networks, software engineering, time-varying data, information visualization, collaborative work  
>  
> Index Terms: H.5.2 [Information Interfaces and Presentation]: User Interfaces—Graphical User Interfaces; D.2.9 [Software Engineering]: Management—Productivity

## 1 INTRODUCTION

Building large software systems involves sustained effort by large teams. Teams of people divide up a large system into manageable components. Then by collaboratively developing each part, they in effect develop the whole system. Communication and collaboration activities are crucial to this process, and are therefore of critical interest to software engineering researchers. Just as a large system is broken into components, for manageability, a large development team forms sub-communities of interest in order to collaborate in an orderly fashion. In commercial projects, these teams are organized by management command; however, the actual communication among team members a) does not necessarily follow organizational boundaries and b) is difficult to observe. On the other hand, open source software projects such as Apache, Mozilla and PostgreSQL conduct software development over the internet, using spontaneously formed, voluntary teams. All team communication occurs on public email lists. Developers discuss engineering activities, bugs, and other issues on the list. Groups of interests form, evolve and disband spontaneously. The historical archives of these lists present a unique opportunity to observe first-hand the communication behavior of software teams. However, the volume of email is huge, spans several years, and involves hundreds of participants.

* email: msogawa@ucdavis.edu  
† email: ma@cs.ucdavis.edu  
‡ email: cbird@gmail.com  
§ email: devanbu@cs.ucdavis.edu  
¶ email: cgourley@ucdavis.edu

## 2 RELATED WORK

Most work in visualizing software projects concentrates on the source code. SeeSoft [9] is an early example of visualizing a large amount of code. Lines, which are pixel-thin, are colored according to some statistic, such as how recently it was modified. CVSs-can [22] uses a history flow [21] to show, at the line level, how source code changes during the development process. These works do not emphasize the social interaction of developers, which we are interested in.

More relevant work with social software collaboration are the following. The Bloom Diagram [12] visualizes the participation type and level of developers by first sorting the developers by their type of contribution, then wrapping them as wedges around a circle. Within a developer’s wedge, there are animated dots which show their specific contributions at different points in time. While the Bloom summarizes the activities of individuals, it does not take into account their interaction with each other. Erickson and Kellogg [10] have created “social proxies” which summarize the situation between people interacting in an online conversation. While it is good for casual assessment of social interaction, it is too minimal for analysis of an evolving email network. The Sociable Media Group at MIT has done much work in visualizing the interactions in a “networked world.” Their research areas within social media are varied, comprising online conversations ([19], [8]), emails ([20]), website activity, textiles, mobile communications, and sociology relating to our digital world. But of particular relevance to our work is their “Open Sources” project [23], which seeks “to understand the relationship between the community’s communication patterns and the code” of software development. Their approach puts emphasis on the amount of code each author has contributed, which appear as stacked bars; much like the history flow diagram mentioned above. Communication events are represented as icons within the bars. Though correlation between email activity and code contribution can be seen, we cannot see the context or the relationships between developers. Finally, Augur [7] offers a comprehensive visualization.