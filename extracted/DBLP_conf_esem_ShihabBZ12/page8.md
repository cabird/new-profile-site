| Release | Metric | Min % | Max % | Direction |
|---|---:|---:|---:|---|
| Windows Vista | Branch Activity | 85±2.9 | 159±11 | Positive |
|  | Branch Scatter | 98±1.2 | 140±10.5 | Positive |
|  | Branch Scatter Entropy | 83±3.8 | 111±2.3 | Positive |
|  | Low Branch Depth | 92±3.8 | 141±15.4 | Positive |
|  | Branch Depth Entropy | 86±8.4 | 111±5.2 | Negative |
| Windows 7 | Branch Activity | 78±7.4 | 151±26.2 | Positive |
|  | Branch Scatter | 84±58 | 143±20.8 | Negative |

Table 3: Summary of metric relationships with failures

This finding makes intuitive sense, since entropy is high when the proportions across the different branches are equal. Therefore, having a low branch scatter entropy value means that software components that are mainly developed in one branch family have fewer post-release failures than components that are developed an equal amount across different branch families. One exception is branch scatter entropy in Windows Vista, which has a small but positive effect. One possible explanation is that Windows Vista had few branch families; therefore, branch scatter entropy did not play a major role.

Our results on Windows Vista and 7 can be summarized:
- H1. Branch activity: has a negative impact on software quality. It can increase post-release failures by up to 59% in Windows Vista and up to 51% in Windows 7.
- H2a. Branch Scatter: has a negative impact on software quality. It can increase failures by up to 40% in Windows Vista.
- H2b. Branch Scatter Entropy: has a slight positive impact on software quality in Windows Vista and negatively impacts software quality in Windows 7. It can increase failures by up to 43% in Windows 7.
- H3a and b. Branch Depth and Branch Depth Entropy: have very little to no impact on software quality.

## 6. BRANCHING STRATEGIES

Thus far, we have mainly focused on the three hypotheses surrounding the effects of branching on software quality at the attribute level. Our findings showed that branch activity and branch scatter affect the software quality of components in Windows Vista and Windows 7, and branch depth only had a moderate effect on quality in Windows Vista.

However, one question that still lingers is how to best align the branching structure? Traditionally, branch structures are aligned in one of two ways: to match the architecture of the software system or to match the organizational structure.

Aligning the branching structure with the architectural structure means that each branch will be dedicated to a component of the software. For example, in a layered software architecture, a branch family will be created for each layer. Branches within the branch family can be used to develop sub-components and so on. The advantage of matching the branching structure with the architectural structure is that changes to a component mostly happen on the same branch, thereby minimizing integrations.

Aligning the branching structure along the organizational structure means that branches match team boundaries. In such a scenario, each team manager will have his own branch family. The individual branches within the branch family will be assigned to different sub-teams, managed by the different team leads under that manager. The advantage of matching the branch structure with the organizational structure is that the personnel working on the branches are close organizationally, making coordination and communication much simpler.

![Table 4: Model fit (R2) of architectural and organizational mismatch](page8_img_1.png)

Org + Arch 0.594** 0.385** (p < 0.01 **; p < 0.05 *)
Table 4: Model fit (R2) of architectural and organizational mismatch

We built linear regression models that examined the relationship of organizational and architectural mismatch of individual branches with branch quality. All measures of organizational mismatch — number of development leads and number of managers that made changes on a branch — and architectural mismatch — number of subsystems changed on a branch — were statistically significant (p < 0.05) and had a negative impact; increased mismatch decreased quality.

Table 4 shows the results of our analysis. We find that organizational mismatch provided a better fit (i.e., higher R2) when modeling branch quality in both Windows Vista and Windows 7. The effects of our measures of organizational and architectural measures on defects in branches are shown in Table 5 (same format as Table 3). This finding indicates that branches that cross-cut organizational boundaries have a higher correlation with post-release failures than branches that cross-cut architectural boundaries. Therefore, we suggest that, contrary to traditional belief, branching structures should not only align according to architectural structure of the software, but also according to its organizational structure.

Our finding complements prior work that showed organizational metrics outperform the traditional process and product metrics in modeling software quality at the component level [13]. The difference between prior work and ours is that we examine the failures on a per-branch basis and compare the effects of architectural vs. organizational mismatch rather than examining only organizational mismatch. With regard to our hypotheses, we conclude:
- H4a: Branching according to architectural structure: Architectural mismatch increases post-release failures in both releases of Windows.
- H4b: Branching according to organizational structure: Organizational mismatch increases post-release failures in both releases of Windows.
- Architectural vs. Organizational Mismatch: Organizational structure has a stronger relationship with failures than architectural mismatch.