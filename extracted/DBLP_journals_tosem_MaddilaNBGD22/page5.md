Our interactions and interviews with developers across the company made us realize that developers find it valuable to have a service that can facilitate better communication among them about edits that are happening elsewhere (to the same files or functions that are being edited by them) through simple and non-obtrusive notifications. This is reflected strongly in the qualitative feedback that we have received (explained in detail in Section 6).

## 2 RELATED WORK

The software engineering community has extensively studied the impact of merge conflicts on software quality [2, 10], investigated various methodologies and tools that can help developers discover conflicting changes through interactive visualizations, and developed speculative analysis tools [20, 26, 29]. While ConE draws inspiration from some of this prior work, it is more ambitious, targeting a method that is effective while not resource intensive, can be easily scaled to work on tens of thousands of repositories of all sizes, is easy to integrate, and fits naturally into existing software development workflows and tools with very little to no disruption.

A conflict detection system that has to work for large organizations with disparate sets of programming languages, tools, product portfolio and has thousands of developers that are also geographically distributed, has to satisfy the requirements listed below:

- Language-independent: The techniques and tooling built should be language-independent in nature and support repositories that host code written in any programming language and should support new languages with no or minimal customization.
- Non-intrusive: The recommendations passed by the tool should naturally fit into developer workflows and environment.
- Scalable: Finally, the techniques proposed and the system should be performant and responsive without consuming a lot of computing resources and demanding a lot of infrastructure to scale them up.

We now explain some of the prior work that is relevant and explain why they do not satisfy some or all of the requirements.

### Tools based on edit activity.

Manhattan [34] is a tool that generates visualizations about team activity whenever a developer edits a class and notifies developers through a client program, in real time. While this shows useful 3D visualizations about merge conflicts in the IDE itself (thus, being non-intrusive and natural to use), it is not adaptive (it does not automatically reflect any changes to the code in the visualization, unless the user decides to re-import the code base), not generic (it works only for Java and Eclipse) and not scalable as it operates on the client side and has to go through the cycle of import-analyze-present again and again for every change that is made, inside the IDE environment. Similarly, FASTDash [7] is a tool that scans every single file that is edited/opened in every developer local workspace and communicates about their changes back and forth through a central server. This is impractical to implement across large development teams. It requires tracking changes at the client side with the help of an agent program that runs on each client. Furthermore it then keeps listening to every file edit activity in the workspace, then communicating that information with a central server that mediates communication between different workspaces. This is prone to failures and runs into scale issues even with a linear increase in developers and pull requests in the system.

### Tools based on early merging.

Some tools were built upon the idea of attempting actual merging and notifying the developers through a separate program that runs on the client [13, 15, 42]. These solutions are very resource intensive, because the system needs to perform the actual source code merge for every pull request or developer branch with the latest version of