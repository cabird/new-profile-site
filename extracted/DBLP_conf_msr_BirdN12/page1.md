# Who? Where? What? Examining Distributed Development in Two Large Open Source Projects

Christian Bird  
Microsoft Research  
Redmond, Washington  
cbird@microsoft.com

Nachiappan Nagappan  
Microsoft Research  
Redmond, Washington  
nachin@microsoft.com

## Abstract

To date, a large body of knowledge has been built up around understanding open source software development. However, there is limited research on examining levels of geographic and organizational distribution within open source software projects, despite many studies examining these same aspects in commercial contexts. We set out to fill this gap in OSS knowledge by manually collecting data for two large, mature, successful projects in an effort to assess how distributed they are, both geographically and organizationally. Both FIREFOX and ECLIPSE have been the subject of many studies and are ubiquitous in the areas of software development and internet usage respectively. We identified the top contributors that made 95% of the changes over multiple major releases of FIREFOX and ECLIPSE and determined their geographic locations and organizational affiliations. We examine the distribution in each project's constituent subsystems and report the relationship of pre- and post-release defects with distribution levels.

## I. INTRODUCTION

FIREFOX and ECLIPSE are commonly referred to as archetypes of successful Open Source Software (OSS) development. They are large and complex code bases that have achieved wide scale adoption. ECLIPSE is so successful that it has developed a business ecosystem surrounding it. One obvious question to ask is how such products have come to exist and what types of development processes these projects use. Champions of the open source movement (such as Eric Raymond [1]) claim that open source software defies the constraints of globally distributed development because its main collaboration mechanisms are based on the internet, which is inherently geographically and organizationally distributed.

Open source software systems have been used to study various aspects of software engineering, spanning the spectrum from requirements engineering [2], software quality [3], characterizing the development process [4], investigating code review practices in open source software systems [5], and examining communication practices [6], [7], [8]. However, perhaps because it often seems implicit with the very notion of OSS, few studies exist which examine levels of either geographic or organizational distributed development in open source software. In an attempt to add an additional piece to the OSS knowledge puzzle, we investigate distributed development for two large OSS systems.

In this study, we take a deeper look into the development of FIREFOX and ECLIPSE to study how distributed its development is and what the effects of distributed development are.

We make the following contributions in this paper:
1) We identify and characterize geographic distributed development for two large open source projects at system-wide and also component levels of granularity.  
2) We identify which organizations contribute to these projects and report how organizationally distributed these projects are.  
3) We assess the impact of geographic and organizationally distributed development using measures introduced in earlier empirical studies of commercial software projects.

With regard to the third contribution listed, a portion of this study represents a replication of an earlier study of distributed development [9] on projects in a different context (OSS vs. Commercial), although the previous study did not examine organizational distribution. In this case, we present a dependent replication [10]. As Shull et al. indicate, insight into the software engineering question of interest (in our case, the question of the relationship between distributed development and defects) can be gained, whether such a replication has similar or opposite results.

## II. PRIOR WORK

In recent years open source software systems have been studied in great detail as they provide a ready repository of real-live software systems, without complications of dealing with software companies for permission to access repositories, legal issues, distribution of results and confidential clauses.

There has been prior work that identifies organizational and geographical attributes of open source projects. We list here the most prominent.

The closest work to ours is that of Spinellis [11]. In this study Spinellis analyzed FreeBSD by investigating the impact of geographic allocation on code quality. He identified locations of contributions by using the latitude and longitude of developers that distributed with the FreeBSD port of XEarth. In total he was able to attribute 79% of the commit lines to developers with known locations. Based on this data, Spinellis determined that global development allows round-the-clock work, but there are some significant differences between the type of work performed at different locations.