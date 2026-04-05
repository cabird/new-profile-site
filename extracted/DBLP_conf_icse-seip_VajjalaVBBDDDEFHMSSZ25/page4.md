![Overview of Diff Auto-Labeler pipeline](page4_img_1.png)

Fig. 2. Overview of Approach for the Diff Auto-Labeler

### TABLE II
INITIAL DATASET AND DISTRIBUTION OF LABELS IN TRAIN/VAL/TEST

![Table II data split](page4_img_table_2.png)

### TABLE III
SECOND DATASET AND DISTRIBUTION OF LABELS IN TRAIN/VAL/TEST
Data Split

![Table III data split](page4_img_table_3.png)

[18]. The training set is used to train the model, the validation set helps monitor performance during training to prevent overfitting, and the test set is used for final performance evaluation. Tables II and III show the label distribution across these sets. The most common label is UserMarkedNoise, followed by NewFeature, and then Regression. After consulting with OCEs, we confirmed that this label distribution aligns with their experience in labeling diffs. They mentioned that most of the diffs they encounter are labeled as UserMarkedNoise, followed by NewFeature and Regression, which matches the observed data distribution in both datasets.

After collecting the datasets and gathering the diff information, we explored potential approaches for the diff auto-labeler. We experimented with two main methods: in-context learning and fine-tuning for large language models (LLMs).

### B. In-Context Learning

In this approach, we aimed to rely entirely on the LLMs' knowledge and guide it to predict a label for a diff by providing a few in-context examples. In-context learning involves using an off-the-shelf LLM and inserting relevant examples, known as few-shot examples, directly into the prompt [11]. With this additional context, the model is then asked to generate an output for an unlabeled instance based on the examples provided in the prompt [19]. For this task, we selected three diffs to use as few-shot examples in the prompt. For each example, we included the input (the individual diff) and the expected output (the correct label). We ensured that each of the three examples corresponded to one of the three labels: one Regression diff, one NewFeature diff, and one UserMarkedNoise diff. After providing these examples, we then presented the test diff in the prompt and asked the LLM to predict one of the three labels based on the examples given. For this approach, we used the latest GPT-4o model, which is recognized as one of the largest and most advanced LLMs available [20]. As research has shown that the strategy used to select examples in in-context learning can have a large impact on performance [21], we explored two different methods for selecting few-shot examples: static retrieval, where the examples are predefined and remain consistent, and dynamic retrieval, where the examples are selected based on the specific context or characteristics of the test diff.

#### 1) Static Few-Shot Examples
When retrieving few-shot examples, we aimed to evaluate how the LLM performs with static examples, where the same few-shot examples are provided for each diff in the test dataset. To retrieve these static examples, we went through the training data and selected the first occurrence of a diff corresponding to each label. For instance, to find a NewFeature diff, we scanned the training data, which was created in a random order, and selected the first diff associated with NewFeature as our static example. We repeated this process for UserMarkedNoise and Regression, then used these same static examples for every diff in the test dataset to evaluate performance.

#### 2) Dynamic Few-Shot Examples
In contrast to using static few-shot examples, we aimed to retrieve examples dynamically for each test diff (see Figure 3). To achieve this, we embedded the test diff using OpenAI’s embedding method (text-embedding-ada-002 [22]) and did the same for all diffs in the training set. Embeddings are vector representations of data that capture meaningful relationships between elements, such as words or features, by mapping them to a continuous vector space [23]. Using these embeddings, we identified the three most similar diffs to the test diff by calculating cosine similarity [24] and retrieving the most similar diffs. Specifically, we ensured that the most similar Regression, NewFeature, and UserMarkedNoise diffs were selected as the few-shot examples for each test diff. This approach allows every test diff in the dataset to have unique few-shot examples, which can potentially improve the accuracy of label predictions.