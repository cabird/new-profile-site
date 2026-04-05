> implications between an existing branch in the base and your branch.
>
> So, we ran a Twitter survey to get a sense of how much of that people thought we should show. How much of that did they even want to see? For example, as I recall, most people couldn't even handle the idea of a three-way diff, or at least weren't expecting to see anything quite like that. That really blew my mind, since I don't know how anyone could possibly expect to deterministically resolve a conflict if they don't know exactly what they're facing.
>
> Some other issues also came up that UI people probably would expect, but I nevertheless was incredibly surprised. That proved to be a big challenge, since we'd been thinking throughout this whole process that we'd just get around to the UI whenever we got around to it. And yes, as this suggests, our tendency initially was just to focus on making sure the underlying algorithm worked. But then we found to our surprise just how tough it could be to find the right UI to associate with that.
>
> TC From what you say, it seems you weren't surprised about the need for a good user experience, but it did surprise you to learn what's considered to be a good experience. What are your thoughts now on what constitutes a good user experience for merge?
>
> CB I'm not entirely clear on that even now, but I'll be happy to share some of the things we learned about this early on. As we've already discussed, people definitely want to see both sides of a merge. Beyond that, we discovered that they want the ability to study the provenance of each part of the merge because they want to know where each token came from.
>
> So, we wrote some code to track each token all the