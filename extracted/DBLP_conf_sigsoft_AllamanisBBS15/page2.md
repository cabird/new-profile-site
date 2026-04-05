```java
private void createDefaultShader() {
  String vertexShader = "literal_1";
  String fragmentShader = "literal_2";
  shader = new ShaderProgram(vertexShader,
                             fragmentShader);
  if (shader.isCompiled() == false)
    throw new IllegalArgumentException(
      "literal_3" + shader.getLog());
}
```

![Code snippet from libgdx CameraGroupStrategy](page2_img_1.png)

Figure 1: A method from libgdx’s CameraGroupStrategy. A programmer named it; automatically naming it requires inventing a neologism, a very hard inference problem. Our subtoken model understands that its name should start with create and suggests createShaders.

It can better exploit the structure of code, taking into account long-range dependencies and modeling the context surrounding their definitions more precisely than at the token-level, while minimizing the effects of data sparsity.

This paper tackles the method naming problem with a novel, neural log-bilinear context model for code, inspired by neural probabilistic language models for natural language, which have seen many recent successes [37, 28, 35, 31]. A particularly impressive success of these models has been that they assign words to continuous vectors that support analogical reasoning. For example, vector('king') - vector('man') + vector('woman') results in a vector close to vector('queen') [35, 36]. Although many of the basic ideas have a long history [10], this class of model is receiving increasing recent interest because of increased computational power from GPUs and because of more efficient learning algorithms such as noise contrastive estimation [21, 39].

Intuitively, our model assigns to every identifier name used in a project a continuous vector in a high dimensional space, in such a way that identifiers with similar vectors, or "embeddings", tend to appear in similar contexts. Then, to name a method (or a class), we select the name that is most similar in this embedding space to those in the function body. In this way, our model realizes Firth’s famous dictum, "You shall know a word by the company it keeps." This slogan encapsulates the distributional hypothesis, that semantically similar words tend to co-occur with the same other words. Two words are distributionally similar if they have similar distributions over surrounding words. For example, even if the words "hot" and "cold" never appear in the same sentence, they will be distributionally similar if they both often co-occur with words like "weather" and "tea". The distributional hypothesis is a cornerstone of much work in computational linguistics, but we are unaware of previous work that explores whether this hypothesis holds in source code. Earlier work on the naturalness of code [25] found that code tends to repeat constructs and exploited this repetition for prediction, but did not consider the semantics of tokens. In contrast, the distributional hypothesis states that you shall recognize semantically similar tokens because they tend also to be distributionally similar.

Indeed, we qualitatively show in Section 4 that our context model produces embeddings that demonstrate implicit semantic knowledge about the similarity of identifiers. For instance, it successfully distinguishes getters and setters, assigns function names with similar functionality (like grow and resize) to similar locations, and discovers matching components of names, which we call subtokens, like min and max, and height and width.

Furthermore, to allow us to suggest neologisms, we introduce a new subtoken context model that exploits the internal structure of identifier names. In this model, we predict names by breaking them into parts, which we call subtokens, such as get, create, and Height, and then predicting names one subtoken at a time. The subtoken model automatically infers conventions about the internal structure of variable names, such as "an interface starts with an I", or "an abstract class starts with Abstract". Our subtoken model also learns conventions like prefixing names of boolean methods with is or has. This model also allows us to propose neologisms, by proposing sequences of subtokens that have not been seen before. Consider Figure 1; our subtoken model builds and explores an embedding space that allows it to suggest createShaders, which is usefully close to the name a programmer actually chose.

Our contributions follow:
- We introduce a log-bilinear neural network to model code contexts that, unlike standard language models in NLP, integrates information from preceding, succeeding, and non-local tokens.
- We are the first to apply a neural context model to the method naming problem; and
- We demonstrate that our models can accurately suggest names: for the simpler variable naming problem, they improve on the state of the art, and for class and method naming, our best model achieves F1 scores of 60% on method names and 55% on class names, when required to predict names for 20% of method and class declarations. Additionally, our subtoken model, that can suggest previously unseen names, achieves an F1 of 50% when required to suggest names for 50% of the classes.

### Example Suggestions

To illustrate our model’s capabilities, we present a few examples of names suggested by the model (for quantitative results, see Section 5). When evaluated on libgdx, a graphics library for Android, and asked to suggest a name for the variable that programmers had named isLooping, although its confidence was low, our model has learned that the name should start with is. For multipart method names like getPersistentManifoldPool, it understood get was a likely prefix, suggesting it with 38% confidence and that Manifold was important, assigning its inclusion a probability of 28%, and even included getManifoldPool among its top five suggestions. On shorter agglutinations, like setPad, it performed better: all five top-ranked suggestions started with set, four of its suggestions included the root Pad, and it ranked setPad, the actual name, third. Its handling of class names was similar. It learned that the name of an exception class should end with Exception and inferred that the names of Action and Test subclasses should end in Action and Test. A particularly interesting suggestion our model made that caught our eye was AndroidAudio for the class AndroidMusic.

### Use Cases

Our suggestion model can be embedded within a variety of tools to support code development and code review. During development, suppose that the developer is adding a method or a class to an existing project. After writing the body, the developer may be unsure if the name she chose is descriptive and conventional within the project. Our model suggests alternative names from patterns it learned from other methods in the project. During code review, our model can highlight those names to which our model assigns a low score. In either case, the system has two phases: a training phase, which takes as input a training set of source files (e.g., the current revision of the project) and returns a neural network model that can suggest names; and a testing or deployment phase, in which the input is a trained neural network and the source code of a method or class, and the output is a ranked list of suggested names. Any suggestion system has the potential to suffer from what we have called the "Clippy effect" [2], in which too many low quality suggestions alienate the user. To prevent this, our suggestion model also returns a numeric score that reflects its degree of confidence in its suggestion; practical tools would only make a suggestion to the user if the confidence were sufficiently high.

## 2. NEURAL CONTEXT MODELS OF CODE

In this section, we introduce four language models of code, starting with the n-gram model to build intuition. Then we introduce