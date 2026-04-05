### G. Summarizing the results

After the surveys were administered we discussed the results with each other, analyzed the data and collated our observations about the topic labelling, topic interpretation and whether requirements topic-plots matched the developers’ perception of effort.

## IV. Topics of Requirements

Within this section we investigate the requirements topics and the commits and efforts that are relevant to these topics. We argue that these topics provide some traceability between requirements documents and the commits themselves, as well as provide a high-level overview of requirements-relevant effort.

### A. Topic Plots of Requirements Relevant Effort

Figure 2 depicts the topic commits relevant to the 20 requirements topics that we extracted, and manually labelled, from the large Microsoft project that we studied. What is important about this style of plot is that it provides an overview of the topic focus of the entire system over its lifetime. We can see the transition of focus on different requirements and topics as the system evolves.

Figure 2 gives us an overview of the relevant effort exhibited in a very large data set. For instance, the 6th topic (3 down, right most), in Figure 2 shows a lack of behaviour for the first 7 years followed by a distinct and constant increase in focus and importance. The spikes in the plots are of interest (plots 7 and 9, 3rd and 4th down on the left side); as in Section V-A1 we found that a program manager indicated that the spikes were related to design change requests. Another example of interesting behaviour includes the use cases and testing topics (8th and 10th topics, 4 and 5 down on the right) becoming less important—information that would be useful to a manager.

While Figure 2 is a global plot that includes all commits in the project and is useful for high-level managers, developers are more likely to be interested in more fine-grained information about themselves and their teams and teammates. Figure 4a depicts the personal topic-plots of 2 developers (drawn only from commits made by those developers). By examining Figure 4a, we observe that the developers’ behaviour does indeed change over time, and each developer exhibits a different focus. For instance, the behaviour in the plots on the topic “use case features” is distinctly different. Plots like Figure 4a illustrate that different authors focus on different topics in general. We found this was indeed the case by clustering similar developers, but these plots allow us to see where behaviour correlates and where it does not.

This is more apparent in Figure 4b, which depicts different teams rather than different authors. We can slice these plots by authors and by organization to see what particular focus an entity (team or author) had in terms of requirements topics. For testing, metrics and milestones in Figure 4b, the trend was similar but the behaviour was not. This manager-level view provides a summary of a team’s development effort and allows one to compare teams and see the behaviour relevant to that team.

In summary, we have tracked commits related to topics extracted from requirements over time. We are able to extract and plot global results depicting global trends, and produce local topic-plots of teams and developers that can be used to investigate more personally relevant and local trends. This information can help provide feedback to a manager who could observe global trends, personal trends or team-wise trends within these plots.

## V. Qualitative Evaluation

In this section we validated with developers and managers if they were able to label topics and if the topic-plots matched their perception of the effort that occurred relevant to that topic and its associated requirements.

### A. Initial Interviews

Initially, we needed to understand requirements use at Microsoft. Thus our initial interviews helped direct the rest of the study. We interviewed one program manager and one developer for one hour each. The interviewees were chosen specifically because they had participated in writing the requirements documents that we had access to.

#### 1) An Interview with a Program manager

We interviewed a program manager and asked him to label 3 topics. He walked through each topic word by word and pieced together what he thought the topic was about. Program managers often write requirements and he immediately indicated the relationship of topics to requirements, “I know which specs this came from”.

The program manager also indicated that a series of correlated spikes were most likely caused by a Design Change Request (DCR). DCRs are management decisions about implementation. They are caused by management wanting a particular change or by external stakeholders, such as vendors, imposing limitations or requirements on certain product features. The particular peak he indicated had to do with Bluetooth support.

When shown a topic plot of a feature that he knew about, the program manager pointed to a dip and mentioned that the feature was shelved at that time only to be revived later, which he illustrated as the commits dipped for a period and then increased. This indicated that his perception of the topic and topic-plot matched reality: many of our topic-plots mapped to the perception of the program manager.