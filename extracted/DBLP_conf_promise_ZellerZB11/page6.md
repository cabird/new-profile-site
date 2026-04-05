In their paper on defect predictors, Menzies et al. [10] showed that by carefully considering both the set of features used for prediction and the type of learner, better prediction performance could be achieved than prior approaches (which did not evaluate different learners). Their study is a comprehensive comparison of Naive Bayes to other learners that had been in vogue at that time and we refer the reader to this work as an example of careful use of machine learning.

Make findings actionable. As (correctly) stated in the introduction, an empirical finding is the more valuable the more actionable it is. What is the consequence of this result? Should I change things? How? What is the risk of this change? Your empirical finding need not provide answers to all these questions. But it should convey an idea of its potential implications.

As an example of actionable empirical results, see the work of Ramasubbu and Balan on process choice [11]. They evaluated the results of software process choice in 112 software projects and found a link with a number of measures of performance. They were able to identify five attributes of a software project, such as team size, estimated effort, and extent of client involvement, that can be used at the beginning of a project to decide if a standard “plan-driven” approach should be supplanted by a non-standard agile process. Such results are immediately useful to software practitioners.

Fix causes, not symptoms. Being non-actionable may still be better than suggesting the wrong actions. Complexity metrics, for instance, stipulate that specific parts of the code may be problematic. But then, it is trivial to rearrange the code (in a “100% semantics-preserving” way) to satisfy all the metrics. This helps as much as removing “i”, “r”, “o”, and “p” from your program. In most cases, what you need instead is project-specific actions, including empirical investigations on the features that correlate with failure, and a careful search for the actionable causes and abstractions behind these features. Every project is different, and the project-specific issues far outweigh general “textbook” issues.

Get real. The new abundance of ground truth has had several beneficial effects on software engineering research: Automated tools are routinely validated on real code; hypotheses can be backed by real process data. Far too frequently though (and the authors plead guilty as charged) do we rely on data results alone and declare improvements on benchmarks as “successes”. What is missing is grounding in practice: What do developers think about your result? Is it applicable in their context? How much would it help them in their daily work?

To get a starting point on what developers actually need, let us recommend the study by Ko et al. [12]; we leave it to you to assess which of the current research matches these needs.

## 6.2 Issues in Detail

Throughout this paper, we undertook our best efforts to sell our results. This is common practice; indeed, good writing is absolutely necessary to get papers accepted at the best publication venues. However, good writing is a double-edged sword. You can use it to make your presentation clear, precise, and easy to follow. But you can also use it to manipulate the reader to gloss over findings that would not withstand careful scrutiny. For instance, did you notice how

- We deliberately used “programmer actions” as a high-level substitute for the much more banal “characters in a file”?
- Tables 2 and 3 (precision and recall) also contain entries in which the same releases are being used both to train and to test. Any such predictor, of course, would fare well; these entries conveniently beef up the average.
- We justified our choice of Eclipse “to encourage replication”. This paper does nothing to encourage replication, as it does not provide any new data or artifact; the choice of Eclipse remains unjustified.
- We consistently came up with an immediate interpretation for each and every number, such as the “high” correlations for individual letters?
- We compared correlations against each other, without further testing the resulting hypotheses?
- The Y axis in Figure 2 is conveniently set up to suggest large differences, which actually are very minor?
- We (at best) have anecdotal support for hypothesis H3?
- We conveniently avoided any comparison against a baseline? Or any related work?
- Figure 2 actually shows that “n” has a higher correlation than “o”, making this the INRP principle?2
- Our threats to validity carefully avoid all these central problems? (And what would the “real” threats to validity look like?)

Many more of such manipulations can be found in the classic “How to lie with statistics” [13]. Although mainly aimed at false advertising, many of the discussed advertising patterns can equally be applied to scientific papers.

## 6.3 What was Right

Like most parodies, this paper is grounded in real facts. The motivation on making findings actionable (Section 1) has a grain of truth in it. All numbers as reported are correct, and it is indeed possible to predict the defect-proneness of files using character counts as prediction features. (Note how little this demands in terms of implementation.) The correlations listed are also all true to the best of our knowledge; only Figure 4 and the “intern” statements are pure fabrications. In terms of results, this paper satisfies all the principles of serious research; it is the construct, the interpretation and the consequences that are way over the top.

## 6.4 Consequences

Any of these issues listed in this section could easily be picked up by an experienced reviewer. Unfortunately, real blunders are not always as obvious as in this paper; and in many cases, even the authors themselves do not know about their blunders. This is why both authors and reviewers need to be aware about such issues.

As it comes to writing, we as readers and reviewers must be aware of possible manipulations. We must carefully check the numbers and question the author’s interpretations – and authors must present their findings in a way that eases and allows independent interpretation of the results. As a community, we have come a long way over the past 30 years (consider that other empirical fields such as sociology and economics have had centuries to mature!) but our empirical standards have room to improve, and we must favor inconvenient honesty over slick storylines.

## 7. CONCLUSION

The aim of this paper is different from what one would find in “regular” scientific publications – rather than adding new findings

2 Given that all these letters have roughly the same correlation, any combination of INROP would have been fine; IROP simply made the best meme. We leave it to the imagination of the reader what the paper would look like, had we settled on PORN.