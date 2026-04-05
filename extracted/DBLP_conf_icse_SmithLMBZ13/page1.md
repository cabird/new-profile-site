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