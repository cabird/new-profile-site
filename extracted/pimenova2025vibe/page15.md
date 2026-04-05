the stack, the better the AI can help you write high-quality code” (R4). Some commenters also emphasize the need to manually validate code to increase trust in generated code, though others reject this as antithetical to the vibe coding practice of avoiding direct code reading (see Section 4.2). We discuss the diverging opinions around code review in 4.5, where we consider trust as a mediating factor of vibe and flow.

## 4.5 Findings: Trust as a Mediating Factor of Vibe and Flow

In our proposed theory of vibe coding (see Figure 1), we identify trust as a key mediating factor that enables co-creation and facilitates flow. Discussions of trust were both explicit (“...you can basically set [roo] to auto-approve everything it does if you trust it. It can make prototyping very fast” (R15)), and implicit (“Vibe coding is just approving pull requests you don’t understand” (R41)). Trust shapes how much authority a coder is willing to cede to the AI, influencing where they fall on the delegation–co-creation spectrum (Section 4.3). Trust also supports flow by enhancing perceived control and effortlessness [10]. However, high trust can also introduce risk. In this section, we explore how trust interacts with vibe coding through a deeper dive on code review during vibe coding, followed by exploring associated risks and how developers regulate trust in context.

### Co-creation, Flow, and Trust — A Deep Dive on Vibe Coding and Code Review

We observe a complex, sometimes conflicting, relationship between best practices, flow, and AI trust when we look more closely at code review of vibe coding. To mitigate for incomplete solutions and low reliability, some vibe coders recommend manual review to increase trust: “The best two tools you have in your toolbox to vibe code well are read the code line by line, and test what the code does” (I11). However, this strategy is not universal. As noted in Section 4.3, extensive code review is itself a pain point: “My 400-line code is now 3000 lines and neither of us can read it anymore” (R63). Reviewing generated code can be tedious, undermining the very flow and effortlessness vibe coders seek.

As a result, some vibe coders recommend delegating review back to the AI by asking it to audit its own code. “Once you have finished building, take your code and pass it through a leading reasoning model with the following prompt: Please review for production readiness: check for common vulnerabilities, ... and ensure adherence to industry best practices” (R41). This strategy supports flow by preserving a sense of control while enabling effortless review. However, it also signals high trust in model ability; it is unclear how effective these strategies are compared to traditional code review.

### 4.5.1 Vibe Coding Risks

Trust can amplify risks at software, developer, and societal level.

#### Risks For Vibe Coded Software

Commenters report that vibe coding can lead to technical debt, unmaintainable code, and buggy or insecure products. “[Vibe coding] can introduce a lot of technical debt, especially if you’re not super familiar with, like, the framework or language that it’s writing in” (I2). Security risks are especially concerning: “I once tried using ChatGPT to get a simple Spring Boot app... [passwords] got stored in plain text” (R75). Some fear that software-related risks make it hard to transition from prototype to product when relying on vibe coding. “Don’t try to deploy it... That requires engineering, not vibes. Sorry for gatekeeping but it’s true.” (L31)

Reliance on vibe coding may also lead to issues with software team collaboration. For example, one commenter mentioned “on the AI team [there] is a, like, prompt engineer. He doesn’t have a formal coding background... sometimes responding to their PRs, I feel like I’m just talking to Claude through a person, which is not efficient for anybody” (I5).

#### Risks to the Developer

Commenters also discussed risks for the developer. Some commenters worry that vibe coders who do not critically trust generated code may face legal repercussions due to their applications leaking sensitive data or ignoring data protection laws. “Regulators don’t care about your ‘vibes’. Laws don’t care about your feelings.”

Manuscript submitted to ACM