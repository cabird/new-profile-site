project based on history of others, but that there is no general rule for effort estimation. Rather they used regression analysis to find that similarities in the size of the development team, number of web pages, and high effort functions between projects in different companies are related to similar effort requirements (i.e., different projects have different effort requirements, but projects that are similar to each other have similar effort needs).

Knowledge can be synthesized even when empirical results differ along dimensions in the space. Systematic reviews rely upon this principle. The recent review of fault prediction performance by Hall et al. [19] essentially constructed a space consisting of modeling techniques, metrics used, and granularity and found that fault prediction approaches performed differently. However, they were also able to conclude that simpler modeling techniques such as Naive Bayes and Logistic regression tended to perform the best. In the same way, selecting projects that cover a large area in the project universe and examining where results are valid and where they are not, does give deeper insight into the research results. As Murphy-Hill et al. explain, “simply explaining the context in which a study occurs goes a long way towards creating impactful research” because this allows someone to “decide whether your research applies to her.” [20]

> Results that differ can still have value, especially in a space that is highly covered.

## 4.3 Reporting Coverage

We have provided a technique for computing coverage scores for samples and for selecting a sample of software projects with high coverage. While selecting projects in a rigorous and systematic way is important, reporting in a consistent and consumable manner is just as important.

Most papers include a summary of characteristics of the projects included (e.g., size, age, number of checkins, number of contributors, language). This is an appropriate place to report the coverage of the selected sample of projects. As illustrated in Section 3, the universe and the space that is used should also be explicitly described and the rationale provided. How was the universe chosen? Why was each dimension in the space selected? For example, one might select only Java projects as a universe if a technique only makes sense in the context of Java.

If projects from different parts of the space show different results, they should be reported and discussed. Differences by dimension or location in the space provide a unique opportunity to refine theories and investigate further.

Finally, issues in sampling can affect external validity. Any potential problems or gaps in coverage should be discussed in a section discussing validity, usually entitled “Threats to Validity” or “Limitations”.

> Always report the universe, space, and configuration with any coverage score.

coverage score.

## 4.4 Next Steps

What do we hope will come from this work? Our goal has not been to claim or imply that prior work is flawed, but rather to show that we can improve our practice and provide methods to do so. It is our hope that researchers will begin to select projects in a more systematic way and improve the reporting on why projects were selected. The concepts introduced in this paper can also be exploited for replication studies: either to strictly replicate a study on similar samples, or otherwise to replicate on different samples, in order to determine whether the previously observed results generalize.

We realize that different studies and techniques are aimed at different problems and thus the goal may not always be to achieve maximum coverage of all software projects. Furthermore, the dimensions that people care about may differ. For instance, when evaluating techniques for mining API rules, the age of each project may not be of concern. Our technique is general enough that researchers can define their own universe (the population they want to target with their research) and space (the dimensions that are relevant for their research). But it does little good if each study reports its coverage using different and opportunistic spaces and universes. We hope that this work sparks a dialog about diverse and representative software engineering research and that some level of consensus on what universes and spaces are appropriate will be achieved. For some areas finding appropriate dimensions that relate to generality and can be easily quantified might be challenging. It is likely that different subdisciplines will arrive at different answers to these questions, which we feel is reasonable.

## 5. RELATED WORK

We identified related work in the areas of representativeness, reporting guidelines, and software testing.

### Representativeness

Some of the earliest research studies on representativeness were by Kahneman and Tversky [21] [22]. In their study, they stated that the sample size is not related to any property of the population and “will have little to no effect on judgment of likelihood”. In their experiments they determined that people's perception of the likelihood of an event depended more on its representativeness to the population than the size of it. Thus they concluded that there is a difference between people's judgment and the normative probabilities. They call this the representative heuristic. In a more recent study, Nilsson et al. [23] investigated the cognitive substrate of the representativeness heuristic. In our study we borrow the concept of representativeness from them. However, unlike their studies, we are not evaluating the likelihood of an event or how people's perception differs from the actual probability of an event. We rather propose the means to measure the representativeness of the sample (software systems used in the case study) to the population (the relevant universe of software).

Selecting samples for case studies has been a challenge in fields such as clinical trials, social sciences, and marketing for decades. Hence studies such as the one by Robinson et al. [24] evaluated selection biases and their effects on the ability to make inferences based on results in clinical trials. They found that biases did exist; certain subgroups were underrepresented (e.g., women) while others were overrepresented (e.g., blacks). Their statistical models found that the selection biases may not influence general outcomes of the trials, but would affect generalizability of results for select subgroups.

### Representativeness in Software Engineering

Another area of research that often encounters the issue of representativeness is the field of systematic literature reviews. If the set of studies selected to be a part of the literature review is not representative of the research field under study, then the conclusions of the reviews can potentially be biased. Hence a variety of guidelines that are written for conducting systematic literature surveys place a large emphasis on the selection of the studies that will be included in the review [25] [26] [27] [28]. All the guidelines suggest that the researchers conducting the review must make the selection and