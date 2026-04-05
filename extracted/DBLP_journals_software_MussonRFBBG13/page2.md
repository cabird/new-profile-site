communication tool. (For more information, see the “Lync” sidebar.) Specifically, we cover our techniques and experiences in using live data, combined with interactive surveys, to analyze performance. Our performance-monitoring approach has been successfully deployed, has improved development decisions, and is continuously in use with a large-scale enterprise-level software service.

> Lync
>
> Lync is a large-scale enterprise communication system. In its current version, Lync supports a vast number of features from awareness of user presence to large-scale meetings. It also supports IP telephony, video-conference calling, and whiteboard sharing, and integrates with address books, calendars, email, and even word processors. As such, the Lync development team is large and contains many different members, with different subsets of the team responsible for different features and aspects of the tool.

## Background

We start with a brief description of Lync itself, then discuss real-world performance and provide examples of the types of questions that project stakeholders often ask.

### The Lync Application

One major issue for an application such as Lync is maintaining acceptable levels of responsiveness across its many features—for instance, even if a text messaging feature is quick, if looking up a name is slow, then users will feel dissatisfied. Thus, as new features are developed and tested, the development team might need to modify what data collection occurs at a low cost.

Lync has recently moved toward a rapid release cycle. To accommodate this change, versions must be compatible with each other, so there’s a tendency to mutate previous versions rather than start from scratch. In this new model, the available time for the stabilization phase of development decreases. Rather than reaching feature completion and then focusing on performance, Lync examines the performance of each scenario during the entire development cycle.

## Finding Performance in the Real World

The ultimate measure of application performance is whether users are happy with the application’s responsiveness. This is subjective and difficult to directly measure (see the “Related Work in Performance Testing” sidebar).

Past versions of Lync periodically solicited performance testers’ judgment—they would ask users if a particular scenario “feels okay” or “isn’t slow.” However, because this information wasn’t connected to logged outcomes, it remained difficult to assess performance over an application’s development.

The Lync user-experience team has long set target specification values as goals for performance—for example, “A video conference should connect within 500 milliseconds.” However, these would often be measured only in laboratory testing.

In this article, performance refers only to the wall-clock time of a given network-bound operation. We divide the user experience into a series of scenarios—each is a discrete operation or set of operations that doesn’t require user intervention.

Testing performance in a laboratory is both costly and inaccurate relative to real-world use. On one hand, test matrices must be written to cover each possible combination of external factors and scenarios, and testers must walk through multiple scenarios to measure them. It can be difficult for a laboratory to simulate the possible external conditions that users routinely experience. For example, it’s hard to imagine a test matrix that would cover one colleague working in Africa calling another in Europe, initiating screen-sharing during the conversation, and adding in a third colleague one office over.

Some of these externalities can be simulated in vitro by randomly dropping packets, introducing delay, or misrouting traffic, but the sheer amount of variation in real-world environments is nearly impossible to replicate. Our solution is to embrace and operate directly in these environments rather than try to reproduce them.

### Analytics Questions

With the many different features in Lync, project stakeholders are beginning to ask nuanced questions about performance to understand how aspects of application usage affect it:

- What is the relative impact on performance if everyone uses Lync for four-person meetings, eight-person meetings, and all-hands meetings?
- What is the performance difference of four people talking versus one person presenting while three are watching?
- Are there differences in performance by geographic region, distance to servers, or time of day?
- Does server type affect performance?

Answers to these questions can help project members make decisions