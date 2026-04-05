used aspects of generics to more qualitatively identify the value and impact of generics on the software.

## 10 Conclusion

We have explored how Java developers have used, and not used, Java generics over the past few years. We uncovered surprising generics usage trends, but also observed variation between projects and between developers. However, the results presented here illustrate only broad trends; future work will explain why these trends and variations exist.

While we expect that our retrospective results will, at this point, have little impact on Java generics, our results may help us adjust our expectations about the adoption of future language features. For example, based on our results, developers may not replace old code with new language features, so perhaps the introduction of a language feature alone is not enough to assure adoption. In future language-design wars, we hope that empirical data about how developers use language features may be an antidote to anecdotes.

### Acknowledgements

Thanks to NCSU students Brad Herrin, Donghoon Kim, Michael Kolbas, and Chris Suich, who contributed code to our analysis framework. Thanks to Jonathan Aldrich, Andrew Black, Prem Devanbu, Mike Ernst, Ron Garcia, Gail Murphy, Zhendong Su, and Thomas Zimmerman, who provided valuable advice.

### Errata

In the MSR paper on which this paper is based (Parnin et al. 2011), we made three mistakes that have been corrected in this article. Because of these corrections, the results in this paper supersede the results from the MSR paper. We highlight the corrections here.

First, our time series analysis of casts versus generics undercounted the number of casts and generics. The time series appears in Fig. 5, along with a corrected correlation analysis (Section 6.1). This change reverses our original conclusion, which originally stated that generics do not have a strong influence on casts in a project.

Second, we originally miscounted the number of generic language features due to two bugs in our analysis software. The corrected numbers and graphs appear throughout this paper. The corrected numbers and graphs do not change our original conclusions because the shape of the data remains nearly identical.

Third, our original example of a generic method declaration in Section 2.2 was not correctly typed code. The new example is correctly typed.

### Appendix

In this Appendix, we show extended figures for all projects.