### 6.1.1 Improve Maintainability

The majority of respondents from each survey (OSS: 71 percent, Microsoft: 61 percent) indicated that code review improves project maintainability in terms of efficiency as well as other maintainability attributes, i.e., legibility, testability, adherence to style guidelines, adherence to application integrity, and conformance to project requirements. In general, developers are more cautious when they know that changes are subject to peer review.

> If you know someone is going to look at you, you dress better. When you know someone is going to question you for certain decisions, either you don’t make them or you are prepared to defend it. So, in general, it improves quality and makes you a better developer by forcing you to look at your code the way others look. [MS-50]

In addition to code quality, reviewers evaluate the code’s conformance to project requirements. This conformance is especially important in OSS projects where contributors can have different personal goals.

By requiring approval from core maintainers, it also helps to keep undesirable code out. [OSS-48]

Code reviews and the subsequent discussions also help maintain project design constraints and result in better designs.

> It allows experts on particular areas of the (vast) codebase to detect issues with changes early, helps generate improved design ideas. [OSS-118]

Similarly,

> ..reconsidered crucial design decisions and ended up thinking “wow, the way I was doing it is stupid for a lot of reasons.” [MS-80]

Another benefit of code review is the production of more readable code. To help reviewers understand the code easily, developers use documentation, comments, and appropriate indentation to make code more readable.

> Code review helps to see if “my code” is read and interpreted the way it should be. [MS-25]

Readable code also helps long-term maintainability, especially for large-scale and long-lived projects.

> The code is our most valuable asset as well as our biggest liability. But we rarely have the time to re-invest in features done, so it is vital that whatever we check in is of the right quality. You can test so-and-so much, but you really cannot test maintainability and how easy a codebase is to debug. So to avoid bug-farms you really have to review. [MS-312]

Code review also helps enforce a common coding style, which is one of the key characteristics of maintainable code.

> Code style is even important because code is written once but read so many times more. In fact, code can be maintained by other devs so it’s important it follows guidelines. We have strict coding guidelines published. [MS-290]

### 6.1.2 Facilitate Knowledge Sharing

Code review facilitates multiple types of knowledge sharing. Code review interactions help both authors and reviewers learn how to solve problems using new approaches. Reviewers often not only identify issues but also explain why the author’s approach could lead to potential problems. Reviews also help socialize project details, e.g., architecture, common APIs, and existing libraries.

> ...spread information to more people so all knowledge of a system is not lost if someone is out sick, on vacation, or leaves the team, assist in sharing knowledge of helpful utilities so that we do not end up with duplicate systems doing the same things. [MS-196]

Code reviews increase project awareness among the project members by ensuring that at least one or two reviewers are also aware of code changes.

> ...it helps to ensure that more than one member of a group is familiar with any changes, it makes sure that all changes are (at least somewhat) sane, and it helps to foster feedback from people who will be affected by a change before the change actually happens. [OSS-194]

Code reviews also allow senior project members to mentor newcomers.

> ...code reviews are often one of the primary methods of knowledge transfer and brainstorming about software between developers. They’re part of the critical path to ramp-up new developers on both the project and technologies, and they’re often where experienced developers share tricks-of-the-trade and knowledge in context. [MS-190]

In addition to newcomers, more experienced project members can also learn through code reviews.

> ...allows us to leverage the lessons learned by each person in the code base that not everyone will encounter. [MS-355]

### 6.1.3 Eliminate Functional Defects

Reviewers often find logical errors, corner cases, security issues, or general incompatibility problems that the author may have overlooked.

> Code review dramatically reduces bug count, in my experience. It is very rare for a change to be accepted without some suggested improvements or notations of deficiencies by reviewers. [OSS-145]

Experienced security reviewers are often able to identify critical security flaws during code reviews.

> More people see more, you can not let anyone from the community to merge anything to your code (security risk). [OSS-105]

Finally, code reviews help to inform a wider audience about agreed-upon changes and thus help avoiding incompatibility issues (i.e., a broken build).

> ...makes sure the feature/bug fixing can integrate into other parts of project, done by other developers. [MS-241]

### 6.1.4 Encourage Community Building/Collaboration

By fostering direct collaboration between developers and reviewers, code reviews encourage community building and collaborations. While community building was