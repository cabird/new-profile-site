In addition, and rather surprisingly, one might conclude that bug-prediction tools could use cloned content as a negative indicator of defect-proneness!

The rest of the paper is organized as follows. Section 2 discusses related works, Section 3 defines common terms used in the rest of the paper, Section 4 discusses data sets, Section 5 discusses findings, Section 6 presents case study, Section 7 discusses threats to validity and finally we conclude in Section 8 with some recommendation and a summary of our findings.

## 2 Related Work

### 2.1 Automatic Detection of Clones

There has been quite a bit of research on automatic clone detection. Based on the similarity analysis, clone detectors can be classified in four categories:

### String Based Similarity
Baker’s Dup (Baker 1995) uses a line-based string matching algorithm. Dup removes all whitespace and comments and replaces identifiers with special parameters before analyzing similarity. String-based algorithms are less robust, and susceptible to code formatting and spurious code elements.

### Token-based Similarity
The token-based approach uses a lexer to tokenize and then finds whether the same series of tokens appear in two code fragments. It also renames identifiers and ignores whitespace, but is usually more robust than the string-based approach. CCFinder (Kamiya et al. 2002) and CP-Miner (Li et al. 2004) are two prominent examples of the token-based approach.

### AST Similarity
AST similarity-based clone detection tools first convert the program to an abstract syntax tree. Finding clones consequently amounts to finding similar ASTs. Baxter et al. (1998) propose an AST-based clone detector that detects clones by finding identical subtrees. Deckard (Jiang et al. 2007a) also uses the AST-based approach but instead of comparing subtrees directly it computes characteristic vectors to approximate structural information within the AST and then adapts Locality Sensitive Hashing (LSH) to efficiently cluster similar vectors. Similar code is clustered together and declared as clones. In our study, we used Deckard for clone detection.

### Semantics Aware Approach
Finding semantically similar code segments is undecidable in general; typically various approximation techniques are used. Komondoor and Horwitz (2001) use program dependence graphs (PDG) and program slicing to identify clones. Such techniques have not traditionally scaled for large programs. However, Gabel et al. (2008) were able to scale a PDG-based semantic clone detection approach for several million lines of code by reducing graph similarity to a simpler tree similarity problem.

For a survey on clone detection research, please refer to Roy and Cordy (2007). Note, there is no community-wide precise definition of what a clone is. Consequently, different tools will provide different sets of clones. This is a threat to validity that