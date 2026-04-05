who identify as women (31; 12.2%). Similarly, not all respondents reported their ethnicity/origin. Most of our sample reported being White (100; 39.3%) or Asian (118; 46.5%), with the majority of the rest identifying as Black (5; 2.0%) or Hispanic/Latinx (17; 6.7%). Most of our respondents who reported their age were between 25 and 44 years of age (188; 74.0%), though we did receive responses from those 18–25 years of age (18; 7.1%) as well as 45 and older (39; 15.4%). Some noted their preference to not answer this question as well (9; 3.5%).

### 2.3.2 Survey Design

Our survey included four sections. The first section collected background information on our respondents’ careers and experience in software engineering. We then asked a series of questions in the next section to explicitly validate the relevance and importance of each of the factors in our proposed PICSE framework. We asked respondents to rate the influence of each factor when it comes to traditional tools and AI-assisted tools separately to better understand similarities and differences between the two. The next section focused on gathering insights on our respondents’ experiences with and perceptions of existing AI-assisted tools. Many of these questions focused on trust building. Lastly, the final section asked demographic questions for further contextualizing our sample.

### 2.3.3 Survey Pilot

Before administering our survey broadly, we piloted it amongst a small group of software engineers at Microsoft. The goal of our pilot was to ensure the questions we ask are clear and that the survey is reasonable in content and length. Based on the feedback provided by our pilot participants, we updated our survey in preparation for a wider dissemination.

### 2.3.4 Data Analysis

The goal of our survey was to better understand developer trust in and engagement with AI-assisted tools (RQ2 and RQ3). To answer RQ2 we analyzed responses to questions on the survey that mapped to the various components of our PICSE framework to elicit relative importance of each factor. We report descriptive statistics from each question to provide context on the importance of each factor. This also involved a comparison of factor importance with traditional tools and AI-assisted tools. We also used regression models to investigate demographic differences in the factors that affect trust and to what extent.

To answer RQ3 we analyzed responses to the open ended questions pertaining to AI-assisted tool use. More specifically, we analyzed responses to the following questions:

- We’re interested in understanding what concerns users have when encountering and using an AI-assisted tool for the first time. If you have had experience with one or more AI-assisted tools, can you share any concerns, reservations, hesitancies, etc., that you had prior to using them?
- With respect to AI-assisted tools, in what ways has your trust changed from first use to now? How has it been reshaped? What has influenced that change in trust?
- What changes would you like to see to existing AI-assisted tools that would help build initial trust and lead to prolonged use?

We employed large language models (LLMs) to assist in analyzing responses to the open-ended survey questions. While this is not yet a commonly used methodology, prior work suggests value and validity in leveraging LLMs as complementary tools for supporting and streamlining qualitative research [3, 14, 18, 49]. To begin, we extracted the responses for each question into individual spreadsheets for easier handling. We then used the 32K token context window of the GPT-4 model1 (version 0314) to generate an initial set of codes for the coding process. The following prompt was used to guide the model in generating the codes:

1 https://platform.openai.com/docs/models

Manuscript submitted to ACM