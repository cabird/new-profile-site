## Revealing the Dark Matter: Connecting Tacit and System Knowledge in Human–AI Collaborations

Katherine R. Dearstyne  
University of Notre Dame  
Notre Dame, IN, USA  
kdearsty@nd.edu

Carmen Badea, Christian Bird, Robert DeLine  
Microsoft  
Redmond, WA, USA  
cabadea,cbird,rdeline@microsoft.com

## Abstract
Software processes rely on both structured system knowledge such as code, version histories, and logs, and tacit knowledge including human rationale, practices, and decisions. We argue that effective human–AI collaboration requires shared and evolving knowledge spaces that integrate these knowledge sources and make their connections explicit. Using differential testing as a motivating case, we describe our initial prototype and the challenges it revealed, and we outline a broader vision for dynamic knowledge networks that support more effective collaboration between humans and AI.

## 1 Introduction
For decades, software engineering research has primarily focused on “system knowledge”: structured data such as source code, bug databases, and version control histories. The software engineering community has shown what can be achieved when these artifacts are systematically analyzed [3, 10, 12]. While valuable, such efforts overlook the “dark matter” of software engineering: the tacit knowledge, informal rationale, and everyday decisions conveyed through fleeting exchanges such as hallway conversations or impromptu design discussions. Even when some of this knowledge was captured, it often remained buried in unstructured forms such as wiki pages, notes, or informal chats, with no reliable way to connect it to other artifacts and contextualize it within the broader system [2, 18].

Two recent shifts create new opportunities to capture and harness this previously buried knowledge. The first is the widespread move to remote and hybrid work which has led to an unprecedented amount of recorded communication. The second is the rise of LLMs, which can rapidly ingest, summarize, and reason over vast amounts of unstructured text, including emails, team docs, online chats, and meeting transcripts [1, 21]. This allows them to trace connections across diverse software artifacts at speeds impossible for human engineers [14, 26]. This convergence of newly available unstructured data with AI’s capacity for rapid reasoning creates a path to integrate tacit and system knowledge within shared knowledge spaces, enriching both human and agent understanding of software systems [20]. Ideally, this space should evolve alongside the system, continually capturing insights from ongoing use and revealing additional implicit knowledge over time.

To begin exploring this vision, we focus on differential testing in software release engineering, which served as our motivating case [8, 11, 23] as it exemplifies tasks that require rapidly integrating and reasoning over vast and varied sources of knowledge. We first describe our initial prototype that integrates both tacit and system knowledge, reflect on the challenges we encountered, and then outline how these challenges point to a broader research agenda. Building on these lessons, we conclude with a vision for dynamic knowledge networks and process analysis techniques that surface tacit and system knowledge, connect them with established artifacts, and enable more effective and adaptable human-agent collaboration across software engineering tasks.

## 2 Motivating Example: Differential Testing
Differential testing [8, 11, 23] is a technique that compares the behavior of production and test systems to catch regression failures. A single build can generate hundreds of behavioral differences (diffs), creating a large volume of work in which each diff must be analyzed to determine whether it reflects a true regression or instead arises from a benign source, such as a newly introduced feature or noise from non-determinism. The scale and repetitive nature of this task make it a strong candidate for automation, yet interviews with differential testing engineers revealed that automation alone is insufficient [11]. As one engineer explained, “I need to know what data led to the prediction... without that, I’d still have to do all the investigation myself” [11]. An effective solution therefore requires human-agent partnership where agents first sift through vast amounts of data, including both system knowledge and tacit knowledge, to identify possible sources of diff causes, providing crucial connections and context for humans to quickly review and confirm the analysis.

### 2.1 Initial Solution
Our initial solution explored an agentic framework that provided the LLM with tools that mirror the resources typically available to engineers. Through interviews with engineers, we identified 9 diverse sources of knowledge that were relied upon during diff investigations, ranging from team knowledge to system knowledge, as summarized below:

- Team Knowledge: Wiki pages, team messages, meeting transcripts.  
- Version Control: Commit/PR messages, code diffs.  
- Codebase: Source code, error metadata.  
- Historical: Labeled diffs, notes from prior builds.

To leverage this information, we gave the agent direct access to some data sources through database and version control repository retrieval. For other data sources, the agent could make high-level queries using GraphRAG [7]. Among these sources, team knowledge proved particularly critical, since it allowed the transfer of human expertise asynchronously to the agent. This category included resources such as Wiki pages and team messages in the initial prototype, with meeting transcripts considered as part of our broader research vision (see Section 3). By providing this context upfront, the agent was able to reduce the degree of human intervention required at runtime because it already had access to much of the tacit knowledge that engineers typically convey through ongoing communication and informal interactions.

At each step of the diff investigation, the agent could make tool calls to gather new information, either allowing it to reach a conclusion or helping it decide what additional calls were needed to explore the problem further. After each step the agent was required