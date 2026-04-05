## The Practice and Future of Release Engineering

### A Roundtable with Three Release Engineers

Bram Adams, Polytechnique Montréal // Stephany Bellomo, Software Engineering Institute // Christian Bird, Microsoft Research // Tamara Marshall-Keim, Software Engineering Institute // Foutse Khomh, Polytechnique Montréal // Kim Moir, Mozilla

![robotic hand and machinery over blue background](page1_img_1.png)

RELEASE ENGINEERING focuses on building a pipeline that transforms source code into an integrated, compiled, packaged, tested, and signed product that's ready for release. The pipeline's input is the source code developers write to create a product or modify an existing one. Enterprises running large-scale websites and delivering mobile applications with millions of users must rely on a robust release pipeline to ensure they can deliver and update their products to new and existing customers, at the required release cadence.

This special issue provides an overview of research and practitioner experience, and this article in particular aims to give you insight into the state of the practice and the challenges release engineers face. It features highlights from interviews with Boris Debic, a privacy engineer (and former release engineer); Chuck Rossi, a release-engineering manager; and Kim Moir, a release engineer. We asked each of them the same questions covering topics such as release-engineering metrics, continuous delivery’s benefits and limitations, the required job skills, the required changes in education, and recommendations for future research.

Every product release must meet an expected level of quality, and release processes undergo continual fine-tuning. What metrics do you use to monitor a release’s quality? Do you roll back broken releases after deployment? If so, how?

Debic: Our main measures are threefold: the number of open bugs ranked by priority, the number and percentage of successful releases, and the number and percentage of releases that are abandoned late in the game. The first two measures allow us to gauge the overall release health of a service; the third measure can uncover issues in the testing pipeline or growing code complexity. We track these metrics and make comparisons from quarter to quarter.

Related to testing, another metric is the greenness of the testing pipeline. Many tests, from code to performance tests, are run daily in a continuous fashion. Stability of tests is a signal of product maturity and good engineering practices. Despite some arguments to the contrary, this measure effectively increases the velocity of product development and release.

We also track a host of more fine-grained metrics. Every step—with its duration, outcome, operation, logs, arguments, and other relevant details in execution and setup—is logged for every release that runs at our company. Refinements in the release system are direct results of observing patterns and quantifying

42 IEEE SOFTWARE | PUBLISHED

0740-7459/15/$31.00 © 2015 IEEE