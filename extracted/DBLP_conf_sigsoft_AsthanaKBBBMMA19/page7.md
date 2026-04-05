| Repository | Active developers | Average PRs per day | Developer Coverage | Total Files | Total pull-requests | Deployed WhoDo | Cut-off date |
|---|---:|---:|---:|---:|---:|---|---|
| SmallRepo1 | 20 | 2.1 | 11.49% | 2218 | 252 | 10/10/2018 | 5/2/2019 |
| MediumRepo | 113 | 2.68 | 1.27% | 6440 | 526 | 11/12/2018 | 5/2/2019 |
| SmallRepo2 | 12 | 2.43 | 18.09% | 383 | 196 | 10/10/2018 | 5/2/2019 |
| SmallRepo3 | 13 | 1.31 | 22.81% | 482 | 220 | 10/10/2018 | 5/2/2019 |
| LargeRepo | 116 | 8.4 | 2.49% | 7750 | 793 | 24/10/2018 | 5/2/2019 |

Table 1: WhoDo has been deployed on 5 repositories of varying sizes. This table summarizes the characteristics of these repositories, and for how long WhoDo has been active on them.

| Repository | No. PRs Processed (before) | No. PRs Processed (after) | PR Completion (hours) before | PR Completion (hours) after | PR Completion % improvement | Average Number of Reviews before | Average Number of Reviews after | Avg reviews % improvement | WhoDo Hit Rate% |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| SmallRepo1 | 168 | 258 | 56.06 | 44.07 | 21.39 | 1.478 | 1.66 | 12.11 | 68.35% |
| MediumRepo | 3268 | 589 | 74.88 | 61.59 | 17.75 | 1.74 | 1.65 | 5.17 | 58.16% |
| SmallRepo2 | 370 | 245 | 19.73 | 16.55 | 16.12 | 1.25 | 1.45 | 16.00 | 78.18% |
| SmallRepo3 | 487 | 222 | 21.27 | 18.50 | 13.02 | 1.25 | 1.47 | 17.60 | 80.18% |
| LargeRepo | 1787 | 474 | 74.26 | 63.71 | 14.20 | 2.65 | 3.86 | 45.66 | 72.54% |

Table 2: Aggregate PR statistics before and after the deployment of WhoDo service on select repositories

| Measure | Before Load Balancing | After Load Balancing | % Improvement | % Improvement over baseline |
|---|---:|---:|---:|---:|
| No. of days of deployment | 56 | 54 | - | - |
| No. of PRs | 474 | 415 | - | - |
| PR Completion time (hours) | 70.46 | 57.92 | 12.54 | 17.79 |
| Average Reviewers per PR | 3.86 | 4.05 | 4.92 | 52.83 |
| Average per-reviewer active load | 0.663 | 0.359 | 45.85 | - |

Table 3: Evaluation of load balancing on LargeRepo repository

| Q/4 | Median | 3Q/4 | Mean |
|---:|---:|---:|---:|
| Before Load Balancing | 2.80 | 22.71 | 90.65 | 70.46 |
| After Load Balancing | 2.63 | 20.60 | 72.82 | 57.92 |

Table 4: Statistics of PR completion times on the LargeRepo repository. All values in hours

(4) Do you know the recommended reviewers or have worked with them before?
(5) Was there any other reason for adding reviewers?

We received a total of 28 responses. The results are summarized in Figure 4. In most cases, the developers chose the third option, i.e. while WhoDo’s suggestions were valid, they knew of someone who could review their PR almost immediately. Evidently enough, the response statistics were split into 2 categories.

As is clear from Figure 4, there is a clear difference in statistics in response of smaller vs larger repos. A large portion of responses in SmallRepo1 state that the recommendations were valid but someone else did the review because they were available at the time. This feedback suggests that WhoDo is making many more valid reviewer suggestions than the hit rate suggests, but also that WhoDo’s scoring function needs to capture current availability of reviewers as well. We leave this for future work.

![Email response chart on test repositories](page7_img_1.png)

Figure 4: Email response on test repositories

Developers for LargeRepo had different feedback to give. Rather than adding reviewers from their own team, WhoDo added reviewers from other teams. Here are two example responses: