## 5. RESULTS

We now present our findings after performing the above data gathering and analysis in order to confirm or refute our hypotheses regarding the social structure of these open source projects.

### 5.1 Community Structure Exists

We found strong levels of community structure in all of the projects studied. The value of the modularity measure Q, as defined in 4.3, ranges from 0.4 to 0.8. The range of values for different projects, over the studied period, is shown in Figure 2. To concretize this scalar value, we show in Figure 3 an example of a network with a community structure value of 0.76 that is taken from the Perl project for the months of April to June of 2007. This example was chosen because of its relatively small size in relation to the other time periods and projects studied. In Figure 3, an edge represents one or more messages between participants; edge weights, albeit used by the algorithm, are not depicted graphically. Several distinct subcommunities can be seen; typically the edges within subcommunities represent frequent communications. Newman has found that in naturally occurring networks, modularity values of 0.3 and above indicate strong community structure [51]. As can be seen in Figure 5 we found values in this range both before and after filtering messages.

![Boxplots of modularity in projects](page7_img_1.png)

Figure 2: Boxplots of the strength of community structure for the various projects studied.

> Significance of Observed Modularity: The question arises, are these values of modularity statistically significant? Do the empirically observed modularity values reflect something special and real about how people associate and communicate on the observed email social networks, or are they just values that would arise in any random network where the same people were equally active, but had different associations? If the latter is true, that would suggest that who people talk to doesn’t matter, only how much they talk. Our claim, however, is that subcommunities form because people deliberately choose who they communicate with.
>
> A comparison of modularity values of the random networks with the same degree distributions with those from the actual networks can reject the null hypothesis at far below the .001 level. An example of a modularity distribution for Ant from April to June of 2006 is shown in Figure 4. The point on the right indicates the observed network.
>
> 5Graphs of the networks for each time period of each project can be viewed at http://janus.cs.ucdavis.edu/~cabird/cs-graphs.

![Distribution of modularity values for Ant (Apr–Jun 2006)](page7_img_2.png)

Figure 4: The distribution of modularity values for 100,000 random graphs with the same degree distribution as the observed network. The point represents the actual observed value.

![Modularity of PostgreSQL over time](page7_img_3.png)

Figure 5: The difference in strength of community structure in the PostgreSQL project over time when filtering on messages that include product-related terms.

and the curve shown is the distribution of modularity values obtained from random networks with the same degree distribution. Therefore we reject the null hypothesis that the observed modularity values would occur in a bazaar-like social network where individuals were just as socially active as in the observed network. Therefore we conclude that Hypothesis 1 is confirmed.

### 5.2 Effect of Product and Process Topics

While we identified strong community structure in the social networks prior to the filtering steps, more clearly delineated subcommunities emerge when constraining the communication that we use in our analysis to messages directly mentioning product topics, viz., emails that specifically name actual code artifacts.

As an example, figure 5 shows the modularity found in the PostgreSQL project over time when using the process messages on the developer mailing list and when using the product messages (i.e., those that mention source code artifacts directly).

Table 2 shows the average increase in modularity when we include only the product topic emails. We examined the