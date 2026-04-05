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