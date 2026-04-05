# Have Agile Techniques been the Silver Bullet for Software Development at Microsoft?

Brendan Murphy — Microsoft Research, Cambridge, UK — bmurphy@microsoft.com  
Christian Bird — Microsoft Research, Redmond, USA — cbird@microsoft.com  
Thomas Zimmermann — Microsoft Research, Redmond, USA — tzimmer@microsoft.com  
Laurie Williams — NCSU, Raleigh, USA — williams@csc.ncsu.edu  
Nachiappan Nagappan — Microsoft Research, Redmond, USA — nachin@microsoft.com  
Andrew Begel — Microsoft Research, Redmond, USA — andrew.begel@microsoft.com

## Abstract—Background

The pressure to release high-quality, valuable software products at an increasingly faster rate is forcing software development organizations to adapt their development practices. Agile techniques began emerging in the mid-1990s in response to this pressure and to increased volatility of customer requirements and technical change. Theoretically, agile techniques seem to be the silver bullet for responding to these pressures on the software industry.

Aims. This paper tracks the changing attitudes to agile adoption and techniques, within Microsoft, in one of the largest longitudinal surveys of its kind (2006–2012).

Method. We collected the opinions of 1,969 agile and non-agile practitioners in five surveys over a six-year period.

Results. The survey results reveal that despite intense market pressure, the growth of agile adoption at Microsoft is slower than would be expected. Additionally, no individual agile practice exhibited strong growth trends. We also found that while development practices of teams may be similar, some perceive and declare themselves to be following an agile methodology while others do not. Both agile and non-agile practitioners agree on the relative benefits and problem areas of agile techniques.

Conclusions. We found no clear trends in practice adoption. Non-agile practitioners are less enamored of the benefits and more strongly in agreement with the problem areas. The ability for agile practices to be used by large-scale teams generally concerned all respondents, which may limit its future adoption.

Index Terms—Agile, agile development, survey, interviews

## I. INTRODUCTION

The needs of customers, distribution mechanisms, and market pressures often drive the release cycle of software products. For Microsoft and other large companies, the principal software customers had historically been businesses that went through costly acceptance testing before installing the software on their internal computers. Frequent releases of software place a strain on this type of customer and, therefore, were not desirable. Additionally, software was often delivered to the customers in a physical form, such as a box set, whose production and distribution caused considerable cost and time delay. In theory, "traditional" formal or waterfall methods development methodology was used to develop these large software products. In reality, many large software companies did not religiously follow any specific development methodology and adapted methods and tools to suit the products they were producing.

Over time, consumers of software and software-intensive products increasingly welcomed more frequent software releases. Simultaneously, software began to be distributed electronically, and software-as-a-service (SaaS) increased in popularity. Traditional methodologies were viewed as too slow, not customer focused, not adaptable and too bureaucratic to handle the new software reality. In response, agile methods emerged in the mid-1990s, and the Agile Manifesto1 was published in 2001 to propose methods to allow faster software development and release. The techniques proposed by the Manifesto authors were not new but were adaptations of method already in operation packaged to address a growing problem of releasing high-quality, valuable software frequently.

Many companies have adopted agile methods, especially in the area of SaaS (e.g. Google), where releasing and distributing software is cheap and fast. These companies are feature driven and, therefore, need a rapid software development and release model. Software defects can be quickly corrected and made available to their customer base.

Software companies are now releasing products more frequently, which challenges traditional software development methodologies and makes agile methodologies seem a better fit. The question is whether companies are moving towards agile methods and if not, why not.

The empirical strategy applied in this paper is to track the usage, practices and perception of agile within Microsoft based on the results of interviews and five annual surveys taken between 2006–2012. (We previously reported results for the first survey [4, 3]). To improve interpretation, respondents were asked to categorize themselves as either agile practitioners or not and also to specify their job roles. The survey assumed that respondents correctly categorized themselves as either agile or non-agile practitioners. The survey results within Microsoft were benchmarked against the software industry as a whole, by comparing the results against the equivalent industry-wide re-

1 http://www.agilemanifesto.org