> If you feed a model a rich structured information set, is that model then actually more likely to make better decisions? Or is that perhaps a false assumption?  
> —Terry Coatta

that might yield a product. With that in mind, we realized it needed to be, perhaps not language-agnostic, but at least something that could be readily adapted to multiple languages—and definitely not something that would require some bespoke analysis framework for each language. That essentially guided our choice not to employ richer or more complex code representations.

EM I’ve also run into situations like this where it looked really tempting to use an AST [abstract syntax tree] or something of the sort, since that would provide all the structure that was required. But then, as you go deeper into that sort of project, you find yourself wondering whether it’s actually a good idea to feed semantically rich programs into models and start thinking it might be better just to send strings instead.

TC To dive a bit deeper into that, you had a practical motivation to work with a token-based approach. But what does your intuition tell you about how models behave when you do that? If you feed a model a rich, structured information set, is that model then actually more likely to make better decisions? Or is that perhaps a false assumption?

AS The model ought to be able to make better decisions, I think.

EM All right, but can I challenge that a bit? The model can handle the syntax and semantic analysis internally, which suggests this work may not need to be done ahead of time, since machines don’t look at code the same way humans do. I don’t know why the model couldn’t just build its own internal representation and then let a type-checker come along at the end of the process.