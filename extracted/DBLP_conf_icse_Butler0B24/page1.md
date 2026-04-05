## Objectives and Key Results in Software Teams: Challenges, Opportunities and Impact on Development

Jenna Butler — Microsoft, USA — jennbu@microsoft.com  
Thomas Zimmermann — Microsoft, USA — tzimmer@microsoft.com  
Christian Bird — Microsoft, USA — cbird@microsoft.com

### ABSTRACT
Building software, like building almost anything, requires people to understand a common goal and work together towards it. In large software companies, a VP or Director will have an idea or goal and it is often the job of middle management to distill that lofty, general idea into manageable, finite units of work. How do organizations do this hard work of setting and measuring progress towards goals? To understand this question, we undertook a mixed methods approach to studying goal setting, management dissemination of goals, goal tracking and ultimately software delivery at a large multi-national software company.

Semi-structured interviews with 47 participants were analyzed and used to develop a survey which was deployed to a multinational team of over 4,000 engineers. The 512 responses were analyzed using thematic analysis, linear regressions and hypothesis testing, and found that tracking, measuring and setting goals is hard work, regardless of tools used. Middle management seems to be a critical component of the translation of lofty goals to actionable work items. In addition, attitudes and beliefs of engineers are critical to the success of any goal setting framework. Based on this research, we make recommendations on how to improve the goal setting and OKR process in software organizations: invest in the data pipeline, increase transparency, improve communication, promote learning communities, and a structured roll out of OKRs.

### CCS CONCEPTS
- Software and its engineering → Software creation and management;  
- Social and professional topics → Computing and business;  
- Human-centered computing → Empirical studies in collaborative and social computing.

### KEYWORDS
Objectives and Key Results, Software Development, Organizational behavior, Goal Setting, Mixed methods

### 1 INTRODUCTION
In 1968, Edwin Locke put forward the first academic paper on the theory of goal setting [23]. Since then, goals and various frameworks for setting and achieving these goals have been used at companies around the world. Many large and successful companies, including Intel, Google, The Gates Foundation, YouTube, Adobe and Intuit specifically use the OKR framework — the Objectives and Key Results framework originally conceived by Andy Grove and popularized by John Doerr in his book Measure What Matters [9]. The OKR framework is a goal-setting methodology that aligns the objectives of an organization, team, and individual by establishing clear, measurable key results to measure progress towards and achieve strategic outcomes. It has been successfully used to drive innovation, alignment, and organizational focus, initially at Intel and later at many large companies [9]. Often, the OKR framework is especially attractive to software companies because OKRs are heavily based in data and measurement — a trait often shared by software companies. While many books exist on how to use OKRs (such as Measure What Matters [9], The OKR Fields Book [22], OKRs for All [37], Objectives and Key Results Leadership [17], etc.) there is little research on the use and implementation of such frameworks in software organizations.

OKRs are said to bring with them 4 superpowers: 1) Focus and commit to priorities, 2) Align and connect for teamwork, 3) Track for accountability, and 4) Stretch for amazing [9]. Previous work showed 70% of U.S. employees are disengaged at work, even though progress toward a meaningful goal is a top motivator for employees [4]. OKRs are purported to help people see the meaningful goal they are working towards, and help people commit to it.

This paper shares a case study and the experience of a team of over 4,000 engineers that adopted the OKR framework. We used a mixed methods approach and analyzed the data from 47 interviews and 512 survey responses using thematic analysis, linear regression, and hypothesis testing (Section 4). The following research questions are addressed:

- RQ1: What behaviors, team practices and work cultures are associated with a good OKR practice? (Section 5)  
- RQ2: What challenges are faced when implementing an OKR system in a large organization? (Section 6)  
- RQ3: What best practices can improve an OKR process? (Section 7)

This paper contributes a case study that highlights the challenges that SE teams face when adopting the OKR framework. This paper also shares experiences on how a large software team has addressed these challenges and what benefits were realized when adopting the OKR framework. Finally, the paper provides recommendations based on empirical findings for how to improve goal setting in software engineering organizations.

### 2 BACKGROUND AND RELATED WORK

#### 2.1 The OKR Framework
In The Practice of Management, Peter Drucker outlined his management principal of “management by objectives and self control” [11]. This was in strong context to the leading management style of the early 20th century defined by Fredrick Winslow Taylor and Henry Ford — an authoritarian style that did not take into account individuals' abilities and treated individuals more like machines.