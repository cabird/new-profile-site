the solution, (b) “tried and found it somewhat useful,” and (c) “tried but did not find it useful,” we compute the percentages of respondents who adopted as a + b + c, who was satisfied as a + b, and who did not find the solution useful as c.

## Disruption A: Evaluation metrics change substantially (C1, C2, C3, C4, C6)

Whereas metrics for test-suite quality for traditional code (e.g., coverage) and metrics to evaluate qualities (e.g., response time, error rate) are fairly standardized and often automated, product teams at Microsoft often need to create custom metrics when evaluating LLM features and face substantial manual effort. For example, subjective qualities such as fluency, saliency, consistency, and creativity are considered crucial for generating text-based suggestions in some product use cases (P1, P3, P5). There is usually no clear oracle (not even the labels of traditional ML model testing), but many outputs may be equally correct or acceptable for a given input. Many more subjective measures are open to interpretation and teams routinely rely heavily on manual human judgement, making the process time-consuming and laborious (∼76.6% adoption; survey respondents mentioned spending manual effort). Also, even with human evaluators, ensuring objectivity and reliability can be difficult, and may introduce inconsistencies and biases [47].

Overall, developers often need to creatively explore new metrics rather than relying on established ones — for example P4 mentioned, “I just created this. It’s called the [-] metric, which looks at like 10 dimensions. You can score across each dimension and then a final score.” Interviewees find metric creation challenging, as P25 pointed out, “it’s really a social science problem more than a science problem.” The process of defining custom metrics lacks a systematic foundation, and teams frequently encounter difficulty in defining the right metric for their specific use case, as P7 rightfully mentioned: “it’s just frustrating to come up with some scoring criteria.”

## Emerging solution 1: Defining custom metrics through iterative collaboration and expert consultations (57% adopted, 55% satisfied, 2% did not find useful)

Product teams have started to use initial brainstorming sessions aimed at figuring out the various dimensions of quality related to their specific LLM use cases (P1, P4, P15, P16, P17, P22, P25, P26). Instead of approaching this as a typical engineering task, they treat it more as a research phase. Many teams engage with domain experts (e.g., linguists, P1) and researchers (P15, P16, P17) to explore specific use cases and identify metrics for their desired response qualities. P16 also mentioned involving LLMs as a judge to evaluate the appropriateness of such metrics, and human judgement to validate it further: “Like asking the LLM as a judge metric to evaluate how good those types of [metrics] are. [...] We have a data scientist who works on this. There’s quite a bit of iteration, and then also we worked with [the] PM and the feature crew to explain what we’ve done and then ask for feedback as well to iterate on.” Teams also mentioned iterating over it multiple times to confirm they have the right metrics, such as:

> “You have to run through this couple of times to make sure you have the right set of metrics” (P1).

## Emerging solution 2: Combining qualitative and quantitative metrics to evaluate the multifaceted outputs effectively (54.4% adopted, 53.7% satisfied, 0.7% did not find useful)

Most interviewed teams (P2, P4, P8, P9, P15, P16, P17, P18, P22, P26) have started combining subjective metrics (e.g., fluency) with “objective,” more mechanical, more easily quantifiable metrics (e.g., evaluating the syntax of a generated formula) to make evaluation more comprehensive. For example, with reference to evaluating LLM-generated conclusion slides, an engineering manager mentioned:

> “We do both structured objective metrics and subjective metrics about how good is this slide,”

where quantitative criteria like bullet point count and sentence length are assessed alongside qualitative elements such as content-groundedness. This hybrid approach is echoed by other teams:

> “We kind of have a merge of two things. One is still this correctness [...] You could find different ways to sum the two columns, but there’s generally a functionally correct answer. [...] There’s on the other side [...] We don’t have a spec [...] So in these cases it’s more subjective to even measure the quality on the output”.

## Emerging solutions 3 & 4: Evaluating subjective metrics using LLM validators (50.6% adopted, 47.3% satisfied, 3.3% did not find useful). Establishing clear rubrics and scoring mechanisms (33.8% adopted, 33.1% satisfied, 0.7% did not find useful)

The usage of LLMs as validators for evaluating LLM responses has gained attention in the literature [23], [24], [59], [60] and has become a common practice for many teams at Microsoft (P1, P2, P3, P4, P6, P9, P10, P11, P15, P16, P17). These teams use rubrics to measure certain qualitative factors such as fluency (smoothness and proficiency of language), salience (contextual appropriateness), and consistency (uniformity and lack of contradictions) that signal the expected response quality of the model. Microsoft has developed frameworks (15.4% adoption) to facilitate this technique, garnering positive feedback from many. P1 said:

> “Today you can actually use large language models to evaluate the outcome of large language models, which is fantastic.”

Of the twelve product teams we engaged with, nine incorporate this approach in at least one feature team, highlighting its effectiveness in reducing manual efforts.

Despite these benefits, the approach comes with its potential pitfalls. One key reported issue among our participants appears to be the perceived unreliability of the validator LLMs. Some participants describe the validator LLMs as “flaky,” suggesting that there are inconsistencies in the judgement delivered by these models for similar responses. This inconsistency makes it challenging to rely solely on these LLM validators for response evaluation, thereby necessitating the involvement of human validators. However, teams still found it beneficial to use LLMs for an initial validation phase, followed by a secondary review by human validators to verify the initial pass/fail test results.

One big concern of this approach research has found is that