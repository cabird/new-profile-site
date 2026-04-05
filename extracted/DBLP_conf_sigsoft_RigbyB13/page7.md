![Violin plot of lines changed by project](page7_img_1.png)

Figure 4: Churn: Lines added and removed. Note: we do not show proportion of changes over 10,000 lines.

![Boxplots of reviewers per review by project](page7_img_2.png)

Figure 5: Two reviewers involved in review in the median case

et al. [19] found that two reviewers discovered as many defects as four reviewers. The consensus seems to be that two inspectors find an optimal number of defects [27]. In OSS review, the median number of reviewers is two; however, since the patch and review discussions are broadcast to a large group of stakeholders, there is the potential to involve a large number of interested reviewers if necessary [25].

> Convergent Practice 4: Two reviewers find an optimal number of defects

At AMD the median number of reviews is 2. While reviewers are typically invited, Ratcliffe describes how CodeCollaborator allows invites to be broadcast to a group of developers [20]. He further describes how CodeCollaborator suggests potential reviewers based on who has worked on the file in the recent past.

For Google Chrome and Android, there is a median of two reviewers; see Figure 5. Gerrit allows developers to subscribe to notifications when a review includes changes to a particular part of the system [28]. Reviewers can also be invited when the author includes their email address in the review submission sent to Gerrit.

At Microsoft the median number of reviewers invited to each review in Bing, Office, and SQL respectively are 3, 3, and 4. As Figure 5 shows, the median number of people that actually take part in a review (other than the author) is 2. Interestingly, we found that there was only a minimal increase in the number of comments about the change when more reviewers were active and there was no increase in the number of change sets submitted (i.e., the same number of “rounds of reviewing”). We also investigated, both qualitatively and

quantitatively, reviews that had many more reviewers than the median and found that the author or the reviewers will invite additional developers after a round of reviewing has taken place. This can be the result of a developer realizing that someone else is better fit to examine the change or concluding that the change carries a high risk and should be reviewed by “more eyes”. The general practice appears to involve inviting three to four reviewers and then letting the review take its course which may lead to involving additional participants.

### 4.3 Defects vs Discussion

The rigid time constraints of synchronous review meetings forced traditional inspections to focus exclusively on finding defects, discussions of other topics, such as solutions to the defect, were strictly forbidden [9]. Inspection used explicit roles, such as reader and secretary, to ensure that defects were accurately recorded and that developers were not distracted from finding defects [9]. At Lucent there is a median of 3 true defects found per review [19]. An additional 4 defects per review were found to be false positives. Inspections also found a large number of soft maintenance issues, median 13 per review, which included coding conventions, and the addition of comments. This type of soft maintenance code improvements was also observed at Microsoft and in OSS review [2, 25]. In contrast to software inspection, asynchronous reviews have less rigid time constraints allowing for detailed discussions of software artifacts. For example, on OSS projects, the discovery of the defect is not the focal point. Instead developers discuss potential defects and solutions to these defects. These team discussions mean that the author is no longer isolated from his or her peers when