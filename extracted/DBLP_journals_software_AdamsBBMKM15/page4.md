Software deployment professionals need a solution that addresses the security concerns but lets us update our valid, legitimate apps seamlessly with no pain to the user.

Moir: I think the continuous-delivery model for desktop software works well if the updates are silent and users don’t get constantly notified about them. Otherwise, they get annoyed. As Chuck said, the mobile model obviously is different because Google and Apple own the distribution, and the default behaviors require users to update as they feel like it.

At our company, we are focused on relentlessly automating everything. We’re automating the uplift of all the changes from beta to release or from Aurora to beta, to have fewer manual steps. We’ve come a long way from when we first started releasing software, and we had a big page of instructions to follow by hand, which was not very efficient. Now there’s a great deal of deep knowledge about how everything works, so that when something goes wrong, we can fix it. This lets us focus on writing tools to improve our continuous-integration farm and our release automation.

If a company is thinking about moving to continuous integration, it needs to get a release engineer on board in the early stage, not the later stage. Sometimes, product teams work on a product almost in secret and throw it over the fence when they’re done. Then, release engineers want to run away screaming when they see that the product is built on a hacky pile of spaghetti, and they have to fix it.

It’s also good to have someone who’s not emotionally attached to the code and who is focused on getting the pipeline in place as well as getting the product in place. The release engineer doesn’t get upset if you say, “You can’t put that feature in because it’s going to break everything, and we need to ship tomorrow.” As a release engineer, your focus is getting a stable release out the door.

Debic: The possibilities and limitations of continuous delivery depend on the type of deliverable. Is it a Web service, a mobile application, or software for a medical device or aircraft autopilot? In the high-tech business, the Holy Grail of release engineering is something called “push-on-green.” As soon as a developer has committed a change list to the code base, it automatically gets into a pipeline that tests, executes, and canaries the change list. If all of the elements pass the change list, it goes into production. Push-on-green does not always make sense: a change list may be dependent on a set of change lists. There may be dependencies between functional parts of the product or between services. It may be impossible to immediately deploy the change—think of mobile devices that have a wholly different model than a service in a datacenter. Users may not want to interrupt their days, or the change may not be compatible with all devices.

Often, people unfamiliar with release engineering don’t understand the inherent complexity of transforming code into a form that’s tested, deployed, signed, and reproducible. How do you educate others about the value that release engineering brings to a team?

Moir: In my current environment, release engineering is definitely well received. Because if you can’t build, we can’t ship. And if we can’t ship, we don’t get paid. In other companies, I’ve seen that release engineers are second-class citizens, or they are expected to perform miracles with no advance warning or resources.

![Callout: A company needs to get a release engineer on board in the early stage, not the later stage.](page4_img_1.png)

In those cases, obviously some education is necessary. And maybe it stems from the fact that release engineering is not taught in school as a discipline, so people aren’t exposed to it. I like to help spread the word by writing about release engineering on my blog. And I’ve helped organize workshops for release engineering to try to bring the community together.

In his book about remote work, A Year without Pants, Scott Berkun writes about his time as a manager at Automattic, which developed WordPress.com. At Automattic, all new hires spend a few weeks in a support role, which gives them a better understanding of customer issues and the overall process to get software out the door.

DevOps (development and operations) is another practice that breaks down the walls between operations and development. If you

MARCH/APRIL 2015 | IEEE SOFTWARE 45