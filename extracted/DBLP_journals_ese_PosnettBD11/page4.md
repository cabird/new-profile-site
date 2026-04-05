Fig. 1 The STATE pattern

![State pattern diagram](page4_img_1.png)

Consider the State design pattern (Fig. 1) with the context, state, and concrete state roles.1 Calls from clients (not shown) to Context.Request() are forwarded to the base-class method State.Handle() and then (e.g.) to the implementation ConcreteStateA.Handle() via the state instance variable.

The Strategy design pattern has an analogous structure, consisting of context, strategy and concrete strategy. Both State and Strategy have a stable part, and a changeable part. The context role in these patterns is used by clients of the pattern, and could change in response to changing client needs. The context role makes use of the state/strategy role, which defines an interface, and thus is relatively fixed. This interface is implemented by concrete state/concrete strategy roles, which provide varying implementations of the state/strategy roles. The class playing the state/strategy role, by remaining stable, effectively decouples the classes playing the other two roles. Pree noticed the structural similarity of these two patterns, and named the shared structure the 1-1-Connection metapattern (Fig. 2).

The context role in the State/Strategy pattern is named the template meta-role in the 1-1-Connection metapattern; the interface (state or strategy role) is named the hook meta-role; and the changeable roles (concrete state or concrete strategy) are called the implementation meta-roles.

Pree defines 7 structural metapatterns and shows that most design patterns have, at their core, an instance of one or more of these metapatterns (more details in Section 3).

### 2.1 Research Questions

A close reading of earlier results by Di Penta et al. (2008) on the relative change-proneness of classes playing different roles in a design pattern, suggests that the findings could be grouped by the underlying metapattern roles. Other studies of change-proneness in patterns suggest that size has a strong relationship to change-proneness (Bieman et al. 2001, 2003).

Size is an appealing, baseline phenomenon: the larger a component, the more likely some part of it changes. Moreover, we agree with Briand and Wust (2002) who assert that “the size of an artifact is a necessary part of any model predicting a property ... of this artifact.” If we are relating change-proneness to some property, we want to know that this property is telling us more than just that the larger classes are more change-prone. To this end it is often prudent to include size as a control in any models that relate properties potentially influenced by size to a particular outcome (El Emam et al. 2001). If our goal is to understand a phenomenon such as how design pattern roles affect change proneness, then it is necessary to determine

1 In this example, classes have been given the same name as the roles for clarity.