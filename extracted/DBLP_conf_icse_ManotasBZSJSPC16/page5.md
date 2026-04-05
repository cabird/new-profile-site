![Bar chart of practitioner responses](page5_img_1.png)

Response: Never, Rarely, Sometimes, Often, Almost Always

Figure 3: Requirements-related statement and responses from experienced practitioners.

concerns are not influencing the requirements and goals of the applications and services that run on the data centers. Both sides seem to agree on the cause of this disparity. One program manager summarized it as follows:

> Our main concern is marketshare and that means user experience is a priority. We can be more efficient to try to cut costs, but since we don’t charge by energy used this doesn’t make us more attractive to users. So we tend to focus on other things like performance or reliability.

For the embedded group, we found several reasons why practitioners do not have requirements or goals about energy usage. First, many embedded products are not battery-powered (e.g., “In our embedded systems, we always have access to power so energy is not a concern.”). Second, many practitioners are concerned with the overall energy usage of their systems but rely on the hardware, not the software, to reduce energy usage. Finally, satisfying other metrics is more important than reducing energy usage (e.g., “Ensuring the deterministic, real-time behaviour of our embedded device is more important than saving energy.”).

### 3.2 Perspectives on Requirements

Our survey statements concerning requirements focused on whether practitioners have experience with energy usage requirements (see Section 3.1), what typical energy usage requirements look like, and how often practitioners make tradeoffs between other features and energy usage.

Energy requirements are more often desires rather than specific targets. In addition to their Likert responses to Statement S1, we also asked experienced practitioners to provide an example of an energy requirement or goal. The majority of the provided examples are what we consider desires rather than detailed requirements. For example, one respondent said that they have “no specific goals for energy usage, just ‘don’t be bad’.” Another respondent indicated that “considerations on background tasks as well as things that use the radios in phones are always in the back of my mind” and a third stated that, “the goal is to accomplish something without making the user annoyed about battery drain.” Although desires are more common, detailed requirements do exist in some cases. An interesting example is: “turn-by-turn guided navigation should not drain more battery than a car can charge.” In addition, a few respondents indicated that they have had requirements similar to “perform[ing] [user scenario] should not use more than X mA” or “under normal usage, a device with an X Wh battery should last for Y hours.”

Energy-usage requirements are often stated in terms other than energy usage. It is also interesting to note that many of the example goals and requirements are expressed in terms of things other than battery life or energy usage. We believe that this is likely due to the lack of tool support for measuring energy usage (see Section 3.5). As a result, requirements are often written in terms of more easily captured metrics that practitioners believe correlate with energy usage. In some cases, these are traditional performance metrics. As one respondent stated:

> I don’t usually think about battery life directly. Often I consider running time [...] and that ‘seems’ to suggest battery life.

In other cases, they are countable events (e.g., “We tried to optimize for when/how often we wake up the radio.”). It is interesting to note that some practitioners are aware that such proxy measures may not be accurate:

> Most people think power savings = CPU reduction.  
> This is somewhat true in a broad sense, but is only a small part of the picture. The problem is that it’s easy to measure CPU utilization (and hence reduction), but it’s very hard to translate any of this to actual power savings. Many people have spent a lot of time that ultimately had no benefit.

Unfortunately, this misconception is common and is an example of the levels of uncertainty that even experienced practitioners have (see Sections 3.3 and 3.4). Finally, there are requirements and goals that are defined in terms of previous or alternate versions, or as one respondent expressed it, “‘not worse than’ kinds of requirements” (e.g., “New feature additions or architecture changes shouldn’t regress battery life.” and “I had a requirement that energy usage in our primary scenario be comparable to the legacy solution.”).

Energy-usage requirements focus on “idle time.” A common theme in our interviews and survey responses was the importance of reducing energy usage when a user is not interacting with their device. As one participant stated:

> We’re trying to prioritize idle battery consumption down to zero. Being active is going to drain the battery. But the thing that’s going to piss people off, is if I wasn’t using it and my battery is dead so that’s where we want to focus our efforts.

In fact, one participant was so focused on idle time that they were surprised by the suggestion that non-idle time portions of an execution should also be optimized: “I haven’t thought about that, actually, when an app is in the foreground and we’re trying to still save battery in some way.”

Practitioners are often willing to sacrifice other requirements for reduced energy usage. Figure 3 shows, in the same format as Figure 2, a summary of experienced practitioners’ responses when asked how frequently they are willing to make tradeoffs between other requirements and energy usage. As the figure shows, respondents are overwhelmingly willing to make sacrifices to improve energy usage (80% of respondents answered Sometimes, Often, or Almost Always). As several respondents stated: “There is always a tradeoff between battery life vs performance/feature” and “the entire experience was a series of compromises between what designers wanted and [...] battery concerns.” In fact, only 5 respondents answered that they Never make such compromises.

### 3.3 Perspectives on Design

Our survey statements concerning design focused on how energy concerns impact different aspects of the design process, including the contexts that practitioners consider when assessing energy usage and the extent to which they believe there exist general patterns that lead to reduced energy usage and anti-patterns that lead to increased energy usage.