![Bar chart of survey results related to transition barriers and outcomes](page5_img_1.png)

Figure 5: Survey results related to transition barriers and outcomes (colored). These questions were answered by 57 participants, who have used a B/DVCS at Microsoft. 58% of the participants note the learning curve with B/DVCSs. 61% of the participants do not believe that B/DVCSs are missing important features. Participants have mixed feelings (46% agree, 41% disagree) on whether B/DVCSs are not integrated well with the development workflow. Only 39% of the participants agree that their product scales to B/DVCSs by default whereas the agreement increases to 62% if the participants are permitted to do an initial setup. More than 95% of the participants agree that B/DVCSs let them work more efficiently using local commits and lightweight branches.

For developers in large companies, every step of development is important until the code is shipped in a product. The actual development benefits a lot from a VCS, however there are other important stages, too. For example, the developers need to test the implementation, do code reviews, and interact with other developers before the code is shipped. Some of these steps require additional tooling, such as VCS integration with quality gates or code reviews.

CVCSs at Microsoft are integrated very tightly and seamlessly with the whole development process – from implementation to shipping. There are teams whose main responsibility is to create and maintain CVCS integration tools. When a developer uses a CVCS, all stages of the development workflow just work. However, the same cannot be said for some BVCSs, yet. Some BVCSs are maintained only by a sub-team and are integrated to the particular development flow of that sub-team, which might be different from the other teams. Therefore, if a developer from another team wants to use this BVCS, they might need to sacrifice existing tooling for the integration of the remaining development workflow, and might be forced to do these steps manually. For example, some BVCSs are not integrated with the Check-in Wizard. For some teams, it is required to commit the code through the Check-in Wizard, which means that the developers who use such BVCSs cannot commit their changes directly from the BVCSs. Consequently, these developers create a patch for the changes so far, apply this patch to and check-in from another CVCS repository. In other words, the development is done on Git, however the code is checked-in through CVCS manually.

> I cannot use [BVCS] to check-in changes to [the CVCS],  
> because we use Check-in Wizard, and [BVCS] does not  
> support it. I create [a patch] and apply it on a [CVCS]  
> repository to check-in.

Using existing mature open-source BVCSs does not solve the tooling problem. The open-source BVCSs have no knowledge of the internal development workflows and additional tools used by Microsoft. The BVCSs have a huge potential for bringing DVCS concepts to developers without changing the product development workflow drastically. However, to accomplish this task, we believe that BVCSs need to be integrated not only to the underlying VCSs they bridge together, but also to the surrounding tools that are required in other stages of the development process. All developers we interviewed felt that the BVCSs in Microsoft were missing important features and external tool support, which makes it too early to suggest for a team wise adoption.

## 5.3 SCALING

At Microsoft, there are products with large codebases that have been developed for more than a decade. DVCSs check-out the complete history – all source code and every change that has happened – to every development machine by default. For a product that is tens of GBs in size and has been developed for many years, using a DVCS can cause scaling problems. This section focuses on three main causes of the scaling problems: (1) checked-in, large binaries, (2) composite products, and (3) long development history. Only 39% of the survey participants agree that their product scales to B/DVCSs by default whereas the agreement increases to 62% after an initial setup (see Figure 5).

### (i) Checked-in large binaries

One of the major causes of the scaling problem is the large binaries checked-in to the VCS. Ten survey participants believe that DVCS scaling can be achieved if the binary dependencies were not checked-in to the VCS. VCSs only record the change with respect to the latest version in the history. Therefore, for text files, the overhead for recording these deltas is very low. However, when developers check-in large binary files, and update these files with the new versions, the VCS has to record multiple versions of that binary. Deleting the previous versions does not help since the VCS has to keep the previous versions just in case the developer needs to access the previous versions in the future. For CVCSs, where each developer only checks-out the latest version, large binaries do not cause a scaling issue from the developer’s perspective. However, for DVCSs, developers need to check-out the whole history, which might cause the developers to experience the overhead.

At Microsoft, developers check-in binaries to the VCS so that the product contains all external dependencies – from the compiler the product uses to the external libraries the product depends on – for builds and tests, immediately after a developer checks-out the product. This workflow is convenient for the developers as they do not do any product-specific setup. A developer confirms this observation, but questions whether the binaries really belong in the VCS:

> At Microsoft, the entire tool chain [is] in the repository.  
> This is very useful because [the developer] has all de-  
> pendencies. However, I wonder if [those dependencies]  
> really belong to the VCS? It might be better to configure  
> and version the dependency without checking it in.

### (ii) Composite products

Another cause for DVCS scaling problem is large composite products. Seven survey participants agree