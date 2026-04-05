# Program Merge Conflict Resolution via Neural Transformers

Alexey Svyatkovskiy — Microsoft, Redmond, WA, USA  
Sarah Fakhoury — Washington State University, Pullman, WA, USA  
Negar Ghorbani — UC Irvine, Irvine, CA, USA

Todd Mytkowicz — Microsoft Research, Redmond, WA, USA  
Elizabeth Dinella — University of Pennsylvania, Philadelphia, PA, USA  
Christian Bird — Microsoft Research, Redmond, WA, USA

Jinu Jang — Microsoft, Redmond, WA, USA  
Neel Sundaresan — Microsoft, Redmond, WA, USA  
Shuvendu K. Lahiri — Microsoft Research, Redmond, WA, USA

## ABSTRACT

Collaborative software development is an integral part of the modern software development life cycle, essential to the success of large-scale software projects. When multiple developers make concurrent changes around the same lines of code, a merge conflict may occur. Such conflicts stall pull requests and continuous integration pipelines for hours to several days, seriously hurting developer productivity.

To address this problem, we introduce MergeBERT, a novel neural program merge framework based on token-level three-way differencing and a transformer encoder model. By exploiting the restricted nature of merge conflict resolutions, we reformulate the task of generating the resolution sequence as a classification task over a set of primitive merge patterns extracted from real-world merge commit data. Our model achieves 63–68% accuracy for merge resolution synthesis, yielding nearly a 3× performance improvement over existing semi-structured, and 2× improvement over neural program merge tools.

Finally, we demonstrate that MergeBERT is sufficiently flexible to work with source code files in Java, JavaScript, TypeScript, and C# programming languages. To measure the practical use of MergeBERT, we conduct a user study to evaluate MergeBERT suggestions with 25 developers from large OSS projects on 122 real-world conflicts they encountered. Results suggest that in practice, MergeBERT resolutions would be accepted at a higher rate than estimated by automatic metrics for precision and accuracy. Additionally, we use participant feedback to identify future avenues for improvement of MergeBERT.

> KEYWORDS  
> Software evolution, program merge, ml4code
>
> ACM Reference Format:  
> Alexey Svyatkovskiy, Sarah Fakhoury, Negar Ghorbani, Todd Mytkowicz, Elizabeth Dinella, Christian Bird, Jinu Jang, Neel Sundaresan, and Shuvendu K. Lahiri. 2022. Program Merge Conflict Resolution via Neural Transformers. In Proceedings of the 30th ACM Joint European Software Engineering Conference and Symposium on the Foundations of Software Engineering (ESEC/FSE ’22), November 14–18, 2022, Singapore, Singapore. ACM, New York, NY, USA, 12 pages. https://doi.org/10.1145/3540250.3549163

## 1 INTRODUCTION

Collaborative software development relies on version control systems such as git to manage and track changes across a codebase. In most projects, developers work primarily in a branch of a software repository, periodically synchronizing their code changes with the main branch via merges and pull requests [21]. When multiple developers make concurrent changes to the same line of code, a merge conflict may occur. Merge commits occur frequently, almost 12% of all commits are related to a merge [20], and up to 46% of those commits result in conflicts. Resolving merge conflicts is a time-consuming, complicated, and error-prone activity [6]. To resolve a conflict, developers must stop their workflow, understand conflicting changes, and identify a correct resolution. The ideal way to resolve a conflict is not always clear, and may require referring to project specification documentation or communicating with their peers about changes [6, 9, 13, 22, 33].

Modern version control systems such as git utilize the diff3 algorithm for performing unstructured line-based three-way merge of input files [42]. Thus, it is the de facto tool for merging and identifying merge conflicts in software development. This algorithm aligns the two-way diffs of two versions of the code, A and B, with the common base, O, into a sequence of diff “slots”. At each slot, a change from either A or B is selected. In cases where both A and B contain changes (relative to O) in the same slot (e.g., on the same line), there is a merge conflict. Standard merge algorithms cannot automatically determine the correct way to merge these conflicting changes. In these cases, developers must manually intervene in order to correctly resolve the conflicting code and complete the merge.

CCS CONCEPTS
- Software and its engineering → Software version control; Automatic programming.

Permission to make digital or hard copies of all or part of this work for personal or classroom use is granted without fee provided that copies are not made or distributed for profit or commercial advantage and that copies bear this notice and the full citation on the first page. Copyrights for components of this work owned by others than ACM must be honored. Abstracting with credit is permitted. To copy otherwise, or republish, to post on servers or to redistribute to lists, requires prior specific permission and/or a fee. Request permissions from permissions@acm.org.

ESEC/FSE ’22, November 14–18, 2022, Singapore, Singapore  
© 2022 Association for Computing Machinery.  
ACM ISBN 978-1-4503-9413-0/22/11...$15.00  
https://doi.org/10.1145/3540250.3549163