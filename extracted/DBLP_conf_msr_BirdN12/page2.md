The effects of distributed developers on the quality of code and productivity were negligible.

Tang et al. used email metadata such as top level domain and IP addresses in email headers to identify location of contributors to PostgreSQL and GTK+ [12]. They found that in both cases, the majority of contributions came from the United States, followed by Germany. Our method of identification of organization and location does not rely on email, but is also completely manual.

Robles et al. looked at how involved companies are in the codebase of projects that comprise the Debian Linux distribution [13]. They used attribution within source files to conclude that 6% to 7% of code in Debian can be attributed to companies, mostly led by giants like Sun Microsystems, IBM, SAP, Silicon Graphics and AT&T, but also includes more small, focused libre software companies like Red Hat, Ximian (now owned by Novell) or MySQL. Robles also examined the locations of SourceForge contributors [14] through the time zone and email address information stored at SourceForge. They also found that the top two contributing countries were the United States and Germany.

Interestingly, there are also several specialized conferences for Open Source (for instance, OSCon and the International Conference on Open Source Systems) and for distributed development (most notably the International Conference on Global Software Engineering). These conferences are dedicated to these topics individually but we are primarily interested in their intersection.

In contrast to our interest in open source software, many have studied distributed development in the context of commercial software projects.

Cataldo and Herbsleb [15] investigated a large-scale project that implemented 1195 features in a software system. They examined the impact product features, attributes of the feature teams and cross-feature interactions on software integration failures. Their results show that factors like the nature of component dependencies and organizational factors such as the geographic dispersion of the feature teams and the role of the feature owners have a complementary impact on software quality. They also found that cross-feature interactions, quantified by the number of architectural dependencies between two product features, were a major driver of integration failures.

Ramasubbu et al. [16] studied 362 projects from four different firms to assess the impact of project-level configurational choices of globally distributed software teams on project productivity, quality, and profits. They identified that imbalances in the expertise and personnel distribution of project teams significantly helps increase profit margins but a profit-oriented imbalance could also significantly affect productivity and/or quality outcomes. They provide recommendations and insights for managers and companies to make the correct choices to help enable successful projects.

Cataldo and Sangeeth [17] examined the impact of process maturity and geographic distribution on software quality in a multinational software development organization and found that there was indeed a large impact. Further they found that as work becomes more distributed the benefits of process maturity diminish.

Prior work by Bird et al. [9] investigated the distributed development of Windows Vista across different sites at Microsoft. The study showed that distributed development does not affect software quality when organizational and process changes are put in place to enable software development.

### III. Research Questions

Unlike commercial software in which contributions come from employees of the same company or in some cases from contracted entities, OSS projects accept work from nearly any organization (provided that such work is of sufficient quality and is legally acceptable). Research at Microsoft [18] and in other commercial settings [19] have found that when a component or work item is spread organizationally, quality and productivity suffer. While OSS projects do not typically adhere to an organizational structure as strictly as in the commercial world, we can still identify the organizations that are contributing to the project.

> Research Question 1: What organizations contribute code and how organizationally distributed are the projects?

In addition, we are also interested in understanding and characterizing the level of geographic distribution of OSS projects. This is also required in order to examine the relationship of distribution to quality. We therefore ask:

> Research Question 2: How geographically distributed are the software projects?

Lastly, once we have understood and characterized the level of geographic and organizational distribution in OSS projects, what are the effects, if any, on software quality? Are the results commensurate with prior studies, indicating a more general phenomenon that is not development process specific or do the effects of distribution on quality differ in OSS?

> Research Question 3: What is the effect of geographically and organizationally distributed development on software quality?

Our hope is that by examining OSS projects in a way similar to previous studies in other contexts, we can gain a deeper understanding of the effects of distributed development (e.g., delay or quality) and how these effects change with domain and process.