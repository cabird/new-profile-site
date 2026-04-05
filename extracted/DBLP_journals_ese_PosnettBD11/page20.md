control for different effects (version Mv, version+roles Mrv, version+roles+size Mvrs
etc.) and are described in detail below. Under the major columns, the first three
sub-columns show the direction and significance for the template, hook, and implementation
roles respectively. The next column shows the significance and direction of
the remaining pattern roles that are not related to metapattern roles. The column
labeled 2 represents the effects code for a class that is playing 2 distinct roles and
the column labeled N indicates the effect when a class plays more than 2 distinct
roles. Finally, the column labeled R2 gives the variance explained by that particular
model.

Each row and major column represents a specific model and within each major
column (e.g., Mvrs), each sub-column represents a variable. The cell corresponding
to row and column gives the significance of the variable. Due to the large number of
models and the need to present the results somewhat succinctly we use symbols to
indicate both the strength and direction of each coded predictor. We visually code the
direction and significance of the p-values representing the role coefficient t-tests as
explained in the caption of the figures. For each model we adjusted model p-values
for multiple hypothesis testing using the Benjamini–Hochberg method (Benjamini
and Hochberg 1995). Models that were not statistically significant (p > 0.05) are
indicated with NS. Entries that contain NA had an insufficient number of classes
in one or more roles, or an insufficient number of pattern occurrences, such that
the model could not be fit. For each model we consider only the subset of classes
that play at least one role in the indicated pattern. We perform multiple hypothesis
correction on the coefficient t-tests for role predictors but also report the p-values to
three levels as indicated in the legend.

## 6.1 Models Mv

We first briefly discuss the baseline model for across-release change-proneness,
which is shown in the leftmost column headed Mv. This model, which uses only
the release identifier as a factor, captures the between-release change-proneness
variation. We later use the release predictor variable to control for the between-
release variation in other models. For JHotDraw, release alone accounts for sig-
nificant change-proneness across all patterns. For Xerces, the effect of release is
more moderate and for Eclipse JDT, significantly lower. In essence, this simple
model captures the degree to which releases are different with respect to change-
proneness. For the purposes of this work, however, release is a control and we are not
interpreting the coefficients other than to observe that its effect on change proneness
is project dependent.

## 6.2 Models Mvr

The models in the second major column labeled Mvr are most similar to results
by Di Penta et al.. These models show the relationship between roles and change-
proneness when not controlling for size. From this we can see that almost without ex-
ception, whenever classes playing the hook role are significant, they are, as expected
by reported intuition, less change-prone. For JHotDraw some roles are significant,
for Xerces about one half are significant and for Eclipse JDT most of the roles are
significant.

Looking at the results for Eclipse JDT, the roles reflect previously reported
intuition for many of the patterns. For example, the state/strategy pattern results