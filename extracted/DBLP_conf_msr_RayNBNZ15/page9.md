![Accuracy plots for Project B](page9_img_1.png)

month  
(a) Accuracy of REC-I

month  
(b) Accuracy of REC-II

Fig. 5: Accuracy of Recommendation Systems for Project B

partially due to our choice of high token threshold; we could not suggest non-unique changes that have smaller change size. For the same reason, we perform reasonably well in precision w.r.t. state of the art recommendation system by Nguyen et al. [28], based on similar change uniqueness philosophy. They reported a precision of 30% with top-3 and top-1 suggestion. Though a direct comparison with the top-3 and top-1 precision is not possible (though in most of the cases REC-I suggests fewer than five suggestions), our recommendation system performs reasonably well in predicting non-unique changes.

Interestingly, from Figure 5(a) we find that the precision and recall vary periodically over time. We believe this behavior is related to the short lifespan of the non-unique patterns (See RQ1 of Section III). When developers introduce a non-unique pattern, they use it frequently for a short amount of time and then stop using it. Once REC-I learns the pattern, it continues suggesting it. As long as the developers use that pattern, the accuracy of REC-I remains high. However, when the developers stop using the pattern, the accuracy falls off until new non-unique changes are introduced. All the three projects show this periodic trend.

**TABLE IX: Overall Performance of the Recommendation Systems**

| Project | REC-I precision | REC-I recall | REC-II precision | REC-II recall |
|---------|------------------:|-------------:|------------------:|-------------:|
| Project A | 59.91% | 67.36% | 38.48% | 50.79% |
| Project B | 57.41% | 65.44% | 41.16% | 46.95% |
| Linux     | 52.11% | 59.02% | 42.95% | 37.53% |

Recommendation System II (REC-II): We observe that developers often use multiple non-unique changes together, in the same commit. For example, changes of Table VIII are committed together 4 times in Linux in different files. They also appear in different method bodies. Leveraging such co-occurrences, we build Recommendation System II (REC-II) to suggest relevant non-unique changes. If a developer introduces a non-unique change in the code-base, REC-II searches for other change patterns that are committed together in the past along with the introduced change. For each match, REC-II displays frequency, i.e., number of times the recommended changes were committed together.

Similar to REC-I accuracy, we measure REC-II accuracy over a continuous time period. Figure 5(b) shows the rolling precision and recall for REC-II for project B. The other two projects show similar trend. We notice that REC-II’s precision and recall shows similar periodic nature as those of REC-I. The average precision for projects A, B, and Linux are 38.48%, 41.16%, and 42.95% respectively. Similarly, the recall values are 50.79%, 46.95%, and 37.53% respectively (see Table IX).

## V. RELATED WORK

Uniqueness of Code. Prior research shows a general lack of uniqueness in source code. Gabel and Su study source code uniqueness across 6000 projects including 420 million lines of code and find that code fragments are similar up to seven lines (6 to 40 tokens) [8]. Using n-gram model, Hindle et al. show that source code is repetitive in nature and has high degree of predictability [12]. Kamiya et al. find 10% to 30% of code similarity in large scale projects (e.g., gcc–8.7%, JDK–29%, Linux–22.7% etc) [16]. James et al. find evidences of adopted code in device driver modules between Linux and FreeBSD [4]. In this work, instead of looking at non-unique code, we look at how non-uniquely code evolves with time.

There are research on repetitiveness of code change as well. Ray et al. [31] show that around 11% to 16% changes are non-unique between FreeBSD, NetBSD, and OpenBSD in each release. In a recent study, Nguyen et al. [28] inspect a large corpus of changes for 2,841 open source Java projects, and find that up to 70–100% of source code is non-uniquely changed within and across projects. Barr et al. also find evidence that change lines reuse existing code. However, these prior works look at changes at small granularity—one or two lines of non-unique changes. In contrast, we purposefully focus on either larger non-unique changes (or smaller non-unique changes but made in similar code context) to avoid unintentional non-uniqueness. Thus, our work does not take into account smaller non-unique changes that may be introduced due to program construct, for example, addition of while loop etc. We further characterize change uniqueness w.r.t. before-after relation (non-unique deletion, non-unique addition, non-unique modification) and analyze them in developer and architectural dimensions.

Complementary studies further characterized changes based on their semantics as opposed to structural similarities. For example, Kawrykow and Robillard found that up to 15.5% of method updates of a software contains non-essential changes—cosmetic or behavior-preserving changes [17]. However, non-unique changes are not necessarily non-essential.