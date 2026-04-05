## Representation 5: Abstracted Phase-III ASTs

For our final representation of Dockerfiles, we applied a set of simple abstractions to each literal value present in our Phase-III ASTs. Each regular expression is assigned a name, and when a given expression matches a literal node, a new node is inserted into the tree as a child of the literal node. The type of the newly inserted node is set to the name of the matched regular expression.

While these regular expressions are hand-designed, their purpose is to supplement our ASTs with possibly useful information without going so far as to implement something like a fourth phase of parsing. Furthermore, having abstractions as our final step of dataset processing introduces a convenient entry-point for doing simple exploratory analysis. (As an example, one could add regular expressions to identify GitHub URLs and then, in a structured pass over Phase-III abstracted ASTs, identify how often npm is used with a GitHub URL as an argument in lieu of a package name).

Our abstracted Phase-III ASTs are stored as compressed JSONL files. These files reside in the ./datasets/4-abstracted-asts directory of our artifact. Additionally, the regular expressions we use for abstraction are present in the ./datasets/4-abstracted-.../generate/abstractions.py file. Each regular expression is encoded, with its name, into a Python file as an array of tuples.

Example Usage:

```
cat ./4-abstracted-asts/github.jsonl.xz \
  | xz -cd \
  | grep 'aaf505fc6efd672143ac63292122207db3f8b19b' \
  | jq
```

Running the above should produce:

```
{
  "file_sha": "aaf505fc6efd672143ac63292122207db3f8b19b",
  "type": "DOCKER-FILE",
  "children": [..., {
    "children": [{
      "children": [{
        "children": [..., {
          "children": [{
            "children": [{
              "children": [{
                "type": "ABS-PROBABLY-URL",
                "children": []
              }, {
                "type": "ABS-URL-PROTOCOL-HTTPS",
                "children": []
              }],
              "type": "BASH-SINGLE-QUOTED"
            }, ...],
            "type": "BASH-ARRAY"
          }],
          "type": "BASH-ASSIGN-RHS"
        }],
        "type": "BASH-ASSIGN"
      }, ...],
      "type": "BASH-SCRIPT"
    }],
    "type": "DOCKER-RUN"
  }, ...]
}
```

## 4 DATASET USAGES

We have used the dataset presented here to carry out a study on the feasibility of automated rule mining from Dockerfiles. In addition, we have also manually curated a collection of Gold Rules, and used these rules to gather general statistics on the incidence of rule violations in Dockerfiles on GitHub. In that study we found that, on average, there are five times more rule violations in the overall corpus of Dockerfiles compared to the number of violations in the Gold Files introduced in §2. Moreover, we found that frequent subtree mining [4, 5], with the help of some light modifications, can effectively mine Tree Association Rules [9] from this corpus. For comprehensive details and analysis, see Henkel et al. [7].

In addition to the Dockerfiles presented earlier, we have also made the Gold Rules available in the ./datasets/6-gold-rules directory of our artifact. Each rule is rendered as a simple JavaScript Object, and encoded into a TypeScript file for easy usage in a downstream application, such as a static rule checker.

## 5 FUTURE DIRECTIONS

Although we successfully implemented an automated rule miner and static-checking engine using this data, our techniques have several key limitations. First, our automated rule miner is limited in the kind of Tree Association Rules it can mine. Expanding the class of minable rules would be a significant advance. Second, we have not yet investigated the possibility of using this data in the context of repairs. It is likely that one can use these more structured representations of Dockerfiles to bootstrap interesting research on the automated repair of common Docker mistakes. Finally, there are a number of other interesting uses for this data outside of rule mining, checking, and violation repairs. In particular, encoded within these Dockerfiles is a wealth of information on the kinds of tools being used in production environments, and, more critically, the dependencies among various pieces of production software. We believe that research in this direction would be of great interest; to work towards harnessing this data, we have recently expanded the set of manually generated schemas to include 17 new schemas for common dependency-management tools.

## 6 LIMITATIONS

Although both the challenges and techniques detailed in this paper are, in theory, applicable to a wide range of DevOps artifacts, the dataset we provide consists solely of Dockerfiles. Furthermore, these Dockerfiles come from a single source: GitHub. It is possible that other DevOps artifacts are not as amenable to the ideas we present.

## 7 SUMMARY

DevOps artifacts in general, and Dockerfiles specifically, often see less support than traditional program artifacts in terms of Interactive Development Environment (IDE) extensions and tooling. We offer a large dataset of Dockerfiles, in five different representations, to bootstrap research in the realm of better developer assistance for DevOps and Docker. As part of these datasets, we also contribute tools geared towards addressing some of the challenges associated with DevOps artifacts. Namely, we provide tools to perform various levels of parsing to uncover structure within the nested languages present in many DevOps artifacts.

## ACKNOWLEDGMENTS

Supported, in part, by a gift from Rajiv and Ritu Batra and by ONR under grants N00014-17-1-2889 and N00014-19-1-2318. Any opinions, findings, and conclusions or recommendations expressed in this publication are those of the authors, and do not necessarily reflect the views of the sponsoring agencies.