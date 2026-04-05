## Good Vibrations? A Qualitative Study of Co-Creation, Communication, Flow, and Trust in Vibe Coding

VERONICA PIMENOVA, University of Michigan, USA  
SARAH FAKHOURY, Microsoft Research, USA  
CHRISTIAN BIRD, Microsoft Research, USA  
MARGARET-ANNE STOREY, University of Victoria, Canada  
MADELINE ENDRES, University of Massachusetts Amherst, USA

Vibe coding, a term coined by Andrej Karpathy in February 2025, has quickly become a compelling and controversial natural language programming paradigm in AI-assisted software development. Centered on iterative co-design with an AI assistant, vibe coding emphasizes flow and experimentation over strict upfront specification. While initial studies have begun to explore this paradigm, most focus on analyzing code artifacts or proposing theories with limited empirical backing. There remains a need for a grounded understanding of vibe coding as it is perceived and experienced by developers. We present the first systematic qualitative investigation of vibe coding perceptions and practice. Drawing on 190,000+ words from semi-structured interviews, Reddit threads, and LinkedIn posts, we characterize what vibe coding is, why and how developers use it, where it breaks down, and which emerging practices aim to support it. We propose a qualitatively grounded theory of vibe coding centered on conversational interaction with AI, co-creation, and developer flow and joy. We find that AI trust regulates movement along a continuum from delegation to co-creation and supports the developer experience by sustaining flow. We surface recurring pain points and risks in areas including specification, reliability, debugging, latency, code review burden, and collaboration. We also present best practices that have been discovered and shared to mitigate these challenges. We conclude with implications for the future of AI dev tools and directions for researchers investigating vibe coding.

CCS Concepts: • Software and its engineering → Software development techniques; • Human-centered computing → Natural language interfaces.

Additional Key Words and Phrases: Vibe Coding, AI Co-creation, Flow, Trust, Qualitative Methods

## 1 Introduction

> “It’s not about chaos. It’s about flow — writing code in a rhythm where your mind is free to create, unburdened by boilerplate.” (L46)

The phrase “vibe coding” was first introduced by AI researcher Andrej Karpathy in February of 2025 and immediately became popular because it sparked imagination and captured the enthusiasm of a new style of accelerated creative programming using LLMs that frees the developer from the usual constraints of thinking about technical and engineering details before getting into the “vibes”. The term, however, has been criticized1 as it may trivialize the importance of AI-supported development. Despite these criticisms, and a lack of a formal definition or agreement of what this term means, the phrase is frequently used and may be in part responsible for steering a shift toward a new paradigm of programming that is less reliant on clarifying requirements up front.

1 See Hacker News for a discussion around this criticism, sparked by comments by Andrew Ng