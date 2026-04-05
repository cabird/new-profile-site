## The Uniqueness of Changes: Characteristics and Applications

Baishakhi Ray · Meiyappan Nagappan · Christian Bird, Nachiappan Nagappan, Thomas Zimmermann  
bairay@ucdavis.edu · mei@se.rit.edu · {cbird, nachin, tzimmer}@microsoft.com  
Univ. of California, Davis · Rochester Institute of Technology · Microsoft Research, Redmond

## Abstract

Abstract—Changes in software development come in many forms. Some changes are frequent, idiomatic, or repetitive (e.g. adding checks for nulls or logging important values) while others are unique. We hypothesize that unique changes are different from the more common similar (or non-unique) changes in important ways; they may require more expertise or represent code that is more complex or prone to mistakes. As such, these unique changes are worthy of study. In this paper, we present a definition of unique changes and provide a method for identifying them in software project history. Based on the results of applying our technique on the Linux kernel and two large projects at Microsoft, we present an empirical study of unique changes. We explore how prevalent unique changes are and investigate where they occur along the architecture of the project. We further investigate developers’ contribution towards uniqueness of changes. We also describe potential applications of leveraging the uniqueness of change and implement two of those applications, evaluating the risk of changes based on uniqueness and providing change recommendations for non-unique changes.

## I. INTRODUCTION

Creating software is a lot like constructing buildings. When we make changes to buildings, some changes are more repetitive than others. For example, a typical kitchen remodeling project might introduce the same marble tops and same colors found in many kitchens, while keeping other elements such as table lamps and chairs distinct. Note that, a "typical change" may also evolve over time: the 1950s saw colorful kitchens (sometimes pink) while in the 1970s colors got more serious, and the 1980s introduced more bright colors. Appliances are another example of a typical renovation: they often get replaced with the latest models in a remodeling project. However not all changes to buildings are similar or repetitive. A billionaire might have expensive taste that requires many unique changes to a kitchen.

The concept of uniqueness is not new to software engineering: Gabel and Su [8] and Hindle et al. [12] showed that source code is in general repetitive and predictable in nature. In this paper, we wanted to see whether the same theory can be applied for software changes as well. In particular, we check when developers modify an existing piece of code, whether they change it in a unique way or they follow some repetitive (or non-unique) pattern. To do that, we first introduce a methodology to identify unique/non-unique changes to a software based on lexical and syntactic matching of changes. Then, using two Microsoft projects and the Linux Kernel 3.0, we ask the following questions:

- RQ1. What is the extent of unique changes? On average, 75%, 83%, and 87% changes are unique in the two Microsoft projects and Linux respectively.

> - RQ2. Who introduces unique changes? In general, all developers commit unique changes; on average, 57% to 94% of the total contribution of a developer is unique in Microsoft and Linux. Each developer has her own set of change templates. While introducing non-unique changes, developers often reuse these templates.
> - RQ3. Where do unique changes take place? Certain subsystems of a project are more prone to unique changes. For example, in the module fs/jbd, the Linux journal base file-system module, 97% changes are unique, while in the module sound/drivers in Linux, 94% of total changes are non-unique. Also, developers introduce non-unique changes to the same file—66% of the non-unique changes take place in the same file.
>
> Knowing which changes are unique and which changes are non-unique has several possible applications in software engineering:
>
> - Risk analysis: One would expect that changes that are unique are more error prone than changes that developers repeatedly make (non-unique changes). We provide empirical evidence to support this statement in our paper.
> - Code reviews: If non-unique changes are recognized in a code review, then the developers who introduced the same change earlier can be involved in the code review process. Conversely, unique changes could be highlighted to guarantee that they are carefully reviewed.
> - Recommendation systems: non-unique changes can be used as input for recommendation systems: for example, to recommend how a line would typically be changed or after some change has been made, recommend other non-unique changes that are typically made with the initial change based on past co-occurrence (change completion).
> - Automated program repair: We expect that non-unique changes in bug fixes are better candidates for automated program repair operations than unique changes. Nguyen et al. [28] provided initial empirical evidence for this hypothesis. They found that non-unique bug fixes are usually smaller changes and therefore automated patching tools could start with small changes and gradually compose them.
>
> To demonstrate the usefulness of change uniqueness, we implement a risk analyzer and two recommendation systems. Based on bug history, our risk analyzer can evaluate how risky a unique/non-unique change is. An evaluation on our data shows that non-unique changes are in general less risky. By