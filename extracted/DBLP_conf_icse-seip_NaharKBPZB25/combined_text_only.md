## Beyond the Comfort Zone: Emerging Solutions to Overcome Challenges in Integrating LLMs into Software Products

Nadia Nahar,*† Christian Kästner,† Jenna Butler,‡ Chris Parnin,‡ Thomas Zimmermann,‡ Christian Bird‡  
†Carnegie Mellon University, ‡Microsoft Research  
*nadian@andrew.cmu.edu

> Abstract—Large Language Models (LLMs) are increasingly embedded into software products across diverse industries, enhancing user experiences, but at the same time introducing numerous challenges for developers. Unique characteristics of LLMs force developers, who are accustomed to traditional software development and evaluation, out of their comfort zones as the LLM components shatter standard assumptions about software systems. This study explores the emerging solutions that software developers are adopting to navigate the encountered challenges. Leveraging a mixed-method research, including 26 interviews and a survey with 332 responses, the study identifies 19 emerging solutions regarding quality assurance that practitioners across several product teams at Microsoft are exploring. The findings provide valuable insights that can guide the development and evaluation of LLM-based products more broadly in the face of these challenges.

Index Terms—Software engineering for machine learning, large language models, challenges and solutions

> “It’s a big unknown that makes me very uncomfortable. It keeps me up.”  
> — Engineer on integrating LLMs into their product

## I. INTRODUCTION

Large language models (LLMs) have received massive attention and have impacted various industries across all kinds of applications. Beyond generic chatbots such as ChatGPT [1] or Bing Copilot [2], LLMs are now integrated as features in a wide array of products and services in domains as varied as healthcare [3]–[5], legal [6], [7], and sales [8]. Leading tech giants such as Microsoft, Google, Amazon, and Apple have all embraced LLM technology and have made AI a central part of the user experience of their software products [9]. For instance, Microsoft incorporates LLMs into its Office suite to offer advanced functionalities such as automatically generating slides in PowerPoint or assisting users in composing email responses in Outlook. We refer to products that integrate LLMs to provide application features as LLM-based products in this paper.

Incorporating LLMs into software products introduces disruptions and challenges to established workflows and traditional software-engineering practices – pushing developers used to traditional software products out of their comfort zones. Among others, LLMs introduce new failure modes, shift manual efforts to different tasks such as creating and labeling test data, and shift or introduce additional concerns for latency, cost, energy consumption, fairness, reliability, and compliance. Prompt engineering emerges as a new skill and building complex prompt pipelines introduces another layer of complexity [10], [11]. Practitioners struggle particularly with adjusting to new forms of quality assurance for LLM-based features, given a lack of clearly established testing processes and a significant degree of subjectivity – for example one of our interviewees remarked “The hardest thing has been [answering] ‘What is a bug?’ Like we have gotten into so many arguments [...].”

While researchers have made significant efforts to comprehend the challenges associated with building machine-learning-based products generally (see a recent survey [12]) and LLM-based products specifically [11], [13], [14], efforts to identify, catalog, and evaluate emerging solutions – whether in the form of tools, techniques, and (best) practices – have been fragmented. There are many lists collecting various LLMOps tools, with many startups competing in this field to aid prompt engineering, prompt optimization, monitoring, evaluation, and other development, maintenance, and operations tasks [15], [16]. There are also academic papers proposing diverse methods and techniques as solutions to support various aspects of development and evaluation of LLM-based products, e.g., [17]–[22]. At the same time, there are increasing concerns about some common practices, such as using LLMs to validate the output of LLMs [23], [24]. Despite the proliferation of these tools and methodologies and lots of (often controversial) opinions about them, their adoption and effectiveness in real-world settings is not well-documented.

With a mixed-method study combining 26 interviews and a survey with 332 responses [25], [26], we explore what emerging solutions practitioners across many product teams at Microsoft have adopted for common LLM-related challenges and what solutions they are exploring. Our study largely confirms the known challenges (cf. Table I) and, more importantly, uncovers that several emerging solutions, including combining qualitative and quantitative metrics to evaluate LLM outputs, using LLM-as-a-judge to evaluate subjective metrics, and establishing extensive guardrails are already broadly adopted, whereas others, such as setting up end-to-end test automation are adopted by some teams. In a nutshell, we attempt to answer the following research question: What emerging solutions (tools, techniques, and practices) are the practitioners adopting to overcome LLM-related

---

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

---

## TABLE I

### CHALLENGES OF EVALUATING LLM-BASED PRODUCTS

### Known and Confirmed Challenges

- C1: Lack of specification. The definition of a bug is ambiguous and debatable [27], [46].

- C2: Subjectivity. Determining expectations and what fits as correct answers is challenging [18], [23], [47].

- C3: Metrics dilemma. Developing the right metrics set is complicated [14], [21]. How do we know which metrics to use, how to measure them, and if the chosen metrics are appropriate?
  - (a) The selection of metrics tends to be ad hoc.
  - (b) Many teams rely on common known metrics without considering whether their specific use case fits to them.
  - (c) Defining suitable measurements for metrics is difficult because it's subjective and not straightforward.
  - (d) There is a significant disparity between offline and online metrics. Comparable sets of metrics for both offline and online evaluation are necessary, but currently lacking.
  - (e) Online metrics provide weak signals and offer little insight into output quality.

- C4: LLM properties. LLMs are made non-deterministic; teams struggle with testing, as outputs are not consistently reproducible. LLMs often hallucinate, making them unreliable [11], [14], [23], [48].

- C5: Lack of robust evaluation methods and pipeline [11], [14], [49].
  - (a) Many teams lack proper evaluation mechanisms or have inconsistent evaluation practices. Unit testing prompts are difficult and there are no effective methods for evaluating non-deterministic models beyond basic health checks.
  - (b) Teams report the absence of a cohesive evaluation pipeline, having separate evaluations on different platforms with no integration.
  - (c) Evaluations using LLMs are unreliable, frequently requiring multiple attempts to determine whether an issue is due to flakiness or another factor.
  - (d) The sheer number of variables involved in testing complex prompts makes it hard to analyze all dimensions and user inputs confidently.
  - (e) Creating test cases depends heavily on synthetic data, often generated using LLMs themselves, as access to real data is limited.
  - (f) Numerous instances of bugs reaching production highlight inadequate testing and overlooked edge cases.

- C6: Manual efforts. Manual testing is common but labor-intensive and inefficient. Some teams avoid automation to move quickly but later experience drawbacks [10], [18].

- C7: Infrastructure constraints. There is an over-dependence on the current evaluation infrastructure that lacks flexibility for all use cases. The causes of test failures are not clear, documentation is sparse, and communication is a burden. In some instances, responsiveness and support are inadequate [48].

- C8: Model migration issues. Evaluating models' post-migration is problematic; minor tweaks can cause substantial changes, complicating regression testing [10], [50], [51].

- C9: Compliance. Compliance processes are lengthy, manual, and bureaucratic, involving excessive paperwork and manual effort [11].

### Our Participants’ Views on the Challenges

- 29.6% (P9, P10, P14)  
  P14: "How do you test these things are doing well or not doing well? What's the bar."

- 36.7% (P2, P9, P10, P14, P16, P17, P24)  
  P17: "So in these cases it's more subjective to even measure the quality on the output, and figuring out the rubrics."  
  P23: "That's really hard to map back to some of these really core metrics [...] So I think that's sometimes like more art than science."

  (a) 46.5% (P5, P17, P23, P25)  
      P17: "People just kind of end up doing what they need to do in an ad hoc way."

  (b) 31.2% (P5, P7, P20)  
      P5: "We just pick the ones that we are interested in and we just run the test."

  (c) 46.5% (P1, P4, P7, P10, P15, P16, P26)  
      P1: "Measurement of the offer is another big technical challenge."

  (d) 49.7% (P1, P26)  
      P26: "Our pain points right now are more around metrics and like representativeness of offline data [...] you get these offline metrics that they will translate to something and online like that's a big gap."

  (e) 30.3% (P8, P22, P26)  
      P8: "I don't think we have any kind of signal which will trade that we are doing an awesome job on generating content."

- 57.7% (P1, P2, P3, P4, P5, P7, P9, P10, P12, P13, P14, P15, P17, P18, P22)  
  P9: "How do we deal with this nondeterminism problem?"  
  P10: "It's gonna hallucinate sometimes. It's gonna not do what you ask it to do."

  (a) 36.3% (P2, P5, P6, P11, P12, P16, P20)  
      P12: "We are working on building more complete test suite because current test suite is still very limited."

  (b) P1, P2, P6, P15  
      P2: "We don't have a strong evaluation pipeline right now."

  (c) 65.6% (P6, P7, P9, P16)  
      P6: "It's been really flaky to where it'll fail a lot of the time."

  (d) 52.0% (P1, P2, P4, P6, P7, P9)  
      P4: "It's like one prompt. We want to be able to do that as one evaluation, and I'm still looking for where I can run that automatically so that I could get both the breakdown of scores and the single score. There can be pros and cons to it, like maybe we want to run it all at once, or separate it but also giving the context. That's gonna give all these dimensions [that] can help its score and give more. Like more accuracy for each specific score when it knows the other dimensions. Uh. And so we're still like kind of playing around with which one is the right type of evaluation. And there's lots more."

  (e) 42.1% (P12, P15, P16, P25)  
      P15: "A big challenge is like getting right data to test these LLMs. Like across everything. So creating synthetic data, [trying] understanding like what they can [look] like."

  (f) P2, P3, P4, P5, P6, P11, P14, P15, P16, P19  
      P5: "Edge cases where [LLM feature] just actually blurbs out its entire command"

- 76.6% (P1, P2, P9, P10, P11, P12, P14, P15)  
  P9: "This process is extremely manual, right? It is not possible to fully automate it because it requires us to keep our brain on."

- 43.1% (P1, P2, P4, P6, P7, P16, P25, P26)  
  P6: "Kind of been challenging because [infrastructure] is owned by another team [...] Nobody on our team really has access to that or fully understands how it's powered and we run into problems with it all the time. So like the data, we'll be looking at the dashboard and like we don't have data for the past two weeks [...]. And then we have to go find someone and poke them and be like, hey, what's going on?"

- 40.4% (P12, P14, P16)  
  P12: "If you like migrate the model or any changes in the prompts, you have to go through everything again."

- 30.7% (P1, P2, P3, P5, P7, P8, P11, P12, P13, P14, P15, P16, P23)  
  P13: "That's (compliance) like a huge, huge challenge and I think just in general, you know, Microsoft is super careful with customer data, which obviously is good."

> %: % of responses from survey indicating that the challenge is ‘hard’ or ‘extremely hard’; 9: Interview participants reporting the challenge; å: Representative interview quotes

---

## TABLE II: INTERVIEW PARTICIPANTS

[Image: page4_img_1.png] The table enumerates participants grouped by product identifiers G1–G12, listing participant IDs (P01–P26) and their roles. It shows 24 named participants across 12 product groups, with some teams represented by multiple roles (e.g., G1: P01, P08, P18 — Manager, Engineer, Data Scientist; G3: P02, P09, P10, P17 — Manager, Data Scientist, Engineer) and other teams represented by a single role (e.g., G4: P04 — Engineer; G10: P19 — Manager). Several groups emphasize engineering representation (G2 and G11 list multiple engineers), while others combine managerial and data‑science perspectives (G9 and G12). The table therefore documents that the interview sample spans managers, engineers, data scientists, and researchers across multiple product teams.

cases. In addition, we aimed to recruit multiple team members in different roles (managers, engineers, and data scientists) from each product team to explore different perspectives. In total, we conducted four pilot interviews, followed by 26 interviews we analyzed for this paper (cf. Table III-A). Our recruitment strategy involved reaching out through company-internal channels and using snowball sampling [53] to identify suitable interviewees.

We conducted the interviews virtually, recorded them with consent, and transcribed them using an in-house tool. We followed the usual best practices for interviews [54], [55] to establish rapport and encourage open dialogue.

We analyzed the interview data with standard qualitative methods [56], [57], involving open coding and memoing to develop and iteratively refine a codebook for challenges and solutions. We established inter-coder agreement on one interview (percentage agreement between two raters coding independently = 80%).

### B. Survey

Drawing from our interview analysis results, we identified the key challenges and emerging solutions and designed our survey to quantify their prevalence within the company, using various rating scales. This included questions about agreement to statements about challenges, ratings of difficulty of select activities (from ‘extremely hard’ to ‘extremely easy’) and ratings of whether participants tried and used techniques (from ‘tried and would recommend’ to ‘would like to try’ to ‘tried but did not find useful’). Similar to the focus in our interviews, we again focused the survey on the quality assurance aspects of developing LLM-based products, allowing us to explore this topic in more depth while keeping the survey to a reasonable length. In addition, we also incorporated a separate section in our survey for non-LLM components to compare and contrast the responses — this is beyond the scope of this paper.

Since it is difficult to identify who exactly works on LLM features at Microsoft, we oversampled and included anyone who committed to a repository containing LLM code as a potential survey participant. Despite expecting a lower response rate [58], it was for us crucial to reach as many LLM practitioners as possible. To ensure accuracy, we incorporated qualifying questions into the LLM section of the survey. In

In total, we emailed 12,878 practitioners, received 977 automated out-of-office replies, and 332 responses (response rate < 3%), among which, 182 responses were directed to the LLM component of the survey.

In this paper, we report primarily quantitative results from ratings regarding challenges and emerging solutions.

### C. Threats to Validity and Credibility

Our research has the kind of limitations typical for this style of research. Both of our interviews and surveys have a risk of response bias, where the respondents may provide inaccurate responses due to misunderstanding, social desirability, and other factors. While the survey affords some generalizability to the population of developers at Microsoft, given that participation in our survey and interviews was voluntary, those who chose to participate might be inherently different from those who did not, potentially skewing the results. Results might be influenced by other practices at Microsoft, hence readers should be careful when generalizing results to other organizations. Also despite following standard practices for coding and careful design of our survey and interview protocol, we cannot entirely exclude biases introduced by us researchers.

## IV. RESULTS

We provided an overview of quality-assurance-related challenges identified in the literature and confirmed in our interviews and survey in Table I. In the remainder of this paper, we focus on emerging solutions reported by the interviewed and surveyed practitioners, again focusing on quality assurance (we report other emerging solutions related to requirements, development and integration, and prompt development in the appendix).

Challenges, disruptions, and emerging solutions: Emerging solutions do not always match perfectly the identified challenges and many solutions implicitly or explicitly address multiple challenges. To organize the emerging solutions, we organize them by themes we call disruptions. Specifically, we refer to challenge as inherent difficulty or obstacles associated with and caused by LLMs and use disruptions to describe how these challenges disrupt traditional software development practices and cause day-to-day disturbance for practitioners in their established workflows and practices (especially for practitioners new to LLMs) as they attempt to address these challenges within their known established practices and tools. The experienced disruption then drives the exploration and adoption of new solutions to overcome them. In essence, the sequence is: One or more challenges lead to disruptions in development practices, which in turn trigger the adoption of a new solution. For example, the challenge lack of specifications (!C1, Table I) leads to perceived insufficiency of objective metrics, which results in the formulation and adoption of the emerging practice of combining multiple qualitative and quantitative metrics (Emerging Solution 2).

For each emerging solution, we include quantitative evidence from our survey (marked with ÿ). Based on the practitioners who rated that they (a) ‘tried and would recommend’

---

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

---

using LLM-as-a-judge to directly evaluate a model’s output can result in a model assigning a high score if it was likely to produce that output and not necessarily based on criteria [24]. As a result, an excessive dependency on these LLM validators could potentially lead to oversights of such issues by human validators, thereby instilling a misleading sense of validation accuracy. Our observations have also identified an unwarranted over-reliance on this subjective method across various teams. Notably, we found teams using LLM validators even in instances where adopting more objective measures could be better suited, such as for measuring the syntactical correctness of generated code. This finding underscores the need for thoughtfulness and careful consideration in selecting validation techniques (see emerging solution 2).

### Emerging solution 5: Build a validator allowing a range of acceptable outputs instead of conducting single-valued unit tests for objective metrics (43.3% adopted, 42.6% satisfied, 0.7% did not find useful).
To improve the robustness of their objective evaluation, many Microsoft teams adopted test designs that accept a range of multiple acceptable answers or entirely switch to test general criteria instead of expecting one acceptable value (P2, P9, P12) — which mirrors ideas from property-based testing [35], [61]. They systematically implement this by using techniques such as regular expressions, search patterns, similarity algorithms, or simply by matching with a pre-approved set of cases. P12 mentioned their strategy of using a similarity algorithm: “We know what’s a good answer; we can calculate the similarity of the generated answer to the good answer [using a comparison algorithm], and if the similarity is close, although there could be some variation, but if the similarity to the known good answer is high, then we feel the quality is high.” Similarly, P2 mentioned using a formula evaluation pipeline for formula verification: “So whenever there’s a formula that shows up, we make sure that the formula goes through an evaluation pipeline before it comes back.” The notable benefit of such systematic evaluation techniques is that they can be largely automated, which substantially reduces the need for labor-intensive manual work.

## Disruption B: Common assumptions about test processes and environments break (C5, C6, C9).
Model and prompt evaluations use different infrastructure than traditional unit testing and rely often on large amounts of data that needs to be handled separately. And while developers are used to continuous integration for code tests, they do not necessarily set up similar infrastructure to (automatically) re-run offline evaluations whenever the model or prompt pipeline changes.

Also, given all the differences and new challenges when it comes to LLMs (including the ones previously discussed), practitioners often do not have experience or templates of how to approach model and prompt testing, resulting in many ad-hoc processes. These ad-hoc processes tend to be inefficient and can result in practitioners dealing with repetitive, redundant tasks, causing frustration and suboptimal outcomes.

### Emerging solution 6: Automating offline evaluation to run periodically on a schedule (29.6% adopted, 28.9% satisfied, 0.7% did not find useful).
A few teams (P4, P6, P22) we spoke to value the practice of periodically scheduled, automated offline evaluations. For example, P22 mentioned, “Most of the offline eval is heavily automated. I mean basically you wanna have a scheduled run every day just to keep track of the general metrics.” P6 also voiced her interest in adopting such a routine, given she saw other teams benefiting from it: “They have [tests] just running on a schedule [...], like every hour or something. Evaluating sort of their offline response quality and they have a dashboard for that too, and I’ve asked some folks how can we do that because I think it’s also valuable to have the offline evaluation happening periodically.”

### Emerging solution 7: Establishing internal team standards for evaluation processes and pipelines (48.7% adopted, 48% satisfied, 0.7% did not find useful).
To overcome this, several teams try to establish internal standards for the evaluation process or pipeline (P2, P4, P9, P15, P16, P22). As P15 expressed: “So as we were like developing these, we started facing challenges of like, OK, we can do this in an ad hoc way and we’ll have to do this many times. So we need to start building things where we can do it at scale. [...] [Do not want to] just put data scientists on evaluating the same prompt on different models every time because that is kind of redundant. So that’s where I think the thought for like standardization and like building standard pipelines and tools that came in.” Beyond individual teams, there are efforts within Microsoft to provide default processes supported by standardized tools to benefit all product teams, as P11 stated: “So we’re using fairly standardized tools that Microsoft other teams have provided us. [...] So what we need to do is hook up those services to our back end, which is fairly standard.”

## Disruption C: Engineers require new skills to handle LLM evaluations (C4).

Traditional software engineering education did not teach the skills necessary for evaluating LLMs (which did not exist even a few years ago). Such evaluations often require adopting a research-focused mentality where developers need to explore hypotheses, define custom metrics and measurements, and iterate over variations — these are not commonly taught and practiced in traditional software engineering. We observed that this shift can be challenging for engineers. For example, P9 explained how engineers lack the understanding that LLM evaluations are not similar to unit tests where all the test cases need to pass: “People who are trained doing research usually have the background of understanding that looking at the analysis resources is important. It’s not a unit test, right? We often run into engineers thinking about these as unit tests. Say for example, this is a benchmark, right? It is OK that there is 63 failures. It just shows me the limits of the system [...] And engineers tend to think about it as, ohh [...] I need to make the tests of unit test quality which is 100% pass rate.”

---

### Emerging solution 8: Involving data scientists in authoring tests, as they understand the limitations of the model better (33.5% adopted, 32.1% satisfied, 1.4% did not find useful)

At Microsoft, teams (P7, P9, P10, P14, P15, P18, P26) often recruit explicit help from data scientists to author test cases, as P14 mentioned, “We have probably like 1 dedicated person from the data science team who’s helping us kind of complete some of that testing.” Interviewees find that involving data scientists in authoring prompts and test cases improves the testing process. With their understanding of the model’s capabilities and limitations, data scientists can more rigorously assess the data involved to generate the test cases, as P9 mentioned, “That’s actually the place where I think the domain of data science is important. [...] I really carefully think through the data.” They are often well-versed in spotting trends, anomalies, and potential pitfalls that may be overlooked by others. Interviewees believe that data scientists are better positioned to preempt potential issues and create test cases that cover a wider range of scenarios, leading to a more comprehensive LLM evaluation. Conversely, the absence of a data scientist in the team can prove to be a roadblock, as P5 explained: “We don’t know what’s going on and we don’t know how to remedy this and we don’t have a data scientist on the crew to basically explain what was going on.”

## Disruption D: Even with extensive evaluations, LLM solutions remain unreliable and developers have difficulty establishing trust (C4, C5)

Even with substantial evaluations and more systematic and automated processes, teams often still doubt the quality and reliability of their features, as P10 explained: “It’s easy to just generate something, right? It’s easy to have a solution and get up and running with it, [...] It’s a lot harder to really know, like where the quality is at [...] a lot harder to kind of have confidence.” The practitioners’ lack of confidence in LLM responses is not unfounded, as they have recounted numerous incidents that validate their concerns, as P5 mentioned: “There have been [...] multiple times where we’ve been caught off guard [...] like any non-deterministic system, there would always be edge cases where [the LLM] just blurbs out its entire command, which is a huge risk. [...] It’s been on the news.” As a general theme, we see much more emphasis on testing and monitoring in production and on providing guardrails beyond the model.

### Emerging solution 9: Employing canary release strategy to enhance confidence in the LLM outputs (standardized practice, no adoption statistics available)

All interviewed teams use canary releases. A canary release strategy is the idea to expose a new feature or update initially to only a few users and monitor the behavior of the system, before rolling it out to more users, or rolling it back if problems are discovered. Microsoft employs several stages of audience groups, called “rings,” through which a new release passes before becoming available to the public. As P3 explained: “We’ll do [RING-2]. We’ll keep it in internally for a while [...] before we actually go beyond. So there’s kind of like a breaking in, burning in, stabilization period.” This helps catch any unforeseen bugs or issues that might not have been apparent during development or initial testing stages. For instance, P10 discovered from the earliest release ring that the LLM was not performing up to par: “We had a [RING-1]. We had like an early release of the [LLM] experience, and it was not good. [...] It was pretty buggy.” Beyond detecting bugs, canary release also allowed interviewees to gather early user feedback on the new feature or update that are used to make improvements or adjustments before a full deployment. P4: “So then once we get into Microsoft rings in production, we can look through [customer] feedback [...] and then figure out which were the right comments we wanna address.” Beyond internal rings, Microsoft also has customers under non-disclosure agreements (NDAs) who participate in early access programs, use the product before others, and provide valuable feedback, as explained by P14: “Then we have our EAP, our early access program. And these are like a set of customers that we work very closely with. Those customers are very open about, this is the scenario we tried and it didn’t work, and then we can use that feedback.”

### Emerging solution 10: Running A/B testing for tracking changes in different versions (e.g., prompt updates, and model migration) (36.7% adopted, 36.7% satisfied, 0% did not find useful)

P22 appreciated the utility of online A/B testing frameworks, stating, “I think the online AB test framework, I think it’s pretty nice and it’s pretty detailed.” Several teams (P8, P12, P16, P18, P21, P22, P24, P26) also mentioned their consistent use of A/B testing for different types of changes such as change of underlying model, and updates in the prompt engineering pipeline, such as P18: “During the migration we run AB testing like 50-50% and try to compare the two models directly.” P16 also mentioned running audits on the A/B testing to make sure it’s serving its purpose: “On the AB testing and metrics we’re doing this audit to understand if the telemetry is implemented correctly, because that’s one area that we want to make sure things are done well in too.”

### Emerging solutions 11 & 12: Establishing extensive guardrails (44.2% adopted, 41.3% satisfied, 2.9% did not find useful). Monitor systems to trigger alerts automatically if something goes wrong (36.4% adopted, 34.2% satisfied, 2.2% did not find useful)

Some teams (P1, P2, P3, P4, P8, P10, P11, P16, P17, P22) at Microsoft have implemented robust guardrails, including API format checks, response structure validations, specific pattern regular expressions, and other rule-based checks. This has improved practitioners’ confidence in the overall system. P8: “I don’t see a risk like the content would be able to mess up the engineering system. Reason being we have put a lot of good guardrails to make sure that the reliabilities are good enough [...] all like prompt injection, check block list and like safety harm, we call that content safety, and a couple of more like jailbreak classifiers.”

However, there can occasionally be a false sense of security from these guardrails. For instance, P11 mentioned the three-

---

level guardrail system, falsely considering the trained model itself as the first guardrail, “LLM is usually already trained or fine-tuned to not answer an appropriate question. So it’s already what you call censored,” instructions to the model as the second guardrail, “the second thing we have a control over is the metaprompt. So we can say please answer politely. Please don’t answer any legal or medical questions and so on,” and finally the real guardrail, “The third one is [tool] policy filters. So the input and the output are run through a filter. They will look to see if there’s any bad words and so on and so forth.”

Despite these misconceptions, there’s an impression that guardrails have improved over time. Practitioners (P3, P7) also highlighted the development of systems to automatically alert them if issues arise, assuring improved protection and monitoring. As P3 pointed out, “It’s gotten better, guardrails over the years. There are systems now that know the prompt you sent in and watch for the prompts coming back out in the result and can automatically trigger or recycle or can tell you that it couldn’t get an answer or can do things like that. So we have more protections to these kinds of things coming out.”

Microsoft also maintains a framework with universal guard lists, which set uniform standards across all its products while also reducing the individual teams’ workload in establishing guardrails. However, one concern we found among a few practitioners is how these guardrails can sometimes be too sensitive and flag innocuous interactions with customers, which can lead to customer frustration, as P15 mentioned: “we are not able to understand the sensitivity of the guardrails that we are building [...] I remember in January or December of this year we got our feedback [...] somebody said that yeah, [feature] was overblocking. [...] So Power user wrote on Reddit that like I mean actually they wrote a blog like that.”

### Disruption E: Existing approaches to telemetry and monitoring need to be revised (!C3, C9).

Many of the interview participants mentioned that the current telemetry methods, originally developed for non-ML software, are not strong indicators when it comes to assessing the quality of LLM-generated responses. As P8 elaborated: “I don’t think we have any kind of signal which indicate that we are doing an awesome job on generating content.” Many teams depend on the classic telemetry metrics, such as direct customer feedback, thumbs up, and thumbs down, which typically have a very low response rate.

A particularly frequently mentioned problem is no-eyes debugging, that is, gaining insights into system behavior at runtime without accessing user data, which should not be revealed to developers due to compliance and privacy regulation. This problem exists in debugging traditional software systems too [62], but is reported as even more severe with the open-ended nature of interacting with LLMs where users can input any text and the models can produce any response. Developers struggle to find better signals about when problems occur in private LLM outputs (e.g., as opposed to crash logs).

For example, P13 explained, “All of the commercial data like [LLM responses] are eyes off. So we cannot actually see it. So how you go and like understand what people are doing and what’s working and how to make it all better if I can’t actually even see it [...] that’s like a huge, huge challenge and I think just in general, you know, Microsoft is super careful with customer data, [...] so you just have to do the best you can while keeping, you know, sort of customer data privacy.”

### Emerging solution 13: Developing new and multiple types of telemetry metrics that may better suit LLM solutions (58.1% adopted, 57.4% satisfied, 0.7% did not find useful).

Practitioners employ several types of telemetry to assess the performance of their LLM features. For example, some practitioners (P7, P17, P20, P24, P25, P26) track apology rates from LLMs, an indicator of the models’ confidence in their responses. There is another set of metrics that almost all Microsoft practitioners use predominantly, called seen-tried-kept, that measures whether customers noticed the feature, tried it, and accepted or used the generated response. Moreover, Microsoft have a custom telemetry metric called ASHA (Aggregated Session HAppiness) to estimate customer satisfaction, referred to as the happiness index. This measures the success rate of each user session, such as, if a user employs the LLM feature ten times without failure, they have a successful ASHA session. P17 elaborated the metrics they use: “We have standard KPIs, [...] we use Asha, which sort of this is for aggregated session happiness scores. So we use that pretty heavily and we rely a lot on the customer feedback thumbs up and thumbs down. [...] beyond that, there’s like seen tried and kept, of course [...] also say an engagement measurement of do they continue to engage with the [feature]. And we also have a measure of apologies like how often we’re apologizing in a response, right. So that’s another indication that we’re probably not giving high confidence answers.” Apart from all these, they still have other traditional metrics such as monthly active users (P15).

Research teams in Microsoft are also actively engaged in establishing a robust set of quality metrics for the product teams, largely based on the analysis of system logs, as P13 mentioned: “the sort of mission in terms of coming up with a set of measures based on people’s naturalistic interactions with [LLMs] in order to give guidance to the product team. [...] They track of course a bunch of key metrics, one of which is percent of conversations that were successful. And so how we created that measure with them was what indicator that metric [...] we call inferred SAT, inferred user satisfaction. Every single [LLM] interaction gets a score”

### Emerging solution 14: Use the LLM-as-a-validator strategy to gain granular insight in production behavior without revealing private data (24.8% adopted, 24.1% satisfied, 0.7% did not find useful).

Instead of solely relying on established but weaker signals like seen or kept rates, a few teams are trying to identify and design stronger signals for their use cases. For instance, P17 mentioned an approach where validator LLMs are used to review the eyes-off user

---

conversations and report back with an assessment of the quality: “So there’s one path we have which compliant eyes‑off chat analysis [...] where an LLM is able to look over [user–LLM conversation] in an anonymized fashion and basically report back if it’s done well, if the conversations are good or not [...] So that’s again relying on LLM evaluators and eyes‑off chat analysis. It’s one way we try to get signal.” P6 also mentioned using a similar approach to track whether the quality of responses is improving or deteriorating over time: “We have online [LLM‑as‑judge] evaluation, which is sort of like evaluating the actual conversations [...] eyes off, so it doesn’t actually save the evaluation, but it sort of evaluates it at the time it’s happening. And then it saves that, and we have this sort of daily chart that shows us how the quality of these real responses is happening or changing over time.”

P15’s team went a further step up to validate whether the metric delivers accurate signals by showing the LLM’s evaluation to the user and asking for their agreement or divergence: “So we had built in an evaluation within the product itself. The first few versions of the product were the user was able to look at the rating that was given by the LLM and then select if they agree or disagree with that rating and how much rating they would give it. And then submit logs. [...] Those logs are shared back. You don’t read the customer content, but you know a certain [response]’s model score and user score, and if there is a difference, it means like the prompt engineering is not [working well].” Additionally, P15’s team is running a similarity analysis algorithm to track the variation between the text generated and the text ultimately used by the user: “What was the output from the LLM? And then what was the final [text] that was [used]? So the plan is to do text distance analysis on the output of the LLM to the final [text] that was [used], because then you can actually understand how much of a variation was coming in terms of the final [text] content.”

## Disruption F: Lack of focus on system-wide evaluation of LLM-based products (!C5).

The new challenges with evaluating LLMs tend to draw attention to model and prompt evaluation approaches (forms of unit testing) and away from more holistic evaluations of the entire system (integration, system, and acceptance testing).

### Emerging solution 15: Setting up an end-to-end test automation infrastructure (38.2% adopted, 37.6% satisfied, 0.6% did not find useful).

Recognizing the need for comprehensive system testing to assess the full functionality and efficiency of LLMs in the system, Microsoft’s infrastructure teams have developed an end-to-end testing framework. Being a consumer of the framework, P17 explained the need for it: “We’re evaluating the LLM; we likely wanna evaluate the full system, the end‑to‑end system, because the client [program] is a part of our system that does non‑trivial computation as a part of our conversation with our LLM. There are plenty of great tools to evaluate a single LLM call or maybe like a couple of tightly interconnected LLM calls [...] but as soon as we execute an [client program] and that gets fed into prompt, the tooling support doesn’t exist. So [infrastructure team] having to create our own.” Although this platform is relatively new, many Microsoft product teams (39.4% adoption) have already adopted it.

### Emerging solution 16: Conducting comprehensive tests beyond unit tests, including tests for reliability and availability (61% adopted, 60.3% satisfied, 0.7% did not find useful).

Beyond evaluating LLMs, Microsoft teams also prioritize regular software testing. This includes conducting unit and regression tests, among others, which are integral in identifying and rectifying bugs throughout the software system. For instance, P2 noted the importance of unit tests in preventing issues: “The app teams have a very extensive unit test pipeline. So like it’s just unit testing at the end of the day. As long as our tests aren’t failing, then we’re not breaking anything else in the product.” Similarly, P11 referred to regression testing: “If we change the [filters], if we change our meta prompt, you know anything that’s substantial or the large language model itself, if you switch from 3.5 to four, then you will have to rerun the test.” P7 mentioned UX testing: “We also have some UX tests or end‑to‑end tests to validate that the answers are coming as expected.” P3 discussed reliability testing: “We can measure [reliability]. We wanna get 99%. Then you go until you hit 99%. It’s a very clear goal.”

## Disruption G: Responsible AI, being a relatively new concept for engineers, has a steep learning curve and might come across as bureaucratic (!C9).

Practitioners often consider Responsible AI as a secondary priority [12], [63], particularly when they are already burdened with a substantial workload to develop, integrate, and evaluate such products with models. However, improper prioritization and a lack of standardized Responsible AI (RAI) practices can lead to legal, ethical, and reputational risks for organizations. Microsoft places a high priority on responsible AI practices [64], incorporating ethical considerations, transparency, and human‑centric values into their development processes to ensure the responsible deployment of AI technologies, including LLMs.

### Emerging solution 17: Standardizing Responsible AI (RAI) evaluation and practices

Standardizing RAI evaluation and practices includes bias and fairness evaluation (39.7% adoption), safety evaluation (55.9% adoption), robustness evaluation (33.5% adoption), transparency and explainability (27.9% adoption), privacy compliance (55.8% adoption), security and vulnerability evaluation (59.8% adoption), and other (11.7% adoption) (no adoption statistics available for some categories). As P7 highlighted, “It feels like right now it’s we are doing heavy [RAI] testing around that area just because we are new, we don’t know what’s gonna happen. We just want to play safe.” This statement emphasizes that Microsoft is placing a significant emphasis on RAI assessment. The company has assembled dedicated teams and specialists who focus on Responsible AI practices, particularly for large language models.

---

days. They employ different types of RAI checks. P21: “We basically do what we call responsible AI filtering where we do some sort of separate checks to make sure that we’re not outputting sort of racist or sexist or other comment things that shouldn’t — that is totally inappropriate to be saying.” At different phases, P8: “We do post-filter and pre-filter on the input content and the output content for responsible AI.” These experts also establish the necessary metrics, measurements, and tool support required for evaluating Responsible AI, which all teams adhere to. As noted by P3, “So there’s a RAI responsible AI stack that catches if it’s anything harmful.” Now that they have established and standardized these practices, they are focusing on automation and aiming to increase the frequency of RAI activities. P4: “We’re trying to do that more frequently. So we’re looking at how do we run RAI just weekly and there’s some new tools that many other teams are building to make that happen automatically.” The process and the automation are complicated as P17 described, and so the experts are helping the feature teams go through and use them effectively: “There are many redundant tools all running and trying to catch inappropriate content at different layers, so helping teams integrate that into their system. The other side would be like understanding the requirements and consulting, I guess, with feature crews, [...] making sure we understand the prompts, the meta-prompts, the mitigations that are in place.”

> Emerging solution 18: Applying RAI red teaming strategies (48% adoption).
> 
> Red teaming, in general, is a technique where experts mimic cyber-attacks to identify vulnerabilities in a company’s security system. Responsible AI (RAI) red teaming is focused on detecting and rectifying any flaws related to Responsible AI within AI systems, to ensure responsible AI practices are enforced. P1 elaborates on how Microsoft has extensively enhanced its RAI red teaming process, transforming it from random tests to a more sophisticated system: “Red teaming used to be very random, right? Just to try ourself and give it a few prompts and see what triggers something offensive. Now it is more sophisticated [...] sometimes we also invite people from the bigger org to participate [...] so we can get more diverse inputs and observations.” P17 builds on this by detailing the layered structure of this technique in the company: “There’s a few different layers that does red teaming, so at the [upper team] side, there are some security red teaming that’s done and they’ve also dipped their toes in some like, RAI harms red teaming as well. At that, the high level and the lower down on the [team], there is an [product] specific we call it kind of a purple team: but it is the red team that also have internal knowledge of the system.” P22 also shared about an existing effort that combines offline evaluation with red teaming within one tool and a single codebase to simplify the process: “So actually one of the things we’ve done recently is we moved all of our red teaming from [local repo] into our offline evaluation tooling. So it’s all the same code base, making it easier for when you have offline eval you get red team, because both are generally needed to get to any kind of release.”

> Emerging solution 19: Following a robust RAI audit process (mandatory for adoption).
> 
> At Microsoft, it is mandatory for all teams to gain approval from an organizational entity known as the Deployment Safety Board (DSB) prior to releasing any feature related to LLMs. The DSB’s primary role is to reaffirm that all teams have adhered to standard Responsible AI checks and practices. As P12 elaborated: “Yeah, we run DSB, Privacy, we do all sort of review and validation before we release. So that’s also why the release cycle has to be impacted. It’s just a lot of testing, a lot of evaluation and signoff has to happen before we release each update or each feature. But yeah, we don’t want customers to experience harmful content.” In addition to initial approval, teams are also required to re-submit to the DSB for each significant change such as model migration. This constitutes a comprehensive process as P21 explained, “Every time we change the model we’re using [...] have to rerun all that offline evaluation and then do red teaming and get DSB approval and then we can do A/B and to see how that looks.”

## V. DISCUSSION AND CONCLUSION

This study provides insights into how practitioners are addressing the disruptions they face when integrating LLMs into software products. By identifying 19 emerging solutions, we have highlighted strategies that are already being widely adopted to manage the complexities of LLMs, particularly in the areas of quality assurance. These practices—such as defining custom evaluation metrics, combining qualitative and quantitative measures, and automating offline evaluations—offer practical solutions for handling LLM-specific disruptions.

Our findings have important practical implications. For development teams, adopting practices such as automating offline evaluations, involving data scientists in test creation, and using LLMs as validators can improve the development and evaluation of LLM-based features. These solutions not only help teams manage the unpredictable and subjective nature of LLMs but also provide a roadmap for integrating these new processes into existing workflows.

While the widespread adoption of many of these solutions by teams at Microsoft, and the frequent explicit endorsement in the survey, implicitly suggests effectiveness, we have not conducted a rigorous evaluation of how well they work in different contexts or compared them to potential alternatives. A logical next step in this line of research (for us or others) is to carry out such a study to assess the effectiveness of these solutions in various settings. As LLMs become more prevalent, development teams will continue to face these, and likely even more, disruptions. Our aim is to provide a set of validated best practices that teams can confidently follow to ensure that these features will behave as intended, without going off track or causing unintended outcomes. We encourage other researchers and practitioners to share their experiences and insights as they adopt solutions, so that the community of software professionals collectively can learn how to safely and responsibly develop LLM-enabled software products.

---

## ACKNOWLEDGMENT

We thank all our interview and survey participants and those who helped us find and recruit them. We also thank Chenyang Yang and Jenny Liang for their feedback and suggestions, especially about prompt engineering and testing research.

## REFERENCES

[1] "Openai/chatgpt." https://openai.com/chatgpt/.  
[2] "Bing copilot." https://www.bing.com/chat?q=Microsoft%20Copilot&form=MA13tFhVro.  
[3] "Teachmemedical." https://www.teachmemedical.info/.  
[4] "Predicate." https://www.predicatehpg.com/.  
[5] "Ownyourdata llc." https://www.ownyourdata.health/.  
[6] "Paxtonai." https://www.paxton.ai/.  
[7] "Permioai." https://www.permio.ai/.  
[8] "Autolead." autolead.so.  
[9] "Artificial intelligence index report 2024," Stanford HAI, 2024.  
[10] J. T. Liang, M. Lin, N. Rao, and B. A. Myers, "Prompts are programs too! Understanding how developers build software containing prompts," arXiv preprint arXiv:2409.12447, 2024.  
[11] C. Parnin, G. Soares, R. Pandita, S. Gulwani, J. Rich, and A. Z. Henley, "Building your own product copilot: Challenges, opportunities, and needs," arXiv preprint arXiv:2312.14231, 2023.  
[12] N. Nahar, H. Zhang, G. Lewis, S. Zhou, and C. Kästner, "A meta-summary of challenges in building products with ml components—collecting experiences from 4758+ practitioners," in 2023 IEEE/ACM 2nd International Conference on AI Engineering—Software Engineering for AI (CAIN), pp. 171–183, IEEE, 2023.  
[13] A. E. Hassan, G. A. Oliva, D. Lin, B. Chen, Z. Ming, et al., "Rethinking software engineering in the foundation model era: From task-driven AI copilots to goal-driven AI pair programmers," arXiv preprint arXiv:2404.10225, 2024.  
[14] M. Dolata, N. Lange, and G. Schwabe, "Development in times of hype: How freelancers explore generative AI?," in Proceedings of the IEEE/ACM 46th International Conference on Software Engineering, pp. 1–13, 2024.  
[15] "Kennethanceyer/awesome-llmops." https://github.com/KennethanCeyer/awesome-llmops.  
[16] "tensorchord/awesome-llmops." https://github.com/tensorchord/Awesome-LLMOps.  
[17] T. S. Kim, Y. Lee, J. Shin, Y.-H. Kim, and J. Kim, "Evallm: Interactive evaluation of large language model prompts on user-defined criteria," in Proceedings of the CHI Conference on Human Factors in Computing Systems, pp. 1–21, 2024.  
[18] A. Mishra, U. Soni, A. Arunkumar, J. Huang, B. C. Kwon, and C. Bryan, "Promptaid: Prompt exploration, perturbation, testing and iteration using visual analytics for large language models," arXiv preprint arXiv:2304.01964, 2023.  
[19] H. Strobelt, A. Webson, V. Sanh, B. Hoover, J. Beyer, H. Pfister, and A. M. Rush, "Interactive and visual prompt engineering for ad-hoc task adaptation with large language models," IEEE Transactions on Visualization and Computer Graphics, vol. 29, no. 1, pp. 1146–1156, 2022.  
[20] E. Reif, M. Kahng, and S. Petridis, "Visualizing linguistic diversity of text datasets synthesized by large language models," in 2023 IEEE Visualization and Visual Analytics (VIS), pp. 236–240, IEEE, 2023.  
[21] S. Shankar, H. Li, P. Asawa, M. Hulsebos, Y. Lin, J. Zamfirescu-Pereira, H. Chase, W. Fu-Hinthorn, A. G. Parameswaran, and E. Wu, "Spade: Synthesizing assertions for large language model pipelines," arXiv preprint arXiv:2401.03038, 2024.  
[22] T. Rebedea, R. Dinu, M. Sreedhar, C. Parisien, and J. Cohen, "Nemo guardrails: A toolkit for controllable and safe LLM applications with programmable rails," arXiv preprint arXiv:2310.10501, 2023.  
[23] S. Shankar, J. Zamfirescu-Pereira, B. Hartmann, A. G. Parameswaran, and I. Arawjo, "Who validates the validators? Aligning LLM-assisted evaluation of LLM outputs with human preferences," arXiv preprint arXiv:2404.12272, 2024.  
[24] B. Murugadoss, C. Poelitz, I. Drosos, V. Le, N. McKenna, C. S. Negreanu, C. Parnin, and A. Sarkar, "Evaluating the evaluator: Measuring LLMs' adherence to task evaluation instructions," arXiv preprint arXiv:2408.08781, 2024.  
[25] A. O'Cathain, "Assessing the quality of mixed methods research: Toward a comprehensive framework," Handbook of mixed methods in social and behavioral research, vol. 531, p. 555, 2010.  
[26] J. W. Creswell, V. L. P. Clark, M. L. Gutmann, and W. E. Hanson, "Advanced mixed method research designs," Handbook of mixed methods in social & behavioral research, vol. 209, pp. 209–240, 2003.  
[27] C. Kästner, Machine Learning in Production: From Models to Products. MIT Press, in production, 2024.  
[28] E. Jiang, K. Olson, E. Toh, A. Molina, A. Donsbach, M. Terry, and C. J. Cai, "Promptmaker: Prompt-based prototyping with large language models," in CHI Conference on Human Factors in Computing Systems Extended Abstracts, pp. 1–8, 2022.  
[29] T. Wu, E. Jiang, A. Donsbach, J. Gray, A. Molina, M. Terry, and C. J. Cai, "Promptchainer: Chaining large language model prompts through visual programming," in CHI Conference on Human Factors in Computing Systems Extended Abstracts, pp. 1–10, 2022.  
[30] V. Liu and L. B. Chilton, "Design guidelines for prompt engineering text-to-image generative models," in Proceedings of the 2022 CHI conference on human factors in computing systems, pp. 1–23, 2022.  
[31] P. Lewis, E. Perez, A. Piktus, F. Petroni, V. Karpukhin, N. Goyal, H. Küttler, M. Lewis, W.-t. Yih, T. Rocktäschel, et al., "Retrieval-augmented generation for knowledge-intensive NLP tasks," Advances in Neural Information Processing Systems, vol. 33, pp. 9459–9474, 2020.  
[32] O. Topsakal and T. C. Akinci, "Creating large language model applications utilizing LangChain: A primer on developing LLM apps fast," in International Conference on Applied Engineering and Natural Sciences, vol. 1, pp. 1050–1056, 2023.  
[33] C. Jeong, "Generative AI service implementation using LLM application architecture: based on RAG model and LangChain framework," Journal of Intelligence and Information Systems, vol. 29, no. 4, pp. 129–164, 2023.  
[34] Z. J. Wang, C. Kulkarni, L. Wilcox, M. Terry, and M. Madaio, "Farsight: Fostering responsible AI awareness during AI application prototyping," in Proceedings of the CHI Conference on Human Factors in Computing Systems, pp. 1–40, 2024.  
[35] M. T. Ribeiro, "Testing language models (and prompts) like we test software." https://towardsdatascience.com/testing-large-language-models-like-we-test-software-92 (May 2023).  
[36] "Prediction guard." https://predictionguard.com/.  
[37] P. Sahoo, A. K. Singh, S. Saha, V. Jain, S. Mondal, and A. Chadha, "A systematic survey of prompt engineering in large language models: Techniques and applications," arXiv preprint arXiv:2402.07927, 2024.  
[38] B. Chen, Z. Zhang, N. Langrené, and S. Zhu, "Unleashing the potential of prompt engineering in large language models: A comprehensive review," arXiv preprint arXiv:2310.14735, 2023.  
[39] S. Vatsal and H. Dubey, "A survey of prompt engineering methods in large language models for different NLP tasks," arXiv preprint arXiv:2407.12994, 2024.  
[40] O. Khattab, A. Singhvi, P. Maheshwari, Z. Zhang, K. Santhanam, S. Haq, A. Sharma, T. T. Joshi, H. Moazam, H. Miller, et al., "Dspy: Compiling declarative language model calls into state-of-the-art pipelines," in The Twelfth International Conference on Learning Representations, 2024.  
[41] T. Shin, Y. Razeghi, R. L. Logan IV, E. Wallace, and S. Singh, "Auto-prompt: Eliciting knowledge from language models with automatically generated prompts," arXiv preprint arXiv:2010.15980, 2020.  
[42] R. Pryzant, D. Iter, J. Li, Y. T. Lee, C. Zhu, and M. Zeng, "Automatic prompt optimization with 'gradient descent' and beam search," in Proceedings of the 2020 Conference on Empirical Methods in Natural Language Processing (EMNLP), pp. 4222–4235, 2020.  
[43] T. Dixit, D. Lee, S. Fang, S. S. Harsha, A. Sureshan, A. Maharaj, and Y. Li, "Retain: Interactive tool for regression testing guided LLM migration," arXiv preprint arXiv:2409.03928, 2024.  
[44] S. Wu, H. Shen, D. S. Weld, J. Heer, and M. T. Ribeiro, "Scattershot: Interactive in-context example curation for text transformation," in Proceedings of the 28th International Conference on Intelligent User Interfaces, pp. 353–367, 2023.  
[45] S. Petridis, B. D. Wedin, J. Wexler, M. Pushkarna, A. Donsbach, N. Goyal, C. J. Cai, and M. Terry, "Constitutionmaker: Interactively critiquing large language models by converting feedback into principles," in Proceedings of the 29th International Conference on Intelligent User Interfaces, pp. 853–868, 2024.  
[46] K. I. Gero, J. K. Kummerfeld, and E. L. Glassman, "Sensemaking interfaces for human evaluation of language model outputs," in NeurIPS: In Workshop on Human Evaluation of Generative Models, 2022.  
[47] L. Aroyo and C. Welty, "Truth is a lie: Crowd truth and the seven myths of human annotation," AI Magazine, vol. 36, no. 1, pp. 15–24, 2015.

---

[48] D. Brinkmann, “LLM survey report, MLOps community.” 2023. https://mlops.community/wp-content/uploads/2023/07/survey-report-MLOPS.pdf

[49] J. Zamfirescu-Pereira, R. Y. Wong, B. Hartmann, and Q. Yang, “Why Johnny can’t prompt: how non-AI experts try (and fail) to design LLM prompts,” in Proceedings of the 2023 CHI Conference on Human Factors in Computing Systems, pp. 1–21, 2023.

[50] W. Ma, C. Yang, and C. Kästner, “(Why) is my prompt getting worse? Rethinking regression testing for evolving LLM APIs,” in Proceedings of the IEEE/ACM 3rd International Conference on AI Engineering — Software Engineering for AI, pp. 166–171, 2024.

[51] M. Sclar, Y. Choi, Y. Tsvetkov, and A. Suhr, “Quantifying language models’ sensitivity to spurious features in prompt design or: How I learned to start worrying about prompt formatting,” arXiv preprint arXiv:2310.11324, 2023.

[52] S. Campbell, M. Greenwood, S. Prior, T. Shearer, K. Walkem, S. Young, D. Bywaters, and K. Walker, “Purposive sampling: complex or simple? Research case examples,” Journal of Research in Nursing, vol. 25, no. 8, pp. 652–661, 2020.

[53] C. Parker, S. Scott, and A. Geddes, “Snowball sampling,” SAGE Research Methods Foundations, 2019.

[54] I. Seidman, “Interviewing as qualitative research: A guide for researchers in education and the social sciences,” Teachers College, 2006.

[55] P. S. Goodman, “Building effective interviewing skills,” David A. Tepper School of Business, Carnegie Mellon University, 2005.

[56] H.-F. Hsieh and S. E. Shannon, “Three approaches to qualitative content analysis,” Qualitative Health Research, vol. 15, no. 9, pp. 1277–1288, 2005.

[57] J. Lazar, J. Feng, and H. Hochheiser, Research Methods in Human-Computer Interaction. Morgan Kaufmann, 2017.

[58] T. Punter, M. Ciolkowski, B. Freimut, and I. John, “Conducting on-line surveys in software engineering,” in Proceedings of the International Symposium on Empirical Software Engineering, pp. 80–88, IEEE, 2003.

[59] L. Zheng, W.-L. Chiang, Y. Sheng, S. Zhuang, Z. Wu, Y. Zhuang, Z. Lin, Z. Li, D. Li, E. Xing, et al., “Judging LLM-as-a-judge with MT-bench and Chatbot Arena,” Advances in Neural Information Processing Systems, vol. 36, pp. 46595–46623, 2023.

[60] R. Kamoi, S. S. S. Das, R. Lou, J. J. Ahn, Y. Zhao, X. Lu, N. Zhang, Y. Zhang, R. H. Zhang, S. R. Vummanthala, et al., “Evaluating LLMs at detecting errors in LLM responses,” arXiv preprint arXiv:2404.03602, 2024.

[61] K. Claessen and J. Hughes, “QuickCheck: a lightweight tool for random testing of Haskell programs,” in Proceedings of the Fifth ACM SIGPLAN International Conference on Functional Programming, pp. 268–279, 2000.

[62] A. Zeller, Why Programs Fail: A Guide to Systematic Debugging. Morgan Kaufmann, 2009.

[63] B. Rakova, J. Yang, H. Cramer, and R. Chowdhury, “Where responsible AI meets reality: Practitioner perspectives on enablers for shifting organizational practices,” Proceedings of the ACM on Human-Computer Interaction, vol. 5, no. CSCW1, pp. 1–23, 2021.

[64] “Microsoft responsible AI standard, v2.” https://blogs.microsoft.com/wp-content/uploads/prod/sites/5/2022/06/Microsoft-Responsible-AI-Standard-v2.pdf, 2022.