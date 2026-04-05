engineer must deal with a number of competing forces when choosing what change to make. The task is not always straightforward.

An earlier version of this paper appeared as a conference paper [5], which originally had one primary contribution: the first systematic characterization of the design of bug fixes. It analyzed the design space of bug fixes and described how developers navigate that design space, to understand the decisions that go into choosing a bug fix (see Figure 1). The present paper expands on this work, by adding the following three contributions:

- A study of the Pex4Fun game that motivates our work (Section 3).
- A replication of our original survey of Microsoft developers with an additional 37 developers from other companies (Section 4.5).
- Additional vignettes of the design dimensions (Section 5.1) and design navigation choices (Section 5.2), drawn from the original interviews.
- Findings about why developers avoid refactoring (Section 5.1), how they subvert policies implemented to reduce regression bugs, how they decide which analysis methods to use to determine bug frequencies, and who decides on which bug fix design to implement (Section 5.2), drawn from our original survey.

## 2 RELATED WORK

Several researchers have investigated bug fixes. Perhaps the most relevant research Leszak, Perry, and Stoll’s [6] study of the causes of defects, in which the authors classified bug reports by ‘real defect location’:

> ‘Real’ location characterizes the fact that… some defects are not fixed by correcting the ‘real’ error-causing component, but rather by a… ‘work-around’ somewhere else.

While the authors collected real defect locations, the data was not analyzed or reported. Our work explains why one fix would be selected over another; or in other words, why an engineer might choose a workaround instead of a fix at a “real location.”

Ko and Chilana studied 100 contentious open-source bug reports, focusing on argumentation in open source bug fixing, such as the rationale for fixes and the need for moderation when end users were involved in the debate [7]. In contrast, we focus on the design of the bug fix itself, rather than the process by which the decision was made. Our study also complements this study by improving our understanding of the decision making process when fixing bugs, specifically for commercial software and for decisions made outside of the bug report itself.

Breu and colleagues observed in a study of 600 bug reports that 25.3% of discussions in bug reports are spent on the fix itself, discussions involving suggestions, feedback requests, and understanding files [8]. Our study complements this work by exploring the design space of bug fixes. Several other researchers have investigated bug fixing. In a manual inspection of bug fixes, Lucia and colleagues found that some fixes are spread over many lines of code [4]. Bird and colleagues found that bug fixes reported in bug databases are different from fixes not reported in databases [9]. Gu and colleagues investigated the belief that bug fixes themselves are the source of errors and found that bad fixes comprise approximately 9% of bugs [10]. Yin and colleagues investigated why bugs are fixed incorrectly, that is, require a later bug fix to the source code changed by the original fix [11]. Aranda and Venolia investigated 10 closed bugs and surveyed 110 engineers about bug coordination patterns at Microsoft [12]. Spinellis and colleagues attempted to correlate code metrics, such as number of bugs fixed, to evaluate the quality of open source software [13]. Storey and colleagues investigated the interaction of bugs and code annotations [14]. Anvik and colleagues investigated which engineers get assigned to fix bugs [15]. In contrast to these papers, our paper seeks to understand in what way bug fixes differ, and why one fix is chosen over another.

## 3 MOTIVATION

What evidence is there that the same bug can be fixed in multiple ways? To explore this question and to provide motivation for the rest of this paper, we turn to a browser-based learning environment called Pex4Fun where programmers try to solve programming challenges [16]. Programmers are given some code, a method with parameters and a default return value, and are asked to modify the program until it produces the same output as a secret solution originally created by a puzzle creator.

Although playing Pex4Fun is not a bug fixing task, both are activities where an existing program is not behaving as expected and the programmer’s task is to modify the program so that it conforms to a specification that the developer understands only gradually. And although Pex4Fun is a significantly more limited programming context with fewer environmental constraints than bug fixing in the wild, we argue that if variation in solutions is present in Pex4Fun, then even more variation likely exists in bug fixing in the wild.

Let us explore the solutions to an arbitrary Pex4Fun puzzle (Figure 2). Before viewing other programmers’ solutions, the curious reader can try the puzzle herself at the following webpage: http://aka.ms/Pex4Fun_BugFixExample. In the data used for this paper, 475 self-selected players attempted to solve the puzzle and submitted 5,612 attempts. A total of 260 different people were successful in submitting a correct solution. The median time to solve the puzzle was 12.25 minutes.

In browsing the 260 submitted solutions to the problem, we found that no two appeared exactly alike. Many have at least minor differences in whitespace and comments. Yet there are also substantial design differences between many solutions.

Several solutions appear similar to the original hidden solution, as a simple algebraic formula:

```csharp
using System;
public class Program {
public static int Puzzle(int x) {
```