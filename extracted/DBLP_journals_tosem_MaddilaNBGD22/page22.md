> Some developers mentioned that ConE helped them saving time and/or effort significantly by providing early intervention:
>
> "ConE is very useful. It saved at least two hours to resolve the conflicts and smoke again."
>
> "This would save a couple of hours of dev investigation time a month."
>
> "ConE would have saved probably an hour or so for PR <XYZ>."
>
> We also received feedback from some developers who expressed a feeling that a tool like ConE may not necessarily be useful for their scenarios:
>
> "For me no, I generally have context on all other ongoing PRs and work that might cause merge issues. No, thank you!"
>
> "For my team and the repositories that I work in, I don't think the benefit would be that great. I can see where it could be useful in some cases though."
>
> "It's not helpful for my specific change, but don't let that discourage you. I can see how something like ConE be definitely useful for repositories like <XYZ>, which has a lot of common code."

> Another interesting case we noticed is ConE's ability to help in detecting duplication of work. ConE notified a developer (D1) about an active pull request authored by another developer (D2). After the ConE notification was sent to D1, they realized that D2's pull request is already solving the same problem and D2 made more progress. D1 ended up abandoning their pull request and pushed several code changes in D2's pull request, which was eventually completed and merged. When we reached out to D1, they said:
>
> "Due to poor communication/project planning D2 and I ended up working on the same work item. Even if I was not notified about this situation, I would have eventually learned about it, but that would have costed me so much time. This is great!"
>
> Though we do not observe scenarios like this frequently, this case demonstrates an example of the kind of potential conflicts ConE can surface, in addition to flagging syntactic conflicts.

## 6.5 Factors Affecting ConE Appreciation

After analyzing all the responses from our interviews, analyzing the pull requests on which we received "Won't Fix" and interviewing respective pull request authors, we identified the following main factors as to what makes a developer incline toward using a system like ConE.

### Developers who found the ConE notifications useful:
These are the developers who typically work on large services with distributed development teams across multiple organizations, geographies and time zones. They also tend to work on core platforms or common infrastructure (as opposed to the ones who make changes to the specific components of the product or service). To corroborate this, the first author classified the repositories into large and small manually, based on the size and the activity volume in those repositories. We then, programmatically, categorized the 628 responses based on their repository sizes. The results (in Table 7) show that for large repositories developers are positive for 77.69% (404/520) of the cases, whereas for small repositories this is 58.82% (150/255).

### Developers who found ConE not so useful:
These developers are the ones who work on small microservices or small scale products and typically work in smaller teams. These developers, and their teams, tend to have delineated responsibilities. They usually have more control over who