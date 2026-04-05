for (universe)? What criteria matter for findings to hold for other projects (space, configuration)?

To compute the coverage for a set of projects, we implemented the algorithm shown in Algorithm I in R. For each project p ∈ P, the algorithm computes the set of projects c_project that are covered by p (Lines 3–10). As a naming convention we use the prefix c_ in variable names for sets of covered projects. In addition, the algorithm computes the projects c_dim[d] covered by each dimension d (Line 9). After iterating through the set P, the algorithm computes the coverage score within the entire space (Line 11) and for each dimension (Line 12). The apply function maps the function X → |X|/|U| to the vector c_dim and returns a vector with the result.

### 2.4 Project Selection

In order to guide project selection in such a way that the coverage of a sample is maximized, we implemented the greedy algorithm that is shown in Algorithm II. The input to the algorithm is the number K of projects to be selected, a set of already selected projects P, a universe U, an n-dimensional space D, and a configuration C = (similar1, ... , similar_n).

The algorithm returns a list of up to K projects; the list is ordered decreasingly based on how much the projects increase the coverage of the space. The set of preselected projects P can be empty. By calling the algorithm with P = ∅ and K = |U| one can order the entire universe of projects based on their coverage increase and return the subset of projects that is needed to cover the entire universe (for a score of 100%).

The main part of the algorithm is the loop in Lines 5–18 that is repeated at most K times. The loop is exited early (Lines 14–15) when no project is found that increases the coverage; in this case the entire universe has been covered (score of 100%). The algorithm maintains a candidate set of projects (candidates), which is initialized to the projects in universe U but not in P (Line 4, we use − to denote set difference). The body of the main loop computes for each candidate p ∈ candidates (Lines 8–13) how much its coverage (Line 9) would increase the current coverage c_space (Line 10) and memorizes the maximum increase (Lines 11–13). At the end of an iteration i, the project p_best with the highest coverage increase is appended to the result list and then removed from the candidates list (Lines 16–17); the current coverage c_space is updated to include the projects in c_best (Line 18).

Our R implementation includes several optimizations that are not included in Algorithm I for the sake of comprehension. To reduce the cost of set operations we use index vectors in R (similar to bit vectors). Computing the projects similar to a candidate in Line 9 is an expensive operation and we therefore cache the results across loop iterations. Lastly, starting from the second iteration, we process candidates in Line 10 in decreasing order of their |c_new| values from the previous iteration. The |c_new| values from iteration i − 1 are an upper bound of how much a candidate can contribute to the coverage in iteration i. If the current best increase |c_best| in iteration i is greater or equal than the previous increase |c_new| of the current candidate in iteration i − 1, we can exit the inner loop (Lines 8–13) and skip the remaining candidates. This optimization significantly reduces the search space for projects.

### 2.5 Implementation in R

The R implementation of the algorithms for computing coverage and selecting next projects is publicly available:

http://sailhome.cs.queensu.ca/replication/representativeness/

## 3. THE OHLOH CASE STUDY

In this section we provide an example of how to apply our technique and illustrate how it can be used to quantify the coverage of software engineering research.

### 3.1 The Ohloh Universe

We chose as universe the active projects that are monitored by the Ohloh platform [11]. Ohloh is a social coding platform that collects data such as main programming language, number of developers, licenses, as well as software metrics (lines of code, activity statistics, etc.). Note that the Ohloh data is just one possible universe and there are many other universes that could be used for similar purposes.

To collect data to describe the projects in the universe, we used the following steps:

1. We extracted the identifiers of active projects using the Project API of Ohloh. We decided to include only active projects in the universe because we wanted to measure coverage for ongoing development. We followed Richard Sands' definition [12] of an active project, that is, a project that had at least one commit and at least 2 committers in the last 12 months.
2. For each project identifier, we extracted three different categories of data (each with one call to the API). The first is the Analysis category which has data about main programming language, source code size and contributors. The second is the Activity category which summarizes how much source code developers have changed each month (commits, churn). We accumulated the activity data for the period of June 2011 to May 2012. Finally, we collected what is called the Factoid category. This category contains basic observations about projects such as team size, project age, comment ratio, and license conflicts.
3. We aggregated the XML files returned by the Ohloh APIs and converted them into tab-separated text files using a custom script. We removed projects from the universe that had missing data (156 projects had no main language or an incomplete code analysis) or invalid data (40 projects had a negative number for total lines of code).

After selecting only active projects and removing projects with missing and invalid data, the universe consists of a total of 20,028 projects. This number is comparable to the number of active projects reported by Richard Sands [12].

### 3.2 The Ohloh Space

We use the following dimensions for the space. The list of dimensions is inspired by the comparison feature in Ohloh. The data for the dimensions is provided by Ohloh.

- Main language. The most common programming language in the project. Ohloh ignores XML and HTML when making this determination.
- Total lines of code. Blank lines and comment lines are excluded by Ohloh when counting lines of code.
- Number of contributors (12 months). Contributors with at least one commit in the last 12 months.
- Number of churn (12 months). Number of added and deleted lines of code, excluding comment lines and blank lines, in the last 12 months.
- Number of commits (12 months). Commits made in the last 12 months.