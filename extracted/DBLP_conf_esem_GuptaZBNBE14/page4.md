![Decision tree of energy consumption](page4_img_1.png)

72.8 mW 202.0 mW

Figure 4. Example of a decision tree learned from energy consumption data. On the first level the spikes are split based on the presence of module Mills.dll—spikes that contain Mills.dll consume on average six times the power than spikes that do not contain the module.

In Figure 4, the tree describes 843 spikes within a trace. The average energy consumption for all spikes is 112.1 mW as indicated in the root node (1) of the tree. On the first level the spikes are split based on the presence of module Mills.dll: for the 814 spikes that do not contain Mills.dll, the average energy consumption is 92.5 mW (2); however, for the 29 spikes that contain Mills.dll the average increases by six times to 664.6 mW (3). On the second level, the absence of Leveson.dll increases energy consumption by a factor of four (compare nodes (4) and (5)), and on the third level the presence of Hamming.dll increases energy consumption by a factor of three (nodes (6) and (7)).

We informally validated the decision trees for several traces with Windows Phone engineers. They confirmed the correctness of the results based on their previous experience, i.e., the modules identified by decision trees as power-consuming were indeed power-consuming.

A limitation of our current data (not the approach) is that we only have information about the presence of modules (0 or 1), but not the actual usage (numerical). Decision trees do support numerical input data and we are currently exploring other lightweight tracing techniques for collecting more fine-grained data without altering power usage. We have also experimented with linear regression to estimate power consumption; preliminary results are summarized in a technical report [7].

## 6. WHAT ARE THE CHARACTERISTIC ENERGY SHAPE PATTERNS?

Power traces consist of hundreds, often thousands of spikes, which all can have very similar shapes. By clustering spikes based on their shapes, we can identify characteristic shape patterns and reduce the number of spikes that need to be investigated by developers for a power trace. Rather than looking at all spikes, developers instead can focus on a small number of clusters (typically 10–20), each corresponding to a characteristic shape pattern with a list of associated spikes. Developers can also roll up the meta-information for each spike (such as length, modules, etc.) to the cluster level.

Developers can choose different input data for clustering. They can cluster all spikes in a power trace or only subsets, for example all spikes related to a module.

![11 spike waveforms for Sommerville.dll](page4_img_2.png)

Figure 5. Example with 11 spikes for module Sommerville.dll.

Figure 5 shows a small example with 11 spikes for module Sommerville.dll. While the human eye can easily spot two clusters, detecting the clusters in an automated fashion is slightly more complicated. For automatic clustering of elements, one typically uses a distance function (to compare spikes) and a clustering algorithm (to group spikes):

![Dendrogram with spike thumbnails](page4_img_3.png)

Figure 6. Dendrogram of the hierarchical clustering of the 11 spikes for module Sommerville.dll. Initially each spike is assigned to its own cluster and then iteratively at each stage the two most similar clusters are joined.

### 6.1 Distance function

To compute the distance between two spikes, we use the Kullback-Leibler divergence [9]. To reduce the computational cost of comparing spikes, we divide each spike into 100 buckets, calculate the average energy consumption for each bucket, and compute Kullback-Leibler across these 100 buckets for each pair of spikes. The result of this step is a distance matrix D, where a cell value dxy corresponds to the distance between spike x and y.

### 6.2 Clustering

For clustering spikes we use the Ward hierarchical clustering method [10]. Initially, each spike is assigned to its own cluster; for