“there are certain sectors that are more likely than others to induce trustworthiness in AI.” This finding supports the value of investigation into AI tools specific to software engineering.

Kocielnik et al. [4] examined the role of expectation management in success of AI tools. They find that expectation setting is critical for adoption of such tools and show how different tool designs such as communicating AI accuracy and providing explanation can increase the trust of users even when actual AI performance is unchanged. Findings from our own interviews confirm that setting and meeting expectations around tools is an important part of trust formation in the software engineering domain.

Gille et al. [19] examined trust in AI tools in the context of healthcare and makes an explicit call that “we need to develop and validate measure that aid the buildup of trust in AI. Such measures may [include] guidance for AI designers [...] including development approval, implementation, use and evaluation.” The PICSE framework represents the first steps in this direction for the context of software tools.

Wang and Siau [20] found that AI models based on neural models may suffer more from lack of trust because of their “black box” nature in which only the input (features) and outputs (predictions) are visible to the user and there is little transparency into the inner workings. This may hinder trust from users of tools based on these models.

### B. Trust in Professional Teams

Casey [21] examined trust in geographically distributed teams across four independent studies and identified how bespoke software engineering tools were able to develop and in some cases re-establish trust between remote teams, facilitating processes such as configuration management and document exchange and approval.

We refer the interested reader to the work of Rousseau et al. [22] who provide an in-depth survey of trust in the context of firms and professional teams from the organizational literature. Similar to our findings in the SE domain, they find that trust is not static and has multiple phases. They also describe multiple definitions and forms of trust, for example characterizing trust as a level of control in some contexts and about positive expectations in others (both aspects of trust in the PICSE model).

### C. Trust in Software Development

Smith et al. [23] explored in-house software tool building and found that successful tools often take into account factors in the PICSE model including integration into existing processes, reputation of the tool builder and recommender, and existence of a supportive community.

Vaithilingam et al. [3] conducted a user study of Copilot where interviewees in their study clarified their mistrust of “opaque suggestions from Copilot” and would only trust it for simple tasks due to difficulty understanding the code, fear of unknown bugs, and failure to match coding style. While trust was not the primary aim of this study, many of these reasons appear in the PICSE model.

Widder et al. studied trust in autonomous software tools via an ethnographic study at NASA and found that trust was influenced by transparency, usability, social context, and the organizations processes [24].

Murphy-Hill et al. found that developers are more likely to use refactoring tools that they trust, but they did not investigate trust formation or what factors increase or erode trust [10]. Later, Murphy-Hill et al. explored how developers find and adopt new tools in software development and found that trust in the recommender of the tool plays a critical role, whether the recommendation comes from a teacher/mentor, discussion forums, tutorials, or even Twitter [25].

## VIII. CONCLUSIONS & FUTURE WORK

This paper introduced the PICSE framework for trust in software tools, a collection of factors that speak to considerations engineers make when forming and building trust in their tools. The PICSE framework emerged from 18 interviews conducted with engineers both internal and external to the Microsoft organization on their trust in traditional and AI-assisted software tools. Our findings have implications for how we can work to intentionally develop trustworthy tools in practice and effectively harness the power of artificial intelligence to build AI-assisted tools engineers seek as collaborators. As we continue to strive for this goal, our future work will gain additional insights at a larger scale to validate and expand on this framework such that it can provide useful guidance and metrics for evaluating and improving tool trustworthiness.

## ACKNOWLEDGEMENTS

We thank the engineers who participated our interviews and shared their experiences. We thank Ruijia Cheng, Ruotong Wang, and Eirini Kalliamvakou for the great and insightful discussions about this project. Brittany Johnson conducted this work as a visiting researcher in Microsoft Research’s Software Analysis and Intelligence in Engineering Systems Group (http://aka.ms/saintes).

## REFERENCES

[1] J.-M. Favre, J. Estublier, and A. Sanlaville, “Tool adoption issues in a very large software company,” in Proceedings of 3rd International Workshop on Adoption-Centric Software Engineering (ACSE’03), Portland, Oregon, USA, 2003, pp. 81–89.

[2] B. Johnson, Y. Song, E. Murphy-Hill, and R. Bowdidge, “Why don’t software developers use static analysis tools to find bugs?” in Proceedings of the 2013 International Conference on Software Engineering, San Francisco, CA, USA, May 2013, pp. 672–681.

[3] P. Vaithilingam, T. Zhang, and E. L. Glassman, “Expectation vs. experience: Evaluating the usability of code generation tools powered by large language models,” in CHI Conference on Human Factors in Computing Systems Extended Abstracts, 2022, pp. 1–7.

[4] R. Kocielnik, S. Amershi, and P. N. Bennett, “Will you accept an imperfect ai? exploring designs for adjusting end-user expectations of ai systems,” in Proceedings of the 2019 CHI Conference on Human Factors in Computing Systems, ser. CHI ’19. New York, NY, USA: Association for Computing Machinery, 2019, p. 1–14. [Online]. Available: https://doi.org/10.1145/3290605.3300641

[5] “Github copilot,” https://github.com/features/copilot, 2022.

[6] P. Anderson, “The use and limitations of static-analysis tools to improve software quality,” CrossTalk: The Journal of Defense Software Engineering, vol. 21, no. 6, pp. 18–21, 2008.