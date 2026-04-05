## Understanding and Improving Software Build Teams

Shaun Phillips  
University of Calgary  
Calgary, Alberta, Canada  
phillist@ucalgary.ca  

Thomas Zimmermann  
Microsoft Research  
Redmond, WA, USA  
tzimmer@microsoft.com  

Christian Bird  
Microsoft Research  
Redmond, WA, USA  
cbird@microsoft.com  

### ABSTRACT
Build, creating software from source code, is a fundamental activity in software development. Build teams manage this process and ensure builds are produced reliably and efficiently. This paper presents an exploration into the nature of build teams—how they form, work, and relate to other teams—through three multi-method studies conducted at Microsoft. We also consider build team effectiveness and find that many challenges are social, not technical: role ambiguity, knowledge sharing, communication, trust, and conflict. Our findings validate theories from group dynamics and organization science, and using a cross-discipline approach, we apply learnings from these fields to inform the design of engineering tools and practices to improve build team effectiveness.

#### Categories and Subject Descriptors
H.5.3. [Group and Organization Interfaces]: Computer-supported cooperative work

#### General Terms
Human Factors; Management.

#### Keywords
Software; build; teams; effectiveness; group dynamics; organization science; communication; conflict; trust.

### 1. INTRODUCTION
Build, the process of creating software from source code, is an essential part of software development. Generally speaking, a build process consists of three phases: configuration, where various compile-time options are selected, platform capabilities are verified, and the existence and location of build tools (e.g., the linker) are determined; compilation, where source code written in high-level computer languages (e.g., C++) is transformed into machine code that can be executed by a computer; and packaging, where the machine code is bundled into an installation package so that it can be deployed to users.

In real-world scenarios, a build process will likely consist of many more complex tasks. For instance, there may be scheduling of build machines, build metric collection (such as time or power consumption), security checks, so-called “smoke” tests to ensure some baseline level of quality, language localization, reporting of build results, and triaging of build problems. All together, the collection of scripts, programs, and services that comprise and automate a build process is called a build system.

The build process is cyclical. Development teams write code which at some point is processed by the build system. The output, the build, is deployed back to the development teams to verify the changes [19] and the cycle begins again. This cycle is critical to delivering high-quality software on-time and on-budget [9, 22]. As stated by one of our interview participants, build is “the heartbeat of an organization.” However, the cycle is fragile: building will fail if developers write incorrect code, and developers are unable to verify their work unless their code is built.

While building the quintessential “Hello World” program can be done in seconds, in large-scale software development building can be very complex and take many hours to complete [28]; at Microsoft, some large projects require up to six hours of build-time. If a long build process fails (e.g., from a compilation error), developers must wait much longer than expected for the build to be available, which delays their change verification and puts pressure on the development schedule. An unreliable, failure-prone build process is analogous to an irregular organizational heartbeat.

### 1.1 The Formation of Build Teams
Build systems change at about the same rate as the source code they build [31], and over time build systems can become very complex. Our studies show that the “builder” role can arise in an organization when it is inefficient to have many developers learn and manage a complex build process. As one interview participant quipped, builders are a “response to irritation.” To illustrate how complicated build systems can become, one senior builder noted that new build team members need “about three months of experience before they can confidently manage the build process on their own.”

Build teams tend to form organically in response to changes in organization size and build complexity—they are emergent groups [12]. This formation is different than other teams in a software development organization, which usually have their work scoped and staffing needs met before the development process begins. In our studies, we found that early builders at Microsoft were developers thrust into the role by necessity and the perception that they understood the build system better than others. While the role is now more formalized, how build teams form has led to role ambiguity, a weakness that leads to additional problems, which we discuss in our findings.