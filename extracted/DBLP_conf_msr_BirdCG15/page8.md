earlier in this section, a few teams only performed a manual analysis of individual code reviews, such as reading through code review comments for patterns. Thus, it was beneficial to provide both computed metrics and the raw data from which they were derived.

> Provide both the derived metrics and the raw data so that teams can quantitatively measure themselves, but also manually investigate the individual cases when desired.

## F. Impacts and Outcomes from using CodeFlow Analytics

After having examined the reasons that various teams have used CFA, we also asked them about what outcomes they saw and what impact it had.

Few teams actually had quantitative evidence supporting outcomes. One exception was Bing, where the percentage of checkins that had gone through code reviews rose from around 60% to over 80% and some teams are now consistently achieving 100% sign-off. They credit both a focus from upper management (as a result of reports from CFA) and visibility of sign-off metrics in web dashboards.

Four teams indicated that they had seen an improvement by watching the metrics change over time (though they did not provide us with actual numbers) and also observed attitude shifts in the team with regard to the importance of code review. For example, Visio did see a rise in tester participation once the team began monitoring and encouraging code review activity.

For two teams, their use of CFA helped them decide that their effort would best be served in areas other than code review. So while the outcome was that they did not change their practices, they were more confident in the decision to not change because it was backed by data.

Several of those interviewed expressed a feeling that they believed it would have an impact, but that it was still too early to tell how much of an impact they would see. Some were also worried about possible negative impacts. "I have no doubt that those analyses will lead to behavior changes, but I am concerned about that change," said one, who was fearful that team members might focus too much on numbers.

As a few teams had education as their impetus to use CFA, a common outcome was improved training. One interviewee travelled to Asia to provide training on code review practices to a contracted team. Another team has provided training multiple times on weaknesses found through analysis of code reviews. Still another wrote an internal paper on reviewing practices.

## G. Challenges faced during use of CodeFlow Analytics

This section details some of the challenges we observed during the interviews. Some of these can be used to improve the CFA experience. Other challenges are inherent to analytics, and some really can't be fixed. Nonetheless, users of analytics systems should be aware of them.

### Translating questions into metrics

Several engineers had a hard time translating their original questions into metrics that they felt reflected their initial intent. Engineers explained that they had to decide exactly what the terms they used meant. For example, several participants mentioned that they wanted to measure response time and participation rate, but initially they had no concrete definition for how a response time should be measured. Is it the time to first comment, or the time to first signoff? In general, people mentioned that they had to make tweaks to the metrics provided to make them useful for their context. They did indicate that the availability of predefined metrics in CFA supported them during the investigation and clarification process and provided a good starting point for more detailed adjustments.

### Deriving proxy measures

Some engineers explained that they had to create proxy measures, as the direct measure could not be implemented. For example, several engineers wanted to measure the duration from the creation of a code review to successful checkin of this code change in the code base. As CFA data contains only review data and does not have repository checkin information, such metrics cannot be obtained from the single database. In most cases, engineers used the time to "signoff", i.e., the event that peer reviewers deemed the code change as good enough for checkin, instead of checkin time. One engineer said: "I was able to gather the data. [...] I think I have to refine the query between what's available and redefining my question to be a more correct one. But in the end [...] I got close enough data so I was able to deliver the point to the team."

> No data is an island - The ability to "link" and join different data sources reflecting different parts of the development process (e.g., review and testing practices) is important. We should enhance our solution space and make available linkages more accessible.

### Unawareness of data availability

Some of the data points or metrics that engineers said were not in CFA were actually either directly accessible through the database interface or by querying the data in a certain way. For example, many engineers wanted to look at individual reviews and comments. Those are not surfaced in the Excel template, but they can be obtained with additional work. Some gave up on this task, while others looked manually through code reviews and comments by opening them via the normal code review dashboard—a tedious manual task. One potential fix for this is including low-level individual data in the example Excel template (e.g., last 10 recent comments). As we discuss in Section II, we do have data that allows users to "link" code reviews to checkins. However, only one participant discovered this data. Discovering such information should be easier for users, for example by discussing different usage scenarios on the CFA web site.

> Just because users use part of your system doesn't mean they know about all of it. Always consider discoverability.

### Interpretation of data

Interpretation of analytics data is not always straightforward. In our study, we observed problems with the ability to interpret the data at hand. For example, some people didn't know about "FYI" reviews. This is a practice used by some teams where they create reviews whose sole purpose is to inform others about changes and not to solicit feedback from reviewers. This affects participation rates, as team members "invited" on these reviews