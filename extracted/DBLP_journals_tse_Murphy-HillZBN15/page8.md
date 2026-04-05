### Table 3
SURVEY RESPONDENTS’ REFACTORING BEHAVIOR

![Survey table showing refactoring behavior heatmap for Microsoft and other developers](page8_img_1.png)

should be notified that an exceptional situation had occurred. A similar example is P18, who described a bug in which a crash occurred in one process whenever another process stopped generating data. P18 considered whether part of the fix should be to let the user know that the process had stopped generating data.

As another example, P6 described a bug in which she was calling an API that returned an empty collection, where she expected a non-empty collection. The problem was that she passed an incorrect argument to the API, and the empty collection signified an error. However, an empty collection could also signify “no results.” While fixing the bug, the engineer considered changing the API so that it threw an error when an unexpected argument was passed to the API. She anticipated that this would have helped future engineers avoid similar bugs.

### Behavioral Alternatives
This dimension describes whether a fix is perceptible to the user. At one end of the dimension, the fix does not require the user to do anything differently; at the other end, she must significantly modify her behavior.

One example is P11, who described a bug in which the back button in a mobile application was occasionally not working. As part of the fix, he made the back button work, but had to simultaneously disable another feature when the application first loads. P11 stated that having both the back button and the other feature working at the same time was simply not possible; he had to choose which one should be enabled initially.

Another example is P21, who was porting a Linux application to Windows. The application originally used input files that contained colons as path separators, but colons are reserved characters in Windows, and could not be used in a straightforward manner. P21 had to devise an alternative to the problem, and the alternative ultimately required the end user to adjust her behavior, depending on how he fixed the bug.

### Functionality Removal
This dimension describes how much of a feature is removed during a bug fix. At one end of the dimension, the whole software product is eliminated; at the other, no code is removed at all.

As an example, P18 described a bug in which a crash occurred. Rather than fixing the bug, P18 considered removing the feature that the bug was in altogether. We were initially quite surprised when we heard this story, because the notion that an engineer would remove a feature just to

fix a bug seems quite extreme. However, removal of features was mentioned repeatedly as a fix for bugs during our interviews. For instance, when P39’s web application was occasionally not downloading files, he considered eliminating that portion of the application entirely.

To quantify functionality removal, we asked survey respondents to estimate how often they remove or disable features, rather than fixing the bug itself. About 75% {76%} of respondents said they had removed features from their software to fix bugs in the past.

### Refactoring
This dimension describes the degree to which code is restructured in the process of fixing a bug, while preserving its behavior. A bug may be fixed with a simple one-line change, or it may entail significant code restructuring.

As an example, P12 described encountering a piece of code that implemented the double-checked locking pattern that was not implemented correctly in one code location. On one hand, he considered the low-refactoring solution: fix the pattern so that it is implemented correctly. But he also considered a fix that entailed significant refactoring: replace the locking pattern with simple synchronization. As an example, P5 considered refactoring to remove some copy-and-paste duplication, so “you're not only fixing the bug, but you also are kind of improv[ing the code].”

In our survey, we asked respondents to report on refactoring frequency when fixing bugs, as shown in Table 3. Respondents from Microsoft are at left and other developers from the replicated survey are at right. Higher numbers correspond to darker cells, compared to cells in the same row and survey. In the table, “Should be refactored” indicates how often participants “notice code that should be refactored when fixing bugs.” For example, 29% of Microsoft respondents indicated that they usually notice code that should be refactored. The “Is refactored” row indicates how often participants “refactor this code that should be refactored”. For example, 26% reported rarely refactoring code that should be refactored. These results suggest that, although engineers appear to regularly encounter code that should be refactored, much of this code remains unchanged.

To determine why, in the survey we asked “If you do not always refactor code that should be refactored, why not?” We received a response by 203 respondents {24}, some giving multiple reasons for not refactoring. Manually coding these responses, we estimate that respondents gave 332 {35} non-unique reasons for avoiding refactoring. We