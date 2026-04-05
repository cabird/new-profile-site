- For categorical dimensions (e.g., main programming language): We consider two projects to be similar in a dimension if the values are identical.
  similar_d(p1, p2) → p1[d] = p2[d]

As mentioned above the similarity functions can be overridden in a configuration. Different configurations may exist for different research topics and areas. The distinction into numerical and categorical dimensions is a simplification as not all measurements of software are on a numerical and absolute scale. Measurements that are on ordinal scale could easily be accounted for with custom similarity functions.

## 2.2 Example: Coverage and Project Selection

Figure 1(a) shows a sample universe and a sample space: the universe contains 50 projects, each represented by a point. The space is defined by two dimensions: the number of developers (horizontal) and the number of lines of code (vertical). In practice, the universe can be thousands of projects and the space can be defined by numerous dimensions, not just two. We will present a more complex instantiation of our framework in Section 3.

Consider project A in Figure 1(a) which is represented by an enlarged point. The light gray areas indicate the projects that are similar to project A in one dimension (based on the similarity functions that are defined in the configuration). The intersection of the light gray areas (the dark gray area) indicates the projects that are similar to A with respect to the entire space. In total seven other projects are similar to A. Thus project A covers (7+1)/50 = 16% of the universe. We can also compute coverage for individual dimensions: project A covers 13/50 = 26% for number of developers and 11/50 = 22% for lines of code.

Figure 1(b) illustrates how a second project increases the coverage:
- If we add project B, ten additional projects are covered, the universe coverage increases to 18/50 = 36%. The coverage of the developer and lines of code dimensions increases to 60% and 56% respectively.
- However, if we add project C instead of project B, there is only little impact on coverage. All similar projects have been already covered because project C is close to project A. Thus the universe coverage increases only to 18%.

![Sample universe of projects defined by a two-dimensional space](page3_img_1.png)

(a) (b)  
Fig. 1. Sample universe of 50 projects defined by a two-dimensional space. (a) The light gray areas indicate projects similar to project A in one dimension. The dark gray areas indicate projects similar to project A in both dimensions. (b) Project B increases the coverage of the space more than project C does, because C is too similar to projects already covered by project A.

### ALGORITHM I. Scoring Projects

```
score_projects(projects P, universe U, space D, config C):
1:  c_space ← ∅
2:  c_dim ← [∅, …, ∅]
3:  for each project p ∈ P:
4:    c_project ← U
5:    for each dimension d ∈ D:
6:      are_similar(p, q) ← C[d](p, q)
7:      sim_projects ← {q | are_similar(p, q)}
8:      c_project ← c_project ∩ sim_projects
9:      c_dim[d] ← c_dim[d] ∪ sim_projects
10:   c_space ← c_space ∪ c_project
11: score ← |c_space| / |U|
12: dim_score ← apply(c_dim, X → |X| / |U|)
13: return (score, dim_score)
```

### ALGORITHM II. Selecting the Next Projects

```
next_projects(K, projects P, universe U, space D, config C):
1:  result ← [ ]
2:  similar(p, q) = C[1](p, q) ∧ … ∧ C[d](p, q)
3:  c_space ← ⋃_{p∈P} { q | similar(p, q) }
4:  candidates ← U − P
5:  for i ∈ {1, …, K}:
6:    c_best ← ∅
7:    p_best ← NA
8:    for each candidate p ∈ candidates:
9:      c_candidate ← { q | similar(p, q) }
10:     c_new ← (c_space ∪ c_candidate) − c_space
11:     if |c_new| > |c_best|:
12:       c_best ← c_new
13:       p_best ← p
14:   if p_best = NA:
15:     break
16:   result ← append(result, p_best)
17:   candidates ← candidates − {p_best}
18:   c_space ← c_space ∪ c_best
19: return (result)
```

This illustrates an important point: to provide a good coverage of the universe, one should select projects that are diverse rather than similar to each other. We now introduce algorithms to score the coverage (score_projects) and to select additional projects such that the coverage is maximized (next_projects).

## 2.3 Computing Coverage

We compute the sample coverage of a set of projects P for a given universe U, an n-dimensional space D, and a configuration (similar1, …, similarn) as follows. (Recall that the definition of similar is similar = similar1 ∧ … ∧ similarn)

coverage = |⋃_{p∈P} { q | similar(p, q) }| / |U|

As discussed before, research topics can have different parameters for universe, space, and configuration. Therefore it is important to not just report the coverage but also the context in which it was computed: What projects is the research intending to be relevant to?