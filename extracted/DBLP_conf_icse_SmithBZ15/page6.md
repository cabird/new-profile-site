test in OneNote. When she was finished, OneAuto had become fully generic, and its name changed to xAuto. The Word team quickly adopted xAuto, and the tool began to spread within Office.

Later, Barbara moved from OneNote to the Project group inside Office and was replaced by Edward. Edward had formerly worked with Adam and had previous experience with genetic-algorithm-driven smart monkey testing. He continued to champion the project as it spread within Office. Eventually, Claire became a test lead, and switched from developing xAuto to managing it. A “virtual” team built of developers and testers from across Office, headed by David, currently maintains the tool. As of today, every team inside Office has added support for their product to xAuto, and the tool has become ubiquitous within Office.

### C. DiffButler

One popular homegrown tool within Microsoft is Odd, a diff viewer. Frank was a heavy user of Odd, because he likes to have a reference of what changes he’s made in a code file. However, after becoming annoyed at how often he had to switch windows between Odd and Visual Studio, Frank decided to write a tool.

DiffButler is a Visual Studio add-on that highlights lines and tokens that a developer changes. If a file is tracked in source control, DiffButler will use the last version checked into source control as the base file rather than the file as it exists on disk. While Frank has told his immediate team about DiffButler, he thinks no more than one or two of them use it. Frank said that while some developers might find inline diffing valuable, others might not need it.

DiffButler is shared on a Microsoft-internal site similar to SourceForge or GitHub that hosts downloads, issue tracking, and source control for homegrown tools inside Microsoft. Frank usually updates DiffButler to work with new versions of Team Foundation Server or Visual Studio once every few months to annually. The most recent version has more than 300 downloads.

### D. MemSpect

About three years ago, Grace was assigned a memory leak bug in Visual Studio — when a certain feature was exercised in a loop for 20 hours, a memory leak occurred which eventually starved the host machine of memory. Grace realized that the only way to track down the bug was to write a tool that could inspect Visual Studio’s memory while it was running. Grace searched for existing tools, but only found tools that worked on fully native code. At the time, Visual Studio had begun to transition to being a hybrid managed and native application, preventing the existing tools from being useful. To track down and fix the bug, Grace wrote MemSpect.

Gradually, Grace gained a reputation as “the memory guru”, and as her colleagues came to her with memory issues, she taught them to use MemSpect. MemSpect gradually spread further as Grace presented it in various contexts. MemSpect even won awards inside Microsoft.

MemSpect is developed entirely in Grace’s personal time; although it now has hundreds of users by her estimation, it does not contribute directly to Grace’s team’s bottom line, and so she does not receive time allocation for it. While she has received many requests to add support for 64-bit applications to MemSpect, it is unlikely to be implemented because Visual Studio is 32-bit.

## V. WHEN AND WHY DO TOOLBUILDERS BUILD TOOLS?

We have described who builds tools and the types of tools they build. We also investigated the conditions, needs, and desires that led to building a homegrown tool.

By our definition, developers do not build homegrown tools because they are told to. Rather they make the choice themselves as a result of internal and external factors. We posit that at some point, developers decide that the cost of building a tool is outweighed by the cost of continuing without it. At this “creation moment” a developer begins building a homegrown tool. We describe each in more detail here. Note that often, more than one of these factors may come into play when deciding to build a homegrown tool.

### Save Time

The most common reason for developers to build tools is to reduce the time a process takes to execute. This could be something that they would otherwise have to do manually or something that takes time on their team. For example, Test Pass Monitor is a tool that checks if Windows test runs have completed or have stalled; previously this check was performed manually, and the responsibility for performing it cycled through the team. By writing a tool that does this, the team was able to eliminate the distraction of micromanaging test runs and put that time back into their cycles. The MSMQ viewer developed by the Office Engineering team allowed the team to spend orders of magnitude less time debugging errors involving the Microsoft Message Queuing system in Windows Server, by enabling them to quickly see an overview of the contents of a queue and edit messages dynamically.

### Help Others

People are empathetic by nature; sometimes they express empathy through altruistic toolbuilding. Some developers expressed their wishes to make other people’s lives easier, and built tools to address pain points for team members.

### Reduce Pain

We posit that developers might have a lower pain threshold for automatable activities than other demographics, due to their ability to automate many of their daily tasks. This ability to automate can make manual tasks more annoying or mentally painful, leading developers to automate away these annoying tasks. This was particularly the case for the tool Build Status Monitor, which exists primarily so that its developer could stop having to manually find build identifiers present in a build’s directory structure, a process the developer found irritating.

### Personal Need

We coded responses as reflecting a personal need if they contained a statement about the developer’s own needs separate from their business needs or team needs. Personal differences between a developer and their environment might lead them to write tools that address those specific differences. DiffButler is an example of a tool motivated by a personal need.

### No Known Solution

The most common reason people report building tools is because they are not aware of an existing tool that does what they want. In some cases, such tools may exist, but while Microsoft has internal sites for sharing tools, not all developers share their tools on them. When they do, their tools still might not be discoverable enough to prevent all duplicated work.