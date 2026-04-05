challenges? We identified 19 emerging solutions related to quality assurance, which is the focus of this paper, and seven more regarding development and prompting, reported in the appendix1. Given the broad portfolio of products and large community of software practitioners at Microsoft, this paper offers a unique perspective on a variety of experiences and approaches encountered while building LLM-based products. We believe these insights can contribute real-world insights that can inform the development and evaluation of LLM-based products more broadly.

In this paper, we make the following contributions:
- Confirmation and Expansion of Disruptions: We provide a comprehensive investigation of the disruptions practitioners face when integrating LLMs into software products, confirming existing literature on LLM-related challenges while uncovering new, underexplored disruptions that developers encounter.
- Identification of Emerging Solutions: We present 19 emerging solutions that developers are adopting to address these disruptions, offering concrete insights into how these solutions are enabling engineering teams to accommodate LLM-specific issues.
- Validation Through a Mixed-Methods Approach: Beyond the exploratory interviews, we conducted a large-scale survey to quantify the prevalence and effectiveness of the identified disruptions and solutions. This mixed-methods approach strengthens our findings by combining qualitative insights from interviews with quantitative validation from survey data, increasing the generalizability and impact of our results.

## II. Challenges and Solutions for Building LLM-Enabled Products (Related Work)

### A. LLM-based Products
In recent years, machine learning generally and LLMs specifically have attracted widespread attention, enabling developers to build products around these models [11], [14], [27]. With pre-trained LLMs from vendors like OpenAI or Meta, typically accessed via APIs but possibly also deploying “open” models locally, developers can customize LLMs for specific tasks by developing dedicated prompts. The integration of LLMs can be simple as prompt engineering lends itself to rapid prototyping [28]–[30], but can also use sophisticated, multi-step pipelines and integrations with information retrieval systems [31]–[33]. In this paper, we refer to products incorporating these features as LLM-based products.

### B. Known Challenges in Building LLM-Enabled Products
After researchers have extensively studied challenges in developing machine-learning solutions and integrating them into software products, see a recent survey [12], more recently, researchers have also explored challenges specifically for integrating LLMs into software products by engaging with industry practitioners and freelancers, e.g. [10], [11], [13], [14].

1 The appendix will be attached to the paper once it is published.

[14]. Focusing on quality assurance problems, we summarize the key challenges identified in these studies in Table I. As part of our own interviews and survey in this research, we found largely the same challenges, which both replicates and confirms prior work and additionally provides confidence that our study of solutions is conducted in an environment that faces the same challenges as the larger community.

### C. Proposed and Emerging Solutions
There is a vast number of proposed solutions – tools, techniques, and practices – suggested by researchers and practitioners. These might be suggested in academic papers (e.g., user interfaces to surface ethical concerns during prompt development [34]), popular blog posts (e.g., suggesting testing strategies for LLMs grounded in property-based testing [35]), and startups promoting their services (e.g., tooling to validate LLM outputs [36]). Many of these solutions are presented under the label LLMOps.

Given the vast number of solutions suggested through academic papers across many venues, all kinds of open-source projects and proprietary tools and services, many of which may have received little evaluation or adoption, we do not attempt a comprehensive survey of proposed solutions but refer the interested reader to lists of LLMOps tools [15], [16] and recent surveys of research on prompt engineering [37]–[39] and various examples of research automatically or interactively optimizing prompts [40]–[42] and evaluating prompts [17], [19], [28], [43]–[45]. Instead of a comprehensive survey, our research focuses on identifying emerging solutions that are increasingly adopted and sometimes shared as best practices within Microsoft.

## III. Research Design
We employed the established sequential exploratory mixed-methods research design [26] that performs research in two phases: In a first qualitative phase we explore challenges and emerging solutions through interviews. Then, in a subsequent second phase, we quantify the observed challenges and emerging solutions through a survey with a much larger sample size. This enables an in-depth open-ended exploration of emerging themes beyond a predefined list but also allows us to provide quantitative insights about the prevalence of these emerging solutions in the studied teams at Microsoft.

### A. Interviews
In the first research phase, we created an interview guide to broadly explore the current state, challenges, and emerging solutions across the entire lifecycle of LLM-enabled products and features. After feedback from experts and a pilot test, we refined the guide, emphasizing the evaluation phase and adding relevant questions to thoroughly explore this topic.

To recruit a varied and representative group of interviewees aligned with our research goals, we used purposive sampling [52], explicitly recruiting interviewees from different teams from different departments within Microsoft that had integrated LLM components into their products for various use cases.