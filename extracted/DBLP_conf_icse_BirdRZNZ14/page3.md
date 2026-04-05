The Fleiss’ Kappa [4] values between the external raters and our categorization were 0.679, 0.736, and 0.815 (all values statistically significant at p<0.001), which can be considered a substantial agreement [5].

These categories also reflect what the PCs were mainly used for: Browsing the web, playing games, office work, managing music, photos, or videos—and sharing and downloading files. (We did not find a single programming or scientific application in the most used applications.) The proportions of the categories do not reflect the proportions of usage, though; it is just that there are many more games than office applications; hence, for a single game, it is more difficult to end up in the top 53 applications. The distribution also reflects how PCs are configured by their vendors; on a new PC, you would more likely find recent security software than a recent blockbuster game.

For confidentiality reasons we are not able to explicitly name these applications specifically other than to note that these are some of the most commonly used applications in each domain. Throughout this paper, we refer to applications in an anonymized way; Internet-1 through Internet-14, Files-1 through Files-5, etc. This serves to show the intensity and trends of reliability effects within and between application domains without indicating the exact product or the associated organization that produced it.

Again, note that these categories only refer to machines whose users opted to send usage data. We discuss such issues in our threats to validity in Section VII.

### 3.2 Characterizing Systems with Features

For each machine observed, we analyzed configuration information and reliability data for the first week after the first startup of the operating system after installation. That is, when a new machine was enlisted in the CEIP between January and March, 2011, we examined data collected from the machine for just the first week. We specifically investigated this first week, as the initial impression with a new system very much determines user satisfaction; if the user experience is negative, he or she may even return a new computer.

The data consisted of a set of features that describe several aspects of each system: hardware configuration, applications installed and used as well as application failures. For the purpose of our study and to allow a more natural comparison, we dichotomized all features into binary variables. For app usage and installation this was fairly straightforward. For continuous measurements such as the amount of RAM installed or processor speed, we split about the median (the mean was not used due to skew in the data, indicating that a non-parametric measure was appropriate).

1. Hardware features. This includes seven features, which were true if they were above the median, and false if not. Generally, “true” values indicate more powerful machines.
   - # processors. True if more than two processors.
   - Processor speed. True if 2,262 MHz or more.
   - # logical drives. True if four or more logical drives.
   - # physical drives. True if two or more physical drives.
   - Drive size. True if 227,273 MB or more total space (used or unused) on all drives.
   - Memory size. True if 2,933 MB or more total memory.
   - Video memory. True if more than 128 MB video memory.
2. Applications installed. If an application was launched once or more in the one-week period, we considered it to be “installed”. (Note that a “launch” of an application may also be the launch of an installer belonging to that application.)

3. Applications used. If an application was launched more than five times in the one-week period, we considered it to be “used”. (If an application was used less than five times, this indicates that it was just installed or tried, but never used again.)

4. Application failures. If any of the binaries of the application terminated abnormally at least once in the one-week period, we considered the application “crashing”, indicating lowered reliability.

### 3.3 Logistic Regression

In order to relate application failures to hardware features, and to the presence and usage of specific applications, we used logistic regressions to determine how the individual factors influence failure probability [6]. Logistic regression allows us to determine the relationship that one factor has with a dichotomous outcome when controlling for other factors that may also be related to the outcome.

In our case, this allows us to answer questions such as for example “How is AdventureWorks reliability related to SouthBridge Video usage when controlling for the effects of system memory constraints?” By including many factors in one logistic model, we can take a global view of the interplay between many factors in different categories such as processor speed, specific applications installed, and specific applications used. Each logistic model has the following components:

- Reliability variable. For each application we built logistic models for a reliability variable z, which has a value of 0 if the application crashed in the first week after OS startup and 1 otherwise.
- Binary factors. For each regression model, we use as independent variables a set of binary factors, x1, x2, …, xn, which represent hardware features, applications installed, and/or applications used.
- Regression coefficients. Given a set of observations (z, x1, …, xn) from our data set, each observation corresponding to one user’s experience, logistic regression computes the best fit regression coefficients β0, β1, …, βn such that

  P(z) = 1 / (1 + e^{-(β0 + β1 x1 + β2 x2 + ⋯ + βn xn)})

models the probability that z has a value of 1, that the application encounters no crashes.

Each of the regression coefficients βi indicates the sign and strength of the influence of the factor xi within the model. The model also indicates the statistical significance of the variables (the probability that the variable actually has no effect on application reliability). For the statistical analysis we accounted for multiple hypothesis testing and considered only coefficients that are statistically significant at p<0.05 after adjusting p-values with Benjamini-Hochberg [7] correction.

Let us assume that z was the reliability variable for an image manipulation program, and x1, x2, x3 would indicate if three applications were installed: an antivirus program (x1), an office application (x2), and a compression utility (x3). Then, in a hypothetical regression model such as

Reliability = 1 / (1 + e^{-(0.9 + 0.41 x1 − 0.5 x2 + 0.1 x3)})

the positive coefficients β1 and β3 would show that the presence of the antivirus program and compression utility increased the reliability of image application (and the antivirus application does so by a stronger amount than the compression utility), whereas the presence of the office application decreased reliability (and increased the likelihood of the image application experiencing failure). If none of the