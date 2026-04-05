DOI:10.1145/358

Article development led by acmqueue  
queue.acm.org

### Early insights and opportunities of AI-powered pair-programming tools.

BY CHRISTIAN BIRD, DENAE FORD, THOMAS ZIMMERMANN, NICOLE FORSGREN, EIRINI KALLIAMVAKOU, TRAVIS LOWDERMILK, AND IDAN GAZIT

## Taking Flight with Copilot

IN PAIR PROGRAMMING, two developers write code together. One takes the role of driver, writing the code needed for the task at hand, while the other assumes the role of navigator, directing the driver’s work and reviewing the code. This allows the driver to focus on detailed coding—syntax and structure—while letting the navigator direct the flow of the work and review the code in real time. Proponents of pair programming say it improves code quality and readability and can speed up the reviewing process.

To date, effective pair programming has required the complex coordination of getting two programmers to work together synchronously. This has made it challenging for teams to adopt this approach at scale. The emergence of new AI-powered tools to support programmers has shifted what it means to pair program.

GitHub Copilot is an AI-powered developer tool leading this shift. GitHub released Copilot in a complimentary technical preview on June 29, 2021, letting hundreds of thousands of developers try coding with an AI pair programmer. Copilot became generally available as a paid product on June 21, 2022. This article focuses on the earliest releases of Copilot—the free technical preview—because these allowed us to capture some of the first experiences with an AI pair programmer. While some changes to Copilot have been made in the version released in 2022, the user interface and experience is largely the same.

With developers taking the role of navigator, they can direct the detailed development work and review the code as it is being written. In addition, the AI assistant can write code (directed by the developer navigator) much faster than a peer, potentially speeding up the process.

Copilot received public attention quickly, generating conversation in forums, press, and social media. These impressions ranged from excitement about potentially boosting developers’ productivity to apprehension about AI replacing programmers in their jobs.

But what were developers’ actual experiences with Copilot, beyond the hype found in top tweets, Hacker News, or Reddit posts? During the early days of the technical preview, we investigated the initial experiences of Copilot users. This provides a unique opportunity to watch how developers would use it, as well as what challenges they encountered. While most of the observations were expected, there were some surprises as well. This article presents highlights from these initial

> IMAGE BY ANDRIJ BORYS, ASSOCIATES, USING SHUTTERSTOCK; GITHUB COPILOT LOGO (PUBLIC DOMAIN)