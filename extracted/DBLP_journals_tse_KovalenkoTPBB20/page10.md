A lower ratio of average lengths of non-empty recommendation lists between two models suggests that a higher rate of empty recommendations largely defines the difference.

![Scatter plot of average and non-zero recommendation counts over months](page10_img_1.png)

Fig. 9: Average recommendation list size over 1-month periods

Figure 10 presents coverage of recommendation and selection of users, relative to all active users. The numbers demonstrate the value of this metric in addition to accuracy metrics: with analysis based strictly on accuracy metrics, the lower value of recall that Recency+Size model demonstrates, along with only marginal change in precision, would be interpreted as degraded performance compared to Recency model. However, the higher "intersection/recommended" and "match/recommended" ratios that Recency+Size model demonstrates despite a lower "picked/active" ratio, suggest that the smaller subset of active users whom Recency+Size model presents as recommendations appears more relevant to the users, making the recommendations of Recency+Size model more likely to be followed.

### 4.6 RQ1 - Summary

The deployed models’ accuracy is in line with existing results obtained through offline evaluation. The models are slightly different in terms of accuracy metrics. Recency+Size model on average gives less recommendations and reaches a slightly lower average recall. There are no noticeable changes in precision, evaluated for one model, at the moment of the deployed model change. A possible reason for lack of this effect is lack of influence of recommendations on choices of users, which contradicts our expectations about a deployed reviewer recommendation model. To shed light on how the users in our considered setting perceive the recommendations, we turn to a qualitative investigation of this aspect, which we describe in the next section.

## 5 RQ2: DEVELOPERS’ PERCEPTION AND USE OF REVIEWER RECOMMENDATIONS

We dedicate our second research question to understanding the perception of relevance and helpfulness of recommendations by developers. To do so, we turn to the developers with interviews and surveys.

![Bar chart showing recommendation coverage counts for Recency and Recency+Size models](page10_img_2.png)

- “active”: number of developers who made code changes in and before the corresponding period;
- “recommended”: number of developers who were recommended as reviewers at least once during the period;
- “picked”: number of developers who were picked as reviewers at least once during the period;
- “intersection”: size of the intersection of “recommended” and “picked” sets;
- “match”: number of developers who were selected in at least one event where they were also recommended.

Fig. 10: Recommendations coverage for the two periods.

### 5.1 Data Collection and Analysis

First, we conducted semi-structured interviews at JetBrains with four developers who routinely use the recommender system. To further explore preliminary themes that emerged during the interviews, we ran an online survey among JetBrains developers. Finally, we sent another, large-scale online survey—augmented with questions addressing the themes that emerged at JetBrains—to developers at Microsoft who perform code review and possibly use the available reviewer recommender system.

Interviews. We conducted a series of online one-to-one interviews with professional developers at JetBrains, each taking approximately 20 minutes. To select participants, we focused on developers from the IntelliJ IDEA team, whose review activity was the subject for quantitative investigation in RQ1. The first author of this paper, who used to work at JetBrains before conducting this work, reached out to several developers from his past professional network. To mitigate the risk of moderator acceptance bias [65], the author selected only developers who provided him with frank feedback on his work at the company on past occasions.

The same author conducted the interviews [66] in a semi-structured form. This form of interviews makes use of an interview guide that contains general groupings of topics and questions rather than a pre-determined fixed set and order of questions. Such interviews are often used in an exploratory context to “find out what is happening [and] to seek new insights” [67]. The guideline was initially based on the main topics that emerged from the analysis of the recommender system’s behavior; then it was iteratively refined after each interview. With consent, we recorded the audio, assuring the participants of anonymity. Since the interviewing author had both backgrounds in software development