## II. RELATED WORK

Previous studies exist that have examined the practices of code inspection and code review. Stein et al. conducted a study focusing specifically on distributed, asynchronous code inspections [17]. The study included evaluation of a tool that allowed for identification and sharing of code faults or defects. Participants at separated locations can then discuss faults via the tool. Laitenburger conducted a survey of code inspection methods, and presented a taxonomy of code inspection techniques [9]. Johnson conducted an investigation into code review practices in open source development and the effect they have on choices made by software project managers [10].

Porter et al. [11] reported on a review of studies on code inspection in 1995 that examined the effects of factors such as team size, type of review, and number of sessions on code inspections. They also assessed costs and benefits across a number of studies. These studies differ from ours in that they were not tool-based and the majority involved planned meetings to discuss the code.

However, prior research also sheds light on why review today is more often tool-based, informal, and often asynchronous. The current state of code review might be due to the time required for more formal inspections. Votta found that 20% of the interval in a "traditional inspection" is wasted due to scheduling [12]. The ICICLE tool [13], or "Intelligent Code Inspection in a C Language Environment," was developed after researchers at Bellcore observed how much time and work was expended before and during formal code inspections. Many of today’s review tools are based on ideas that originated in ICICLE. Other similar tools have been developed in an effort to reduce time for inspection and allow asynchronous work on reviews. Examples include CAIS [14] and Scrutiny [15].

More recently, Rigby has done extensive work examining code review practices in open source software development [5]. For example, in a study of practices in the Apache project [16] they data-mined the email archives and found that reviews were typically small and frequent, and that the contributions to a review were often brief and independent from one another.

Sutherland and Venolia conducted a study at Microsoft regarding using code review data for later information needs [17]. They hypothesized that the knowledge exchanged during code reviews could be of great value to engineers later trying to understand or modify the discussed code. They found that "the meat of the code review dialog, no matter what medium, is the articulation of design rationale" and, thus, "code reviews are an enticing opportunity for capturing design rationale."

When studying developer work habits, Latoza et al. found that many problems encountered by developers were related to understanding the rationale behind code changes and gathering knowledge from other members of their team [18].

## III. METHODOLOGY

In this section we define the research questions, describe the research settings, and outline our research method.

### A. Research Questions

Our investigation of code review revolves around the following research questions, which we iteratively refined during our initial in-field observations and interviews:

1. What are the motivations and expectations for modern code review? Do they change from managers to developers and testers?
2. What are the actual outcomes of modern code review? Do they match the expectations?
3. What are the main challenges experienced when performing modern code reviews relative to the expectations and outcomes?

### B. Research Setting

Our study took place with professional developers, testers, and managers. Microsoft develops software in diverse domains, from high-end server enterprise data management solutions such as SQL Server to mobile phone applications and smartphone apps to search engines. Each team has its own development culture and code review policies. Over the past two years, a common tool for code review at Microsoft has achieved wide-spread adoption. As it represents a common and growing solution for code review (over 40,000 developers used it so far), we focused on developers using this tool for code review—CodeFlow.

CodeFlow is a collaborative code review tool that allows users to directly annotate source code in its viewer and interact with review participants in a live chat model. The functionality of CodeFlow is similar to other review tools such as Google's Mondrian [6], Facebook's Phabricator [7], or open-source Gerrit [8]. Developers who want their code to be reviewed create a package with the changed (new, deleted, and modified) files, select the reviewers, write a message to describe the code review, and submit everything to the CodeFlow service. CodeFlow then notifies the reviewers about the incoming task via email.

Once reviewers open a CodeFlow review, they interact with it via a single desktop window (Figure 1). On the top left (1), they see the list of files changed in the current submission, plus a "description.txt" file, which contains a textual explanation of the change, written by the author. On bottom left, CodeFlow shows the list of reviewers and their status (2). We see that Christian is the review author and Alberto, Tom, and Nachi are the reviewers. Alberto has reviewed and is waiting for the author to act, as the clock icon suggests, while Nachi already signed off on the changes. CodeFlow's main view (3) shows the diff-highlighted content of the file currently under review. Both the reviewers and the author can highlight portions of the code and add comments inline (4). These comments can start threads of discussion and are the interaction points for the people involved in the review. Each user viewing the same review in CodeFlow sees events as they happen. Thus, if an author and reviewer are working on the review at the same time, the communication is synchronous and comment threads act similar to instant messaging. The comments are persisted so that if they work at different times, the communication