# Improving Developer Participation Rates in Surveys

Edward Smith  
Robert Loftin and Emerson Murphy-Hill  
Christian Bird and Thomas Zimmermann

Computer Science  
Computer Science  
Microsoft Research

University of Maryland, College Park  
North Carolina State University  
tedks@cs.umd.edu rtloftin@ncsu.edu, emerson@csc.ncsu.edu {cbird,tzimmer}@microsoft.com

> Abstract—Doing high quality research about the human side of software engineering necessitates the participation of real software developers in studies, but getting high levels of participation is a challenge for software engineering researchers. In this paper, we discuss several factors that software engineering researchers can use when recruiting participants, drawn from a combination of general research on survey design, research on persuasion, and our experience in conducting surveys. We study these factors by performing post-hoc analysis on several previously conducted surveys. Our results provide insight into the factors associated with increased response rates, which are neither wholly composed of factors associated strictly with persuasion research, nor those of conventional wisdom in software engineering.
> 
> Index Terms—software developers; participation; surveys

## I. INTRODUCTION

Understanding software developers’ practices and perceptions is critical to doing software engineering research that has a significant impact. One way that researchers can increase our understanding of these practices and perceptions is by performing surveys of software developers. Surveys have become one of the primary techniques used to conduct software engineering research [1]. Under the right conditions, email surveys can have response rates as great or greater than those of postal or fax surveys, and the quality of email responses may be superior to other methods [2], [3]. Such surveys often take the form of a webpage, where respondents answer a variety of closed- and open-ended questions. Potential survey respondents are then asked to complete the webpage via a recruiting email.

Enticing a substantial number of developers to answer a survey remains a challenge. For example, Molokken and Jorgensen lament the low response rates in several surveys on software estimation [4]. They postulate that the low response rates likely contributed to response bias, meaning that the few developers who do respond to such surveys are not representative of the community of developers as a whole. Indeed, Kitchenham and colleagues’ guidelines for survey design suggest that non-responders may bias results [5]. Seven papers at the 2012 International Conference on Software Engineering reported on surveys, of which 5 included data on response rates. Of those, response rates ranged from 6% [6] to 64% [7]. Clearly, response rates could stand to be improved.

Why do some survey efforts elicit many responses, yet others recruit so few? How can researchers design surveys to increase participation? Researchers in other fields have investigated the problem of improving survey response rates [8], [9], including within organizations [10]. However, beyond general guidelines for surveying software developers [5], we are not aware of any work in improving survey response rates in this population. Thus, the contributions of this paper are:
- a set of factors designed to improve response rates in surveys of software developers; and
- a study of our factors based on 11 previous surveys.

## II. FACTORS

Our factors for improving developer response rates to surveys are divided into two subsections. The first draws on persuasion research, which has been applied in other fields to improve compliance [11]. The second draws on previous literature in conducting surveys, and our own experience.

### A. Persuasion Research

Persuasion is a well-established field of study in behavioral economics and psychology. Here we summarize persuasion research from these fields, and explain how this research can be used to positively affect survey response rates.

Reciprocity: One strong recurring theme in persuasion research is the tendency for people to comply with a request if they feel they owe the requester a favor. In one early study, participants would purchase many more raffle tickets after being given a soft drink by a confederate—to such an extent that their purchase would commonly exceed the price of the drink itself [12]. A material gift is unnecessary for a reciprocity effect. For example, Cialdini’s “door in the face” technique works via the “gift” of a less extreme offer [13]. Researchers can induce reciprocity by providing an incentive to all potential participants, such as a small gift card, regardless of whether they participate. While we are unaware of this technique being used in software engineering, this technique is capable of more than doubling survey response rates [14], [8].

Consistency: Humans experience pressure from cognitive dissonance when they act contrary to their previously stated or inferred intentions. Consistency pressure affects not only overt actions, but also thoughts, feelings, and motivations. Making small commitments causes changes in self-image that can provoke compliance with a much larger request, as a result of consistency pressure to adhere to this new self-image [15].

---

People will continue to comply with agreements they have previously committed to, even if the deal has been altered out of their favor [16]. Consistency pressure is even stronger if the prior commitment was public [17].

Researchers can apply consistency by approaching candidates early and asking them if they would be willing to take a survey at some point in the future. We used this approach to recruit interviewees in an earlier study [18].

### Authority and Credibility
Compliance rates rise with the authority and credibility of the persuader. In some cases, this is extreme — for example, nurses will readily administer lethal dosages of restricted drugs based on only the knowledge that the order came from a doctor [19]. The effects of credibility extend even beyond what might be strictly rational, in that people will comply with requests from a perceived expert even if the expert’s domain is entirely different from that of the request [20].

Researchers can invoke authority and credibility by using the official titles in a recruitment email’s signature, such as Doctor, Professor, or Senior Research Scientist. Authority and credibility may also be indirectly obtained by specifying the researcher’s affiliation with a respected group or organization [9], such as Microsoft Research.

### Liking
People are more likely to comply with a request from a person they have positive affect towards. This is an instance of a cognitive bias termed the halo effect, which causes positive perceptions of an individual in one attribute to effect judgments of other attributes [21]. Researchers can create liking by using the person’s name [22] or asking how they are feeling [23].

### Scarcity
When something is scarce in any way, such as having a limited supply, or a time limit on a decision, humans are powerfully moved towards compliance. Even the hint that knowledge of the scarcity is itself scarce can greatly increase compliance [24]. Scarcity is most persuasive in situations where the scarcity is due to the interest of other people (such as the Cabbage Patch Kids fad) or when the scarcity is a novel condition [25] (or optimally, both).

Researchers can convey scarcity by stating that a survey will only be available for a limited amount of time or by stating that only a few people were selected to participate. Scarcity can also be conveyed by explaining to potential participants why they were selected, if the selection criteria is exclusive. For example, if a researcher wants to survey only developers who work on build systems, mentioning that may increase the impression of scarcity. This has the added advantage of improving the likelihood that the developer will find the topic of the survey interesting. Such use of “issue salience” has been shown to increase response rates in email surveys [26].

## B. Factors from Survey Literature

### Brevity
A shorter survey will generally require less effort for a developer to complete than a longer survey, and will likely be more appealing to complete. Edwards’ research suggests that respondents are more likely to complete shorter surveys than longer ones [27].

Researchers can make a survey more brief by asking fewer questions, less complicated questions, or questions that are closed-ended. Researchers can communicate that their survey is brief by giving an estimate for how long the survey should take. Researchers can also help potential participants gauge how long it would take by either placing the entire survey on one webpage so that a potential respondent can estimate the length, or by placing it on several webpages with a progress bar, so that the respondent can extrapolate.

### Social Benefit
Potential participants may be more likely to respond to surveys if they see that their responses will benefit society, rather than a private entity. For example, Edwards’ study found that people are more likely to respond to universities than commercial entities [27].

Researchers can convey social benefits of their research by explaining the expected impact of the results, such as building better software tools. Researchers can also explain that the research results will be published and available to the public.

### Compensation Value and Likelihood
Respondents may be promised compensation or the possibility of winning compensation at random (a lottery). Edwards’ study of mail surveys suggests that monetary incentives increase response rates [27]. VanGeest and colleagues’ literature review suggests that monetary incentives increase the participation of physicians in surveys, although there appears to be little difference between large and small monetary incentives [9]. They also found that non-monetary incentives usually had little or no impact on response rates, and that prepaid incentives tended to work better than lottery incentives [9]. Likewise, Porter and Whitcomb found that lotteries had little or no effect on student participation in surveys [28].

A researcher can compensate participants by, for example, giving them money, a gift card, or a prize. For example, in a previous study, interviewees were given their option of $5–10 ThinkGeek.com gifts [29].

### Timing
Although we are not aware of literature about when a recruitment email is sent, our experience suggests that such email timing affects how likely a participant is to respond. When talking to and observing developers, we have observed that there are times when they want to quickly sift through a backlog of email (for example, Monday mornings) or are out of the office (for example, Mondays, Fridays, December, or right after a release). We thus avoid sending emails during these times. On the other hand, developers tell us that they are more apt to respond when they want to do simple tasks with low cognitive load, such as right after lunch. However, email timing can be challenging in multinational companies.

## III. Study: Analysis of Survey Invitation Emails
In this section, we investigate the use of the persuasive factors described above in past survey invitations. Specifically, our research question was, What is the relative importance of our factors? This is important because it allows researchers to prioritize which factors to use, which is especially important when factors might be mutually exclusive (such as the day of the week an invitation is sent on), or counterproductive.

---

[Image: page3_img_1.png] A binary matrix showing which of the persuasive cues (rows: Authority, Similarity, Compliment, Scarcity, Humor, Reward ($), Reward (Other), Direct) appeared in each of 11 invitation emails (columns labeled 1–11), with the weekday each was sent and the observed response rate listed on the bottom row. Authority is marked for every email; similarity cues and monetary rewards appear in many of the higher-performing emails. Response rates range from 6% (email 1) to two emails at 36% (emails 10 and 11); those two highest-rate messages both included similarity and a monetary reward, and email 11 also included an explicit compliment. Humor appears only in email 9 (which had a 30% response rate); scarcity appears in several emails but is not consistently associated with the top response rates.

TABLE I  
PRESENCE OF PERSUASIVE FACTORS IN OUR DATASET. FEATURES WERE OMITTED IF THEY WERE NEVER PRESENT.

> Subject: MS Research Survey on Bug Fixes  
> Hi FIRSTNAME,  
>  
> I’m with the Empirical Software Engineering group at MSR, and we’re looking at ways to improve the bug fixing experience at Microsoft. We’re conducting a survey that will take about 15–20 minutes to complete. The questions are about how you choose bug fixes, how you communicate when doing so, and the activities that surround bug fixing. Your responses will be completely anonymous. If you’re willing to participate, please visit the survey: http://url There is also a drawing for one of two $50.00 Amazon gift cards at the bottom of the page.  
>  
> Thanks very much,  
> Emerson

TABLE II  
THE TEXT OF EMAIL 4 IN OUR DATASET.

We collected data from 11 previously conducted surveys. At a sample size of eleven, few traditional null-hypothesis significance tests are plausible. While we computed some statistics on our dataset, the low power afforded by these methods provide us little assurance that their results generalize, and in the interests of clarity, we decided to not report their results. As such, our analysis of the importance of various persuasive factors should be considered qualitative, as a guideline for future work, rather than a definitive quantitative analysis.

### A. Methodology

Ten of our surveys were conducted at Microsoft and one at another large company. We coded the data from each survey in terms of our factors as described in Section II. When coding, we assigned a binary score if the given email contained a cue associated with any persuasive factor described above, such as a gift, reward for completion, authority (determined by a title or statement of affiliation with a research group), similarity (determined by mutual group association with the participant), or scarcity (determined by the presence of a time limit). The first author performed the coding; in the future, we plan on using multiple coders and assessing inter-coder reliability.

For each survey, we collected data about the email that was sent to participants, including: the number of people the email was sent to, the number of people who completed the survey, a description of how people were selected, the date and time the survey was sent on, and a description of what participants were asked to do. We also collected data on how it was distributed (via blind carbon copy or direct personalized mail).

Table I summarizes the surveys and their features. A • indicates that an email contained a cue for a feature. Response rates are shown on the last line. A • in the “Direct” row indicates that the participant’s name was used directly; otherwise the email was sent as a blind carbon copy (BCC). Table II shows a recruiting email from our dataset.

### B. Results

Few of the survey invitation emails we analyzed contained evidence of many persuasive factors from psychology research. Out of all possible persuasive factors identified from research, emails from our dataset used approximately 3 on average. The minimum was two; the maximum was five. All emails were coded as containing a cue for authority via expertise (the presence of this cue is assumed in the remainder of this section). The other persuasive factors from research present in our data set were compliments to the participant (1), similarity (8), scarcity via time limits (6), and humor (1). Nine surveys offered a raffle entry as compensation for participation; one offered a non-monetary reward (an iPod Nano).

In our sample, the highest response rate was 36%. Two surveys attained this response rate. The first was sent on a Monday late afternoon, contained an offer of compensation (as a raffle entry), and a similarity cue, in the form of a reference to shared company affiliation. This is the same number of cues as the lowest response-rate survey (6%); however, this survey contained a scarcity cue, in the form of a time limit for participation, rather than a similarity cue. The second survey with a high response rate was sent on a Wednesday in the early afternoon, had a similarity cue, offered a reward, and unlike any other survey, contained a compliment to the participant (“We think you would have great insight into the process”).

The message with the highest number of persuasive factors (five) had a similarly high response rate for our sample at 30%. It contained a similarity cue, a scarcity cue, offered a reward, and unlike any other survey, contained humor (the subject line “‘Not my Bug!’, or Reassignments in Windows bug reports”). With one exception, requests that were marked as being distributed directly or via personalized messages had higher response rates than requests distributed via BCC emails. This makes intuitive sense, and has a plausible explanation in the persuasion research, and deserves future study.

## IV. DISCUSSION AND LIMITATIONS

The data included in this study suggests that some of the persuasive factors discussed in this paper may lead to increased survey response rates. For example, addressing the email directly to the recipient, as opposed to having the recipient’s address included in the BCC line of the email, seems to be associated with higher response rates. This may have been because participants’ email clients may have placed BCC emails in spam folders, or may have placed them at lower priority in a participant’s inbox, and so may have reduced

---

Although the goal of our work is to increase survey participation, an increase in participation may not always translate into an increase in the generalizability of a survey’s results. Having more developers participate in a survey does not necessarily mean that the sample, or any results derived from that sample, are more representative of the population.

As an example, consider that the authority behind a study may appeal to some people more than it appeals to others; cultural research suggests that certain groups tend to have high power distances [30], meaning that those with little authority tend to be more submissive to those with more authority. Therefore, increased authority in recruitment emails may bias a survey towards high power-distance respondents, and an increase in the number of respondents would not reduce this bias. This effect is explained by leverage-salience theory, which predicts that different factors will have different response effects on different potential respondents [31].

It is also worth considering whether using these persuasion tactics to solicit survey responses is ethical. We argue that any survey solicitation will include, at least at an implicit level, some form of persuasion. Categorizing such persuasion techniques, and considering them explicitly, can only make it easier to identify cases that might be unethical, while not changing the fact that such persuasive factors will be present.

## V. CONCLUSION

In this paper, we have discussed several factors designed to improve response rates to software development surveys. These factors can serve as a checklist to researchers conducting such surveys. They also serve as a starting point for future study into improving the response rates of software engineering surveys. Further research is necessary to determine which factors have what effect on response rates, but this paper provides a qualitative starting point. We also imagine that a repository of surveys and their response rates would help future researchers by providing an archive of examples.

## REFERENCES

[1] F. Shull, J. Singer, and D. I. K. Sjøberg, Eds., Guide to Advanced Empirical Software Engineering. London: Springer London, 2008.

[2] J. M. Stanton, “An empirical assessment of data collection using the internet,” Personnel Psychology, vol. 51, no. 3, pp. 709–725, Sep. 1998.

[3] C. Cobanoglu, B. Warde, and P. Moreo, “A comparison of mail, fax and web-based survey methods,” International Journal of Market Research, vol. 43, no. 4, 2005.

[4] K. Molokken and M. Jorgensen, “A review of software surveys on software effort estimation,” in ESEM, Sep. 2003, pp. 223–230.

[5] B. Kitchenham, S. Pfleeger, L. Pickard, P. Jones, D. Hoaglin, K. El Emam, and J. Rosenberg, “Preliminary guidelines for empirical research in software engineering,” IEEE Transactions on Software Engineering, vol. 28, no. 8, pp. 721–734, 2002.

[6] R. Buse and T. Zimmermann, “Information needs for software development analytics,” in ICSE, Jun. 2012, pp. 987–996.

[7] G. Samarthyam, G. Suryanarayana, A. Gupta, and R. Nambiar, “Focus: An adaptation of a SWEBOK-based curriculum for industry requirements,” in ICSE, Jun. 2012, pp. 1215–1224.

[8] E. Tambor, G. Chase, R. Faden, G. Geller, K. Hofman, and N. Holtzman, “Improving response rates through incentive and follow-up: the effect on a survey of physicians’ knowledge of genetics,” American Journal of Public Health, vol. 83, no. 11, pp. 1599–1603, Nov. 1993.

[9] J. VanGeest, T. Johnson, and V. Welch, “Methodologies for improving response rates in surveys of physicians: a systematic review,” Evaluation & The Health Professions, vol. 30, no. 4, pp. 303–321, Dec. 2007.

[10] A. I. Kraut and K. Allen, Organizational surveys: Tools for assessment and change. Jossey-Bass Publishers, 1996.

[11] B. J. Fogg, “Persuasive technology: using computers to change what we think and do,” Ubiquity, Dec. 2002.

[12] D. T. Regan, “Effects of a favor and liking on compliance,” Journal of Experimental Social Psychology, vol. 7, no. 6, pp. 627–639, 1971.

[13] R. B. Cialdini, J. E. Vincent, S. K. Lewis, J. Catalan, D. Wheeler, and B. L. Darby, “Reciprocal concessions procedure for inducing compliance: The door-in-the-face technique,” Journal of Personality and Social Psychology, vol. 31, no. 2, pp. 206–215, 1975.

[14] J. James and R. Bolstein, “Large monetary incentives and their effect on mail survey response rates,” Public Opinion Quarterly, vol. 56, no. 4, pp. 442–453, 1992.

[15] J. L. Freedman and S. C. Fraser, “Compliance without pressure: The foot-in-the-door technique,” Journal of Personality and Social Psychology, vol. 4, no. 2, pp. 195–202, 1966.

[16] R. B. Cialdini, J. T. Cacioppo, R. Bassett, and J. A. Miller, “Low-ball procedure for producing compliance: Commitment then cost,” Journal of Personality and Social Psychology, vol. 36, no. 5, pp. 463–476, 1978.

[17] M. Deutsch and H. B. Gerard, “A study of normative and informational social influences upon individual judgment,” The Journal of Abnormal and Social Psychology, vol. 51, no. 3, pp. 629–636, 1955.

[18] E. Murphy-Hill and G. C. Murphy, “Peer interaction effectively, yet infrequently, enables programmers to discover new tools,” in Proc. of the Conf. on Computer Supported Cooperative Work, 2011, pp. 405–414.

[19] C. Hofling, E. Brotzman, S. Dalrymple, N. Graves, and C. Pierce, “An experimental study in nurse-physician relationships,” The Journal of Nervous and Mental Disease, vol. 143, no. 2, pp. 171–180, 1966.

[20] B. Rind, “Effects of impressions of amazement and foolishness on compliance,” Journal of Applied Social Psychology, vol. 22, no. 21, pp. 1656–1665, 1992.

[21] R. Nisbett and T. Wilson, “The halo effect: Evidence for unconscious alteration of judgments,” Journal of Personality and Social Psychology, vol. 35, no. 4, pp. 250–256, 1977.

[22] D. J. Howard, C. Gengler, and A. Jain, “What’s in a name? a complimentary means of persuasion,” Journal of Consumer Research, vol. 22, no. 2, pp. 200–211, 1995.

[23] R. K. Aune and M. D. Basil, “A relational obligations approach to the foot-in-the-mouth effect,” Journal of Applied Social Psychology, vol. 24, no. 6, pp. 546–556, 1994.

[24] A. Knishinsky, “The effects of scarcity of material and exclusivity of information on industrial buyer perceived risk in provoking a purchase decision,” Ph.D. dissertation, Arizona State University, 1982.

[25] S. Worchel, J. Lee, and A. Adewole, “Effects of supply and demand on ratings of object value,” Journal of Personality and Social Psychology, vol. 32, no. 5, pp. 906–914, 1975.

[26] P. Van Kenhove, K. Wijnen, and K. De Wulf, “The influence of topic involvement on mail-survey response behavior,” Psychology and Marketing, vol. 19, no. 3, pp. 293–301, 2002.

[27] P. Edwards, “Increasing response rates to postal questionnaires: systematic review,” BMJ, vol. 324, no. 7347, pp. 1183–1183, May 2002.

[28] S. Porter and M. Whitcomb, “The impact of lottery incentives on student survey response rates,” Research in Higher Education, vol. 44, no. 4, pp. 389–407, 2003.

[29] B. Johnson, Y. Song, E. Murphy-Hill, and R. Bowdidge, “Why don’t software developers use static analysis tools to find bugs?” in International Conference on Software Engineering, 2013, to appear.

[30] G. Borchers, “The software engineering impacts of cultural factors on multi-cultural software development teams,” in ICSE, 2003, pp. 540–545.

[31] R. Groves, E. Singer, and A. Corning, “Leverage-saliency theory of survey participation: Description and an illustration,” Public Opinion Quarterly, pp. 299–308, 2000.