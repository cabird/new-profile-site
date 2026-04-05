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

---

[Image: page2_img_1.png] The screenshot is the combined interface from the paper: a left-hand “Mailing List View” showing a vertical, month-by-month Sankey-style timeline (dates labeled from 1997.05 down to 2000.07) with blue oval cluster nodes and translucent blue edges drawn between months to indicate flows of people; narrow red bars mark the activity of a selected person across months. The upper-right “People Selection Interface” contains a selectable list of participant names, a parallel “Selected” list, and controls (a 'Show Edges' checkbox and a slider) for adjusting the diagram view. The lower-right “File Repository View” shows a collapsible directory tree of files (e.g., apr/, Makefile.in, NOTICE, CHANGES) with horizontal sparklines to the right of each filename encoding that file’s edit history and relative size over time. Together the panes link social activity (who participated and how clusters evolve) with repository activity (who edited which files and when), enabling cross-selection between files and mailing-list participants.

Figure 1: A view of the overall interface.

Of a project's source code, author network, and other development statistics. In their system, the developer network is represented as a standard node-link diagram. Its evolution can be visualized by use of a time slider. This puts it into the “Small Multiples & Animation” category discussed below. In contrast, our system is able to display all timesteps in the network history at once.

### 2.1 Work with Evolving Networks

One of the challenges in our work is to visualize the evolution of the email network. Previous visualization methods relating to evolving networks can be grouped into two categories: 1) Small Multiples & Animation, and 2) Layers.

The Small Multiples technique [16] shows changes in the network by displaying snapshots of the graph at various points in time. Graph snapshots are laid out side-by-side in series, much like frames in a movie, so that viewers can see the differences between snapshots as they move across the page. Naturally, these snapshots may be viewed one after the other in the same space to produce an animation of the changing network.

Chen and Morris use spanning trees with small multiples and animation [5]. Branigan and Cheswick visualize changes in the Yugoslavian communications network during a period of war [4]. Frishman and Tal color and draw bounding boxes around graph clusters to help preserve the mental map between timesteps [11]. Chi et al. arrange disk-tree representations along a timeline. Changes to the trees are highlighted with color while the structure stays the same [6].

The problem with small multiples is that, depending on the temporal resolution of the dataset, there may be large differences between the visual representations of two timesteps. For example, in a dataset with yearly time slices, there may be a major change in the topology which causes the graph layouts before and after the change to appear quite different from each other. A person seeing this jump would lose context and may assume that everything about the network changed. This is apparent in [4]’s animation, where large chunks of the network disappear and reappear spastically. On the other hand, if the graph is moderately large, the differences between timesteps may be imperceptible. A visually displayed large graph is a complex object to behold, and, consequently, small visual changes between two large graphs are difficult to detect.

The second technique, which we call Layers, stacks planes of graph representations at incremental timesteps. The stack is viewed from the top and blended, so that newer planes are in focus and older planes fade into the background. Brandes and Corman use a layering scheme to visualize the dynamic discourse between speakers [3]. Nakazono et al. create a difference layer by comparing two timesteps [14]. The difference layer is then colored and added to the original layer.

The Layers approach has the drawback of only being able to effectively visualize a handful of timesteps simultaneously. As the blended planes pile up, the visibility of each plane is obscured or cluttered and thus the coherence of the visualization is diminished.

Our approach does not fit squarely within either the Small Multiples & Animation or Layers category. As such, we believe it to be a novel representation of evolving networks. It is most akin to Chi et al.'s TimeTube visualization [6], in that we present discrete representations of the network in series along a spatial axis. However, our technique for displaying the information emphasizes the changes that occur between timesteps rather than the individual graphs within the timesteps. It may be thought of as a variation on small multiples, where the graph representations are abstracted and there is linking information displayed between timesteps.

## 3 EXPLANATION OF THE INPUT DATA

The dataset for each software project consists of two parts: the repository and the mailing list.

### 3.1 Repository

Data pertaining to files and authors was gathered from the public CVS repositories of their respective projects. The data contains the entire collection of files and directory structure of the repository. Each file comes with a history of edits made by developers (i.e.

---

who edited what and at when). Each edit also contains information on the number of lines added and removed.

### 3.2 Mailing List

As described in [2], mailing list data was gathered from the public archives of their respective projects. The format of this data is a list of emails. Emails which contain a reply-to header are considered as relationships between senders and receivers. Emails are grouped by the month in which they were sent. Thus, within each month, the relationships between senders and receivers form a network. An evolving network is formed over the timespan of the email list, with each monthly network being a timestep.

## 4 Visualizing the File Repository

A standard Windows Explorer-type tree visualization is used to represent the file repository (Figure 2). Users are free to expand and collapse the file hierarchy at will to view the directories they are interested in. To the right of each file is a sparkline [17] showing the edit history for that file: its evolution. Time flows to the right, along the x-axis. Bars are drawn representing the relative size of the file at each point in time. Thus, an upwards-growing bar depicts a growing file. Each author’s revision of the file is represented in one bar and the bars are alternately colored to distinguish successive revisions. Hovering over a bar creates a small popup with the revision’s author and date. The time scales for each sparkline are correct with respect to each other so that the user can compare file evolutions.

[Image: page3_img_1.png] A two-column interface: a hierarchical file tree on the left (with directories such as xml/, pcre/, support/, test/ and filenames listed) and an "Evolution" column on the right showing a compact sparkline for each file. Each sparkline is composed of alternating shaded bars across a left-to-right timeline (time flows to the right) where bar widths/heights encode a file’s relative size at successive revisions and alternating colors mark successive edits. The highlighted row (aprutil.dsp) shows many successive revisions and steady growth, while other files show varied patterns of growth, plateaus, or sparse activity; a vertical scrollbar indicates the listing continues beyond the visible area.

Figure 2: A view of the file repository. The repository directory hierarchy structure appears on the left and the file evolution sparklines appear on the right. The highlighted file shows typical growth.

If the user wants to see more details about a particular file, double-clicking will bring up a window with more information (Figure 3). This window contains the sparkline as above, but larger, and tables of author statistics for the file. These tables are titled “Most Frequent Authors,” “Most Line Additions,” and “Most Line Removals.” They are sorted so that the user can easily see who, for example, contributed the most lines. The user may click on an author in the table and see the author’s contributions highlighted in the sparkline.

## 5 Visualizing the Mailing List

### 5.1 Clustering

In our implementation we use the MCL algorithm to cluster each mailing list network timestep [18]. MCL works by starting with the entire edge set, then it iteratively removes edges based on their

[Image: page3_img_2.png] A dialog for the file "/srclib/apr‑util/aprutil.dsp" showing a sparkline at the top that encodes the file’s size and successive revisions over time (each vertical bar is a revision). Below are three sorted tables: Most Frequent Authors (Author / Commits), Most Line Additions (Author / Line Additions), and Most Line Removals (Author / Line Removals). William A. Rowe dominates all three lists with 45 commits, 780 line additions, and 398 removals; smaller contributors appear below (e.g., Cliff Woolley 3 commits, Sander Striker 35 additions, Allan Edwards 43 removals). Colored highlights in the tables (blue/green/red) correspond to that author’s revisions highlighted in the sparkline, illustrating who made the large edits and when they occurred.

Figure 3: A file details dialog. The contributions from William A. Rowe, Sander Striker, and Allan Edwards have been highlighted.

weight and topology. For email networks, the edge weights are equal to the number of messages exchanged between two people. When all that is left is a collection of trees, the algorithm stops and considers each tree as a cluster.

### 5.2 Sankey Diagram

Representing an evolving network is challenging due to the additional dimension of time. As discussed in Section 2, the techniques of Layers and Small Multiples & Animation are not ideal for representing the changes occurring between timesteps. To address this issue, we have adapted the well-known Sankey diagram for our purposes.

Sankey diagrams are mainly used to show energy or matter flow through a physical system. Their representation is a continuous one, with the flow being split and combined in arbitrary amounts. We use the diagram to show the flow of people between clusters; therefore it becomes a discrete Sankey diagram.

In our implementation, time flows downwards in monthly stages. At each stage, the people participating in the mailing list conversation are depicted as ovals lined up horizontally, grouped together by their cluster. Each cluster is drawn in order from largest to smallest. This sorting allows the viewer to follow the larger core groups along a straight downwards path. The smaller clusters which represent “side conversations” are then located, appropriately, to the side.

As in a regular Sankey diagram, edges are drawn between two stages if there are people continuing to participate in the mailing list. They connect two clusters in two different time stages, representing the flow of people between the two stages. Each edge has a certain width, proportional to the number of people staying within the two clusters. By observing the edges, the user can achieve insight into the dynamics of the mailing list. For example, a large cluster may fragment into many smaller edges connecting to smaller clusters, indicating a fragmenting of conversation. Consistently thick edges across many stages indicates a strong conversational coherence within the group.

We solved the problem of edge occlusion by simply drawing translucent edges and eliminating exiting edges. Translucent edges allow the user to see the paths of all edges in a crossing. Furthermore, eliminating the exiting edges reduces the number of edge crossings. We are able to do this because we do not care where the exiting flow goes. In this particular application, it is common to have many people leave the mailing list conversation, so drawing the exiting flow will not provide much more meaning. However, the user can still infer the amount of exiting people by visually subtracting the number of people continuing onto the next stage from the number of people in the current stage.

---

### 5.3 Interaction

We allow users to interact with the Sankey diagram in a number of ways. When the diagram is first presented, the space between timesteps (where the edges exist) is set to a moderate length. Since the length of the entire diagram is proportional to the space between timesteps, it is not possible to view the entire diagram without scrolling. Perhaps the user wants to see an overview of the entire dataset. We provide a slider widget so the user can interactively control the amount of space between timesteps. Setting a small amount of space compresses the diagram and allows the user to see more timesteps at once (Figure 4). The edges may be hidden via a checkbox for a simplified view. Perhaps the user wants to see more detail of what happens between a few timesteps. Then setting a large amount of space expands the diagram and allows the user to see the edges more clearly (Figure 5).

[Image: page4_img_1.png] A vertically stacked, compressed Sankey-style view showing one row per month from 1997.11 down to 2003.02; each row contains many small blue rounded nodes representing cluster memberships at that monthly timestep. The nodes in each row are ordered left-to-right by cluster size (largest on the left), and this compressed version omits the inter-stage edges for a cleaner overview. Visually there is a persistent, long left-hand block across most months (the core group) while the right-hand side shows intermittent increases in many small satellite clusters (notably around 1998–2000 and again in parts of 2002), matching the paper’s discussion of fragmentation and later proliferation of side conversations.

Figure 4: Compressing the diagram displays more timesteps at once. Hiding edges provides a cleaner visualization.

The user will likely want to see which people comprise the nodes and edges. Casual queries about who is participating in the discussion is accomplished by hovering the mouse over a particular node or edge. The corresponding person's name will then appear in a popup next to the cursor. Direct selection of the node and edge components are done through mouse clicks. If the user clicks on a person's node or edge with the left mouse button, the corresponding person is selected. Then, throughout the diagram, the node and edges containing that person are highlighted (Figure 6). If the user is looking to select a specific person by name, we provide a list interface to the side which contains the names of all people appearing in the network.

Multiple selections of people are allowed as well (shown in Figure 7). Using the right mouse button to click on nodes or edges adds each corresponding person to the selected collection (as opposed to replacing it). The user can easily manipulate the selected collection via the list interface. People can be moved back and forth between the unselected and selected groups. The selected list may also be cleared by pressing a button.

The user can choose to see the details of conversations between particular people in a particular month. Double-clicking on a developer or edge will pop up a window containing information on the mail sender, receiver, date, and subject (Figure 8). The subject is

[Image: page4_img_2.png] A vertically oriented Sankey-style view of mailing-list clusters for consecutive months (labels at left run from 2002.06 down to 2003.05). At each monthly row a wide blue block on the left denotes the largest cluster and multiple smaller nodes extend to the right; translucent blue ribbons connect nodes between adjacent months. Ribbon thickness encodes how many people continue from one cluster to another and the translucency makes crossings visible; many thin, crossing ribbons indicate frequent fragmenting and rejoining of participants over these months. Note that outgoing (exiting) flow is omitted, so reductions in node width between months imply participants leaving the conversation as well as transfers to other clusters.

Figure 5: Expanding the diagram shows more edge detail.

especially relevant because it allows the user to see the context of the mailing list clusters.

### 5.4 Combining Views

We combine the two views—the repository view and the mailing list view—in one user interface, shown in Figure 1. In addition to those views, we provide a list interface for selecting and deselecting developers. Linking between the repository view and the mailing list view is accomplished through the people. For example, double-clicking a file in the repository view selects the developers who have worked on that file and highlights them in the mailing list view.

## 6 CASE STUDY: THE APACHE PROJECT

To evaluate our visualization technique, we examined the email archive of the Apache Project [1]. Apache is a well-known open source web server application. The archives are publicly accessible via the web and contain all emails dating back to March, 1995. They were processed into a time-varying graph dataset for use with our system. The nodes of the graph are people who posted to the email list and the edges are replies between two posters. A message is considered a reply if the "reply-to" field is used. Edges are then weighted by the number of replies between two people. Inconsistencies in the dataset arise when individuals use different names or addresses to represent themselves. Bird et al. [2] used both fuzzy string matching and manual post-processing to alias the data. In all, there were 2008 unique people posting to the mailing list. The vast majority are casual posters asking questions and only a fraction are active developers. Our dataset contains over 68,000 email messages.

We begin our study by examining the overview of the network (Figure 9). Immediately we can see the growth of the core group during the early years (1995–1999). The core group remains close-knit during that period, as evidenced by the lack of other clusters besides the largest one. Then two-thirds of the way up, we can see satellite clusters becoming more prevalent. The core group continues to dominate the clusters until about one-third of the way up (2000–2002), where it begins to diminish in size. This continues all the way to the bottom, with the core group shrinking and the smaller clusters becoming more numerous (2003–2005).

We note an unusual period with increased clusters beginning in September, 1998 and ending in March, 2000 (Figure 10). It is un-

---

[Image: page5_img_1.png] A vertical time-series Sankey diagram (months labeled from 2000.10 down to 2002.02 on the left) showing monthly clusters as blue horizontal nodes sized by membership and translucent light-blue edges that represent people flowing between clusters across months. One person has been selected: their occurrences are marked by red vertical ticks inside cluster nodes and their inter-month transitions are shown as red edges tracing a path through the diagram, contrasting with the rest of the (unselected) flows. Edge widths vary to indicate the number of people following each transition, so the red path shows when the selected person stayed in the large core cluster versus when they moved into or out of smaller satellite clusters.

Figure 6: An example of selection highlighting. The selected person's nodes and edges are colored in red.

[Image: page5_img_2.png] A vertical, monthly Sankey-like diagram (labels run from 2002.09 down to 2003.10) showing clustered mailing-list participants as horizontal ovals grouped by cluster size (largest clusters on the left). Translucent blue bands and thin blue edges connect clusters between months; edge width encodes the number of people continuing between two clusters. Several people have been selected: their cluster nodes and the specific transition edges are highlighted in red (vertical red bars at the left and red paths across months), making individual participation paths easy to trace amid many crossings. A small table is shown below the diagram listing email header details (Sender, Receiver, Date, Subject) for selected messages to provide contextual evidence for the highlighted flows.

Figure 7: Multiple people may be selected.

[Image: page5_img_3.png] Screenshot of a scrollable email-header table with three visible columns — sender, date, and subject — showing many rows dated Sep 9, 1998. The subject column is dominated by repeated entries of “Re: Apache 2.0/NSPR” (with occasional other threads such as “Re: suEXEC alternative. Please comment.”), indicating concentrated discussion about Apache 2.0 on that date. The sender column shows the same selected developer appearing many times alongside several other contributors, and a vertical scrollbar at the right indicates more messages for that period.

Figure 8: Email header information corresponding to Ben Laurie in September, 1998.

usual because the months preceding and following this period are relatively "calm," with the core group changing very little. In contrast, this period contains many edge crossings and people breaking off from the core group to join satellite conversations. At the very end of the period, there is a sudden merging of many small clusters into the large core cluster. To figure out the cause of this activity, we examined the release history of Apache. It turns out that in 1998, plans were being finalized for the development of Apache 2.0. This version would be written from scratch and was highly anticipated. Using our interface to look at 1998 mail headers, we indeed find many messages related to Apache 2.0 (such as those in Figure 8). In March of 2000, the alpha version (Apache 2.0a1) was released. This coincides exactly with all of the smaller clusters merging into one large cluster. Again, looking at the mail headers for this month, we find much discussion about preparing for the alpha release. It is interesting that, before the alpha release, the participants formed small groups throughout the entire period. Perhaps this is due to the division of labor between developers; each group working on one component of the project. Or perhaps people outside the project were emailing questions and suggestions. We find these smaller clusters to be discussing specific subjects such as "patch to force name virtual hosts," "10x performance increase patch #9," "C compiler for NT," and "XML apache conf." These subjects indicate that the former hypothesis above is more likely: that there was a division of labor between developers. The alpha release then caused the participants to merge into one large cluster. It could be that, once everyone had a point of reference for discussion, the conversation became more organized. It is difficult to tell the nature of this large cluster, as the subject headers are many and varied among technical issues.

It appears that the division of labor seen previously has coalesced into a swarm-like group, with everyone having a hand in the different development sections. It is also interesting to note that, according to the online mailing list archives, there were 586 emails in February (the month before release) and in March there were 1504: a huge difference. Yet despite the large volume, the clusters converged, rather than split off.

We can easily visualize the involvement of notable figures within the Apache Project. For example, Rob McCool, while at NCSA, wrote the original HTTP daemon which Apache was based off of. Figure 11 shows that he contributed to the email list for one year from the beginning of the project, then moved on. Ken Coar (a.k.a. Rodent of Unusual Size) joined the Apache email list at the end of 1996. Figure 12 shows his activity starting from that time. He contributes to the list regularly until 2003, after which there exist some months he does not post at all.

Coar's activity is similar to other large contributors, such as Ben Laurie and William A. Rowe, Jr. Their email postings had been consistent and within the core group until about 2003, when the frequency of emails subsides and they are more often grouped with

---

[Image: page6_img_1.png] A vertical timeline of monthly timesteps (labels on the left run from 1995.02 downward to about 2002.01). Each month is represented by blue ovals arranged horizontally — ovals grouped together are members of a cluster and clusters are ordered left-to-right by size (time flows downward). The plot shows a dense, left-aligned block in the early years (1995–1999) indicating a dominant core group, then an increasing rightward spread of many small clusters beginning in late 1998 and peaking around early 2000 (visible as strong horizontal fragmentation). After that period the left-side core becomes less dominant and smaller satellite clusters appear more frequently through 2001–2002, matching the paper’s description of core shrinkage and growing peripheral activity.

Figure 9: Overview of the Apache email network.

[Image: page6_img_2.png] A vertical, month-by-month Sankey-style timeline from 1995.02 down to 1996.07 shows cluster nodes as filled blue bands along the left side with month labels. A thin red vertical mark within each blue band indicates a selected individual's presence in the dominant cluster for that month; translucent blue ribbons around early 1996 show the person briefly linked into smaller clusters. The red marks are present steadily through 1995 into early 1996 and then disappear, conveying that the highlighted participant was active for roughly a year at the project’s start and then ceased posting to the mailing list.

Figure 11: Rob McCool, author of the original HTTP daemon, helped the Apache project during its infancy, then left the discussion.

[Image: page6_img_3.png] A vertical Sankey-style diagram with monthly timesteps (labels at left from 1998.05 down to 2000.09) showing clusters as blue horizontal nodes and translucent edges between months representing people flowing between clusters. The wide blue blocks on the left of each row indicate a dominant core group; to the right many smaller ovals show satellite clusters, and edge width corresponds to the number of people continuing between clusters. From about September 1998 through March 2000 there is a clear increase in small clusters and many crossing edges (especially a dramatic fragmentation in February 2000) followed by a strong reconvergence into a large core in March 2000, which the paper links to the Apache 2.0 alpha release and a large jump in email volume (586 emails in Feb vs. 1504 in Mar).

Figure 10: The period leading up to the alpha release of Apache 2.0 in March, 2000. The graph appears uniform at the top, then more small clusters form as each month passes. There is a dramatic fragmentation of clusters in February, 2000, before finally returning to uniformity.

[Image: page6_img_4.png] A vertical time-series view (months listed at left from 1996.09 downward) where each row represents one monthly timestep and horizontal blue ovals are cluster nodes ordered by size. Individual months in which Ken Coar participated are highlighted as small red ovals embedded among the blue nodes, beginning in December 1996 and appearing regularly through about 2003 before becoming more intermittent. The dense band of blue ovals early in the timeline reflects a dominant core cluster, while the later rows show more dispersed, smaller clusters — matching the paper’s observation that Coar’s email-list involvement was steady until about 2003 and then subsided.

Figure 12: Ken Coar (highlighted in red) joined the email list in December, 1996. He is still a regular code contributor, though his email list involvement has become more sporadic.

---

smaller clusters. This is perhaps because the Apache software has become stable enough such that code updates are not needed as frequently.

## 7 Case Study: PostgreSQL

In our second case study, we examine the email network of the PostgreSQL project. PostgreSQL is an open source database management system. Like Apache, their email list archive is publicly accessible. The email network we analyzed contains 3,295 unique people and runs from 1998 to 2006. The dataset contains over 86,000 email messages.

We started with the compressed overview shown in Figure 13. For the most part, the network remains consistent: a large core group with very few smaller clusters in each timestep. There are, however, two anomalies that occur at 1999-04 and 2000-04 (Figure 14). They are characterized by a sudden drop off in the core group population and an increased number of smaller clusters. We are yet unsure of the exact cause of the anomalies. One possible explanation is the fact that the dates coincide with the beta releases of versions 6.5 and 7.0. But the question remains: Why does this pattern not occur at other beta release periods?

It appears that the core group is quite large. On closer inspection, that is not the case. Using the selection tools we determined that most casual emailers (those who only post a few times) were grouped by the clustering algorithm into the largest cluster. What this indicates is that the casual poster’s message was replied to not by a single developer, but by multiple developers. The community aspect of the PostgreSQL project is therefore quite strong.

There is a noticeable difference in appearance between the Apache and PostgreSQL email networks. Whereas the Apache network contains many edge crossings and waxings and wanings of the core developer group, the PostgreSQL network remains relatively constant with few edge crossings and a steady core group. The reason may be summed up in a quote by Jolly Chen, an early PostgreSQL developer: “This project needs a few people with lots of time, not many people with a little time.” In other words, it takes a lot of effort to understand the backend code enough to make a useful contribution. We believe that this is why there is a core group of developers who stay together and why there are few side conversations.

## 8 Discussion and Future Work

Since we run a separate MCL clustering process on each timestep, clustering the graph is essentially a greedy algorithm. That is, it chooses the clusters based on information found only in one timestep. The question is, when taken together as a whole, is the resulting Sankey diagram an accurate representation of the dynamics between developers? To determine the accuracy, experts who have worked within the project or studied the history of the project should evaluate the clusterings. Are major splits, fragmentations and merges of social groups correctly depicted? It may be insightful to see the clusterings that other algorithms, besides MCL, produce.

For now, we use transparency to show how edges cross. It works well for the small datasets we use because there are only about two edges per crossing. We surmise that for larger datasets, there will be more clusters and thus more edge crossings. Thus a way to arrange the nodes within each timestep is needed to minimize the number of edge crossings, in addition to transparency. Riehmann et al.’s paper [15], which uses Mansfield’s technique [13] for drawing edges with circular corners and parallel lines, may be useful for more clearly drawing edges and their crossings. It will also remedy the problem of having narrow edges when their angles are steep.

Our system currently arranges cluster nodes by their size. That is, the largest cluster node in a timestep is on the left and the smallest is on the right. This is likely not the optimal arrangement for a

[Image: page7_img_1.png] Monthly timesteps are listed down the left (labels such as 1998.07 through 2005.07) and each row shows discretized cluster nodes as small blue rounded rectangles arranged left-to-right (largest clusters sorted to the left). The figure presents a compressed Sankey-style overview in which a dense, continuous band of rectangles on the left indicates a persistent core group present in most months, while sparser, scattered rectangles to the right represent smaller satellite clusters or side conversations. Because this is a compressed view, the inter-month transition edges are not emphasized here, underscoring the paper’s observation that the PostgreSQL list maintained a relatively steady core with only occasional peripheral clusters.

Figure 13: Overview of the PostgreSQL email network.

[Image: page7_img_2.png] Vertical Sankey-style diagram with time (YYYY.MM) down the left edge from 1999.03 to 2000.07. Each month shows a left-aligned filled blue bar representing the largest cluster (cluster width ∝ membership) and smaller rounded nodes to the right; translucent connecting ribbons between months indicate how many people continue between clusters (ribbon width ∝ number of people). The panels for 1999.04 and 2000.04 show noticeable shrinkage of the large left cluster accompanied by many thin, branching ribbons to multiple small nodes (i.e., fragmentation into numerous satellite clusters), whereas surrounding months show a dominant large core cluster. The paper notes these two months are anomalous in the PostgreSQL timeline and coincide with beta-release periods, which may explain the transient increase in smaller side conversations.

Figure 14: Two anomalies at 1999.04 and 2000.04 in the PostgreSQL email network.

---

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