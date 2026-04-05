practices, but specifically in the context of AI-assisted tool development).

As implied by the diversity and volume of factors in the PICSE framework, trust is built, broken, and re-built beyond initial adoption and use. The factors discussed regarding pre-adoption trust building would apply beyond adoption, but there are additional factors that can only be assessed upon use. Less obvious are some of the possible distinctions between factors as they pertain to trust between different entities, which we discuss next.

## VI. Differences in Trust

The focus of our study was on engineers’ trust in their software tools. While the PICSE framework is meant to be applicable to any kind of tool, our findings suggest the potential for differences in to what extent certain factors weigh in on the process of trust building.

### A. Traditional vs. AI-assisted Tools

One goal of this work is to better understand differences that may exist between trust in and use of traditional software development tools versus AI-assisted tools. Our findings suggest that there are in fact nuances to how engineers think about trust in AI-assisted tools, some of which are motivated by unique challenges to developing AI-assisted software tools.

According to engineers in our study, it might be more difficult to develop a trustworthy AI-assisted tool in comparison to traditional software tools. One reason for this is that engineers view AI as “fundamentally closed source,” or less compatible with open source than traditional tools. While it is possible for the implementation of an AI-assisted tool to be made open source, the underlying model is much more difficult to make open source.

AI-assisted and traditional tools are both affected by the factors outlined in the PICSE framework. However, our findings suggest that some factors may be more important with respect to AI-assisted tools than they are when it comes to trust in traditional software tools, such as safe and secure practices and contribution validation support. Furthermore, while expectations may be initially low for any tool, engineers’ expectations are higher for the growth and evolution of AI-assisted tools. They expect AI-assisted tools to be smarter and therefore improve with time in comparison to traditional tools.

Our findings also suggest that developers may trust AI-assisted tools more than they trust traditional tools when it comes to certain tasks. One common comparison was between the AI-assisted tool Copilot and the traditional tool IntelliSense. Because Copilot is not aware of the user’s codebase but IntelliSense is, engineers may be more likely to trust tools like Copilot for “boilerplate things” that are not necessarily specific to the current project or domain and use IntelliSense for more project-specific tasks.

Related to this is the fact that some tools may be especially ill-suited to AI-assistance in the eyes of engineers. In particular, our findings suggest debugging tools may be more difficult to make useful, and thereby trustworthy, for engineers. This is where factors such as goal matching and control become especially important.

### B. Tools vs. Collaborators

One connection that has been made and discussed with the increase in availability and use of AI-assisted tools is whether these tools are comparable to human collaborators [17]. Inspired by this line of work, our study included questions about trust in collaborators. In collecting this data, we gathered some interesting insights on similarities and differences between how engineers think about trust in collaborators and trust in tools.

For most of our interviewees, trust in collaborators and trust in their software tools required similar interactions. Though we never explicitly asked in our interviews, a handful of our interviewees explicitly compared and contrasted collaborators and tools when it comes to trust building in software development. More specifically, interviewees often made comparisons (or contrasts) between humans and tooling backed by AI.

Most of our interviewees felt that contributions made by AI-assisted tools are quite comparable to human contributions. As with their collaborators, engineers expect AI-assisted tools to get better with time. They make similar considerations when evaluating the contributions made by both humans and AI-assisted tools, such as consistency and educational value.

But for a handful of other interviewees, given the nature of AI, there is at least one important distinction between human collaborators and AI-assisted tools. That is the fact that additional vigilance is required when reviewing and integrating contributions made by AI-assisted tools.

## VII. Related Work

While ours is one of the first studies focusing on trust in the context of software engineering tools, research has been done that examines trust in the context of AI systems, professional teams, and software development. While none of these studies examine trust in the context of software engineering tools, they all explore trust in one way or another and most have findings that support one or more factors in the PICSE framework.

### A. Trust and AI

More than 20 years ago, Fogg and Tseng proposed that “computer credibility” would become increasingly important and offered perspectives in an effort to promote further research. They posit that credibility comprises two key components: trustworthiness and expertise. Their findings of types of credibility map clearly to factors we uncovered in interviews. For example, “reputed credibility” describes how much the perceiver believes something because of what third parties have reported, similar to source reputation, while “surface credibility” refers to the perceiver’s view of the system based on a simple inspection, similar to ease of installation & use and polished presentation.

Omrani [18] recently explored trust in AI based systems in general and found that the sector where AI technology is applied can influence the level of trust in AI and that