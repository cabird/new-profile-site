## Research Pointers
### Hot Off the Press

AI pair programming is a relatively new area that practitioners and researchers are actively exploring. If you are interested in reading more about the topic, there are some recent papers and studies, organized in two main categories: How programmers are using Copilot; and the effectiveness of Copilot. (Note that Copilot was the first AI pair programmer to be released and was the tool with the largest distribution, so most research is done with this tool.)

### How Programmers are Using Copilot

- Vaithilingam, P., Zhang, T., Glassman, E. Expectation vs. experience: evaluating the usability of code generation tools powered by large language models. Extended Abstracts of the 2022 Conf. Human Factors in Computing Systems, Article no. 332, 1–7; https://dl.acm.org/doi/10.1145/3491101.3519665
- Barke, S., James, M. B., Polikarpova, N. Grounded Copilot: how programmers interact with code-generating models. 2022; https://arxiv.org/abs/2206.15000

Vaithilingam et al. share insights on how 24 students use Copilot for three programming tasks and its impact on task completion time and success rate. Barke et al. report on a grounded theory analysis of how 20 programmers interacted with Copilot. They observed modes: In acceleration mode, a programmer uses Copilot to get to the code faster; in exploration mode, a programmer uses Copilot to explore the options.

### Effectiveness of Copilot

- Dakhel, A. M., Majdinasab, V., Nikanjam, A., Khomh, F., Desmarais, M. C., Jiang, Z. M. GitHub Copilot AI pair programmer: Asset or liability? 2022; https://arxiv.org/abs/2206.15331
- Nguyen, N., Nadi, S. An empirical evaluation of GitHub Copilot’s code suggestions. In Proceedings of the IEEE/ACM 19th Intern. Conf. Mining Software Repositories, 2022, 1–5; https://dl.acm.org/doi/10.1145/3524842.3528470
- Imai, S. Is GitHub Copilot a substitute for human pair-programming? An empirical study. In Proceedings of the IEEE/ACM 44th Intern. Conf. Software Engineering: ICSE-Companion, 319–321; https://dl.acm.org/doi/abs/10.1145/3510454.3522684
- Pearce, H., Ahmad, B., Tan, B., Dolan-Gavitt, B., Karri, R. Asleep at the keyboard? Assessing the security of GitHub Copilot’s code contributions. In Proceedings of the IEEE 2022 Symp. Security and Privacy, 754–768; http://bit.ly/40GbMTQ
- Asare, O., Nagappan, M., Asokan, N. 2022. Is GitHub’s Copilot as bad as humans at introducing vulnerabilities in code? Arxiv.org; https://arxiv.org/abs/2204.04741
- Ziegler, A., Kalliamvakou, E., Li, X. A., Rice, A., Rifkin, D., Simister, S., Sittampalan, G., Aftandilian, E. Productivity assessment of neural code completion. In Proceedings of the 6th ACM SIGPLAN International Symposium on Machine Programming, 2022, 21–29; https://dl.acm.org/doi/10.1145/3520312.3534864

Dakhel et al. compare Copilot’s solution for fundamental algorithmic problems with human-written code by students. Nguyen and Nadi investigate how well Copilot performs on LeetCode questions and compare its performance across programming languages. Imai investigates the effectiveness of Copilot as a substitute for a human pair programmer. Several papers focus on security. Pearce et al. found that, just like human developers, Copilot can produce vulnerable code in some cases. Asare et al. are currently working on an empirical study to investigate whether Copilot is as likely as human developers to introduce vulnerabilities. Ziegler et al. investigate whether developer interactions with GitHub Copilot can predict self-reported productivity and report patterns in the acceptance rates of Copilot suggestions. (A portion of this work is briefly summarized in the article’s discussion about the large-scale survey.)

A way to know which code checked into a git repository comes from an AI tool. Developing provenance tools that can track generated code end to end from IDE to deployment will be critical for software organizations to make informed decisions about when, where, and how to incorporate AI-powered tools into their development.

### Conclusion

This research on Copilot provided early insight into how AI-powered tools are making an entrance into the software-development process. Likewise, these studies have also presented new research questions that warrant further investigations for AI-powered tools overall. We hope these early

> Findings inspire readers to consider what this can mean for the nature of collaboration for their work in the future and its potential impact. The sidebar “Research Pointers Hot Off the Press” lists some recent work on AI-powered programming.
> 
> **Acknowledgments.** We thank the Copilot team for great discussions and our study participants for offering great insights.
> 
> **References**
> 
> 1. Ernst, N. A., Bavota, G. AI-driven development is here: Should you worry? IEEE Softw., 39, 2, (2022), 106–110; https://ieeexplore.ieee.org/document/9713901.
> 2. Forsgren, N., Storey, M. A., Maddila, C., Zimmermann, T., Houck, B., Butler, J. The SPACE of developer productivity: There’s more to it than you think. queue 19, 1 (2021), 20–48; https://queue.acm.org/detail.cfm?id=3454124.
> 3. Sobania, D., Briesch, M., Rothlauf, F. Choose your programming copilot: a comparison of the program synthesis performance of GitHub Copilot and genetic programming. In Proceedings of the 2022 Genetic and Evolutionary Computation Conference, 1019–1027; https://dl.acm.org/doi/10.1145/3512290.3528700.
> 4. Vaithilingam, P., Tianyi, Z., Glassman, E. Expectation vs. experience: Evaluating the usability of code generation tools powered by large language models. In Proceedings of the 2022 Conf. Human Factors in Computing Systems Ext. Abstracts, 1–7; https://doi.org/10.1145/3491101.3519665.
> 5. Williams, L. Pair programming. Making Software: What Really Works, and Why We Believe It. A. Oram and G. Wilson, eds. O’Reilly Media, 2011, 311–328.
> 6. Ziegler, A. Research: How GitHub Copilot helps improve developer productivity. GitHub Blog, 2022; http://bit.ly/3I9tUye.
> 7. Ziegler, A. et al. Productivity assessment of neural code completion. In Proceedings of the 6th ACM SIGPLAN Intern. Symp. Machine Programming 2022, 21–29; https://doi.org/10.1145/3520312.3534864.
> 
> **Christian Bird** is a senior principal researcher in the Software Analysis and Intelligence (SAINTES) group at Microsoft Research. His work has focused on code review, branching and merging, developer productivity, and applying AI/ML to software engineering tasks.
> 
> **Denae Ford** is a senior researcher at Microsoft Research in the SAINTES group and an affiliate assistant professor in the Human Centered Design and Engineering Department at the University of Washington, Seattle, WA, USA.
> 
> **Thomas Zimmermann** is a senior principal researcher in the Software Analysis and Intelligence (SAINTES) group at Microsoft Research. He is best known for his work on software analytics and data science in software engineering.
> 
> **Nicole Forsgren** is a partner at Microsoft Research, where she leads Developer Velocity Lab. Her current work investigates AI and its role in transforming the software engineering process.
> 
> **Eirini Kalliamvakou** is a staff researcher at GitHub Next, where she leads user studies that shape the team’s understanding of user needs and guide the iteration of prototypes.
> 
> **Travis Lowdermilk** is a principal UX researcher in the Developer Division at Microsoft. His work focuses on connecting product teams with their customers to uncover unmet needs and build innovative products.
> 
> **Idan Gazit** is a senior director of research at GitHub Next, where he leads the Developer Experiences research team. Prior to that, he led the Heroku Data UX team, and is an alumnus of the Django Web Framework core team.
> 
> Copyright held by owner/author. Publication rights licensed to ACM.