was made to the source code. We extract two kinds of information from this—change logs, “hunks,” (See steps 1, 4 in Figure 1) and a series of snapshots (step 3).

| | Ant | Python | Apache | Postgres |
|---|---:|---:|---:|---:|
| Language | Java | C++ | C++ | C++ |
| Messages | 73,157 | 66,541 | 101,250 | 132,698 |
| w/Patches | 2,424 | 393 | 4,051 | 747 |
| Hunks | 200,854 | 253,291 | 123,221 | 1,257,633 |
| Keyterms | 12,072 | 5,519 | 2,023 | 9,461 |
| Used Keyterms | 2,704 | 1,452 | 1,271 | 5,454 |

Table 1: Descriptive statistics for projects studied

![flow chart of the data mining process](page2_img_1.png)

In the change logs, we are especially interested in “hunks”, which are contiguous run lengths of code indicating differences between successive versions. Hunks are very similar to diffs and patches. A hunk is a representation of a change from one version of a file to the next. Here is a sample unified diff from the Ant project:

```
@@ 109,2 111,4 @@
-Child(Element e) {
- this.e = e;
+String name = event.getTask().getClass().getName();
+int pos = name.lastIndexOf(".");
+if (pos != -1) {
+ name = name.substring(pos + 1);
```

This hunk deletes two lines and replaces them with four new lines. Multiple hunks may be used to represent more complex changes. The change is represented in a line-oriented way. Between the @@s there are four numbers, indicating the offset for the start of the change, change line count, etc. The lines prefixed by - and + are the most interesting, for these represent the actual lines added and deleted. We are specifically interested in the use of the names of programming entities in this range; the greater the use of programming terms in hunks, the more programmer effort is spent working with those terms.

These hunks will be used later on for comparison against emails. We now describe how we extract the names of the modules, or functions, from the source code.

### 3.2 Keyterm Extraction & Counting

We use the term keyterm to refer to the name of an entity in the source code of the system. These will include items such as classes, methods, static instance variables, exceptions, parameter names, local variable names, and so on. For our purposes, we only need to collect software entity names and simple metrics of these entities (such as line numbers). Using Understand from Scitools, Inc., we extracted the required information. The Understand tool, like many fact extractors, is designed to work with complete versions of the system. However, since the files in the system evolve individually, we created monthly and transaction snapshots of each file and ran Understand on each of these snapshots as if it were a static release of the source code (see steps 1, 3, 6 in Figure 1). The keyterm corresponding to every possible software artifact from the entire source code repository can be placed into the database for future use.

Understand extracts keyterms naming all Java, C, and C++ entities, including classes, fields, methods, functions, etc. From this list of keyterms (in the case of Java) we took only “fully-qualified” function names, and split this into separate parts, using each part also as a keyterm. For example, the method name: difforg.apache.ant.Project.init() we retrieved the following keyterms: difforg.apache.ant.Project.init, org, apache, ant, Project, init. For C++ projects, for example, a full function name would be: PgConnection::Connect() and the following keyterms would be extracted: PgConnection::Connect, PgConnection, Connect. Since the long function names are split into their parts, class names are also in the set of keyterms.

#### Keyterm Culling

Many keyterms are not particularly informative, since they occur too often or extremely rarely. For example, the exceedingly popular function System.out.println occurs in a great many hunks, but is not usually a hot topic of discussion on the mail. Likewise, some functions may hardly ever be discussed. To avoid the confounding effects of these outliers, we chose to only consider words that are mentioned in at least three different hunks and in at least three different messages (steps 6, 10 in Figure 1). These outlier thresholds were based on a study of the distributions of keyterm occurrence frequencies in the different projects studied.

#### Counting Keyterms

Once the keyterms have been identified, we need to count occurrences in both emails and hunks. After downloading the email archives, we parse each email for meta-data (steps 2, 7 in Figure 1) and place this relevant information into the database, as discussed in our earlier work [4]. For our purposes here, we care about the data (body field) and only some of the meta data (the timestamp of the email).

There was one complication; emails often contain patches, which are essentially verbatim diff outputs. Including this patch content might bias our results. To ensure that we only counted discussion of code keyterms, we removed (steps 7, 8 in Figure 1) emails that contain patches. For the Ant project, 73,157 email messages appear on the list serve. Using previously created scripts that identify patches in email messages [3], only 2,424 of those email messages contain a patch. Table 1 contains message and patch counts for all of the projects examined. Once the emails are filtered, we can complete the keyterm count (step 9 in Figure 1).

Counting keyterms in Hunks is relatively straightforward: using the lines prefixed with "+" and "-" in hunks we counted the number of occurrences of keyterms (step 5 in Figure 1). Once all keyterms are counted, individual documents from hunks and messages are compared. This comparison is similar to methods presented by Salton et al. [9]; however, instead of comparing documents within a single set, we are comparing documents across two disjoint sets.

## 4. RESULTS

We studied the relationship between the amount of “talk” concerning keyterms, and amount of “work” with the same