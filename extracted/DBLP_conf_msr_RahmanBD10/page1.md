## Clones: What is that Smell?

Foyzur Rahman, Christian Bird, Premkumar Devanbu  
Department of Computer Science  
University of California, Davis  
Davis, California, USA  
{mfrahman,cabird,ptdevanbu}@ucdavis.edu

> Abstract—Clones are generally considered bad programming practice in software engineering folklore. They are identified as a bad smell and a major contributor to project maintenance difficulties. Clones inherently cause code bloat, thus increasing project size and maintenance costs. In this work, we try to validate the conventional wisdom empirically to see whether cloning makes code more defect prone.
> 
> This paper analyses the relationship between cloning and defect proneness. We find that, first, the great majority of bugs are not significantly associated with clones. Second, we find that clones may be less defect prone than non-cloned code. Finally, we find little evidence that clones with more copies are actually more error prone. Our findings do not support the claim that clones are really a “bad smell”. Perhaps we can clone, and breathe easy, at the same time.

Keywords—software clone; empirical software engineering; software maintenance; software evolution;

## I. INTRODUCTION

The software life cycle comprises two major parts; first we define the specification and implement it; then, we need to maintain the finished product and evolve it to better suit user needs. For most other industries, development cost is the major factor in a project’s lifetime cost. However for software development it has been found that maintenance and evolution are also critical activities from the cost perspective and might comprise up to 80% of the overall cost and effort [1]. Researchers have long sought to ameliorate maintenance costs. There have been quite a bit of work on improving process models, tool support, language support, etc., to improve development process and reduce bad attributes of code which might negatively impact maintenance cost. Often, however, poor maintainability can be traced back to poor code which is difficult to understand, modify or more error prone. For a taxonomy of bad code attributes refer to [2], [3].

Fowler [2] suggests that code duplication or cloning is a bad smell and thus one of the major indicators of poor maintainability. Cloning is an easy, tempting alternative to the hard work of actually refactoring the code. Unfortunately, if a piece of code is buggy or has a latent bug, then a clone can replicate a bug silently. To aggravate the situation, cloning is often performed hastily and without much care about the context. This could mean that even bug-free code could

become buggy after cloning [4]. Furthermore, developers often copy others’ code without fully understanding it. This introduces another classic fault proneness through poorly understood code. For these reasons, clones have been vilified for many years and a considerable body of research work has been devoted to automatically find clones; some even try to automatically refactor them [5], [6], [7].

At the same time, another body of research presents evidence that clones improve productivity and they may not be as bad as some claim. Kim et al. [8] argued that aggressive refactoring is not worth the effort, as most clones are short lived. Also, they suggested that long lived clones may not be refactorable due to language limitations. Kasper and Godfrey [9] presented evidence that clones are made deliberately and improves developer productivity. Thummalapenta et al. assert that developers are actually quite capable of remembering and updating clones consistently whenever required, even when they reside in very different parts of the system [10]. However, prior research has not tried to establish a direct relation between end product quality and cloning. We take the view that product quality is a major barometer of product success and if clones have much impact on product quality, we claim it a serious disadvantage for cloning proponents. One good approximation of product quality is the number of defects found in the product. More defects could make a system unusable and make its users unhappy. In this paper we try to assess clones’ impact on defect occurrence of software products.

Considering the entire population of bugs, it would be interesting to determine how many of these are associated with cloned content. Do clones contribute a very small proportion of bugs, or the vast majority? This gives us an indication of how important clones are in overall project quality.

RQ1: To what extent does cloned code contribute to bugs?

Next, we examine the converse question. Considering the code implicated in defect repair (“buggy code”). Are clones unduly over-represented in this code? If buggy code contains a lot of clones, then this suggests that we’d do well to refactor out clones, or at least inspect all the clone code.

RQ2: Do clones occur more often in buggy code than