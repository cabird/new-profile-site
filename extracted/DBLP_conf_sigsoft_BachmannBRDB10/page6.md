### Table 2: Linkster Commit Categorization (non-exclusive)

| Category | Sub-Category | #Commits |
| --- | --- | --- |
| Bug fix | – | 82 |
| Bug fix | Bug report | 32 |
| Bug fix | Bug report (merge) | 7 |
| Bug fix | Mailing list | 13 |
| Bug fix | Backport | 13 |
| Bug fix | Other | 17 |
| Feature request | – | 54 |
| Feature request | Documentation | 7 |
| Feature request | Backport | 14 |
| Feature request | Other | 33 |
| Maintenance | – | 49 |
| Maintenance | Documentation | 5 |
| Maintenance | Backport | 5 |
| Maintenance | Other | 39 |
| Other | – | 356 |
| Other | Documentation | 156 |
| Other | Backport | 49 |
| Other | Non-functional | 30 |
| Other | Release | 44 |
| Other | Voting | 26 |
| Other | Other | 51 |

Based on Justin’s insights into the Apache development process, we developed a second, orthogonal categorization that was more consistent with the procedures within the project (Table 3). In contrast to our categorization, this one assigns each commit exclusively to one of its process-specific categories: backport/forward port, security fix, bug fix, documentation, voting, release, or other.

### Table 3: Process Specific Commit Categorization (exclusive)

| Category | #Commits |
| --- | ---: |
| Backport / Forward port | 79 |
| Security fix | 7 |
| Bug fix | 69 |
| Documentation | 158 |
| Voting | 26 |
| Release | 44 |
| Other | 110 |

In the following sub-sections, we present our findings relative to the research questions presented in Section 1. We also present additional findings based on interviews with Justin.

### 6.1 Bugs Incognito

Contrary to conventional wisdom, participants of the Apache project do not report all the bugs solely through BugZilla. We found that developers and professional users also make use of the Apache mailing list to report bugs and provide bug fixes (sometimes at the same time) without reporting them in the bug tracker.

> Finding 1. Not all fixed bugs are mentioned in the bug tracking database. Some are discussed (only) on the mailing list.

As shown in Table 2, we have 82 bug-fix related commits in our evaluation dataset. 32 of them (bug report) are directly related to the bug tracking database. 7 other commits contain a bug-fix, but are not the initial bug fix commit; rather they are a merge of versions which contain bug fixes indirectly (bug report (merge)). This means that only 47.6% of bug-fix related commits (32 + 7 = 39 of 82) are documented in the bug tracking database. For 13 other commits (16% of total) identified by Justin as bug fixes, there are related discussions in the Apache mailing list. This leads to the discouraging observation that many bugs never appear in the bug tracking database, but rather are only discussed on the mailing list. Such a discussion often includes the bug fix provided by a non-Apache core developer. According to Justin, these bugs are often the very important bugs especially because of the high attention by Apache developers and the core community on the mailing list. Note also that reporting some types of bugs (e.g., security related ones) on the mailing list is a practice explicitly requested by the Apache Foundation6.

Unfortunately, even knowing about the mailing list bugs, it is hard to i) identify and ii) automatically mine them or extract information similar to a bug report stored in the bug tracking database (such as status changes, priority, severity, etc.). Apache SVN revision #291558 (see Figure 2), for instance, is related to a bug discussed on the mailing list7. If one were to inspect the mailing list message, one would find almost no evidence that this was a bug fix.

Finally, Justin found 17 other bug-fixing commits (21%) which have neither an associated bug report or mailing list message. This phenomenon, of under-reporting of bugs, is a big problem. If important bugs are excluded from experimental data (i.e., many bugs are left out) then the effectiveness of defect prediction models and the validity of statistical studies (which rely on them being in the bug tracking database) may be threatened. This leads to the conclusion that not all fixed bugs are reported as bugs in the bug tracking database, or in other words: bugs go “incognito”.

### 6.2 Backport Incognito

In the Apache HTTP Web Server project only a few developers are allowed to commit to an Apache release version: thus a bug-fix on one release may actually have to be committed by someone else to an older or different release. Typically, this process works as follows. First, a developer fixes a given bug and commits the new version to the current version under active development (also known as the “trunk”). Ideally s/he also refers to the related bug report in the commit log. Next, at least two other developers review the changed code, verify the changes and vote either for or against the fix (this step is related to the voting commits as shown in Table 2 and 3). Finally, if the votes are positive, the fix is committed (or merged) to Apache release versions, which is called a backport. As a result of this process, we might find several different commits in the version history that fix the same bug.

> Finding 2. To fix a bug in an Apache release, multiple similar commits by different developers are needed.

Unfortunately, backport commits are not that easy to identify by existing linking algorithms and heuristics; frequently, while the log message for the original commit to the trunk refers to the bug report, the backport commit log does not. To worsen matters, after the bug is actually closed,

6 See http://httpd.apache.org/security_report.html  
7 See http://mail-archives.apache.org/mod_mbox/httpd-docs/200509.mbox/%3c200509260627.33737@news.perlig.de%3e