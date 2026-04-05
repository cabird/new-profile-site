TRANSACTIONS ON SOFTWARE ENGINEERING, MANUSCRIPT ID

### Table 4: Demographics of external developers

![Table 4: Demographics of external developers](page4_img_table_1.png)

the interviewees to provide concrete examples throughout the interview, as relevant.

Interviews were conducted online; they lasted from 45 minutes to an hour and were recorded with the interviewee’s permission. 3 out of the 11 interviewees submitted their responses to the interview questions in writing and provided clarifications and examples in follow-up emails.

**Participants.** All interviewees in this part of the study were external developers. We invited them via email. We built our participant pool gradually, sending invitations to batches of 3 to 5 external developers in a project at a time, adding a batch if we didn’t get responses.

Since the aim of the interviews was to understand the community’s perspective on collaborating with Microsoft, we primarily invited external developers with high levels of contribution. However, we also sent invitations to casual external developers, who had contributed at earlier stages or had only made a few commits.

For each of the six projects, we used the contribution information in the GitHub repositories as well as git logs to identify external developers with high and low levels of committing activity, disregarding Microsoft employees. Replies to our invitations came from 9 external developers with high activity in the projects they contributed to, and 2 external developers that contributed casually. We were unable to recruit interviewees from the MVC project, but reached saturation after analyzing the 11 interviews covering the remaining 5 projects. Table 4 provides demographics of the interviewees from the six projects. Participants had on average 16 years of professional experience as developers, and 6 years of experience contributing to open source projects. The majority (8 participants) were employed as software or IT engineers, while 2 participants were Chief Technology Officers and 1 was a .NET consultant.

**Data Analysis.** The recorded interviews were transcribed. We used thematic analysis techniques [8] to process the interview data. We first grouped our data assigning codes that matched areas covered by the interview questions (e.g. motivation, discoverability, challenges, impressions etc.). We refined the coding scheme by adding codes to account for emerging aspects and performed an open card sort [9] to further combine or split codes into themes.

### 2.3 Survey

**Protocol.** Based on our findings from the interviews, we created a survey to validate and further understand the reasons behind the transition, the work involved before

and after, the outcomes, and the community response. Our survey aimed to quantify the qualitative responses from the interviews.

We followed Kitchenham and Pfleeger’s suggestions for designing surveys [10]. We kept the questions optional to encourage respondents to complete the survey, without them feeling forced to answer every question. The survey had 8 statements about the reasons for transition, 7 statements about the prior steps to transition, 27 related to transition outcomes (process changes, developer perceptions, GitHub pros & cons), and 13 statements about the community response. For Likert scales we used Strongly Agree, Agree, Neutral, Disagree, Strongly Disagree, and Not Applicable. We also collected demographic information such as total experience at Microsoft. The survey was anonymous.

**Participants.** We surveyed all the Microsoft developers working on the six projects. We found their information from the git logs and invited the developers who had committed to these projects to participate in our survey.

We piloted our survey before sending it to 192 developers in Microsoft. We received 8 out of office responses and 62 developers completed the survey. However, 14 of them expressed that they were not part of the team when the project was open sourced. We excluded these responses from our analysis. Thus, our response rate was 26.09%. The average experience of these respondents at Microsoft was 9.33 years and only 22.92% of the respondents had prior experience of contributing to open source projects outside Microsoft.

**Data Analysis.** We analyzed the distribution of Likert responses and for each hypothesis, we present the percentage of respondents that belong to each category - Strongly Agree, Agree, Neutral, Disagree, Strongly Disagree and Not Applicable, respectively, in Table 5(a)-(f). Whenever we present survey results, we give reference to Table 5, for example, (S6) refers to the hypothesis “To help find and hire potential employees.”

## 3 TRANSITION REASONS

In this section, we describe the primary reasons reported in the study regarding open-sourcing the six projects. Table 5(a) shows the list of transition reasons and the corresponding survey responses.

**a) Vibrant Community:**  
Historically, all six projects were developed within the organization and the vast majority of external users used to consume those products. By excluding these potential open source developers from the discussions, the projects were missing out on valuable feedback and experience that external developers can bring with them. While there were people active in the community, there was a significant barrier to contribute. To ensure that Microsoft is developing the right product for its customers, it was considered important to involve community members. A respondent mentioned:

> “The community is one part of making sure that we are delivering the best value to our customers.” (M2)

Suggestions from the community members can provide directions to the technology/product. “Those guys don’t represent the whole community but they are the ones who set the trends. They can tell you the