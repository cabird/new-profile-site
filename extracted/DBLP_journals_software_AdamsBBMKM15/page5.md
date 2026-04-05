give developers the responsibility not only to land code but also to make sure that it actually works in production and that the customer is happy, they become more aware of the whole pipeline of moving software from development to the customer. And if something does not work, developers are involved with backing it out and writing patches to fix it.

Debic: If I need to describe release engineering to colleagues who do not know my work from firsthand interactions, I tell them that release engineering is the difference between manufacturing software in small teams or startups and manufacturing software in an industrial way that is repeatable, gives predictable results, and scales well. These industrial-style practices not only contribute to the growth of a company but also are key factors in enabling growth.

A release engineer has a special mind-set. We look at everything that is going on in a tech company, and we try to industrialize the process. Where others see features, we see release challenges. Where others count change lists, we count how long it took for it in the world. My wife makes fun of me because I come home and tell her, “Oh, you know, Sylvia, three recruiters contacted me today. I’m thinking I’m hot stuff.” And she says, “Yes, I told you no one wants to do what you do.”

There’s a conception that release engineering is nasty work. When I started doing this, my first job was with IBM in 1988. I worked on the release of an integration of two operating systems. This is really complex—a huge software project with two massive things that intersect, and it has to be reproducible, repeatable, and testable. No one gets this exposure until they’re dropped in the middle of it and have to react to it. And you’ll find many good release engineers who are release engineers now because they started in a company where no one would do it. That’s traditionally how people have fallen into this role.

I don’t think you have to make the value proposition to any company of why you want someone doing release engineering, especially since there has been movement in the continuous-integration and continuous-delivery to as a discipline. Given this limitation, how do you find good release engineers to hire? Should curricula change to include these skills? If so, what courses would be essential?

Debic: This is a very good question. Release engineering is not taught; it’s often not even mentioned in courses where it should be mentioned. I think the main reason is that the release-engineering practice itself has been hard to define. As you see from the answers of your other guests, the approaches are quite diverse in nature and scope.

But perhaps we should not have skills-based curricula for release engineering anyway. At Google, release engineers are software engineers; there is no difference. The complexity of work they do and the tools they use are the same as for product engineers. Certain establishments treat release engineers and quality assurance engineers differently, but this is a short-sighted strategy, and my company is proof that the opposite works better.

Rossi: I’ve spent some time trying to work through this both at the university level to get the curriculum lined up and at a personal level. One of my biggest hiring concerns is that I need to hire release engineers. It’s like finding unicorns. I look for a strong technical background and experience with programming on either the product side or the infrastructure side. I want utilitarian programmers and people who get stuff done in the realm of system administration or tool writers. I don’t need top-notch C++ programmers or people concerned with the delicacies of optimizing C algorithms.

The next thing I want is architecture knowledge. I want people to RE

> If you can’t build, we can’t ship.
> And if we can’t ship, we don’t get paid.

change from the time it was submitted until the time it was in front of the customer. While others add people to a project, we look at how the added complexity will affect it.

Rossi: I’ve always maintained that if you’re a good release engineer, you can work for any software company

worlds in the past. I’ve talked to small startups, and generally it’s not one of the first things they’re worried about. But once they start to grow, they begin to look for a person to do release work.

Universities and colleges don’t explicitly teach release engineering.

46 IEEE SOFTWARE | WWW.COMPUTER.ORG/SOFTWARE | @IEEESOFTWARE