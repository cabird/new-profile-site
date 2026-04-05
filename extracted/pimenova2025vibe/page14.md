such as cursor rules or documentation, can be automatically added to request context. “I ended up building a small tool for myself. It generates a code map of the whole project... so AI tools can actually follow what's going on” (R14).

To handle slow and costly API responses, some vibe coders are intentional with API and plan selection, choosing tools based on task and cost. “Claude 3.7... will use up your Cursor credits whereas Deepseek will not... Depending on the task I will select a specific LLM” (R16). Actively making decisions may increase the developer’s sense of control over the quality of vibe coding co-creation.

Finally, to manage frustration some coders practice mindset management. Commenters recommend vibe coders “take a Deep Breath” (R35) or use strategies such as persona-based prompting that can make the vibe coding process more rewarding, moment to moment; “honestly it's more for me and keeping my inner monologue in a good head space... while working” (R36).

### Flow and Co-creation Best Practices:

As shown in Figure 2, we identified 20 best practices for co-creation. We summarize key strategies aligned with the eight pain points identified in Section 4.3.

When encountering technical limitations such as knowledge cutoffs, vibe coders will sometimes try different models, apply selective AI use, or adapt task design to better fit model capabilities. “I have the most success when designing tasks such that each problem fits inside the context window... It's like having a scalable team of engineers that... need hand holding to tie it all together” (R2). These strategies can lead the developer to experience a better balance between challenge and skill.

To improve code quality, some vibe coders use prompts that include specific quality-focused instructions, amplifying a sense of control. Others prefer a more effortless solution, instead adding documents with general best-practice guidance in their context window (e.g., coding style guidelines or internal standards) that can be automatically referenced for all future requests. “I gave mine rules for best practices and file formats and other rules for what requirements I need it to follow... it DOES follow all rules” (R75). These two strategies reflect a broader dichotomy in emerging best practices: one favors hands-on, prompt-by-prompt control, while the other seeks effortlessness through one-shot instructions. We hypothesize that developer preference between these two approaches may be related to AI trust. We consider the role of trust in vibe coding in more depth in Section 4.5.

To support debugging and refactoring, vibe coders recommend rubberducking, building proactive AI-powered workflows, and maintaining a strong mental model of the codebase; when debugging, “judgement and meta knowledge is key” (R10). These techniques enhance flow by specifying a clear set of goals, and with rubberducking, fostering a tight, moment-to-moment feedback loop.

To mitigate for vibe coding’s characteristic large and sometimes chaotic code changes, vibe coders recommend using external version control, as well as asking the AI to log its changes. “Have it write to a file for Git names and version control... Makes it easy to roll back when things go off the rails” (R14). This explicit tracking offers clear and immediate feedback, supporting flow.

To combat poor structure and planning, some commenters recommend planning first before vibe coding. This planning phase can involve individual or AI-assisted reflection on potential features, and the desired software architecture. Some vibe coders also recommend actively managing structure and abstractions, guiding the model toward modular or reusable designs. These practices promote a clear set of goals and sustain a sense of control, both of which are central to flow-based co-creation.

For low reliability and incomplete solutions, best practices include breaking tasks into smaller steps, and writing or generating tests. These practices create the conditions necessary for flow by providing clear and immediate feedback. Others recommend choosing well-documented technologies. “AI models are trained on public data. The more common

Manuscript submitted to ACM