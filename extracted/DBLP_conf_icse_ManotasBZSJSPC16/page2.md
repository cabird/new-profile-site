![Flowchart of the applied research methodology](page2_img_1.png)

Figure 1: The applied research methodology.

energy usage when they write requirements, design, construct, test, and maintain their software.

The contributions of this paper are:
- Interviews of 18 professional practitioners from Microsoft that provide in-depth, qualitative information about the green software engineering state of practice.
- A survey of 464 developers and testers from ABB, Google, IBM, and Microsoft that quantitatively assesses the themes and insights of the interviewees.
- An analysis of the collected data that identifies practitioners’ perspectives on green software engineering throughout the software development process.
- A discussion that (1) contextualizes the state-of-the-art in green software engineering research with respect to the study’s findings, and (2) suggests, for each stage of the software development process, directions for future green software engineering research.

## 2. METHODOLOGY

Figure 1 depicts our research methodology. At a high-level, it has two main components: interviews and a survey. Individually, each of these approaches has strengths and limitations; combining them leverages their individual strengths and reduces their individual weaknesses. Interviews are useful for gathering a wide range of qualitative observations and insights and for gaining an understanding of the broad context and environment that the interviewees operate in. In addition, their interactive nature allows for collecting in-depth information about participants’ thoughts and opinions. However, their high costs restrict the number that can be performed. Conversely, surveys allow for collecting only a limited amount of data from each respondent. However, their low costs allow for reaching a large number of respondents which provides generalizability. Conducting a survey after performing interviews enables us to quantify and generalize the results obtained from the interviews over a larger population and to quantitatively assess themes that were implied by the interview participants.

### 2.1 Interviews

The first step in our methodology was to interview practitioners at Microsoft. These interviews were purely exploratory and were not intended to provide generalizability. Rather the goal of this step was to learn about how the participants think about energy usage in the context of software development from a variety of perspectives and domains.

#### 2.1.1 Protocol

We used semi-structured, in-depth interviews based on an interview guide to enable a detailed exploration of the participants’ views and experiences using a flexible and responsive approach [22]. Interviews were audio-recorded at each participant’s office, with participant permission, and lasted between 30 to 60 minutes each.

At a high level, the interviews had four main parts. First, the participant was asked some general demographic questions. Second, the interviewers asked about the participant’s views on energy usage. This positioned the participant on the spectrum of energy usage and allowed the participant to speak openly about their experiences and opinions about energy usage while limiting bias from the interviewers. Third, the interviewers began to converse with the participant by asking open-ended and clarification questions based on the second part of the interview. The interactive nature of the conversations allowed the interviewers to gather detailed information about the participant’s experiences with techniques, policies, specifications, patterns, contexts, failed and successful attempts, etc. For example, questions like “Do you have a baseline platform that you use?” and “What have you seen teams do today to determine if there are energy issues with their applications?” were posed to several participants. Finally, the interviewers thanked the participant, explained how their responses would be used, and asked whether there was anything else they wanted to mention that was not previously covered.

### 2.1.2 Participants

We identified an initial group of practitioners through multiple means including using mailing lists related to energy use, querying the employee database with energy-related keywords, and communicating with product group managers to find employees that deal with energy. We included practitioners who appeared to have experience with green software engineering from areas such as mobile application development and server-side infrastructure. Because our goal was to learn about as many perspectives as possible, we ensured that the participants came from a range of projects and platforms and had various roles and levels of seniority. Such a selection strategy is called Maximum Variation Sampling [45] and is appropriate, as in this case, when a sample may be limited and “the goal is not to build a random and generalizable sample, but rather to try to represent a range of experiences related to what one is studying.”

The initial group of participants was expanded using the snowball process—participants were added based on recommendations from current participants—until the data saturation point was reached [4]. That is, once new interviews yield no additional information, further interviews will yield only marginal (if any) value [17]. Using the snowball process allowed us to access the hidden population of experienced green software practitioners—practitioners who we would otherwise be unable to identify—without incurring prohibitive costs. In total, we interviewed 18 participants, a number similar to those used in related work (e.g., [25, 28]).

#### 2.1.3 Data Analysis

We used open, axial, and selective coding to qualitatively analyze the data obtained from the interviews [15, 55]. A professional transcription service transcribed the audio recordings and divided them into 355 segments based on distinct