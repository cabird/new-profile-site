---
title: "The Conversation We're Not Having About AI in Peer Review"
date: 2026-05-20
tags: [peer-review, ai, research]
description: "What we do, what we learned, and why we're telling you."
---

## Abstract

Whether we like it or not, AI is already part of peer review.  Our community has barely begun to
discuss how reviewers use it or what norms should govern that use. We have
 independently developed AI-assisted reviewing workflows and discovered that our practices converged
on similar boundaries. In this essay, we describe those workflows in detail,
report what changed as a result of using AI, and reflect on what the
experience revealed about our own longstanding reviewing habits. We close with an initial set of
guidelines as a starting point for the
community to develop explicit, shared norms for AI use in reviewing.

## 1. Why we're writing this

There was a moral panic at the International Conference on Software Engineering
this year. The Program Committee chairs revealed that several  accepted papers
contained hallucinated references.  When the chairs explained they were taking a
light touch, simply letting the authors fix the references, the audience
recoiled.  There was outrage not only that peers would submit such
garbage, but that the chairs would be so lenient.  Later, next year's committee
members recounted this affront, with one declaring that if a hallucinated
reference is found, the reviewing PC members must be alerted immediately,
presumably so they could securely pre-judge the paper as irredeemable.

We found this reaction jolting. On the surface, the outrage seemed to stem from
a belief that *any* use of AI in the scientific process is a violation of
integrity.   It hit close to home because we were both using AI to review
papers.  If the room was this angry about authors using AI, how would
they feel about reviewers using AI?

Official guidance for reviewers using AI has been brief. At the same
program committee meeting, reviewer guidance ran to roughly a hundred slides.
Only one mentioned AI, saying simply: do not put confidential papers into a
public system that trains on what you upload. That is a necessary safeguard, but
it reveals how little the conversation has progressed, caught between moral
panic on one side and administrative avoidance on the other.

We are two senior software engineering researchers who review a lot of papers,
receive our share of reviews, and, without coordinating, developed AI-assisted
reviewing practices that converged on similar boundaries. We are not AI
maximalists, who hand papers to a model and ask for a verdict. We are not
prohibitionists either. We also know we may be getting parts of this wrong. That
uncertainty is one reason to write this essay.

Here is the core of what we experienced: AI did not replace our judgment; it
clarified it. Using it helped us assess papers with greater confidence, and
explain those assessments with greater precision and constructiveness.

But those benefits come with immediate caveats. We are not claiming that AI
makes reviewing faster. Indeed, one of us now spends more time on reviews than
before. Nor are we claiming that models are safe by default. They are
persuasive and capable of laundering weak reasoning into
polished prose that sounds convincing. Nor
are we casual about confidentiality. We use private or institutional endpoints,
not public consumer platforms.

We should also be clear about what we are and are not addressing in this essay. In our view, the community's most pressing reviewing problem is volume: submissions are growing faster than our ability to review them well. We are not trying to solve that problem here. However, we believe this volume will increasingly drive reviewers to reach for AI, and the way they use it matters. Interestingly, our experience using AI has **not** made reviewing faster, but it **has** changed the quality of individual reviews, making them more thorough and more constructive without outsourcing judgment. This essay is about that distinction: not whether AI will enter reviewing (in our view, this is no longer a question), but what kinds of use will make reviews better and what kinds will make them worse. We are writing for two audiences: those who believe AI has no legitimate role in reviewing, and those who believe it is inevitable and want to discuss what our community practices and norms should be. For the first group, we aim to show that "human-first" use is not the same as outsourcing judgment. For the second, we offer concrete practices and mistakes worth arguing over.

We intend this essay to start a conversation by grounding it in our own concrete 
experiences.

## 2. How Chris Reviews Papers with AI

Chris starts the same way he reviewed papers before generative AI. He prints the
paper. He reads it front to back with pen in hand. He writes in the margins,
circles claims that feel overconfident, marks places where the method loses him,
and leaves himself the kind of small reactions that would look trivial if typed
into a form: really?, where is this defined?, why this
threat model?, yes, this is strong. 

At this stage, AI is absent on purpose. If he starts by asking a model for a
summary, the summary becomes the lens through which he reads. Whatever the model
emphasizes, he will tend to emphasize; whatever it smooths over, he may never
notice. So he reads first and tries not to make a final accept-or-reject call
too early. He wants to form his own sense of what feels thin, overclaimed,
elegant, muddled, or better than the authors know how to say. He wants the
second stage to begin with *his* concerns.

After reading, he talks before he writes, because he views typing as a filter. Typing
would drop the parenthetical thought, the illustrative example, the sentence about
why Section 4 made him uneasy. He would edit himself before he understands what he
thinks. So instead he starts a recorder on his phone and walks through the paper section
by section, talking through his notes in complete thoughts. That voice-first
step captures richer detail, but it also does something harder to name: it lets
him think out loud long enough to hear which concerns should survive.

Then he waits. Chris tries to give the paper twenty-four hours before he turns
those transcripts into a review. Not every first reaction deserves to survive
into a written verdict. So he comes back the next day, skims the paper and written comments again, 
and sometimes records a second pass, and asks what held up.

AI doesn't enter the process until after this second pass. Even then, Chris does not ask a model
to review the paper. He's tried that on his own papers before submission. He hated it. The output was noisy and obsessed with issues he did not think mattered. So
he gives the model narrower jobs. Here is the paper. Here are my transcripts.
Where am I wrong? Did I complain about something the authors already addressed?
Did I misunderstand the algorithm? Is this novelty objection real or is it only
adjacent work? If a method feels unclear, he may ask for an explanation tied
back to specific passages in the paper. If a claim sounds larger than the
evidence, he may ask whether the evidence really supports it.

Chris is willing to let the model help him check his reading, but not replace
it. When the model says a prior paper already did this, he goes and looks. When
it points to a claims-evidence mismatch, he checks the mismatch himself. He has
seen too many cases where the model offers something that sounds serious until
he steps back and thinks: no, this is not important, or worse, no, the paper referenced
by the model doesn't actually exist.

When Chris reaches drafting, he gives a set of his own past reviews as
style examples and asks the model to create a first draft from his transcripts. The prior
reviews keep the output from sounding generic.

Before he submits, Chris runs one more pass. He asks the model to read the
review as if it were the author and tell him how it lands. This accomplishes
three things. It improves clarity.  Will the author actually understand what
Chris is trying to say, or will they be confused about which part of the paper he's even talking about?
It improves constructiveness. The review should tell
authors not just what is wrong but what they could do to make it better, so
they come away with a path forward rather than just a verdict. And it improves
framing. Reviews can easily come across as overly negative, and authors stop
listening once they feel attacked. Chris wants the tone to say "I am trying to
help this paper get where it needs to go," not "I am listing reasons to kill
it." When authors disagree with a review like that, the disagreement is about
the merits, not about what the reviewer meant.

## 3. How Emerson Reviews Papers with AI

Emerson also starts with paper, pen, and a printed copy, but his process
diverges quickly from Chris' after the read.  
He is not trying to preserve every criticism, but instead
trying to isolate the typically half-dozen concerns that matter most, like 
methodological doubts, apparent contradictions, or 
lack of rationale. By the end of a read, he
wants a short list of discomforts that, if resolved,  could improve
his confidence in the paper.

Once he has that list, he uses AI as a conversation partner.  But rather than
saying, "I am a reviewer and I think this is
wrong,"  he instead says "why might the authors have done it this way"?,  "X seems like
it contradicts Y, what's going on?",  or "this method seems to assume Z, what
evidence is there for Z?"  He frames concerns as charitable questions because he
wants the model to help him understand.

He is disciplined about prompt wording because he  noticed early that prompts
can easy steer the model into being strongly critical.
If he presents himself as a reviewer who
suspects a flaw, the conversation drifts toward proving him right.  So he avoids
telling the model he is reviewing a paper at all.

Emerson also refuses to ask AI to go find more flaws in the paper.  
He worries that doing so would simply help him
destroy a paper (any paper) more easily.  
He assumes he is already missing some
things; he accepts that limit.
The point is to interrogate what already bothers him,  not to scale up rejection.  
To put it
another another way,  he uses AI to interrogate his own discomforts 
with the paper.

Emerson also has found AI useful for providing examples of his concerns
to coreviewers and authors.
Prior to AI, he often found it was too onerious to provide a worked
example by hand, especially under a deadline. 
The model made that cheap.

When a concern survives interrogation, Emerson may ask the model to draft a
paragraph for his review.  He then edits it by hand, often turning the critique
back into a question for the authors because he still wants to leave room to be
wrong.  His reviews are therefore less globally orchestrated than Chris's: often
a set of locally coherent criticisms rather than one carefully staged whole.

But this workflow has a risk. Because the workflow begins from
concerns, it naturally spends more time with weaknesses than
strengths.  Consequently, 
Emerson has noticed that his reviews can come out more negative than
he intends,  because he has spent more time than he expected interrogating what
seems wrong and almost no time spelling out what he appreciates.

Emerson and Chris' shared boundary is simple: 
read first, think first, then let AI in.  
Inside that boundary, our mechanics differ. Chris
expands and checks, while Emerson distills and interrogates.

## 4. What AI revealed about our human shortcomings

The biggest thing that got cheaper for us was constructiveness. Writing a review
that says 'reject' is easy. Writing a review that says here is what is working,
here is what is missing, and here is what would have to change for this paper to
become acceptable is hard.

That is why we started thinking in terms of contract-oriented reviewing. 
A good review is a contract: here is what the paper
currently does and here is what revision would have to accomplish. 
Many borderline papers die partly because
reviewers do not bother to write that contract.

AI changed that for us. Or more precisely: 
AI did not change our standards, but it
changed how often we were willing to pay the cost of expressing them constructively.

We saw one suggestive signal in a recent FSE cycle. Emerson used AI heavily
across his full set of reviews:

| Decision  | Emerson's Stack | All of FSE |
| --------- | --------        | ---------- |
| Accept    | 14%             | 11%        |
| Revision  | 36%             | 17%        |
| Rejection | 50%             | 73%        |

 His acceptance rate ended up in line with the conference, but his rejection
rate was lower and his major-revision rate was about twice the conference's. 
In other words, several papers that might previously have gone into the
reject pile instead got revision contracts.

We do not present that as proof. It is one reviewer, one cycle, and not a study.
But the pattern fits the mechanism we felt from the inside. When the cost of
articulating a contract falls, fewer borderline papers need to die because the
constructive option is too annoying to produce. Previously, if the bar for a
major revision seemed exceedingly high, reviewers might not have bothered
writing the detailed meta-review for fear of wasted effort. We would simply
reject the paper. Because AI made it easier to clearly articulate exactly what
that high bar looked like, Emerson wrote those demanding contracts instead. To
his surprise, authors stepped up, meeting that high bar and making more
substantial changes than he expected.
How many papers had he rejected in years past because he underestimated 
what the authors could do?

A clear illustration came from the receiving end of one of Emerson's review. 
After that FSE cycle, in preparation for this essay, Emerson spoke with a revised-then-accepted paper author whose paper
had received one of Emerson's AI-assisted reviews. 
He asked the author whether AI had been involved, and the author could not tell. That mattered because we have all seen lazy, obvious AI prose in reviews and
hated it. 
The author did not report generic, uncanny text. 
Instead, the review itself mostly held up.

The review's main objection was about the statistics. Emerson, working with AI, had
flagged a statistical issue in the paper and suggested a specific test
to replace it. An author, also working with AI, implemented that test
to honor the review. But the author also consulted a human
statistician, a statistician who surfaced a separate problem Emerson
had not identified: the paper's underlying analyses were modeling two
different outcomes, an issue independent of the one Emerson had
flagged. The eventual fix was a different model altogether, one that
fixes both problems.
This is the trade-off built into Emerson's approach. By design, he
doesn't ask AI to surface flaws he hasn't already named, so flaws he hasn't
named can stay invisible — even ones a more-expert human would catch in seconds.
The prior section stated this trade-off in the abstract; this episode illustrates it concretely.

A skeptic could read this episode the obvious way: 
AI on the reviewer's side and AI on the author's side both missed 
a deeper issue
and a human expert had to clean up after them. 
But that reading is incomplete, because the counterfactual is not 
"a human reviewer would have caught it." 
Rather, the two other reviewers on this paper, both experienced, 
raised no statistical objection at all, with one explicitly praising the statistical methods 
as appropriate and well justified. 
Without Emerson's AI-assisted concern, arguably the paper would 
have been published, without the consultation of a statistician.
What AI did do is get a real issue onto the table at a level 
of precision the authors could act on — and that was what brought the statistician into the room.

But when receiving Emerson's review, the author still reported being upset at a
human level.  
In his first review sent to the authors, Emerson had marked the
paper as a "reject".  
The problem for the author's PhD student was the jarring disconnect between the
score and the substance. As the author pointed out, "how can
you say [reject] when you [say we] have a strong methodology, good novelty, high
transparency? What else do you need?"      The review read like guidance for a
major revision, but the score suggested Emerson intended to kill the paper.
Reading that reject "felt very stressful" for the author team. The pain came from the
binary score, not the AI-assisted text.      From Emerson's perspective,
dropping "weak" scores and giving a clear reject is a way to ensure co-reviewers
and authors know exactly where he stands. The intended semantics are simple: *I
recommend rejecting your paper as-is, if you make no further changes.* But what
he failed to say, and what the score couldn't convey, was the hidden second half
of that thought: *if you make the recommended changes, I would recommend
acceptance*.

That forced us to admit that some of the most damaging parts
of peer review are the
compressed human judgments wrapped around them, and the failure of time-pressed
reviewers to acknowledge a paper's strengths before launching into
their critiques.

A second class of examples pushed the same lesson further. Emerson began using
AI to engage with supplementary material in ways ordinary reviewing rarely
affords. One example is statistical, using false discovery correction. 
Emerson is not a stickler about it; he mostly follows the view that if authors do not perform a correction,
they should at least say why. But AI made it easy to test what would happen if
the correction were applied. In one paper, the first research question's
headline result reversed under correction. At first glance that looked fatal.
Then the model noticed something Emerson had missed: the first research question
was framed as a refutation of prior work. A non-significant result strengthened the 
paper's argument rather than weakening it. The review ended up
helping the paper become more rigorous and, in a real sense, stronger.

A third example came from model swap rather than statistics.  In one case,  a
paper under review used an old, cheap model. Instead of complaining or insisting
the authors use a frontier model,  Emerson asked the AI to a small replication
on a hundred data points using on the latest Anthropic model.  The result held.
Emerson's discomfort at the authors' not using state of the art models was
eased.

These interactions raise an equity problem the community has barely begun to
face.  We, two employees at a large AI-forward corporation, effectively have
infinite tokens to spend.  Most reviewers do not.  If AI-assisted reviewing
can produce richer, more constructive feedback, then unequal access is
an equity gap.

 ## 5. An invitation

Our workflows will change as we learn and as models evolve.  
But prohibition on AI-assisted reviewing is
not just impractical. It is actively harmful to the quality of scientific peer
review. Banning AI will not just push the practice underground; it will cost us
an opportunity to become more rigorous reviewers.

What we want instead are norms we can argue about in the open. We offer an
initial set in the next section, not because we think they are definitive, but because
a conversation needs something concrete to push against.

We are open to being wrong about all of this. If the evidence shows that
our workflows reliably distort judgment, disadvantage authors,
or amplify inequity more than they improve feedback, we would change 
our practice.

## 6. Guidelines for Using AI in Reviewing (Do's & Don'ts)

These guidelines below are a starting point. 
They reflect what we have learned from our own practice and where we think the clearest risks lie. 
We expect them to evolve as the community gains more experience.

1. **Do read the paper yourself first.** Form your own understanding before
involving AI so your judgment isn't shaped by its framing.

1. **Do use AI to clarify and strengthen your own review.** Use it to organize
thoughts, improve clarity, and make your feedback more precise and constructive.

1. **Do frame prompts as neutral questions.** Ask things like "Why might the
authors have done this?" rather than leading with criticism.

1. **Do use AI to check for mistakes or omissions in your review.** For example,
ask whether something you claimed is actually addressed in the paper.

1. **Do use AI to improve constructiveness and help articulate your reasons for
acceptance.** Turn critiques into actionable feedback (e.g., "the paper would be
stronger if..."), not just negative judgments.

1. **Do use AI to draft or refine meta-reviews.** Especially for synthesizing
discussion into clear, concrete revision contracts, but ensure all humans
review and agree.

1. **Don't ask AI to independently review or judge the paper.** The evaluation
and decision must remain yours, not outsourced to a model.

1. **Don't rely on AI to justify a decision after the fact.** Avoid using it for
post-hoc rationalization of accept/reject choices.

1. **Don't assume polished output is correct.** Fluent language can mask
incorrect or irrelevant reasoning.

1. **Don't violate confidentiality.** Don't use platforms that train on
submitted prompts/data. This is the ACM's guideline.

## Acknowledgements

Thanks to the anonymous paper authors for engaging Emerson in
thoughtful dialog.
Thanks also to Sarah Fakhoury and Bogdan Vasilescu for their helpful
comments on early drafts of this essay.

## AI Disclosure

This paper was written with the help of AI, including models from Anthropic,
Google, and OpenAI. Our process was as follows: 
* Emerson and Chris had two
hours of recorded, mostly unstructured conversations about their experience and
opinions about reviewing with with AI. 
* Emerson had a 25 minute, recorded,
semi-structured discussion with an author on the receiving end of one of his
reviews. 
* Chris and Emerson took the transcripts and, working with AI,
identified expertise sources on essay craft and the target venue, distilled
writing principles, built a structured outline from section arc down to
paragraph-level beats, then generated three independent first drafts using
different models. A comparative review identified each draft's strengths, and
two merged drafts were produced by combining the best elements of all three. 
* Chris, Emerson, and AI revised the paper to ensure that it said what they wanted
to say, was factually accurate, and better reflected Emerson and Chris' own
voice.
