During the development cycle different metrics can be collected that can be related to product quality. The goal is to use such metrics to make estimates of post-release failures early in the software development cycle, during the implementation and testing phases. Such estimates can, for example, help focus testing, code and design reviews and affordably guide corrective actions. Across a span of several years, Nachi and Brendan (in collaboration with others) have used different metrics for failure prediction: code coverage [16]; code churn [17]; code complexity [18]; code dependencies [19]; people and organizational metrics [7].

Based on the results from using these various metrics either individually or in as a composite model effective failure prediction models have been built and are used in a wide variety of products at Microsoft. These failure-prediction models are built as services which allow engineers to predict risk; identify other engineers who share dependencies with their code which might be affected by changes; prioritize testing; identify ownership to have the best person fix bugs and plan for staffing up for maintenance activities.

### Test-Driven Development

Test-driven development (TDD) [20] is an “opportunistic” software development practice that has been used sporadically for decades. With this practice, a software engineer cycles minute-by-minute between writing failing unit tests and writing implementation code to pass those tests. Test-driven development has recently re-emerged as a critical enabling practice of agile software development methodologies [21], in particular Extreme Programming (XP) [22]. However, little empirical evidence supports or refutes the utility of this practice in an industrial context.

For this purpose, Nachi collected and analyzed [23] data from three different teams at Microsoft (in Windows, MSN and Visual Studio) to build up an empirical body of knowledge on the efficacy of TDD. This has enabled teams to decide on the utility of TDD as a development practice. Further, by documenting the contextual information about the human factors about the engineers involved (their experience, programming expertise, whether collocated or distributed) teams can make a data-driven decision on their move to following TDD for software development.

### Software Unit Testing

Unit testing is the testing of individual hardware or software units or groups of related units (IEEE [24]) and has been widely used in commercial software development for decades. But academic research has produced little empirical evidence via a large scale industrial case study on the experiences, costs, and benefits of unit testing. Does automated unit testing produce higher quality code?

To help other teams make a data-driven decision, Nachi, Laurie Williams, and Gunnar Kudrjavets observed [25] one large Microsoft team consisting of 32 developers transitioned from ad hoc and individualized unit testing practices to the utilization of the NUnit automated unit testing framework by all members of the team. We quantified the

quality and effort required to transition from the ad-hoc testing to a more formal unit testing process. Also to further quantify developer perceptions we conducted a survey and interviews with the team to determine the tradeoffs of doing unit testing. These results can help other teams decide on the cost and overhead to transition towards a more formal unit testing process.

In general the three projects in the data–driven software engineering domain are more focused towards the empirical data analysis with making the results accessible to engineers via tools, techniques and processes.

### Analytics for Software Development

The previous subsection presented studies where the ESE group collaborated with product teams at Microsoft. Our future work will focus on making data-driven software engineering accessible to a wider audience of engineers and managers.

We plan to build tools that allow an easy access to data to simplify data-driven decision making. For example, existing development environments such Microsoft's Team Foundation Server and IBM's Jazz provide dashboards to inform engineers of the status of various events. However, while showing status and indicators is fairly straightforward, it is unclear what are the most important factors for development teams to make data-driven decisions. What do we need to surface so that development data becomes actionable for teams so that they can improve how they work together?

Furthermore, we plan to evangelize empirical methods in software development and will provide analytics tools to empower development teams to run studies that go beyond the use of simple dashboards. In particular, we foresee the role of a software development analyst who combines the expertise in collecting and analyzing data with the knowledge of processes specific to the product team. Right now, this expertise is often split across Microsoft Research (who have the analytics knowledge) and product teams (who have the domain knowledge).

### WHAT MAKES EMPIRICAL SOFTWARE ENGINEERING RESEARCH AT MICROSOFT UNIQUE?

An industrial research lab such as Microsoft Research has several advantages to conduct research.

Easy access to industrial data. During software development a large amount of data is generated and recorded in software repositories. Being inside Microsoft simplifies the access to such data and enables empirical studies as the ones presented in this paper.

Easy access to developers. Not only is the access to data easier, but also the access to engineers. This allows validation of empirical findings, user studies of prototypes, interviews, surveys, etc. and makes an ideal environment to study collaboration in software development.

Near term impact. Since Microsoft’s core business is developing software, findings that result from our studies can