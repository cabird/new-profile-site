files that are added, modified, or deleted in changes submitted for code review. “Methods changed” is a count of the number of individual methods that are added, modified, or deleted. We define a diff-region as a contiguous sequence of added, deleted, or modified lines. For example, Figure 1 shows two diff-regions. The median number of changed methods and diff-regions are 12 and 24, while over 25% of reviews modify 23 methods and comprise 45 diff regions. These numbers suggest that many changes submitted for review may be large and/or difficult to understand. Some developers that we talked to during this and earlier studies ([1], [11]) indicated that it is difficult to review a change that has many regions of change scattered across the files even if there are a small number of modified files.

## III. CLUSTERCHANGES

### A. Starting Point

The predominant code review tool used at Microsoft is CodeFlow [12]. CodeFlow provides access only to individual changesets: these are standalone packages containing the set of pairs of changed files. Each pair has a before-file and an after-file (for added or deleted files, one element of the pair may be empty). It is important to note that analyzing changesets is quite different than analyzing the history of a source repository. In particular, changesets do not provide full information: we do not have the full set of project files, nor the compiler options used to actually compile the code. We use a standard text differencing tool on each pair of files to get a set of pairs of diff-regions. Because our analysis applies only to C# files, we split diff-regions that cross type and method boundaries so that no diff-region crosses more than one type or method. This corresponds to the predominant organizing units of object-oriented code.

We restricted ourselves to C# [13] because it is one of the primary programming languages used within Microsoft. It is a modern object-oriented language, with types (primarily classes, but also structs) composed of members such as fields, events, properties, and nested types. Another reason for picking C# is our ability to use Roslyn [7], the new Microsoft compiler, with its open API. We use Roslyn to create a synthetic project comprising the after-files from a changeset and the basic .NET assembly references that provide definitions of basic types like string, etc. In return, we access the resulting symbol table and abstract-syntax tree that Roslyn provides after making a best-effort (relative to the available definitions) parse of the project.

### B. Definitions and uses.

We use the def-use relationship as the primary organizing principle for clustering diff-regions. Programmers often introduce interesting functional changes to code by introducing or modifying definitions along with their uses.

1) Computing def-use information: Given the project corresponding to the changeset, we collect the set of definitions, D, for types, fields, methods (including constructors), and local variables. D is the set of definitions present only in the changeset (that is, the definitions that occur anywhere in the files that were modified in the changeset). Then we scan the project for the set of all uses (i.e., references to a definition), U, as provided by the Roslyn API. For instance, any occurrence of a type, field, or method either inside a method or a field initialization is considered to be a use. We focused on this one relationship in order to evaluate the effectiveness of just this one source of information.

We define a function Def : U → D ∪ {⊥} that maps any use to the corresponding definition. For any use u ∈ U, Def(u) ∈ D whenever the definition is present in the changeset; otherwise, Def(u) = ⊥ indicating that the definition lies outside of the changeset.

Each definition and use has an associated span, which is the sequence of (contiguous) characters in the source that represents the definition or use.

2) Projecting def-use on diffs: Since we are concerned with organizing the diff-regions, we consider only uses whose span intersects that of some diff-region. We define the following sets (in all formulas, the variable f represents a diff-region):

defs(f) = { d | d ∈ D ∧ span(f) ∩ span(d) ≠ {} }

Note that a definition (of a method or type, e.g.) that is changed in two non-contiguous regions results in the definition appearing in the defs set for two different diff-regions. Similarly, we define the references found in a diff-region:

uses(f) = { u | u ∈ U ∧ span(f) ∩ span(u) ≠ {} }

In contrast with definitions, each use is distinct, so that given two distinct diff-regions, f1 and f2, uses(f1) ∩ uses(f2) = {}.

Next we project the definition-use relationship over the set of diff-regions. A pair (d, u) ∈ D × U is in the relation defUsesInDiffs if and only if:

defUsesInDiffs = { (d,u) ∈ D × U | ∃f : d ∈ defs(f) ∧ u ∈ uses(f) ∧ Def(u) = d }

Finally, we also project uses of the same definition where the definition itself is present in the changeset, but does not appear within any diff-region. This captures changes made to all uses but where the definition has not been changed. A pair (u1, u2) is in the relation useUsesInDiffs if and only if:

(Def(u1) = Def(u2) ≠ ⊥) ∧ (∀f: Def(u1) ∉ defs(f)) ∧ (∃f1, f2: f1 ≠ f2 ∧ u1 ∈ uses(f1) ∧ u2 ∈ uses(f2))

The first two conjuncts denote that (i) the two uses share a definition present in the changeset, and (ii) the definition has not been changed. The third conjunct denotes that the two uses are present in distinct diff-regions.

Our decision to restrict useUsesInDiffs to definitions in D is motivated by two factors. First, definitions outside D are not necessarily resolved correctly, given the partial information available in the changeset. Second, changes to method calls defined in the framework (e.g. addition of calls to Console.WriteLine in two different methods) leads to spurious relationships among diff regions. We discuss this further in Section VI-A.