![Diagram of dynamic few-shot examples for a test diff](page5_img_1.png)

Fig. 3. Retrieving Dynamic Few-Shot Examples for a Test Diff

### C. Fine-Tuning

The in-context learning approach used three few-shot examples to predict a label for a single diff. While large language models (LLMs) show impressive reasoning capabilities [14], and three few-shot examples can yield reasonable performance, this approach does not fully utilize the available training data. Given that our dataset contains thousands of diffs, relying on only three few-shot examples significantly limits the model’s capacity to generalize. In addition, increasing the number of few-shot examples to improve performance could exceed the context length limitations of models like GPT-4o.

To address this, we leveraged the large amounts of training data by fine-tuning GPT-4 on thousands of diffs. Tables II and III show the distribution of the datasets that we used to fine-tune GPT-4. Previously, we used GPT-4o for the in-context learning task, but during the time of this work, GPT-4o did not have fine-tuning capabilities. Therefore, we opted to use the GPT-4 model for fine-tuning. Fine-tuning can help improve the model’s performance beyond what is possible through in-context learning alone [10], [25]. Rather than retraining all the weights of the transformer, we applied the Low-Rank Adaptation (LoRA) technique, which was implemented via Azure OpenAI Studio. In this approach, additional LoRA layers are added to the linear layers of the transformer, while the original LLM parameters remain frozen. During fine-tuning, only the LoRA layers are trained, adapting the model to the training data. This enables the LLM to better align with the outputs based on the fine-tuned dataset, which can improve its performance in the specific task of diff labeling [26].

## IV. EVALUATION

The aim of this work is to improve developer productivity and efficiency by developing an automated diff labeler. High accuracy and consistent performance is important to gain the trust of OCEs in the IDNA team, and to effectively support their on-call workflows. By automating the diff labeling process, the use of this model can provide efficiencies to the manual labeling process and may significantly enhance the overall productivity of OCEs. For evaluation, we conducted both offline and online evaluation. The offline evaluation utilized the datasets presented in Tables II and III, which were derived from a historical set of diffs that had already been labeled.

The online evaluation, on the other hand, involved real-time diff data that OCEs label on a weekly basis. We collected the weekly snapshot of diffs that required labeling by the OCEs and compared the model’s predictions with the actual labels assigned by the OCEs after they published their results. Each snapshot, released weekly, serves as a collection of diffs that OCEs need to label. For the online evaluation, we used our model to label the current snapshot and then compared its predictions against the ground truth once the OCEs completed the labeling process. It is important to note that the labels outputted by the LLM are a result of a carefully crafted prompt, which requires the LLM to only output one of the three possible labels. This eliminates the chance of receiving an output which is not one of the specified labels.

### A. Evaluation Metrics

In this work, we calculated accuracy values to validate our approach using the following formula:

Accuracy = (TP_NF + TP_UN + TP_R) / (TP_NF + FN_NF + TP_UN + FN_UN + TP_R + FN_R) (1)

where TP represents true positives, TN represents true negatives, FP represents false positives, and FN represents false negatives. In addition, NF represents NewFeature, UN represents UserMarkedNoise, and R represents Regression. For example, TP_NF represents the true positives for the NewFeature label. We chose this formula for accuracy as it measures how well the model identifies positive cases, which is crucial for minimizing missed positives in critical scenarios.

In addition, we computed the individual label accuracies for NewFeature, UserMarkedNoise, and Regression as follows:

Accuracy_NF = TP_NF / (TP_NF + FN_NF) (2)

Accuracy_UN = TP_UN / (TP_UN + FN_UN) (3)

Accuracy_R = TP_R / (TP_R + FN_R) (4)

The definition of the label specific accuracies is similar to the definition of recall in information retrieval tasks. The reason for this is to measure how well the model predicts and retrieves the true positive cases [27].

### B. Offline Evaluation

We collected 3,981 diffs, shown in Table II, for the initial phase of experimentation with the diff auto-labeler. This phase included experimentation with the in-context learning approach, where we evaluated both static and dynamic few-shot examples. Table IV presents the results using static few-shot examples, revealing an overall accuracy of 50.19%, which is moderate in terms of performance. Specifically, the labeling accuracy was approximately 41% for UserMarkedNoise, 54% for NewFeature, and 61% for Regression. These accuracy levels, hovering around 50%, suggest that the model lacks the reliability needed for practical use. This may also be a result of having the same few-shot examples for every diff in the test dataset, which can affect performance if the few-shot examples are not relevant to the test diff being labeled.