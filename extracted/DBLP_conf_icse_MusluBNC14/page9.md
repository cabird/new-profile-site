![Venn diagram of survey results](page9_img_1.png)

Figure 9: Survey results for the question: “Which of the following would make the transition unnecessary for your work at Microsoft?” (colored). ‘No change’ is the developers who are already satisfied with CVCS for their work at Microsoft.

product’s CVCS repository, either through BVCS mirroring or by manually transferring the DVCS history.

One particular aspect that DVCSs shine for incubation is the ability to share code between developers’ private local repositories. While developing a new feature in an agile fashion, most of the time, the developer’s changes are not ready to be checked in to the master repository. However, the developers might need some changes made by another developer. Sharing these incomplete changes through the master repository would pollute the development history with incomplete — and possibly non-building — versions. Therefore, the developers use peer-to-peer sharing capabilities and synchronize with another developer’s private repository directly, rather than synchronizing through the master repository. Seven developers we interviewed confirmed that DVCS’s peer-to-peer sharing works seamlessly and efficiently for sharing non-building and incomplete changes between developers.

### 7.5 RECOMMENDATIONS

We conclude the section by providing some recommendations for the developers, teams, and managers who consider transitioning.

Identify the product and developer needs carefully: For large products in large companies, it is rare to use advanced DVCS operations, such as modifying a published history, transplanting a portion of the history from one branch to another. Almost all developers mentioned that DVCSs provide advanced operations and give a lot more power to the developer compared to CVCSs; however, during the interviews, only a few developers stressed that these advanced operations are critical for their workflow. Figure 9 summarizes the related survey results. 55 (77%) survey participants confirmed that extending the existing CVCSs with some offline operations and lightweight branches would make the transition for their workflow at Microsoft unnecessary.

If most developers are only interested in lightweight branches, the CVCSs might be modified to provide lightweight branches. If the developers are interested in the offline commits, then maybe a BVCS is as good as a DVCS. As most of the products are already stored in a CVCS, transitioning to a BVCS should be less expensive than transitioning to a DVCS. If the developers want to use agile programming for a particular feature, then using B/DVCS temporarily for the development of this feature might be easier than the transition. We would like to remind the reader that we are not suggesting that the transition is unnecessary; rather we stress that the transition comes with a cost. Thus, we hope that the benefits of DVCSs, alternative solutions, and the transition cost are weighed correctly and in-depth before the transition.

#### Consider the tooling around VCS carefully

Section 5.2 identified incomplete bridge implementations as one of the biggest barriers for the transition. Software in large companies is not limited to programming. The development process contains external tools for code reviews, quality controls, and packaging before a piece of code gets shipped in a product. Considering the external tools’ integration with the new DVCS and making sure that the new DVCS can interact with the existing tools in a similar fashion the old CVCS did, will increase the chance of the transition by reducing the problems faced by the developers during the transition.

#### Transition on a team basis

When transitioning to a new tool for an existing product, it is generally a good idea to let a few developers — early adopters — do this transition first, to make sure that the existing development workflow does not change considerably with the new tool. Teams and managers could have the same intuition for the transition to a DVCS where only a few developers use the DVCS in the team whereas the remaining developers continue to use the existing CVCS. Although the intuition is right, this strategy creates an unseen barrier for the early adopters. The developers within the same team share code and interact with each other frequently. For early adopters, it becomes even more difficult to interact and share code with the remaining of the team. Consequently, the early adopters might perceive the transition negatively. Therefore, we suggest the teams to make the transition all together whenever possible. A developer confirms this observation:

> While using [a BVCS], I still need to use [CVCS] because I have to apply other developers’ [patches], which cannot be done with [the BVCS].

## 8. THREATS TO VALIDITY

This section outlines the internal and external threats to validity in the study and discusses how these threats might affect the findings and their generalizability.

### Internal validity

This study conducted a semi-structured interview with the developers. The interview questions could have biased the developers to focus on some topics more than the others. We tried our best to make the interview questions as general as possible, hoping that the developers would focus on the parts that they cared most. Since the interviews were recorded, the developers might have behaved differently. However, we tried to reduce this behavioral change by making the recording optional (no one declined). Finally, the card contents were created from our notes and recordings, which might be subjective. To address this for the card sort, we used non-authors in addition to ensure that we were not biasing our results in one way.

### External validity

This study summarizes the findings at Microsoft using 80 developers (across interviews and surveys). Our findings might not generalize outside of Microsoft. However, during the interviews, we realized that the developers were focusing on the same high-level topics and had very similar concerns and comments. Therefore, we believe that our findings should generalize to other developers and products at Microsoft. To mitigate the low number of interviews, we have conducted a web survey to a larger developer audience to quantify our findings from the interviews.

This paper focuses on the developers and products at Microsoft. The developers were selected from multiple teams and had varying levels of familiarity with CVCSs and DVCSs. Therefore, we believe that our findings will generalize to the developers and products in large companies similar to Microsoft. That being said, the findings might not generalize to open-source software, start-ups, or