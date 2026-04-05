AI models could help refactor large, complex code bases, making them easier to read and maintain. Code comments or documentation may be automatically generated using these models. In short, any developer task that requires interacting or reasoning about code in any way can likely be aided by AI. The challenge will come in creating the right user experience such that the developer is helped more than hindered.

This study of Copilot shows that developers spend more time reviewing code (as suggested from Copilot or similar tools) than writing code. As AI-powered tools are integrated into more software development tasks, developer roles will shift so more time is spent assessing suggestions related to the task than doing the task itself (for example, instead of fixing a bug directly, a developer will assess recommendations of bug fixes).

In the context of Copilot, there is a shift from writing code to understanding code. An underlying assumption is that this way of working—looking over recommendations from tools—is more efficient than doing the task directly without help. These initial user studies indicate that this is true, but this assumption may not always hold for varying contexts and tasks. Finding ways to help developers understand and assess code—and the context within which that code executes and interacts—will be important. This naturally leads to the need to understand the dynamics between developers and AI-powered tools.

An increasingly important topic of consideration is the trust that developers have in AI-powered tools like Copilot. The success of any new development tool is tied to how much a developer trusts the tool is doing the "right thing." What factors are developers finding important to build that trust? How does trust get reconstructed after AI-powered developer tools perform in an unexpected manner? For example, if code suggested by Copilot introduces security vulnerabilities or performance bottlenecks, its use will rapidly decline.

"Traditional" tools such as compilers or version control systems are largely deterministic and predictable. When problems occur, developers can examine and even modify the source code to understand any unexpected behavior. That is simply not the case with AI-powered tools. In fact, AI deep-learning models are probabilistic and more opaque. Further research is needed to better understand how tools leveraging these AI models can be designed to foster developer trust, leading to a measurable positive impact with developers.

Finally, it will become important to track AI-generated code throughout the software development life cycle, as this will help answer important questions: Does AI-generated code lead to fewer (or more?) build breaks, test failures, or even post-release defects? Should such code have scrutiny during code review? What proportion of shipping code comes from tools such as Copilot?

The answers to these questions are important to all stakeholders of a software organization but answering them requires knowing where each line of code comes from. Unfortunately, these answers are unknown right now: The provenance of generated code doesn’t live past a single development session in an IDE. There is no

## Study Protocol

The Copilot case study took place over two days. The team spent an hour with each participant. Each interview took place over Microsoft Teams. The researchers used a PowerPoint presentation to organize the study, and participants were asked to share their screens as they engaged with Copilot. Each interview consisted of the following steps:

### Task 1: Small Demonstration of Copilot

Participants were asked to launch Copilot via a preconfigured Codespace linked to a GitHub repository. From there participants were asked to complete a basic function that accepts an integer and returns whether that integer is a prime number. As discoverability was not part of the study, descriptions and guidance were provided, pointing out features of Copilot as they presented themselves.

### Task 2: Creating a Command-line Tic-Tac-Toe Game

Once participants understood how to engage Copilot and its basic functionality, they were asked to build a tic-tac-toe game with the following criteria:

1. Add a class for a tic-tac-toe board that defines the nine cells of the game board.
2. Add a method that accepts and tracks player moves on the board.
3. Add a method that displays the board in the command line.
4. Add a method that determines when the game is over and whether a player has won.
5. Write code to test that the board is displayed correctly and that the game is over when a player wins.

### Task 3: Implement a "Send Email" Feature

To get a sense of how participants would respond to using an unfamiliar API (and how Copilot would respond with suggestions), they were asked to build a feature to email the researcher when a game is complete. All participants noted that they had never used the smtplib library before.

### Post-Study Reflective Interview

After roughly 35–40 minutes of using Copilot to complete these tasks, participants were asked a set of rating-scale questions, concluding with one open-ended question:

1. How would you rate your overall experience with Copilot today? (1 = "Not at all positive" to 5 = "Very positive")
2. How helpful was Copilot while you attempted to complete the tasks today? (1 = "Not at all helpful" to 5 = "Very helpful")
3. How effective were Copilot’s suggestions while attempting to complete the tasks today? (1 = "Not at all effective" to 5 = "Very effective")
4. How different were Copilot’s suggestions from your typical "style" of writing code? (1 = "Not at all different" to 5 = "Very different")
5. How interruptive was Copilot while you were trying to complete the tasks today? (1 = "Very interruptive" to 5 = "Not at all interruptive")
6. How likely would you be to recommend Copilot to a friend or colleague? (1 = "Not at all likely" to 5 = "Very likely")
7. How likely would you be to use Copilot if it was available today? (1 = "Not at all likely" to 5 = "Very likely")
8. How disappointed would you be if GitHub decided to discontinue Copilot? (1 = "Not at all disappointed" to 5 = "Very disappointed")
9. How would you describe Copilot to one of your colleagues who has not heard of it before?