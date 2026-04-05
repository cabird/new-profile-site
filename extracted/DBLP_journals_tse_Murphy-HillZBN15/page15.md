- Takes little time to implement
  - (Testers were more likely to agree, p = .0068)

- How often does communicating with the following people help you choose the optimal fix?
  - Peer SDETs
    - (Testers were more likely to agree, p < .0001)
  - My product manager
    - (Respondents with more experience at Microsoft were less likely to agree, p = .0007)

- When choosing which fix to apply to your bugs, how often does the decision get made in the following ways?
  - I choose the fix.
    - (Testers were less likely to agree, p = .0048)
  - My team collectively chooses the fix.
    - (Testers were more likely to agree, p = .0087)

For the population of other developers we ran a separate analysis because the demographics questions were different (contributed to OSS, work area, experience in current company, experience in software industry). We observed only one difference that was statistically significant at .05:

- How often do the following factors influence which fix you choose?
  - My peers’ opinions of the fix
    - (Respondents with more experience in software industry were less likely to agree, p = .0399)

## 6 LIMITATIONS

Although our study provides a unique look at how engineers fix bugs, several limitations of our study must be considered when interpreting our results.

An important limitation is that of generalizability beyond the population we studied (external validity). While our results may represent the practices and attitudes at Microsoft, it seems unlikely that they are completely representative of software development practices and attitudes in general. However, because Microsoft makes a wide variety of software products, uses many development methods, and employs an international workforce, we believe that our random and stratified sampling techniques improved generalizability significantly. This interpretation is strengthened by our replicated survey, where Microsoft developers only differed in two significant respects from developers at large.

Three threats are worth noting that specifically affected the replicated survey. First, although we found few statistically significant differences compared to Microsoft developers, this may be due to low statistical power. Use of a power analysis may have helped alleviate this threat, but such analysis confidently requires a priori knowledge of effect sizes. Second, some of the participants recruited through Facebook may have been Microsoft employees, so there may have been overlap between the two samples. We believe that overlap is very unlikely or if present has only a small effect. The potential reach of the Facebook advertisements was 86,000 people, when we restrict that audience to people with Microsoft as employer, Facebook estimated the reach as “Fewer than 1000 people”; that means that at most 1.2% of the Facebook sample were employed by Microsoft. Third, the targeting on Facebook is based on data that is self-reported by its users. For example, users may have falsely stated that their job title was “software developer.” This was not a problem with the Microsoft survey, as we selected participants whose official job titles indicated that they were developers, based on information in the official human resources database.

Giving interviewees’ and survey respondents’ example bugs and multiple-fix examples may have biased participants towards providing answers that aligned with those examples, a form of expectancy bias (internal validity). However, we judged the threat of participants unable to recall implicit or explicit design decisions outweighed this threat. Future researchers may be able to confirm or refute our results by using a research method that is more robust to expectancy bias.

Still, some interviewees struggled with remembering the design decisions they made, and were generally unable to articulate implicit decisions. This type of memory bias is inherent in most retrospective research methods. However, we attempted to control memory bias by asking opportunistic interviewees to recall their most recently fixed bugs, asking firehouse interviewees to discuss a bug they just fixed, and asking survey respondents to look at bugs they had recently fixed.

Although we talked to firehouse interviewees soon after they fixed bugs, this may not have been the most relevant time to ask about the different designs they considered. Since they had implemented one particular fix, they may be less likely to readily admit to considering design alternatives, a form of commitment bias [31]. Future firehouse interviews may be able to find a time closer to the time when multiple designs are being considered.

In keeping with the wishes of participants in the bug triage meetings, we did not keep audio recordings of the meetings. As a consequence, we may have missed information that we otherwise would have noticed if we had been able to analyze audio recordings later.

To meet our goal of not significantly interrupting participants’ workdays, we kept our interview and survey short, which means we were unable to collect contextual information that may have helped us better explain the results. For example, in the interviews, we did not ask questions about gender or team structure, which may have some effect on bug fix designs.

Similarly, a consequence of keeping the survey short is that participants may have misunderstood our questions. For example, in our survey, we asked engineers whether they ever avoided filing a bug report; this question could be interpreted conservatively to mean, “when do you not report software failures?”, when our intent was for “bug reports” to be interpreted broadly to include enhancements. While we tried to minimize this threat by piloting our survey, as with all surveys [17], we may still have miscommunicated with our respondents.

When we asked our research group to code opportunistically, the transcripts we provided them with were precoded by the first author. This may have biased participants to simply confirm the first author’s codings. The research group’s codings did provide some additional value, as every coder provided additional quotes not originally