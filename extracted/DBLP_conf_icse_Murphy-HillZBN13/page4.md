product, which will remain anonymous; the product group was different from any of those chosen in the opportunistic interviews.

We aimed to talk to 8 software engineers in total for these interviews. While we interviewed fewer people than with the opportunistic interviews, these firehouse interviews tended to take much longer to orchestrate, mostly because we had specific people that we wanted to talk to. In retrospect, we did not notice any qualitative differences in engineers’ responses to the two interview types, so for the remainder of the paper, we do not distinguish between these two groups of participants. Nonetheless, you may do so if you wish; participants of the firehouse interviews are labeled P33 through P40.

**Data Analysis.** We analyzed data in the same way as with the opportunistic interviews.

**Data Characteristics.** We also found engineers to be receptive to being interviewed, although they were usually surprised we asked about a bug they had just fixed. We reassured them that we are from Microsoft Research, and are there to help.

In total, we went to 16 offices, and were able to interview 10 engineers. Two of these we mistakenly interviewed, one because his officemate actually closed the bug, and one because the interviewer misread the bug report. We compensated these engineers for their time, but we exclude them from analysis.

### C. Triage Meetings

We hypothesized that not only do individual engineers make decisions about the design of bug fixes, but perhaps that bug fix designs happen during bug triage meetings as well.

**Goal.** Our goal was to obtain qualitative answers to our research questions with respect to how engineers work together to find good bug fix designs.

**Protocol and Participants.** We attended six bug triage meetings across four product groups. Five of these groups were the same groups that we did interviews with. To ensure engineers were comfortable, we did not record these meetings; rather, we took notes and observed in silence.

**Data Analysis and Data Characteristics.** It became clear that there was very little data we could gather in these triage meetings, for two reasons. The first is that participants rarely discussed how to fix a bug beyond whether to fix it and when to do so. Second, when participants did discuss how to fix bugs, the team was so tightly knit that very little explanation was needed; this terseness made bug fix decisions basically impossible for us to understand without the context that the team members had. As a result, we were able to glean few insights from the meetings. For the few observations that we could make, we label these meetings as T1 to T6. Because there was little usable data from these meetings, we did not perform any data analysis beyond reading through our notes.

### D. Survey

**Goal.** Our goal was to quantify our observations made during the interviews and triage meetings.

**Protocol.** After we performed the interviews and triage meetings, we sent a survey to software engineers at Microsoft. As in the interviews, the survey started by giving examples of bugs that could be fixed using different techniques, where the examples were drawn from real bugs described by interviewees. As suggested by Kitchenham and Pfleeger [17], we constructed the survey to use formal notations and limit responses to multiple-choice, Likert scales, and short, free-form answers.

At the beginning of the survey, we suggested that the respondent browse bugs that they had recently closed to ground their answers. In Section IV, we discuss these questions, intermixed with engineers’ responses. After piloting the survey, we estimate that it took respondents about 15–20 minutes to fill out the survey. The full text of this survey can be found online.3

**Participants.** We sent the survey to 2000 participants by selecting employees of Microsoft who had “development” in their job title, and were not interns or contractors. This followed Kitchenham and Pfleeger’s advice to understand whether respondents had enough knowledge to answer the questions appropriately [17]. We incentivized participation by giving $50 Amazon.com gift certificates to two respondents at random.

**Data Analysis.** We analyzed our data with descriptive statistics (for example, the median), where appropriate. We did not perform inferential statistics (for example, the t-test) because our research questions do not necessitate them. When reporting survey data, we omit “Not Applicable” question responses, so percentages may not add up to 100%.

**Data Characteristics.** 324 engineers completed the survey, a response rate of about 16%, within the range of other software engineering surveys [18]. Respondents were from all eight divisions of Microsoft. Respondents reported between 0.08 and 39 years of experience in the software industry (median = 9.5), with a median of 5 years of experience at Microsoft. 65% reported being developers, while 34% reported being testers. One respondent reported being a product manager.

## IV. RESULTS

We next characterize the design options that engineers have when selecting a bug fix (Section IV.A), and then describe how engineers choose which fix to implement (Section IV.B).

### A. Description of the Design Space

In our interviews, we asked participants to estimate what percentage of their bugs for which there were multiple possible solutions. The median was 52%, with a wide range of variance, with individual responses ranging from 0% to 100%. This suggests that many bugs can be fixed in multiple ways, although this number should be interpreted as a rough estimate.

With respect to the dimensions of the design space, we obtained answers to this research question by asking interviewees to explain the different fixes that they considered when fixing a single bug. In bold below, we present several dimensions on which bugs may be fixed, a description of each dimension, and an example from our interviews. Note that a single fix can be considered a point in this design space; for example, a fix may have low error surfacing and high refactoring, and simulta-

3 http://people.engr.ncsu.edu/ermurph3/experiments/BugFixDesignSurvey.pdf