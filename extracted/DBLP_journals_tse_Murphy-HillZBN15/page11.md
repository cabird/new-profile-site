## Table 5
### SURVEY RESPONDENTS’ OPTIMAL FIX
Microsoft

![Survey respondents' optimal fix table (heatmap)](page11_img_1.png)

taken any actions to artificially reduce the number of bugs that you were assigned? If yes, what were those actions?

Respondents provided several creative methods that they had used. One described the methods of many of the respondents:

> Yes, of course. Combine multiple bugs into a single bug; resolve bugs as "won't fix" and then reactivate them later; temporarily assign bugs to another developer who has room in their cap.

Other respondents called the first method of combining bugs “coagulation,” using “umbrella reports,” or using “bug buckets.” Some respondents used unorthodox bug reporting techniques to subvert bug caps:

- Pushing bugs to future milestones to keep them out of the management query
- Track bugs by email to myself instead of product studio
- Yes, we've parked bugs in different paths in our database or kept them on the side in an Excel sheet until bug count is reduced. (this is anonymous, right? :) )

A few developers reported other ways of gaming the policy as well. This suggests that the bug cap mechanism may not be working as designed. Researchers in other domains have suggested that workarounds are both indications of poorly designed policies and of positive opportunities for change [27]. How to implement this change, however, remains an open question.

Equally interesting is that several developers appeared to be morally outraged that we even asked this question:

> I've never heard of this happening... My perspective on this is "Wow, that's just evil. Who the heck does that?"

> Never, artificially lowering the bug count that is lying or cheating (it's unethical). The key is to not inject bugs

> Yes, but I was forced to. I did not agree with it. Playing games with bugs/stats to meet a dashboard goal is not a good thing.

To investigate if there is a relation between the reaction of developers towards bug caps and the product that they worked on, we manually coded the open-text responses into whether developers had worked with bug caps. We then built a logistic regression model with current product division, primary work area (test/dev), years at Microsoft, years in the software industry as the independent variables to model whether developers encountered bug caps in their work. None of the coefficients in the regression model were statistically significant.

The contrasting reactions between those who readily practice artificial bug reduction and those who find the practice abhorrent suggests that bug caps are not widely discussed in the company.

Interface Breakage. Another factor that participants said influenced their bug fixes is the degree to which a fix breaks existing interfaces. If a fix breaks an interface that is used by external clients, then an engineer may be less inclined to implement that fix because it entails changes in those external clients.

One example comes from P16, who was working on a bug related to playing music and voice over Bluetooth devices. He said that a better fix for the problem would be to change the Bluetooth standard, but too many clients already depend on it. Another example comes from P25, which we discussed in the Data Propagation section, who fixed a bug in a multi-layer system where a lower layer was producing in kilobytes when the upper layers were expecting values in megabytes. Rather than fixing the bug in the lower layer where the data was being produced, the engineer fixed the bug in a higher layer, because changing interfaces implemented with Microsoft’s Component Object Model is a discouraged practice [28]. Interestingly, P25 was very resistant to change the interface, even though he was confident that no other clients were using it.

We also asked survey respondents how often the following factor influences which fix they choose: “Doesn’t change external interfaces or breaks backwards compatibility.” 89% {86%} reported that “usually” or “always,” suggesting that external interfaces strongly influence choosing which bug fix to implement (Table 4B).

Consistency. This factor describes to what degree a fix will be consistent with the existing software or existing practices. A fix that is not consistent with the existing code may compromise the design integrity of that code, leading to code rot.

One example is from P35, who was fixing a bug in a web portal in which the new version was not backward compatible under certain conditions. During the code review in which this bug was discovered, a colleague told P35 to fix this bug in a way that was consistent with how similar bugs have been fixed before. Another example is P10, who fixed a performance bug in his build system. P10