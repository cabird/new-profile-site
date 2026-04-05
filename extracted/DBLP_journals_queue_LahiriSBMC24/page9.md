> CB I think it’s hazardous to speculate about what models may or may not be capable of. I mean, that’s a super‑nuanced question in that it depends on how the model has been trained and what the architecture is like—along with any number of other things. I’m constantly surprised to learn what models are now capable of doing. And, in this case, we’re talking about the state of the world back in 2020—even as I now find it hard to remember what the state of the world looked like six months prior to the GPT models becoming widespread.
> 
> SL For one thing, we were using pretrained models to handle classification and generation, which then left us with quite a bit of work to do in terms of representing the resulting edits at the AST level before tuning for performance. That certainly proved to be a complex problem—and one that came along with some added computational costs. Also, as I remember it, the models we were using at the time had been trained as text representations of code—meaning we then needed to train them on a lot more AST‑level representations to achieve better performance. I’m sure it would be fascinating to go back to revisit some of the decisions we made back in 2020.
> 
> EM What model are you using now?
> 
> AS For this iteration, we’re employing a token‑level merge along with a transformer‑based classifier. We’ve also been looking at using a prompt‑driven approach based on GPT‑4.
> 
> EM I love that this is now something where you can take advantage of demonstrated preferences to resolve merge conflicts instead of being left to rely solely on your own opinions.
> 
> SL Another way of looking at this that came up during