The authors expected that classes involved in design patterns would be less change-prone; however, they observed that such classes were still more change-prone after accounting for size than those not participating in design patterns.

In a later study, Aversano et al. (2007) observed that classes participating in patterns that "play a very important role for a(n) ... application" are more change-prone and that classes not participating in patterns are often not key participants in the application's design. Consequently, their results support the work of Bieman but do not shed any further light on the question of whether the various design pattern roles actually offer the stability suggested by the literature.

In this paper we study classes playing pattern roles within the same pattern and application to shed further light on the question of the relationship between design patterns and class stability.

### 1.1 Outline

We present the following results:

1. We observe that differences in change-proneness of design-pattern roles reported by Di Penta et al. (2008) can also be explained by the purely structural notion of metapattern roles. We observe similar patterns of change-proneness among design patterns that employ the same metapattern model as well as in the independently measured metapatterns.
2. However, when controlling for the sizes of the classes playing these (pattern and metapattern) roles, we find that the roles add very little explanatory power.
3. We also find that sizes of the classes are strongly associated with the metapattern roles played by the classes; leading to the conclusion that while pattern and metapattern roles do partially explain change-proneness, the dominant effect is indirectly through size, i.e. classes playing certain metapattern roles are larger.

Our work is in the spirit of Basili and Elbaum (2006) and Perry et al. (2000) who point out that replications and integrating multiple studies are critical to gain confidence in empirical results. In addition, our findings suggest that some widely held intuition about the change-proneness of classes playing various roles in patterns can be explained by the simpler relationships of the underlying metapatterns.

We begin with a quick overview of metapatterns (Section 2), leading to a formulation of the main research questions. We then present a detailed review of metapatterns (Section 3) and discuss related work (Section 4). We describe (Section 5) our data extraction approach. We then present our results (Section 6), discuss threats, and conclude. Throughout this paper, we refer to the patterns introduced in the classic GOF (Gang of Four) Book (Gamma et al. 1995) as design patterns and the purely structural patterns presented by Pree as metapatterns.

## 2 Overview

Metapatterns capture the pure structure of design patterns. As an illustration, we describe the structural similarity between State and Strategy patterns. First,