> Promise 8: Git is faster and often uses less space than centralized repositories.

Git is designed to handle a code base the size of Linux and manage a high volume of contributions. Since the metadata is on the local machine, accessing a log or a diff executes locally, with no network latency. Also, git stores full (compressed) versions of files, rather than a sequence of diffs. This means that checking out a file is a constant-time operation, regardless of history.

We converted the entire Eclipse CVS repository to git format and noticed that log access and checkouts were much faster. Checking out commits in an arbitrary (non-consecutive) order with git took 1–2 minutes per commit compared to 7–25 minutes with CVS. Checking out consecutive commits took 0.5–0.8 seconds per commit with git, compared to 1–3 minutes with CVS with the repository and working copy on our server. This makes some forms of analysis that were painful before, feasible.

Despite the design choice to store revisions in their entirety, git’s wholistic compression strategy uses much less space than CVS or SVN. The entire Mozilla repository weighs in at 12 GB when stored in SVN. However, when the repository was imported into git, that shrunk to 420 MB [24]. We found that the Eclipse CVS repository uses 8.6 GB, compared to 3.3 GB for git. The python community found that converting from SVN to git reduced disk usage from 1.3 GB to 150 MB [25].

> Promise 9: Most SCMs such as CVS, SVN, Perforce, and Mercurial (Hg), can be converted to git with the history of branches, merges and tags intact.

Due to git’s popularity over the past few years, the development community surrounding it has developed a number of tools for migration to git from most popular SCMs. Many of these tools are still actively being developed and are part of the official git distribution. For instance, there are a number of git svn commands that act as a bidirectional gateway between an SVN repository and local git repository. We have successfully converted the entire Eclipse CVS repository to git complete with tags and branches. We have also imported the NetBeans and Mozilla-Central’s Mercurial (Hg) repositories to git as well as numerous other SVN repositories. By being able to convert nearly all repositories to git format, we have been able to reap some of the benefits of git, such as better origin detection, performance, and local copies of all information. In addition, we only need to write mining and analysis tools for one format rather than many.

3. See http://git.or.cz/gitwiki/InterfacesFrontendsAndTools for complete list.

### Distinct Authors by Month in Ruby on Rails

![Distinct authors by month graph](page8_img_1.png)

Figure 10. Authors per month for Ruby on Rails as reported by the repository logs. The blue dot indicates the date at which Rails migrated to git.

## 5. Analysis

Promise 5 claims that the information recorded and the workflow enabled by git allows more accurate author analysis. To examine this claim, we extracted data from a project that had used both SVN and git for measurable periods of time and compared author information. Figure 10 shows the number of distinct authors by month who contributed changes to the repository of the Ruby on Rails project. The dot on the graph indicates when the project migrated to git. While it is possible that the move to git caused a dramatic jump in the number of contributors, it seems more likely that the jump is due to git’s superior facilities for tracking authorship.

As per Peril 6, log messages in git record sources of merges. While one can heuristically recover merge information from logs, it may be incomplete. We empirically examined the recall of these heuristics by mining data from 30 OSS projects that use git listed at http://git.or.cz/gitwiki/GitProjects ranging in size from 9 authors (disco) to over one thousand (wine) and containing up to 139,187 commits (samba). In cases where projects migrated from another SCM, and git imported the history, we examined just the merges created after the transition to git. In all, there were 2,971 merges (i.e. commits with more than one parent). We ignored undetectable fast forward merges, or merges flattened due to rebasing. Our heuristics were able to detect the source of the merge in 2,909 of the cases, yielding a recall of 97.9%. This seems well within an acceptable range for most uses. However, researchers should perform similar analyses when interpreting and reporting results based on sources of merges.

We hypothesized that the use of git may affect workflow patterns and that developers make smaller and more frequent commits after a project switches to git from a centralized