# The Effect of Work Environments on Productivity and Satisfaction of Software Engineers

Brittany Johnson, Thomas Zimmermann, Senior Member, IEEE, and Christian Bird, Member, IEEE

## Abstract—
The physical work environment of software engineers can have various effects on their satisfaction and the ability to get the work done. To better understand the factors of the environment that affect productivity and satisfaction of software engineers, we explored different work environments at Microsoft. We used a mixed-methods, multiple-stage research design with a total of 1,159 participants: two surveys with 297 and 843 responses respectively and interviews with 19 employees. We found several factors that were considered as important for work environments: personalization, social norms and signals, room composition and atmosphere, work-related environment affordances, work area and furniture, and productivity strategies. We built statistical models for satisfaction with the work environment and perceived productivity of software engineers and compared them to models for employees in the Program Management, IT Operations, Marketing, and Business Program & Operations disciplines. In the satisfaction models, the ability to work privately with no interruptions and the ability to communicate with the team and leads were important factors among all disciplines. In the productivity models, the overall satisfaction with the work environment and the ability to work privately with no interruptions were important factors among all disciplines. For software engineers, another important factor for perceived productivity was the ability to communicate with the team and leads. We found that private offices were linked to higher perceived productivity across all disciplines.

## Index Terms—
productivity, satisfaction, physical environments, work environments, software engineering, program management, IT operations, marketing, business program & operations.

## 1 INTRODUCTION
Software engineering research has investigated many aspects of how software engineers work, including how they collaborate [115], [24], how they solve problems [74], how they collect information to accomplish tasks [73], what types of tools they do and do not use [87], and what challenges they face [59], [122]. An important aspect of any work is the physical environment that it takes place in. Many professional software engineers still predominantly work in an office of some sort. However, after years of research into understanding and improving physical work environments, a 2013 survey suggests many office workers are still struggling to work effectively [99]. For example, witness the disagreement regarding closed offices versus open workspaces and the many other types of work environments in use by software organizations [43], [93]. Companies like Google, Facebook, Amazon, and Microsoft all have made changes to incorporate open space into their work environments [69], [13]. Not surprisingly, those affected by these changes are split on their feelings and the potential for those changes to propagate.

While many software organizations have been experimenting with work environments and pride themselves in their creative workspaces, there has been little empirical investigation into the types of physical environments that software engineers work in and even less into what aspects of those environments affect satisfaction and productivity of software engineers. Demarco and Lister’s Peopleware book [35], with the first edition published in 1987, is still the most relevant text about physical work environments for software development.

However, software development has changed significantly over the past decades: today’s software teams and engineers are often global and collaborate across borders and time zones [61], [21], [109], practice agile software development [9], [26], [40], frequently use social coding tools such as Stack Overflow and GitHub for their work [116] and often work using laptops or their own devices. Today’s software engineers deal with more complexity, can build large systems fast in the cloud, store billions of lines of code in a single repository [102], and release software frequently, often multiple times a day [1]. They use on average 11.7 communication channels [117]; in 1984, the primary communication channels for software engineers were phone calls and in-person meetings [34]. The more collaborative and continuous nature of today’s development practices call for a new investigation of work environments focused on software engineering.

While research looked into understanding and improving physical work environments over the past decades (for example research published in the Journal of Corporate Real Estate; see the discussion of Related Work in Section 2), all this work focused on office workers in general but not on software engineers specifically. While software development takes place in offices, it is fundamentally different from other types of office and/or knowledge work [70], [100], [71]: software development is highly collaborative, projects are often big (often thousands of people, billion lines of code, millions of users), and as a result software engineers deal with high complexity, both on a social and technical level. Software engineers are considered the cutting edge of knowledge work: “In many ways, they’re the prototype of the future knowledge worker; they’re pushing the boundaries of twenty-

- Brittany Johnson is with University of Massachusetts, Amherst, Massachusetts, USA. E-mail: bjohnson@cs.umass.edu. Brittany Johnson performed this work while being an intern at Microsoft Research.
- Thomas Zimmermann is with Microsoft Research, Redmond, Washington, USA. E-mail: tzimmer@microsoft.com
- Christian Bird is with Microsoft Research, Redmond, Washington, USA. E-mail: cbird@microsoft.com

---

first century knowledge work.” [70] Many believe that companies can learn from successful software development teams [100], [71] and in fact many popular collaboration and productivity tools have been invented by programmers (for example email, spreadsheets, the Web, Wiki sites, and Slack).

We posit that a software organization’s most valuable assets are its engineers. Understanding the ways that the physical environment affects engineers’ job satisfaction and productivity can help a software organization reduce attrition and avoid overworking engineers. Improving productivity across the workplace by even a small percentage can have significant impact, potentially more than a small improvement to a development tool. However, relying on research that was conducted on office workers who are not software engineers (like most research on physical work environments) poses a risk for software organizations because it is not known to what extent any findings extend to the software engineering context.

To address the lack of empirical data on work environments in software development, we carried out an empirical study of physical work environments at Microsoft, a large software company. We present the results of a mixed methods study that employed both qualitative and quantitative analyses to understand how work environments relate to perceived productivity and employee satisfaction. Specifically, this paper a) characterizes work environment factors, b) indicates which factors engineers care about and why, c) investigates the impact of these factors on perceived productivity and satisfaction, and d) contrasts the impact of these factors on software engineers with office workers in non-development roles at Microsoft.

The main contributions are:
- Empirical evidence of work environment factors that affect the satisfaction and perceived productivity of software engineers (Section 4).
- Models of software engineer satisfaction and productivity, built using different work environment factors (Section 5).
- Comparison of software engineers to other office workers in the Program Management, IT operations, Marketing, and Business Program & Operations disciplines (throughout Sections 4, 5, and 6).

## 2 RELATED WORK

### 2.1 Physical Environment

While the physical work environments of software engineers have received little attention of late (most work is over 20 years old), there does exist research on the topic.

A foundational publication on improving work environments is from the IBM Santa Teresa lab in the 1970s as described by McCue [79]. IBM designed a building based on computer programmers’ needs (private work spaces that allow concentration) and conducted an evaluation of some of the offices. The research team selected a group of 10 IBM programmers and allowed each to pick the office arrangement they preferred. In the months that followed, they conducted interviews with the programmers and altered designs based on feedback given. They found that the programmers preferred the new office arrangements for a number of reasons, such as ample space, leg room without obstructions, and flexibility in individual office spaces.

Boehm et al. [130] observed in a 1980 software productivity study that the work environment is an important component on the productivity of software engineers. In interviews with an undisclosed number of managers and software “performers,” Boehm et al. observed that “there was a general consensus that the primary avenues for improving software productivity were in the areas of management actions, work environment and compensation, education and training, and software tools.” After a change to a development team’s work environment based on the study, two surveys conducted six months apart indicated that the work environment aimed at increasing productivity had a real impact on engineers’ daily activities.

Another seminal work is by DeMarco and Lister [34], [35] on the effects of the workplace on programmer performance published at ICSE 1985. In their study, 166 programmers from 35 different organizations participated in a one-day programming competition called Coding Wars. In the competition, programmers paired up to compete, each pair coming from the same organization, and logged the time it took to complete various programming tasks. The competition took place in participants’ own work environments during normal work hours using the same tooling and resources used at work. DeMarco and Lister found that characteristics of the workplace and the organization explained a significant part of the variation in programmer performance. The top 25% had more physical floor space, more access to quiet and private workspaces, and the ability to reduce interruptions (e.g., silence phone, divert calls). DeMarco and Lister further validated their previous survey with more surveys and interviews; new findings can be found in the famous Peopleware book, now in its third edition [35]. In Peopleware, DeMarco and Lister focus on all aspects related to people in software projects, including the office environment but also other topics such as managing human resources, choosing the right people, and growing teams.

These works are similar to ours in that they are all interested in exploring the relationship between work environment and productivity of software engineers. Our work builds on existing work in this area by attempting to narrow in on factors that contribute to or take away from productivity of software engineers and which factors are most important to consider. We also identify factors that may be specific to individuals that work in software development.

There exists a significant body of literature on physical work environments outside of the software engineering domain. Table 1 lists prior studies that have examined the impact of various workplace factors on productivity that are related to or overlap with the factors examined in this study. For each study, we provide the factors examined, the context/subjects of study, and a summary of the findings. For a comprehensive overview of studies focused on physical office environments, including a historical perspective, we direct the reader to the extensive literature review by Davis et al. [33]. The work presented in this paper builds on some of the earlier research on physical work environments—using a mixed-methods, multiple stage research design we independently find similar but also some different results for software engineers by comparing them to other types of office and knowledge workers.

Allen studied the impact of office layout and distance between offices and found that as distance increases and face to face communication decreases, the use of all forms of communication and collaboration decreases as well [2]. He found that 50 meters is a critical distance for technical communication. Congdon et al. explored the importance of privacy in work environments and discovered that while open workspaces promote collaboration, organizations must also provide workspaces that insulate from distraction for privacy and solo work when needed [27]. Romano

---

### TABLE 1
Related work examining the impact of various workplace factors on productivity.

[Image: page3_img_table_1.png] Three-column table summarizing prior empirical work: the left column lists the cited papers (e.g., Thomas Allen [2], Congdon et al. [27], Romano et al. [106], Leaman & Bordass [75], Oldham [90], Oldham & Brass [91], Oldham & Rotchford [92], O’Neill [94], Nielsen [88], Haynes [60]); the middle column states the specific factor studied (office layout/distance, privacy level, noise, control of heating/lighting/ventilation/noise, workspace density, open-plan effects, architecture/light, adjustability/storage/enclosure, open office layout, and comfort/interaction/distraction); the right column describes method and context (examples include interviews/surveys of science and engineering organizations, lab experiments with 55 and 42 final‑year students, UK surveys, a survey of 65 claims adjusters, questionnaires with 128 newspaper employees, a survey of 114 employees across 19 offices, a 541‑worker US survey, digital-record analysis of a 1,200‑person engineering organization, and a survey of 1,418 UK office workers). The table therefore maps each seminal study to which environmental factor it examined and the sample or methodology used, providing an overview of empirical evidence linking physical workplace features to worker outcomes.

and colleagues conducted an in situ study on the effects of noise on productivity in the context of college seniors performing industrial software engineering tasks [106]. They observed that noise had a negative impact on students asked to fix faults in Java code but did not observe a statistically significant effect on students asked to comprehend functional requirements. Leaman and Bordass explored the value of employees having control over their environment in terms of heating and cooling, noise, ventilation, and lighting [75]. For each of those factors except for lighting, control over the factor had a statistically significant positive impact on productivity.

Oldham studied workspace density (the amount of square feet per employee) in the context of office moves and reported that employees who moved from a higher density open space to a lower density open space or to partitioned offices showed statistically significant increases in task and communication privacy, crowding, and office satisfaction [90]. Oldham and Brass studied the impact of moving to open plan offices. They found that self-reported satisfaction and ability to concentrate both declined to a statistically significant degree after an organization moved to an open workspace layout [91]. In a later study, Oldham and Rotchford examined the architectural accessibility, workspace density, and light in the workplace. They concluded that dark offices are correlated with low satisfaction. Dense offices with fewer square feet per employee led to increased conflict and less satisfaction [92].

O’Neill looked at adjustability, storage space, and characteristics of the enclosure in offices [94]. The findings were that storage and adjustability of the physical office workspace contributed directly to satisfaction and productivity. The enclosure played only a minor role in predicting satisfaction and productivity. Nielsen studied the differences in a team before and after moving to an open office layout at Microsoft [88]. Nielsen observed that when engineers moved to open workspaces, they experienced increased collaboration and less travel time to meetings due to decreased distance between them. Haynes explored the impact of comfort, office layout, interaction, and distraction on self-assessed productivity and concluded that interaction and distraction have the greatest positive and negative influences on productivity.

## 2.2 Software Productivity

A significant amount of research investigated how to measure productivity in software development [82], [124], [97], [96], [118], [105]. Most research in software engineering defines productivity in terms of the rate of output per unit of input, often time-based. To give a few examples:

- number of modification requests and added lines of code per year [85],
- number of tasks per month [133],
- number of function points per month [66],
- number of source lines of code per hour [38],
- number of lines of code per person month of coding effort [14],
- number of editing events to number of selection and navigation events needed to find where to edit code [72].

In this paper, we do not use automated productivity measures because there is no consensus on the “right” measurement of productivity [97]. Furthermore, it is difficult to measure and analyze productivity on a large scale across teams because it is impossible to control for all factors that can influence productivity measurements, for example, job role, vacation, management responsibilities, project type, release cycles, etc. Instead we ask software engineers and office workers to self-report their perceived productivity. This enables us to do comparisons across disciplines, e.g., are the same factors important for employees in the software engineering discipline as in the marketing discipline. Perceived productivity is commonly used in research on physical work environments [60] and software engineering [57]. There is evidence that self-reported productivity converges to observed, measured productivity [57].

Several papers identified factors that can affect software productivity. Wagner and Ruhe conducted a systematic literature review of 400 papers to better understand the relationship between factors that can affect productivity [125]. They gathered a few factors related to work environment such as suitability for creativity and team member distribution. Based on a literature review of 126 publications, Trendowicz and Münch found that the productivity of software development processes depends significantly on the capabilities of software engineers as well as on the tools and methods they use [119]. Paiva and colleagues identified a collection of factors that affect productivity from literature and ranked the factors based on a survey of software developers [95]. A silent and comfortable work environment was ranked as a high positive influence factor for productivity.

## 2.3 Satisfaction in Software Engineering

Simply put, job satisfaction is whether an employee likes the job or not. A more formal definition of satisfaction is “a pleasurable or positive emotional state resulting from the appraisal of one’s job or job experiences” [78]. Historically, job satisfaction has been studied since the 1930s, for example by Hoppock [62] who studied how job satisfaction is affected by both the nature of the job and

---

the relationships with coworkers and supervisors. Since then it has
been studied with respect to many aspects of organizations, for
example turnover [101], [84], employee citizenship and affect [8],
and absenteeism from work [53]. Satisfaction has also been
linked to more productive employees. Judge et al. [67] reviewed
the relationship between job satisfaction and job performance
with two meta-analyses and estimated the mean true correlation
between overall job satisfaction and job performance to be .30.
For a detailed introduction to job satisfaction, we recommend the
books by Cranny et al. [30] and by Spector [110].

In recent years, there has been a rich line of inquiry into
the affect, emotions, and satisfaction of software developers. A
great example of such work is by Graziotin and colleagues [57].
Happiness is often related to (but not the same as) satisfaction,
and Graziotin and colleagues have focused on understanding the
factors that lead to and detract from developer happiness [54]
as well as software engineering outcomes that result when de-
velopers are happy or unhappy [55]. Among other things, they
find that happy developers are more productive [56]. Wright and
Cropanzano [131] noted that research may conflate happiness and
job satisfaction, which they define as “an internal state that is
expressed by affectively and/or cognitively”.

Satisfaction is also related to employee motivation. Beecham
et al. [10] conducted a systematic literature review to examine
motivation in the context of software engineering and identified
factors that motivate or demotivate. They found that along with
other factors such as rewards and incentives, good management,
belonging, and identification with the tasks, the appropriate work-
ing conditions, equipment, and physical space are motivators of
developers. Sharp [107] proposed a model of motivation, based on
existing literature, that includes motivators, outcomes, character-
istics, and context. França et al. explored the factors impacting
motivation in diverse software engineering settings [48], [47],
[49]. While motivation is related to satisfaction, França points out
that there is a difference and that while there is overlap, motivated
developers are not the same as happy developers [50].

For this paper, we focus on a specific aspect of job satisfaction:
the satisfaction with the work environment and its relation to
productivity of software engineers.

## 3 METHODOLOGY

We followed a mixed-methods design for our study methodology
with multiple stages: We sent out an (1) initial survey to recruit
participants for (2) interviews. After the interviews, we sent out
a (3) follow-up survey to quantify some of the findings from the
qualitative analysis of interviews.

The study materials (surveys, interview guide) are available as
a technical report [65] and as supplemental materials.

### 3.1 Recruitment Survey

**Protocol.** To recruit participants for interviews, we sent out a
short, anonymous survey. We decided to make the survey anony-
mous to encourage honesty, especially when discussing dislikes in
the work environment. On this survey, we asked three open-ended
questions:

1) If you could describe the typical environment in your work-
   space in two words, what would they be?
2) What do you like about your work environment?
3) What do you NOT like about your work environment?

At the end of the survey, we gave participants the opportunity to
enter via email into a raffle for a one of two $50 Amazon.com gift
certificates and to express interest in participating in an interview.

**Participants.** We sent the survey to 1,252 individuals with an
engineer or program management position at Microsoft in the
Puget Sound area (Redmond, Bellevue, Kirkland, Seattle), where
the main headquarters are located. We focused our attention on
employees in the Puget Sound to recruit participants for in-person
interviews (as opposed to Skype interviews) that we can feasibly
conduct in the employee’s work space. We received a total of 297
responses (response rate of 23.7%).

**Data Analysis.** Since the main purpose of the survey was to
recruit participants for interviews, the analysis was limited to
manually identifying common likes and dislikes in the responses
and to visualizing the two words used to describe the current work
environments with word clouds (commonly used in exploratory
data analysis [81], [25]). Negative words associated with work
environments were loud, noisy, distracting, and crowded, while
positive words associated with work environments were quiet,
collaborative, friendly, productive, and comfortable. While the
analysis of the recruitment survey helped us getting a general idea
of how employees feel about their work environments, the results
reported in this paper are based on the data from the subsequent
interviews (Section 3.2) and follow-up survey (Section 3.3).

### 3.2 Interviews

**Protocol.** We conducted semi-structured interviews to get detailed
accounts from employees about their work environments. Each
semi-structured interview lasted approximately 30 minutes and
was recorded. We divided each interview into three groups of
questions: background questions (job title, job responsibilities,
typical work day), questions about their current environment,
and questions about possible improvements in the physical work
environment. Most interviews were done by two authors of this
paper: one asked questions, the other took notes.

Some of the questions in the interviews were the following:

1) What in your current environment has a positive effect on
   your productivity?
2) What in your current environment negatively affects your
   productivity?
3) What do you do when you are not feeling productive?
4) What specific improvements would you like to see made to
   your work environment?
5) What would be your ideal work environment?

At the end of each interview we asked participants for per-
mission to take photos of their work environment. When this
was not possible, for example, in secured workplaces that require
special clearance, we asked participants to sketch the work envi-
ronment. The complete interview guide is available as a technical
report [65].

**Participants.** Of the 297 people that completed our survey, 53
expressed interest in participating in an interview. From this group
we selected a diverse sample in terms of gender, job role, and type
of work environment until we reached saturation at 19 interviews.
To check for saturation, after each interview the interviewers
discussed findings and observations and whether the findings
had been encountered in previous interviews. We stopped after
three interviews with no new findings. Stopping after saturation
is standard procedure in qualitative studies [58], [4]. Of the

---

19 interviewees, 11 were male and 8 female; 8 were software engineers and 11 program managers; 15 shared offices and 4 had personal offices.

### Data Analysis

Once we completed the interviews, we extracted statements (quotes) that participants made about their work environment. The first author listened to each interview and transcribed the parts of the interview that were related to work environments. The quotes were extracted from the entire interview, that is, all questions (positive aspects, negative aspects, and improvements), because the goal of the analysis was to identify themes related to work environments in general.

The author only transcribed quotes that were relevant to work environments and excluded irrelevant quotes. For example, one participant shared a five minute story about open home designs which eventually led to a complaint about some aspect of open work environments. Rather than transcribing the entire story, we only transcribed the parts of the story that were relevant to her reasoning for not liking open work environments. We expect that our decision to exclude off-topic discussions at transcription time has very little to no impact on the validity and reliability of the results, since the quotes would have been discarded in the subsequent card sorting step anyway. We do not expect that any context information was lost because the transcription was done by the first author who attended and led every interview. Thus she was able to focus on the points of interest for work environments while situating quotes in the context of the interview as a whole.

Once all relevant portions of each interview had been transcribed, we employed open card sorting to identify themes in the data [63], [134]. Card sorting is a technique that is widely used to create mental models and derive taxonomies from data [111]. Card sorting has three phases: preparation, execution, and analysis.

In the preparation phase, we put each quote on its own note card; in total, we had 589 cards. Next in the execution phase, we used a two-pass approach to sort cards into groups of similar cards. Each group was given a descriptive title (code).

1. The first pass was completed by four people: the first and second author along with two other colleagues (who are not authors of this paper). The card sort began with collaboratively sorting the cards into groups and discussing these examples for clarity. Once everyone agreed on the groups in the first batch, each person sorted a subset of the remaining cards independently. As new groups emerged, we discussed each and what kind of cards should go into that pile. The first pass yielded 33 groups. We discarded cards that did not directly relate to the work environment into an “off-topic” pile; for example, a couple of participants mentioned how they do their to-do lists, which is not a physical environment related issue.

2. The first author did a final validation pass to check for consistency and to make sure that each card was sorted into the correct pile. In this pass, two groups were added (Space Utilization and Movement Between Environments) and one code was removed (Work/Life Balance); cards that fell under Work/Life Balance were moved to the Private/Personal Space or Breaks groups. As a result, the number of groups increased from 33 to 34. The 34 groups C1...C34 are expanded on at the end of the paper in Section 12.

Finally, in the analysis phase, we derived a set of six themes from the 34 groups. A theme is a higher level of abstraction of the topics brought up in the interviews. Table 2 shows the mapping of the final list of groups (C1...C34) to the six themes: personalization, social norms, room composition & atmosphere, work-related environment affordances, work area & furniture, and productivity strategies. The six themes will be discussed in Section 4.

We include the count of cards for each group for completeness. Note that the count should not be mistaken as importance of a group or theme. For the interviews, we focused on selecting a diverse group of employees, which is not necessarily representative of the entire population. Furthermore, since we followed a semi-structured interview protocol, some prompts may have inflated the count of cards in a group. Quantifying inherently qualitative data such as responses to open-ended questions carries some risks. For example, when the Pew Research Center asked about the single issue that mattered most in deciding how participants voted for president, 35% responded the economy in an open-ended question; however, when the economy was explicitly offered in a multiple-choice question, 58%, more than half, chose the economy [98].

### TABLE 2

The six themes derived from 34 groups. The count of cards in each theme/group is reported in parenthesis.

[Image: page5_img_table_1.png] This table summarizes the result of the open card‑sorting of 589 interview quotes into 34 groups (C1–C34) and six higher‑level themes, with the number of cards in each group shown in parentheses. Theme totals (shown in the headers) indicate frequency: Room Composition & Atmosphere (119×) and Work‑Related Environment Affordances (106×) were the largest themes, followed by Work Area & Furniture (86×), Productivity Strategies (84×), Social Norms (67×), and Personalization (50×). Individual high counts include C11 room composition (37×), C29 natural light (30×), C4 team dynamics (30×), C24 temperature (23×), C23 furniture (22×), and C3 environment change requests (22×). The table therefore highlights that issues about who shares space and its atmosphere (noise, composition, proximity to team), affordances for private/secure work and rooms, and furniture/comfort were the most commonly mentioned topics in the interviews.

---

## 3.3 Follow-up Survey

**Protocol.** Using the themes that emerged from interviews, we designed a survey on work environments that would help validate our interview findings and potentially yield new findings. Because there is a large body of research that exists on work environments, we designed our survey to build on existing findings and answer questions existing research has not yet explored. For example, there exists research that has explored workspace personalization that focuses on the ability or inability to personalize and how much personalization is permitted [77]. To build on these findings, we asked questions on our survey to determine if and how employees personalize and reasons they have for not personalizing their work area. Other factors we included based on prior work include ability to easily communicate with coworkers [2], [112], the ability to work privately [91], [120], proximity to windows and natural light [75], [92], [41], accommodations for working outside normal working hours [15], decorations in the workplace [94], furniture [123], and noise control [22], [106]. We also included two additional factors that came up repeatedly in our interviews: the ability to easily do secure or confidential work and cable management.

**Survey Design.** In total the survey had 29 questions. This includes demographic questions (years at Microsoft, age, gender, has experience with shared environments), questions about their work area (building, number of people in current work environment), and a few open-ended questions (e.g., tasks that the work environment is most fit to accommodate). The following three questions were central to the survey and answers were required to complete the survey.

- Q12: Overall, how satisfied are you with your work environment? (Very Satisfied, Satisfied, Neutral, Dissatisfied, Very Dissatisfied)

- Q13: Please denote your satisfaction with the following aspects of your work environment: (Very Satisfied, Satisfied, Neutral, Dissatisfied, Very Dissatisfied, Not Applicable)
  - Ability to communicate with my team and/or leads
  - Ability to do secure or confidential work
  - Ability to personalize work space
  - Ability to work privately, with little to no interruptions
  - Access or proximity to windows
  - Accommodations for working outside normal work hours
  - Cable management
  - Decoration
  - Furniture
  - Noise control

- Q14: Please rate the following statements in terms of your agreement with each: (Strongly Agree, Agree, Neutral, Disagree, Strongly Disagree, Not Applicable)
  - I feel most productive in my work space.
  - I can easily find a focus room or meeting room when I need one.
  - (11 additional statements not used to report findings in this paper)

Although question Q14 asked agreement with thirteen statements, for this paper we only considered the statement “I feel most productive in my work space” in order to build productivity models and “I can easily find a focus room or meeting room when I need one.” to analyze the availability of meeting rooms.

> As mentioned before, in addition to the above questions, we had questions about topics that emerged from the interviews such as social norms, signaling, productivity strategies, personalization, furniture, noise control, and room composition. Most of these were Likert-scale questions. We piloted the survey with a small group of employees to avoid misunderstandings and ambiguous interpretations of the questions. The full survey text is available as a technical report [65].
>
> **Participants.** We sent the survey to over 3,000 randomly selected employees within Microsoft and got 843 responses (response rate 28.1%). For this survey, we invited employees in the Software Engineering and Program Management job disciplines as well as employees from the non-engineering professions of IT Operations, Marketing, and Business Program & Operations (BPO) to facilitate comparison with software engineers.
>
> [Image: page6_img_table_1.png] A three-column table listing five job populations with the number invited and number who responded (with response percentage) to the follow-up survey. Entries: Software Engineering — invited 1,591, responded 298 (18.7%); Program Management — invited 548, responded 131 (23.9%); IT Operations — invited 546, responded 162 (29.7%); Marketing — invited 516, responded 103 (20.0%); Business Program & Operations — invited 467, responded 142 (30.4%). Response rates therefore varied across disciplines (lowest for Software Engineering at 18.7%, highest for BPO at 30.4%); these per-discipline samples were used for the survey analyses and comparisons reported in the paper.

For completing the survey, participants could enter a drawing of one of four $100 Amazon.com gift certificates. In the survey, about 70% of participants identified as male and roughly 30% female. Participants’ time working at Microsoft ranged from less than a year to 26 years (median 7.5 years), with age ranging from 22 to 63 years old.

Data Analysis #1 (Models). We conducted a variety of analyses on the survey data to determine and quantify factors in the work environment that affect perceived productivity and satisfaction.

- To model satisfaction, we used linear regression to build a satisfaction model S1. We used the agreement to the question “Overall, how satisfied are you with your work environment?” from the survey as the dependent variable; the independent variables were the individual satisfaction scores for the factors from Q13. Linear regression is a standard, statistical technique to analyze and model data [127].

- To model perceived productivity, we used linear regression to build two productivity models M1 and M2. For both productivity models, we used the agreement to the statement “I feel most productive in my work space” (from Q14) as dependent variable. In the first productivity model M1, we used as independent variable the overall satisfaction (Q12) and the satisfaction with the individual factors from Q13. In the second productivity model M2, we used as independent variables the number of people in the office, the presence of social norms, and the time in the current environment in years.

We computed the models S1, M1, and M2 for each of the five job disciplines: Software Engineering, Program Management, IT Operations, Marketing, and Business Program & Operations (BPO). The results will be discussed in Section 5.

We treated Likert scores as numeric values from 1 (Strongly Disagree/Very Dissatisfied) to 5 (Strongly Agree/Very Satisfied). This assumes that the scale is interval-based, i.e., the distance between Strongly Agree and Agree is the same as between Agree and Neutral. This assumption may not always be true and in fact

---

There has been a debate on whether linear regression can be used to analyze Likert response items; we discuss the debate in more detail in Section 8. Norman stated that the use of linear regression is acceptable with Likert data ("parametric statistics can be used with Likert data, with small sample sizes, with unequal variances, and with non-normal distributions") [89]. Carifio and Perla [20] suggest using a higher standard for appropriate p-values when Likert scores are used in linear regression models. To enable the reader to understand which items would be excluded through a more stringent statistical significance requirement, we report the p-values for the regression coefficients.

To address concerns of collinearity, we checked for high correlations among explanatory variables. We chose 0.7 as the threshold for high correlations because it has been used in other studies based on linear regression [80]. For each pair of two highly correlated variables, we included only one variable. As a result, the factors "Ability to personalize workspace" and "Noise control" were removed from the satisfaction and productivity models because of high correlations with the factor "Ability to work privately, with little to no interruptions." In addition, we checked for Variable Inflation Factors (VIF). A common practice is to remove any variables in the final model that have a VIF score higher than 5 as suggested by Fox [46]. None of the factors in our models had a VIF score higher than 5; most scores were lower than 2.5.

For the discussion of the results, we chose simple effect sizes over standardized effect sizes because the range and unit of variables is the same within all models (Likert agreement from 1 to 5 for Tables 3 and 4 and binary variables for Table 5). Although standardized effect sizes can be valuable, they are not always to be preferred over a simple effect size on the original measurement scale [51], [103]. Baguley [5] lists two main advantages of simple effect sizes: (1) robustness: "the scale is independent of the variance [...] avoids all problems that arise solely from standardization" and (2) interpretability: "simple effect size is scaled in terms of the original units of analysis, it will nearly always be more meaningful than standardized effect size [...] many consumers of research will be familiar with the interpretation of common units of measurement." Simple effect sizes are commonly used in the software engineering literature, for example in work by Cataldo and Herbsleb [23] or Burnett and colleagues [18].

### Data Analysis #1 (Demographics)

To identify how certain demographics responded differently to certain questions, we used logistic regression (for checkbox questions, binary) and linear regression models (for Likert-scale questions, from 1 to 5). Both linear and logistic regression are standard, statistical techniques to analyze and model data [127]. We chose regression models over statistical tests, as it allowed us to control for gender and age and at the same time model how multiple factors affect a response. This was important as the populations had different gender and age distributions; for example, Marketing and BPO had more females than Software Engineering and IT Operations.

In the demographic models, we typically controlled for Population, Gender, Age, and whether the office is Shared. For example, for the question "When it comes to personalization..." and the response "I personalize my work environment", we built a logistic regression model. The dependent variable was whether the response was checked (0 or 1); the independent variables were population, gender, age, and whether the office is shared.

The coefficients that are statistically significant in the regression model point to the demographics that responded differently to the question.

For logistic regression models, which we used for checkbox questions, the effect of the independent variables is often reported as Odds Ratios. An odds ratio indicates the change in odds for a one unit increase of the independent variable assuming all other variables in the model remain constant. As odds ratios can sometimes be difficult to interpret, we report the actual percentages from the survey when possible.

The demographic differences that were identified will be discussed throughout Section 4. In this paper, if not stated otherwise, the findings are statistically significant with a p-value of 0.05 or less. We completed all survey analyses in the R statistical software [104].

## 4 ENVIRONMENT THEMES DISCUSSION

In the following sections, we discuss findings from our study. From our interviews and surveys, we identified various themes and factors related to work environments.

### 4.1 Personalization

A survey conducted by Lingwood explored office workers' ability to personalize their work space [77]. During our interviews, we asked participants how they felt about personalization and whether it was of importance to them. Most participants had some form of personalization and found value in personalizing, but not all participants had strong feelings regarding the ability to personalize. P17, a software engineer, stated the following during his interview:

> "That shelf could completely go away and I would be totally fine with it. But the office looks stark without it. I would probably just have the picture frame, the awards, the crystal could go away."

Based on our observations made during our interviews, we asked questions in the survey related to how workers personalize their environments.

How many people do personalize? In the survey, 67.4% of participants reported that they personalize their work environment (When it comes to personalization, I personalize my work environment). Male participants were less likely to personalize their work space than female participants (63.4% vs. 76.7%, p < .012). With respect to reasons for not personalizing, male participants mentioned more frequently than female participants that they simply do not want to personalize (When it comes to personalization, I do not personalize because I don't want to, 18.6% vs. 5.3%, p < .0001) and that they do not want to bother others in their environment (When it comes to personalization, I do not personalize because I don't want to bother or offend others around me, 6.3% vs. 2.0%, p < .05). After controlling for gender and age, we did not observe any significant difference between the job disciplines.

How do people personalize their work environment? The survey participants personalized their work environment with a variety of things (On or around my desk you will find...):

- Personal or family photos (65.6%)
- Awards (62.0%)
- Coffee mugs (59.7%)
- Posters (35.5%)
- Plants (16.2%)
- Games (18.0%)
- Stuffed animals (12.0%)

Other items that were mentioned were books, art (for example from kids), or food.

---

We observed some gender and age differences in the responses to this question. Male survey participants were less likely to have plants, stuffed animals, and coffee mugs but are more likely to have posters and games than female participants. The older participants were, the more likely they were to have plants, personal or family photos, and awards on or around their desk and the less likely they were to have games.

**Open environments and personalization.** Several interviewees discussed the effects of being in an open environment on being able to personalize. While talking about personalization in his environment, P2 explained one reason people may not personalize, stating:

> “It’s a shared space, so maybe you feel like oh anything I bring in I’ll kind of have to ask if they’re okay with it and everything.”

The quantitative analysis of the survey responses confirmed that participants who currently are in shared environments (like P2) are less likely to personalize than those in private offices (53.6% vs. 78.5% for people with private offices, p < .006).

**Teams and personalization.** For some, personalization takes place on a team level, an observation we made during our interviews. While talking about his work space, P8 spoke about how rather than each person in their environment personalizing their desk, they personalize their work environment as a team:

> “We personalize in certain ways, with our beer fridge and the [nerf] guns. We voted for things like the bookshelf here.”

According to our survey findings, some people do not personalize their desk or area because their team personalizes their work environment. In environments with six or more, the teams were more likely to personalize according to our survey responses (When it comes to personalization, my team personalizes our work environment, 13.2% for participants in environments with 6–14 people, 16.4% for 15+ people in office vs. 6.9% for private offices, p < .002).

### 4.2 Social Norms and Signals

Social norms are “informal rules that groups adopt to regulate and regularize group members’ behavior” [44]. There has been extensive work on the use of social norms as signalling mechanisms, which often including non-verbal means of communicating and co-existing in a shared work environment (for a broad survey of the topic, see the work of Bicchieri and Muldoon [12]). Interviewees, particularly those in open environments, discussed having social norms [132] present in their work environment. For example, a social norm often mentioned was to not interrupt someone when they are wearing headphones. The discussion in this section is based on social norms as perceived and reported by study participants; we do not know whether the actual behavior matched the norms.

**Presence of social norms.** In the survey, 45% of participants reported that social norms are used in their environment (“Are there social norms or signaling mechanisms used in your work environment?”). Contrary to our expectations, social norms were more frequent in private offices (50.7%) than in environments with 15 or more people (35.4%, p < .009). We also found that people in the Program Management (52.2%, p < .012), Marketing (56.8%, p < .002), and BPO (51.0%, p < .009) populations are more likely to have social norms in their work environment than software engineers (35.9%).

**Ambiguity of signals.** Often in our interviews, participants discussed how they communicated that they are busy and do not want to be interrupted in the work space. The most common way was headphones; however, headphones are not always the most effective way. In the interviews, participants pointed out that sometimes it is not clear when it is okay to interrupt others, even when headphones are being used. For example, P15 stated in the interview:

> “I don’t think people are aware that they’re interrupting other people unless they get a dirty look.”

Some people attempt to clarify their availability through non-verbal means, such as sign posting or using their IM status. For example, P18 stated the following during her interview:

> “I have to put up a sign, because everybody thinks I’m ignoring them... so I have a sign that says ‘headphones please knock’.”

**Demographic differences.** We analyzed which social norms are more prevalent for software engineers. People who have worked in an open environment are more likely to use headphones as an availability indicator (I know not to bother someone when they have on headphones, 30.7% vs. 18.1%, p < .0007). Compared to people working in IT Operations (23.2%), software engineers are less likely (8.9%) to use signs as an indicator not to bother someone (I know not to bother someone when they use a signal, i.e. a sign, p < .0003). Several interviews and survey participants indicated that they use IM status to determine someone’s availability. In the survey, we found that age may make a difference with this social norm: an older software engineer is less likely to use IM status than a younger software engineer.

**Seniority and work environment placement.** Another topic that interview participants mentioned surrounded the practice of using seniority (number of years at Microsoft) to determine placement in the work environment. P2 noted during his interview that:

> “Your work environment is directly determined by your seniority.”

However, other participants suggested that when working in open office layouts, seniority may not always be used to determine placement or the placement may not make a big difference because of the open space. This concern was raised for example by P6 during his interview:

> “There’s a battle between people as to who’s gonna get this space... there’s no seniority left. I’m working here for 20 years and I feel like I’m at the same level as someone who just joined. I feel like other people have a luxury.”

However, in the survey analysis we did not observe a statistically significant relationship for seniority of software engineers (number of years at Microsoft) with respect to perceived productivity and satisfaction after controlling for office size.

### 4.3 Room Composition & Atmosphere

Communication and collaboration are both important to the software development process. When it comes to open environments a prominent concern in the interviews was the noise level in the room, which can increase as more communication and collaboration occurs. However, many interviewees expressed concerns about the room composition, i.e., not being close to the right people or being close to too many people, both of which can cause problems such as increased non-productive noise and decreased collaboration and communication.

**Being close to the team matters.** One of the advantages to working in an open environment is the increase in collaboration and communication within teams. When describing his work environment, P12 told us:

> “Collaboration is extremely intense in that room... I sit with a Corporate Vice President and his immediate leadership team in

---

> addition to myself. Simply by sitting in the room I hear all number of things that are important for me to do my job.”

For software engineers new to a company, open environments can be especially useful. P14, who was new to her team at the time of her interview, told us about why she likes her open work environment:

> “Being new, I was able to turn around and quickly ask questions. There’s a lot of communications and even when people are talking about the devices or the new hardware, it was easy for me to pick it up quickly because you just pick it up. You listen, you turn around, and you engage in that conversation.”

Many interviewees shared the sentiment of P14, who noted that the effect of being spread out is magnified the more people you have to associate with on a daily basis. P1 recalled during her interview a time when she was not near her team, stating:

> “I think I’m more productive in the shared workspace here. I think a large part of that is because literally everyone I would ever need to talk to is also right there or at least down the hall whereas I think I spent a lot of time in my old teams having to track down people or a lot of times even just going to a different building to find someone.”

Because room composition was such a prevalent topic in our interviews, and was discussed in previous work on software productivity [125], we asked questions about the people in participants’ work environments in the survey.

The survey responses supported that software engineers feel more productive in open environments if they share that space with team members. Although more software engineers were satisfied in private offices (88.3% satisfaction1), the majority of software engineers who shared open environments with their team members were still satisfied (with team members = 60.6%). Similarly, the percentage of software engineers who felt productive was highest in private offices (91.0% productivity2), acceptable when the office was shared with team members (with team members = 52.3%) and dramatically decreased when an office was shared with no one from the team (without any team members = 22.2%).

Some interviewees suggested that they prefer to not have managers in their work environment. However, survey responses tell a different story. There is a slight increase in overall satisfaction with work environments where managers are present (with team members but not team lead = 58.0%; with team members and team lead = 68.8%). We also see a slight increase in productivity when team leads are present compared to when they are not (with team members but not team lead = 51.0%; with team members and team lead = 56.3%). Participants working in open environments with only people from other teams were the least satisfied and least productive in the survey.

#### Noise

Another prominent topic with work environments, particularly open environments, is noise [35], [95]. In our interviews, many people noted that one problem they wish could be better dealt with is noise control around their workspace. We heard a number of stories similar to that of P10, who mentioned that in her previous work environment, she had a phone. However, in her current work environment “there’s nothing to stop the sound,” therefore she purposefully did not move her phone. Because there’s nothing to stop the sound that travels around her, she would not be able to answer the phone at her desk anyways. P1 may have said it best, stating, “The pro is having everyone in the same room, but the con is also having everyone in the same room.”

### 4.4 Work-Related Environment Affordances

An affordance is what the environment offers the individual [52]. Previous research on work environments suggests the ability for employees to work privately is of importance [28], [35]. Our interviews revealed that software engineers do care about being able to work privately; however, we also found that there are other modes of work that may require certain affordances from their work environment.

#### Secure work

One mode of work that was common in our interviews was secure work, which entails working on confidential projects that cannot be shared with others not working on that project. In the interviews, program managers and software engineers working on secure projects felt that their environmental needs were not always being met. For example, P1 and P14, whose workspaces were closed off from non-secure development, found that their environment did not help their productivity. This stemmed mainly from needing their badge all the times to be able to get into their environment, or the overhead to bring in others to meet. Not having or forgetting their badge when they step out of their environment can decrease productivity just by making them have to take the time to find a way back into their workspace.

Part of this problem, according to some interviewees, is lack of access to a work laptop, something that would make it easier to find somewhere secure to work if your environment itself is not secure. For example, P3 stated:

> “This is my biggest gripe. Why not give developers laptops? Especially when we’re in that building when we were all cramped up in rows. If those people who were sick of hallway conversations could have gone outside and worked on a laptop, they wouldn’t have had to move teams because they couldn’t handle it.”

For P10, a program manager, the problems with secure work stem from not being able to have confidential phone conversations in an open environment. During her interview, she explained:

> “The fact that a lot of my discussions are actually, can be considered to be confidential makes open space a disaster. And you can’t get up every few minutes and go to a phone room. You wanna talk about hurting your productivity, a lot of steps involved.”

#### Conference rooms

Another work environment affordance our interviewees mentioned was the ability to easily book conference rooms. The analysis of the survey responses revealed that there is a positive relation between the ability to find a conference or focus room and overall satisfaction and perceived productivity. When controlling for the different demographics (Population, Gender, Age, Office Type), each one-point increase on the five-point Likert agreement with I can easily find a focus room or meeting room when I need one, corresponds to an increase of 0.211 in satisfaction and 0.167 in perceived productivity. This suggests that the easier it is for software engineers to find conference or focus rooms when needed, the more likely it is they will be satisfied with their work environment and feel productive in it.

### 4.5 Work Area & Furniture

There has been research on the effect of temperature settings and furniture used in work environments on worker satisfaction [22],

1. Percentage of responses Very Satisfied and Satisfied to Q12  
2. Percentage of responses Strongly Agree and Agree to the statement “I feel most productive in my workspace” in Q14

---

[123]. In the interviews, satisfaction with the work area and furniture was also often mentioned.

### Ergonomic furniture
During our interviews, a popular topic of conversation was electric sit-to-stand desks as compared to height-adjustable desks. Sit-to-stand desks can be adjusted for sitting or standing using an electric motor. Many who did not have a sit-to-stand desk wanted one, and those who did have one, loved it. P12 explained the value of sit-to-stand desks, stating:

> “Standing desk is the easiest way to get around the fact that it’s ergonomically horrible to sit at a desk all the time. Ideally we wouldn’t be doing that. I do try to get up and move around as much as possible but I just gotta stare into my screen for a lot of my job so being able to stand up or sit down [without having to leave my desk].”

According to our interviews and survey, fewer people have sit-to-stand desks than do not have them in open environments. This could be in part due to space constraints in some open environments. Continuing the conversation with us about ergonomic furniture, P12 noted that although he would like to have a special ergonomic desk, there’s no room to add such a desk in his current work environment. Some employees might prefer treadmill desks, but they might be too disruptive in an open space. Our findings do not indicate which type of ergonomic furniture is the best investment. However, it is clear that the furniture provided to a software engineer can affect how productive they are in their work environment, or at the very least how productive they feel.

### 4.6 Productivity Strategies
In the interviews, participants mentioned several strategies that they take when feeling unproductive in their work environment. Similar to previous studies and surveys, we found that working from home and working in different locations are common productivity strategies.

#### Productivity strategies in open environments
Based on our analyses, there are productivity strategies that software engineers may use more often when in an open environment, for example, using headphones and leaving the room. During our interviews, P14 and P17 told us that sometimes they may join the conversations going on around them or reach out to others to feel more productive, especially if other efforts are not working. For example, P17 has a routine he follows when feeling unproductive:

> “If caffeine doesn’t work, I try and keep more than one thing going at a time because there are some days you come in and you’re like I just cannot bring myself to look at this code again so go do something else, go talk to somebody about their project they’re doing maybe, or get feedback for people who have asked for it. Go look at other people’s code if they have pending code reviews or something like that. So I try and still do productive things, it’s just not, maybe not my primary project that I’ve got going on.”

Our survey responses confirmed that software engineers who have been in open environments are more likely to join conversations going on around them in an attempt to feel productive by learning from their peers (When my work environment is too noisy, I join the conversation and hope I get something good out of it, 15.4% vs. 10.2; p < .014). The likelihood that this occurs decreases slightly the older the software engineer is.

#### Working from home
Although we expected that most if not all software engineers work from home at least occasionally [15], we got the impression from our interviews that they prefer not to have to do so if possible. P7 and P14 both spoke about working from home, agreeing that though sometimes necessary to get large blocks of work done, they would prefer not have to work from home. We found that employees who have worked in an open environment are more likely to work from home when feeling unproductive (When I feel unproductive, I work from home, 35.8% vs. 26.8%, p < .024). Compared to people in Marketing (43.7%), software engineers are less likely to work from home when feeling unproductive (28.6%, p < .0028).

#### The value of windows
In the interviews, we found out that the value of having windows may go beyond providing natural light [41]. P14 and P16 spoke specifically about the value of having something scenic to look at out of the window. For P14, having a window with a view is a great way to take a micro-break from work. She told us “I love it... it’s nice, sometimes you take a break and I look to my left and I see all the trees and sunlight.” Lee et al. found that a micro-break viewing a green, but not concrete roof city scene, sustains attention [76].

## 5 Statistical Models
We built statistical models for satisfaction and perceived productivity to determine which factors from the interviews matter most to software engineers and, relatively, how much they matter. The models are based on correlations among the survey responses. It is important to recognize that our study design does not support causal inference. While the identified relationships between the factors may suggest a causation, they do not prove the existence. For a more detailed discussion on causality, we refer the reader to Section 8.

### 5.1 Satisfaction Model S1
For each of the five populations (job disciplines), we built a satisfaction model using the survey responses. The dependent variable was the Likert score for the overall satisfaction (Q12); the independent variables were the Likert scores for the satisfaction with individual aspects of the work environment (Q13).

S1: Relationship between overall satisfaction with the work environment and individual aspects of the work environment.
Table 3 shows the coefficients of the regression models for each population. The level of statistical significance is indicated with asterisks: (*) for p < .05, (**) for p < .01, and (***) for p < .001. We can make the following observations:

- The “Ability to communicate with my team and/or leads” is statistically significant and contributes (between 0.152 and 0.415) to overall satisfaction in all five populations. The coefficient is high (0.415) for the software engineering population.
- The “Ability to work privately, with little to no interruptions” also contributed to satisfaction for most populations (0.419 for software engineers, between 0.180 and 0.440 for other populations, not significant for the BPO population). For software engineers, the coefficients were about the same for the ability to communicate with the team and for the ability to work privately, with little to no interruptions, which suggests that they equally contribute to satisfaction.
- For software engineers, the other factors linked to overall satisfaction are “Furniture” (0.114), “Decoration” (0.132), and “Access or proximity to windows” (0.077).

---

## TABLE 3
Factors that contributed significantly to overall satisfaction with the work environment for each population. (Model S1)

[Image: page11_img_table3.png] Table 3 presents linear regression coefficients from Model S1 (overall satisfaction as dependent variable) for five job populations (Software Engineering, Program Management, IT Operations, Marketing, BPO) with R2 values shown across the top (e.g., Software Eng. R2 = 0.699). Each row lists an individual work-environment factor and the estimated effect on overall satisfaction (in Likert-scale units) with asterisks indicating statistical significance (* p<.05, ** p<.01, *** p<.001). For software engineers the two largest and highly significant contributors are the ability to communicate with team/leads (0.415 ***) and the ability to work privately with few interruptions (0.419 ***), with smaller but significant positive contributions from decoration (0.132 **), furniture (0.114 *), and proximity to windows (0.077 **). The table also shows that “ability to communicate” is significant across all five populations, “ability to work privately” is significant for most populations, and that factors such as secure/confidential work, decoration, furniture, and windows vary in importance between disciplines (for example, secure work is significant only for Marketing and BPO in this model).

Furniture 0.114* 0.171**

The level of statistical significance is indicated with asterisks: (*) for p < .05, (**) for p < .01, and (***) for p < .001.  
1 The Intercept and the factors “Accommodations for working outside normal work hours” and “Cable management” were not statistically significant in any of the models.  
2 The factors “Ability to personalize workspace” and “Noise control” were not included in the model because of high correlations with the factor “Ability to work privately, with little to no interruptions”.

## TABLE 4
Satisfaction factors that contributed significantly to perceived productivity for each population. (Model M1)

[Image: page11_img_table4.png] This table reports linear regression coefficients (Model M1) predicting self-reported productivity (“I feel most productive in my work space”) for five populations: Software Engineering (R2=0.751), Program Management (R2=0.646), IT Operations (R2=0.721), Marketing (R2=0.637), and BPO (R2=0.593). Overall satisfaction with the work environment (Q12) is a strong, statistically significant predictor in every population (largest for Software Eng. 0.449***), and the “ability to work privately, with little to no interruptions” is also among the largest positive contributors for Software Eng. (0.331***), IT Ops (0.326***), and the other groups. The ability to communicate with team/leads has a consistent positive effect (e.g., Software Eng. 0.200***, IT Ops 0.265***), while other factors vary by group: “furniture” is positively associated with productivity for Software Eng. (0.133**) but negative for Program Management (−0.158*), and “decoration” is slightly negative for Software Eng. (−0.094*) yet positive for Program Management (0.224*) and Marketing (0.206**). Significance levels are indicated by asterisks as in the paper: * p<.05, ** p<.01, *** p<.001.

Furniture 0.133** –0.158*

The level of statistical significance is indicated with asterisks: (*) for p < .05, (**) for p < .01, and (***) for p < .001.  
3 The Intercept and the factors “Access or proximity to windows”, “Accommodations for working outside normal work hours” and “Cable management” were not statistically significant in any of the models.  
4 The factors “Ability to personalize workspace” and “Noise control” were not included in the model because of high correlations with the factor “Ability to work privately, with little to no interruptions”.

### 5.2 Productivity Models M1 and M2
For each of the five populations (job disciplines), we built two models for perceived productivity.

- The first model describes the relationship between perceived productivity and satisfaction with the work environment.
- The second model describes the relationship between perceived productivity and environment factors such as number of people in environment and the presence of social norms.

The dependent variable for both models was the Likert score agreement with “I feel most productive in my work space” (Q14).

### M1: Relationship between perceived productivity and satisfaction with the work environment
Table 4 shows the factors that were statistically significant. The level of statistical significance is indicated with asterisks: (*) for p < .05, (**) for p < .01, and (***) for p < .001. We make the following observations:

- The “Overall satisfaction” factor was significant and made a high contribution (between 0.284 and 0.449) to perceived productivity in all five populations. The coefficient was high (0.449) for the software engineering population, which suggests that the overall satisfaction with the work environment contributes substantially to productivity. This finding suggests that workplace satisfaction is a key contributor to productivity of software engineers. This finding is consistent with previous research that found a relationship between satisfaction and productivity [67].

- Other contributors to software engineer productivity are the “Ability to work privately, with little or no interruptions” (0.331) and the “Ability to communicate with my team and/or leads” (0.200). The ability to communicate with team members had a smaller contribution than expected, possibly because of a wide variety of communication tools that are available to software engineers such as email, instant messaging, voice calls, screen sharing, and asynchronous code review tools.

- The factors “Furniture” (0.133), “Ability to do secure or confidential work” (0.057), and “Decoration” (–0.094) also contributed to perceived productivity in the statistical model; however, at a less stringent level of statistical significance.

In the models M1 for perceived productivity and satisfaction with the work environment, we included both the satisfaction with individual aspects of the work environment (Q13) as well as the overall satisfaction with the work environment (Q12).

---

## TABLE 5
Environment factors that contributed significantly to perceived productivity for each population. (Model M2)  
Softw. Eng. | Prog. Mgmt. | IT Operations | Marketing | BPO

[Image: page12_img_1.png] This table reports Model M2 regression coefficients (effect on self-reported productivity, 1–5 Likert scale) for five populations with R^2: Software Eng. 0.371, Prog. Mgmt. 0.219, IT Ops 0.331, Marketing 0.217, BPO 0.216. The intercept corresponds to the productivity of an employee in a personal office (anonymized as X); other intercepts are reported relative to X (all significant at p<.001). Increasing numbers of people in the environment are associated with negative effects on perceived productivity across populations (notably for Software Engineers: −1.495*** for 2 people, −2.316*** for 3–5, −1.783*** for 6–14, −1.145*** for 15+; stars indicate significance: * p<.05, ** p<.01, *** p<.001). The presence of social norms or signaling mechanisms shows a positive, significant association with productivity for Software Engineers (0.391*, p<.05) and Marketing (0.526*, p<.05); “Time in current environment” was not a significant predictor in these models.

Time in current environment

The level of statistical significance is indicated with asterisks: (*) for p < .05, (**) for p < .01, and (***) for p < .001.  
5 The Intercept is anonymized with X in the models for Software Engineering model; the other intercepts are reported relative to X.  
6 The factor “Time in current environment” was not statistically significant in any of the models.

- We included the satisfaction with the individual work environment factors (Q13) because they can have a direct relationship with productivity and that relationship can be different from the factors’ relationship with overall satisfaction.
- We included the overall satisfaction (Q12) in the model because previous research found a substantial relationship between satisfaction and productivity [67]. While the satisfaction with individual work environment factors (Q13) already explains a significant portion of the variance of overall satisfaction (Q12), they do not entirely explain the overall satisfaction with work environments; a large portion of the variance is still unexplained (between 0.301 and 0.465 based on the R2 values between 0.535 and 0.699 of the models for S1; see Table 3) because of factors we did not observe. To account for any unobserved factors related to satisfaction, we included the actual self-reported overall satisfaction (Q12) in the model.

Including both Q12 and Q13 in the models may lead to issues with collinearity. To avoid any problems with collinearity in the resulting models, we checked for high correlations and high Variable Inflation Factors (VIF) as described in Section 3.3 (Data Analysis). Based on these checks, we removed some factors (ability to personalize, noise control) but overall satisfaction survived in the models for M1. Among the factors in the final model (Table 4), none had high correlations with each other and no factor had a VIF score higher than 5, most VIF scores were lower than 2.5.

### M2: Relationship between perceived productivity and environment factors (number of people and time in current environment, social norms).
Table 5 shows the factors that were statistically significant. The level of statistical significance is indicated with asterisks: (*) for p < .05, (**) for p < .01, and (***) for p < .001. We make the following observations:

- The intercept was statistically significant in all five populations; it corresponds to the productivity that an employee has who just moved into a personal office with no social norms or signaling mechanisms. The exact values are anonymized for confidentiality. The intercept was highest in the software engineering population (X) and lowest in the Marketing population (0.831X).
- For all five populations, the negative coefficients for 6–14 and 15+ people suggest that in the survey employees in environments with 6 or more people felt less productive.

- Software engineers in any shared environment, even with only 2 or 3–5 people, felt less productive compared to software engineers in private offices. In the statistical models, the effect size on productivity is between −1.145 and −2.316 Likert points for software engineers.
- When social norms are present, they have a significant positive relationship (0.391) with perceived productivity of software engineers. Among software engineers, 35.9% reported the presence of social norms and signaling mechanisms.

To summarize, software engineers in private offices felt more productive than software engineers in shared offices.

### 5.3 Summary
Table 6 summarizes the findings from Sections 4 and 5 and relates them to other empirical studies outside the software engineering domain.

## 6 CAN OPEN ENVIRONMENTS WORK?
The debate is ongoing as to whether open work environments are effective and if so, what makes them effective. Our findings have shed some light on what environmental factors affect productivity in open work environments for software engineers. In short, it is possible for software engineers to feel productive in an open work environment; however, we found a number of factors that could help or hurt productivity in open environments. Although our findings are based on populations from one company, they are the beginning of a more detailed understanding of how to improve work environments for software engineers.

The ability to easily communicate with team members contributed substantially to perceived productivity in our study, for both open environments and private offices and for any population. For some people, the best way to facilitate communication is by working together in a shared work environment; for software engineers in open environments, our findings indicate that sharing the space with their team is important to their productivity. P3 provided an interesting distinction between an effective open environment and non-effective work environment, stating:

> “I like the open shared space, I don’t like open plan if that makes sense. I like our 6-pack, I like having a room sort of this size and people in there... I think when you just have whole floors of rows of people spread out, I think noise travels far. I think you never have any privacy, you never have any sense of this is my space.”

---

## TABLE 6

A summary and comparison of our findings and related findings.

| Finding | Related Findings |
|---|---|
| The “Ability to communicate with team” and “Ability to work privately” contributes strongly to overall satisfaction. | Nearly half (49%) of respondents from Steelcase Workplace Survey reported that the biggest problem in their physical work environment is the need to access others [112]. Oldham and Brass found that employee satisfaction decreases when moved into open office spaces; as did Danielsson and Bodin [32], [91]. |
| “Overall Satisfaction”, “Ability to communicate”, and “Ability to work privately” contributes to perceived productivity. | In contrast, research has found that other environmental factors contribute to productivity, including ergonomic furniture, noise levels, and environment decor [114], [121]. |
| For software engineers, social norms contribute significantly to perceived productivity. | Feldman found that one reason social norms develop is to ensure group satisfaction [44]; we found overall satisfaction contributes significantly to perceived productivity. |
| For software engineers, shared environments are related to decreased perceived productivity. | Oldham and Brass found that employee satisfaction decreases when moved into open office spaces; as did Danielsson and Bodin [32], [91]. We found that satisfaction contributes significantly to productivity. |
| More workers personalize their environments than do not. | Brunia et al. [17], Vischer [121], and Wells [129] studied personalization in the workplace, but did not report on how often personalization occurred in the workplace. |
| Personalization happens less often in shared spaces. | Wells and Thelen found that personalization happens more often in private offices than in shared spaces [128]. |
| The “Ability to personalize” is highly correlated with the “Ability to work privately, with little to no interruptions”. | Wells found that personalization is significantly associated with employee satisfaction with the physical environment, which is positively associated with overall job satisfaction [129]. O’Neill found that employees reported increased satisfaction and productivity when they had control to adjust their office [94]. Oldham and Bordass found that control over one’s office increases productivity [75]. |
| Social norms are less present among software engineers than other groups. | We are not aware of studies that compared the presence of social norms among software engineers with other groups. In the context of software projects, Avery et al. mined social interactions in bug reports to extract norms in a project and externalize this information into a codified form [3]. |
| Social norms are correlated with increased perceived productivity for software engineers. | Feldman found that one reason social norms develop is to ensure group satisfaction [44]; we found overall satisfaction contributes significantly to perceived productivity. |
| Proximity to team matters. | Nearly half (49%) of respondents from Steelcase Workplace Survey reported that the biggest problem in their physical work environment is the need to access others [112]. Thomas Allen found that there is an exponential drop in frequency of communication as the distance between them increases [2]. |
| The satisfaction with the “Noise control” is highly correlated with the “Ability to work privately, with little to no interruptions”. | Stokols and Scharf found that noise is related to decreased productivity for office workers [113]. Danielsson and Bodin found that as the number of people sharing a space increases, so does the noise, which decreases satisfaction [32]. Evans and Johnson found that noise did not affect clerical worker productivity [42]. Baron found that excessive noise has a negative impact on productivity [7]. |
| The “Ability to do secure or confidential work” is an important affordance for some. | Privacy has been linked to satisfaction and productivity, but nothing specific to doing confidential or secure work [16], [77], [120]. |
| Ergonomic furniture is important to workers. | Miles found that ergonomic furniture (i.e. tables and chairs) increase worker productivity [83]. DeRango noticed statistically significant productivity improvements when office workers were given ergonomically designed chairs as well as office ergonomics training [36]. |
| Workers boost their productivity by working from home or in different environments. | Respondents on the Steelcase Workplace Index Survey more often preferred to work at home, unlike our respondents who only work from home when it is needed to boost productivity [112]. Bailey published a literature review on telework where employees working from home report increased productivity in eleven out of twelve studies [6]. |

Our findings suggest that productivity in open environments can be improved by finding the right balance of people while considering the work relationship between those in that environment. We can see this in the increase in the percentages of software engineers who feel productive in work environments that include team members and team leads compared to no one from their team.

Another factor that made a positive contribution in our study is the ability to work without interruptions. This is not surprising as the most satisfied and productive software engineers in our study are in private offices. However, when combining all the relevant factors we begin to see the kind of balance software engineers may prefer from their work environments. Especially when we consider that social norms, another significant factor in the productivity models, could help mitigate the interruptions software engineers experience. It is likely that software engineers will feel more productive in open environments if they are in the environment with fellow team members where social norms help control unwanted interruptions; open environment productivity could be increased even more by having a balance between ability to work with their team and ability to work alone.

## 7 DISCUSSION

In this section we discuss aspects of work environments and suggestions that are informed by the results of our study.

### Design team-centric open environments.

Software engineers differ from other office workers in various ways, including the type of work they do. For a given office worker, it is important to consider the tasks relevant to their job and how the environment hurts or helps. For example, while a large part of software engineers’ work is developing code, another aspect that is important to support is communicating with team members. For people working in Marketing, where there are more conversations and phone calls, the ability to work privately and the presence of social norms is important.

---

### Keep teams together and plan for growth.
In our study, software engineers felt more productive and are more satisfied when the people that they work closely with are in close proximity. Software development is an inherently collaborative endeavor and the ability to informally determine if someone is available and initiate a discussion can expedite many tasks. While putting members of a team close together is easy to accomplish in an open shared workspace, we also observed it being achieved with people in private offices by having an entire team occupy offices in the same hallway. The challenge is not in initially putting a team in one location (doing this seems obvious), but rather keeping team members close as the composition of the team changes. As a team grows, new members may resist moving offices or there may not be enough space for them to physically join the team. This can lead to a fractured physical layout. However, a wholesale relocation of a team to an adequate space may be costly in terms of time and money or may not be possible at all. Planning ahead for growth and change can mitigate these problems.

### Support social norms.
Social norms exist in almost all work environments, private or open. They serve a valuable purpose, as they dictate when and how certain interactions and behaviors should take place. Some software engineers indicated that it took them a while to learn the norms of their team or that a few team members either didn’t follow them or never caught on. While such norms typically emerge organically, it can be helpful to provide ways for team members (especially newcomers) to learn about them explicitly rather than being expected to “just pick them up.” One program manager quipped that just as community swimming pools have signs listing the rules for all to see, he wished his team had a sign explaining to everyone the informal rules that the team had arrived at.

### Budget for ergonomics.
Software engineers spend an inordinate amount of time at their desks using computers. In the interviews, many participants were aware of risks that this poses such as carpal tunnel syndrome and other musculoskeletal disorders as well as sedentary hazards including weight gain and diabetes. Fortunately, furniture and devices are available that are designed with ergonomics in mind to mitigate the hazards of being on a computer at a desk all day. Organizations should budget for ergonomics because in addition to the obvious health benefits, our analyses showed that satisfaction with furniture is associated with higher levels of satisfaction and productivity.

### Give software engineers a say.
As different office workers have environmental preferences, different software engineers and teams may also have environmental preferences. We spoke with one software engineer who moved into an open environment and was able to arrange their work environment as they saw fit. This means they were able to take into account team dynamics, accommodating job requirements, and other environmental factors relevant to their team’s productivity. Future research could investigate costs associated with various environmental changes to help inform both workers and environment designers when trying to work together to design a productive work environment.

### Maintain balance between open and private.
Even when working in open spaces with teams, the observed software engineers valued the ability to work without interruption. Completely open floor plans afford very few, if any, places to go for private work, which could push software engineers to work in a different environment, or potentially leave the company (we received responses on our survey that mentioned leaving the company if their building was changed to a completely open floor plan). In the survey, participants considered “having enough physical space between the people around me” (72.5%) and “having somewhere close where I can work in private or smaller groups” (67.0%) to be important factors when working in an open space. One way to maintain the balance is to keep offices that surround or are near the open spaces; many of our interviewees described their ideal work environment as one that has an open space for team members surrounded by their team leads in offices with meeting rooms and focus rooms nearby.

### Individual versus team productivity.
The models in this paper are for individual developer satisfaction and productivity. This is important to keep in mind when making improvements based on the findings. It would be possible to optimize productivity locally for a developer (by removing interruptions) but be less productive as a team, since developers aren’t helping each other. For example, teams following Extreme Programming prefer to unblock engineers by having them get help. Therefore, it is important for any decision about work environments to carefully consider the context (company culture, team culture, development methodology) and consider the impact on both the individual developers but also teams. We believe that many improvements for individuals will also benefit the teams, but it’s important to recognize that not all of them will.

## 8 LIMITATIONS
When interpreting our results, there are several limitations that should be considered.

First and most importantly, our study design does not support causal inference. All findings in this paper are based on statistical analysis (regression, correlation) and insights from interviews. Kan [68] identifies criteria that must be met in order to empirically show causality between some factor and an outcome: the factor must precede the outcome temporally; a correlation between the factor and the outcome must be shown to exist; and the correlation must not be spurious. A spurious correlation may occur if some factor A precedes and is correlated with outcome B, but there is a hidden factor C that in fact causes A and B independently. While our analysis identified several factors that have a statistically significant and non-trivial relationship with satisfaction and productivity, the criteria of non-spurious correlations is the most difficult to address in non-controlled experiments like ours. One generally suggested method for dealing with spurious correlations is to identify and control for other factors that may influence the outcome of interest. While we controlled for some factors (gender, age), we cannot claim that we have exhaustively controlled for all possible factors. For example, we did not account for motivation in our models, although it is expected that motivation affects performance that affects satisfaction that affects future motivation. Therefore, while our results may imply causality, they do not definitively prove causality.

Instead of using existing validated measurements, we designed our own measurements for satisfaction, productivity, and other complex psychological constructs. This introduces several threats to validity, most notably related to construct validity. For instance, response items may not capture the intended meaning of the concepts or constructs or participants might misunderstand the response item due to insufficient conceptualization. To avoid misunderstandings and ambiguous interpretations, we piloted the survey with a small group of employees. The phrasing of response

---

Items was also tested during the in-person interviews, where we did not observe any misunderstandings. Another threat to construct validity is that each factor or construct was measured by a single response item only; therefore no evaluation of reliability of the measures is possible. We chose single response items to keep the survey length reasonable because shorter questionnaires have been found to receive higher response rates [37]. For job satisfaction, it was found that single-item measures (like used in this study) are highly correlated with scale measures of satisfaction [126], [39].

Though similar to other interview studies, the sample size for the interviews was not very large (19). To mitigate this issue, we included the survey; this increased our generalizability. However, we could not be as exhaustive as we would have liked in order to keep the survey relatively short. Some of the observed relations could be driven by other factors not present with the data; however, this is a general limitation of empirical research. By combining interview data and survey data, we are able to provide a more comprehensive understanding of how work environments are related to software engineer productivity than with interviews alone.

The measure for productivity and satisfaction in our models are self-reported. For example, a software engineer can say they feel productive while their commit counts or code churn may tell a different story. However, there is no universally accepted productivity measure. Any productivity measure is difficult to control for factors such as job role, vacation, management responsibilities, project type, or release cycles. For this reason, we chose self-reported productivity. Other work on physical work environments and productivity also used self-reported data [60], [57].

Likert items are ordered categorical outcomes and therefore the statistical power of traditional parametric methods of analysis such as linear regression has to be carefully considered. For our analysis, we treated Likert scores as numeric values from 1 (Strongly Disagree/Very Dissatisfied) to 5 (Strongly Agree/Very Satisfied), assuming an interval based scale. However, this assumption may not always be true and there is a debate between ordinalist [64] and intervalist views [19] regarding Likert scores. Norman stated that “parametric statistics can be used with Likert data, with small sample sizes, with unequal variances, and with non-normal distributions” [89]. He also stated that the “controversy can cease (but likely won’t).” For Likert scores, Carifio and Perla [20] suggest using a higher standard for appropriate p-values. To allow the reader to understand which items would be excluded through a more stringent statistical significance requirement, we report the actual p-values when possible.

We conducted our study only with the employees of a single company. Within Microsoft, the survey respondents came from eleven different organizations within Microsoft, working on different kinds of products ranging from operating systems, databases, cloud software, software tools, to productivity software using a wide range of development methodologies, including agile development [86]. It is possible that work environments at Microsoft are not representative of work environments at small or medium-sized companies or even large companies such as Google or Facebook. It is also possible that the employees at Microsoft are not representative of employees at other software companies. No two companies are exactly the same, therefore it is possible that there are some environmental factors we may have excluded that would apply to other companies; the same goes for factors we included that may not apply. In a similar way, the factors that matter for effective work environments might be different for teams using other development methodologies such as Extreme Programming, who due to their intense collaboration might benefit more from open space environments.

As with any study with people, there may be a social desirability bias, that is, the tendency of participants to answer questions in a manner that will be viewed favorably by others. Employees also might have worded answers in a way that could bring them benefits such as improved working conditions. We expect that these biases have little or no impact on the validity of our results because surveys were anonymous and we received a wide range of opinions from participants in interviews and surveys.

We combined all software engineers into the same group for the purpose of this study. However, in reality, software engineers vary by team, project, and company and have different personalities [45]. The same limitation applies to the other populations.

While our work has limitations, there is nothing specific in the study that prevents replication at other companies. Replicating our study in different organizational contexts will help generalize its results and build an empirical body of knowledge. To facilitate replication, all study materials (surveys, interview guides) are available as a technical report [65] and as supplemental materials.

## 9 FUTURE WORK

We see several directions for future work.

Our current measure of productivity is based on self-reported data, which can be subjective. Quantitative measures for productivity can help validating and expanding our findings. Potential measures include weekly commit counts, bugs fixed, or even peer evaluations. Productivity could also be assessed before and after people moved to new work environments. Another direction for future work is performing a study which demonstrates how well self-rated satisfaction and productivity correlate with the actual satisfaction (e.g., the number of times switching work environment, team, etc.) and productivity measures (e.g., number of commits, etc.).

Previous work and our own work found that the people in the environment matter just as much, if not more so, than some of the other factors we discussed. Therefore, another area for future work is exploring the role of working styles and personality types with respect to productivity and satisfaction in work environments. This could be accomplished with additional surveys that incorporate the “Big Five” model personality instrument [29].

At larger companies, there is often a dedicated team of people whose job it is to make plans and improve physical work environments. To build on our work, one could interview those people with two goals in mind: (1) determining what factors and data they consider, other than cost, when making decisions about work environments and (2) if the factors they use match up with the factors our research found to be most important.

We focused on physical work environment for this study and did not take into account virtual workplaces and communication (e.g. instant messaging, chat, and other forms of online collaborative platforms), although they are commonly used by software engineers these days [117], [108], [31]. Future work should focus on how virtual workplaces and communication channels impact productivity and satisfaction. Furthermore, the relation between physical work environments, virtual workplace, and communication could be explored. This may lead to surprising findings such as the one by Bernstein and Turban that open offices make people talk less and email more [11].

---

## 10 CONCLUSIONS

Software engineers spend many hours in their work environments; however, there has been little empirical research specific to software engineering on what makes effective work environments and how they impact productivity. In this paper, we report the findings from interviews and surveys with 1,159 employees at Microsoft in five job disciplines, namely, software engineering, program management, IT operations, marketing, and business program & operations.

- We identified six themes related to physical work environments: personalization, social norms and signals, room composition and atmosphere, work-related environment affordances, work area and furniture, and productivity strategies.
- The ability to work privately with no interruptions and the ability to communicate with the team were important factors for satisfaction with the work environment among all disciplines.
- The overall satisfaction with the work environment and the ability to work privately with no interruptions were important factors for self-assessed productivity among all five disciplines. We also found that private offices were linked to higher perceived productivity across all disciplines.
- While some of the findings were general across all disciplines, several findings were specific to software engineers: proximity to windows, decoration, and furniture were all linked to overall satisfaction with the work environment for software engineers. Social norms seemed to matter for software engineers but not for all job disciplines. For the ability to communicate with the team and the ability to work privately without interruptions, the effect size was more pronounced for software engineers than for the other job disciplines.

An important implication is that software engineers are not the same as other knowledge workers, at least with respect to satisfaction with physical work environments. This influences the extent to which general findings obtained through research on other knowledge workers should be applied to software engineering contexts. While there has been significant research on topics such as job satisfaction, job motivation, and organizational turnover in other research fields, it is not guaranteed that these findings will apply to software engineering. More research is needed to validate such work in the context of software engineering.

This paper is just a small step in this direction. We hope that it will inspire similar studies. To facilitate replication of this work, all study materials (surveys, interview guides) are available as a technical report [65] and as supplemental materials.

## 11 ACKNOWLEDGMENTS

Brittany Johnson performed this work while being an intern at Microsoft Research. Many thanks to the participants of the surveys and interviews, as well as Titus Barik, Michael Barnett, Andrew Begel, Jacek Czerwonka, Prem Devanbu, Rob DeLine, Nachi Nagappan, Pavneet Singh Kochhar, Lutz Prechelt, Hana Vrzakova, and the anonymous reviewers for their valuable feedback.

## 12 GROUPS FROM THE CARD SORT

### C1 Decoration and personalization
Anything pertaining with the ability to personalize or decorate work areas

- a. requests/permission variance
- b. considering the team
- c. team personalization
- d. reasons for personalization/decoration (or lack of)
- e. effects of environment

### C2 Space utilization
Issues pertaining to how space is used

### C3 Environment change requests
Issues pertaining to requesting changes to environment
- a. issues preventing environment changes
- b. do-it-yourself environment changes (i.e., scavenging for furniture or painting office yourself)
- c. process

### C4 Team dynamics
Pertains to how the team works together and resolves issues within the group
- a. communicating about/dealing with problems
- b. feeding off group energy
- c. syncing schedules
- d. helping me vs. helping others
- e. team pow wows
- f. social aspects

### C5 Social norms and signals
Pertains to the culture, social norms, and signaling used between those working together
- a. consideration for others
- b. use of headphones
- c. physical signaling (e.g., mailbox flags)
- d. seniority for placement determination

### C6 Interruptions
Various interruptions experienced
- a. variance by role
- b. variance by project/type of project
- c. variance by environment
- d. ways of avoiding interruptions

### C7 Proximity to team
Mention of proximity to team as an item of importance or as something important to consider
- a. effects of team distribution
- b. stress specific to being close to team (e.g., not delivering when you said you would)

### C8 Noise level
Issues pertaining to noise in work areas as a distraction
- a. noise from outside immediate work area (outside team)
- b. white/background noise
- c. mitigating noise levels
- d. noise inside immediate work area

### C9 Collaboration
Pertains to ability to collaborate/effectiveness of environment for fostering collaboration
- a. testing/evaluation
- b. collaboration in open vs. collaboration in closed

### C10 Environment trade-offs
Trade-offs or balance considerations to be made (or that have been made)
- a. increased noise/distractions vs. increased collaboration/communication
- b. good always vs. good for now
- c. formal vs. impromptu meetings
- d. benefit me vs. benefit the team
- e. “niceness” of building layout vs. complexity of layout
- f. doing things the old way/your way vs. doing things the new way (environment change)

### C11 Room composition
How the room is put together (who’s in it, how are they organized, how much space is there for that)

---

organization)

- a. environment flexibility
- b. ideal number of people in one area
- c. open and personal/quiet space balance
- d. close quarters (squeezing more into a space)
- e. “podding” of workers based on personality or role
- f. location of various team members (PMs vs. developers vs. managers)
- g. local meeting space

### C12 Communication & information sharing: pertains to ability to easily communicate with people of interest

- a. getting questions answered
- b. team information sharing

### C13 Private/personal space: issues pertaining to personal/private workspace (or lack there of)

- a. place to concentrate/focus/escape to
- b. need based on role
- c. space for team members only
- d. place for phone calls
- e. accommodating the need for personal space

### C14 Meeting rooms: pertains to the usage of conference rooms

- a. room availability
- b. meeting room alternatives
- c. available technologies
- d. location
- e. size

### C15 Focus rooms: pertains to usage of phone and focus rooms

- a. re-assignment of focus rooms
- b. accommodating visitors
- c. room availability
- d. design or placement

### C16 Secure work: issues pertaining to working in a secure area/on confidential work

- a. sharing space with others not doing the confidential work
- b. access issues (e.g., visitors, bathroom breaks, temporary badges)
- c. accommodating secure work

### C17 Laptops: availability of functioning laptops

### C18 Building location: issues pertaining to where the building they work in is located

- a. urban vs. suburban

### C19 Proximity to amenities/supplies: issues pertaining to distance from various amenities and/or supplies

- a. commercial amenities
- b. need for technical supply closet
- c. snacks/food

### C20 Proximity to home: issues pertaining to the distance from home to work

### C21 Movement between environments: issues pertaining to having to move from one type of environment to another

### C22 Parking: issues pertaining to the parking of their vehicle

### C23 Furniture: pertains to furniture used and made available; ergonomics

- a. desks (standing vs. regular and size)
- b. monitors
- c. cable management
- d. chairs
- e. peripherals

### C24 Temperature: issues pertaining to the temperature in their office/workspace or building

- a. accommodating the cold
- b. temperature preference (hot or cold)
- c. effects of temperature on work

### C25 Work area size & capacity: issues pertaining to the size and capacity of the work area

- a. small vs. large work area (room)
- b. spacious vs. cramped (people or things in the room)

### C26 Building: issues pertaining to the building layout or components in the building

- a. elevators
- b. levels of openness of entire building
- c. flooring (e.g., hearing shoes on non-carpeted floors)
- d. fixtures (e.g., staircase design)
- e. decor (or lack there of)
- f. repetitive card scanning (even in non-secure areas)

### C27 Work elsewhere: anything related to working outside of their designated desk/office/area

- a. home
- b. different area of same building (e.g., conference rooms)
- c. other building
- d. reasons for working elsewhere

### C28 Window view: pertains to availability of a scenic view outside of window

### C29 Natural light: issues pertaining to access to natural light

- a. why natural light
- b. controlling the light (e.g., reducing glare or pain from light beaming in)
- c. natural vs. fluorescent light
- d. accommodating variance in preferences

### C30 Morale building: efforts made by someone other than the individual to boost morale

### C31 Breaks: pertains to breaks people take to increase motivation/productivity/morale

- a. beverage breaks
- b. walks/fresh air
- c. “formal” breaks (e.g., ice cream socials)

### C32 Nap rooms: pertaining to accommodations for taking naps

### C33 Remove blockers: turning to others to help unblock themselves from getting their work done

### C34 Remove distractions: methods used to block out distractions/remove distractions

- a. headphones (music or Netflix)
- b. focus/private time (e.g., close office door)
- c. inability to remove distractions

## REFERENCES

[1] B. Adams and S. McIntosh. Modern release engineering in a nutshell – why researchers should care. In Proceedings of the 23rd International Conference on Software Analysis, Evolution, and Reengineering (SANER), volume 5, pages 78–90. IEEE, 2016.

[2] T. J. Allen. Managing the flow of technology: technology transfer and the dissemination of technological information within the R and D organization. Massachusetts Institute of Technology, Cambridge, MA, 1977.

[3] D. Avery, H. K. Dam, B. T. R. Savarimuthu, and A. Ghose. Externalization of software behavior by the mining of norms. In Proceedings of the 13th International Conference on Mining Software Repositories, MSR ’16, pages 223–234, New York, NY, USA, 2016. ACM.

---

[4] E. Babbie. The practice of social research (13th edition). Cengage Learning, 2012.

[5] T. Baguley. Standardized or simple effect size: What should be reported? British Journal of Psychology, 100:603–617, 2009.

[6] D. E. Bailey and N. B. Kurland. A review of telework research: Findings, new directions, and lessons for the study of modern work. Journal of organizational behavior, 23(4):383–400, 2002.

[7] R. A. Baron. The physical environment of work settings: Effects on task performance, interpersonal relations, and job satisfaction. Research in organizational behavior, 16:1–1, 1994.

[8] T. S. Bateman and D. W. Organ. Job satisfaction and the good soldier: The relationship between affect and employee “citizenship”. Academy of management Journal, 26(4):587–595, 1983.

[9] K. Beck, M. Beedle, A. Van Bennekum, A. Cockburn, W. Cunningham, M. Fowler, J. Grenning, J. Highsmith, A. Hunt, R. Jeffries, et al. Manifesto for agile software development, 2001.

[10] S. Beecham, N. Baddoo, T. Hall, H. Robinson, and H. Sharp. Motivation in software engineering: A systematic literature review. Information and software technology, 50(9-10):860–878, 2008.

[11] E. S. Bernstein and S. Turban. The impact of the “open” workspace on human collaboration. Philosophical Transactions of the Royal Society B: Biological Sciences, 373(1753):20170239, 2018.

[12] C. Bicchieri and R. Muldoon. Social norms. In E. N. Zalta, editor, The Stanford Encyclopedia of Philosophy. Stanford University, spring 2014 edition, 2014.

[13] T. Bishop. How Microsoft’s developer division changed its workspace, and transformed how it works, 2014. http://www.geekwire.com/2014/microsoft-developer-division/.

[14] J. Blackburn, G. Scudder, and L. Van Wassenhove. Improving speed and productivity of software development: a global survey of software developers. IEEE Transactions on Software Engineering, 22(12):875–885, 1996.

[15] N. Bloom. To raise productivity, let more employees work from home, 2014. https://hbr.org/2014/01/to-raise-productivity-let-more-employees-work-from-home.

[16] A. Brennan, J. S. Chugh, and T. Kline. Traditional versus open office design: a longitudinal field study. Environment and Behavior, 34(3):279–299, 2002.

[17] S. Brunia and A. Hartjes-Gosselink. Personalization in non-territorial offices: a study of a human need. Journal of Corporate Real Estate, 11(3):169–182, 2009.

[18] M. M. Burnett, S. D. Fleming, S. T. Iqbal, G. Venolia, V. Rajaram, U. Farooq, V. Grigoreanu, and M. Czerwinski. Gender differences and programming environments: across programming populations. In Proceedings of the International Symposium on Empirical Software Engineering and Measurement, ESEM 2010, 16–17 September 2010, Bolzano/Bozen, Italy, 2010.

[19] J. Carifio and R. Perla. Resolving the 50-year debate around using and misusing Likert scales. Medical education, 42(12):1150–1152, 2008.

[20] J. Carifio and R. J. Perla. Ten common misunderstandings, misconceptions, persistent myths and urban legends about Likert scales and Likert response formats and their antidotes. Journal of Social Sciences, 3(3):106–116, 2007.

[21] E. Carmel. Global Software Teams: Collaborating Across Borders and Time Zones. Prentice Hall PTR, Upper Saddle River, NJ, USA, 1999.

[22] S. G. Carmichael. Research: Cubicles are the absolute worst, 2013. https://hbr.org/2013/11/research-cubicles-are-the-absolute-worst/.

[23] M. Cataldo and J. D. Herbsleb. Coordination breakdowns and their impact on development productivity and software failures. IEEE Trans. Software Eng., 39(3):343–360, 2013.

[24] L.-T. Cheng, C. R. de Souza, S. Hupfer, J. Patterson, and S. Ross. Building collaboration into ideas. Queue, 1(9):40, 2003.

[25] J. Cidell. Content clouds as exploratory qualitative data analysis. Area, 42(4):514–523, 2010.

[26] A. Cockburn. Agile software development, volume 177. Addison-Wesley Boston, 2002.

[27] C. Congdon, D. Flynn, and M. Redman. Balancing “we” and “me”: The best collaborative spaces also support solitude. Harvard Business Review, 92(10):37–43, 2014.

[28] C. Congdon, D. Flynn, and M. Redman. Balancing “we” and “me”: The best collaborative spaces also support solitude, 2014. https://hbr.org/2014/10/balancing-we-and-me-the-best-collaborative-spaces-also-support-solitude.

[29] P. T. Costa and R. R. McCrae. The revised neo personality inventory (neo-pi-r). The SAGE handbook of personality theory and assessment, 2:179–198, 2008.

[30] C. Cranny, P. Smith, and E. Stone. Job Satisfaction: How People Feel about Their Jobs and How it Affects Their Performance. Issues in organization and management series. Lexington Books, 1992.

[31] L. Dabbish, C. Stuart, J. Tsay, and J. Herbsleb. Social coding in GitHub: transparency and collaboration in an open software repository. In Proceedings of the ACM 2012 conference on computer supported cooperative work, pages 1277–1286. ACM, 2012.

[32] C. B. Danielsson and L. Bodin. Difference in satisfaction with office environment among employees in different office types. Journal of Architectural and Planning Research, pages 241–257, 2009.

[33] M. C. Davis, D. J. Leach, and C. W. Clegg. The physical environment of the office: Contemporary and emerging issues. International review of industrial and organizational psychology, 26(1):193–237, 2011.

[34] T. DeMarco and T. Lister. Programmer performance and the effects of the workplace. In Proceedings of the 8th international conference on Software Engineering, pages 268–272. IEEE Computer Society Press, 1985.

[35] T. DeMarco and T. Lister. Peopleware: Productive Projects and Teams (3rd Edition). Addison-Wesley Professional, 3rd edition, 2013.

[36] K. DeRango, B. Amick, M. Robertson, T. Rooney, A. Moore, and L. Bazzani. The productivity consequences of two ergonomic interventions, 2003.

[37] E. Deutskens, K. DeRuyter, M. Wetzels, and P. Oosterveld. Response rate and response quality of internet-based surveys: An experimental study. Marketing letters, 15(1):21–36, 2004.

[38] P. Devanbu, S. Karstu, W. Melo, and W. Thomas. Analytical and empirical evaluation of software reuse metrics. In Proceedings of the 18th International Conference on Software Engineering, ICSE ’96, pages 189–199. IEEE, 1996.

[39] C. L. Dolbier, J. A. Webster, K. T. McCalister, M. W. Mallon, and M. A. Steinhardt. Reliability and validity of a single-item measure of job satisfaction. American Journal of Health Promotion, 19(3):194–198, 2005.

[40] T. Dybå and T. Dingsøyr. Empirical studies of agile software development: A systematic review. Information and software technology, 50(9):833–859, 2008.

[41] L. Edwards and P. A. Torcellini. A literature review of the effects of natural light on building occupants. National Renewable Energy Laboratory Golden, CO, 2002.

[42] G. W. Evans and D. Johnson. Stress and open-office noise. Journal of applied psychology, 85(5):779, 2000.

[43] J. Feifer and A. Mullany. Two cube dwellers argue over open offices. Who’s right?, 2014. http://www.fastcompany.com/3025568/are-open-offices-bad-for-work.

[44] D. C. Feldman. The development and enforcement of group norms. Academy of management review, 9(1):47–53, 1984.

[45] D. Ford, T. Zimmermann, C. Bird, and N. Nagappan. Characterizing software engineering work with personas based on knowledge worker actions. In Empirical Software Engineering and Measurement (ESEM), 2017 ACM/IEEE International Symposium on, pages 394–403. IEEE, 2017.

[46] J. Fox. Applied Regression Analysis and Generalized Linear Models (2nd edition). Sage Publications, 2008.

[47] A. C. C. França, D. E. Carneiro, and F. Q. da Silva. Towards an explanatory theory of motivation in software engineering: A qualitative case study of a small software company. In Software Engineering (SBES), 2012 26th Brazilian Symposium on, pages 61–70. IEEE, 2012.

[48] A. C. C. França, F. Q. Da Silva, A. de LC Felix, and D. E. Carneiro. Motivation in software engineering industrial practice: A cross-case analysis of two software organisations. Information and Software Technology, 56(1):79–101, 2014.

[49] A. C. C. França, A. C. de Araújo, and F. Q. da Silva. Motivation of software engineers: A qualitative case study of a research and development organisation. In Cooperative and Human Aspects of Software Engineering (CHASE), 2013 6th International Workshop on, pages 9–16. IEEE, 2013.

[50] C. França, H. Sharp, and F. Q. Da Silva. Motivated software engineers are engaged and focused, while satisfied ones are happy. In Proceedings of the 8th ACM/IEEE International Symposium on Empirical software Engineering and Measurement, page 32. ACM, 2014.

[51] R. W. Frick. Defending the statistical status quo. Theory & Psychology, 9(2):183–189, 1999.

[52] J. J. Gibson. The senses considered as perceptual systems. Houghton Mifflin, 1966.

[53] C. B. Goldberg and D. A. Waldman. Modeling employee absenteeism: Testing alternative measures and mediated effects based on job satisfaction. Journal of Organizational Behavior: The International Journal of

---

Industrial, Occupational and Organizational Psychology and Behavior, 21(6):665–676, 2000.

[54] D. Graziotin, F. Fagerholm, X. Wang, and P. Abrahamsson. On the unhappiness of software developers. arXiv preprint arXiv:1703.04993, 2017.

[55] D. Graziotin, F. Fagerholm, X. Wang, and P. Abrahamsson. What happens when software developers are (un) happy. arXiv preprint arXiv:1707.00432, 2017.

[56] D. Graziotin, X. Wang, and P. Abrahamsson. Are happy developers more productive? In PROFES 2013: Proceedings of the 14th International Conference on Product-Focused Software Process Improvement, pages 50–64. Springer Berlin Heidelberg, 2013.

[57] D. Graziotin, X. Wang, and P. Abrahamsson. Do feelings matter? On the correlation of affects and the self-assessed productivity in software engineering. Journal of Software: Evolution and Process, 27(7):467–487, 2015.

[58] G. Guest, A. Bunce, and L. Johnson. How many interviews are enough? An experiment with data saturation and variability. Field Methods, 18(1):59–82, 2006.

[59] A. Hammershoj, A. Sapuppo, and R. Tadayoni. Challenges for mobile application development. In Intelligence in Next Generation Networks (ICIN), 2010 14th International Conference on, pages 1–8. IEEE, 2010.

[60] B. P. Haynes. Office productivity: a theoretical framework. Journal of Corporate Real Estate, 9(2):97–110, 2007.

[61] J. D. Herbsleb. Global software engineering: The future of socio-technical coordination. In 2007 Future of Software Engineering, FOSE ’07, pages 188–198, Washington, DC, USA, 2007. IEEE Computer Society.

[62] R. Hoppock. Job satisfaction. Harper, 1935.

[63] W. Hudson. Card sorting. The Encyclopedia of Human-Computer Interaction, 2nd Ed., 2013.

[64] S. Jamieson. Likert scales: how to (ab)use them. Medical Education, 38(12):1217–1218, 2004.

[65] B. Johnson, T. Zimmermann, and C. Bird. Appendix to the effect of work environments on productivity. Technical Report MSR-TR-2015-66, Microsoft Research, 2015. http://research.microsoft.com/apps/pubs/?id=255563.

[66] C. Jones. Software metrics: good, bad and missing. Computer, 27(9):98–100, 1994.

[67] T. A. Judge, C. J. Thoresen, J. E. Bono, and G. K. Patton. The job satisfaction–job performance relationship: A qualitative and quantitative review. Psychological Bulletin, 127(3):376–407, 2001.

[68] S. H. Kan. Metrics and models in software quality engineering. Addison-Wesley Longman Publishing Co., Inc., 2002.

[69] L. Kaufman. Google got it wrong. The open office trend is destroying the workplace, 2014. https://www.washingtonpost.com/posteverything/wp/2014/12/30/google-got-it-wrong-the-open-office-trend-is-destroying-the-workplace/.

[70] A. Kelly. Changing software development: Learning to become agile. John Wiley & Sons, 2008.

[71] A. Kelly. Software developers: prototype of future knowledge workers?, 2014. https://dzone.com/articles/software-developers-prototype.

[72] M. Kersten and G. C. Murphy. Using task context to improve programmer productivity. In Proceedings of the 14th ACM SIGSOFT International Symposium on Foundations of Software Engineering, SIGSOFT’06/FSE-14, pages 1–11. ACM, 2006.

[73] A. J. Ko, B. Myers, M. J. Coblenz, H. H. Aung, et al. An exploratory study of how developers seek, relate, and collect relevant information during software maintenance tasks. Software Engineering, IEEE Transactions on, 32(12):971–987, 2006.

[74] T. D. LaToza, G. Venolia, and R. DeLine. Maintaining mental models: a study of developer work habits. In Proceedings of the 28th international conference on Software engineering, pages 492–501. ACM, 2006.

[75] A. Leaman and B. Bordass. Productivity in buildings: the “killer” variables. Building Research & Information, 27(1):4–19, 1999.

[76] K. E. Lee, K. J. Williams, L. D. Sargent, N. S. Williams, and K. A. Johnson. 40-second green roof views sustain attention: The role of micro-breaks in attention restoration. Journal of Environmental Psychology, 42:182–189, 2015.

[77] A. Lingwood. Workspace design survey, 2015. http://anthonylingwood.com/workspace-design-survey/.

[78] E. A. Locke. The nature and causes of job satisfaction. Handbook of industrial and organizational psychology, 1976.

[79] G. M. McCue. IBM’s Santa Teresa laboratory: architectural design for program development. IBM Systems Journal, 17(1):4–25, 1978.

[80] S. McIntosh, Y. Kamei, B. Adams, and A. E. Hassan. The impact of code review coverage and code review participation on software quality: A case study of the qt, vtk, and itk projects. In MSR 2014: Proceedings of the 11th Working Conference on Mining Software Repositories, pages 192–201, New York, NY, USA, 2014. ACM.

[81] C. McNaught and P. Lam. Using wordle as a supplementary research tool. The Qualitative Report, 15(3):630–643, 2010.

[82] A. N. Meyer, T. Fritz, G. C. Murphy, and T. Zimmermann. Software developers’ perceptions of productivity. In Proceedings of the 22nd ACM SIGSOFT International Symposium on Foundations of Software Engineering, pages 19–29. ACM, 2014.

[83] A. K. Miles. The ergonomics and organizational stress relationship. PhD thesis, Florida State University School of Business, 2000.

[84] W. H. Mobley. Intermediate linkages in the relationship between job satisfaction and employee turnover. Journal of Applied Psychology, 62(2):237, 1977.

[85] A. Mockus, R. T. Fielding, and J. D. Herbsleb. Two case studies of open source software development: Apache and mozilla. ACM Transactions on Software Engineering and Methodology, 11(3):309–346, 2002.

[86] B. Murphy, C. Bird, T. Zimmermann, L. Williams, N. Nagappan, and A. Begel. Have agile techniques been the silver bullet for software development at Microsoft? In Empirical Software Engineering and Measurement, 2013 ACM/IEEE International Symposium on, pages 75–84. IEEE, 2013.

[87] G. C. Murphy, M. Kersten, and L. Findlater. How are Java software developers using the Eclipse IDE? Software, IEEE, 23(4):76–83, 2006.

[88] C. Nielsen. How Microsoft used an office move to boost collaboration. Harvard Business Review, 2016.

[89] G. Norman. Likert scales, levels of measurement and the “laws” of statistics. Advances in Health Sciences Education, 15(5):625–632, 2010.

[90] G. R. Oldham. Effects of changes in workspace partitions and spatial density on employee reactions: A quasi-experiment. Journal of Applied Psychology, 73(2):253, 1988.

[91] G. R. Oldham and D. J. Brass. Employee reactions to an open-plan office: A naturally occurring quasi-experiment. Administrative Science Quarterly, pages 267–284, 1979.

[92] G. R. Oldham and N. L. Rotchford. Relationships between office characteristics and employee reactions: A study of the physical environment. Administrative Science Quarterly, pages 542–556, 1983.

[93] M. O’Neill. Open plan and enclosed private offices: Research review and recommendations. Knoll research White Paper, 2008.

[94] M. J. O’Neill. Work space adjustability, storage, and enclosure as predictors of employee reactions and performance. Environment and Behavior, 26(4):504–526, 1994.

[95] E. Paiva, D. Barbosa, R. Lima Jr, and A. Albuquerque. Factors that influence the productivity of software developers in a developer view. In Innovations in Computing Sciences and Software Engineering, pages 99–104. Springer, 2010.

[96] C. Peck and D. W. Callahan. A proposal for measuring software productivity in a working environment. In System Theory, 2002. Proceedings of the Thirty-Fourth Southeastern Symposium on, pages 339–343. IEEE, 2002.

[97] K. Petersen. Measuring and predicting software productivity: A systematic map and review. Information and Software Technology, 53(4):317–343, 2011.

[98] Pew Research Center. Questionnaire design, 2017. http://www.pewresearch.org/methodology/u-s-survey-research/questionnaire-design/.

[99] J. Pogue, A. Andreou, C. Barber, E. Lucken, and T. Pittman. What factors drive workplace performance?, 2013. http://www.gensler.com/design-thinking/research/the-2013-us-workplace-survey-1.

[100] L. Pollack. Do it like a software developer, 2014. https://www.ft.com/content/deb1c2f0-9e0b-11e3-b429-00144feab7de.

[101] L. W. Porter, R. M. Steers, R. T. Mowday, and P. V. Boulian. Organizational commitment, job satisfaction, and turnover among psychiatric technicians. Journal of Applied Psychology, 59(5):603, 1974.

[102] R. Potvin and J. Levenberg. Why Google stores billions of lines of code in a single repository. Communications of the ACM, 59(7):78–87, 2016.

[103] K. J. Preacher and K. Kelley. Effect size measures for mediation models: Quantitative strategies for communicating indirect effect. Psychological Methods, 16(2):93–115, 2011.

[104] R Core Team. R: A Language and Environment for Statistical Computing. R Foundation for Statistical Computing, Vienna, Austria, 2013.

[105] R. H. Rasch and H. L. Tosi. Factors affecting software developers’ performance: an integrated approach. MIS Quarterly, pages 395–413, 1992.

[106] S. Romano, G. Scanniello, D. Fucci, N. Juristo, and B. Turhan. The effect of noise on software engineers’ performance. In Proceedings of

---

the 12th ACM/IEEE International Symposium on Empirical Software Engineering and Measurement, ESEM ’18, pages 9:1–9:10, New York, NY, USA, 2018. ACM.

[107] H. Sharp, N. Baddoo, S. Beecham, T. Hall, and H. Robinson. Models of motivation in software engineering. Information and Software Technology, 51(1):219–233, 2009.

[108] L. Singer, F. Figueira Filho, and M.-A. Storey. Software engineering at the speed of light: How developers stay current using Twitter. In Proceedings of the 36th International Conference on Software Engineering, ICSE 2014, pages 211–221, New York, NY, USA, 2014. ACM.

[109] D. Šmite, C. Wohlin, T. Gorschek, and R. Feldt. Empirical evidence in global software engineering: a systematic review. Empirical Software Engineering, 15(1):91–118, Feb 2010.

[110] P. E. Spector. Job satisfaction: Application, assessment, causes, and consequences, volume 3. Sage publications, 1997.

[111] D. Spencer. Card sorting: Designing usable categories. Rosenfeld Media, 2009.

[112] S. E. Staff. Workers’ physical environment impact bottom line, 2002.

[113] D. Stokols and T. Scharf. Developing standardized tools for assessing employees’ ratings of facility performance. In Performance of buildings and serviceability of facilities. ASTM International, 1990.

[114] N. J. Stone and A. J. English. Task type, posters, and workspace color on mood, satisfaction, and performance. Journal of Environmental Psychology, 18(2):175–185, 1998.

[115] M.-A. Storey, L.-T. Cheng, I. Bull, and P. Rigby. Shared waypoints and social tagging to support collaboration in software development. In Proceedings of the 2006 20th anniversary conference on Computer supported cooperative work, pages 195–198. ACM, 2006.

[116] M.-A. Storey, L. Singer, B. Cleary, F. Figueira Filho, and A. Zagalsky. The (r) evolution of social media in software engineering. In Proceedings of the on Future of Software Engineering, FOSE 2014, pages 100–116, New York, NY, USA, 2014. ACM.

[117] M.-A. Storey, A. Zagalsky, F. F. Filho, L. Singer, and D. M. German. How social and communication channels shape and challenge a participatory culture in software development. IEEE Transactions on Software Engineering, 43(2):185–204, 2017.

[118] G. P. Sudhakar, A. Farooq, and S. Patnaik. Measuring productivity of software development teams. Serbian Journal of Management, 7(1):65–75, 2012.

[119] A. Trendowicz and J. Münch. Factors influencing software development productivity — state-of-the-art and industrial experiences. Advances in Computers, 77:185–241, 2009.

[120] J. A. Veitch, K. E. Charles, K. M. Farley, and G. R. Newsham. A model of satisfaction with open-plan office conditions: Cope field findings. Journal of Environmental Psychology, 27(3):177–189, 2007.

[121] J. C. Vischer. The effects of the physical environment on job performance: towards a theoretical model of workspace stress. Stress and Health, 23(3):175–184, 2007.

[122] P. Vitharana. Risks and challenges of component-based software development. Communications of the ACM, 46(8):67–72, 2003.

[123] B. Waber, J. Magnolfi, and G. Lindsay. Workspaces that move people, 2014. https://hbr.org/2013/11/research-cubicles-are-the-absolute-worst/.

[124] S. Wagner and M. Ruhe. A structured review of productivity factors in software development. Technical Report TUM-I0832, Institut für Informatik der Technischen Universität München, 2008.

[125] S. Wagner and M. Ruhe. A systematic review of productivity factors in software development. In Proceedings of 2nd International Workshop on Software Productivity Analysis and Cost Estimation (SPACE 2008). State Key Laboratory of Computer Science, Institute of Software, 2008.

[126] J. P. Wanous, A. E. Reichers, and M. J. Hudy. Overall job satisfaction: how good are single-item measures? Journal of Applied Psychology, 82(2):247, 1997.

[127] L. Wasserman. All of statistics: a concise course in statistical inference. Springer Science & Business Media, 2013.

[128] M. Wells and L. Thelen. What does your workspace say about you? the influence of personality, status, and workspace on personalization. Environment and Behavior, 34(3):300–321, 2002.

[129] M. M. Wells. Office clutter or meaningful personal displays: The role of office personalization in employee and organizational well-being. Journal of Environmental Psychology, 20(3):239–255, 2000.

[130] R. D. Williams, A. B. Pyster, E. D. Stuckle, M. H. Penedo, and B. W. Boehm. A software development environment for improving productivity. IEEE Computer, 17(06):30–44, 1984.

[131] T. A. Wright and R. Cropanzano. Psychological well-being and job satisfaction as predictors of job performance. Journal of Occupational Health Psychology, 5(1):84, 2000.

[132] M. Yilmaz and R. V. O’Connor. An empirical investigation into social productivity of a software process: An approach by using the structural equation modeling. In Systems, Software and Service Process Improvement, pages 155–166. Springer, 2011.

[133] M. Zhou and A. Mockus. Developer fluency: Achieving true mastery in software projects. In Proceedings of the Eighteenth ACM SIGSOFT International Symposium on Foundations of Software Engineering, FSE ’10, pages 137–146. ACM, 2010.

[134] T. Zimmermann. Card-sorting: From text to themes. In T. Menzies, L. Williams, and T. Zimmermann, editors, Perspectives on Data Science for Software Engineering, page 137–141. Morgan Kaufmann, 2016.

[Image: page20_img_1.png] Color portrait photograph of an author used in the paper’s author-bio section. The image shows a smiling person with short, reddish coiled hair, wearing a dark blazer over a black top, photographed against a plain gray backdrop and cropped at the upper torso. To the right of the photo is the author’s biographical text (affiliation and research interests such as human–computer interaction, software tools and environments, and machine learning) as part of the paper layout.

> Brittany Johnson is a postdoctoral researcher at University of Massachusetts, Amherst. Her research interests include human–computer interaction, software tools and environments, and machine learning. She holds a Ph.D. in Computer Science from North Carolina State University. Contact her at bjohnson@cs.umass.edu; http://brittjay.me

[Image: page20_img_2.png] A close-up, head-and-shoulders color photograph of a man wearing glasses, a blue collared shirt and a dark jacket, smiling against a partly cloudy sky background on the left side of the image. The right side shows a formatted biographical block (large bold heading followed by paragraph text) that identifies the person as a researcher at Microsoft Research with a Ph.D. from Saarland University, lists research interests including software productivity, software analytics, and recommender systems, and notes professional memberships and a personal homepage URL. The layout and content indicate this is an author portrait and short bio used in the paper’s author information section.

> Thomas Zimmermann is a Senior Researcher at Microsoft Research. He received his Ph.D. degree from Saarland University in Germany. His research interests include software productivity, software analytics, and recommender systems. He is a Senior Member of the IEEE Computer Society and Distinguished Member of the ACM. His homepage is http://thomas-zimmermann.com.

[Image: page20_img_3.png] A color head-and-shoulders portrait showing a smiling middle-aged man with short dark hair (some gray at the temples) wearing a gray collared shirt against a neutral gray background. The photo is cropped on the left side of a page and sits beside the paper’s author biography text (it is the third portrait on the authors’ page). The framing, lighting, and neutral backdrop indicate a professional academic headshot used to accompany the author bio.

> Christian Bird is a Senior Researcher in the Empirical Software Engineering group at Microsoft Research. He focuses on using qualitative and quantitative methods to both understand and help software teams. Christian received his Bachelor’s degree from Brigham Young University and his Ph.D. from the University of California, Davis. He lives in Redmond, Washington with his wife and three (very active) children.