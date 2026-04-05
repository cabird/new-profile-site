![2D PCA projection of setters and getters](page8_img_1.png)

Figure 4: A 2D linear projection, using PCA, of the embeddings of setters and getters for netty method declarations. Matched getter/setting pairs are connected with a dotted line. The embeddings seem to separate setters from the getters.

Table 2: Examples of nearest neighbors in the continuous space for variable names in clojure. Ordered by higher inner product q_t1 q_t2 where t1 is in the first column and t2 in the second.

| Identifier | Nearest Neighbors (ordered by distance) |
|---|---|
| fieldName | className, methodName, target, method, methods |
| returnType | sb, typ, type, methodName, t |
| keyvals | items, seq, form, rest, valOrNode |
| params | paramType, ctor, methodName, args, arg |

![2D PCA projection of singular and plural names (libgdx)](page8_img_2.png)

Figure 5: A 2D linear projection, using PCA, of the embeddings of singular and plural names in libgdx. Pairs are connected with a dotted line. The embeddings mostly separate singular and plural names. We expect most of the plural variables to refer to Collections of objects whose names appear in singular.

Table 3: Closely related (sub-)tokens for libgdx variables. The top 10 pairs that have the highest q_t1 q_t2 are shown. For the subtoken model some numeral pairs (e.g., 9–8) are omitted.

| Feature Model | Subtoken |
|---|---|
| camera–cam | 6–5 |
| padBottom–padLeft | Height–Width |
| dataOut–dataIn | swig–class |
| localAnchorA–localAnchorB | Min–Max |
| bodyA–bodyB | shape–collision |
| framebuffers–buffers | Left–Right |
| worldWidth–worldHeight | camera–cam |
| padRight–padLeft | TOUCH–KEY |
| jarg7–jarg6_ | end–start |
| spriteBatch–batch | loc–location |

However, this analysis provides visual insight, gained from looking at the embedding vectors. Thus, we complement this qualitative analysis with a more quantitative one, in the next section.

## 5. EVALUATION

In this section, we quantitatively evaluate the performance of the neural model on the data set (Table 1) answering all the RQs.

Variable Naming Renaming variables and method invocations has been previously shown [2] to achieve good performance using n-gram LMs. Figure 6 shows the performance of the baseline n-gram model along with the performance of the other neural models for variable names. For low frequency of suggestions (high-confidence decisions), the neural models overperform the n-gram-based suggestions. This is expected since such models perform better than plain n-gram models in NLP [39]. Additionally, the features give a substantial performance increase over the models that lack features.

The subtoken model performs worse compared to the token-level model for suggestion frequencies higher than 6%. This is to be expected, since the subtoken model has to make a sequence of increasingly uncertain decisions, predicting each subtoken sequentially, increasing the possibility of making a mistake at some point. For suggestion frequencies lower than 6% the performance of the subtoken model is slightly better compared to the token-level model, thanks to its ability to generate novel identifiers. Thus, we positively answer RQ1 and RQ2.

We computed Table 4 over only three classes because of the cost of retraining the model one feature at a time. Looking at Table 4 for variable names one may see how each feature affects the performance of the models over the baseline neural model with no features at rank k = 5^2. First, we observe that the features

2 We chose five because subitizing, the ability to count at a glance,

help mostly at high suggestion frequencies. This is due to the fact that for high-confidence (low suggestion frequency) decisions the models are already good at predicting those names. Additionally, combining all the features yields a performance increase, suggesting that for variable names, only the combination of the features gives sufficiently better information about variable naming.

### Method Declaration Naming Accuracy

We now attempt to use the neural model for suggesting method names, using only features available during the declaration of a method. Surprisingly, the neural model is exceptionally good at predicting method declaration names. Figure 7a shows the performance of the models on all method declarations excluding any method declarations that are method overrides. We exclude overrides so as to avoid giving the models credit for predicting easy names like toString. When we include overrides, the performance of all models improves. To exclude method overrides, we remove methods that contain the @Override annotation as well as those methods that we can statically determine as method overrides.

The graphs in Figures 7a show that the neural models are substantially better at suggesting method names, compared to the n-gram language model. Adding features increases the performance of the models, indicating that the model is able to use non-local context to make better predictions. Naturally, the performance degrades; the model handles 5 objects and, because short-term memory is usually 7 ± 2, this is the size of human short-term memory.