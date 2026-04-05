## Representation 3: Phase-II ASTs

One key insight and contribution we bring to Dockerfile analysis is the necessity of dealing with the nested languages present in Dockerfiles. The most immediate nested language in a typical Dockerfile is some form of shell scripting in RUN statements. Primarily, these statements contain valid Bash (but, in principal, scripts for other shells such as Windows Powershell are permitted). In Representation 3, we took the ASTs from Representation 2 and, for each AST, identified and parsed any embedded Bash. We assumed that the child of any RUN statement contains embedded Bash, and employed ShellCheck [3] to parse these literal nodes into sub-trees. We again stored the results as compressed JSONL files, which can be found in the ./datasets/2-phase-2-dockerfile-asts directory of our artifact.

Example Usage:

```bash
cat ./2-phase-2-dockerfile-asts/github.jsonl.xz \
| xz -cd \
| grep '972b56dc14ff87faddd0c35a5f3b6a32597a36ed' \
| jq
```

Running the above should produce:

```json
{
  "type": "DOCKER-FILE",
  "file_sha": "972b56dc14ff87faddd0c35a5f3b6a32597a36ed",
  "children": [..., {
    "children": [{
      "children": [{
        "children": [..., {
          "children": [{
            "value": "npm",
            "children": [],
            "type": "BASH-LITERAL"
          }],
          "type": "BASH-COMMAND-COMMAND"
        }, {
          "children": [{
            "value": "install",
            "children": [],
            "type": "BASH-LITERAL"
          }, {
            "value": "--production",
            "children": [],
            "type": "BASH-LITERAL"
          }],
          "type": "BASH-COMMAND-ARGS"
        }],
        "type": "MAYBE-SEMANTIC-COMMAND"
      }],
      "type": "BASH-SCRIPT"
    }],
    "type": "DOCKER-RUN"
  }, ...]
}
```

## Representation 4: Phase-III ASTs

Although the previous representation is workable and used in both Hadolint [2] and recent work on Dockerfiles [6], one of the core contributions of this dataset is a richer representation of Dockerfiles based on the use of many parsers. First, we created parsers for each of the 50 most used Bash commands in Dockerfiles. (Here, the 50 most used Bash commands were identified, empirically, by counting and ranking the Bash commands present in our Phase-II ASTs.) Next, to arrive at Representation 4, we took each Phase-II AST and found every sub-tree (in the embedded Bash that we parsed as part of Phase-II) that corresponded to one of the 50 most frequently used Bash commands in our corpus of Dockerfiles. For each of these corresponding sub-trees, we extracted them and applied the appropriate parser for the command. The results of this third-level parse were then used to replace the removed sub-tree.

The example usage below highlights this process: note how the MAYBE-SEMANTIC-COMMAND node from the previous Phase-II AST has been replaced by a new SC-NPM-INSTALL sub-tree. This new sub-tree has structured nodes corresponding to the various flags, options, and parameters defined by the npm utility. It is in this Phase-III representation that we finally have the ability to mine, in a structured way, patterns such as: 'npm's --production flag must always be present when running the npm install sub-command'.

To make this extra level of parsing possible and less onerous, we leveraged the fact that all of the popular Bash utilities have some form of embedded help documentation (accessible either through a flag or manual pages). This documentation often describes, in detail, the schema of allowable flags, options, and parameters. Unfortunately, these help documents are written in natural language. Therefore, we wrote a parser generator that takes structured schemas that are close, in spirit, to help documentation. With this specially designed input format, it became much easier to write schemas and generate parsers. In fact, it took us on average between 15 and 30 minutes to encode individual schemas for popular command-line utilities. Encoding schemas, although manual work, is a one-time process—the parsers we generate are efficient (operating, commonly, in milliseconds) and, once generated, parsers can be used with any DevOps artifact containing nested Bash, not just Dockerfiles.

Our Phase-III ASTs are stored as compressed JSONL files. These files reside in the ./datasets/3-phase-3-dockerfile-asts directory of our artifact. Additionally, the schemas we use for parser generation are available in the ./datasets/3-phase-3-.../generate/enrich/commands directory. Each schema is encoded as a YAML file to strike a balance between programmatic ease of use and human readability. These schemas encode both flags with their types (boolean, array, etc.) and the various usage scenarios allowed by a command. Scenarios mostly mirror a command’s allowable sub-commands (e.g., git clone/add/...). Each scenario has its own configuration and, via YAMLMergeKeys, scenarios may inherit common flag definitions. (This feature is useful for common flags like -h/--help.)

Example Usage:

```bash
cat ./3-phase-3-dockerfile-asts/github.jsonl.xz \
| xz -cd \
| grep '972b56dc14ff87faddd0c35a5f3b6a32597a36ed' \
| jq
```

Running the above should produce:

```json
{
  "file_sha": "972b56dc14ff87faddd0c35a5f3b6a32597a36ed",
  "type": "DOCKER-FILE",
  "children": [..., {
    "children": [{
      "children": [{
        "children": [{
          "children": [],
          "type": "SC-NPM-F-PRODUCTION"
        }],
        "type": "SC-NPM-INSTALL"
      }],
      "type": "BASH-SCRIPT"
    }],
    "type": "DOCKER-RUN"
  }, ...]
}
```