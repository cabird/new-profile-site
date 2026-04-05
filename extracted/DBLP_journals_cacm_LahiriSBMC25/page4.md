Of course, we also underestimated the importance of user experience. How exactly would a user end up employing such a tool—one that’s AI-based, that is? And what would be the right time to surface that aspect of the tool?

COATTA: I find it fascinating that it proved to be so difficult to scope this project correctly. Can you dig a bit deeper into that?

SVYATKOVSKIY: To me, at least, as we were analyzing the different types of merges, it soon became clear that there are varying levels of complexity. Sometimes we’d find ourselves looking at two simple merge resolution strategies, where it essentially came down to “Take ours or take theirs.” Such cases are trivial to analyze, of course, and developers don’t require much AI assistance when it comes to resolving these conflicts.

But then there’s another class of merge, where a new interleaving line is introduced that involves more than just concatenation. There could also be token-level interleaving, where lines in the code have been broken and new tokens introduced in between. This leads to the notoriously complex case where a switch to token-level granularity proves to be crucial. Beyond that, there’s a whole other class of merges where you find somebody has introduced some new tokens.

MEIJER: How do you go about defining what you consider to be a correct merge? Doesn’t that require you to make your own value judgments in some sense?

LAHIRI: Well, I’ll just say we had a very semantic way of looking at merges. Essentially: “Forget about the syntax; instead, what does it mean for the merge to be correct?” In effect, this amounts to: If something was changed in one program, then that ought to be reflected in the merge. And, if that also changes a behavior, then that too ought to be included in the merge. But no other changes or altered behaviors should be introduced.

We then found, however, that we could get tangled up whenever we ran into one of these “take my changes or take yours” merges. We also found that one set of changes would often just be dropped—like a branch being deprecated, as Alexey once pointed out. This is how we discovered that our initial notion of correctness didn’t always hold.

That’s also how we came to realize we shouldn’t adhere to overly semantic notions.

So, we decided just to do our best to curate the training data by removing any indications of “take your changes or take mine” wherever possible. Then we looked at those places where both changes had been incorporated to some extent and said, “OK, so this now is our ground truth—our notion of what’s correct.” But notice that this is empirical correctness as opposed to semantic correctness—which is to say, we had to scale back from our original high ambitions for semantic correctness.

SVYATKOVSKIY: We now treat user resolutions retrieved from the GitHub commit histories as our ground truth. But yes, naturally, there are all kinds of ways to define a “correct” merge. For example, it’s possible to reorder the statements in a structured merge and yet still end up with a functionally equivalent resolution. Yet, that would be deemed as “incorrect,” so, there’s clearly room for retooling our definition of correctness. In this instance, however, we chose to take a data-driven approach that treats user resolutions from the GitHub commit histories as our ground truth.

BIRD: Right. And let me also say that, from the beginning of this project, we decided to approach it as something that might yield a product. With that in mind, we realized it needed to be, perhaps not language-agnostic, but at least something that could be readily adapted to multiple languages—and definitely not something that would require some bespoke analysis framework for each language. That essentially guided our choice not to employ richer or more complex code representations.

MEIJER: I’ve also run into situations like this where it looked really tempting to use an AST [abstract syntax tree] or something of the sort, since that would provide all the structure that was required. But then, as you go deeper into that sort of project, you find yourself wondering whether it’s actually a good idea to feed semantically rich programs into models and start thinking it might be better just to send strings instead.

COATTA: To dive a bit deeper into that, you had a practical motivation to work

> CHRISTIAN BIRD  
> It dawned on us that almost no one seemed to be working on program merge. And yet, that’s a problem where we, as developers, still have little to rely upon.