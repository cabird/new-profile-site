## Leveraging the Crowd: How 48,000 Users Helped Improve Lync Performance

Robert Musson and Jacqueline Richards, Microsoft  
Danyel Fisher and Christian Bird, Microsoft Research  
Brian Bussone and Sandipan Ganguly, Microsoft

> A new analysis approach produces visualizations to help development teams identify and prioritize performance issues by focusing on performance early in the development cycle, evaluating progress, identifying defects, and estimating timelines.

![abstract green graphic](page1_img_1.png)

Real-world performance is an aspect of software quality that historically has been difficult to measure. Software developers have devoted enormous amounts of time and effort to effectively predict how well a piece of software will perform under various real-world conditions. It's especially difficult to evaluate performance for applications that rely on human communication and network operations for the majority of their functionality.

As mobile devices become more prevalent and Web services and applications grow in market share, information flow across networks and the Internet is becoming an increasingly important piece of most applications.

However, network environments are often heterogeneous, and their latency and bandwidth can vary wildly depending on factors such as the physical link used (wired versus Wi‑Fi), routing hardware, protocols employed, distance between endpoints, firewall rules, and network saturation. In each of these conditions, different use cases—for example, large group meetings or a two-person video chat—can have radically different performance characteristics. Despite this, users expect applications to perform well regardless of environment. With the primary goal of performance monitoring and improvement being high levels of customer satisfaction, how can software project stakeholders evaluate the performance of network-reliant applications in a way that reflects diverse, real-world use?

Rather than improve methods of simulating various operations, scenarios, and environments as testing has traditionally done,1 we can deploy software in a controlled way to groups of users during development and collect performance data. We then dynamically instrument the code to inspect scenarios of interest. Compared to laboratory testing or simulation, the resulting data is both more diverse and more representative because it comes from real use and therefore represents customers' actual experiences. Once this data has been collected, we can break it down into constituent dimensions—by usage scenario, location, and machine configuration—and present the results in ways that can help project stakeholders make decisions. Finally, an analysis dashboard, Engineering Intelligence Analytics (EI Analytics), lets developers investigate performance data.

We’ve carried out this type of work with several teams, and in the case study presented here, we describe our work with the team responsible for Lync, Microsoft’s enterprise