at companies other than Microsoft—or, for that matter, by open-source projects.

LP Looking back to when you first started this project, what would you say came up most whenever you questioned people about their primary motives for doing code reviews?

MG We did a survey where we asked people to rank their reasons. What came out of that tended to be fairly obvious: improving the code, finding defects, knowledge transfer… that sort of thing. But then, when we launched this other study to categorize the comments that had been left in the actual code, we found they only rarely aligned with those stated motivations.

LP Interesting. What did those comments chiefly focus on?

MG There were a lot of comments about the documentation, of course. And you would see some remarks having to do with alternative solutions. There also were comments about validation, which admittedly leaned in the direction of bug resolution since people would say, “You know, if this particular corner case went away, you would be able to eliminate some of these problems.” People also had things to say about API usage—and best practices as well. On the whole, I’d say these sorts of comments far outweighed any that focused on specific defects.

JC To Michaela’s point regarding this mismatch between expectations and reality, despite the fact that people consistently said their primary reason for doing code reviews was to discover bugs in code, only 15 percent of the comments we found in code actually related to bugs.