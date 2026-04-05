## Can GPT-4 Replicate Empirical Software Engineering Research?

JENNY T. LIANG, Carnegie Mellon University, USA  
CARMEN BADEA, Microsoft Research, USA  
CHRISTIAN BIRD, Microsoft Research, USA  
ROBERT DELINE, Microsoft Research, USA  
DENAE FORD, Microsoft Research, USA  
NICOLE FORSGREN, Microsoft Research, USA  
THOMAS ZIMMERMANN, Microsoft Research, USA

Empirical software engineering research on production systems has brought forth a better understanding of the software engineering process for practitioners and researchers alike. However, only a small subset of production systems is studied, limiting the impact of this research. While software engineering practitioners could benefit from replicating research on their own data, this poses its own set of challenges, since performing replications requires a deep understanding of research methodologies and subtle nuances in software engineering data. Given that large language models (LLMs), such as GPT-4, show promise in tackling both software engineering- and science-related tasks, these models could help replicate and thus democratize empirical software engineering research.

In this paper, we examine GPT-4’s abilities to perform replications of empirical software engineering research on new data. We specifically study their ability to surface assumptions made in empirical software engineering research methodologies, as well as their ability to plan and generate code for analysis pipelines on seven empirical software engineering papers. We perform a user study with 14 participants with software engineering research expertise, who evaluate GPT-4-generated assumptions and analysis plans (i.e., a list of module specifications) from the papers. We find that GPT-4 is able to surface correct assumptions, but struggles to generate ones that apply common knowledge about software engineering data. In a manual analysis of the generated code, we find that the GPT-4-generated code contains correct high-level logic, given a subset of the methodology. However, the code contains many small implementation-level errors, reflecting a lack of software engineering knowledge. Our findings have implications for leveraging LLMs for software engineering research as well as practitioner data scientists in software teams.

CCS Concepts: • General and reference → Empirical studies; • Computing methodologies → Artificial intelligence; • Software and its engineering;

Additional Key Words and Phrases: Large language models, study replication, empirical software engineering

### ACM Reference Format:
Jenny T. Liang, Carmen Badea, Christian Bird, Robert DeLine, Denae Ford, Nicole Forsgren, and Thomas Zimmermann. 2024. Can GPT-4 Replicate Empirical Software Engineering Research?. Proc. ACM Softw. Eng. 1, FSE, Article 60 (July 2024), 24 pages. https://doi.org/10.1145/3660767

Authors’ addresses: Jenny T. Liang, Carnegie Mellon University, Pittsburgh, USA, jtliang@cs.cmu.edu; Carmen Badea, Microsoft Research, Redmond, USA, cabadea@microsoft.com; Christian Bird, Microsoft Research, Redmond, USA, cbird@microsoft.com; Robert DeLine, Microsoft Research, Redmond, USA, rdeline@microsoft.com; Denae Ford, Microsoft Research, Redmond, USA, denae@microsoft.com; Nicole Forsgren, Microsoft Research, Redmond, USA, niforsgr@microsoft.com; Thomas Zimmermann, Microsoft Research, Redmond, USA, tzimmer@microsoft.com.

> Permission to make digital or hard copies of part or all of this work for personal or classroom use is granted without fee provided that copies are not made or distributed for profit or commercial advantage and that copies bear this notice and the full citation on the first page. Copyrights for third-party components of this work must be honored. For all other uses, contact the owner/author(s).
> © 2024 Copyright held by the owner/author(s).
> ACM 2994-970X/2024/7-ART60
> https://doi.org/10.1145/3660767