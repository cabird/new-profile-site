## ConE: A Concurrent Edit Detection Tool for Large-scale Software Development

Chandra Maddila, Nachiappan Nagappan, and Christian Bird, Microsoft Research  
Georgios Gousios, Facebook  
Arie van Deursen, Delft University of Technology

Modern, complex software systems are being continuously extended and adjusted. The developers responsible for this may come from different teams or organizations, and may be distributed over the world. This may make it difficult to keep track of what other developers are doing, which may result in multiple developers concurrently editing the same code areas. This, in turn, may lead to hard-to-merge changes or even merge conflicts, logical bugs that are difficult to detect, duplication of work, and wasted developer productivity. To address this, we explore the extent of this problem in the pull-request-based software development model. We study half a year of changes made to six large repositories in Microsoft in which at least 1,000 pull requests are created each month. We find that files concurrently edited in different pull requests are more likely to introduce bugs. Motivated by these findings, we design, implement, and deploy a service named Concurrent Edit Detector (ConE) that proactively detects pull requests containing concurrent edits, to help mitigate the problems caused by them. ConE has been designed to scale, and to minimize false alarms while still flagging relevant concurrently edited files. Key concepts of ConE include the detection of the Extent of Overlap between pull requests, and the identification of Rarely Concurrently Edited Files. To evaluate ConE, we report on its operational deployment on 234 repositories inside Microsoft. ConE assessed 26,000 pull requests and made 775 recommendations about conflicting changes, which were rated as useful in over 70% (554) of the cases. From interviews with 48 users, we learned that they believed ConE would save time in conflict resolution and avoiding duplicate work, and that over 90% intend to keep using the service on a daily basis.

CCS Concepts: • Software and its engineering → Integrated and visual development environments; Software maintenance tools; Software configuration management and version control systems;

Additional Key Words and Phrases: Pull-based software development, pull request, merge conflict, distributed software development

### ACM Reference format:
Chandra Maddila, Nachiappan Nagappan, Christian Bird, Georgios Gousios, and Arie van Deursen. 2021. ConE: A Concurrent Edit Detection Tool for Large-scale Software Development. ACM Trans. Softw. Eng. Methodol. 31, 2, Article 22 (December 2021), 26 pages.  
https://doi.org/10.1145/3478019

### Authors’ addresses:
N. Nagappan: work done while at Microsoft Research.  
G. Gousios: work done while at Delft University of Technology.  
Authors’ addresses: C. Maddila, N. Nagappan, and C. Bird, Microsoft Research, 14820 NE 36th St, Redmond, WA 98052, USA; emails: chmaddil@microsoft.com, nchiappan.nagappan@gmail.com, cbird@microsoft.com; G. Gousios, Facebook, 1 Hacker Way, Menlo Park, CA 94025, USA; email: gousiosg@fb.com; A. van Deursen, Delft University of Technology, Building 28, Van Mourik Broekmanweg 6, 2628 XE Delft, The Netherlands; email: Arie.vanDeursen@tudelft.nl.

This work is licensed under a Creative Commons Attribution International 4.0 License.  
© 2021 Copyright held by the owner/author(s).

© 2021 Copyright held by the owner/author(s).  
1049-331X/2021/12-ART22  
https://doi.org/10.1145/3478019

ACM Transactions on Software Engineering and Methodology, Vol. 31, No. 2, Article 22. Pub. date: December 2021.