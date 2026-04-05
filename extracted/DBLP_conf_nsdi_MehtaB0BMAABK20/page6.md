![diagram of change-rule refinement](page6_img_1.png)

Figure 3: Steps of change-rule refinement for a rule `network_dc1.xml` ⇒ `network_dc2.xml`. Three separate commits are made to a single configuration file. Each one adds an XML attribute Network, but with different values. From each of these three, Rex learns difference trees that codify the additions. All these difference trees are input to the anti-unification algorithm which outputs a generalization for this type of addition.

These techniques apply to other file-types such as JSON.

Consider the following examples which have arisen in our deployments:

**Ex 1. Network configuration:** An engineer adds new commands to a file `NetConfig_dc1.xml` that configure racks in data center 1. These changes need to be applied to all data centers, and hence, the engineer has to change similar configuration files for other data centers as well, say `NetConfig_dc2.xml`. Rex should therefore suggest these changes if the engineer does not make them. However, in many cases, the engineer makes changes to `NetConfig_dc1.xml` that apply only to data center 1 and not to data center 2. For instance, they may add a new subnet only to data center 1. In this case, Rex should not suggest changing `NetConfig_dc2.xml`. Change-rule discovery alone cannot differentiate these two scenarios.

**Ex 2. Role-based access control:** Several of our services implement role-based access control. Engineers often define a new role in a file `RoleDefn.xml`. When they do so, they should also change `RoleMembership.xml`, which specifies the users or groups that are associated with the new role. However, if the engineer is only modifying an already existing role definition in `RoleDefn.xml`, they need not change `RoleMembership.xml`.

These examples show that, in some cases, for a rule X ⇒ Y, Y changes only if X changes in a specific way. While for code, compilers often catch such correlations and dependencies, configuration files lack an equivalent safety net.

Change-rule refinement has two parts. First, given a configuration file `x`, it learns all generalizations of additions, deletions and modifications made to `x`, where a generalization is in the form of a regular expression. Next, for any change-rule X ⇒ Y already learned by change-rule discovery where `x ∈ X`, it refines the rule further. We now describe these two steps in detail.

### 4.3.1 Learning generalizations

Figure 3 shows an example of this. Rex creates a set of all commits C that modify `x`. For every commit in C, Rex computes a syntactic difference between the old and new version of `x`. To do this, Rex constructs parse trees for both versions, and then uses a novel differencing algorithm to compute the difference between the two parse trees, which we call a difference tree. For example, in Figure 3, three changes were added to `x` in three different commits. Each change added an XML node named `network`, but with varying attribute values. In each case, Rex's differencing algorithm outputs a difference tree capturing the difference. The shaded vertices are XML nodes, while the unshaded vertices are XML attributes.

Next, from the difference trees, Rex learns generalizations of the changes that happen to the configuration file. To extract these generalizations, Rex uses the process of anti-unification [15, 23]. The anti-unification algorithm learns regular expressions that are the most specific generalizations of the difference trees. In each of the three changes shown in Figure 3, the XML attribute `RackTypes` has different values. The XML attribute `CommandConfig` too has different text values. Taking the three difference trees as input, the anti-unification algorithm outputs the generalized difference tree, and thereby the most specific generalization of the three changes.

While Figure 3 describes one example generalization, a file `x` may have many more such generalizations. Rex learns all such generalizations of additions, deletions and modifications to the configuration file `x`. Say this set is `G(x) = {g1, g2, ..., gn}`.

### 4.3.2 Refining Rules

Next, given a rule learned during change-rule discovery X ⇒ Y, where `x ∈ X`, Rex learns more fine-grained rules of the form `{X, (x, gi)} ⇒ Y, gi ∈ G(x)`. This rule says that when all files in X change, Rex will suggest changing Y