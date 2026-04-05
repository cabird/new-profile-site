# Make Your Tools Sparkle with Trust: The PICSE Framework for Trust in Software Tools

Brittany Johnson  
George Mason University — Virginia, USA  
johnsonb@gmu.edu

Christian Bird  
Microsoft Research — Washington, USA  
cbird@microsoft.com

Denae Ford  
Microsoft Research — Washington, USA  
denae@microsoft.com

Nicole Forsgren  
Microsoft Research — Washington, USA  
niforsgr@microsoft.com

Thomas Zimmermann  
Microsoft Research — Washington, USA  
tzimmer@microsoft.com

## Abstract—  
The day to day of a software engineer involves a variety of tasks. While many of these tasks are collaborative and completed as such, it is not always possible or feasible to engage with other engineers for task completion. Software tools, such as code generators and static analysis tools, aim to fill this gap by providing additional support for developers to effectively complete their tasks. With a steady stream of new tools emerging to support software engineers, including a new breed of tools that rely on artificial intelligence, there are important questions we should aim to answer regarding the trust engineers can, and should, put into their software tools and what it means to build a trustworthy tool. In this paper, we present findings from an industry interview study conducted with 18 engineers across and external to the Microsoft organization. Based on these interviews, we introduce the PICSE (pronounced “pixie”) framework for trust in software tools to provide preliminary insights into factors that influence engineer trust in their software tools. We also discuss how the PICSE framework can be considered and applied in practice for designing and developing trustworthy software tools.

Index Terms—trust, software tools, artificial intelligence, framework

## I. INTRODUCTION
Engineers rely on tools to support the completion of their day to day tasks, as evidenced by the rapid and consistent increase in available tooling. In fact, the software engineering research community has long encouraged and celebrated new techniques that can help engineers solve new problems or old problems better than before (hence the emergence of tracks such as New Ideas and Tool Demos).

Despite the enthusiasm for creating and disseminating new tools, we still struggle with building bridges between new tools and the engineers they are intended to support. Research suggests that many tools may go unnoticed and unused in practice [1], [2].

As we continue to struggle with tool adoption and use in practice, the tool landscape continues to evolve with technology. With the advent of huge amounts of data and increasingly powerful artificial intelligence (AI) models, new types of software tools are being created that rely on AI for decision-making and recommendations [3], [4]. Most notably is GitHub Copilot [5], an AI-assisted software tool that uses code models to generate code snippets and subprograms that engineers can adapt and integrate into their codebases.

There have been numerous efforts aimed at both improving the techniques and models that power software tools (both AI-assisted and traditional) and exploring what tasks they can support [6]–[9]. However, there is a dearth of understanding about how to build and deploy these tools such that they will be adopted and then effectively used beyond adoption. We know from prior work that developers only use tools that they trust [10]; however, we know much less about how trust is formed and what factors affect its evolution over time in the context of software tools.

To help fill this gap, we conducted a qualitative investigation to better understand the key components of trust formation and evolution when adopting and using software tools. We interviewed 18 engineers across and external to the Microsoft organization to answer the research question “What factors influence engineers’ trust in software tools?”. Our findings identified important factors, along with concrete examples, and serve as guides for those seeking to foster trust around their tools.

Based on these findings, we introduce the PICSE framework which organizes factors into five high-level categories: Personal, Interaction, Control, System, and Expectations. While many of the factors in the PICSE framework hold for the majority of tools, we do find some differences in trust dynamics between AI-powered software tools and so-called “traditional” software tools. Finally, as AI-assisted tools have often been compared to artificial team members (e.g., Copilot, is so named in an effort to anthropomorphize the AI into “your pair programmer”) we compare and contrast engineer–engineer trust dynamics with engineer–tool dynamics.

The main contributions of this paper are as follows:
- We contribute a conceptual framework, called the PICSE framework, that outlines factors that impact the formation and evolution of trust in software tools (Section III).
- We outline guidance on considering and applying the PICSE framework in practice to increase tool trustworthiness (Section V and Section VI).

## II. METHODOLOGY

### A. Research Question
We designed our study to answer the question: What factors influence engineers’ trust in software tools? For the purpose