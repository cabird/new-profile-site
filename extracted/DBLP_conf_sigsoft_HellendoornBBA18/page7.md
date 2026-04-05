![Screenshot of web interface example](page7_img_1.png)

Figure 4: A screen-shot of our web interface on the example from Figure 1.

Table 2: Accuracy results of various models, where DeepTyper includes the proposed consistency layer (Section 3) and naïve assigns each identifier the MLE distribution of types given that identifier from the training data.

| Model    | Top-k Accuracy (GOLD@1) | Top-k Accuracy (GOLD@5) |
|----------|-------------------------:|------------------------:|
| Naïve    | 37.5%                   | 78.9%                  |
| Plain RNN| 55.0%                   | 81.1%                  |
| DeepTyper| 56.9%                   | 81.1%                  |

confidence threshold. All our code for training and evaluating DeepTyper is released on https://github.com/DeepTyper/DeepTyper.

## 5 RESULTS

We present our results in three phases, as per Section 4.3. We first study how well deep learning algorithms are suited for type inference in general, and study the notion of consistency specifically. Then, we compare DeepTyper’s performance with that of the TypeScript compiler plus CheckJS, showing furthermore how the models can be complementary. Finally, we present a comparison (and combination) on plain JS functions with JSNice [28], which tackles a similar, if narrower task.

### 5.1 Deep Learning for Type Inference

We first show the overall performance of the deep learning models on the test data, including both the plain RNN and our variant, DeepTyper, which is enhanced with a consistency layer. Table 2 shows the prediction accuracy (top 1 and 5) of the true types w.r.t. the models in the 78 test projects on the GOLD dataset (Section 4.2). We include a naïve model, which assigns each identifier the type distribution that it has at training time. This model achieves an acceptable accuracy without accounting for any identifier context, giving us a notion of what portion of the task is relatively simple. Xu et al. report a similar result for Python code [34], although we stress that this is not an implementation of their model (See Section 7). DeepTyper substantially outperforms it by including contextual information and achieves a top-1 accuracy of nearly 60% and top-5 accuracy of over 80% across the GOLD dataset.

#### 5.1.1 Consistency

In Table 2, DeepTyper yields higher prediction accuracy than the plain RNN. As we stated in Section 3, we qualitatively found that the plain RNN model yielded poor consistency between its assignments of types to multiple usages of the same identifier. We quantify this concern with the inconsistency metric described in Section 4.4. By this metric, the plain RNN assigns an inconsistent type 17.3% of the time. Our consistency layer has the effect of taking into account the average type assignment for each identifier in a function and achieves a modest, but significant consistency error reduction of around 2 percentage points, to 15.4%. Importantly, it does not accomplish this by sacrificing performance (as it might by gravitating to common types), but instead slightly boosts prediction accuracy as shown above. This shows promise for further investigation into adding global information to these models (Section 6). Thus, we use the DeepTyper model in our experiments going forward.

#### 5.1.2 Performance Characteristics

A few, common types, account for most of the type annotations in the TypeScript data. We study the discrepancies between the predictability of the 10 most common types vs. the ca. 11,000 other types in Table 3. We also include prediction statistics of the any type for reference, which was by far the most common type in the training data, but was substantially less common among the real annotations shown here. Since all identifiers are implicitly typed as any unless another type is provided, recommending this type is not clearly useful. However, developers do evidently explicitly annotate some identifiers as any, so that accuracy on this task may still be useful for a type suggestion tool; this deserves further investigation.

Excluding any, the top 10 types account for most of the typed tokens. Among the most common types are the primitives string, number and boolean, as well as several object types: Array, Promise and HTMLElement. As can be seen, predicting the rarer types is substantially harder for DeepTyper, but it manages a usable top-5 accuracy nonetheless. This is especially true at locations where the model is most confident, as we discuss next.

Table 3: Accuracy on the 10 most common, and all other types, with ‘any’ included for reference

| Type         | Count  | Top-K Accuracy (top-1) | Top-K Accuracy (top-5) |
|--------------|-------:|-----------------------:|-----------------------:|
| Top 10 total | 9,946  | 71.1%                  | 95.6%                 |
| Others total | 5,158  | 29.6%                  | 53.2%                 |
| any*         | 8,452  | 66.8%                  | 97.2%                 |

*included only for reference; suggesting any is typically not helpful to developers.

#### 5.1.3 Recommendation

The deep learning algorithm emits a probability for each type assignment, which allows the use of a threshold to determine which suggestions are likely to be correct (Section 4.4). Figure 5 shows the trade-off in precision and recall when varying this threshold. Precision first exceeds 80% at a threshold of 90%, yielding a recall rate of ca. 50%. At a threshold of 99%, precision exceeds 95% at a still respectable recall rate of ca. 14.9%. At this level, DeepTyper could add more than 2,000 of the ca. 15,000 annotations we extracted across the 78 test projects with very high precision.

10 This indicates that a great many identifiers could not be typed more specifically by the compiler, or were too rare to be included in the vocabulary.