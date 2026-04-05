There also were those studies Michaela just mentioned, where we considered comment usefulness. That was based on data gathered from across all of Microsoft and then fed into a machine-learning classifier we had built to categorize code reviews. We ended up using that to classify 3 million reviews of code that had been written by tens of thousands of developers and drawn from every codebase across the whole of Microsoft—meaning we’re easily talking about hundreds of millions of lines of code. Obviously, the quantitative data analysis we were able to perform there was based on a substantial amount of data. The qualitative observational studies, on the other hand, were typically much smaller.

MG We definitely had a tremendous amount of data available—essentially all the code written for Office, Windows, Windows Phone, Azure, and Visual Studio, as well as many smaller projects.

JC We also enjoy an advantage here at Microsoft in that we have so many different product types. We look at the work people do on operating systems, as well as apps and large-scale services and small-scale services and everything in between. We’re very aware of the different demands in each of these areas, and we make a point of keeping that in mind as we do our studies.

LP In those cases where you could derive data from the use of CodeFlow, were you also able to further instrument the tool to augment your studies?

JC One of the most interesting things to surface from instrumenting CodeFlow was just how much time people were actively spending in the review tool. That’s because