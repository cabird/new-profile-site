### 4.4 Survey

**Goal.** Our goal was to quantify our observations made during the interviews and triage meetings.

**Protocol.** After we performed the interviews and triage meetings, we sent a survey to software engineers at Microsoft. As in the interviews, the survey started by giving examples of bugs that could be fixed using different techniques, where the examples were drawn from real bugs described by interviewees. As suggested by Kitchenham and Pfleeger [22], we constructed the survey to use formal notations and limit responses to multiple-choice, Likert scales, and short, free-form answers.

At the beginning of the survey, we suggested that the respondent browse bugs that they had recently closed to ground their answers. In Section 5, we discuss these questions and engineers’ responses. After piloting the survey, we estimate that it took respondents about 15–20 minutes to fill out the survey. The full text of this survey can be found in our technical report [19].

**Participants.** We sent the survey to 2000 randomly selected recipients from a pool of all employees of Microsoft who had “development” in their job title, and were not interns or contractors. This followed Kitchenham and Pfleeger’s advice to understand whether respondents had enough knowledge to answer the questions appropriately [22]. We incentivized participation by giving $50 Amazon.com gift certificates to two respondents at random.

**Data Analysis.** We analyzed our data with descriptive statistics (for example, the median), where appropriate. We did not perform inferential statistics (for example, the t-test) because our research questions do not necessitate them. When reporting survey data, we omit “Not Applicable” question responses, so percentages may not add up to 100%.

**Data Characteristics.** 324 engineers completed the survey. The response rate of about 16% is within the range of other software engineering surveys [23]. Respondents were from all eight divisions of Microsoft. Respondents reported the following demographics.

![Table: Years of experience and role distribution](page6_img_1.png)

Tester 34%  
Also, one respondent reported being a product manager.

### 4.5 Replicated Survey

**Goal.** Our goal was to replicate our quantified findings outside of Microsoft.

**Protocol.** We ported the survey we used inside of Microsoft to a web server at North Carolina State University, then generalized a few of the Microsoft-specific questions. For example, rather than asking a question about “Peer SDETs” as we did at Microsoft, we instead asked about “Peer Testers,” a more generally accepted term referring to roughly the same role. We recognized that participants may fix most of their bugs in either open source projects or in closed-source projects at companies, so we adjusted experience questions accordingly. The survey is included in the Appendix.

**Participants.** We posted the survey as an advertisement on Facebook, a popular social networking site. The advertisement featured a graphic and solicitation to participate in a study about bug fixing, in exchange for the chance to win a $50 Amazon.com gift certificate. We targeted the ad specifically at users in the US and Canada of age 21–64 who spoke English, with interests in software development and a job title related to software development. The potential audience of the advertisement was estimated by Facebook as 86,000 people. After we observed a low click-through rate for Right Column ads, we limited our campaign to ads in the Facebook News Feed.

**Data Analysis.** We analyze the replicated data in the same manner as the original survey. Additionally, we compare data from Microsoft developers to this broader population, and use inferential statistics to evaluate whether differences between the populations exist for specific question responses. Specifically, we use Mann–Whitney U tests to evaluate differences between Likert responses, then use a Benjamini–Hochberg correction for false discovery on the resulting p-values [24]. In the remainder of the paper, to separate results of when we refer to a numerical result from this replicated survey, we will put it in a curly brackets (for example, {32%}).

**Data Characteristics.** In total, the advertisements reached 10,972 developers at a cost of $67.84. From that, we obtained 183 website clicks and 80 survey responses. After removing surveys that were mostly empty, we analyzed data from 37 complete or almost-complete surveys. Over-