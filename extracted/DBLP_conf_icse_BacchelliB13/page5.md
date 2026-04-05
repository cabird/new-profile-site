There is (3) better sharing of information across the team, (4) helps support coding conventions on the team, and [...] (5) helps improving the overall process and quality of code.”

Through the card sort on both meetings and code review comments, we found several references to motivations for code review and identified six main topics. To complete this list, in the survey for managers, we included an open question on why they perform code reviews in their team. We analyzed the responses to create a comprehensive list of high-level motivations. We included this list in the developers’ survey and asked them to rank the top three main reasons that described why they do code reviews.

In the rest of this section, we discuss the motivations that emerged as the most prominent. We order them according to the importance they were given by the 873 developers and testers who responded to the final survey.

### A. Finding Defects

One interviewed senior tester explains that he performs code reviews because they “are a great source of bugs;” he goes even further stating: “sometimes code reviews are a cheaper form of bug finding than testing.” Moreover, the tool seems not to have an impact on this main motivation: “using CodeFlow or using any other tool makes a little difference to us; it's more about being able to identify flaws in the logic.”

Almost all the managers included “finding defects” as one of the reasons for doing code reviews; for 44% of the managers, it is the top reason. Managers considered defects to be both low level issues (e.g., “correct logic is in place”) and high level concerns (e.g., “catch errors in design”). Concerning surveyed developers/testers, “finding defects” is the first motivation for code review for 383 of the programmers (44%), second motivation for 204 (23%), and third for 96 (11%).

This is in-line with the reason why code inspections were devised in the first place: reducing software defects [1].

Nevertheless, even though “finding defects” emerged from our data as a strong motivation (the first for almost half of the programmers and managers), interviews and survey results indicate that this only tells part of the story of why practitioners do code reviews and the outcomes they expect.

### B. Code Improvement

Code improvements are comments or changes about code in terms of readability, commenting, consistency, dead code removal, etc., but do not involve correctness or defects.

Programmers ranked “code improvement” as an important motivation for code review, close to “finding defects:” This is the primary motivation for 337 programmers (39%), the second for 208 (24%), and the third for 135 (15%). Managers reported code improvements as their primary motivation in 51 cases (31%). One manager wrote how code review in her view is a “discipline of explaining your code to your peers [that] drives a higher standard of coding. I think the process is even more important than the result.”

Most interviewed programmers mentioned that at least one of the reviewers involved in each code review takes care of checking whether the code follows the team conventions, for example in terms of code formatting and in terms of function and variable naming. Some programmers use the “code improvement” check as a first step when doing code review: “the first basic pass on the code is to check whether it is standard across the team.”

The interviews also gave us a glimpse of the connection between the quality of code reviews and “code improvement” comments. Such comments seem easier to write and sometimes interviewees mentioned them as the way reviewers use to avoid spending time to conduct good code reviews. An observation by a senior developer, in the company for more than nine years, summarizes the opinions we received from many interviewees: “I’ve seen quite a few code reviews where someone commented on formatting while missing the fact that there were security issues or data model issues.”

### C. Alternative Solutions

“Alternative solutions” regard changes and comments on improving the submitted code by adopting an idea that leads to a better implementation. This is one of the few motivations in which developers and managers do not agree. While 147 (17%) developers put this as the first motivation, 202 (23%) as the second, and 152 (17%) as the third, only 4 managers (2%) even mentioned it (e.g., “Generate better ideas, alternative approaches” and “Collective wisdom: Someone else on the project may have a better idea to solve a problem”). The outcome of the interviews was similar to the position of managers: Interviewees vaguely mentioned this motivation, and mostly in terms of generic “better ways to do things.”

### D. Knowledge Transfer

All the interviewees but one motivated their code reviews also from a learning, or “knowledge transfer,” perspective. With the words of a senior developer: “one of the things that should be happening with code reviews over time is a distribution of knowledge. If you do a code review and did not learn anything about the area and you still do not know anything about the area, then that was not as good code review as it could have been.” Although we did not include questions related to “knowledge transfer” in our interview guideline, this topic kept emerging spontaneously from each meeting, thus underscoring its value for practitioners.

Sometimes programmers told us that they follow code reviews explicitly for learning purposes. For example, a tester explained: “[I read code reviews because] from a code review you can learn about the different parts you have to touch to implement a certain feature.”

According to interviewees, code review is a learning opportunity for both the author of the change and the reviewers: There is a bidirectional knowledge transfer about APIs usage, system design, best practices, team conventions, “additional code tricks,” etc. Moreover code reviews are recognized for educating new developers about code writing. Managers included “knowledge transfer” as one of the reasons for code review, although never as the top motivation. They mostly wrote about code review as an education means by mentioning among the motivations for code review: “developer education,” “education for junior developers who