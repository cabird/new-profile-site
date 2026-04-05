## III. USE OF CODEFLOW ANALYTICS BY PRODUCT TEAMS

As CFA has been available for two years, a number of teams have begun to use it. In an effort to understand why and how they use it, what the impact has been, and how we can improve CFA, we contacted teams to ask them about their experiences.

### A. Methodology for interviews

When CFA was initially created, we created two mailing lists, “CodeFlow Analytics Discussion” and “CodeFlow Analytics Support” where people interested in using and asking questions about CFA could send messages. Traffic on these mailing lists gives an indication of who is using CFA, what they are doing with it, and the difficulties they are running into. We solicited fifteen people who had previously participated in these mailing lists for a short fifteen-minute interview and were able to conduct nine interviews with a total of eleven people.

The interviews were conducted online and were recorded so that we could refer to them later. Interviews lasted between fifteen and thirty minutes. We chose a semi-structured interview style as that allowed us to obtain information about our general areas of interest while still allowing flexibility to pursue interesting avenues of discussion as the interviewee brought them up [21]. We asked about the following topics during our interviews:

- The background and current role of the interviewee.
- How the interviewee found CFA.
- What the intended purpose of using CFA was.
- How the interviewee used CFA.
- What the impact of their work using CFA was.
- What went well and what challenges they encountered using CFA.

For analysis, we took notes during the interview and also listened to each interview again and took additional notes relative to each area of questioning. We then met together to discuss our notes and common themes that emerged from the interviews. The following subsections contain a discussion of what we learned regarding the topics that we asked about. In cases where we provide quotes, we have removed disfluencies (e.g. “um” and “ah”). We stress that our goal was to understand how teams are using CFA, what they are accomplishing, what went well, and what their pain points are. This investigation was purely qualitative and does not attempt to achieve statistical significance.

### B. Background and Role

All of those interviewed were either managers of development teams or individual developers, though one interviewee was a tester when he originally began using CFA. We observe that nearly all activity on the CFA mailing lists comes from development managers and developers, indicating that they are the most interested in using data regarding code reviews. Very little discussion comes from program managers or upper management. One interview was with a vendor (a contractor working for Microsoft), while the others were all full time Microsoft employees. The projects that the interviewees currently work on were intentionally diverse so as to give a broad perspective [22], and included Visio, Bing, OneNote, Xbox, Excel, Office Internationalization, Visual Studio Online, Microsoft Dynamics, and an internal IT ticketing system. This diverse set of teams gives us confidence that if broad consensus for certain topics in our interviews emerged, they are likely representative of CFA users. Geographically, most interviewees are in Redmond, WA, with four others coming from Brazil, North Carolina, and India (2).

### C. How is CodeFlow Analytics discovered?

In a company as large and diverse as Microsoft, we have observed that it is not always easy to find something, even if you know that it exists. Conversely, it is hard to publicize a new project or tool to the right people across the entire company. Nonetheless, CFA has achieved a fairly broad adoption. In an effort to understand how people came to know of CFA, we asked them how they found out about it. The answers we were given were diverse and there was no clear consensus that emerged. Some interviewees were told about CFA from friends or coworkers who had used or heard about it. When we first made CFA available, we publicized it by making informal presentations to engineering teams and making announcements on the “CodeFlow Users” mailing list. Some of the interviewees saw the announcement at that time and “decided to try it out.”

One finding that we had was that those people with a concrete purpose and a good idea of what they wanted to do were more deliberate in trying to find code review data when they discovered CFA. They either asked on the CodeFlow users’ mailing list (we are on this list and respond to such requests), or they searched for code review data on CodeBox, an internal SourceForge-like site for hosting community side-projects at Microsoft, and found CFA.

> Just because you build it, doesn’t mean they will come.  
> Matching the right producers to the right consumers is a problem of large organizations. People’s habits when looking for systems like CFA are diverse, therefore creators should pursue several avenues including informal talks, announcements on mailing lists and forums, and web locations (internet and/or intranet) to promote their service.

### D. How is starting with CodeFlow Analytics experienced?

Most people started with either the Excel template or with direct access to the database. We observed that most exploratory people used Excel, whereas people with a clear goal used either the database or Excel. Interestingly, those that used the direct database access tended to not use Excel.

Two people said they started by looking at very simple things such as how many reviews and how many comments their team had recently completed so that they could get accustomed to the data. One aspect of this was developing trust in the system and the data. We observed a common pattern of starting simple, then moving on to more sophisticated queries, and finally pursuing the actual goal. Several engineers mentioned that the CFA web page was very helpful in getting started.