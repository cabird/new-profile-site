and practices at JetBrains, he could quickly understand the context and focus on the relevant topics, thus reducing the length of the interviews. We have transcribed the audio recording of each interview for subsequent analysis.

After the first four developers, the interviews started reaching a saturation point [68]: interviewees were providing insights very similar to the earlier ones. For this, we decided to design the first survey that we ran at JetBrains.

### Surveys

The first survey, deployed at JetBrains, was aimed at further exploring the concepts emerged from the data analysis and the interviews. We sent the first survey to all 62 developers working on the product for which we collected the quantitative data at JetBrains. All these developers are using Upsource and are exposed to the recommendation system. This was a short, 5-minute survey, comprising 5 demographic information questions and 4 open-ended questions intermingled with 5 multiple choice or Likert scale questions. The questions were focused on perceived relevance and usefulness of the recommendations. We received 16 valid answers (26% response rate).

The second survey, deployed at Microsoft, was aimed at validating and generalizing our conclusions, by reaching a large number of respondents working in different teams, products, and contexts. For the design of the surveys, we followed Kitchenham and Pfleeger’s guidelines for personal opinion surveys [69]. Both surveys were anonymous to increase response rates [70]. The second survey was split into 4 sections:
- (1) demographic information about the respondent,
- (2) demographic information about the current team of the respondent, multiple choice and Likert scale questions (intermingled with open-ended fields for optional elaboration on the answers) on
- (3) reviewer selection, and
- (4) relevance as well as helpfulness of the reviewer recommendation.

Excluding demographic questions, the second survey consisted of 4 Likert scale questions with several items to scale (complemented by one or two optional open-ended responses) and 3 open-ended questions. The survey could be completed in less than 15 minutes.

We have sent the second survey to 2,500 randomly chosen developers who sign off on at least three code reviews per week on average. We used the time frame of January 1, 2017 to August 1, 2017 to minimize the amount of organizational churn during the time period and identify employees’ activity in their current role and team. As we have found that incentives can increase participation [71], survey participants were entered into a raffle for four $25 gift cards. We received 507 valid answers (20% response rate). The response rates for both surveys are in line with other online surveys in software engineering, which have reported response rates ranging from 14% to 20% [72].

In the rest of this section, when quoting interviewees’ responses, we refer to interviewees from JetBrains as (I#) and to respondents to the JetBrains survey as (S#).

3. Available at https://doi.org/10.5281/zenodo.1404755

## 5.2 RQ2.1 — Do developers need assistance with reviewer selection?

In the interviews, we have asked developers at JetBrains about their criteria of reviewer selection. The answers indicate that the primary characteristic of the desired reviewers is their familiarity with the context of change: “[desired reviewer] is the person who usually works with this [changed] part” (I1), “the person who wrote a lot of code in the subsystem I am changing, or has recently been ‘digging’ into this subsystem — there are fresh non-trivial changes by them” (I3). Along the responses, interviewees refer to the codebase as divided between the developers, each responsible for their subsystem: “someone else’s subsystem and [...] it’s not my subsystem”, “most of the work I do is in my subsystems” (I2), “there is the part of the codebase that I’m responsible for” (I1). This detail suggests the presence of strong code ownership practices at JetBrains.

The answers also indicate that the respondents are usually well aware of who is responsible for the code they are changing, thus often knowing the reviewers in advance. Developers say: “I always know who will be reviewing my changes because I know which subsystem I’m changing and who owns this part” (I1), “it is, from the experience, established who does [code review for my changes]” (I2), “Almost always I know [the future reviewer]” (I3).

![Bar charts comparing Microsoft and JetBrains Likert responses](page11_img_1.png)

Fig. 11: Distributions of answers to Likert scale questions about relevance and helpfulness of recommendations from Microsoft and JetBrains. Numbers represent the distribution of the responses in percent, rounded to nearest integer.

Results of the survey at JetBrains (presented in Figure 11) confirm this point: To the question “How often do you know whom to pick as a reviewer before even creating a review?” 63% of developers replied that they “Always” know the future reviewer, and 31% answered “Usually (90%)”. The one remaining response was “Frequently (70%)”. The Microsoft survey reveals a similar picture that is only slightly less extreme: 92% of respondents at Microsoft reported that they “Always”, “Usually”, or “Frequently” knew whom to pick as a reviewer before creating a review.

## 5.3 RQ2.2 — Are the reviewer recommendations perceived as relevant?

In the interviews, we have asked JetBrains developers whether they consider the recommendations given by Upsource relevant. The answers indicate that the recommendations are often relevant, and, moreover, it is usually clear why a particular person is recommended. “in about 80% of the cases [recommendations] are relevant”, “I understand why