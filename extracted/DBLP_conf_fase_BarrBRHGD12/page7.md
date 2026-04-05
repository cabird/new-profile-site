occurs along this timeline, bounds the work needed to avoid conflict or recover from interruption. This work was previously largely unobservable (apart from mutterings in mailing lists/interviews/change-log messages), handled by policies and procedures such as baton passing and patch rework on a project's mailing list [32]. To measure the cohesion (§4.2) and isolation (§4.3) of branches, we compare the cohesion and isolation of their within-branch changes against that of across-branch changes, in the form of simulated branches drawn from D.

## 4.1 Rapid DVC Adoption

Pundits claim that support for distributed (changeset flows unmediated by a central repository), as opposed to centralized, development is the root cause of this rapid transition [23,8]. We have observed something different. The vast majority of these projects do not appear to be making use of distribution. Of the sixty projects whose VC use we examined, all but Linux continue to use a centralized model organized around a single public repository, except the xemacs and gnome projects which publish two repositories. Although these projects continue to use a centralized style of development, we have observed a dramatic shift in their use of branches.

Lead developers from prominent open source projects (§3) indicated that, prior to using DVC, branches were "painful and difficult" to integrate:

> "The biggest complaint associated with Subversion is associated with branching and merging. The one feature that Git has that our users would really like is a really fast and simple merge."

Richards, CEO WANdisco [14]

In some cases, two branches would grow so far apart, they had to abandon one of them altogether. Prior to DVC, branches were typically created only for releases and not new features. For instance, Koziarski from Ruby on Rails states: "We had branches for versions [releases]. Feature branches were very rare for us" [20]. A preliminary empirical investigation showed that few branches were created pre-DVC. Of the examined 60 projects that switched to DVC, 1.54 branches were created on average per month per project before using DVC; after switching to DVC, the average rose to 3.67. A Wilcoxon rank-sum test shows that the two populations are statistically different (9) (p < 0.01).

Without easy branch and merging facilities, our interviewees reported that developers would "pass around large patch sets" or "brain dump" a mega-patch that was almost impossible to review. These large patch sets contained multiple, sometimes unrelated changes, and it was impossible to "consider each on their own merits without having to swallow the whole thing" (Turnbull, XEmacs [27]). This problem was compounded for new developers who did not have commit access and so could not work and commit incremental work in the course of making large changes. Under CVC, developers without commit privileges, as well as core developers who refused to use "painful" (Sperber, XEmacs [21]) feature branches were effectively reduced to working in a time before version control.

9. A Wilcoxon test was used rather than the standard t test due to the heavily skewed distribution of branches.