# The Design Space of Bug Fixes and How Developers Navigate It

Emerson Murphy-Hill, Thomas Zimmermann, Christian Bird, and Nachiappan Nagappan

Abstract— When software engineers fix bugs, they may have several options as to how to fix those bugs. Which fix they choose has many implications, both for practitioners and researchers: What is the risk of introducing other bugs during the fix? Is the bug fix in the same code that caused the bug? Is the change fixing the cause or just covering a symptom? In this paper, we investigate alternative fixes to bugs and present an empirical study of how engineers make design choices about how to fix bugs. We start with a motivating case study of the Pex4Fun environment. Then, based on qualitative interviews with 40 engineers working on a variety of products, data from 6 bug triage meetings, and a survey filled out by 326 Microsoft engineers and 37 developers from other companies, we found a number of factors, many of them non-technical, that influence how bugs are fixed, such as how close to release the software is. We also discuss implications for research and practice, including how to make bug prediction and localization more accurate.

Index Terms—Design concepts, human factors in software design, maintainability  
——————————  ———————

## 1 INTRODUCTION

As the software systems we create and maintain grow in capability and complexity, software engineers must ensure that these systems work as intended. When systems do not, software engineers fix the “bugs” that cause this unintended behavior.

Traditionally, researchers and practitioners have assumed that the location in the software at which an engineer fixes a bug is the location at which the error was made [1]. For example, Endres [2] makes such an assumption in a study, but cautions the reader that,

> There is, of course, the initial question of how we can determine what the error really was. To dispose of this question immediately, we will say right away that, in the material described here, normally the actual error was equated to the correction made. This is not always quite accurate, because sometimes the real error lies too deep, thus the expenditure in time is too great, and the risk of introducing new errors is too high to attempt to solve the real error. In these cases the correction made has probably only remedied a consequence of the error or circumvented the problem. To obtain greater accuracy in the analysis, we really should, instead of considering the corrections made, make a comparison between the originally intended implementation and the implementation actually carried out. For this, however, we usually have neither the means nor the base material.

Although the software engineering community has suspected that this assumption is sometimes false, there exists

![Design space diagram](page1_img_1.png)

Refactoring  
Fig. 1. Characterizing the design of bug fixes

little evidence to help us understand under what circumstances it is false. The consequences of this lack of understanding are manifold. Let us provide several examples.

For researchers studying bug prediction [3] and bug localization [4], models of how developers have fixed bugs in the past may not capture the true cause of failures, but may instead only capture workarounds. For practitioners, when a software engineer is evaluated based on how many bugs they fix, the evaluation may not accurately reflect that engineer's effect on software quality. For educators, without teaching future engineers the contextual factors that go into deciding which fix to apply, the future engineers may choose inappropriate fixes.

However, to our knowledge, there has been no empirical research into how bug fixes are designed. In this paper, we seek to understand the design of bug fixes. We define the design of bug fixes as the human process of envisioning several ways to fix the same bug and then judging which of those fixes to apply. As with any software change, an

————————————————

- E. Murphy-Hill is with North Carolina State University, Raleigh, NC 27603. E-mail: emerson@csc.ncsu.edu.
- T. Zimmermann is with Microsoft Research, Redmond, WA 98052. E-mail: tzimmer@microsoft.com.
- C. Bird is with Microsoft Research, Redmond, WA 98052. E-mail: cbird@microsoft.com.
- N. Nagappan is with Microsoft Research, Redmond, WA 98052. E-mail: nachin@microsoft.com.

xxxx-xxxx/0x/$xx.00 © 200x IEEE Pu