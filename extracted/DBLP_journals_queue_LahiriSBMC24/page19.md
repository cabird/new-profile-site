doing their own studies in much the same way. AS Another thing that came out of these user studies was the importance of explainability. With large language models, for example, we can drill into specific three-way diffs and their proposed resolutions and then ask for summaries of certain decisions, which can be helpful when it comes to building confidence in some of these AI suggestions.

Also, as Chris indicated, even when users chose not to go with the solution offered by DeepMerge, the reasoning behind the suggestion still seemed to inform their own thinking and often led to an improved merge resolution.

TC What’s next?

SL There’s room for more prompt engineering in terms of determining what goes into the model’s input. We also need to address correlated conflicts. So far, we've addressed each conflict as if it was independent, but you can have multiple conflicts in a file that all relate to a certain dependency. Some users have told us that, once a resolution has been worked out for one of those conflicts, they'd like to see something similar applied to each of the other conflicts that exhibit a similar pattern, which certainly seems quite reasonable.

Also, while the types of conflicts we’ve addressed so far are highly syntactic in nature, there is, in fact, a whole spectrum of merge conflicts. There’s still much to address, including silent merges that include semantic conflicts, which are much harder to deal with than anything we’ve handled so far. Still, I'd say it feels like we're off to a reasonably good start.