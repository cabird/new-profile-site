We move beyond the individualistic lens of prior work and offer a sociotechnical account of GenAI usage that is both empirically grounded and practically actionable.

## 2.2 Environmental Factors Affecting Adoption

Beyond individual attitudes, the environment in which a developer works (their team and organization) plays a critical role in GenAI adoption [53, 55, 75]. Decades of socio-constructivist research have shown that technology uptake is not merely a function of individual utility but a deeply sociotechnical process shaped by social context, organizational norms, and collective sensemaking [47, 70, 77]. Fulk’s theory of the social construction of technology, for instance, emphasizes how coworkers’ beliefs and organizational cues shape perceptions of technological value [34].

In the SE domain, emerging studies echo these insights. Peer influence and leadership support have been shown to shape developers’ trust in GenAI tools [15, 53]. For example, while top-down mandates alone do not guarantee adoption, strong managerial support (e.g., providing resources and training) can significantly boost trust [53]. Similarly, Cheng et al. [15] show how developers in online communities collectively interpret GenAI tooling through shared experiences, with success stories boosting confidence and widely reported failures fostering caution.

However, some recent empirical work has also found mixed results when examining these dynamics [56, 79]. For instance, Russo [79] found limited support for the influence of organizational stance (external encouragement), a result that contrasts with broader theoretical expectations in organizational communication [34, 35, 80]. One explanation is that these studies are able to capture static slices of environmental influence through individual attitudes (e.g., survey item on management support), failing to reflect how multifaceted team dynamics and organizational support influence adoption. This limitation can lead to counterintuitive findings (e.g., a lack of significant evidence for the role of organizational stance) that conflict with broader theoretical expectations (e.g., Fulk’s work showing co-worker beliefs strongly guide technology perceptions [34]). Also, many studies focus on aggregate trends or initial intentions [56, 57].

We address this gap by taking a comprehensive, in-situ approach. By interviewing matched pairs of developers who share the same team and context but have contrasting usage patterns, we can directly ask frequent users how they overcame the context-specific barriers faced by their peers. In doing so, we extend beyond affirming that “environment matters” to unpacking which aspects of the environment—organizational/peer support, learning resources, etc.—make a difference to developers. This nuanced understanding helps explain the divergence in usage trajectories even among developers in similar contexts. Identifying these differences can guide teams and organizations in creating environments that support sustained, effective GenAI tool use in software development.

## 3 Research Design

To understand what distinguishes frequent and infrequent GenAI development tools users within similar organizational contexts, we performed semi-structured interviews with 54 developers representing 27 pairs from different teams across a large multinational software company. Below, we detail ethical considerations, study design, analysis strategy, and limitations.

### 3.1 Ethical Considerations

We recognize that studying technology adoption in contexts with strong organizational pressure requires exceptional and up-front care to protect participants’ wellbeing and privacy. Given the company’s culture of heavily promoting GenAI tool adoption, we implemented multiple safeguards to protect all participants.

#### Telemetry Data and Privacy
Tool usage telemetry is collected on an opt-out basis, with developers able to disable collection at any time. In sensitive contexts, opting out is explicitly encouraged.

#### Protecting Within-Team Anonymity
To ensure participants from small teams were not identifiable to colleagues (especially infrequent users), we did not disclose that we interviewed other team members. We further framed the study as exploring “diverse developer experiences with GenAI tools.”

#### Ensuring Non-Judgmental Interview Environments
We aimed to create psychological safety for participants whose usage or beliefs might diverge from organizational expectations, by vetting all questions for neutrality in terms of tool usage, reviewed by our team and external researchers. The first author, who is not affiliated with any tooling teams, conducted all interviews and emphasized confidentiality and ensured a thorough anonymization process.

### 3.2 Identifying and Recruiting Participants

Our study employed a paired interview design, recruiting developers from the same teams who exhibited contrasting usage patterns. This approach minimized the influence of team-specific factors—codebase complexity, development practices, and organizational culture—that have confounded previous studies [5, 13, 50, 57, 61, 79]. By comparing developers in closely similar environments, we isolated individual-level factors affecting usage patterns.

Identifying Pairs of Developers. To identify developer pairs with contrasting usage patterns but similar environments across the company, we extracted data about developers (that had not opted out) from internal telemetry databases containing demographic attributes and tool usage. Across the company, GitHub Copilot is the officially sanctioned and freely available GenAI development tool [1]. The telemetry usage data for each developer indicates the number of days each developer used GitHub Copilot during an eight-week observation window (from April 1st to May 31st, 2025). We also collected their job title, career stage, employee level, geographic area code (i.e., country), team within organizational hierarchy (i.e., their management chain from the CEO down to their direct manager), and primary programming language.

Using this dataset, we implemented a multi-round pairing algorithm using the Hungarian method for optimal assignment and scipy.optimize [66, 81]. First, the algorithm grouped developers by career stage, job title, employee level, country, and direct manager—creating groups with similar professional contexts. Within each group, the algorithm split developers into two subgroups at the median usage level before applying the assignment algorithm to maximize usage difference between pairs.

Once the pool of pairs had been identified, we filtered it to ensure each pair shared relevant characteristics while exhibiting significant usage differences.