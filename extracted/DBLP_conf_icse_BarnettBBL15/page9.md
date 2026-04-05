## VI. DISCUSSION

We were pleasantly surprised that using the def-use and the use-use relationship did not have any false positives: i.e., there were no diff-regions that were incorrectly included in a partition. During our manual investigations and the user study, there was never a case where a non-trivial partition should actually have been split into multiple partitions. In retrospect, this makes sense: the def-use relationship is a fundamental relationship within a program and the use of a compiler makes it extremely unlikely to be mis-identified.

A. Missed Relations

As expected, there were many false negatives: diff-regions which should have been included in a partition, but were not. We categorize them by the difficulty of using a static analysis to find them.

1) Easy: There are many relationships that we know about and that we could automatically detect but which were not used. For instance, we did not create a def-use relationship for the definition of an interface method and its implementation or for an override (in a subclass) of a virtual method in a base class.

We found many changesets that consisted of annotating a large number of methods with a particular custom attribute. Custom attributes are user-defined tags that can appear on program elements, such as types, methods, and fields. For instance, many test methods may be added, each tagged with the TestMethod attribute, so that the test framework can automatically discover them. However, since we ignored use-use relationships if the definition was not present in the changeset, we did not group such methods, resulting in numerous trivial partitions. Although in general it is difficult to properly distinguish definitions that do not get fully resolved, this is common enough to warrant special treatment.

Also, we restricted ourselves to analyzing only C# files. It would be trivial to include Visual Basic files since Roslyn also is the compiler for that. We could also add other languages, given parsers for them.

2) Medium: We used only the after-files for creating the partitions, which means that code deletions are not represented. Other use-use relationships besides those of custom attributes could be included as long as we do not conflate definitions that do not get fully resolved in the parsing.

Sometimes developers change names of entities to enforce a naming convention throughout the code; such changes do not share any semantic relationship. Clone detection [18] can be useful to identify relationships between such changes.

3) Hard: There are relationships due to the use of external tools and/or cross-language integration. For instance, there are XML files used as input to generate code: clearly the changed XML files should be grouped into the same partition as the code. XML files or other configuration files may indicate how to “connect” pieces of an application together at run time. While there is work on identifying cross-language dependencies [19], a multi-language analysis for the diverse set of languages and configuration formats that we encountered is beyond the scope of this work.

Code related by dynamic dependencies would be very difficult to analyze. For instance, many components use callbacks for two-way communication. That is, a component makes direct calls and also passes function pointers to allow the called component to call back into the calling component. This can be very difficult to precisely track, however some of these conventions can be heuristically recognized and added to our technique in the future.

Finally, there are always going to be changes that developers intend to be related, but which no static or dynamic analysis will ever find.

Adding a new relationship means that it is subject to the transitive closure of the partitioning algorithm. Alternatively, we found one particular strategy to address most of the developer’s concerns with the trivial partitions. We can post-process the set of trivial partitions to merge them into any existing non-trivial partitions — creating one if needed — within the same enclosing class.

### B. User involvement

It quickly became clear during the study that users would want to manually manipulate any proposed structuring as well as being able to tag or add a description to each partition. In fact, 6 developers mentioned this during the study. They also would like to have the partitions ordered so that the most important partition, the one with the “meat” of the change, would be first. Whenever any of these cannot be done automatically, the developers should be provided with the ability to do it manually.

### C. Threats to Validity

Clearly, our results are conditioned by several caveats. So far we have looked only at changesets from Microsoft. Even

the stack I was working on. So breaking things up into logical groups rather than just arbitrary directory order sounds like a big one for the reviewer. [P19]

In respect to CLUSTERCHANGES, two participants were unsure of its utility, one of them being the same participant (P13) who does not see any reason for a developer to commit unrelated changes. Nevertheless, she mentioned that the tool should allow developers to modify partitions, but “the tool should be 95% correct or else I would not use it because it would be annoying” [P13]. The other participant focused on criticizing GUI details of CLUSTERCHANGES. In particular, she mentioned she would like to see information on how we created partitions: “The UI does not tell me how you created the partitions. So, it is difficult for me to see its value” [P17].

The remaining 18 developers (including two that disagreed with our partitioning) were positive about using CLUSTERCHANGES in their next changeset. Three of them indicated that they would like to use CLUSTERCHANGES even before committing the code: “If I had a way to run this tool before I commit, I would have even considered splitting this partition into a second commit” [P4]. Three other developers asked for access to our prototype in order to use it for other changesets. One of them (P20) mentioned that we should contact another developer from her team because she has been committing several unrelated changes.