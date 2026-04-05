that aims to mine many forms of data from various OSS projects and use that data to understand how these projects work. We already have many of the tools in place for this form of detection and analysis. For each project under study, we have downloaded and analyzed the complete source code repository and the developer mailing lists. The results of the analysis, stored in a database system, contain information such as who made changes to what files in the repository or what messages were sent on a particular date. With the full text of every message sent and every file ever checked into the repository, we are ready to begin the process of detecting submitted patches and determining which of them were accepted and applied. In the OSS world, a patch file usually represents a number of changes to be applied to multiple files within a codebase. For each file, there is a series of contiguous changes called patch hunks. For our purposes, we divide these multi-file patches into individual patches, one per file needing modification. Thus, if a contributor posts a message that contains a patch modifying two files, we treat these as two separate patches. Without loss of information this allows us to examine patch acceptance at a finer level of granularity.

### 3.1 Patch Submission Detection

The developer mailing list(s) is, in most projects, the prescribed medium by which patches are submitted for review and application to the repository. Therefore, the first step of detecting patch submissions and extracting the bodies of those patches for use later includes analysis of the full text of the messages posted on this mailing list.

Patches are created by running the diff utility on original and modified versions of the same file or files. Thus, although there are multiple formats for patches (e.g. unified, context, etc), the number of forms is limited and easily recognizable.

For purposes of illustration, below is a “patch offering” from mailing list participant Mark Bixby suggesting a modification to the “configure” file in apache 1.3.10 after testing a recent change on the MPE/iX architecture.

```
From: Mark Bixby <mark_bixby@hp.com>
Subject: RE: Test the baby...
Date: 2000-01-17 14:34:28-08

Looks good on MPE/iX, except for some minor configure breakage.
Could somebody please apply this patch for me?

Thanks!
- Mark B.

--- apache_1.3.10/configure Tue Jan 11 11:47:42 2000
+++ apache_1.3.10_m/configure Mon Jan 17 13:55:58 2000
@@ -339,6 +339,10 @@
iflags_program="${iflags_program} -e .exe"
iflags_core="${iflags_core} -e .exe"
;;
+ *MPE/iX* )
+ default_layout="Apache"
+ iflags_program="-m 755"
+ ;;
*)
default_layout="Apache"
@@ -357,9 +361,6 @@
set -- --with-layout="$default_layout" "$@"
fi
;;
- *MPE/iX* )
- iflags_program="-m 755"
- ;;
esac
```

We use a series of regular expressions to detect any known forms of headers in the bodies of all messages from the mailing lists. The headers indicate the form of the patch, the name of the file being patched, and the path to the file in the repository (though the last is not always accurate).

We dealt with two issues when detecting and extracting patches from the messages. First, since the body of the patch is embedded within the normal text of the message, it is difficult to determine where the patch actually ends. This is partially overcome by using the line counts contained within the headers for each hunk of the patch. However, this is complicated by the second issue, which is that some email clients automatically wrap long lines of text (which often occur in source code). We therefore use a hand-tuned heuristic based on the content of each line (such as whether the first character is whitespace or not) to determine where the patch ends and the normal email communication begins again. Random sampling indicates that this technique incorrectly marks the end of a patch in an email less than 5% of the time.

Once the patches have been detected and extracted from the messages, we store the body of the patch along with author and file information in our database.

### 3.2 Finding Patch Applications

We’re also interested in which patches were actually accepted into the codebase. At a high level, this process seems relatively trivial. One simply needs to determine which file in the repository the patch references and check the patch against every version of that file. This ends up being more difficult than it sounds. We have found that the directory path in patch headers are often inaccurate. Therefore, in order to determine which file the patch may apply to, we search the entire repository for any file with the same name. In addition, in order to reduce computational time, we constrain the versions of files that we test to those that exist in the time interval from one day before to 80 days after the patch submission. After testing without this limitation, we found that this interval safely finds nearly all successful patch applications (common sense and experience also indicate that patches aren’t applied much earlier or later than time of submission).

Checking a particular version of a file to see if it appears that a patch has been applied is also somewhat