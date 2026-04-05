### SHUVENDU LAHIRI

> Even after a merge has been produced, someone might want to know why the merge was accomplished in that particular way and may even want to see some evidence of what the reasoning was there. Well, that’s a thorny issue.

With a token-based approach. But what does your intuition tell you about how models behave when you do that? If you feed a model a rich, structured information set, is that model then actually more likely to make better decisions? Or is that perhaps a false assumption?

**SVYATKOVSKIY:** The model ought to be able to make better decisions, I think.

**MEIJER:** All right, but can I challenge that a bit? The model can handle the syntax and semantic analysis internally, which suggests this work may not need to be done ahead of time, since machines don’t look at code the same way humans do. I don’t know why the model couldn’t just build its own internal representation and then let a type-checker come along at the end of the process.

**BIRD:** I think it’s hazardous to speculate about what models may or may not be capable of. I mean, that’s a supernuanced question in that it depends on how the model has been trained and what the architecture is like—along with any number of other things. I’m constantly surprised to learn what models are now capable of doing. And, in this case, we’re talking about the state of the world back in 2020—even as I now find it hard to remember what the state of the world looked like six months prior to the GPT models becoming widespread.

**LAHIRI:** For one thing, we were using pretrained models to handle classification and generation, which then left us with quite a bit of work to do in terms of representing the resulting edits at the AST level before tuning for performance. That certainly proved to be a complex problem—and one that came along with some added computational costs. Also, as I remember it, the models we were using at the time had been trained as text representations of code—meaning we then needed to train them on a lot more AST-level representations to achieve better performance. I’m sure it would be fascinating to go back to revisit some of the decisions we made back in 2020.

**MEIJER:** What model are you using now?

**SVYATKOVSKIY:** For this iteration, we’re employing a token-level merge along with a transformer-based classifier. We’ve also been looking at using a prompt-driven approach based on GPT-4.

**MEIJER:** I love that this is now something where you can take advantage of demonstrated preferences to resolve merge conflicts instead of being left to rely solely on your own opinions.

**LAHIRI:** Another way of looking at this that came up during our user studies was that, even after a merge has been produced, someone might want to know why the merge was accomplished in that particular way and may even want to see some evidence of what the reasoning was there. Well, that’s a thorny issue.

But one of the nice things about these large foundational models is that they’re able to produce textual descriptions of what they’ve done. Still, we haven’t explored this capability in depth yet, since we don’t actually have the means available to us now to evaluate the veracity of these descriptions. That will have to wait until some user studies supply us with more data. Still, I think there are some fascinating possibilities here that ultimately should enable us to reduce some of the friction that seems to surface whenever these sorts of AI power tools are used to accomplish certain critical tasks.

In the event you regularly work with open source code, you are surely already familiar with some of the challenges that can arise in the course of trying to resolve merge conflicts. Many of these problems have been encountered for as long as people have collaborated on programs, and these have metastasized as the scale and complexity of software has multiplied many times over. Also, with thousands of developers sometimes now collaborating on projects, the potential for conflicts only continues to soar.

Many of these are conflicts that can lead to program failures, of course. But even worse, in some respects, are the more subtle semantic merge conflicts that can fail the compiler, break a test, or introduce a regression. Despite these painfully obvious problems, the program merge issue has been largely left to fester for decades simply because the challenge of addressing it has seemed so daunting.

**COATTA:** You’ve mentioned that you had access to a vast amount of training data, but you’ve also suggested some of