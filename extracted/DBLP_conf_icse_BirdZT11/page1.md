## A Theory of Branches as Goals and Virtual Teams

Christian Bird    Thomas Zimmermann    Alex Teterev  
Microsoft Research    Microsoft Research    Microsoft  
Redmond, WA    Redmond, WA    Redmond, WA  
cbird@microsoft.com    tzimmer@microsoft.com    alextet@microsoft.com

### ABSTRACT
A common method of managing the complexity of both technical and organizational relationships in a large software project is to use branches within the source code management system to partition the work into teams and tasks. We claim that the files modified on a branch are changed together in a cohesive way to accomplish some task such as adding a feature, fixing a related set of bugs, or implementing a subsystem, which we collectively refer to as the goal of the branch. Further, the developers that work on a branch represent a virtual team. In this paper, we develop a theory of the relationship between goals and virtual teams on different branches. Due to expertise, ownership, and awareness concerns, we expect that if two branches have similar goals, they will also have similar virtual teams or be at risk for communication and coordination breakdowns with the accompanying negative effects. In contrast, we do not expect the converse to always be true. In the first step towards an actionable result, we have evaluated this theory empirically on two releases of the Windows operating system and found support in both.

### Categories and Subject Descriptors
D.2.7 [Software Engineering]: Distribution, Maintenance, and Enhancement—Version Control; D.2.9 [Software Engineering]: Management – Software Configuration Management.

### General Terms
Management, Measurement, Human Factors

### Keywords
Branching, Teams, Coordination

1. INTRODUCTION  
Software development in any large project is a collaborative and team-based enterprise. Disorganization in such contexts is known to lead to delays [1] and faults [2]. An ideal solution to the problem of organizing a large software effort is to decompose the system into highly cohesive and loosely coupled modules [3] and create teams around these modules, leveraging Conway’s Law [4]. We hasten to note that Parnas’ definition of a module may not characterize the conventional definition. From his paper, “In this context ‘module’ is considered to be a responsibility assignment rather than a sub-program.” In practice, we have observed that development teams face barriers when attempting to organize in this way.

Some “modules” are cross-cutting and defy loose coupling with the rest of the system. Other modules may be highly dependent on other components within the system. In both cases, teams may need to be insulated from the changes of others that may destabilize parts of the system that it is working on or dependent on.

Once the decomposition of the system into modules has been decided upon and resources (in the form of developers) have been assigned tasks, how do they perform their work in such a way that they can share with each other but remain isolated during times of rapid and volatile development? A common solution to this problem is through the use of branches within the software configuration management (SCM) system. Using branches allows teams to defer integration and can insulate them from the changes of others that may hinder their own progress.

Branching within an SCM allows multiple teams to create their own workspaces (usually called a branch) from a particular state of the source code. Each team commits to their own branch as they normally would in their SCM and at some point in the future, once their tasks have been completed, the changes in their branch are integrated (also known as merged) into the trunk or a release branch. The effort involved in such an integration is usually dependent on how much work went on in the branch and also in the original branch in the intervening time. By providing isolation, branches allow teams to focus on their own tasks without prematurely worrying about or being affected by the changes occurring in the rest of the system. Teams are free to explore, develop, test, and stabilize the code base without interfering with others.

Recently, many open source software (OSS) projects have begun using branches more heavily as a result of moving to more advanced SCMs such as Git and mercurial [5]. Within Microsoft, branching is used heavily to insulate teams from each other’s possibly unstable changes. In both contexts, we have observed anecdotally that a branch embodies a goal (we use a purposely vague term) which may represent one or more related features, user scenarios, or subsystems and a virtual team that represents those contributors working on this goal.

We claim that the SCM is the most important collaborative tool used during software development because it is the mechanism by which developers actually share the technical artifact. As such, their collaborative behavior as evidenced by SCM records is a valuable resource and tracking this behavior with an expectation of what is generally “good” and “bad” may enable project managers to help their teams avoid problems. We follow in the steps of others by examining developers’ behavior through the lens of historical repository data [6].

Prior research suggests that awareness is important as developers work in different branches (also referred to in other work as