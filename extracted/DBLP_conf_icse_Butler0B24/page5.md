in general, geographic location and career level. After that we asked general questions about elements of team culture that are related to the OKR framework or adopting to the framework. These included asking about having a unified mission, commitment to organizational priorities, and willingness to embrace change.

In this organization, management and HR also asked yearly questions about the health of the organization and leadership wanted to understand how using the OKR framework correlated with the cultural values they were trying to drive. To this end, we included questions from their annual survey, including questions around spending time doing work you enjoy, being happy at the company, the value of creativity, and the level of challenge at work. Results from all of these questions were later correlated with the OKR maturity score (see below).

### OKR Maturity Score

Using the OKR framework laid out in Measure What Matters [9], we broke the framework down into 6 specific pieces. We used the term “goal” instead of objective and/or key result throughout much of the survey so that individuals who are not aware of the OKR framework specifically (perhaps more junior engineers who aren’t yet involved in business planning) could still respond based on their use of the components of the framework. The 6 elements we identified were as follows:

- Defining goals
- Measuring goals
- Communicating goals
- Reporting progress towards goals
- Reviewing progress towards goals
- Adjusting goals or resourcing towards goals

We asked individuals how effective their team is at these 6 steps of the OKR framework using a Likert scale with options Not Effective at All, Slightly Effective, Moderately Effective, Very Effective and Extremely Effective. Using this 6 question mechanism, we then gave each response an “OKR Maturity” score. If individuals selected “Very Effective” or “Extremely Effective” they scored a 1 for that component of the OKR framework. If they selected anything else, they scored a zero. We summed the score of all 6 components to give each response a maturity score between 0 (not at all mature) and 6 (mature in all levels of the OKR framework).

Maturity Score:
Σ_item { 1, if item is Very Effective or Extremely Effective; 0, otherwise } (1)

### OKR Maturity Correlations

Once OKR maturity score was calculated, we used linear regression to examine correlations of OKR maturity with the elements of demographics and team culture mentioned above. Using linear regression with several factors allows us to examine the relationship of each factor to the dependent variable, OKR maturity, while controlling for other factors to isolate and understand the unique contribution of each variable in explaining OKR maturity.

We found OKR maturity was positively correlated with years in industry, having a unified mission as a team, team commitment to organizational priorities, high team value of creativity, spending time doing work that is truly enjoyed, and happiness at the company. In contrast, we found OKR maturity to be negatively correlated with higher level, years at the organization, being at the main office (vs. satellite offices) and the statement “creating my software is challenging”. All of these correlations were statistically significant with a p-value < 0.05.

### 5.3 Modern Development

In addition to looking at OKR maturity, we also wanted to understand how OKRs were related to more modern engineering practices. In order to examine this, we identified 7 components of modern engineering (listed below). The components are related to listening to customers, experimentation, rapid iterations, and continuous learning. Safe velocity [38] is the concept of moving fast but being able to move safely because of safeguards like flighting, feature gates, telemetry, reporting, alerting, etc.

- I do my work with the customer in mind
- I use experimentation to drive decisions/features
- I have hypotheses as part of my experiments
- I work at a safe velocity
- I use rapid iterations
- I mostly commit small changes frequently
- I am always learning

We then asked individuals how effective they were at each of these practices, using the same Likert scale we used for OKR maturity (a 5 point scale ranging from “Not effective at all” to “Extremely effective”).

### OKR Maturity Correlations

We used linear regression to examine correlations of modern engineering practices with OKR maturity. We found that the practice of using experimentation to drive decisions/features and using rapid iterations were both positively and significantly correlated with OKR maturity. This is similar to the findings of Ferrazzi which found OKRs complement the agile methodology [12]. The OKR framework stresses having big goals (in fact it says goals should not even be 100% attainable, but rather aspirational in nature) and regularly checking on progress towards these goals, making adjustments as necessary. We believe having an experimentation mindset aligns well with this big-goal idea. Experiments allow developers to see if an idea will work, and therefore have early proof that it will be successful before shipping broadly. This gives people the confidence to make big, lofty goals, as they know they will have early data to validate or invalidate their idea, allowing them to pivot quickly if something isn’t working. The monthly check-in requirements of the OKR framework also align well with making decisions based on experimental data — each month the KRs are evaluated and can be changed if the data suggests it should be. Similarly, quick and on-the-fly changes based on data can only be done through rapid iterations. We believe these two tenets of more modern engineering practices align well in theory with the OKR framework, and that was borne out in our survey data.

### Modern Engineering Score

Using a similar score mechanism to the OKR framework, we also calculated a “Modern Engineering Score”. We used the 7 items of modern engineering we list above, and scored them using the following equation: