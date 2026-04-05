and low clone ratio bugs. The alternative hypothesis is set to "bugs with high clone ratio require smaller bug fix change". All the p-values are very low, thereby clearly rejecting the null hypothesis.

## 6 Case Study

To gain further insights as to why clones appear less buggy, we did a case study of 20 good quality (has very few bugs) clones (3 from conservative and 2 from liberal for each of the 4 projects). In Listing 1, we show one very good quality (no buggy code) clone which comes from a group of 2 clone members. Both of the members come from the file "libnautilus-private/nautilus-file.c" in a snapshot taken on 20th November, 2000. This code tries to set a file’s owner and before doing that it checks to see whether the user has required privileges or whether the user is same as the current file owner. If everything goes well, then the code proceeds to change the owner of the file. A very similar role of a file manager is to change the group of the

![Example clone code in Nautilus](page21_img_1.png)

Listing 1 Example Clone in Nautilus