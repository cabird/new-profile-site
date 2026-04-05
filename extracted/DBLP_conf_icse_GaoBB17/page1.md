## To Type or Not to Type: Quantifying Detectable Bugs in JavaScript

Zheng Gao — University College London, London, UK — z.gao.12@ucl.ac.uk  
Christian Bird — Microsoft Research, Redmond, USA — cbird@microsoft.com  
Earl T. Barr — University College London, London, UK — e.barr@ucl.ac.uk

Abstract—JavaScript is growing explosively and is now used in large mature projects even outside the web domain. JavaScript is also a dynamically typed language for which static type systems, notably Facebook’s Flow and Microsoft’s TypeScript, have been written. What benefits do these static type systems provide? Leveraging JavaScript project histories, we select a fixed bug and check out the code just prior to the fix. We manually add type annotations to the buggy code and test whether Flow and TypeScript report an error on the buggy code, thereby possibly prompting a developer to fix the bug before its public release. We then report the proportion of bugs on which these type systems reported an error.

Evaluating static type systems against public bugs, which have survived testing and review, is conservative: it understates their effectiveness at detecting bugs during private development, not to mention their other benefits such as facilitating code search/completion and serving as documentation. Despite this uneven playing field, our central finding is that both static type systems find an important percentage of public bugs: both Flow 0.30 and TypeScript 2.0 successfully detect 15%!

Keywords—JavaScript; static type systems; Flow; TypeScript; mining software repositories;

## I. INTRODUCTION

In programming languages, a type system guarantees that programs compute with expected values. Broadly, two classes of type systems exist — static and dynamic. Static type systems perform type checking at compile-time, while dynamic type systems distinguish types at run-time. The cost and benefits of choosing one over the other are hotly debated [1, 2, 3, 4]. Proponents of static typing argue that it detects bugs before execution, increases run-time efficiency, improves program understanding, and enables compiler optimization [5, 6]. Dynamic typing, its advocates claim, is well-suited for prototyping, since it allows a developer to quickly write code that works on a handful of examples without the cost of adding type annotations. Dynamic type systems do not force developers to make an explicit upfront commitment to constraining the values an expression can consume or produce, which facilitates the writing of reflective, adaptive code.

JavaScript, a dynamically typed language, is increasing in popularity and importance. Indeed, it is often called the assembly of the web [7]; it is the core language of many long-running projects with public version control history. Three companies have viewed static typing as important enough to invest in static type systems for JavaScript: first Google released Closure1, then Microsoft published TypeScript2, and most recently Facebook announced Flow3. What impact do these static type systems have on code quality? More concretely, how many bugs could they have reported to developers?

The fact that long-running JavaScript projects have extensive version histories, coupled with the existence of static type systems that support gradual typing and can be applied to JavaScript programs with few modifications, enables us to under-approximate the beneficial impact of static type systems on code quality. We measure the benefit in terms of the proportion of bugs that were checked into a source code repository that might not have been if the committer were using a static type system that reported an error on the bug.

In this experiment, we sample public software projects, check out a historical version of the codebase known to contain a bug, and add type annotations. We then run a static type checker on the altered, annotated version to determine if the type checker errors on the bug, possibly triggering a developer to fix the bug. Unlike a controlled human subject experiment, our experiment studies the effect of annotations on bugs in real-world codebases, not the human annotator, just as surgery trials seek to draw conclusions about the surgeries, not the surgeons [8], despite our reliance on human annotation. More generally, decision makers can use this “what-if” style of experimentation on software histories to help decide whether to adopt new tools and processes, like static type systems.

In this study, we empirically quantify how much static type systems improve software quality. This is measured against bugs that are public, actually checked in and visible to other developers, potentially impacting them; public bugs notably include field bugs, which impact users. We consider public bugs because they are observable in software repository histories. Public bugs are more likely to be errors understanding the specification because they are usually tested and reviewed, and, in the case of field bugs, deployed. Thus, this experiment under-approximates static type systems’ positive impact on software quality, especially when one considers all their other potential benefits on documentation, program performance, code completion, and code navigation.

running projects with public version control history. Three companies have viewed static typing as important enough

1 https://developers.google.com/closure/compiler/  
2 http://www.typescriptlang.org/  
978-1-4799-3360-0/14/$31.00 ©2017 IEEE 3 http://flowtype.org/