## 4. RESEARCH QUESTION AND METHODOLOGY

The central question in our initial foray (into the project described above) is recapitulated below:

> What do programmers believe, and how do these beliefs relate to the actual empirical evidence?

Our initial focus was to address these questions in the specific context of one large industrial organization (Microsoft) and gather data on both programmers' beliefs, and, secondly, to perform a detailed case study to judge the relationship of these beliefs to actual evidence in some specific projects.

### Survey Design

The core of the survey started with a series of empirically falsifiable claims, mostly drawn from software engineering research. We chose a number of claims for inclusion in our survey, based on the following set of criteria:

- The consequences of the claim being true or false are "actionable", viz., consequential for software practice.
- We believed that our target population (Microsoft developers) would have opinions on these claims.
- We believed that this population would have had experience with the tools or processes in question, and would have been able to form not just an opinion, but an informed one.
- We believed that regardless of expressed opinion, we would be able to gather evidence strongly relevant to the claims.

Opportunistically, we also added a few claims that we found interesting, but about which, as of yet, we weren't aware of well-established results. We added these as possible avenues of future study, to take advantage of this survey instance to gather some more useful data on developer beliefs. The full list of claims is in Table 1.

For each of these claims, we asked developers to respond on a 5-point Likert scale (Strongly Disagree, Disagree, Neutral, Agree, Strongly Agree). Finally, in all cases, we scripted the survey to choose questions on which developers expressed more polarized opinions, and asked them to explain the origins of their view (more details below, Section 4.1, under "Opinion Formation"). In addition, they were also asked to provide a rationale, in the form of "reasons for your answer". This rationale was used as a way for us to understand the answers.

In addition we collected demographic evidence, similar to Lo et al [31]. The following information was gathered:

- Demographics: Age, gender, years at Microsoft, years as a developer, highest level of schooling.
- Employment: Primary division, years at current job, job title, whether they are managing anyone.
- Geographic: Primary work location.

### Target Audience

Our target audience were people primarily in a software engineering discipline at Microsoft: this included developers, testers, program managers, and their immediate supervisors. These people, we felt, would have the opportunity to form informed opinions about the claims that were offered to them. We identified about 2500 professionals, from various locations around the world, in various projects, and sent an email with a link to the survey and solicited a response.

No identifying information was required or gathered from respondents; they could, separately, and without connection to their answers, volunteer to offer themselves for a follow-up interview. Distinct from the survey, they could also enter their email addresses to be entered into a raffle to win a gift card.

### 4.1 Survey Results

We now present our main findings from the survey.

Overall impressions
We received a total of 564 responses, a response rate around 22%. Survey respondents varied in age, gender, location, etc. The mean age was 32.5 (σ = 8). The respondents skewed male (497 male, 53 female, 7 other, and 7 didn't state). They were largely college educated. Of those that stated, 267 had Bachelor's degrees, 211 had Master's, and 29 had a PhD; the rest didn't respond. Respondents are from all locations of Microsoft; of the ones who stated location, the largest cohort was from the US (386); the rest were from India (48), China (39), Europe (66), and other locations (25). While these demographics suggest capture of a broad cross-section of the overall population of developers, it should be noted that all respondents to one degree or another are influenced by the business context of Microsoft, and to a large extent, the (dominantly male) North American software engineering culture.

We scored the Likert scale from 1 for "Strongly Disagree" to 5 for "Strongly Agree". In Table 1 we present the average score and standard deviation for all the claims in our survey. The higher the average, the more the agreement with the claim; the higher the variance, the more the disagreement within respondents as to the claim. We have listed the claims in Table 1 in decreasing order of variance; thus, we interpret the ordering as going from most controversial claim to least controversial.

Overall, the claim that people disagreed with most (2.63) concerned the riskiness of fixing defects (as compared with new features) and the claim that most people agreed with concerned the benefits of code reviews (4.48).

#### 4.1.1 Controversial Claims

We turn now to the claims that incited the most disparity in the answers; we take these to be controversial claims. The most controversial claim of all relates to the effect of programming language choice on code quality. Most of the developers who disagreed with this statement focused on the notion that programmer's skill matters more than the language (e.g., "Every trade has its master. It depends on who writes the code"). Some focused on application logic (not programming language) as the main determinant of quality ("Most defects stem from the application logic rather than particular platform/tools"). Developers who agreed with this claim focused on language features, such as static typing or memory management (e.g., "Because statically typed languages make mistakes more difficult", "Managed code is designed to be less prone to defects"). Interestingly, as it turns out, this is a topic on which there is limited literature, with results just recently starting to emerge [46]; this certainly has long been a controversial topic, and one mightn't expect developer opinion on this much-debated topic to be moved towards consensus by just one publication.

Moving through the most-controversial list, the next claim relates to defect repair commits being riskier than new feature additions. Developers who disagree felt that bug fixes involve small-scope changes, which are less risky (e.g., "defects are generally small and localized; features are broader"); other felt that all types