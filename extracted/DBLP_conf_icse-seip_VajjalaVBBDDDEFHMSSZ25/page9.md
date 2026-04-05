### TABLE XIV
FINE-TUNED NO-COMMENTS GPT-4 RESULTS FOR SNAPSHOT #2

| Metric | NewFeature | UserMarkedNoise | Regression | Total |
|---|---:|---:|---:|---:|
| Accuracy (%) | 60.0% | 97.06% | 0.0% | 80.0% |
| Correct Predictions | 3 | 33 | 0 | 36 |
| Ground Truth Count | 5 | 34 | 6 | 45 |
| Precision | 0.6 | 0.825 | 0.0 | - |
| Recall | 0.6 | 0.9706 | 0.0 | - |

### TABLE XV
FINE-TUNED NO-COMMENTS GPT-4 RESULTS FOR SNAPSHOT #4

| Metric | NewFeature | UserMarkedNoise | Regression | Total |
|---|---:|---:|---:|---:|
| Accuracy (%) | 56.52% | 91.89% | 0.0% | 77.05% |
| Correct Predictions | 13 | 34 | 0 | 47 |
| Ground Truth Count | 23 | 37 | 1 | 61 |
| Precision | 0.8125 | 0.7556 | 0.0 | - |
| Recall | 0.5652 | 0.9189 | 0.0 | - |

Maintains strong performance, with accuracy between 90% and 98%, which is impressive given that the comments attribute is missing. For Snapshot #2 (Table XIV), the model without comments fails to correctly identify any of the six regression diffs, while the model with comments correctly identifies 4 out of 6 regression diffs, as shown in Table X.

The results of this ablation study, in both offline and online evaluations, show that while the model continues to perform well for the UserMarkedNoise label, it struggles with labeling accuracy for the NewFeature and Regression labels. This is because comments provide valuable textual information that helps the LLM understand the diffs. Without this additional context, the model experiences information loss, leading to reduced prediction accuracy. This suggests that comments are essential for maintaining strong performance, which is critical if OCEs are to rely on the model during on-call sessions.

### E. Time Efficiency

In terms of evaluation, we have shown that by leveraging the reasoning capabilities of LLMs, we can achieve impressive performance for diff labeling, to the point where the labeling for all three labels can be more efficient for OCEs. Given the nature of this labeling task, OCEs are likely to validate the labels over time before fully trusting the automated suggestions. OCEs spend hours each week manually labeling these diffs, and our goal is to significantly reduce this time while improving efficiency. For evaluation, accuracy alone was not the only focus. The main motivation behind this work is to improve workflows within IDNA’s release process at Microsoft, aiming to boost developer productivity and streamline overall software engineering processes, such as labeling diffs. This can also reduce burnout for OCEs, improving their efficiency and leading to better overall work performance.

We conducted informal discussions with OCEs and found that integrating an AI assistant, like the model we presented, reduced the time required to label a snapshot from hours per week to just 15 minutes. This is a significant improvement and it directly benefits OCEs during their on-call sessions.

Not only does this improve productivity for OCEs, it also benefits the IDNA team. For IDNA, saving time is crucial, and by streamlining software engineering workflows, the team can deliver new features faster, which can lead to increased business value for both Microsoft and its customers.

## V. DISCUSSION

The fine-tuned model showed impressive performance in the diff labeling task, achieving very high accuracy values. However, its predictive nature means it can occasionally produce false positives and negatives. Specifically, false negatives for regression (which is the most critical for OCEs) can lower the priority of certain diffs, requiring additional investigation. Despite these limitations, the model serves as an initial opinion for developers, with low error rates for the most important label.

Traditionally, in terms of classification, it is common practice to use existing machine learning techniques such as decision trees, neural networks, and others to make predictions. The traditional models thrive under circumstances where the sources of data are very rich and there is an abundance of it. However, in the diff labeling task, the features are mainly text-based, which contains a lot of rich textual information that can be beneficial to understand a diff. Given the abundance of textual information, the choice of using LLMs for the diff labeling task was not out of question. LLMs have been trained on a large corpus of text data, and are known to be very good at understanding and generating text in various domains [14]. Therefore, by prompting and fine-tuning LLMs, we were able to achieve impressive performance in diff labeling.

The classification task is one of the most important and well-known methods in the field of machine learning. Many attempts in previous research efforts have tried to improve existing models to perform better in these tasks. Based on the results in this work, we showed that the use of LLMs can be adopted to improve classification accuracy. If the data contains textual features or any additional categorical information, we show that LLMs can be a reliable approach to classifying data at a high level. The main drawback of traditional classification models is the need for rich data, which is important to understand the underlying patterns in the data. However, with LLMs, they already have a strong understanding of knowledge, given that they have been trained on a large corpus of text data. Therefore, adapting the model to make predictions in a new domain is not difficult and can lead to good performances.

In addition to the LLMs' abilities in classification tasks, we found that different sizes for LLMs can impact performance. For example, we first started by fine-tuning GPT-3.5 on the diff labeling task, which yielded good results. We followed by fine-tuning GPT-4, which is ten times larger than GPT-3.5, and the results improved drastically across all labels. The field of generative AI is moving at a rapid pace, where newer models are being released quickly. With the increase in performance that we observed when using two different sized LLMs, it is possible that newer models can perform significantly better than the existing models for this same task. In addition, the newer and bigger LLMs have a stronger