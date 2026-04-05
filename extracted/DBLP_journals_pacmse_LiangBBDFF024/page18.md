### 5.1.3 Design Implications for GPT-4-Powered Tools in Software Research

In the original paper, which left certain methodological details (e.g., the procedure used to identify tests on pull requests) ambiguous. One way GPT-4’s generated code could be improved is if the paper methodology itself were written in a more detailed and systematic way by the human authors.

Our exploration in replicating empirical software engineering papers with GPT-4 sheds light on one factor of the replication crisis in empirical studies in computer science [14]—the lack of detail in the methodologies. A majority of participants noted that these sections were not descriptive enough for individuals unfamiliar with software engineering research, such as software engineers:

> “[If] I hand [the methodology] off to a [software engineering] intern... and be like ‘Hey write this [in code]!’, I would have wanted to be a little bit more explicit.” (P13)

Our findings also produce design implications on how to apply GPT-4 in tools for software engineering research. Overall, humans still have a vital role in GPT-4–aided replications of software engineering research papers. GPT-4 could be useful to brainstorm assumptions or provide starting points for replication code pipelines. However, humans should provide oversight to GPT-4 to validate its outputs.

**Rely on GPT-4 to scaffold analysis code pipelines.** Given that GPT-4 produces correct high-level structure of the analysis plan and code, GPT-4 could assist with writing analysis pipelines for replication. However, given GPT-4’s tendency to propagate errors, such as hallucinating data and hallucinating APIs, they currently are better suited for scaffolding out analyses in code rather than writing full implementations autonomously. Tools could provide gaps for users to write implementations for the parts of the generated code the model has low confidence on. Verifying code is the most time-consuming activity for users of code generation tools [49]; thus, developers could be more productive by filling in their own implementations.

**Rely on GPT-4 to brainstorm assumptions.** GPT-4 could help brainstorm assumptions, as the generated assumptions were often comprehensive and correct. However, these assumptions could lack relevance, making them less useful. This could be addressed by explaining how to work around assumptions, as suggested by a majority of our participants.

**Rely on humans to validate and correct GPT-4 output.** Since GPT-4 is prone to error in generating assumptions and code analysis pipelines, human oversight is necessary at all stages to validate the correctness of GPT-4 output for software engineering research. This is especially important for code generation, as only 30% of the code was executable and contained many errors.

**Build trust between GPT-4 and users.** Given the vital role of humans to validate GPT-4 outputs, it is important for GPT-4–powered tools to build trust with users for AI-generated analyses [24]. One way is by tying each assumption, analysis plan, and line of code to methodology text, as participants wanted GPT-4 to provide sources for more confidence in the outputs.

## 5.2 Takeaways

Below, we describe takeaways of our research to software engineering researchers and practitioners.

### 5.2.1 Software Engineering Researchers

To overcome the limitations of using GPT-4 in software engineering research, future work is needed to investigate techniques to improve GPT-4’s performance in this domain, such as methods for teaching LLMs like GPT-4 software engineering expertise. Theories of developer expertise has noted the importance of domain expertise [6, 45] in software development. While GPT-4 demonstrated some knowledge of software engineering, it was unable to apply software engineering domain expertise in the generated code (e.g., what database table to query). Domain expertise could be taught by exposing LLMs to software engineering knowledge