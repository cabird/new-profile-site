used a balanced set of data between the three labels to predict labels. By integrating this feature into the tool, we address one of the most time-consuming and cognitively demanding aspects of the Diff analysis workflow, streamlining the process for OCEs and enabling them to focus on higher-priority tasks.

The LLM-based Diff labeler is integrated into the redesigned DiffViewer’s UI, where predictions are displayed alongside confidence scores and supporting metadata to enhance transparency and usability. The tool makes it easy for OCEs to confirm predictions with a single click on a checkmark next to the suggested label, automatically labeling the Diff. This combination of high accuracy, reliability, and user-friendly design significantly reduces manual effort and ensures consistent labeling, transforming the diff analysis workflow into a more efficient and intuitive process.

Within the tool, Diff label prediction integrates with the grouping feature in Section 2.7, allowing OCEs to sort and organize Diffs by predicted labels. This enables quick identification of critical regressions while de-prioritizing noise, streamlining the workflow and focusing attention on high-impact issues. In the UI, predictions are displayed with a checkmark next to them, allowing OCEs to easily confirm a prediction with a single click, automatically labeling the diff and further reducing manual effort. This integration motivates the tool’s philosophy of combining intelligent automation with user-centric design, significantly reducing cognitive load during on-call sessions.

By incorporating LLM-based Diff label prediction into the broader DiffViewer framework, the tool transforms the Diff analysis workflow from a manual process into a proactive and guided experience.

## 2.5 Automation of Information Analysis and Summarization

This feature streamlines differential testing by automating the extraction and summarization of log information OCEs use to label Diffs. During interviews, we observed OCEs following heuristic patterns: identifying the Diff Category label, locating this label in the differential view, and analyzing log differences to make decisions. To simplify this, we automated these steps by programmatically identifying labels in the Diff Category and extracting the key differences from the logs. This reduces the need for manual searching and comparison, significantly lowering developers’ cognitive load and saving time.

Building on this automation, we enhance the workflow by using the extracted log differences and category labels as context for our fine-tuned LLM described in Section 2.4. The LLM generates a high-context summary of the Diff, providing OCEs with both the extracted differences and an intelligent summary of key distinctions. This eliminates the need for OCEs to manually interpret the logs, enabling them to review the summary and make informed decisions. By combining automation with an explanation of the predicted label, we enhance explainability and allow OCEs to confidently confirm the labeling of each diff. This approach exemplifies proactive AI by automating redundant, time-consuming tasks and empowering developers to focus on higher-level decision-making, moving beyond traditional chat-based AI usage and creating a more efficient, developer-friendly workflow.

## 2.6 Comment Summarization and Generation

This feature streamlines Diff labeling by generating concise summaries of prior comments and creating new ones using a fine-tuned LLM. OCEs in on-call sessions often reference existing comments for context; however, reviewing dozens of comments can be time-consuming. The LLM processes Diff logs and associated comments to produce summaries, prioritizing recent and relevant insights. A toggle switch allows developers to view either the raw comments or the summary, depending on their needs. For Diffs without prior comments, the LLM generates new, context-aware suggestions based on patterns from historical data, providing more information for Diffs without comments.

## 2.7 Clustering Options for Similar Diffs

This section discusses how we introduced a novel application of the K-means clustering algorithm to organize and work with Diffs in the context of differential testing. Leveraging insights from our developer interviews, we designed a system that allows developers to cluster and sort Diffs dynamically, enabling them to work more efficiently based on their preferences and priorities. Below, we outline the clustering methodology, UI design considerations, and prioritization strategies.

### 2.7.1 Clustering Methodology

Through our interviews, we identified two key attributes of diffs that naturally lend themselves to clustering: Diff Categories and Predicted Labels. By default, Diffs are grouped into six groups based on the six distinct, pre-existing Diff Categories. Similarly, Diffs can also be grouped into three groups based on the three possible predicted labels.

For more granular control, we allow clustering based on the description of the Diff. In this case, we generate embeddings for the Diff descriptions using OpenAI embeddings and perform k-means clustering. OCEs can specify the number of clusters for description-based clustering, ranging from 3 to 10 clusters, giving them the flexibility to adapt the organization of their diffs to their needs.

This combination of fixed clusters for categories and labels, along with dynamic clusters based on description embeddings, provides a robust and flexible clustering framework. To ensure real-time performance, we cache the embeddings for the Diff descriptions within the data of each Diff, enabling quick computations even with up to 100 Diffs in a session, as observed from our interviews and testing.

### 2.7.2 Dynamic UI Design for Clustering

The UI incorporates clear cluster separators that visually distinguish clusters with a dividing line. Each cluster separator includes a concise 5–7 word summary of the cluster, recalculated dynamically whenever a new clustering request is made. This summary provides OCEs with an overview of the cluster contents, helping them quickly identify the type of diffs grouped together.

The UI also allows developers to toggle between grouping or clustering by categories, labels, or descriptions, giving them control over how they organize their Diffs. For description-based clustering, developers can dynamically adjust the number of clusters in real time, further enhancing flexibility and usability.

### 2.7.3 Prioritization Within Clusters

To account for the importance of diffs, we implemented a prioritization mechanism based on the