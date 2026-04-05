![Figure 2: Casts and parameterized types over time](page13_img_1.png)

Figure 2 – Casts and parameterized types over time

> The normalized value of casts tended to decrease over time for all projects, regardless of whether or when generics were introduced.
> 
> - The normalized value of generics tends to increase over time. Nine projects show the number of generics increases monotonically, while the other projects show the number of generics increases steadily with occasional, small drops in the number of generics.
> 
> In addition to these general trends, several specific trends suggest that some relationship between generics and casts exists in several projects. For example, the nhibernate project shows that the normalized value of generics spikes from mid-2007 to mid-2008 while the normalized value of casts sharply decreases. We found such inverse relationships in several other projects as well, including cuyahoga between December 2007 and January 2008, ccnet between March 2009 and April 2009, and mono in the middle of 2004. A total of 8 out of 19 projects which used generics show this sharp inverse relationship at some point in their histories. At least for these projects, this implies that an increase in generics leads to a decrease in casts. However, evidence exists for the opposite case, with 4 projects showing both casts and generics increased concurrently at some point.
> 
> Besides visual inspection of the data, we assessed the strength of the relationship between generics and casts using Spearman’s rank correlation coefficient [MWL10]. For example, if Spearman’s coefficient is a negative value, then an increase in generics is correlated with a decrease in casts (an inverse correlation). Otherwise, it is a direct correlation. Based on our research question, we may expect that most projects exhibit an inverse correlation.