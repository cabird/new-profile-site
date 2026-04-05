# Diversity in Software Engineering Research

Meiyappan Nagappan Thomas Zimmermann Christian Bird  
Software Analysis and Intelligence Lab Microsoft Research Microsoft Research  
Queen’s University, Kingston, Canada Redmond, WA, USA Redmond, WA, USA  
mei@cs.queensu.ca tzimmer@microsoft.com Christian.Bird@microsoft.com

mei@cs.queensu.ca tzimmer@m

## ABSTRACT
One of the goals of software engineering research is to achieve generality: Are the phenomena found in a few projects reflective of others? Will a technique perform as well on projects other than the projects it is evaluated on? While it is common sense to select a sample that is representative of a population, the importance of diversity is often overlooked, yet as important. In this paper, we combine ideas from representativeness and diversity and introduce a measure called sample coverage, defined as the percentage of projects in a population that are similar to the given sample. We introduce algorithms to compute the sample coverage for a given set of projects and to select the projects that increase the coverage the most. We demonstrate our technique on research presented over the span of two years at ICSE and FSE with respect to a population of 20,000 active open source projects monitored by Ohloh.net. Knowing the coverage of a sample enhances our ability to reason about the findings of a study. Furthermore, we propose reporting guidelines for research: in addition to coverage scores, papers should discuss the target population of the research (universe) and dimensions that potentially can influence the outcomes of a research (space).

## Categories and Subject Descriptors
D.2.6 [Software Engineering]: Metrics

## General Terms
Measurement, Performance, Experimentation

## Keywords
Diversity, Representativeness, Sampling, Coverage

## 1. INTRODUCTION
Over the past twenty years, the discipline of software engineering research has grown in maturity and rigor. Researchers have worked towards maximizing the impact that software engineering research has on practice, for example, by providing techniques and results that are as general (and thus as useful) as possible. However, achieving generality is not easy: Basili et al. [1] remarked that “general conclusions from empirical studies in software engineering are difficult because any process depends on a potentially large number of relevant context variables”.

With the availability of OSS projects, the software engineering research community has moved to more extensive validation. As an extreme example, the study of Smalltalk feature usage by Robbes et al. [2] examined 1,000 projects. Another example is the study by Gabel and Su that examined 6,000 projects [3]. But if care isn’t taken when selecting which projects to analyze, then increasing the sample size does not actually contribute to the goal of increased generality. More is not necessarily better.

As an example, consider a researcher who wants to investigate a hypothesis about, say, distributed development on a large number of projects in an effort to demonstrate generality. The researcher goes to the json.org website and randomly selects twenty projects, all of them JSON parsers. Because of the narrow range of functionality of the projects in the sample, any findings will not be very representative; we would learn about JSON parsers, but little about other types of software. While this is an extreme and contrived example, it shows the importance of systematically selecting projects for empirical research rather than selecting projects that are convenient. With this paper we provide techniques to (1) assess the quality of a sample, and to (2) identify projects that could be added to further improve the quality of the sample.

Other fields such as medicine and sociology have published and accepted methodological guidelines for subject selection [2] [4]. While it is common sense to select a sample that is representative of a population, the importance of diversity is often overlooked yet as important [5]. As stated by the Research Governance Framework for Health and Social Care by the Department of Health in the UK:

> “It is particularly important that the body of research evidence available to policy makers reflects the diversity of the population.” [6]

Similarly the National Institutes of Health in the United States developed guidelines to improve diversity by requiring that certain subpopulations are included in trials [4]. The aim of such guidelines is to ensure that studies are relevant for the entire population and not just the majority group in a population.

Intuitively, the concepts of diversity and representativeness can be defined as follows:

- Diversity. A diverse sample contains members of every subgroup in the population and within the sample the subgroups have roughly equal size. Let’s assume a population of 400 subjects of type X and 100 subjects of type Y. In this case, a perfectly diverse sample would be 1×X and 1×Y.

- Representativeness. In a representative sample the size of each subgroup in the sample is proportional to the size of that subgroup in the population. In the example above, a perfectly representative sample would be 4×X and 1×Y.

Note that based on our definitions diversity (“roughly equal size”) and representativeness (“proportional”) are orthogonal concepts. A highly diverse sample does not guarantee high representativeness and vice versa.