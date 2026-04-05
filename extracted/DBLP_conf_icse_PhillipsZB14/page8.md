> Second, it was noted that the tool will probably not be able to detect all violated best practices:
>
> “You can never write a system that will work 100% of the time. An automated system cannot look at a bad build configuration file and say ‘oh, I think this is what you meant to do.’” (F3)
>
> When automatically verifying best practices is not possible, it may be sufficient to examine which files the developer has changed, and display warnings if those files are related to particular best practices. Moreover, builder contact information will still be displayed for when the developer is unsure if they are violating the best practice in question.

## 5.3 Intergroup Process Transparency

*Do not make the build process a black box.*

We found that some build failures are perceived to be caused by developers misunderstanding the build process, or not understanding the benefit of following the process and they avoid it or cut corners. The problem appears to be the abstraction of build system complexity away from development teams. If the build team provides a view of the build process that is too simple, trust can erode between the two groups. Our idea is to balance abstraction with process transparency.

This idea is grounded in Pirson and Malhotra’s analysis, where perceptions of transparency were the only significant predictors of trust for deeply interdependent relationships [36], which is the case for build and development teams. We propose providing developers with a desktop tool that clearly describes build process requirements based on changes they are currently making. For example, what parts of the project they must build, what tests they need to run, or whether they should perform any special verification. But most importantly, the tool will clearly describe why they are being asked to perform each task as well as the benefits.

The goal is to give developers a glimpse into the “200 ft. view” held by the build team and allow them to see that their time is not being wasted with ineffectual overhead, and that the build team has their best interests in mind.

Feedback: Of our four ideas, process transparency received the most negative reaction. It was felt that the idea “would work” (F4) by preventing some failures, but there were concerns about the underlying concept of transparency:

> “They will care less about when things break—they will say, ‘I followed your process, why did it not prevent me from breaking the build?’” (F3)

There was a reluctance among the participants to lower group boundaries and offer process transparency out of concern that the tool would be used against them. In other words, that the tool would lower accountability for build breaks and require them to establish a perfect set of build process requirements, which would not be possible.

To implement this tool, it is clear that the descriptions of the tasks, justifications, and benefits should be carefully worded. For example, it should be made clear that the requirements are guidelines provided by the build team to decrease the likelihood of build breaks, but they are not complete and do not remove personal accountability.

## 5.4 Reduce Intergroup Conflict

*Meet early to establish trust before conflicts occur.*

The categorization of build and development teams is evident by the frequent use of the term “they” when referring to developers [13], which can be observed in the quotations we have throughout this paper. In Section 4, we identified several situations where conflict can occur between build and development teams, such as impeding goals and with public shaming. We have also shown these conflicts are similar to those observed in other studies, often in fields outside of software engineering, such as group dynamics and organization science. Our idea is to use results from these studies, altered to fit the build engineering context, to prevent or reduce the likelihood of conflicts between builders and developers.

Rocco found that early face-to-face contact can establish trust in computer-mediated relationships [37]. Similarly, we propose that builders and developers meet twice, in-person, at the beginning of a product release cycle.

The first meeting (i.e., the “hand-shake” meeting) should not focus on upcoming work, but on personal interests to promote decategorization [13]. The second meeting, held shortly afterward, will revolve around mutual intergroup differentiation—the appreciation of their differences [13]. The build team can talk about changes to the build process, which also aids transparency, and the development teams can talk about their upcoming features and general time-lines.

Our idea is relatively simple, but there is a large body of research supporting these methods of reducing intergroup conflict. In terms of improving build team effectiveness, ensuring a healthy relationship between build and development teams facilitates the smooth operation of interdependent tasks.

Feedback: Support for the idea was strong among the focus group participants. One participant shared a similar practice that they have found to be effective:

> “Every time I join a new organization, I meet with all of the development leads and talk about best practices... ‘if you do this then I’ll provide you good builds in a timely manner.’ You have to be proactive.” (F8)

Our approach differs in that it has the individual builders and developers meet, and not just the team leads. Although, the scale of our idea scale was questioned:

> “Shaking hands... is a little unreasonable. In Windows, 5000 people cannot meet with 30 builders.” (F7)

However, we do not see the approach as all-or-nothing. The build team can selectively meet with development teams; in particular, those that are planning changes that could be disruptive and potentially cause intergroup conflict.

## 6. DISCUSSION

To many practitioners, software build is an uninteresting step in the development process. Academically, build is a niche topic when compared to understanding, writing, and testing code. To our surprise, however, research into the understudied “build team” uncovered rich experiences and useful insight that can be applied outside the context of our work.

We found that build teams are created in response to project growth and mounting build inefficiency. In other words, they are not planned (and in some cases, are unwanted), but nevertheless emerge and grow organically. An interesting facet is that these ad hoc groups are given sole responsibility of a critical resource needed by much larger development teams.

A particularly noteworthy finding is process transparency. Participants in both the interviews and survey felt that exposing elements of the build process would reduce developer frustration and potential conflict. However, when we proposed our simple transparency-promoting tool to the focus group, it evoked strong negative reactions. When confronted with actually giving up some control of the