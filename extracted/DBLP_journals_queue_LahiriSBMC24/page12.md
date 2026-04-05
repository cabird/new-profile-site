those were due to a genuine conflict in the merge or just because somebody had decided to add a pretty-print statement while doing the refactoring. That proved to be another thorny issue for us.

TC: How did you resolve that? It sounds like you had some datasets you didn’t quite know how to interpret. So, how did you decide what should be classified as correct merges or treated as incorrect ones?

SL: We curated a dataset that did not include the “trivial” merge resolutions, with the goal of assisting users with the more complex cases first. As Alexey mentioned, users may not need tooling support for those resolutions that only require dropping one of the two edits.

AS: And then, from user studies, we learned that some users still wanted to be able to use the approach that had been dismissed. We solved that problem by providing a “B option” that people could get to by using a drop-down menu.

SL: Which is to say we addressed the problem by way of user experience rather than by changing the model. The other data problem we encountered had to do with new tokens that would occasionally appear. Upon closer examination, we found these tokens were typically related to existing changes. By going down to token-level merges, we were able to make many of these aspects go away. Ultimately, we built a model that excluded that part of the dataset where new tokens were introduced.

EM: In terms of how you went about your work, I understand one of the tools you particularly relied on was Tree-sitter [a parser-generator tool used to build syntax trees]. Can you tell us a bit about the role it played in your overall development process?

> We learned that some users still wanted to be able to use the approach that had been dismissed. We solved that problem by providing a “B option” that people could get to by using a drop-down menu.
>
> —Alexey Svyatkovskiy