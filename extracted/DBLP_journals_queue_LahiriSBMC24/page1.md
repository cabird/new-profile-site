## Program Merge: What’s Deep Learning Got to Do with It?

> A discussion with  
> Shuvendu Lahiri,  
> Alexey Svyatkovskiy,  
> Christian Bird,  
> Erik Meijer and  
> Terry Coatta

![decorative yellow brush stroke](page1_img_decor_1.png)

If you regularly work with open-source code or produce software for a large organization, you’re already familiar with many of the challenges posed by collaborative programming at scale. Some of the most vexing of these tend to surface as a consequence of the many independent alterations inevitably made to code, which, unsurprisingly, can lead to updates that don’t synchronize.

Difficult merges are nothing new, of course, but the scale of the problem has gotten much worse. This is what led a group of researchers at MSR (Microsoft Research) to take on the task of complicated merges as a grand program-repair challenge—one they believed might be addressed at least in part by machine learning.

To understand the thinking that led to this effort and then follow where that led, we asked Erik Meijer and Terry Coatta to speak with three of the leading figures in the MSR research effort, called DeepMerge ("DeepMerge: Learning to Merge Programs," Microsoft Research). Meijer was long a member of MSR, but at the time of this discussion was director of engineering at Meta. Coatta is the CTO of Marine Learning Systems. Shuvendu Lahiri and Christian Bird, two of the researchers who helped drive this effort, represent MSR, as does Alexey Svyatkovskiy, who was with Microsoft DevDiv (Development Division) at the time.