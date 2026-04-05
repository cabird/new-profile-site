> FP-22: “Currently, I have seen [CFar] comment on certain API usages. This has led to some wonderful learning opportunities that would not have surfaced otherwise.”

Although the majority of participants indicated that CFar was useful, a couple participants contradicted the others. In particular, they tended to be critical of the CFar comments:

> FP-32: “Too many useless comments.”
>
> FP-11: “The comments I have seen have been too trivial.”

## DISCUSSION

Overall, the results of our empirical evaluation of CFar were favorable. A considerable proportion of the programmers reported that CFar increased their communication and enhanced collaboration during code reviews (RQ1 results). Furthermore, many programmers reported that CFar increased their productivity, with a key reason being that it freed them from dealing with many shallow defects (RQ2 results). In addition to productivity gains, many also reported that CFar helped increase the quality of their code, largely because it caught issues a human would miss (RQ3 results). Lastly, nearly all programmers reported finding CFar useful, and a majority indicated that they liked having the automated code reviewer (RQ4 results).

However, in addition to this strongly favorable feedback, some programmers also pointed out limitations of the CFar tool. In particular, their comments suggested opportunities for improving CFar with respect to the quantity and quality of feedback produced. Here, we discuss these limitations in more detail along with promising approaches for addressing them.

### Reducing Information Overload in CFar

One limitation of CFar revealed by our results was that several programmers reported feeling overwhelmed by the size and/or number of CFar comments. For instance, several programmers indicated that this issue hindered their productivity (RQ2 results) and overall perception of the usefulness of CFar (RQ4 results). Additionally, one of the field-deployment survey questions asked for the programmers’ opinions about the quantity of CFar comments. The programmers were somewhat divided in their opinions on this question. On the one hand, 31% of the programmers indicated that there were too few comments, and several of them indicated that they would like to see more comments from different types of program analyses. However, on the other hand, 19% of programmers reported that there were too many CFar comments, supporting the idea that information overload was a problem.

One possible approach for addressing the information-overload problem in CFar is to provide additional support for efficiently eliding CFar comments using filtering criteria based on characteristics of the program analyses. In our study, each development team could enable and disable program analyzers using OACR; however, using these features was tedious and time consuming, for example, because to update the CFar comments required rerunning the entire build and analysis. It stands to reason that more-usable program-analysis filtering and eliding features within the code-review system could address this problem. Indeed, several programmers expressed wanting greater support for filtering CFar comments:

> FP-28: “Must be able to turn off comments by category / type.”

> FP-14: “If we started to have more detailed analysis in CodeFlow, I’d like to see it able to be filtered out so human comments can be given priority. Too many comments would definitely detract from use and usefulness of the tool.”
>
> FP-32: Suggested “static code analysis vs. not code analysis” as types of filters to add to CFar.

As it happens, CodeFlow already provides comment-filtering features (e.g., for filtering by author), and it would be relatively straightforward to extend those features with filters specific to program analyses.

In addition to reducing the number of warnings to alleviate information overload, the individual warnings themselves could be reduced in size. In particular, their textual content could be shortened or elided. The warnings from the program-analysis back-end used by our tool were originally designed to be displayed in a long list, much like compiler warnings; however, CFar fundamentally changes the context in which the warnings are displayed by annotating code with them. A prior study using eye-tracking also observed programmers having difficulties reading automated analysis warnings [16], and other researchers proposed visualizations to improve comprehension [15]. Such approaches could be applied to our CFar tool to further help address the problem of information overload.

### Improving CFar Comment Relevance

Several programmers expressed concern about how the program analyses used by the automated code reviewer need to be configured correctly for each team. Our tool already uses a team’s current configuration for OACR; however, the programmers may be more concerned now that the analysis warnings are displayed in their code reviews, as opposed to a log file that is easy to ignore. In fact, the programmers of one of the teams we studied had ignored the OACR log file for six months until we deployed the automated code reviewer to them. Several programmers also provided feedback, voicing their concerns as to how important proper configuration is:

> FP-14: “However each team or programmer may have different styles, so it would have to be only the most important things to highlight or people would ignore them or stop using [the tool] as it would get in the way.”
>
> LP-2: “There are a lot of rules I don’t ever want turned on. They are just too chatty. I’d be like, ‘that’s a stupid rule; let’s turn that off.’ There’s a ton of bad ones. There’s a ton of good ones too.”
>
> LP-7: “The question is will [the static analyses] be used right by the team... It’s a function of, even if OACR has it, will they enable it or do the work to keep it clean?”

One possible way to configure an automated code reviewer for the ever-changing needs of a team or project is to leverage feedback from the programmers themselves. Such data may be collected by checking the status of analysis comments (e.g., Resolved versus Won’t Fix) or by counting the CFar comment feedback (recall from Fig. 1b; useful, not useful, or do not understand). If these data indicate that a certain type of analysis comment is consistently not fixed or disliked by programmers, then comments of this type could be excluded from future code reviews of the particular team. Other researchers have proposed similar ideas, such as Google’s Tricorder tool [45], which removes analyses that are deemed unhelpful; however, Tricorder does so globally rather than per team.