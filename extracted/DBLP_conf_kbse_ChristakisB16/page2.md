analyzers can or do fit into their process. We also examined many corrected defects to understand what types of issues occur most and least often.

We expect the empirical results that we present here to shed light on many aspects of program analysis, specifically, on what tools should be integrated in the development process, where tool designers should focus their efforts, what developers like and dislike in analyzers, what types of code issues are most often encountered, and what project managers should expect from different bug-finding techniques.

We assert that by understanding the above, the program analysis research community can focus on analyzers that are most amenable to real world use. For researchers, our findings also provide a view into today’s industrial realities with respect to program analysis.

## 2. SURVEY

In an effort to understand developers’ perspectives on program analyzers, we deployed a broad survey across Microsoft. Surveys are beneficial because they allow researchers to elicit answers to the same set of questions from a large sample of some population. In our case, we are interested in industrial software developers. Our goal is to obtain a large enough sample such that responses are representative of the population and that quantitative analysis can find results with statistical significance (if indeed there are signals in the responses). Surveys have been used in empirical software engineering investigations many times in the past to provide insight [48].

### 2.1 Data and Methodology

We used Kitchenham and Pfleeger’s guidelines for personal opinion surveys in software engineering research when designing and deploying our survey [41]. We followed a pilot and beta protocol when developing the survey. We started by identifying the high level goals for our investigation:

- Uncover any obstacles in the adoption of program analyzers by developers.
- Understand how practitioners use program analyzers today and what functionality they find desirable.
- Identify the non-functional characteristics that developers want in a program analyzer.
- Determine how program analyzers should fit into developers’ current practices.

From these goals, we derived an initial set of survey questions. To pilot our questions, we scheduled interviews with five developers across Microsoft and administered our survey questions in person. This allowed us to gauge if each question was clear enough or should be altered, if the terms we used were familiar to developers, and if the questions we asked were actually eliciting answers that helped us achieve our goals for the survey.

After updating the questions following these interviews, we created a beta of our survey that we deployed to 100 developers randomly selected across the company. This initial survey included additional questions at the end, asking participants if they found any portion of the survey difficult to understand or answer, and asking if they had any other relevant information to share about the topic. We received 20 responses to this survey. These responses were solely used to improve the survey itself and were not included in subsequent data analysis presented in this paper.

We then made improvements to the survey based on responses to the beta. An example of such changes included defining terms such as 'aliasing' and 'purity' more clearly. In another case, we had a question with check boxes that asked developers which types of code issues they would like program analyzers to detect. This question was changed so that developers had to create a ranking of the types of issues; in the beta, some developers checked almost all of the boxes, making the answers less informative. A few of our questions were open ended (for example, “Why did you stop using program analyzers?”), and the responses to the beta showed that there were clear categories in the answers. For these, we changed the question to a multiple choice format that included each of the categories, and we added a write-in option if the respondents’ answer did not fit into one of these categories. Such changes allow analysis to scale with large numbers of responses. We also made changes to the survey to ensure that it did not take too long to answer, as long surveys may deter participation. Our goal was for the survey to take a respondent approximately 15 minutes to complete.

After finalizing the questions, we sent invitations to answer the survey to 2,000 developers selected at random across all of Microsoft. The survey was anonymous as this increases response rates [52] and leads to more candid responses. As incentives have been shown to increase participation [51], respondents could enter themselves into a raffle to win four $50 Amazon gift cards. We received 375 responses to the final survey, yielding a 19% response rate. Other online surveys in software engineering have reported response rates from 14% to 20% [48]. The median time to complete the survey was 16 and a half minutes, quite close to our goal of 15 minutes. We report the median rather than average because there were some outliers that skew the average (one person had a completion time of just under five days!). The range of years of development experience was from zero to 43, with a median of nine (mean of 10.86).

The survey questions, responses, and analysis scripts can be accessed at https://github.com/cabird/ProgramAnalysisSurvey.

### 2.2 Results

We break our results down into three categories. First, we look at the barriers to using program analyzers and the reasons why developers stop using them.

Second, we examine the functionality that the developers’ answers indicate they want in program analyzers. This functionality includes the types of issues that program analyzers catch, the types of programming languages they can analyze, whether the analyzer examines a whole program or changes, and if the developer can direct the program analyzer toward parts of the code.

Third, we look at the non-functional characteristics that a program analyzer should have. This includes attributes such as the time required for analysis, how many false positives it should yield, when it should run, where the output should be and what form it should take, and where the analysis should fit into the development process.

In addition, for most questions, we break down our answers by attributes of the respondents. From our interviews and based on anecdotal evidence, we believe that developers who have at least a basic understanding of program analysis