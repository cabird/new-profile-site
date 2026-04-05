through traceability tools [17, 22], enabling more effective knowledge transfer and oversight. As AI agents contribute to increasingly large portions of the system, these dynamic links will become even more vital for transferring knowledge back to human collaborators and ensuring accountability of the agent’s outcomes. Additionally, these links can create benefits beyond AI–human interactions, providing valuable insights for other tasks, such as developer onboarding or safety assessments [5].

### Building: Process Analysis & Evolution (L)
The original version also incorporated knowledge in the form of past examples, which can illuminate hidden patterns underlying expert intuitions [19]. Yet, this data was underutilized in the initial implementation. Examples were either provided to the agent in small subsets where broader generalizations were impossible, or used as training data for black-box models that could not reveal the learned patterns (Challenge 1). Another overlooked source of knowledge lies in agent traces, which contain a wealth of information, including reasoning processes, steps taken, tools invoked, data sources consulted, and points of human intervention. When analyzed effectively, this information can reveal which aspects of the software process succeed or fail, enabling refinements that better balance efficiency with exploration (Challenge 4). By systematically surfacing patterns in these process artifacts, expert knowledge can be made explicit for both humans and agents (Challenge 5).

To this end, statistical analysis has already demonstrated promise in uncovering meaningful patterns in reasoning trajectories linked to success or failure [4], as well as causal relationships between agent behaviors [13]. Building on this, additional approaches can quantify the contribution of specific data sources to information gain, enabling more efficient input prioritization while reducing context demands [15]. They can also track the frequency of steps or tool calls to identify candidates for predefined workflows, which has the potential to improve performance and efficiency [27]. Finally, they can capture recurring input from humans at runtime, allowing these inputs to be reused without requiring repeated human intervention.

To address hypothesis anchoring (Challenge 6), we propose using Analysis of Competing Hypotheses (ACH) [6] through a multi-agent architecture. When a software process begins, the system launches multiple agents, each advocating for a different hypothesis; in differential testing, for example, one agent would represent each possible classification for a diff (regression, new feature, and noise). Each agent independently gathers evidence to support its assigned hypothesis, ensuring all explanations receive thorough consideration. The agents then present their evidence to either human engineers or an LLM judge for final evaluation. This approach reduces bias by separating hypothesis generation from evidence gathering and improves transparency by allowing side-by-side comparison of competing explanations. The system also generates valuable training data by tracking which hypotheses prove correct over time, helping optimize future investigations.

Crucially, these insights extend beyond improving agent processes. Inspired by prior work showing that experts can learn from AI knowledge [20], we view this as a mechanism for refining human understanding and decision-making. By accumulating and analyzing process patterns, engineers gain a deeper understanding of how tasks are executed, enabling them to refine, optimize, and ultimately improve their own workflows. In this way, process knowledge flows both ways, helping humans and agents alike increase their chances of success.

## 4 Future Plans
Our immediate roadmap focuses on implementing and evaluating the key components of our unified knowledge network vision, as follows:

### 1. Knowledge Network Storage and Management
- Implement storage mechanisms (e.g., graph databases) to capture and maintain the artifact relationships identified through agent interaction and human feedback.
- Support dynamic adjustment of relationship strengths based on task outcomes, and enable pruning of outdated connections flagged by agents during task execution.
- Introduce relationship typing to distinguish between structural dependencies, semantic similarities, and task-related associations.

**Key Challenges:** Scalability of data storage and retrieval; accuracy of agents’ evaluation of what information was important to the task; maintaining network quality as relationships multiply.

### 2. Process Pattern Analysis
- Compare statistical approaches for identifying patterns in agent reasoning trajectories, tool usage, and decision points linked to task success or failure.
- Create systems to track frequency and effectiveness of investigative steps, identifying candidates for predefined workflows and comparing performance with full-autonomy approaches.
- Evaluate different methods for incorporating learned patterns into process improvements, including reinforcement learning and prompt engineering techniques.
- Implement a multi-agent architecture and evaluate its effectiveness in reducing hypothesis anchoring compared to single-agent approaches.

**Key Challenges:** Ensuring patterns remain generalizable and interpretable across contexts; ensuring interpretability and usefulness of discovered patterns to human engineers.

### 3. Validation & Refinement
- Apply the approach to different software processes beyond differential testing, such as change impact analysis or developer task prioritization, to evaluate generalizability and cross-context effectiveness.
- Conduct user studies to examine perceived usefulness of the approach for human–AI interactions and identify opportunities to improve user experience.
- Compare performance of the agent-based approach with fine-tuned models and other baseline methods across multiple evaluation metrics.

**Key Challenges:** Designing metrics that capture both task performance and knowledge utility; adapting methods to varied software processes without losing effectiveness or overfitting to specific workflows.

## 5 Conclusion
Software processes rely on both structured system knowledge and tacit human knowledge, yet these sources often remain disconnected, limiting the transfer of insights across tasks and individuals. Our example in differential testing illustrated both the potential