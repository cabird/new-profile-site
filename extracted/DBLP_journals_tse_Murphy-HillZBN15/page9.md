understand them.

Many respondents cited the risk of accidentally introducing regression bugs into code when refactoring (n=52) {5}. This suggests that either these developers were not using refactoring tools or were using tools that they did not trust. Indeed, Vakilian and colleagues have found that trust influences the use of refactoring tools [25]. Similarly, respondents reported that refactoring is sometimes risky (n=37) {3} and that there may not be enough tests to expose regression bugs (n=21) {1}. Respondents reported that these regression fears were exacerbated by the development phase (n=30); if software is near release, the cost of a regression bug increases. Three Microsoft respondents noted that the reasons for not refactoring parallel the reasons for choosing different bug fix designs (Section 5.2).

Several respondents noted that refactoring takes a significant amount of time (n=74) {15} and that they have tasks of higher priority (n=11) {1}. One respondent implied that refactoring is an unending task, noting that “it can be like draining an ocean with a thimble.” A few respondents (n=7) {3} went even further, saying that refactoring sometimes lacks value, with one respondent noting that refactoring sometimes has “no clear benefits for the cost involved.”

A few respondents noted that one reason to avoid refactoring is for social reasons. For example, in the Microsoft survey, refactoring with too many changes makes code review difficult, so that refactored code “will be requested to be reverted.” Three respondents {1} indicated that version control systems get confused by refactoring, making it difficult for developers to understand the history of the code. In the replicated survey, four participants noted that their managers were averse to refactoring, due to, for instance, difficulty explaining the value of refactoring to management.

### Internal vs. External

This dimension describes how much internal code is changed versus external code is changed as part of a fix. On one end of this dimension, the engineer makes all of her changes to internal code, that is, code for which the engineer has a strong sense of ownership. On the other end, the bug is fixed by changing only code that is external, that is, code for which the engineer has no ownership. The developer defines this ownership subjectively; a developer may be allowed to commit to a codebase, but may feel stronger ownership of certain areas, such as where she has made significant contributions in the past.

While most fixes reported in the interviews were internal, some interviewees mentioned that fixes that involved changes to external code were desirable. One example was P37, who was fixing a bug in which his web application occasionally did not work correctly when the user entered information with an on-screen keyboard. One way to fix this would be to change the way a web browser worked with web applications and on-screen keyboards.

Another example is P33, who maintained a testing framework for devices used by several other teams. The bug was that many devices were not reporting data in a preferred manner, causing undesirable behavior in P33's framework. Part of the fix was immediate and internal (changing the testing framework), but part of it was deferred and external (changing each of the other teams’ device code).

### Accuracy

This dimension captures the degree to which a fix introduces program logic that utilizes accurate information. On one end of this dimension, the fix uses highly accurate information, and on the other, the fix uses heuristics.

One example of this was P23, who was fixing a race condition bug between two threads, and had two options to fix the problem. An accurate fix would be to introduce some explicit synchronization construct between the two threads. The heuristic approach would be to simply have one thread wait a few seconds until the other thread has probably completed.

Another example is P29, who was working on a bug in which web browser printing was not working well. An accurate fix would be one where his print driver retrieves the available fonts from the printer, then modifies the browser’s output based on the available fonts. A less accurate fix was to use a heuristic that produces better, but not optimal, print output.

### Hardcoding

This dimension captures to what degree a fix hardcodes data. On one end of the dimension, data is specified explicitly, and on the other, data is generated dynamically.

One example of fixes on this dimension is P24, who was writing a test harness for a system that received database queries. The bug was that some queries that his harness was generating were malformed. He considered a completely hardcoded solution to the problem, removing the query generator and using a fixed set of queries instead. A more dynamic solution he considered was to modify the generator itself to either filter out malformed queries, or not to generate them at all.

Another example is P6, who was fixing a bug related to incorrect address information in a database. One hardcoded solution to the problem was to modify the records in the database. She also considered two dynamic solutions. One was a stored procedure that could translate incorrect information to correct information. The other dynamic solution was to modify the original code that produced that data in the database.

## 5.2 Navigating the Design Space

While the previous section described the design space of bug fixes, it said nothing about why engineers implement particular fixes within that design space. For instance, when would an engineer refactor while fixing a bug, and when would she avoid refactoring? In an ideal world, we would like to think that engineers make decisions based completely on technical factors, but realistically, a variety of external factors come into play as engineers navigate this bug fixing design space. In this section, we describe those external factors.

Risk Management by Development Phase. A common way that interviewees said that they choose how to design a bug fix is by considering the development phase of the