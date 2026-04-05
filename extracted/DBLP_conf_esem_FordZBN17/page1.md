## Characterizing Software Engineering Work with Personas Based on Knowledge Worker Actions

Denae Ford  
North Carolina State University  
Raleigh, NC, USA  
dford3@ncsu.edu

Thomas Zimmermann, Christian Bird, Nachiappan Nagappan  
Microsoft Research  
Redmond, WA, USA  
{tzimmer, cbird, nachin}@microsoft.com

Abstract—Mistaking versatility for universal skills, some companies tend to categorize all software engineers the same not knowing a difference exists. For example, a company may select one of many software engineers to complete a task, later finding that the engineer’s skills and style do not match those needed to successfully complete that task. This can result in delayed task completion and demonstrates that a one-size fits all concept should not apply to how software engineers work. In order to gain a comprehensive understanding of different software engineers and their working styles we interviewed 21 participants and surveyed 868 software engineers at a large software company and asked them about their work in terms of knowledge worker actions. We identify how tasks, collaboration styles, and perspectives of autonomy can significantly affect different approaches to software engineering work. To characterize differences, we describe empirically informed personas on how they work. Our defined software engineering personas include those with focused debugging abilities, engineers with an active interest in learning, experienced advisors who serve as experts in their role, and more. Our study and results serve as a resource for building products, services, and tools around these software engineering personas.

Index Terms—software engineering; personas; practical knowledge work

## I. INTRODUCTION

Jobs for nonroutine cognitive work are increasing faster now than they have in the past 3 decades. In 2016, the U.S. alone reported more than 60 million workers that fit this criteria [1]. Industrial jobs that meet this criteria include finance, marketing, research, business, and software engineering. Another name for these types of employees are knowledge workers. Davenport defines knowledge workers as individuals applying their expertise to creative problems; people who think for a living [2]:

Knowledge workers have high degrees of expertise, education, or experience, and the primary purpose of their jobs involves the creation, distribution, or application of knowledge.

Observing roles of knowledge work has allowed us to use a cross-industry term to describe how people work. However, we have found that even within one large software organization, each of these types of knowledge workers have different approaches to applying their expertise to creative problems. In his work, Davenport identifies different types of knowledge workers such as controller, helper, and learner. He also describes the idea that to understand their tasks means to understand a knowledge worker [2]. In an attempt to bridge the gap between different types of knowledge workers, we start with one type, software engineers, and define how they fit under the knowledge worker umbrella.

> The identity crisis in software engineering,
> “Let’s go back to being an industry that hires smart
> engineers regardless of their title and pointing them
> at problems and letting them solve them without con-
> fusing them with ambiguous engineering titles [3].”

Like many other practitioners who document this experience, Wolkov proposes we take a step back and no longer attempt to match software engineers with general job descriptions; but use practical expectations about the collaborative nature of software engineering work.

To address this concern, we construct personas based on data from software engineers on the nature of their work and how they collaborate to get their work done. We do not believe all software engineers are the same. Identifying different types of software engineers can outline their tasks and help them be more effective. Towards that end, this study aims to bridge the gap in existing research with personas based on the amount of time spent on various software engineering tasks. To the best of our knowledge, our study is the first study performed at a large software company understanding and quantifying the time spent on various software development activities in order to build personas for software engineers. Our novelty is further strengthened by the fact that we adapt Reinhardt et al. [4] knowledge worker actions to the time software engineers spend in each of those actions. We use a mixed-methods approach where we interview 21 software engineers and collect survey responses from 868 engineers to gain a unique perspective of working styles of developers in a large organization. Our results indicate a diverse set of seven personas defined on the time spent in tasks and described by their task selection process, execution, and collaboration techniques.

The major contributions of this paper are:
1) Descriptions of how software engineers collaborate with other knowledge workers on tasks at a large software company (Section V)