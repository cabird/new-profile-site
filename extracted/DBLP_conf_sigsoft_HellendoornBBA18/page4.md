![Architecture diagram of the neural network](page4_img_1.png)

Figure 2: Architecture of the neural network with an example input and output, where connections between the layers (at every token) are omitted for clarity. ‘num’ is short for ‘number’ and ‘-’ indicates a dummy type for non-identifier tokens (which have no type). Note how, in DeepTyper, the two occurrences of x have an additional custom connection to improve consistency in type assignment.

To a first approximation, we can use an RNN for our sequence annotation task where we represent the “type judgement” context of the token s_t with τ̂_t = h_t. Then, to predict the type vector, i.e. a probability distribution over every type τ in the type vocabulary, we use an output layer to project the hidden state onto a vector of dimension equal to the type vocabulary, followed by a softmax layer to normalize it to a valid categorical probability distribution over types. Each component of the type vector is then:

P_s_t(τ) = exp(τ̂_t^T r_τ + b_τ) / Σ_{τ'} exp(τ̂_t^T r_{τ'} + b_{τ'})   (1)

where r_τ is a representation learned for each type annotation τ, τ̂_t^T r_τ is the inner product of the two vectors and b_τ a scalar bias for each annotation. However, this approach ignores all the relevant context to the right of s_t, i.e. information in s_{t+1} ... s_N. For this reason, we use an architecture called bidirectional RNNs (biRNN), which combines two RNNs running in opposite directions, one traversing the sequence forward and the other in reverse. The representation of the context for a single token s_t becomes the concatenation of the states of the forward (left-to-right) and reverse (right-to-left) RNNs, i.e. we set τ̂_t in Equation (1) to τ̂_t = h_t^{bi} = [h_t^{→}, h_t^{←}]: the concatenation of the hidden state h_t^{→}, the forward RNN, and h_t^{←}, the reverse RNN at position t.

The network architecture we have described so far assumes that the annotations we produce for each token are independent of each other. This tends to be true in natural language but is not the case for source code: a variable may be used multiple times throughout the code, but its true type remains the same as at its declaration. If we were to ignore the interdependencies among multiple tokens, our annotations might turn out inconsistent between usages of the same variable. Although the RNN might learn to avoid such inconsistencies, in practice even long-memory RNNs such as GRUs have quite limited memory that makes it hard to capture such (Which is particularly important for this task; consider annotating x in var x = 0.)

To address this problem, we propose a consistency layer as an extension to the standard biRNN, where the context representation for the token s_t is

τ̂_t = h_t^{bi} + (1 / |V(t)|) Σ_{i ∈ V(t)} h_i^{bi}   (2)

where V(t) is the set of all locations that are bound to the same identifier as the one in location t. Specifically, we average over the token representations after the first bidirectional layer and combine these with the input to the second bidirectional layer, as shown in Figure 2. By concatenating the output vector h_t^{bi} with the average representation of all the bound tokens, we encourage the model to use long-range information from all usages of the identifier. Thus, the model learns to predict types based on both its sequentially local representation and the consensus judgement for all other locations where this identifier occurs. We could restrict the non-local part of Equation (2) to occurrences of the exact same variable only (e.g. by running a def-use analysis), but we found that it is very rare for two differently-typed, but same-named variables to occur in the same file. We chose instead to average over all identifiers with the same name, as this can provide more samples per identifier. Figure 2 shows the resulting network; we call this model DeepTyper.

### Design Decisions

Our neural network encapsulates a set of design decisions and choices which we explain here. Using the biRNN model allows us to capture a large (potentially unbounded) context around each token. Capturing a large context is crucial for predicting the type annotation of a variable, since it allows our model to learn long-range statistical dependencies (such as between a function’s type and its return statement). Additionally, including the identifiers (e.g. variable names) allows the model to incorporate probabilistic naming information to the type inference problem, a concept that has not been well explored in the literature. Also, it should be noted that viewing the input program as a sequence of tokens is a design decision that trades off the potential to use richer structural information (such as ASTs, dependency graphs) for the advantage of using well-understood models for sequence tagging whose training scales well with a large amount of data.

## 4 EVALUATION

Figure 3 gives an overview of our experimental setup. First, we collect data from online open-source projects (Section 4.2). The second step is initializing and training the deep learner (Section 3). Finally, we evaluate our approach against, and in combination with, a type inference engine, and we discuss how to use the trained algorithm for general code fragments, demonstrated through a web API. We conclude this section with an overview of the hardware used and corresponding memory use and timing information.

### 4.1 Objective

As outlined in Section 2, the goal of this work is to suggest useful type annotations from a fixed vocabulary for JavaScript (JS) and TypeScript (TS) code. Here, we define “useful type annotations” as those that developers have manually added in the TS code, and which we remove to produce our training data. In TS, there are

*6 Attention mechanisms [26] could be used to partially relieve this issue, but this extension is left to future work.*