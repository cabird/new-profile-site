The motivation behind labelling topics is that they are time consuming to interpret and are faster to reason about if labelled. Furthermore we wished to compare our labels to those of domain experts (the relevant developers).

### 3.3 Version Control Mining

To correlate topics and development activity we extracted the change log messages from 650,000 version control system commits of a popular Microsoft product. We had approximately 10 years' worth of commits from more than 4,000 unique authors. Our properties per commit consisted of user name, machine name, branch name and the change description (also known as the commit log message).

For the FLOSS projects we had to mine a variety of projects listed in Table 1. Note that Table 1 names the FLOSS participants directly because those participants chose to self-identify; they were given the choice of anonymity, project-level anonymity, or full identity with attribution. All of the FLOSS participants chose full identity with attribution. Those on Google Code tended to use SVN so we used git-svn 2 to convert SVN to Git. Git repositories were processed using a custom script, git-grep.pl 3 that extracted the commits into a common JSON 4 format.

### 3.4 Issue Tracker Topic Mining

We mined issue trackers of both GitHub 5 and Google Code 6 using our own issue tracker mining programs.

We extracted their issues and the comments associated with the issues and converted them into a custom, but common schema in a JSON format.

To extract LDA topics from issues extracted from Google Code or GitHub we followed much of the same methodology in Section 3.2.

Much like in Section 3.2 we removed stop words from the texts (for the stop words used please see Footnote 1 in Section 3.2). We were not able to use the same stemmer for this system so we did not stem the issues at all. There was no identifier splitting applied either. Also the texts were composed of the author, owner, subject and bodies of an entire issue, joined into a single document concatenated with the author and comment bodies of the associated issue comments (the discussion of the issue in the issue tracker). This is because the requirements contained similar information about authorship in-lined in

2 git-svn man page: https://www.kernel.org/pub/software/scm/git/docs/git-svn.html  
3 git-grep.pl is located here: https://github.com/abramhindle/gh-lda-extractor  
4 JSON Definition: http://JSON.org  
5 GitHub Issue Extractor: https://github.com/abramhindle/github-issues-to-json  
6 Google Code Issue Extractor: https://github.com/abramhindle/google-code-bug-tracker-downloader