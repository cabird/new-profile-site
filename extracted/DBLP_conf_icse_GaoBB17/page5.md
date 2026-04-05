> **Procedure 1 Manual Type Annotation**
> 
> ```
> Input: M, the maximum time to spend annotating a bug
> Input: B, the list of sampled buggy versions
> Output: O, the assessment of all sampled bugs
> 1: while B != [] do
> 2:   b := head B; B := tail B;
> 3:   for all ts ∈ {Flow, TypeScript} do
> 4:     start := now(); O_ts[b] := Unknown;
> 5:     while now() <= start + M do
> 6:       Read the bug report and the fix
> 7:       Apply annotation tactics to the patched region
> 8:       if tc_ts(a(b)) then
> 9:         O_ts[b] := True; break
> 10:      end if
> 11:      if the author deems b ts-undetectable then
> 12:        Justify the assessment
> 13:        Categorise b using the taxonomy below
> 14:        O_ts[b] := False; break
> 15:      end if
> 16:    end while
> 17:  end for
> 18: end while
> ```
> 
> ![Procedure 1 box](txt_proc_1.png)

procedure. Thus, we set M, the maximum time that an author can spend annotating a bug, to be 10 minutes.

Taxonomy of Undetectable Bugs To build a taxonomy of bugs that Flow and TypeScript do not currently detect, we used open coding. Open coding is a qualitative approach for categorizing observations that lack a priori organization [16]. The researchers assessed each observation and iteratively organized them into groups they deem similar. Starting from JavaScript’s error model, we refined the taxonomy. At the end of our preliminary study, our taxonomy contained JavaScript’s EvalError, RangeError, URIError, and SyntaxError. To these, we added StringError, such as malformed SQL queries. The logical errors we encountered caused us to add BranchError, PredError that are caused by incomplete or wrong predicates, UIError, and SpecError, a catch-all for other failures to implement the specification. Regular expressions are built into and widely used in JavaScript, so we included RegexError. Finally, we added ResError to handle resource errors, like out of memory, and APIError to capture errors such as using a deprecated call.

![Taxonomy paragraph image](txt_left_para_1.png)

## C. Annotation

Procedure 1 defines our manual type annotation procedure. Because we annotate each bug twice, once for each type system, our experiment is a within-subject repeated-measures experiment. As such, a phenomenon known as learning effects [17] may come into play, as knowledge gained from creating the annotations for one type checker may speed annotating the other. To mitigate learning effects, for a bug b in B, we first pick a type system ts from Flow and TypeScript uniformly at random, so that, on average, we consider as many bugs for the first time for each type system. If b is not type related “beyond a shadow of a doubt”, such as misunderstanding the

![C. Annotation image](txt_section_C_annotation.png)

specification, we label it as undetectable under ts and categorise it based on item III-B, skipping the annotation process. If not, we read the bug report and the fix to identify the patched region, the set of lexical scopes the fix changes.

Combining human comprehension and JavaScript’s read–eval–print loop (REPL), e.g. Node.js, we attempt to understand the intended behavior of a program and add consistent and minimal annotations that cause ts to error on b. We are not experts in type systems nor any project in our corpus. To combat this, we have striven to be conservative: we annotate variables whose types are difficult to infer with any. Then we type check the resulting program. We ignore type errors that we consider unrelated to this goal. We repeat this process until we confirm that b is ts-detectable because ts throws an error within the patched region and the added annotations are consistent (Section II), or we deem b is not ts-detectable, or we exceed the time budget M.

### D. Annotation Tactics

The key challenge in carrying out Procedure 1 is efficiently annotating the patched region. As previously stated, we rely on gradual typing to allow us to locally type a patched region. Sometimes, we must eliminate type errors so the type checker reaches the patched region. In practice, this means we must handle modules. With modules out of the way, we use a variety of tactics to gradually annotate the patched region. The first, and most important, tactic is to read the bug-fixing commit. For example, the fix of naugtur/transitionrunner:1 (using author/project:issue to refer to our dataset) assigns the empty string to the variable initialClass when it is null. Therefore, we add an annotation to indicate initialClass can be null. We also use online documentation, when it exists. For example, accessing a non-existing property triggers bug Gozala/narwhal-xulrunner:5. We read the documentation of nsIOutputStream at Mozilla Developer Network to learn and inject the appropriate annotation. To handle globals, we use type shims, which we describe below. As noted, we have striven to add type annotations that are consistent (Section II) with the ideal, fully annotated, and fixed version of the buggy program.

#### Modules

For a subject buggy program, we first run the type checker without any type annotations. Often the type checker reports an error before reaching the patched region due to failures to import modules. We search for the declaration of the variables in the fix and try to see whether they use any module methods, like jQuery’s $. Finding variable declarations can be nontrivial in JavaScript, precisely because a lack of types hindered our understanding of the program. If we deem a missing module to be unrelated to the bug, we annotate it as any to eliminate such type errors. For example,

```
// Flow and TypeScript cannot properly
// import express.js
var express = require('express');
var app = express.createServer();
becomes
var express:any = { };
var app = express.createServer();
```

![Code example image](txt_code_1.png)