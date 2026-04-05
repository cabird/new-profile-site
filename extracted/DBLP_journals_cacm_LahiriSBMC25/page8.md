not only real-world examples but also ones where all the trade-offs and implications associated with each important decision point were sure to be fully appreciated by the study subjects. Which is to say that the exercise proved to be an interesting learning experience for all parties involved.

COATTA: We all know that creating a tool for internal purposes is one thing, while turning that into a product is something else altogether. It seems you took that journey here, so what were some of the bigger surprises you encountered along the way?

LAHIRI: Actually, we don’t have a product yet that implements the DeepMerge algorithm and aren’t at liberty to talk about how that might be used in future products. Still, as we’ve just discussed, I can say most of the unusual challenges we encountered were related to various aspects of the user experience. So, we got much deeper into that here than we normally would.

One of the biggest challenges had to do with determining how much information needed to be surfaced to convince the user that what was just done was even possible—never mind appropriate. Suddenly, you’ve just introduced some new tokens over here, along with a new parsable tree over there. I think that can really throw some users off.

BIRD: What did all this look like from the DevDiv perspective, Alexey? You deal with customers all the time. What proved to be the biggest challenges there?

SVYATKOVSKIY: Some of the most crucial design decisions came down to choosing between client-side or server-side implementation. Our chief concern had to do with the new merge algorithm we were talking about earlier. Customer feedback obtained from user studies and early adopters proved to be particularly crucial in terms of finding ways to smooth things out. Certainly, that helped in terms of identifying areas where improvements were called for, such as achieving better symmetries between what happens when you merge A to B versus when you merge B to A.

LAHIRI: I’d like to add a couple of points. One is that some developers would prefer to handle these merges themselves. They just don’t see the value of tooling when it’s used to deal with something they could do themselves. But that just resulted in some inertia, which is always hard to overcome without a lot of usage. Still, from our empirical study we learned that, even when merges were not identical to the ground truth, users would accept them if they proved to be semantically equivalent. Ultimately, that proved to be a pleasant surprise, since it revealed we had previously been undercounting our wins according to our success metrics.

COATTA: Did anything else interesting surface along the way?

BIRD: At one point, one of our interns did a user study that pulled merge conflicts and their resolutions out of Microsoft’s historical repositories so they could then be compared with the resolutions our tool would have applied. As you might imagine, quite a few differences surfaced. To understand where our tool may have gone wrong, we went back to consult with those people who had been involved in the original merges and showed them a comparison between what they had done and how the tool had addressed the same merge conflicts.

We specifically focused on those conflicts that had been resolved over the preceding three months on the premise that people might still recall the reasoning behind those decisions. We learned a ton by going through that particular exercise. One of the lessons was that we had probably undercounted how often we were getting things right, since some of these developers would say things like, "Well, this may not exactly match the merge I did, but I would have accepted it anyway."

The other major benefit of that study was the insight it provided into what the user experience for our tool should be. This all proved to be a major revelation for me, since it was the first time I’d been involved in a user study that was approached in quite this way—where developers were pulled in and presented with code they’d actually worked on.

Which is just to say this wasn’t at all like one of those lab studies where people are presented with a toy problem. In this case, we were pulling in real-world merge conflicts and then talking with the developers who had worked to resolve them. We learned so much from taking this approach that I’d recommend other researchers consider doing their own studies in much the same way.

SVYATKOVSKIY: Another thing that came out of these user studies was the importance of explainability. With large language models, for example, we can drill into specific three-way diffs and their proposed resolutions and then ask for summaries of certain decisions, which can be helpful when it comes to building confidence in some of these AI suggestions.

Also, as Chris indicated, even when users chose not to go with the solution offered by DeepMerge, the reasoning behind the suggestion still seemed to inform their own thinking and often led to an improved merge resolution.

COATTA: What’s next?

LAHIRI: There’s room for more prompt engineering in terms of determining what goes into the model’s input. We also need to address correlated conflicts. So far, we’ve addressed each conflict as if it was independent, but you can have multiple conflicts in a file that all relate to a certain dependency. Some users have told us that, once a resolution has been worked out for one of those conflicts, they’d like to see something similar applied to each of the other conflicts that exhibit a similar pattern, which certainly seems quite reasonable.

Also, while the types of conflicts we’ve addressed so far are highly syntactic in nature, there is, in fact, a whole spectrum of merge conflicts. There’s still much to address, including silent merges that include semantic conflicts, which are much harder to deal with than anything we’ve handled so far. Still, I’d say it feels like we’re off to a reasonably good start.

> Terry Coatta is chief technology officer of Marine Learning Systems, Vancouver, BC, Canada.  
> Erik Meijer is an independent researcher and entrepreneur in residence at Storm Ventures.  
> Shuvendu K. Lahiri is a senior principal researcher in the Research in Software Engineering (RiSE) Group at Microsoft Research, Redmond, WA, USA.  
> Alexey Svyatkovskiy is a researcher at Google DeepMind, Seattle, WA, USA.  
> Christian Bird is a senior principal researcher in the Software Analysis and Intelligence in Engineering Systems (SAINTES) Group at Microsoft Research, Redmond, WA, USA.