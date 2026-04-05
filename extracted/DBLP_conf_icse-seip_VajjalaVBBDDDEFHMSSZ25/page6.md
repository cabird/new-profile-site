### TABLE IV
STATIC FEW-SHOT EXAMPLES ACCURACY RESULTS

![Table IV: Static few-shot examples accuracy results](page6_img_1.png)

### TABLE V
DYNAMIC FEW-SHOT EXAMPLES ACCURACY RESULTS

![Table V: Dynamic few-shot examples accuracy results](page6_img_2.png)

To improve accuracy, we implemented an approach that retrieves dynamic few-shot examples. The results, shown in Table V, indicate a significant improvement, with overall accuracy increasing to 71.27%. The individual label accuracies also improved, with UserMarkedNoise at 69%, NewFeature at 72%, and Regression at 69%. This represents an almost 20% increase in accuracy across all labels compared to the static few-shot examples. The dynamic approach is more promising for in-context learning, as the few-shot examples are retrieved based on their similarity to the test diff being labeled. However, despite the improvement, the accuracy values still hover around 60–70%, which is not enough for OCEs to fully rely on the model. For OCEs to trust and integrate this approach into their workflows, significantly higher accuracy levels are required.

Given the ceiling of 60–70% accuracy in the in-context learning approaches, we wanted to leverage the larger amounts of training data available, rather than relying on only three few-shot examples. To do this, we fine-tuned both GPT-3.5 and GPT-4 using the initial dataset, while monitoring loss curves with validation data to prevent overfitting. Table VI presents the results of the fine-tuned GPT-3.5 model on the same test dataset used in the in-context learning experiments. The overall accuracy significantly increased to 91.5%, with UserMarkedNoise and NewFeature achieving 95% and 89% accuracy, respectively, which are significant improvements from earlier results. However, the Regression accuracy was 0%, which is not ideal since Regression is the most critical diff for OCEs to label. The training data contained only around 40 Regression samples, and GPT-3.5, being a relatively smaller model, struggled to generalize with such a limited number of examples. We tested GPT-3.5 to evaluate its performance, as the cost of fine-tuning this model is significantly lower and more cost-effective compared to GPT-4. Additionally, being a smaller model, GPT-3.5 takes less time to fine-tune. However, the results showed that while it performed well on UserMarkedNoise and NewFeature, it struggled with

### TABLE VI
FINETUNED GPT-3.5 ACCURACY RESULTS

![Table VI: Fine-tuned GPT-3.5 accuracy results](page6_img_3.png)

### TABLE VII
FINETUNED GPT-4 ACCURACY RESULTS

![Table VII: Fine-tuned GPT-4 accuracy results](page6_img_4.png)

Regression, making GPT-3.5 a less suitable choice if the goal is to use it as an assistant for OCEs in their labeling tasks.

To address this, we fine-tuned GPT-4, a model ten times larger than GPT-3.5. Table VII shows the results of the fine-tuned GPT-4 model on the same test dataset, where accuracy improved further across the board. Overall accuracy reached 95%, with UserMarkedNoise at 96%, NewFeature at 95%, and Regression accuracy climbing to 53%. The significant improvement in Regression labeling accuracy, while unexpected, is reasonable given GPT-4’s capacity to learn complex relationships from smaller amounts of data compared to GPT-3.5. This suggests that the model’s size and capacity played a key role in addressing the challenges posed by limited training samples for Regression examples.

However, the results for the Regression label were still hovering around 50% accuracy. While this is a significant improvement compared to the results from the fine-tuned GPT-3.5 model, it is not helpful for OCEs in terms of reliability and accuracy. To further improve diff auto-labeling performance, not only for the Regression label but also for the other two labels, we increased the dataset size significantly beyond what we initially started with. Table III shows the updated label distribution, where the dataset now contains almost 13,000 diffs, which is more than three times the size of the initial dataset. The goal was to gather as much diff data as possible from the IDNA team to ensure a large sample size for each label in the training set. Identifying Regression diffs is crucial because they result from critical differences between the test and production environments. By collecting as much data as possible, we can ensure a sufficient sample size to fine-tune the model effectively.

After splitting the dataset into training, validation, and testing sets, the number of Regression samples in the training set increased from 41 in the initial dataset to 255 in the new dataset. This large increase in Regression samples provides the model with more diverse training examples, allowing it to generalize better on unseen data. Given the superior performance of GPT-4 in previous experiments compared to