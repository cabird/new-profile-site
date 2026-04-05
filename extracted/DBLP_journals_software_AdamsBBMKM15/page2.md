different processes, tools, and approaches using this dataset.

To gain another perspective, we have systems that interact with our users, either by providing them a way to give direct feedback or by going through logs and looking for different types of failures. This data is distilled and presented to product teams as a collection of signals that speak of product robustness and of complaints that users mention most often.

For Web services and servers, “canarying” is another key component of successful releases. Canary rollout strategies depend on the type of service, user expectations, and contractual obligations. In this type of rollout, we gradually increase the exposure of the new binary and at all times monitor the critical parameters. Canaries are the bread and butter of the final stages of a well-designed release process.

Rossi: I’ll talk about Web deployment first and then contrast it with mobile deployment. For Web deployment, we use the metrics of the code going into the master branch, the test results, and performance lab results. The next level includes metrics for products being released, such as core tests, unit tests, and performance experiments like time to interaction (TTI), fatal-error rates, the number of errors per page, and any new errors that we hadn’t seen in the production logs.

Then comes the canary step. The set of binaries for a release sit in the canary state for 30 minutes to an hour. I look at the logging and flag new errors, error rate changes, and fatal or elevated error rates for an existing error. Core metrics include TTI; the number of likes, photos uploaded, and comments; and the amount of tagging. We compare the growth and interaction metrics from the canary to those from production. A release engineer and the developers look at them with more detailed dashboards. For example, the ad teams have dashboards on ad displays and ad click-throughs. Our alerting system works on either absolute numbers or the percentage rate. The biggest alert is that the front end is rendering so slowly because I’ve lost half the back-end machines that are providing data for this service. I wouldn’t have found that internally, but I will find it in canary because it is millions of people.

Mobile deployments are more challenging than Web deployments because we don’t own the ecosystem, so we can’t do all the things that we would normally do. And the canaries are huge. We watch cold start, warm start, the app size, and the numbers of photos uploaded, comments, and ads being displayed or clicked. Growth and engagement numbers and the crash rate are important to the company. If the crash rate fluctuates, we immediately take action to understand why.

![Canarying callout box](page2_img_1.png)

> For Web services and servers, “canarying” is a key component of successful releases.

And the Web is the log data for each new build. In a canary, we collect that log data separately from the regular production traffic. A website has thousands of firing errors and warnings, and we look for changes in those. An analysis of errors in the log data that differ from production is the first part of the canary. That’s easy, and it’s universal—it doesn’t matter what your app is doing.

Another big alert is when the canary TTI is much higher than the production TTI. Is it because we just increased login calls by 10 times? Or because a database call to render the first page is not going through cache and it’s trying to do a lookup every time? TTI helps us flesh out the problem. We pay particular attention to how long it takes the main page to render.

I have graphs for the back-end machines, but I look for effects on the front end. When I see those effects, I’ll start digging down. I might see, for example, that only Internet Explorer 7 on Windows boxes is showing a bad TTI. Or I’ll realize that the front end is rendering so slowly because I’ve lost half the back-end machines that are providing data for this service. I wouldn’t have found that internally, but I will find it in canary because it is millions of people.

Concerning rollback, we’ve never had a canary that bad. Generally, it’s always rolling forward. We’ll promote the release candidate to the production binary in our store, roll it to 5 percent of users, and get data back from that. If that 5 percent looks good, we’ll roll it out to the rest of the population. I always make the analogy that it’s like a bullet from a gun. It just keeps going.

The mobile ecosystem is so broken when it comes to software management that I don’t want to force people to re-download. Every time I have to ask them to re-download, I lose a certain percentage of people who just never do it. So that’s the challenge.

MARCH/APRIL 2015 | IEEE SOFTWARE 43