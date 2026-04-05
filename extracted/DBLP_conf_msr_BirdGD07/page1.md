# Detecting Patch Submission and Acceptance in OSS Projects

Christian Bird, Alex Gourley, Prem Devanbu  
Dept. of Computer Science  
UC Davis  
Davis, CA 95616, USA  
cabird, acgourley, devanbu@ucdavis.edu

## Abstract

The success of open source software (OSS) is completely dependent on the work of volunteers who contribute their time and talents. The submission of patches is the major way that participants outside of the core group of developers make contributions. We argue that the process of patch submission and acceptance into the codebase is an important piece of the open source puzzle and that the use of patch-related data can be helpful in understanding how OSS projects work. We present our methods in identifying the submission and acceptance of patches and give results and evaluation in applying these methods to the Apache webserver, Python interpreter, Postgres SQL database, and (with limitations) MySQL database projects. In addition, we present valuable ways in which this data has been and can be used.

Therefore, the patch submission and acceptance process is critical to OSS communities and worthy of study. We present a method of collecting patch submission and acceptance data that has largely been overlooked until now. This mined data can give us finer grained insights into OSS communities (which have largely been divided into the roles of developers, dev mailing list participants, and users), give more information about the files contained in project file repositories, and tell us more about developers themselves by examining their submissions prior to becoming developers and their reviews afterwards.

We have developed a method to both detect patch submissions on the project mailing lists and determine if the submitted patch was applied to the codebase within the project repository. In this paper we discuss some of the issues faced in datamining patches in an open source project and present our methods for overcoming them. We also present our findings and a preliminary evaluation from applying these methods to the Apache, Python, PostgreSQL, and MySQL projects. In addition, we discuss ways in which this patch data has been used and can be used in the future.

## 1 Introduction

One of the primary tenets of the open source philosophy is that anyone can decide to contribute to a particular project in any way that they want. The success of OSS projects is highly dependent on a stream of newcomers who are able and willing to contribute in a number of ways such as writing documentation, fixing bugs, adding new features, sharing technical expertise, providing support to users, etc. While each OSS project has a core group of developers with write access to the source code (and in some cases documentation) within its repository, newcomers without this privilege can also make contributions. These contributions are primarily made by submitting patches on project mailing lists. In our investigations, the mailing list participant pool is usually one to two orders of magnitude larger than the inner circle of developers. However, only some of the mailing list participants actually submit work-gifts in the form of patches. Most developers are drawn from this smaller group. There.

## 2 Related Work

This work is inspired by two studies of OSS projects. Nicolas Ducheneaut performed an ethnographic study on the Python project which emphasized the importance of patches in the development and social process [3]. Von Krogh et al. examined joining scripts (among other things) for newcomers and the processes by which they made contributions to the Freenet project [5]. In addition, there is a large body of literature which supports the notion that patch submission is a critical aspect in open source software.

## 3 Methodology

The process of detecting patch submissions and acceptances is part of a much larger project at UC Davis.