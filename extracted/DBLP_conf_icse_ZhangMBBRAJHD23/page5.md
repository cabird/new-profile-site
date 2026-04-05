in the literature is to weigh the edges using a symmetric-normalization approach. Here we normalize the edge weight by the degrees of both the nodes connected by the edge. The aggregated feature values are then transformed and fed to the next layer. This procedure is repeated for every node in the graph. Mathematically it can be represented as follows:

h_u^{(k)} = σ( ∑_{v ∈ N(u) ∪ {u}} W^{(k−1)} h_v^{(k−1)} / √{|N(u)||N(v)|} )  (3)

where h_u^{(k)} is the embedding of node u in the k-th layer; h^{(0)} is the initial set of node features, which can be set to one-hot vectors if no other features are available; N(u) is the set of neighbors of node u; W^{(k)} is the feature transformation weights for the k-th step (learned via training), σ is the activation function (such as ReLU [31]). Note that symmetric-normalization is achieved by dividing by √{|N(u)||N(v)|}. GCN learns node embeddings from a homogeneous graph

h_u^{(k)} = σ( ∑_{r ∈ R} ∑_{v ∈ N_r(u)} W_r^{(k−1)} h_v^{(k−1)} / √{|N_r(u)||N_r(v)|} + W_0^{(k−1)} h_u^{(k−1)} )  (4)

where R is the set of relations, N_r(u) is the set of neighbors of u having relation r, W_r^{(k)} is the relation-specific feature transformation weights for the k-th layer; W_0^{(k)} is the feature transformation weights for the self node.

The set of relations R captures the semantic relatedness of different types of nodes in the graph. This is generally determined by the domain knowledge. For CORAL we identified a bunch of useful relations as listed in Table II.

In our experiments, we use a 2-layer GCN network, i.e., we set k = 2 in Equation 4. With this, GCN can capture second order relations such as User-User, File-File, User-File, User-Word, etc., which we believe are useful in capturing interesting dependencies between various entities, such as related files, related users, files authored/modified by users, words associated with users, etc. While setting k to a higher value can fold-in longer distance relations, it is not clear if that helps or brings more noise. We leave that exploration to our future work.

## B. Training the Model

To learn the parameters of the model (i.e., W_r^{(·)} and W_0^{(·)}) we pose it as a Link Prediction problem. Here, we set the probability of existence of a link/edge between two nodes u and v as proportional to the dot product between their embeddings derived from the 2-layer GCN. In particular, we set the link probability as equal to σ(z_u^T z_v). Here, σ denotes the logistic function, and z_u, z_v denote the embeddings of nodes u, v respectively (i.e., z_u = h_u^{(2)}, z_v = h_v^{(2)} from Equation 4). This probability is high when the nodes u and v are connected in the graph. And, it is low when the nodes u and v are not connected in the graph. Accordingly, we prepare a training data set D containing records of triplets (u, v, y), where (u, v) are the edges in the graph and y ∈ {0,1} denotes the presence or absence of an edge between u and v. Since there can be very large number of node pairs (u, v) where u and v are not connected, we employ random sampling to select a sizable number of such pairs. The training objective is to minimize the cross-entropy loss L in the Equation 5.

L = − 1/|D| ∑_{(u,v,y) ∈ D} [ y log σ(z_u^T z_v) + (1 − y) log (1 − σ(z_u^T z_v)) ]  (5)

Minimizing the above loss enforces the dot product of the embeddings of the nodes u, v to attain high value when they are connected by an edge in the graph (i.e., when y = 1), and a low dot product value when they are not connected in the graph (i.e., when y = 0). The parameters of the model are updated as the training progresses to minimize the above loss. We stop training when the loss function stops decreasing (or the decrease becomes negligible).

## C. Inductive Recommendation for New Pull Requests

GCN by design is a transductive model. That is, it can generate embeddings only for the nodes that are present in the graph during the training. It cannot generate embeddings for the new nodes without adding those nodes to the graph and retraining. On the other hand, inductive models can infer embeddings for the new nodes that were unseen during the training by applying the learned model to the new nodes. Since CORAL is a GCN-based model, we will not have embedding for the new pull request u' at the inference time. We need to derive the embedding for u' on-the-fly by applying Equation 4. The challenge in deriving the embedding is in getting the correct self embedding for u'. That is, as per Equation 4, to generate h_{u'}^{(2)}, we need trained W_0^{(0)} and W_r^{(1)} (or the trained W^{(0)} and W^{(1)}), which are not available for the new nodes. Hence we approximate the embedding of the new node by ignoring its self embedding part in Equation 4, which leads to the following approximation:

z_{u'} = h_{u'}^{(2)} = σ( ∑_{r ∈ R_{u'}} ∑_{v ∈ N_r(u')} W_r^{(1)} h_v^{(1)} / √{|N_r(u')||N_r(v)|} )  (6)

Here, z_{u'} is the embedding of the new pull request u', R_{u'} is the set of relations involving the pull request node (i.e., PullRequest-User, PullRequest-File, and PullRequest-Word), W_r^{(1)} are the trained model weights from the 2nd layer of the GCN, and h_v^{(1)} are the embeddings coming out of the first layer of the GCN.