RQ2: What factors influence which fix an engineer chooses?

This paper’s primary contribution: The first systematic characterization of the design of bug fixes. It analyzes the design space of bug fixes and describes how developers navigate that design space, to understand the decisions that go into choosing a bug fix (see Figure 1).

## II. RELATED WORK

Several researchers have investigated bug fixes. Perhaps the most relevant is Leszak, Perry, and Stoll’s [5] study of the causes of defects, where the authors classified bug reports by ‘real defect location’:

> ‘Real’ location characterizes the fact that… some defects are not fixed by correcting the ‘real’ error-causing component, but rather by a… ‘work-around’ somewhere else.

While the authors collected real defect locations, the data was not analyzed or reported. Our work explains why one fix would be selected over another; or in other words, why an engineer would choose a workaround instead of a fix at a “real location.”

Ko and Chilana studied 100 contentious open-source bug reports to investigate how engineers make decisions about bugs [6]. While this paper did investigate “design dimensions” during bug fixing, by “design” they meant the design of software (for example, whether a fix makes the software more usable), rather than “design” in the sense we mean it, which is the design of the fix itself. Our study also complements this study by improving our understanding of the decision making process when fixing bugs, specifically for commercial software and for decisions that get made outside of the bug report itself.

Breu and colleagues observed in a study of 600 bug reports that 25.3% of discussions in bug reports are spent on the correction itself, discussions involving suggestions, feedback requests, and understanding files [7]. Our study complements this work by exploring the design space of bug fixes.

Several other researchers have investigated bug fixing. In a manual inspection of bug fixes, Lucia and colleagues found that some fixes are spread over many lines of code [4]. Bird and colleagues found that bug fixes reported in bug databases have different characteristics than fixes not reported in databases [8]. Yin and colleagues investigated why bugs are fixed incorrectly, that is, require a later bug fix to the source code changed by the original fix [9]. Aranda and Venolia investigated 10 closed bugs and surveyed 110 engineers about bug coordination patterns at Microsoft [10]. Spinellis and colleagues attempted to correlate code metrics, such as number of bugs fixed, to evaluate the quality of open source software [11]. Storey and colleagues investigated the interaction of bugs and code annotations [12]. Anvik and colleagues investigated which engineers get assigned to fix bugs [13]. In contrast to these papers, our paper seeks to understand in what way bug fixes differ, and why one fix is chosen over another.

## III. METHODOLOGY

To answer our two research questions, we conducted a mixed-method study. We used several research methods, rather than a single one, both to study our research questions in as broad a way as possible and to triangulate the answers to improve their accuracy [14]. While we feel that our methods are thorough and rigorous, some threats still exist as we discuss in Section V. We now discuss our four research methods: opportunistic interviews, firehouse interviews, triage meeting observations, and surveying. For each method, we discuss the goal of using that method, how we recruited participants, the protocol we used, how we analyzed data, and a brief summary of the shape of the data we collected.

### A. Opportunistic Interviews

With our first method, we randomly asked engineers about a recent bug they had been involved in fixing.

**Goal.** Our goal in performing opportunistic interviews was to rapidly obtain qualitative answers to our research questions in a way that was minimally obtrusive to interviewees.

**Protocol.** We conducted these interviews by having the first author go to a building that housed a particular product group. Armed with a list of office numbers for software engineers, the interviewer walked to each engineer’s office. If the engineer’s door was closed, was wearing headphones, or was talking to someone else, the interviewer went to the next office. Otherwise, the interviewer introduced himself, said that he was doing a study, and asked if the interviewee had 10 to 15 minutes to talk. If the engineer consented, the interviewer asked a series of semi-structured questions [14] regarding the last bug that the engineer was involved in fixing. Although interviewees were not offered an incentive, before the interviewer left, interviewees were compensated with a $10 gift card for lunch.

We performed pilot interviews to identify potential problems and rectify them prior to the main study. In doing so, we noticed that pilot interviewees could remember the fix they made, but had difficulty recalling the alternative fixes they did not make. Some pilot interviewees stated that they fixed the bug the only way that it could have been fixed, even though there clearly were other fixes, even from our perspective as outsiders. We sought to reduce this ‘hindsight bias’ [15] in our interviews using two different techniques. For every odd-numbered interview (the first, the third, and so on), we gave the interviewee an example of three bugs and multiple ways of fixing each bug. For the other half of the interviewees, we presented a small program containing a simple bug, and then asked the interviewee to talk us through how she might fix the bug; interviewees typically mentioned several alternative fixes. Comparing the results obtained after starting interviews with these two methods, we noticed no qualitative differences in the responses received, suggesting that both methods were about equally effective. Comparing pilot interview results against real interview results, we feel that this technique significantly helped interviewees think broadly about the design space.

After this introductory exercise, the interviewer asked the interviewee about the most recent bug that they fixed. The interviewer asked about the software that the bug appeared in, the