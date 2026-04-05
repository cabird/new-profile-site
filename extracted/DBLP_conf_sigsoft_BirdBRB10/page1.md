## LINKSTER: Enabling Efficient Manual Inspection and Annotation of Mined Data

Christian Bird†, Adrian Bachmann‡, Foyzur Rahman†, Abraham Bernstein‡

† Computer Science Department, University of California, Davis, USA  
‡ Department of Informatics, University of Zurich, Switzerland  
{bachmann,bernstein}@ifi.uzh.ch  
{cabird,mfrahman,ptdevanbu}@ucdavis.edu

### ABSTRACT

While many uses of mined software engineering data are automatic in nature, some techniques and studies either require, or can be improved, by manual methods. Unfortunately, manually inspecting, analyzing, and annotating mined data can be difficult and tedious, especially when information from multiple sources must be integrated. Oddly, while there are numerous tools and frameworks for automatically mining and analyzing data, there is a dearth of tools which facilitate manual methods. To fill this void, we have developed LINKSTER, a tool which integrates data from bug databases, source code repositories, and mailing list archives to allow manual inspection and annotation. LINKSTER has already been used successfully by an OSS project lead to obtain data for one empirical study.

## 1. INTRODUCTION

Over the past 10 years, information mined from software archives has become an increasingly used source of data for both tools and empirical studies in software engineering research. The majority of such research relies on automatic methods of mining and analyzing such data. Oftentimes, as in the case of Sliwerski et al. [1] and Bird et al. [2], heuristics are used because sound and precise techniques do not exist. These heuristics are based on codifying the steps used in a manual process, and in many cases these methods have been shown to be quite effective. However there are cases where manual inspection and annotation may be required, for example:

- To refine the results of automatic, heuristics-based approaches.  
- To evaluate how well a heuristic-based, or predictive tool, performs.  
- To understand a phenomenon by examining multiple data sources in an exploratory way.  
- To understand very noisy data.

In their 2006 CSCW distinguished paper, Cataldo et al. [3] examined the relationship between coordination patterns and the time to resolution for Modification Requests (MRs). They observed that communication patterns had a significant effect on resolution time. In this study, developer communication (in the form of IRC logs) had to be manually associated with relevant modification requests (MRs) because they were rarely mentioned explicitly in discussion. The authors were able to associate MRs via contextual information and key phrases like “John’s issue” or “the memory problem.” They estimate that the process took over 2000 man-hours divided among three co-workers to complete.

The difficulty with manual inspection is that it can be cumbersome to identify, integrate, view, and annotate different forms of data from multiple sources. Consider the steps required in our lab to record notes about the changes that introduced a severe bug into a piece of software:

1. Execute a SQL query on the database which contains bug tracking and source code repository data to identify the severe bug and the filenames and revisions associated with the fix.  
2. Query repository system for meta-data associated with commit such as author, date, and log message.  
3. Check out the content of the file before and after the bug fixing commit to examine change context.  
4. For each line that was modified in the bug fixing commit, use git blame to determine which commits introduced the offending line.  
5. Check out the contents of the file before and after each of the bug-introducing commits, to examine the context of these changes.  
6. For each bug-introducing commit, issue a SQL query to extract meta-data such as author and log message.  
7. Issue an insert SQL statement to record observations from manual inspection of the data.

In many steps, information in one step (e.g. a revision and a filename) must be recorded for use in the command of a future step. These steps also assume that one is familiar with the data schema, repository locations, and syntax of the commands used. Whether for impartiality or required expertise, the researchers (often the only people who have such knowledge) may not be annotating the data themselves. In these cases, efficiency is critical because researchers want to maximize the amount of data obtained, tedium may drive away potential contributors, and there may be some form of compensation provided (e.g. an hourly wage for undergraduates). We claim that when the process by which manual data is inspected and annotated becomes efficient enough, the types and uses of such data qualitatively change.

In an effort to take advantage of the benefits of manually inspected and annotated data and overcome the problems associated with the process of obtaining it, we have developed LINKSTER. LINKSTER is written in Python and PyQt, and runs on Linux and OS X.

In a recent study [4], an APACHE developer used LINKSTER to examine 677 commits in one day. He linked commits to their associated bugs, marked the type of each change, and included notes with commits to help us understand how the project worked, how well a linking heuristic worked, and what the effects of a perfect oracle are on a bug prediction method.

## 2. DESCRIPTION OF LINKSTER

LINKSTER efficiently displays, integrates, and allows inspection and annotation of information from three main sources of data: