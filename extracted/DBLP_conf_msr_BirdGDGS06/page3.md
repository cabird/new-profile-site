rasmus@madhaus.utcs.utoronto.ca,  
rasmus@mail1.bellglobal.com,  
rasmus@php.net,  
rasmus@raleigh.ibm.com,  
rasmus@vex.net.

Five of these were discovered using the Name Similarity rule (described below); the other six were put into this cluster because of the Email similarity rule. Paul Richards was another promiscuous email masquerader, with 10 aliases. Subsequent random sampling of the clusters by one of the authors (who didn’t do the manual filtering) revealed no discernible errors (see caveat on this later).

### Clustering Algorithm
This algorithm takes a flat list of IDs and clusters them (recall that an ID is a <name, email> tuple). The first step is to create pairwise similarity measures for every pair of IDs. Two IDs with similarity measure exceeding an empirically set threshold are placed into the same cluster. The similarity measure is computed by proceeding as follows:

1. Normalize name: We remove all punctuation, suffixes ("jr"); turn all whitespace into a single space; remove generic terms like "admin", "support" from the name; we also split the name (using whitespace and commas as cues) into first name and last name.

2. Name Similarity: We use a scoring algorithm based on the Levenshtein edit distance [5, 13, 17] between the full names, and the first and last names separately. We consider names similar if the full names are similar, or if both first and last names are similar. Thus, Andy Smith is similar to Andrew Smith, but Deepa Patel is dissimilar to Deepa Ratnaswamy. This is a very productive rule for identifying clusters of similar emails.

3. Names-email Similarity: Two IDs are also scored highly similar if the emails and names match. If the email contains both first and last names (and the lengths of the names are at least 2 characters) we consider them matched. Also, if the email contains the initial of one part of the name and the entirety of the other part, then it is considered a match. Thus Erin Bird matches erinb and ebird.

4. Email Similarity: If the Levenshtein edit distance between two email address bases (not including the domain, after the "@") is small, two emails are considered similar (as long as the two bases are at least 3 characters long).

5. Cumulative ID similarity: The similarity between two IDs is the maximum of the three mentioned above. This generous rule creates larger clusters; however, splitting too-large clusters is easier than unifying smaller clusters (from a very large number of clusters).

The Cumulative ID similarity is computed for all pairs of IDs; IDs with similarity exceeding a threshold are placed into clusters. The clusters are then manually post-processed as described above. The final results produced were hand-inspected by another member of the team, and appear to be free of evident errors. Of course, given the possibility of choosing arbitrary aliases, such manual inspection is fallible. In future work, we will undertake a more formal, sampling-based technique for determining bounds on the error rates in our results. We propose to email a randomly chosen subset of individuals on the list, and ask them if the set of aliases we have found for them is accurate. Assuming that mis-classification errors are uniformly distributed in our clusters, we should be able to calculate confidence intervals on the actual error rate in our clusters.

**CVS alias resolution:** We use a similar approach to resolving cvs account names to email aliases. Similarity metrics are calculated on all pairs of mailing list aliases and CVS names. The final matched list is hand-inspected, also as described above; the same caveats apply, and in future work, we will use the same random sampling approach to statistically bound the errors in our results.

### 3.2 Data Extraction
We gathered data by parsing the email activity on the Apache HTTP Server Developer mailing list over a period starting in 1999 to the current date. Earlier email data was not included because we do not have version-control information before then; we only used the email data for the period during which the source code change data was also available. For every email, we extracted from the email header the message identifier, the sender, the sent time, and the identifier of the message (if any) to which this message was a reply. When a reply-to header was found, the sender of the reply was someone who found the initial message of interest; and so the sender was marked as a recipient of the original message. In this way, we were able to extract communication links between pairs of individuals.

We were able to parse 101,637 messages out of 102,611 messages in the mailing list. A small proportion of messages could not be parsed, because of malformed headers. Approximately 1.3% of the messages were in this category. Malformed headers can fail to provide a message identifier, and can also fail to provide a reply-to identifier. This could be due to misbehaving email clients. We are working on ways to rectify this problem. Quoted text content (as done in [1]) is one approach, whereby one message is identified as a reply if it quotes text from another. Meanwhile, we believe that our results are reasonably robust, and would not be affected much when these (currently unparseable) messages are included in the analysis.

## 4. DESCRIPTION: SMALL WORLD
The distributions of the data that are shown in Figure 1 describe the behavior of the participants of the email list. Each is a histogram showing the number of people exhibiting a particular kind of behavior. The character of the distributions is consistent with previously observed social phenomena, and show the typical long-tailed characteristic in the log-log domain plot.