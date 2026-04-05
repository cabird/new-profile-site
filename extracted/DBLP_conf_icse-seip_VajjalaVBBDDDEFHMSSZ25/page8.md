### TABLE IX
SNAPSHOT #1 RESULTS. (N.D.) INDICATES VALUE IS NOT DEFINED

![Table IX: Snapshot #1 results](page8_img_1.png)

### TABLE X
SNAPSHOT #2 RESULTS

![Table X: Snapshot #2 results](page8_img_2.png)

### TABLE XI
SNAPSHOT #3 RESULTS. (N.D.) INDICATES VALUE IS NOT DEFINED

![Table XI: Snapshot #3 results](page8_img_3.png)

### TABLE XII
SNAPSHOT #4 RESULTS

![Table XII: Snapshot #4 results](page8_img_4.png)

suggests that the model is very effective at correctly predicting when a diff should be labeled as noise, which reduces false positives in this category. The confusion matrix results align with these findings. For the NewFeature label, there are some false positives (e.g., 3 false positives in Snapshot #3) and false negatives, but the overall prediction performance remains impressive. However, for Regression, we see zero true positives in most snapshots and a reliance on true negatives to maintain accuracy. This shows the importance of manual validation in Regression labeling, even though the model can still serve as a useful assistant for other labels.

D. Ablation Analysis

From our experiments, we observed that the fine-tuned GPT-4 model on the larger dataset outperformed all the other models described in this paper in both offline and online evaluations. As mentioned in Section III-A, we used seven attributes to represent each diff, one of which was the user comments. These comments help on-call engineers (OCEs) understand and label diffs correctly, serving as a valuable textual feature for LLMs to identify the appropriate label. To evaluate the importance of the comments attribute, we conducted an ablation study by removing it from the set of diff attributes and fine-tuned a separate GPT-4 model that utilized all other attributes except comments. We initially tested this in an offline evaluation on the same training dataset. Table XIII shows the results of the fine-tuned model without comments.

From the results, we observe that the accuracy values across the three labels decreased compared to the results in Table VIII, which included comments. However, the UserMarkedNoise accuracy remained high, and the accuracy values for the NewFeature and Regression labels stayed above 66%, which

### TABLE XIII
FINE-TUNED GPT-4 RESULTS WITHOUT COMMENTS

![Table XIII: Fine-tuned GPT-4 results without comments](page8_img_5.png)

is reasonable given that each diff is missing one additional, very informative, attribute. The precision and recall values provide further insight into the model’s performance across different labels. Although the model shows high precision (0.9025) and reasonable recall (0.7653) for the NewFeature label, it struggles to capture all relevant instances, suggesting room for improvement in recall. UserMarkedNoise maintains an impressive performance with both precision (0.9399) and recall (0.9778), which indicated that the model effectively classifies most of the diffs associated with this label. However, the Regression label shows lower precision (0.7273) and recall (0.6667). This suggests that the model struggles with these kind of diffs without the comments attribute.

To evaluate the performance of the model without comments in an online setting, we selected two snapshots from recent OCE on-call sessions. The diffs in these snapshots were auto-labeled using the model without comments. Tables XIV and XV present the results, where the diffs were auto-labeled using the fine-tuned GPT-4 model without comments.

The results show that the NewFeature label struggles significantly, with accuracy ranging between 50% and 60% across both snapshots. However, the UserMarkedNoise label main-