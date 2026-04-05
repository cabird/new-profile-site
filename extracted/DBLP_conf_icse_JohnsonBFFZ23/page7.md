> and making sure “to support new technology as it comes out.”

> “Anything that is not getting updates is suspicious. [...] Getting to the more technical, software that is maintained consistently, that is actually supported versus something that someone built in 2003 and packaged for download. Naturally, when it comes to the security folks, anything that is not receiving updates is suspicious.” (P15)

### Performance

Finally, and possibly obviously, performance emerged as a relevant consideration with respect to trust in software tools. Our findings suggest that trust may be higher in tools that are performant and lower in tools that exhibit performance issues. P7 summed up the sentiments of several of our interviewees, stating,

> “It should be performant and reliable. If it’s taking too much time and making the computer slower and all those things, then you lose that trust, because it’s not worth it.” (P7)

## E. Expectations Factors

Expectation factors represent tool users’ considerations regarding expectations they have built from their own experiences and would like tools to consider. The factors in this category include transparent data practices, style matching, goal matching, and of course meeting expectations.

### Transparent Data Practices

According to engineers in our study, trust is increased when there is visibility into the data behind the model. This includes licenses, data sources, and guarantees, such as legality, regarding data being used. For engineers in our study, this boiled down to where the data is coming from and how the data users contribute will be used.

> “Let’s say that you’re using some software tool. Do I trust that this is not selling my data to some third party versus do I trust that it’s not going to give me bogus information or it’s not going to break my [code].” (P4)

### Style Matching

We find that when building trust, it is also important to provide contributions or suggestions that match the coding style that their project is using. This factor was much less prevalent in our data than others. But for some engineers, like P10, they expect “reasonable” contributions that “follow the same style as any other code in the file.”

### Goal Matching

This factor conveys the importance of making contributions that map to the goals of the engineer using the tool at the time they are using it. Of course goals vary by task; as does the way goal matching can be implemented.

> “To me, it’s a tool [...] that are tuned to my context. That can mean a number of different things. It can mean it’s only relevant to what I’m working on right now versus the whole system. Or it can mean maybe something like prioritization, it’s showing me the most critical things first. It’s not wasting my time, essentially.” (P12)

Engineers in our study realize that goal matching may not always be easy, or even feasible, to achieve. We find that the current landscape of AI-assisted debugging tools may not lend themselves well to goal matching. This is because it is not obvious if and how the tests generated, bugs found, and fixes suggested would match with what they wanted to accomplish (or the scenarios they care about). This was especially the case for the idea of AI-assisted test generation, which P2 noted “can never know what scenarios I care about.”

### Meeting Expectations

As implied by the emergence of the Expectations category, engineers develop expectations regarding the tools they have and will use. This factor represents the setting expectations and then meeting set expectations. Generally, according to P11, “you break trust when the outcome is not as expected,” so it is important to adequately communicate about the tool to help engineers set appropriate expectations.

> “That’s certainly something when thinking about the design or how to just give verbiage that describes how the tool will work. You want to be cognizant of making sure that you’re very accurate with those expectations.” (P8)

Put it plainly, and in the words of P4, any given tool

> “should really be good at one thing.”

Our findings suggest tools should be explicit and upfront about what the tool can and cannot do in order to build trust.

## IV. THREATS TO VALIDITY

### External

We conducted our interviews by selecting developers across Microsoft and working in industry, including those with experience in open source and small startups. We asked interviewees to refer others we should talk to, and endeavored to diversify the pool of developers in our study. While we continued to interview and code until saturation was reached, the extent to which our findings generalize across settings may be limited and warrant some future research.

Findings reported in this paper are based on a qualitative study conducted with a convenience sample of 18 engineers, mostly located in the US. We report our findings in the form of aggregated, emergent categories and the factors that our data suggests are relevant. While quantitative insights provide useful information, prior work has cautioned against using quantitative methods on qualitative data [16]. Therefore, we center the discussion in this paper on the qualitative insights gathered rather than frequency of their occurrence.

The goal of our research was the identify and categorize factors that contribute to trust. As with most qualitative studies, we endeavoured to identify as many unique factors