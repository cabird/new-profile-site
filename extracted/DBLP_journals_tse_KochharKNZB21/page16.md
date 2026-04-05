members which will help increase confidence and rapport between different stakeholders.

Harmonious Attitude: Community members voluntarily invest time and effort to contribute to projects. It is important for internal team members to be receptive to comments or feedback from the community. Such a practice helps build trust and projects can attract more developers as community members share their experiences with their counterparts through various means such as social media websites.

> "Try to be open to that constructive feedback. You can learn a lot by just listening to the community, listening to what they want, connecting with them and the closer you can be, the more open you can be, the more present you can be as a development team to where they are talking this, the more you will learn." (D11)

Documenting Best Practices: When a project is open sourced, team members without any prior experience of working with OSS learn several best practices followed by the community, which might be different from the best practices within the organization. Such practices are not always documented. We recommend documenting the incoming best practices from the open source community, which would be helpful for other projects planning to open-source.

> "At first I didn’t know what the labels on the issues mean, but they later updated the wiki and explained that." (O4)

Decoupled Parts: For various reasons (e.g., the use by other internal teams) only a part of a project may be open-source. If software is open-sourced in parts and the open source and closed source components are tightly coupled, it becomes difficult for the project team to manage both repositories.

> "It’s OK to have open source components and closed components sources. You want to make sure there is not too much coupling between them because otherwise they will tend to gravitate to where the bigger mass is." (D1)

However, it is better if the project and its resources are maintained in a single place.

### 7.4 Threats to Validity

Threats to External Validity. Threats to external validity relate to the generalizability of our results. In this study, we investigated six large projects, which Microsoft open-sourced recently. Every project is different and [32] project teams may face different issues during the transition. Our findings may not generalize to projects outside Microsoft. However, we do find several similarities between these projects as expressed by developers during the interviews.

Threats to Internal Validity. These threats relate to the conditions under which the study is performed. We conducted semi-structured interviews with the developers. The interview questions could have biased the developers although we tried to keep the questions open-ended and let developers give a holistic picture of the transition process. Since we recorded the interviews, developers might have behaved differently. However, we did the recording after getting consent from the developer. To reduce the bias during the card sort, we involved non-authors to help us. The authors and developers being from Microsoft might have introduced some bias, however, to counter this we have interviewed 11 developers from the community. We believe

that these responses along with that of Microsoft developers give an in-depth explanation of the transition process. We do not present the transition period (i.e., preparations and the actual time to transition) as it varies from project to project on several factors such as amount of code, number of engineers involved, software lifecycle stage during the transition, parts of code open-sourced etc. For example, D2 mentioned:

> "We probably spent about 2 or 3 months on that and 5 or 6 engineers from different disciplines getting things ready." (D2)

whereas D5 said,

> "In the beginning, we moved the product without moving the tests because tests were much more work." (D5)

## 8 RELATED WORK

In this section, we summarize prior empirical studies on transition to open-source and attractiveness of open-source to both developers and organizations.

### 8.1 Closed Source to Open Source

Pinto et al. studied eight projects to understand the challenges of open-sourcing proprietary software projects [33]. They surveyed developers through means of opening issues or mailing lists for the eight projects in GitHub and solicited responses from the active members of these projects. They found that the rise of contributions is not straightforward, and they observe a newcomer’s wave, i.e., a high number of newcomers make a few contributions initially but do not contribute again. They also observed an increase in the number of pull-requests and issues after the projects were open-sourced. They also observed a growth in popularity by measuring the number of stars against top-2500 most starred public projects.

In our study, we address the similar problem of understanding reasons to open-source, the transition process, challenges, and learnings. However, there are several differences between ours and previous study. Instead of asking questions on GitHub, we conduct interviews with the developers and managers involved in the projects, which gives us an opportunity to get deeper insights. While previous study only targets developers, we also interview managers to understand the reasons for transition. We further survey developers to validate findings from the interviews. We also describe the transition outcomes and community response through qualitative and quantitative measures. Compared with the above study, we find similar results: the number of pull requests increase after the transition and a significant number is from the community, the number of issues increase and developers put in effort to close them as soon as possible. While the previous study provides mostly quantitative analysis, we also combine qualitative data to back up the numbers.

Several online blogs provide suggestions for developers or organizations planning to go open source and why organizations open source proprietary software. Todorov gave several suggestions such as cleaning code, self-contained modules, code refactoring, external dependencies, providing documentation, testing standalone deployments etc. before making the code public [34]. A blog by Shopsys Framework gives several reasons to open-source a project based on their past experience such as finding best developers, getting expert advice, helping fellow developers to reuse your