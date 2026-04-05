In this paper, we combine ideas from diversity and representativeness and introduce a measure called sample coverage, or simply coverage — defined as the percentage of projects in a population that are similar to a given sample. Rather than relying on explicit subgroups that are often difficult to identify in the software domain, we use implicit subgroups (neighborhoods) based on similarities between projects; we will discuss details in Section 2.

Sample coverage allows us to assess the quality of a given sample; the higher the coverage, the better (Section 2.3). Further, it allows prioritizing projects that could be added to further improve the quality of a given sample (Section 2.4). Here the idea is to select projects based on the size of their neighborhood not yet covered by the sample. In other words, select projects first that add the most coverage to a sample. This is a hybrid selection strategy: neighborhoods are typically picked only once (reflecting ideas from diversity) but the neighborhoods with the highest coverage are picked first (reflecting ideas from representativeness).

We make the following contributions with this paper:

1. We introduce a vocabulary (universe, space, and configuration) and technique for measuring how well a sample covers a population of projects.
2. We present a technique for selecting projects in order to maximize the coverage of a study.
3. We provide a publicly available R implementation of the algorithms and the data used in this paper. Both have been successfully evaluated by the ESEC/FSE artifact evaluation committee and found to meet expectations.
4. We assess the sample coverage of papers over two years at ICSE and FSE with respect to a population of 20,000 active open source projects and provide guidance for reporting project selection.

Understanding the coverage of a sample can help to understand the context under which the results are applicable. We hope that the techniques and recommendations in this paper will be used by researchers to achieve consistent methods of selecting and reporting projects for their research.

In the rest of this paper, we first present a general technique for evaluating the coverage of a sample with respect to a population of software projects and selecting a sample with maximum coverage (Section 2). We then demonstrate this technique by calculating the coverage of research over two years at ICSE and FSE (Section 3). Then, we provide appropriate methods of reporting coverage and project selection in general and discuss implications (Section 4). Finally we present related work (Section 5), and our conclusions (Section 6).

## 2. SAMPLE COVERAGE

In this section, we present a technique for assessing the coverage of a sample: we first introduce our terminology (Section 2.1 and 2.2) followed by algorithms to score the coverage of a sample of projects (Section 2.3) and select the projects that increase the coverage the most (Section 2.4).

We implemented both algorithms (from Section 2.3 and 2.4) in the R programming language [8]; they are available as an R package. The appendix has a walkthrough on how to use our implementation.

### 2.1 Universe, Space, and Configuration

The universe is a large set of projects; it is often also called population. The universe can vary for different research areas. For example, research on mobile phone applications will have a different universe than web applications.

Possible universes:
- all open-source projects, all closed-source projects, all web applications, all mobile phone applications, all open-source projects on Ohloh, and many others.

Within the universe, each project is characterized with one or more dimensions.

Possible dimensions:
- total lines of code, number of developers, main programming language, project domain, recent activity, project age, and many others.

The set of dimensions that are relevant for the generality of a research topic define the space of the research topic. Similar to universes, the space can vary between different research topics. For example, we expect program analysis research to have a different space than empirical research on productivity:

Possible space for program analysis research:
- total lines of code, main programming language.

Possible space for empirical research on productivity:
- total lines of code, number of developers, main programming language, project domain, recent activity, project age, and likely others.

The goal for a research study should be to provide a high coverage of the space in a universe. The underlying assumption of this paper is that projects with similar values in the dimensions—that is they are close to each other in the space—are representative of each other. This assumption is commonly made in the software engineering field, especially in effort estimation research [9,10]. For each dimension d, we define a similarity function that decides whether two projects p1 and p2 are similar with respect to that dimension:

similar_d(p1, p2) → {true; false}

The list of the similarity functions for a given space is called the configuration.

configuration C = (similar_1, ..., similar_n)

Similar to universe and space, similarity functions (and the configuration) can vary across research studies. For some research topics, projects written in C might be considered similar to projects written in C++, while for other research they might be considered different.

To identify similar projects within the universe, we require the projects to be similar to each other in all dimensions.

similar(p1, p2) = ∧_d similar_d(p1, p2)

If no similarity function is defined for a dimension, we assume the following default functions, with p[d] the value of project p in dimension d and |e| the absolute (positive) value of the specified expression e:

- For numeric dimensions (e.g., number of developers): We consider two projects to be similar in a dimension if their values are in the same order of magnitude (as computed by log10 and expressed by the 0.5 threshold below).

similar_d(p1, p2) → |log10 p1[d] − log10 p2[d]| ≤ 0.5