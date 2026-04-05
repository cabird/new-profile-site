"count" value of each Diff, which signifies how frequently a Diff occurs. Higher counts represent higher priority Diffs. Regardless of the clustering method chosen, Diffs within each cluster are always ordered by their counts, ensuring that developers can address the most critical Diffs first.

The clustering options provide OCEs with the flexibility to organize Diffs dynamically based on categories, predicted labels, or description similarity. By combining fixed groups for categories and labels with dynamic embedding-based clusters for descriptions, the system balances structure and adaptability. With real-time performance ensured through embedding caching and prioritization mechanisms, developers can work efficiently and focus on the most critical tasks.

## 2.8 Flagging for Organization

This feature introduces a flagging system for prioritizing, following up, or analyzing Diffs, addressing a major gap in the previous workflow. Previously, OCEs lacked an efficient way to revisit specific diffs, often resorting to manually sifting through lists.

To address this, we implemented a flagging functionality that allows developers to mark Diffs with one of three colored flags: Red, Orange, or Yellow. Importantly, these colors do not have predefined meanings, giving OCEs the freedom to use the flags in a way that aligns with their individual workflows and organizational preferences. To enhance usability, we also provide a filtering feature that allows OCEs to view only flagged Diffs, enabling them to focus exclusively on Diffs they marked as important. The flag colors remain visible even outside the filtered view, ensuring that flagged Diffs are easily identifiable when working with the full list of Diffs. Interviews revealed that revisiting unresolved Diffs was a key pain point. This flexible system empowers OCEs to customize their workflow, fostering control and improving organization, making the redesigned DiffViewer more intuitive and user-friendly.

## 2.9 Progress Bar

The progress bar is a simple yet essential addition to the redesigned DiffViewer, providing OCEs with a clear visual representation of their progress during a labeling session. This feature allows developers to easily see the total number of Diffs in a session and track how many have been labeled.

By offering incremental progress updates, the progress bar transforms the labeling process into a more visual and target-driven experience. This clear progress indication not only helps OCEs stay organized but also enhances the overall user experience by fostering a sense of accomplishment and reducing the cognitive load of managing their workflow.

## 2.10 Complete/Incomplete Status

This simple yet impactful feature enhances workflow organization by introducing a clear distinction between labeled and unlabeled Diffs. The original DiffViewer presented a cluttered view where all Diffs, regardless of their status, remained visible, often leading to visual overwhelm. To address this, we implemented an inbox-style view that focuses exclusively on unlabeled Diffs.

With this feature, once a Diff is labeled, it is automatically removed from the view, leaving only the incomplete Diffs. This streamlined approach reduces visual noise, helps OCEs stay focused, and ensures a cleaner, more organized workflow.

## 2.11 Priority-Based Ordering and Reduced Mouse Travel

The Priority-Based Ordering feature, inspired by the original DiffViewer, allows OCEs to view all of the Diffs in order of priority, ensuring critical issues are addressed promptly. In typical on-call sessions, labeling can take 5–6 hours, as OCEs methodically identify discrepancies between production and test logs. By prioritizing the most persistent errors early in the session, this feature enhances the efficiency and impact of the labeling process.

Building on observations from OCE interviews, the Reduced Mouse Travel feature addresses inefficiencies caused by scattered information across the screen. A redesigned visual layout consolidates all necessary actions and information within a single block for each diff. When an OCE selects a Diff block, related information—such as category, summary, and descriptions—appears on the right side of the screen. Additionally, a label button is integrated directly into the diff block, enabling OCEs to label the Diff without navigating elsewhere. This centralized design minimizes screen traversal, significantly improving workflow efficiency and reducing mouse travel.

## 2.12 Preserving Core Features

While prototyping several new features, we ensured that the redesigned DiffViewer retained key elements from the original version that OCEs relied upon. Core features such as side-by-side production and test log comparisons and Diff labeling remain central to the tool. These features were essential to the workflow and heavily utilized by OCEs, making them critical to preserve. For example, side-by-side log comparisons are now easier to access within the block-based UI, and labeling Diffs is streamlined with the addition of label buttons directly on each block. We ensured that the proactive AI integration and automation features were designed to seamlessly align with the existing workflow, allowing developers to adopt these enhancements without disrupting their familiarity with the original tooling. This approach ensures that the DiffViewer builds upon its strengths while addressing the pain points identified during developer interviews, providing both continuity and enhanced usability.

## 3 Design Probe Study

The prototype embodies a number of potential improvements to the work practice, with the goal of eliciting feedback from OCEs about which ideas to prioritize for further investment. Because the OCEs’ work is both critical and laborious, it would not be reasonable to ask them to conduct the work using a prototype during their on-call sessions nor to repeat the work during their off times. Instead, we use a design probe (also called a technology probe) method, which combines multiple goals: "the social science goal of understanding the needs and desires of users in a real-world setting, the engineering goal of field-testing the technology, and the design goal of inspiring users and researchers to think about