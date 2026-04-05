![Pex4Fun user interface screenshot](page3_img_2.png)

Fig. 2. The Pex4Fun user interface.

```c
return x * (x-1) / 2;
}
}
```

Other solutions showed slightly refactored versions of this formula (below, showing just the method body):

```c
return (x*x-x)/2;
```

Some solutions were imperative, and sometimes included special cases:

```c
if (x == 0)
{
    return 0;
}
int t_x = (x * (x / 2));
if ((x & 0x1) == 0)
{
    t_x -= (x / 2);
}
return t_x;
```

Some programmers’ special cases (and comments) apparently arose from their problem-solving process, coding against the input-output pairs provided by the Pex4Fun environment:

```c
if (x==0) return 0;
if (x==1) return 0;
if (x==2) return 1;
if (x==3) return 3;
// if (x==4) return 6;
// if (x==14) return 91;
// if (x==47) return 1081; //23
// if (x==79) return 3081; //39
return (x-1)*x/2;
```

Other programmers submitted iterative solutions:

```c
int sum = 0;
for (int i = x-1; i >= 0; i--)
{
    sum += i;
}
```

## Table 1
METHODOLOGY SUMMARY

![Methodology summary table](page3_img_1.png)

```c
}
return sum;
```

Other programmers solved the problem with a while loop instead of a for loop:

```c
int i = 0;
int z = 0;
while (x > 0 && ++i <= x)
{
    z = z + i - 1;
}
return z;
```

Similarly, several programmers solved the problem recursively:

```c
return x == 0 ? 0 : (x-1) + Puzzle(x-1);
```

Finally, one programmer submitted this clever solution:

```c
return Enumerable.Range(0, x).Sum();
```

Although we expected to find diversity in Pex4Fun answers, we were surprised with how much diversity in these “bug fixes” we found. This is especially notable because programmers had no incentive to produce diverse solutions because (a) they were only rewarded for producing a working solution and (b) they could not see each others’ solutions. Although we did not quantitatively assess the diversity, the qualitative diversity in people’s Pex4Fun solutions is readily apparent.

The diversity of Pex4Fun solutions alludes to the diversity that may exist in bug fixes. Indeed, as our data in Section 5.1 suggests, programmers in our study estimated that about half of the bugs that they fix in the wild have multiple possible solutions. In the remainder of this paper, we explore both the diversity in real bug fixes, and the rationale for that diversity. Specifically, we seek to answer two research questions:

RQ1: What are the different ways that bugs can be fixed?  
RQ2: What factors influence which fix an engineer chooses?