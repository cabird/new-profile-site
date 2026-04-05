- Application testers cannot simply test on out-of-the-box systems (which is the standard practice). Instead, they must test on environments with several applications that could possibly interfere. With the permission of users, they must collect and aggregate usage and failure data, and use an analysis such as ours to detect interference.
- Application designers must anticipate and handle issues stemming from interference with third party applications. In essence, we need mechanisms to express expected interaction, and to detect and prevent unexpected interaction.
- Operating systems of the future will need much better organized ecosystems, with clear, enforceable rules such that applications can better coexist. How do we specify this? Who enforces the rules? Can we keep systems flexible and reliable at the same time? Who will be in charge of the computer — vendors or users? Moving and enforcing specifications and architectural rules from applications to the system level brings plenty of challenges for research.

The remainder of the paper is organized as follows: Section 2 discusses our data source. Section 3 presents the most frequently used applications, their features, and their categorization and discusses the study design, based on logistic regression and frequent itemset mining; it also generalizes the study setting to the general “Influence Factors” data analysis pattern. Section 4 discusses the influence of hardware and software features on reliability of Windows and applications. Section 5 presents the impact that specific combinations of hardware and/or application features have on reliability. Section 6 discusses our results in detail, including threats to validity; Section 7 discusses related work and Section 8 closes with conclusions and consequences.

## 2. THE WINDOWS CUSTOMER EXPERIENCE IMPROVEMENT PROGRAM (CEIP)

When first starting a new installation of Windows 7, customers can opt to participate in the Windows Customer Experience Improvement Program (CEIP), a program to collect information about computer hardware and operating system usage. When the program is activated, the computer will automatically collect information on the system configuration and software reliability, including

- Hardware configuration — such as the number of processors, processor speed, screen resolution, or graphics card;
- Software usage and reliability — i.e., which binaries were started, whether they terminated normally, crashed, or hung.

When the PC is connected to the Internet via a broadband connection, this data is securely sent to servers in Microsoft-controlled facilities, and made available to the Windows team [3]. CEIP was designed with customer privacy in mind and goes to great lengths to preserve such privacy. As one such measure, CEIP randomly generates a number called a globally unique identifier (GUID) that is sent to Microsoft with every CEIP report. The GUID lets Microsoft determine which data is sent from a particular machine over time. However, the GUID does not contain any personal information and is not used to identify anyone.

In this study, our goal was to learn how system and application reliability would be affected by the extrinsic factors listed above. We therefore accessed a slice of CEIP data collected in the period of January to March, 2011, representing configuration, usage, and reliability information of more than 200,000 individual machines whose users opted into the CEIP.

> The CEIP attempts to relate reliability to usage profiles — that is, how the computer is actually used. For this purpose, it tracks the following information:
>
> - Binary launches. For each binary (an individual executable file launched by the operating system), the CEIP tracks when and how often it was launched.
> - Binary meta-data. For each binary, the CEIP tracks meta-data such as file name, program name, or vendor name.
> - Binary crashes. The CEIP records the number of normal and abnormal terminations for each binary.
>
> We use application crashes (abnormal terminations) as our measure of reliability. From the CEIP data, one can see how frequently, for example, a specific image manipulation application and a specific antivirus application were launched, and how frequently they crashed. Data, files, settings, or any other information accessed or produced by these programs is not collected, however. We can thus characterize usage only by the programs launched.

## 3. METHODOLOGY

We first describe how we identified and categorized the applications that we analyzed in our study (Section 3.1), the features that we use to model reliability (Section 3.2) and our analysis methods based on logistic regression (Section 3.3), influence networks (Section 3.4), and frequent itemset mining (Section 3.5).

### 3.1 Identification and Selection of Applications

Software application typically consists of multiple binaries. These binaries and applications also come in multiple versions; there may even be variants of binaries for specific locales or hardware configurations. Our first task thus was to map binaries to applications. For this purpose, for each binary, we identified the application it was part of from the attached meta-data. All binaries related to, for example, Skype, would thus be mapped to a single application.

In order to limit the size of our study, we focused on the most frequently used applications. Aiming for the top 50 applications, we collected data for the top 55, out of which two were found to be duplicates. We retained 53 applications, which we grouped into seven categories. The functionality of each application was the primary attribute used for categorization.

- 14 internet applications. This category contained Internet browsers, e-mail as well as instant messaging programs.
- 5 file applications. This included popular file sharing programs as well as unarchivers.
- 5 office applications. This included “classic” productivity applications such as word processors, spreadsheet systems, and presentation programs.
- 3 photography applications. This category contained programs to manage and manipulate digital photographs.
- 11 security applications. This includes anti-virus software as well as firewall and other network protection software.
- 3 games. All are graphics-intensive and highly interactive.
- 12 media applications. This category included software for managing, playing, and streaming music and video files.

From an experimental design perspective, the categorization was initially performed by the last author and all researchers reviewed and agreed on the final categorization used in this paper. As this categorization is an important attribute of this study, we took additional steps to validate that the categorization was as objective as possible. We measured inter-rater agreement for the categorization with three additional, independent raters (who are not co-authors of this paper);