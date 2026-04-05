# Mining Email Social Networks in Postgres

Christian Bird, Alex Gourley,  
Prem Devanbu, Michael Gertz  
Dept. of Computer Science, Kemper Hall,  
University of California, Davis,  
Davis, California Republic.  
cabird, devanbu@ucdavis.edu

Anand Swaminathan  
Graduate School of Management,  
University of California, Davis,  
Davis, California Republic.  
aswaminathan@ucdavis.edu

## ABSTRACT

Open Source Software (OSS) projects provide a unique opportunity to gather and analyze publicly available historical data. The Postgres SQL server, for example, has over seven years of recorded development and communication activity. We mined data from both the source code repository and the mailing list archives to examine the relationship between communication and development in Postgres. Along the way, we had to deal with the difficult challenge of resolving email aliases. We used a number of social network analysis measures and statistical techniques to analyze this data. We present our findings in this paper.

## Categories and Subject Descriptors

D.2.8 [Software Engineering]: Metrics — Empirical, Open Source

### General Terms

Human Factors, Measurement

### Keywords

Open Source, Social Networks

## 1. INTRODUCTION

We have created a framework for mining publicly available OSS project data and using the results to answer questions about the activity in OSS projects. In an effort to test and validate our hypotheses based on earlier results from the Apache HTTP Server project, we have performed the same mining and analysis process on the Postgres SQL Server project1. We have mined source code repository activity and used mailing list archives to create a social network of developers and contributors to Postgres. We are hoping to answer the following questions:

- Are the distributions of email activity, and the social network measures (such as in-degree and out-degree) similar in both projects?
- Is there a correlation between mailing list activity and development activity?
- Do the developers have significantly higher status than non-developers in the email social network?

http://www.postgresql.org

## 2. DATAMINING

The Postgres project is a stable and widely used piece of open source software with archives dating back to 1996. In order to mine social data from mailing list archives, we need various forms of information about each message sent on the list. Specifically, we need to know who sent a message, when the message was sent, and if the message was sent in reply to a previous message. Mailing lists accomplish this “message linking” by assigning each message a unique message ID. Message a is a reply to message b if there is an In-Reference-To or In-Reply-To header in a’s headers that has b’s message ID in it. Unfortunately, although the mailing list archives for Postgres began in January of 1997, this method of using message ID’s did not begin until January, 1998. We therefore restricted our mining effort to the time period from January, 1998 to February, 2006.

For the period in question, we found that there were 111,020 messages sent on the mailing lists (over 1,100 per month or 35 per day on average). We were able to parse 110,260 messages (approximately 99.3%). The remaining 760 messages were unparseable mostly due to malformed headers that lacked the Message-ID header crucial to our social network reconstruction. However, we believe that our results would not be significantly affected by the small proportion of unparseable messages.

A serious hurdle to data collection was email aliasing. We found that during this time period, messages were sent to the list from 4,075 unique email addresses. Mailing list participants often use multiple email addresses, so for our analysis to be valid, we need to remove the aliasing from the data. Each message sent on a mailing list has a name and an address of the sender. We have constructed an algorithm that uses a number of heuristics (such as address similarity, edit distance between names, etc.) and clustering to detect sets of email aliases that belong to one person. The results of this process are manually verified and edited for better results. Although it is not possible to completely remove aliasing based on name and address heuristics (it's possible that the name, email pair (shibythomas, sthomas@cise.ufl.edu) is the same person as (david wetzel, dave@turbocat.de), in which case our algorithm would miss it), we believe that our process is fairly accurate. Details of the aliasing algorithm are presented in the companion MSR paper2. After removing aliases we found 3,293 unique “identities” that we believe each correspond to one person. We used a similar technique in conjunction with online research (most OSS projects have a credits file or a developer info page3) to match CVS accounts to mailing list identities.