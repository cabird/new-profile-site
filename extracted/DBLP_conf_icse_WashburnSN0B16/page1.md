## “What Went Right and What Went Wrong”: An Analysis of 155 Postmortems from Game Development

Michael Washburn Jr.1, Pavithra Sathiyanarayanan1, Meiyappan Nagappan1, Thomas Zimmermann2, Christian Bird2  
1 Rochester Institute of Technology, Rochester, NY, USA  
2 Microsoft Research, Redmond, WA, USA  
{mdw7326, ps2908}@rit.edu, mei@se.rit.edu, {tzimmer, cbird}@microsoft.com

### ABSTRACT
In game development, software teams often conduct postmortems to reflect on what went well and what went wrong in a project. The postmortems are shared publicly on gaming sites or at developer conferences. In this paper, we present an analysis of 155 postmortems published on the gaming site Gamasutra.com. We identify characteristics of game development, link the characteristics to positive and negative experiences in the postmortems and distill a set of best practices and pitfalls for game development.

### Keywords
Games, Postmortems, Qualitative analysis.

### 1. INTRODUCTION
Over the past thirty years, the importance and market-share of video games in the world of software has grown by leaps and bounds. In lockstep with this growth, the scale of work required to develop games, whether in terms of budget, size of codebase, or team makeup, has ballooned and is on par with or exceeds any other software endeavors [13]. Games are arguably the most sophisticated and complex forms of software [18].

Indeed, games have been the driving factors behind many technological advances including high performance graphics cards, virtual reality, and distributed computing [16, 13]. Games also represent a substantial portion of software revenue; in 2013, video game revenue totaled over 93 billion dollars [21]! As such, the money, manpower, and effort put into video game development is likely to continue to increase in the coming years.

From a development perspective, games differ from more traditional software projects in a number of ways. Requirements are more subjective (e.g. "must be fun"), maintainability is often sacrificed for performance, testing and quality assurance are approached completely differently (e.g. live testers and few automated tests), most games require tools created from scratch, and deadlines are incredibly tight [12].

Therefore it is important to understand both the challenges that game development efforts face as well as the best practices that teams use to build games more effectively. The challenges are real problems faced by complex software efforts and represent avenues for research for our community. Successes and best practices embody knowledge that can aid future game development efforts and in some cases may generalize to or can be adapted for software development in non-game contexts. Because game development makes up a large slice of commercial software, a non-trivial proportion of students in computer science and software engineering programs will work on games during their careers. An understanding of game development can help educate and prepare such students.

Interestingly, game development has received very little attention in the academic community, as only three of the 116 open and closed source projects studied in the major software engineering conferences in two years were games [15]. Thus, one might reasonably expect that getting an inside view of game development is limited to a select few. Fortunately, the game development community has a unique practice that belies this assumption. Development teams often conduct postmortem retrospectives and share them publicly on gaming sites such as Gamasutra.com and at gaming conferences such as the Game Developers Conference (GDC). These postmortems offer an open and honest window into the development of games, often sharing the mistakes, setbacks, and wasted effort just as much as the successes and heroics that go into game building.

To address the limited study of this domain and shed light on the practice of game development we qualitatively and quantitatively analyze 155 retrospective postmortems published on Gamasutra.com over 16 years. These postmortems cover games for PCs, mobile devices, and consoles and range from small independent efforts to large AAA game franchises. As such, this represents the largest and most diverse study of game development to date and this data allows us to draw conclusions from a broad spectrum of game development. We make the following contributions in this paper.

- We present an empirically derived taxonomy of characteristics or dimensions of game development.
- We synthesize the best practices and commonly encountered challenges in game development and identify those areas that impact project outcomes the most.
- We provide recommendations for future game development based on the experiences shared in over one hundred postmortems.