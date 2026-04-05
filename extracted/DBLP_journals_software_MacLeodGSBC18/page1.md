## Code Reviewing in the Trenches: Understanding Challenges and Best Practices

Laura MacLeod  
Microsoft

Michaela Greiler  
Microsoft

Margaret-Anne Storey  
University of Victoria

Christian Bird  
Microsoft Research

Jacek Czerwonka  
Microsoft

### 1. INTRODUCTION

Code review is a software practice that is widely adopted by and adapted to open source and industrial projects. Code review practices have been researched extensively, with most studies relying on trace data from tool reviews, augmented by surveys and interviews in a few cases. Several recent industrial research studies—in addition to blog posts and white papers—have exposed additional insights on code reviewing “from the trenches”.

Unfortunately, the lessons learned about code reviewing are widely dispersed and poorly summarized by existing literature. In particular, practitioners wishing to adopt or reflect on a new or existing code review process may find it difficult to know which challenges to expect and which best practices to adopt for their specific development context.

Building on the existing literature, we add insights from a recent large-scale study of the code review practices of Microsoft developers to summarize the challenges faced by code change authors and reviewers, suggest best practices for code reviewing, and mention trade-offs that practitioners should consider.

### 2. CODE REVIEW STUDY

To understand code review processes, researchers generally focus on a retrospective analysis of code review trace data (e.g., CodeFlow [1], GitHub pull requests [2], and emails [3]). But some researchers have conducted interviews and/or surveys [2, 4] to reveal motivations and the challenges faced during code review. Bacchelli and Bird [1] further interviewed developers while they performed code reviews.

To gain a more in-depth understanding of the human and social factors that drive code review in a large industrial context, we observed and interviewed several teams at Microsoft. We complemented this with a survey to validate our initial findings about tools use, developer motivations, and the challenges faced with a broader set of developers. The survey was distributed to 4,300 developers and received 911 responses. Figure 1 summarizes the respondents’ demographics.

For ethnographic-style observations, we sat with four Microsoft teams for one week each to directly observe their code reviewing activities. The teams were comprised of new developers, senior developers, and team leads working on a range of projects—from new software to legacy systems—and a mix of internal and external products. We conducted semi-structured contextual interviews with 18 different developers from these four teams, either during or shortly after they performed a code review activity (bringing situated insights). Our observations of their code review activities allowed us to reveal cultural and social issues. Together with the interviews, we gained an understanding of how the teams approached code reviews and what policies they used. This article comprises the main findings and lessons learned from our study that may be of interest to practitioners. A companion technical academic report [5] provides details about the observations, interviews, and surveys.

### Code review at Microsoft

Our survey and observations reveal that Microsoft’s developers recognize the value of code reviews and feel it is an important activity. Developers appreciate reviewer feedback and are more thorough when they know their code is going to be reviewed. Whether they are a code author or reviewer, the process also helps them become more confident. Interestingly, not all teams have explicit rules or policies around code reviews and code review policies vary. Still, teams at Microsoft share a common code review life cycle that includes the following steps:

- Preparation of the code to be reviewed (by the author).
- Selection of reviewers (automatically or manually), with varying requirements for who should be selected and how.
- Notification of the selected reviewers as well as other stakeholders, with team policy dictating who should be informed and how.
- Feedback provided by reviewers to authors and other stakeholders.
- Iteration involving communication between the author and reviewer and further work by both.