The following research questions:

**RQ1:** Which social and technical factors are important to developers (RQ1.1), what is their perceived relative importance (RQ1.2), and how satisfied are developers with these factors (RQ1.3)?

**RQ2:** Which challenges do developers experience (RQ2.1), how impactful are each of these challenges perceived by developers (RQ2.2), and how do these challenges impact satisfaction with the social and technical factors (RQ2.3)?

**RQ3:** How do the social and technical factors impact the relationship between overall job satisfaction and perceived productivity (RQ3.1), and what is the impact of work context variables on the relationship between job satisfaction and perceived productivity (RQ3.2)?

By answering these questions, we propose a generic theory to posit that (1) a variety of social and technical factors, and challenges, contribute to a bi-directional relationship between job satisfaction and perceived productivity, and (2) that which factors matter depends on a variety of work context variables. We then show how this theory can be instantiated (or scoped) to specific development contexts.

In the next section (Section 2), we provide some background on related work. Then we describe the survey methodology and its design, and our analysis approach in Section 3. We present the results to our research questions in Sections 4, 5, and 6. We present and discuss our proposed theory of satisfaction and productivity in Section 7 and discuss the implications of our findings and theory for practitioners and researchers in Section 8. We detail the limitations and threats to validity of our research in Section 9 and conclude the paper in Section 10.

## 2 BACKGROUND

Understanding productivity in software engineering has become an important topic of interest since improving it depends on many things [11]. Equally important is to understand its relationship to other factors that may affect productivity. In this paper, we look at the relationship between job satisfaction and perceived productivity, and we discuss research related to these concepts below. We have used this research combined with insights gained during a company on-site visit, to generate a pool of factors that potentially impact job satisfaction and perceived productivity, and to inform our survey design. We provide details about the origin of all factors we used in Section 3.

### 2.1 Developer Satisfaction

Developer satisfaction has been discussed in conjunction with other human aspects of software engineering, such as developer happiness and developer motivation. We have reviewed work in these areas to include factors that may play a part in developer satisfaction in our study.

Happiness in software development has recently been studied in depth [12]. The focus has been on understanding the factors that cause happiness (or unhappiness) when software engineers are developing software [8], as well as the corresponding consequences on the outcome of development [12]. We have, therefore, included factors in our study that are informed by the work on developer happiness.

For example, Graziotin et al. [8] report that lacking skill by coworkers can be a source of unhappiness for developers, and we included “skilled coworkers” as one of the factors potentially influencing work satisfaction in our study.

Although it is reasonable to assume that happiness and satisfaction are related, they are distinct constructs. As Wright and Cropanzano [9] point out, researchers frequently use the term happiness to refer to psychological well-being, which refers to one’s life as a whole (among other characteristics). In our research, we focus on satisfaction with aspects of one’s job, differentiating our construct from happiness. Therefore, we align with Wright and Cropanzano’s [9] definition of job satisfaction (citing Brief [13]) as “an internal state that is expressed by affectively and/or cognitively evaluating an experienced job with some degree of favor or disfavor”, and have positioned our survey questions accordingly.

The other human aspect that has been discussed alongside satisfaction is developer motivation. Beecham et al. [7] systematically reviewed literature in software engineering and identified several factors that contribute to software engineers’ motivation, as well as external signs of motivation or demotivation. Subsequent work by Sharp et al. [14] reviewed several models found in the literature and ended up proposing a model of motivation in software engineering that includes motivators, outcomes, characteristics, and context. More recently, empirical studies by França and colleagues [15], [16], [17] have identified a variety of factors that affect motivation, such as career progression, or autonomy—at the same time, the authors point out that motivation and job satisfaction are not the same thing [18].

Inspired and informed by the work on developer motivation, we have included relevant factors that may be important to developers in our investigation of job satisfaction and perceived productivity. We have been selective, however, as we agree with work that regards motivation and job satisfaction as related but not identical constructs. To demonstrate, Beecham et al. [7] mention that managers play a role in motivating (or demotivating software engineers), and we included the factor “manager” in our survey. In contrast, França et al. [18] mention punctuality as one of the behavioral descriptors of motivation—we have not included a relevant factor as punctuality is a result of motivation rather than a factor that impacts it.

Finally, job satisfaction has also become a subject of inquiry in non-academic developer surveys. The yearly Stack Overflow surveys3, the International Game Developers Association developer satisfaction surveys4, and the GitLab annual global developer survey5 all look at how satisfied developers are with various aspects of their jobs. This signals the importance that industry places on understanding and capturing developers’ job satisfaction.

### 2.2 Developer Productivity

Recently, much attention has been placed on understanding both how software developers work and what makes them productive. Through a systematic literature review, Wagner

3. https://insights.stackoverflow.com/survey/2019
4. http://c.ymcdn.com/sites/www.igda.org/resource/resmgr/2017_DSS_/!IGDA_DSS_2017_SummaryReport.pdf
5. https://about.gitlab.com/developer-survey/2018/