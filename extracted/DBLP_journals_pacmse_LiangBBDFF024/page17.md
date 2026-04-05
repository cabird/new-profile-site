In the [17] analysis plan, the code identified lines that a commit changed by looking at brand new lines added in a commit rather than examining existing lines that were removed.

**Guessed implementation (7×).** We observed a lack of detail in the methodology, where GPT-4 "guessed" an implementation. For example, the first module for Fregnan et al. [22] analysis plan calls for determining "whether the file is a test", to which GPT-4 implements by checking if the term "test" exists in the file name. While this implementation is technically correct, there could be more sophisticated ways of identifying tests, such as analyzing file source code.

**Hallucinated data (5×).** We noticed a few errors due to GPT-4 hallucinating different data sources. In some cases, it would hallucinate data files that did not exist, such as a JSON file containing time zones for the fifth module in the analysis plan of Eyolfson et al. [17].

**Incorrect API usage (2×).** We also noticed errors in GPT-4 using existing APIs incorrectly based on the documentation. For the second module of the Guzman et al. [27] analysis plan, we noted that the usage of the sentistrength library was incorrect, as it relied on a parameter that returned the incorrect type of data for the analysis.

> **Key findings:** 89% of analysis plan ratings rated the plans as partially or fully correct. Participants noted the analysis plans had a *high-level structure*, but were *not descriptive*. Finally, the generated code was most successful in providing *high-level structure* and API usage examples, but often had missing methodology steps and used an incorrect data source.

## 5 DISCUSSION & FUTURE WORK

In this section, we discuss our results with respect to prior work. This generates implications for future work (Section 5.1). We then delve into takeaways of this work to various stakeholders in empirical software engineering research (Section 5.2).

### 5.1 Implications

#### 5.1.1 GPT-4: The New Software Engineering Research Assistant?  
Based on our results, we find that through pre-training alone, GPT-4 has some expertise in software engineering research to perform study replications, as many of the derived assumptions and analysis plans received high correctness scores by experts. Further, the analysis plans and code seemed generally correct in implementing the research methodology in its *high-level structure*.

Yet, GPT-4's domain expertise does not match that of a software engineering research expert. GPT-4 exhibited major gaps in its knowledge of software engineering research and data, which prevented it from performing replications autonomously. Assumptions were rated low in insightfulness since GPT-4 generated assumptions that indicate a lack of software engineering knowledge. Further, generated code often used the incorrect data source, provided guessed implementations, and hallucinated APIs to assist with the analysis of the data. These results align with prior work [23], which found that LLMs reflected some domain knowledge in technical fields like NLP, but made errors such as providing incorrect information. Our results also indicate that GPT-4 struggles to generate valid code, as only 30% of the code modules were executable.

#### 5.1.2 Undescriptive Research Methodology Reduces Code Generation Quality  
Generated code was often incorrect due to the specification being not descriptive. This was caused by a lack of detail