## 4.2 Data Collection

Distribution: Following pilots, we distributed the survey to 8,000 software developers at Microsoft via email in July 2025. Developers were sampled uniformly at random across product groups, roles, and geographies, in accordance with internal survey policies. To incentivize participation, respondents could enter a raffle for ten $50 AmEx gift cards. One reminder email was sent after a week to boost response rates. Participation was voluntary; responses were anonymous unless participants opted in to follow-up contact.

Sample size: To determine the appropriate sample size, we conducted an a priori power analysis in G*Power [32] for multiple linear regression with repeated measures, using the number of predictors in our design. We targeted the detection of even a small effect size (d = 0.05) at a significance level of α = 0.05 with power = 0.95. The analysis indicated a minimum of 245 responses. To accommodate missing data, quality exclusions, and subgroup analyses, we targeted at least three times this number.

Responses: We received 1,193 responses, a response rate of 14.86%, consistent with the response rates of prior SE surveys [70, 81]. We removed incomplete (n = 152) and patterned responses (straight-lined or repetitive altering; n = 59), as well as those that failed attention checks (n = 98) or reported no AI experience (n = 24). We considered “I’m not sure” / “I don’t do this task” Likert selections as missing data.

We retained 860 valid responses from developers across six continents, representing a wide distribution of SE and AI experience. Most respondents were from North America (57.4%) and identified as men (73.8%), consistent with distributions reported in prior SE studies [19, 74, 88]. A summary of participant demographics is available in the supplemental [1].

## 4.3 Data Analysis

**Quantitative:** We analyzed data in Python and R to summarize distributions, fit regression models (see §5.1, 5.3), and generate visualizations. Closed-ended responses (Likert; Top-N) were visualized to assess variation in appraisals, openness to AI support, and usage across tasks (Tab. 4, Fig. 1) and RAI priorities across categories (Tab. 5, Fig. 2). For RQ1, the unit of analysis was (participant, task type); for RQ2, (participant, task category). Because the design involved repeated measures within participants and across tasks, we used mixed-effects regression [36]. Full model specifications, diagnostics, and results are deferred to the corresponding subsections in §5; here we outline the overall approach and the units of analysis.

**Qualitative:** We used reflexive thematic analysis [10, 11] to identify patterns in the data, iteratively refining them based on participants’ responses [10]. To ensure rigor, the team held multiple meetings to compare codes, resolved differences, and build consensus, as recommended in thematic analysis [11, 24].

First, we inductively open-coded the data to capture preliminary ideas. We then refined and consolidated codes, merging conceptually similar ones while keeping others distinct, and linked them to relevant text segments. Throughout the process, we used a negotiated agreement protocol to guide team discussions until we reached consensus on the final themes (cataloged in [1]). Next, to understand why specific patterns emerged, we mapped qualitative insights to quantitative findings, again through consensus building. As an additional check, we compared participants’ free-text responses with Likert selections and found no discrepancies between their assessments and explanations. Finally, where relevant, we triangulated findings with behavioral science theories to structure interpretation.

In total, we analyzed 1,528 responses about where developers seek and limit AI support and 2,453 responses explaining RAI-principle priorities, spanning five task categories. Participants are referenced as P1–P860 in subsequent sections.

We used member checking to validate our findings: results were sent to 371 participants who opted in to follow-up contact, and 62 replied. Their feedback affirmed the findings and offered clarifications; no new insights or disagreements emerged.

## 5 Results

In this section, we report (1) how task appraisals shape AI adoption (RQ1a: 5.1), (2) where developers seek or limit AI support (RQ1b: 5.2), and (3) which Responsible AI principles they prioritize in AI tools to credibly support their workflows (RQ2: 5.3).

### 5.1 RQ1a: How do appraisals shape openness to and use of AI support?

To answer RQ1, we first investigated whether task appraisals (value, identity, accountability, demands) predict developers’ (a) openness to AI support and (b) AI usage, and whether these relationships vary by developer characteristics (experience, AI dispositions).

For each outcome, we fit linear mixed-effects regressions [36], with appraisals as fixed effects; controls for developers’ SE and AI experience, and random effects for participant and task type to capture within-person and across-task dependence. Models were estimated for the full sample (Tab. 3) and, per our planned group analyses, stratified by risk tolerance and technophilic motivations (see §3). Group analyses statistics are in supplemental [1].

We checked for multicollinearity among the predictors before examining the results. All Variance Inflation Factors (VIFs) were < 2, well below the accepted cutoff of 5 [40]. We controlled false discovery rates (FDR) using the Benjamini–Hochberg procedure [86] and report results significant at α = .05 after this correction.

Table 3 summarizes the regression results. All hypothesized effects (H1–H4, §3) were supported: each appraisal dimension significantly predicted both developers’ openness to and use of AI support in work. We report marginal (R_m^2; variance explained by fixed effects) and conditional (R_c^2; variance explained by fixed and random effects) fit indices as indicators of model fit [40].

Table 3: Mixed-effects regression results for developers’ (a) openness to AI support and (b) AI usage, estimated for the full sample (N = 860). Cells report standardized regression coefficients (β), p-values, and effect sizes (d) in parentheses. Blank cells indicate non-significant associations after Benjamini-Hochberg FDR adjustment [86].

![Table 3: Mixed-effects regression results](page4_img_1.png)

[0.02, 0.15) small, d ∈ [0.15, 0.35) medium, and d > 0.35 large [22].

Task Value (H1) positively predicted openness to and use of AI support. A one-standard-deviation (SD) increase in perceived task value raised openness by .12 and use by .16 SD units (p < 0.001, FDR-corrected), with medium effects (.16, .18) holding other factors constant (Table 3). In short, when developers viewed a task as important, they were more likely to use AI for efficiency (e.g., automating rote