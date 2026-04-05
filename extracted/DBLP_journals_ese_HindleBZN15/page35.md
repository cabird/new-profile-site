### 6.5 Issues versus Requirements

One of the problems with our FLOSS replication of the industrial study was that we lacked requirements documents and instead relied on issue tracker issues. Issues in some FLOSS projects are potentially the closest documents to requirements documents. Sometimes features and even user-stories are described in issues. Unfortunately the use of issues is not uniform and the categorization of issues is lacking at best. Thus the issue tracker will usually contain far more bug reports about the software than feature-requests or requirements. This means that our analysis of topics of issues takes on a software quality / software maintenance perspective that was not apparent in the industrial requirements documents.

Furthermore the size of each issue was far smaller than any of the requirements documents and the number of issues per project often exceeded the number of requirements documents we used. Other differences included how we represented the issues to LDA: we explicitly provided authorship information as that was part of the structure of an issue, and part of the structure of the requirements document text. Yet the authorship information for issues is not embedded in the subject or description of the issue; thus to simulate requirements we prefixed the issue author to the issue documents we fed into LDA.

The language and structure of the requirements documents was dictated by a requirements document template. Issues have no such template and are often free-form save for some categorical features such as severity or module affected. This difference could cause LDA to produce template-related topics for the requirements documents.

## 7 Recommendations on the Use of Topic Analysis in Software Engineering

> Based on our experience, the discussions we had with respondents and the results of our surveys we have compiled general recommendations for the use of topic analysis techniques in software engineering.
> 
> Many found that labelling a set of personally relevant topics is easier to interpret. Respondents found that topics about familiar artifacts tended to be easier to label. One should use the most specific domain experts to label topics. For optimal results, the team responsible for the requirements should label those topics.
> 
> Remove confusing, irrelevant and duplicated topics. Some topics do not actually say anything. Some are structural and filled with common terms, some are about the use of language itself and not relevant to requirements. Most importantly, not all topics need to be shown.
> 
> Use domain experts to label topics! We found that non-experts have questionable labelling accuracy (only 50%, with a confidence interval of 35% - 65%). Respondents with the most familiarity gave the most relevant topic labels.