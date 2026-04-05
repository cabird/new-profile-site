![Git and Perforce architectural diagram](page2_img_1.png)

Figure 1: The architectural diagram for Git-P4. The developers on the left use Git. They synchronize with either the ‘master’ Git repository (Git logo at the top left) or their peer’s private Git repositories (small Git logo at the bottom left). The developers on the right use Perforce and only interact with the ‘master’ Perforce repository. Git-P4 synchronizes the master Git repository and the master Perforce repository in both directions.

the closest common ancestor for conflicting changes and shows the conflicts as a 3-way diff. A VCS branch is a systematic way to provide isolation by diverging from the development history at a specific point. By default, the development in a VCS starts in a branch called ‘master’. Later, the developers can create other branches from existing branches. 1

A centralized VCS (CVCS) (e.g., CVS [3], SVN [4]) is a VCS that stores the development history in a central server. Most CVCSs only store one snapshot (typically the latest) of the repository locally at any given time. Consequently, CVCSs scale well regardless of the development history. However, VCS operations that need access to history that is not available locally, such as merge, must execute on the server.

A distributed VCS (DVCS) (e.g., Mercurial [5], Git [6]) is a VCS that stores the whole development history on each development machine. Consequently, most VCS operations – except synchronization with another repository – execute locally.

A bridge is some tooling between a CVCS and a DVCS that lets the developers use the DVCS, but stores the history in the CVCS. The bridge offers bidirectional synchronization between the CVCS and the DVCS. Figure 1 depicts the architectural diagram of a bridged VCS (BVCS), which consists of one CVCS, one DVCS, and a bridge implementation. This paper uses the terms bridge and BVCS interchangeably. The term ‘B/DVCS’ stands for BVCS or DVCS. The term ‘transition’ stands for the transition from a CVCS to a B/DVCS, for the rest of the paper.

### 3. METHODOLOGY

To understand the transition reasons, barriers, and outcomes, we have conducted ten semi-structured developer interviews and a survey participated by 70 developers. This section explains the methodology for the interviews, and the survey. The results are presented in Sections 4, 5, and 6.

For the interviews, we selected developers who transitioned within the same project, as they have a better chance to compare a CVCS to a B/DVCS. We sent a preliminary survey to two internal B/DVCS mailing lists to find such developers. Depending on the survey results, we sent individual e-mails to recruit developers.

![Card sorting with yellow sticky notes](page2_img_2.png)

Figure 2: Card sorting. Yellow stickers represent a (sub) theme. Each developer went through a semi-structured interview where the interviewer had several questions that tried to capture the developer’s familiarity and workflow patterns with different VCSs, and the transition reasons, barriers, and outcomes. The questions were general to prevent introducing bias as much as possible. For example, instead of asking whether the developer likes lightweight DVCS branches, we asked which DVCS aspects the developers likes and dislikes. The developers were encouraged to talk in detail for any question, or any part of the transition that the questions did not cover. Each interview lasted about an hour and was recorded.

After the last interview was completed, we coded the recordings. For each coded interview, we then generated 25 to 55 cards containing the key points. At the end, we printed a total of 378 cards. Then, we sorted these cards to categorize the responses for thematic similarity (as illustrated in LaToza et al.’s study [7]). These themes that emerged during the sort were not chosen beforehand. Finally, we went over each theme and categorized the cards in that theme into sub-themes. Figure 2 shows the cards – with themes and sub-themes written on yellow stickers.

Kitchenham and Pfleeger [8] discuss the design and construction of personal opinion surveys using the following steps: searching the relevant literature; construct an instrument; evaluate the instrument; document the instrument. In our survey, as suggested by Kitchenham and Pfleeger, we use formal notations, limit our respondents’ responses to numerical, Yes/No type, Likert-scale, and short free form answers. Respondents were anonymous. We followed Kitchenham and Pfleeger’s advice [8] on the need to understand whether the respondents had enough knowledge to answer the questions in an appropriate manner. For this, we restricted the people invited to participate in the survey to people who had registered in the B/DVCS mailing lists. Second, even if the developers had never used a CVCS or a B/DVCS, they could skip the related parts of the survey and still be included in the drawing, ensuring that no one felt compelled to take the survey for the chance to win the gift.

At the end, 70 developers (out of 150 possible candidates) took and completed the survey. 57 participants (81%) used a B/DVCS and all participants used a CVCS at Microsoft, respectively. 47 participants (82%) continue using a B/DVCS. Table 1 summarizes the remaining demographical properties for the survey participants.

1 The paper uses the terms ‘check-in’ and ‘check-out’ instead of ‘commit’ and ‘clone’, which have different meaning for DVCSs and CVCSs.

2 Survey respondents could e-mail us separately outside of their survey responses to enter a drawing for four $10 rewards.