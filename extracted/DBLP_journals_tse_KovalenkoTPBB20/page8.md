### 4.3.2 Results

If the models are different, if we consider the moment in which the deployed model changes, a change of accuracy at this moment would indicate an influence of the recommendations on choices. For example, if choices are biased towards recommendations of the Recency model, its observed accuracy would experience a drop at the moment the Recency+Size model gets deployed instead. A similar argument works for the Recency+Size model — its accuracy should increase once it is deployed, if the recommender influences the choices of users.

Considering the explanation above, we explore the accuracy trend around the model change date to conclude whether we can observe the influence.

As a first step, we compare the output of the two models to ensure that they are dissimilar for the same input, so that we could see a difference in case of influence of the model. The outputs of the two models are indeed dissimilar: The mean value of Jaccard similarity index [64] between the recommendation lists provided by the two models for the same event is 0.502.2

If the recommendations had a significant influence on the choice of reviewers, we would expect the models to demonstrate higher precision when evaluated during the period of their deployment, than during the period when another recommendation model was in place, as an effect of the influence of recommendations on the choices (Section 4.3.1). Figures 6 and 7 indicate lack of such effect: we do not see any increase in precision in Figure 7 at the moment when the Recency+Size model was deployed. On the one hand, the increase in precision could be dampened by the increase of the pool of potential reviewers: it is harder for the model to select a few relevant users from a bigger pool, which could cause precision to degrade. However, coverage figures (Section 4.5.1) suggest that it is unlikely to be the case, and the recommendations from Recency+Size model is actually more focused: Recency+Size model recommends the smaller proportion of the pool (only two in three active users ever got recommended by Recency+Size model), and these recommendations are picked more often: “intersection/recommended” and “match/recommended” ratios are higher than those of Recency model. Another argument towards the lack of influence is that we do not see a decrease of precision of similar nature in Figure 6 at the point when the Recency model went out of use. From this observation, we conclude that the increase in the number of active users does not directly decrease precision, and lack of shift in the precision of one model at the point where the deployed model has changed can be interpreted as an indication of the weakness of influence of model’s recommendations on users’ choices.

We expected to see a noticeable shift in precision values at the moment of change of the deployed model, as a sign of the influence of recommendations on choices. Figures 6 and 7 display no such shift.

2. For calculating the Jaccard index, we only consider the events where at least one of the two models provided a non-empty recommendation list, because (1) we only consider such events for calculating the accuracy metrics and (2) computing the Jaccard index for two empty sets would imply division by zero.

![Plot of accuracy metrics over time for Recency model](page8_img_1.png)

Fig. 6: Accuracy of the Recency model relative to user choices. During the second period, a different recommendation model (Recency+Size) was in use. However, difference in accuracy values between the two periods is well within monthly variance.

![Plot of accuracy metrics over time for Recency+Size model](page8_img_2.png)

Fig. 7: Accuracy of the Recency+Size model relative to user choices. During the first period, a different recommendation model (Recency) was in use. However, difference in accuracy values between the two periods is well within monthly variance.

## 4.4 RQ1.2 — How accurate are the recommendations of a deployed recommender?

### 4.4.1 Adjusted accuracy metrics

The commonly used metrics to quantify the accuracy of recommendations are top-k accuracy and MRR. These are reasonable metrics of list similarity, which makes them a good choice when the task is to compare two lists — recommended and selected items. However, these metrics are not a good fit for our event-based data. In our case, at every event of reviewer addition, a list of recommendations should be evaluated against exactly one selected user. Because the scope of recommendations in our target system is one review, it might seem reasonable to merge all observations for a given review into one list and use the conventional metrics. It is, however, not feasible for a thorough evaluation: the recommendation output is influenced