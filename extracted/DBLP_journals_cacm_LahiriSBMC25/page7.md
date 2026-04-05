> CHRISTIAN BIRD  
> There are lots of moving pieces in any given merge. Accordingly, there are many possible views, and yet you still want to keep things simple enough to avoid overwhelming the user. That’s a real challenge.

BIRD: There were so many surprises. One I particularly remember came up when we were trying to figure out how people would even want to view merge conflicts and diffs. At first, some of us thought they’d want to focus only on the conflict itself—that is, with a view that let them see both their side and the other side. It turns out you also need to be able to see the base to understand the different implications between an existing branch in the base and your branch.

So, we ran a Twitter survey to get a sense of how much of that people thought we should show. How much of that did they even want to see? For example, as I recall, most people couldn’t even handle the idea of a three-way diff, or at least weren’t expecting to see anything quite like that. That really blew my mind, since I don’t know how anyone could possibly expect to deterministically resolve a conflict if they don’t know exactly what they’re facing.

Some other issues also came up that UI people probably would expect, but I nevertheless was incredibly surprised. That proved to be a big challenge, since we’d been thinking throughout this whole process that we’d just get around to the UI whenever we got around to it. And yes, as this suggests, our tendency initially was just to focus on making sure the underlying algorithm worked. But then we found to our surprise just how tough it could be to find the right UI to associate with that.

COATTA: From what you say, it seems you weren’t surprised about the need for a good user experience, but it did surprise you to learn what’s considered to be a good experience. What are your thoughts now on what constitutes a good user experience for merge?

BIRD: I’m not entirely clear on that even now, but I’ll be happy to share some of the things we learned about this early on. As we’ve already discussed, people definitely want to see both sides of a merge. Beyond that, we discovered that they want the ability to study the provenance of each part of the merge because they want to know where each token came from.

So, we wrote some code to track each token all the way back to whichever side it came from.

There also were tokens that had come in from both sides. To make it clear where a token had originated, we wrestled with whether we should add colors as an indicator of that. How might that also be used to indicate whether a token happens to come from both sides or simply is new?

In addition, we knew it was important that the interface didn’t just ask you to click "yes" or "no" in response to a suggested change, since it’s rare to find any merge that’s going to be 100% correct. Which is to say developers are going to want to be able to modify the code and will only end up being frustrated by any interface that denies them that opportunity.

The real challenge is that there are lots of moving pieces in any given merge. Accordingly, there are many possible views, and yet you still want to keep things simple enough to avoid overwhelming the user. That’s a real challenge. For example, we know that if we offer three suggestions for a merge rather than just one, the chance of the best one being selected is much higher. But that also adds complexity, so we ultimately decided to go with suggesting the most likely option, even though that might sometimes lead to less-optimal results.

There are some other user-experience considerations worth noting. For example, if you are working on some particular Visual Studio feature, you’re going to want to produce something that feels intuitive to someone who has been using that same tool. Suffice it to say, there’s plenty to think about in this respect. Basically, once you finally get your model to work, you might not even be halfway home, since that’s just how critical—and time-consuming—the user-experience aspect of this work can be.

Yes, user experience actually does matter—even when the users happen to be developers. Accordingly, a substantial user study was launched in this instance, where the subjects of the study were members of MSR’s own technical staff.

Another interesting aspect was that the study participants were presented with code samples extracted from their own work. The significance of this, of course, was that it involved the use of