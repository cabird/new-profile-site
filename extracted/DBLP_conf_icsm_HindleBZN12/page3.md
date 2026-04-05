## III. METHODOLOGY

Our goal is to relate commits to topics of requirements and then see if these topics and plots of topic-relevant commits make sense to stakeholders such as developers and managers. Our methodology is to extract requirements, perform topic analysis on the documents and then infer and link these topics across all of the commit log messages in the source code repository. Then we present extracted topics to developers and managers and ask them to label the topics. After that, we show plots of topic-relevant commits to developers and managers and ask whether or not these plots actually match their perception of their effort related to the topic. Finally we analyze and present the results.

### A. Requirements Mining

Microsoft stores requirements documents in their documentation repository. Requirements for a project are grouped by broad general topics. The documents are usually saved as Word documents within the specification repository. These requirements are usually written by program managers (PMs), developers and testers.

We obtained all of the network component specifications from a popular Microsoft product that is used by millions of users and has several millions of lines of source code. We then saved each of these specifications as text files for later analysis. This large collection of requirements documents included 75 total requirements documents consisting of nearly 1,500 pages of documentation, 59,000 lines of text, 35,000 paragraphs, and 285,000 words. The average document was 20 pages long with an average word count of 3,800 words.

Each requirements document has a title, a list of authors and a small table of major revisions. The documents are then further broken down into sections much like IEEE documentation such as Software Requirements Specification (SRS) (the functional specifications), Software Design Description (SDD) (referred to internally as “dev specs”), and Software Test Documentation (referred to internally as “test specs”). Program managers that we interviewed indicated that requirements were generally written by the managers and the “dev specs” and “test specs” were written by developers and testers. The requirements were often the result of “quick specs” that had become “final specs” via a process of comment elicitation and discussion. Once a requirements document became a “final spec”, it could be scheduled for a milestone and assigned to a team.

### B. Requirements Topic Mining

To apply LDA to requirements we preprocessed the documents. We convert each specification to word distributions (counts of words per document) of stemmed words and remove stop words (common English stop words such as “at”, “it”, “to”, and “the”). We provide these word distributions to our implementation of the LDA algorithm. LDA produces a requested number of topics from these processed requirements documents.

To determine the number of topics to use, we ran LDA multiple times, generating 5, 10, 20, 40, 80, and 250 topics. We then chose the number where the topics that were extracted were distinct enough. This meant the first author applied his own judgment to ensure that topics did not overlap top terms, were not copies of each other, and did not share excessive disjoint concepts or ideas. Our number of topics selection algorithm was like a manual fitness function with the first author evaluating the fitness of each set of topics.

Based on these requirements for choosing a number of topics to extract, 20 topics seemed to produce the most optimal topics given our previous requirements. Thomas et al. [9] reported similar results. We argue that if practitioners were following this methodology they would not want many topics because it takes time to label each topic; our survey respondents took approximately 1 to 4 minutes (2 on average) for each topic. Thus we used LDA to produce 20 topics.

#### 1) Labelling of Requirements Topics

Once the topics were extracted from the requirements documents we then labelled each of the topics to the best of our knowledge by reading the top ranked topic words (we kept all topic words) and tried to label them using our non-expert domain knowledge. Only one author, the first author, labelled the topics. Labelling topics was difficult as there were many project specific terms that did not have a clear definition.

The motivation behind labelling topics is that they are time consuming to interpret and are faster to reason about if labelled. Furthermore we wished to compare our labels to those of domain experts (the relevant developers).

### C. Version Control Mining

To correlate topics and development activity we extracted the change log messages from 650,000 version control system commits of a popular Microsoft product. We had approximately 10 years worth of commits from more than 4,000 unique authors. Our properties per commit consisted of user name, machine name, branch name and the change description (sometimes referred to as the commit log message).

### D. Relating Requirements Topics to Commits

In order to relate commits to requirements topics that were already generated, we had to convert the requirements topics to word distributions and then infer the relationship between their word distribution and the topic word distribution. Thus we tokenized the commit log message of each commit and produced a word distribution per commit. We treated these documents in the same manner as the requirements documents.