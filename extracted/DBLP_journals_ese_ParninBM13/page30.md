## 8 Limitations

There are several threats to validity in this study.

> _External Validity._ The projects we have sampled are all open-source projects, and they may not be representative of all software development projects. For example, certain industries, such as the defense industry, have stricter standards and slower timelines in supporting new versions of software, such as language runtimes, which may amplify or alter the conclusions of the study.  
>  
> Even within open-source projects, the number of projects and the type of categories we have selected from may not be sufficient to draw conclusions for all open-source projects. Although the data we have examined has highlighted several significant results, future research should confirm these findings at a larger scale within the open-source community.

> _General Validity._ The conclusions of this study are particular to adoption of language features in Java and may not hold for other languages. For example, a parallel adoption story of generics exists in C# — generics were also introduced in a new version of the language; however, subtle differences in the design and deployment of C# generics may have resulted in a different adoption story.  
>  
> Further, the conclusions about the language features we have examined — Java generics and annotations — may not extend to other newly introduced language features such as Java closures. Future research needs to draw parallels between differences in adoption of language features and channel differences as insight into future design of language features.

> _Construct Validity._ Several conclusions in our study rely on complex analysis techniques. Limitations in those analysis techniques may have caused some results to be underestimated. For example, the migration analysis relies on the assumption that a raw type is migrated to a generic type if the fully qualified name of the method remains the same across revisions. This assumption may fail to count migrations that occurred during structural changes such as a file or signature rename. Note that this assumption is not used for the other analyses, which tracks features at a project-wide level per revision.  
>  
> In other cases, an analysis may only offer one perspective on the data when multiple perspectives might be needed. For example, one limitation of the cast analysis is that it is coarse-grained, examining the general relationship of casts and generics. However, the analysis is not sufficient for understanding why that relationship exists. In future work, a more fine-grained analysis can identify individual casts that were removed due to introductions of generic functionality and compare that with other contexts for removal.

## 9 Discussion and Future Work

Overall, we were surprised by several of our findings about generics, which are at odds with our initial hypotheses. For instance, we were surprised that over half of