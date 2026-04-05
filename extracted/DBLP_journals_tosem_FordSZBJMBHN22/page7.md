### 3.2 Survey 2: United States

To investigate the importance and frequency of the reported benefits and challenges from the first survey and their association with self-reported productivity, we designed and deployed a second survey. Rather than open-ended questions, we included closed-answer questions for the factors that emerged from our coding of the first survey. These closed questions asked about benefits and how important they were to the respondent, as well as challenges and the impact of those challenges. In addition, this second survey inquired about additional benefits and challenges.4

- Compared to working in office, how has your productivity changed? (Q13)  
  (significantly less productive / less productive / about the same / more productive / significantly more productive)
- What benefits have you experienced working from home and how important are these benefits? (Q15*)  
  (I don’t experience this benefit / I experience this benefit but it’s *not* important to me / I experience this benefit and it’s *important* to me / I experience this benefit and it’s *very important* to me)
- What work-related challenges have you experienced working from home and how impactful are these challenges? (Q17*)  
  (I don’t experience this challenge / I experience this challenge but it’s a *minor issue* for me / I experience this challenge and it’s a *major issue* for me)
- What could be improved about working from home (WFH)? Choose up to three (3) items. (Q22*)

As items for the questions, we identified a list of 15 benefits (B1..B15), 20 challenges (C1..C20), and 12 improvements/suggestions (S1..S12) based on the thematic analysis of the responses to Survey 1. The items were displayed in random order within a question. The full survey is available as supplemental material [23].

#### Survey Distribution.

This survey was distributed to 9,000 engineers (consisting of developers, program managers and data scientists) across the entire US over a period of three weeks (a different sample of 3,000 employees was selected for each week). There was no overlap between the samples in Survey 1 and Survey 2. We received 2,265 responses for a response rate of 25%, with all required questions answered (comparable to the response rates of many other software engineering surveys [24, 25]). To encourage participation, survey respondents could enter a raffle of multiple $100 Amazon.com gift certificates. No reminder emails were sent.

Collecting data across three weeks, and using the same question as in the first survey, allowed us to compare the answers to the closed question about change in productivity so that we could detect if there were any significant changes in productivity (RQ1) as people adapted to or found it harder working from home over time.

#### Data Analysis.

For the quantitative data in the second survey, we present descriptive statistics about the selected benefits and their importance, and the challenges and their impact. We performed a simple subgroup analysis for management responsibility (people manager vs. individual contributor) and job role (software engineers vs. program manager). We did not perform a subgroup analysis for gender because gender information was only collected in the final week of the survey.

We also considered the association of the benefits (Q15*), challenges (Q17*), and suggested improvements (Q22*) with the reported changes in productivity (Q13). We used Wilcoxon Mann–Whitney and Fisher Exact Value tests [26] to check for statistically significant differences. To reduce

4 If a question was identical between Survey 1 and Survey 2, we use the same question number (e.g., Q13). For a closed-answer question in Survey 2 that was based on an open-ended question in Survey 1, we append an asterisk (*) to the question number (e.g., Q15* is based on Q15).