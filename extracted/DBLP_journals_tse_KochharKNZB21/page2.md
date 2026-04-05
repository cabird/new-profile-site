TRANSACTIONS ON SOFTWARE ENGINEERING, MANUSCRIPT ID  
TABLE 1: Projects Description (Data collected from the projects’ open-sourcing initiative until August 16, 2018)

![Table 1: Projects description](page2_img_1.png)

Analysis to analyze the contributions from developers as well as members of the community (who we call external developers).

This paper makes the following contributions:
- We provide a qualitative and quantitative analysis of the transition of projects from closed source to open source.
- We identify the motivations for the decision to make the transition.
- We describe the challenges faced, the process changes required, and the developers’ perceptions during the transition.
- We present an in-depth discussion of both closed source and open source features from the developers’ perspectives and provide guidelines for projects planning to go open source.

The structure of the remainder of this paper is as follows. In Section 2, we explain the methodology. We present the transition reasons in Section 3. We discuss the transition process and its outcomes in Sections 4 and 5. In Section 6, we describe the community response. We give suggestions for teams planning to move to open source and threats to validity in Section 7. Related work and conclusion are presented in Sections 8 and 9.

## 2 METHODOLOGY

In this section, we discuss our interview and survey methodology. Table 1 gives the description of projects in our dataset. We selected these projects as they are big in size, have significant history before and after the transition, and have been actively followed and forked by developers on GitHub. Figure 1 shows the overall process of our study.

### 2.1 Internal Interviews

Protocol. For interviews, we want to explore the reasons for the transition, the changes during the transition process, and the outcomes. The interviews were conducted into two phases: (1) Microsoft developers working on the projects and (2) senior Microsoft managers involved in the decision to open source the projects.

In the first phase, we interviewed Microsoft developers who had the highest number of commits in their respective projects. We used the git logs for each project to extract the number of commits made by each developer to the respective project. We emailed these developers to invite them to interviews. The authors personally interviewed these developers.

Each developer went through a semi-structured interview, structured in two parts. In the first part, the interviewer asked a few demographic questions such as total work experience at Microsoft and any prior experience with open source projects. In the second part, the interviewer asked a broad set of questions to better understand the transition process when the project moved from being closed source to open source. The high-level questions included the following:
- (a) How was the transition process?
- (b) What were some of the things developers had to do prior to the transition?
- (c) What were some of the process changes due to transition?
- (d) What are some of the positives and negatives about the system after the transition?
- (e) How has been the response of the open source community?

The developers were encouraged to talk in detail about any question or any parts of the transition our questions did not cover. Before concluding the interviews, we asked developers about any suggestions or learnings they would like to give to other project teams which are planning to transition to open source. We also asked developers to identify a senior manager who was involved in the decision making to open source the project. Interviews lasted approximately 30 minutes and the audio was recorded and later transcribed.

In the second phase, we contacted the managers who played a key role during the process before and after the transition as identified by the developers. These managers also regularly interacted with the senior management at Microsoft. Our main focus with these interviews was to understand the reasons behind open sourcing these projects. We let the interviewees talk in detail about the reasons for the transition. Interviews lasted approximately 20 minutes and the audio was recorded and later transcribed.

Participants. In the first phase, we interviewed eleven developers, each working on one or more of the six projects we investigated. The average experience of these developers at Microsoft was 8.36 years. For the second phase, we interviewed five senior managers. These developers and managers cover all the six projects (some worked on both CoreFX and CoreCLR). Table 2 and 3 show the demographics of internal participants from various projects.

Data Analysis. After the interviews, we coded all the transcripts. For each interview, we generated cards containing the key points. We then performed open and axial coding. Open coding involves reading the data several times and creating conceptual labels for segments of data to denote the concept they represent. Axial coding involves