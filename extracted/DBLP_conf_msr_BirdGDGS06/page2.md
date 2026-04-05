respond to a message on the public forum, which then becomes visible to everyone. Roughly 73% of messages elicit response messages. A response b to a message a is an indication that the sender of b (s_b) found that the sender of a (s_a) had something interesting to say; thus the response from s_b indicates that the original message a represented information flowing from s_a to s_b. It is also an indication of status, i.e., s_b indicates that s/he found s_a’s email worth reading, and worthy of response.

The level of activity of developers on the mailing list varies dramatically. The most active developer on the mailing list sent 4486 messages during the life of the project. The least “chatty” developer sent just 10 messages. There were, of course, non-developers who sent just one message. Messages reflect communication interactions between developers. Some developers have a great many interactions: one developer’s emails had responses from 254 distinct individuals. Likewise, another developer replied to messages from 281 distinct individuals. However, the vast majority of individuals participating on the email list sent very few messages, and received very few replies to their messages. This type of “Pareto” distribution is common in social phenomena [14].

The community on the Apache developer mailing list is concerned primarily with software, and so the question naturally arises as how email activity relates with development activity. This activity can be conveniently recovered from the versioned source code repository (CVS in this case). As has been reported in earlier research [8] on Linux, development activity, as recorded in CVS, also shows a few developers doing the bulk of the work.

Our research goal is to study the relationship of the C&C activities of developers, as revealed in the email archives, to their software development activity. Specifically, we are interested in how the activities and connections between developers on the mailing list relate to their development activity in the source code. We are interested in the following types of questions:

- What are the properties of the social network of developers?
- Are developers who send a lot of messages on the mailing list also very active in source code changes?
- Do developers play a different role than non-developers in the social network?
- Do the most active developers have the highest status among developers?

Unfortunately, answering these types of questions requires facing some challenges in data extraction, primarily having to do with resolving aliasing issues on the email archives and CVS archives.

## 3. OF DOGS AND DEVELOPERS

“On the Internet, no one knows if you’re a Dog” — so goes the famous New Yorker Cartoon. It is difficult (and sometimes impossible) to determine the identity of individuals who correspond on mailing lists using aliases. The same individual can use different email aliases. For example the developer Ian Holsman uses 7 different email aliases, including ian.holsman@cnet.com, ianh@holsman.net, and ianh@apache.org.

Sometimes aliases have very little relationships to developers (or dogs): the developer Ken Coar uses the name Rodent of unusual size associated with email address ken.coar@golux.com. Ignoring these aliases and treating these as distinct email personalities would confound later steps of data analysis. Likewise, when CVS comments are made, developers use a CVS account name. Fortunately, since access and accounts to CVS are controlled centrally, there is less of an aliasing problem with CVS account names. However, in order to relate email activity and programming/development activity, we must correlate email names with CVS account names. Given the possibility of choosing arbitrary aliases, one can make two important observations: first, an individual determined to maintain an anonymous alias can always do so; second, any automated algorithm for resolving aliases will be inexact, and must be supplemented by subsequent manual analyses.

We now describe our hybrid automated/manual approach to resolving aliases.

### 3.1 Unmasking Aliases

Most emails include a header that identifies the sender, of this form:

> From: "Bill Stoddard" <reddrum@attglobal.net>

This header reveals immediately the problem — Bill Stoddard, who here uses the handle reddrum is actually also bill@wstoddard.com. But how can we know that?

Overview: Our first step in resolving aliases is to automatically crawl messages and extract all such headers to produce a list of <name,email> identifiers (IDs). Once this is done, we execute a clustering algorithm that measures the similarity between every pair of IDs. This could occur if either the names are similar, or if the emails are similar, or if the names and the emails are similar (the precise details of the algorithm are explained below). IDs that are sufficiently similar are placed into the same cluster. Once clusters are formed, they are manually post-processed.

Apache Summary: In the case of the Apache developer mailing list, we began with 2544 separate IDs. The clustering algorithm produced 1581 clusters. The largest of these had 70 members, the next biggest 55, and so on; finally, there were 163 doubles, and 1271 singletons. Naturally, these clusters contained errors, and had to be manually post-processed. Mindful of the need for manual post-processing, we deliberately set the cluster similarity threshold quite low: it is much easier during a manual step to split clusters than to unify two disparate clusters from a very large set. Manual processing of the 1581 clusters produced 2012 distinct individuals, some of whom have many aliases. One noteworthy example is Rasmus Lerdorf, with 11 aliases:

rasmus@apache.org,  
rasmus@bellglobal.com,  
rasmus@lerdorf.ca,  
rasmus@lerdorf.com,  
rasmus@lerdorf.on.ca,  
rasmus@linuxcare.com

1 Email addresses are used with permission from the mailing list participants.

2 The identity of the infamous “David who wishes to remain anonymous”, who spammed several email lists, offering to post personal adverts in Ukraine, was not easily found.