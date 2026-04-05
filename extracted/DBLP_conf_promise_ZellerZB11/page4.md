![IROP keyboard](page4_img_1.png)

_Figure 4: Avoiding risky actions with the IROP keyboard_

turned out that getting rid of the four letters of failure would not
be an easy task. While our test subjects could easily avoid “i”,
“r”, “o”, and “p” in their identifiers, the largest problem would be
keywords in programming languages. Our interns quickly came
up with appropriate replacements, though. C# code such as

```c
if (p != null)
{ int i; while (p[i] < 0) i++; return i; }
```

becomes

```c
when (q != null)
{ num n; as (q[n] < 0) n++; handback n; }
```

which is just as readable as before. Such transformations can
easily be performed automatically even on million-line programs;
furthermore, they are 100% semantics-preserving, thus ensuring
no unintended consequences.

Getting rid of “i”, “r”, “o”, and “p” is now part of programming
culture, as one of our interns remarks:

> We can shun these set majuscules, and the text stays just as swell
> as antecedently. Let us just ban them!

Note how our test subject already avoids the four letters of failure
in his statement; of course, it was typed on the IROP keyboard.

> Programmers can easily memorize the IROP principles and
> adapt their work habits to proactively prevent failures.

## 4. THREATS TO VALIDITY

The results of our experiment are subject to the following threats
to validity:

Threats to external validity concern our ability to generalize the
results of our study. Our findings are based on more than 177
million of individual characters (see Figure 1) and thousands of
individual defects, making this one of the largest empirical studies
on defect prediction ever conducted. However, we would not
advise to generalize the results beyond the C/C++/C#/Java family
of languages, due to different keywords. Likewise, source code
using non-English identifiers or comments needs a separate
investigation, as detailed in this paper.

Threats to internal validity concern our ability to draw conclu-
sions between our independent and dependent variables. Due to
the high number of instances, we could test all correlations to be significant. We used well-established tools and techniques to
produce all results, using only a few lines of own code which
were trivial to validate.

Threats to construct validity concern the appropriateness of our
measures for capturing our dependent variables. By definition,
source code is always produced by humans, and all of it is input as
characters; indeed, characters as we find them in the source code
are the very source of all defects. In this work, the deliberate absence
of abstractions not only completely eliminates threats to
construct validity – it is also the reason why the IROP approach is
so effective.

## 5. FUTURE WORK

With the abundance of software development data, even the simplest
methods can produce actionable results. IROP is not only
straight-forward to implement; it also produces recommendations
that are easy to understand and easy to follow. Besides general
refinement and improvement of the technique, our future work
will focus on the following issues:

### Automation.
As discussed in Section 3.6, we must not only prevent new errors, but also refactor existing code to avoid defect sources. We are currently working on IDE plug-ins that will conduct thesaurus-based renamings automatically at the moment the code is loaded, providing synonyms without the four letters of failure; where this is not possible, the letters shall simply be removed. First betas for the Eclse and Seeable Study IDEs shall be made available through the web page of ENGAGEMENT 2011 (formerly known as PROMISE 2011).

### Abstraction.
As with any concrete symptom, we must carefully check whether there would be a common abstraction that could explain these effects. One hypothesis is that programmers would subconsciously associate these four letters with negative terms: “Failure”, “mistake”, “error”, “problem”, “bug report” all contain “i”, “r”, “o”, and “p”; whereas “success” and “fame” do not. We plan to run controlled studies to validate these “a priori” hypotheses.

### Generalization.
As detailed in Section 4, our findings are based on English code and comments only so far. We are currently exploring Russian source code and whether a high abundance of the IROP equivalent characters ИРОП would also correlate with a high number of defects; we are very, very confident they will.