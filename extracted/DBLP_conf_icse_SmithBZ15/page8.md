and the ways that they have had impact in terms of users and time savings.

### Cross-Product Collaboration
Within Microsoft, different products have a significant distance between them, and are often developed in entirely different infrastructures. However, some grassroots tools displayed collaboration across products. Most of these quotations originate from interviews related to xAuto, but DiffButler, MSMQ Viewer, CrunchNet, and MemSpect have also crossed product boundaries.

### Sanctioned Channels
Microsoft contains a number of official channels where developers are encouraged to share side projects. These include:
- The Garage, a Microsoft-wide hackerspace that offers trainings, hosts talks on new technologies, and has weekly hack nights and demos where Microsoft employees and interns can share side projects
- Organizational hackfests, events where all teams in a particular organization create, pitch, and execute ideas
- Organizational “science fairs” or other presentation days, where engineers can register a booth or talk about their side project and demonstrate it to their peers and managers
- Less formal presentations and brown bags (informal lunch presentations) within teams or groups of closely-linked teams

Many of the tools from our sample were influenced by these sanctioned toolbuilding channels. The developers of VSO Cortana were encouraged by the Garage community to develop their app, and got the idea to make it cross-platform after a demonstration on Xamarin hosted by the Garage. We met the VSO Cortana developers at a Bing Science Fair, an annual event where developers are encouraged to present their tools to their peers and compete to receive recognition by a panel of expert judges. The authors met the developers of Damascus and CrunchNet at the same science fair. Damascus developers credit the science fair with giving them motivation to finish Damascus: “We had the code, and then we saw the science fair stuff, and thought maybe we should finish it for that, so again we talked to our manager and said we need to be able to spend time on this.” Suite Ninja was proposed and developed during a similar Hack Day.

### Collaboration
Collaboration was typical in the tools studied. Since homegrown tools aren’t subject to the security constraints surrounding product code, it is easier for developers to collaborate on them. For example, xAuto’s current maintainer David described it in our first interview as “essentially an open source tool within the Office community.” Of the other tools whose creators we interviewed, the MSMQ Viewer, Watchdog Video Viewer, MemSpect, and Suite Ninja were developed collaboratively.

### Direct Contact
One of the most common ways tools spread is by their developers telling other people about them. The developer of Watchdog Video Viewer said that his users found out about his tool by, “basically my telling them.” When the developer of Test Pass Monitor started using it to replace his own shifts manually watching tests, he configured the tool to send an automatic email with a link to the tool’s internal project page to the testers who owned the current test run. To some extent, all of the developers we interviewed had directly spread their tool to new users.

### Hierarchical Spread
Many tools in our dataset spread hierarchically throughout Microsoft – spreading up the corporate hierarchy from a developer to a manager, and then out to the rest of that manager’s reports and peers. This is most common in environments that are more receptive to toolbuilding; xAuto notably had a number of management evangelists early in its lifespan who assisted its spread from the OneNote team to others inside the Office organization. In another instance of hierarchical spread, the developer of Test Pass Monitor related how his tool came to be used by the rest of his organization: “My manager’s manager found out about it, and scheduled a meeting with all the other leads in my group. I gave a quick presentation on how the tool works, and from there it spread.”

### Team Use
The first people a developer tends to share a new tool with are those nearby – namely, their team. Each of our interview tools had users on the developer’s team, with the exception of VSO Cortana and Damascus, which are currently unreleased.

### Low Barrier to Entry
Some of our quotations explicitly discussed the low barriers to entry that their tool exploited, leading to more rapid adoption of the tool. xAuto is a particularly good example of this, having hit several sweet spots early on. As one xAuto developer put it, “Since [xAuto] was built on a shipping extensibility model, [and] each one of the testers had to test extensibility for their feature in general, they had the knowledge of how to write the ability to add a page, or whatever features they had… they just needed to plug it into this framework, and I tried to make that as straightforward as possible.” Additionally, xAuto required no installation – “you just had to have the exe on the machine.” Later, as xAuto was spreading through Office, it benefited from having a reserved lab for xAuto runs – meaning that new teams didn’t have to allocate computing resources to run xAuto. Without taking advantage of these previously existing systems to create low barriers to entry, xAuto and other tools might not have spread as far.

### Uncertain Spread
Many developers we talked to were uncertain of the extent to which their tools had spread. This was usually the case for personal tools that the authors had shared on internal sites, since they had no way of knowing the active users of their tool beyond how many times a particular version has been downloaded. The developer of the Build Status Monitor tool said, “I’m not sure what the usage of the tool is,” and the developer of Watchdog Video Viewer similarly said, “I don’t know if anyone else has used it on a regular basis. I know about 56 people have downloaded the tool.”

### Needs Differences
Differences in the needs of user groups affects the spread of tools. As the author of DiffButler said in an interview, “I still have the hunch that there are varying types of developers out there, and some don’t need this and some do.” While individual differences might prevent someone from using a personal tool, organizational resources and needs might preclude. For example, differences in the overall quality goals between Bing and Office mean that Bing is very unlikely to use xAuto.

### Social Spread
Some tools spread via a social network. In a large company like Microsoft, many developers have previously been on different teams with different people. When developers move