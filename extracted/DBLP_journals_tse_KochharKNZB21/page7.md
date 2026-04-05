IEEE Transactions on Software Engineering, Manuscript ID 7

TABLE 5(c): List of hypotheses and survey responses (in %). SA - Strongly Agree, A - Agree, N - Neutral, D - Disagree, SD - Strongly Disagree

![Table 5(c): List of hypotheses and survey responses (percentages)](page7_img_1.png)

contributions from external developers in CodePlex were minimal. Microsoft developers made changes to the internal repository which was replicated to CodePlex. “The changes were actually made on the closed side and replicated to the open and that process was somewhat fragile.” (D1) In contrast, GitHub’s user-friendly platform was seen as potentially better support for the community to contribute. “CodePlex is very buried in the UI like how to submit a pull request whereas GitHub is very first class like ‘Oh fork this project’. They have really good help.” (D4) Also, developers indicated that the large community on GitHub motivated them to move the code base from CodePlex. The open source community shared this view also. An external developer commented, “Choosing to go on GitHub was a big thumbs up, CodePlex was much more difficult to use.” (O1).

Moving code and tests involved transitioning from internal tools to open source tools. Initially, projects only ported the source code and did not accept any changes to ensure that the project doesn’t break. “In the beginning, we moved the product without moving the tests because tests were much more work. In this case, we were not taking any pull request for that code until we have tests on GitHub.” (D5)

Overall, most of the projects had a smooth transition. As one developer put it, “Every single project that I have seen it’s gone very well.” (D3)

## 5 TRANSITION OUTCOMES

This section discusses the transition outcomes, divided into three parts: Process Changes, Developers’ Perception and views of developers about GitHub. The corresponding hypotheses are shown in Table 5(c), 5(d) and 5(e).

### 5.1 Process Changes

#### a) Version Control System:

Prior to the transition, the projects in our dataset used Team Foundation Server (TFS) [15], which is a collaboration platform for application lifecycle management. After the projects were open sourced, they had to move to Git, which is the basis for GitHub. TFS is a centralized version control system (CVCS), whereas Git is a distributed version control system (DVCS). As Muslu et al. [16] point out, DVCSs have a high learning curve but provide significant benefits such as the ability to work offline and managing multiple contexts. Developers echoed a similar sentiment: “There is a learning curve but once you get past that, it works a lot smoother” (D3) and was agreed by more than 58% of the respondents (S14). 77% of the survey respondents agreed that Git is faster than TFS (S15) and a developer mentioned: “We like it a lot because it [is] just faster and more decoupled system. There are many level and tiers in which you can work. You can work on the bus, on the plane. You just sync your stuff later. It's just that flexibility helps us.” (D1).

#### b) Code Reviews:

Microsoft developers use CodeFlow, an internal tool, to perform code reviews. Since CodeFlow only partially supports GitHub, code reviews may become a challenge for developers. A developer mentioned: “I’m still missing code review tools. CodeFlow doesn’t work with GitHub. It can read from GitHub but the comments I post don’t go to GitHub and that’s not useful.” (D6). Over 72% of the respondents preferred CodeFlow over GitHub for code reviews (S16). GitHub provides a simple user interface and it is good for small reviews but doesn’t perform well for large reviews. As one of the developers mentions: “Code reviews it’s a mixed bag. We do basically all our code reviews now on TFS through the pull request workflow. For small changes it’s much better just because they come in quickly, you can review them on your phone, and you just hit the merge button and that’s really great. For larger changes GitHub UI doesn’t seem to be designed for CodeFlow like in-depth code review. I wish that we had something like CodeFlow that could talk to TFS for more in-depth stuff” (D2). Furthermore, GitHub only shows the diffs of changes made to the code rather than the entire file which makes it harder for developers to understand the context in which these changes were made. Being able to see the file with marked changes would make it much easier to understand and analyze the changes. A developer quoted, “It tends to put it as a diff so you get these little windows on the changes and sometimes it is really hard to see what the context of this overall change.” (D11). More than 58% of the respondents mention that during code review they would like to see the complete