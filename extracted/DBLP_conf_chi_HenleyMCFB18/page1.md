## CFar: A Tool to Increase Communication, Productivity, and Review Quality in Collaborative Code Review

Austin Z. Henley  
University of Memphis  
azhenley@memphis.edu

Kıvanç Muşlu  
Microsoft  
kivancm@microsoft.com

Maria Christakis  
MPI-SWS  
maria@mpi-sws.org

Scott D. Fleming  
University of Memphis  
Scott.Fleming@memphis.edu

Christian Bird  
Microsoft Research  
cbird@microsoft.com

## ABSTRACT

Collaborative code review has become an integral part of the collaborative design process in the domain of software development. However, there are well-documented challenges and limitations to collaborative code review—for instance, high-quality code reviews may require significant time and effort for the programmers, whereas faster, lower-quality reviews may miss code defects. To address these challenges, we introduce CFar, a novel tool design for extending collaborative code review systems with an automated code reviewer whose feedback is based on program-analysis technologies. To validate this design, we implemented CFar as a production-quality tool and conducted a mixed-method empirical evaluation of the tool usage at Microsoft. Through the field deployment of our tool and a laboratory study of professional programmers using the tool, we produced several key findings showing that CFar enhances communication, productivity, and review quality in human–human collaborative code review.

## ACM Classification Keywords

D.2.6 Software Engineering: Programming Environments; H.5.3 Group and Organization Interfaces: Computer-supported cooperative work

## Author Keywords

Programming environments; collaborative design; code review

## INTRODUCTION

To “transcend the individual human mind” [8] remains a challenging and relevant problem in human–computer interaction. Central to this problem is the need for interactive systems that effectively support collaborative design—that is, design activities that require more knowledge, expertise, and effort than any one person can contribute [8]. Collaborating designers engage in a myriad of activities that might benefit from computer support, including brainstorming, documenting ideas, eliciting feedback, and exploring solutions. However, effective interaction designs for providing such support are often closely tied to the particulars of the domain in which a collaborative design activity takes place. Thus, researchers have investigated interaction designs for a variety of domains, including product design [46], urban design [9], interior design [42], architecture [31, 50], computer programming [52], and various forms of media creation [14, 23, 33].

One particular domain that involves extensive collaborative design is software development. In software development, design pervades many activities, including architectural system design, low-level code design, and software test design to name a few. Design in this domain is especially challenging, because modern software is often composed of many thousands or even millions of inter-related lines of code, requiring the work to be distributed among many programmers. Effectively designing software is further complicated by the fact that an individual programmer’s design changes may have cascading effects that impact other programmers’ work. To address the challenging scale and complexity of modern software, programmers attempt to coordinate their efforts. However, as a software project grows, the programmers must communicate more and more, and that communication becomes increasingly expensive due to communication overhead [18]. Thus, software development is particularly in need of systems that effectively support collaborative design.

One collaborative design activity in software development that has become particularly important is collaborative code review. Many software development organizations apply collaborative code review as a standard practice, including Microsoft [11], Google [35], Facebook [28], and many popular open-source software projects [51]. Following the practice, each code change must be reviewed and accepted by programmers other than the author before being merged into the product. Discussion among the programmers and multiple iterations of feedback and revision may be necessary before the change is finally accepted. A large body of evidence points to the benefits of code reviews for discovering and fixing bugs [7, 11, 26, 27, 40, 43] while also improving design aspects of the software, such as code readability and maintainability [11, 40]. Moreover, code review also has the collaborative-design benefit of helping the collaborating programmers maintain an up-to-date understanding of the evolving software design.

Permission to make digital or hard copies of all or part of this work for personal or