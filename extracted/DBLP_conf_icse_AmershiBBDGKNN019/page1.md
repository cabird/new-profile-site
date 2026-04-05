# Software Engineering for Machine Learning: A Case Study

Saleema Amershi — Microsoft Research, Redmond, WA USA — samershi@microsoft.com  
Andrew Begel — Microsoft Research, Redmond, WA USA — andrew.begel@microsoft.com  
Christian Bird — Microsoft Research, Redmond, WA USA — cbird@microsoft.com  
Robert DeLine — Microsoft Research, Redmond, WA USA — rdeline@microsoft.com  
Harald Gall — University of Zurich, Zurich, Switzerland — gall@ifi.uzh.ch

Ece Kamar — Microsoft Research, Redmond, WA USA — eckamar@microsoft.com  
Nachiappan Nagappan — Microsoft Research, Redmond, WA USA — nachin@microsoft.com  
Besmira Nushi — Microsoft Research, Redmond, WA USA — besmira.nushi@microsoft.com  
Thomas Zimmermann — Microsoft Research, Redmond, WA USA — tzimmer@microsoft.com

## Abstract

Recent advances in machine learning have stimulated widespread interest within the Information Technology sector on integrating AI capabilities into software and services. This goal has forced organizations to evolve their development processes. We report on a study that we conducted on observing software teams at Microsoft as they develop AI-based applications. We consider a nine-stage workflow process informed by prior experiences developing AI applications (e.g., search and NLP) and data science tools (e.g. application diagnostics and bug reporting). We found that various Microsoft teams have united this workflow into preexisting, well-evolved, Agile-like software engineering processes, providing insights about several essential engineering challenges that organizations may face in creating large-scale AI solutions for the marketplace. We collected some best practices from Microsoft teams to address these challenges.

In addition, we have identified three aspects of the AI domain that make it fundamentally different from prior software application domains:
1. Discovering, managing, and versioning the data needed for machine learning applications is much more complex and difficult than other types of software engineering.
2. Model customization and model reuse require very different skills than are typically found in software teams.
3. AI components are more difficult to handle as distinct modules than traditional software components — models may be “entangled” in complex ways and experience non-monotonic error behavior.

We believe that the lessons learned by Microsoft teams will be valuable to other organizations.

Index Terms—AI, Software engineering, process, data

## I. INTRODUCTION

Personal computing. The Internet. The Web. Mobile computing. Cloud computing. Nary a decade goes by without a disruptive shift in the dominant application domain of the software industry. Each shift brings with it new software engineering goals that spur software organizations to evolve their development practices in order to address the novel aspects of the domain.

The latest trend to hit the software industry is around integrating artificial intelligence (AI) capabilities based on advances in machine learning. AI broadly includes technologies for reasoning, problem solving, planning, and learning, among others. Machine learning refers to statistical modeling techniques that have powered recent excitement in the software and services marketplace. Microsoft product teams have used machine learning to create application suites such as Bing Search or the Cortana virtual assistant, as well as platforms such as Microsoft Translator for real-time translation of text, voice, and video, Cognitive Services for vision, speech, and language understanding for building interactive, conversational agents, and the Azure AI platform to enable customers to build their own machine learning applications [1]. To create these software products, Microsoft has leveraged its preexisting capabilities in AI and developed new areas of expertise across the company.

In this paper, we describe a study in which we learned how various Microsoft software teams build software applications with customer-focused AI features. For that, Microsoft has integrated existing Agile software engineering processes with AI-specific workflows informed by prior experiences in developing early AI and data science applications. In our study, we asked Microsoft employees about how they worked through the growing challenges of daily software development specific to AI, as well as the larger, more essential issues inherent in the development of large-scale AI infrastructure and applications. With teams across the company having differing amounts of work experience in AI, we observed that many issues reported by newer teams dramatically drop in importance as the teams mature, while some remain as essential to the practice of large-scale AI. We have made a first attempt to create a process maturity metric to help teams identify how far they have come on their journeys to building AI applications.

As a key finding of our analyses, we discovered three fundamental differences to building applications and platforms for training and fielding machine-learning models than we have seen in prior application domains. First, machine learning is all about data. The amount of effort and rigor it takes to discover, source, manage, and version data is inherently more complex and different than doing the same with software code. Second, building for customizability and extensibility of models require teams to not only have software engineering skills but almost