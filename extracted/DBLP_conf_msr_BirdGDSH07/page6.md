### 2.2.5 Hypotheses

We surmise that the likelihood of acceptance into the core, elite developer group of an open source project is likely to be modulated by three effects: commitment, skill acquisition/demonstration, and reputation. For every individual there is a "race" going on: will s/he become skilled and reputable enough to become a developer before s/he loses interest? In some sense, there is a race within each individual's tenure time line to acquire the requisite skill set and reputation before commitment wanes. We therefore expect the following:

- Hypothesis 1: Likelihood of attaining developer status will rise with tenure, peak at some point, and then decline.

- Hypothesis 2: Demonstration of skill level, such as patch submissions, will increase the likelihood of becoming a developer.

- Hypothesis 3: Social status will positively influence attainment of developer status.

We conclude this section by noting that non-monotonic rates of event occurrences, which grow with time, and then decline (or vice versa) are observed in other settings. Divorce rates in marriage tend to be high initially, and decline before increasing again. Fichman & Levinthal [12] describe "the liability of adolescence" in the case of employment duration where new hires tend to have an initial honeymoon period, after which they are at greater risk of job dissatisfaction; if they survive this period, skill acquisition may lead to improved job performance and satisfaction. Fichman & Levinthal argue that this phenomenon explains a non-monotonic rate of job changes. Katz [18] describes a related phenomenon whereby employees go through phases of socialization with increasing skills and connections, innovation with relatively high productivity, and stabilization of steady-state or decline.

## 3. Analysis

In this section, we present our data extraction methodology, some background on the statistical models used, and the results.

### 3.1 Data Extraction & Cleaning

We gathered source code repository information (who changed what file and when?) and email archive information (who sent an email? who replied to it? when?) in a manner similar to previous research [13, 22]. Extra effort was spent to ensure that email aliases and repository author identities were properly resolved, using automated and manual methods [3]. We built a social network from the email correspondence and computed social network measures [27] on a monthly and cumulative basis. We expect that social network positions/measures would be indicative of social status, and thus of likelihood of attaining developer status. We also extracted patch submissions from emails and searched the project repository for evidence of at least partial patch application9. Prior research has indicated the importance of patch submission in gaining developer status [11]; so we expected that this data would be an important predictor.

For each developer, the transition interval is the time between their first appearance on the mailing list and their first commit to a file. This interval is essentially the "response variable" we are trying to model statistically, in order to shed light on the factors affecting time interval until immigration.

### 3.2 Predictors & Univariate Statistics

All the variables used in our study are gathered monthly for the complete population of potential immigrants "at risk" (i.e. all mailing list participants who are not yet developers). Each record described below is for one email participant, for one month. In each case, n is the number of records, c is the number of candidates, and i is the number finally immigrating.

First, based on previous research, we conjectured that patch submission is important; the variable patches_sub indicates the number of patches submitted by this individual. Second, as discussed earlier, we expect that norm_indegree (normalized in-degree), as a measure of the degree of response/interest to this individual is important. This is measured as the proportion of the total population that has responded to this candidate since his/her first post. The variable sent_cum measures the total number of messages sent by this individual prior to this month. Finally, devs_cum is the total number of developers in the community. This is used as a control variable which allows us to control for the effects arising from size, such as greater openness to immigrants in smaller projects (with fewer developers) seeking to attain critical mass. Another control variable, time_trend, is simply calendar time in years (as opposed to the tenure time, which begins for each person with their first observed email) to control for unobserved effects relating to project age.

It should be noted that Apache and Postgres have much longer histories; the email list for both is available for over 10 years. Python is shorter with 7 years worth of email data available respectively. Although Apache’s social network has been building for well over a decade, the source code repository that we used (which contained the data for the 2.0 version of the Apache web server) only con-

9 We encourage the reader to see our Mining Software Repositories 2007 paper located at http://wwwcsif.cs.ucdavis.edu/~bird/papers/bird2007dps.pdf for details of this process