> these painfully obvious problems, the program merge issue has been largely left to fester for decades simply because the challenge of addressing it has seemed so daunting.

TC You’ve mentioned that you had access to a vast amount of training data, but you’ve also suggested some of that data contained surprises—which is to say it proved to be both a blessing and a curse. Can you go into that a bit more?

SL Yes, we were surprised to find that a large percentage of the merges—perhaps 70 percent—had the attribute of choosing just one side of the edit and then dropping the other. In some of those cases, it seemed one edit was superseding the others, but it can be hard to be sure whenever the syntax changes a little. In many instances, there were genuine edits that had been dropped on the floor. It was unclear whether that was due to a tooling problem or a social issue—that is, in some cases, perhaps some senior developer’s changes had superseded those that had been made by a junior developer. Another hypothesis was that, instead of a single merge, some people may have chosen to merge in multiple commits.

This sort of thing was so common that it accounted for a significant portion of the data, leaving us uncertain at first as to whether we should throw out these instances, ignore them, or somehow make an effort to account for them. That certainly proved to be one of the bigger surprises we encountered.

Another surprise was that we discovered instances where some new tokens had been introduced that were irrelevant to the merge. It was unclear at first whether