## 8. DISCUSSION

### 8.1 The Heisenberg uncertainty principle

The Heisenberg principle states that the more precisely one property is measured, the less precisely the others can be controlled, determined, or known.

Applied to our research, the question is to what extent profiling influences the power measurements and the analysis in this paper. While profiling certainly has some influence on the measured power, we do our best to minimize it. For example, to reduce the energy cost of profiling, we only collect coarse-grained execution data on the phone (modules at the time of context switch) rather than fine-grained data, say at the method level. This reduces the energy cost of profiling substantially. Furthermore, we exclude the profiling module from our analysis because it will not be shipped to customers as its sole purpose is to collect execution data during testing.

### 8.2 Generality of the approach

We discussed the techniques in this paper with a special focus on OS developers and the Windows Phone 7 platform. We are confident that our techniques generalize to other mobile platforms such as Android or iOS. Several phones and platforms now have multiple cores and allow multiple user-level applications to be active. In these situations, some of the activity of multiple applications will overlap and be combined in power spikes. We expect that given a large number of samples the noise introduced by the simultaneous apps will be mitigated. As an analogy, data mining has been used successfully in the past to isolate patterns in large intermingled datasets (e.g., purchase data). Another alternative is testing in controlled environments that have only one active user-level app.

As discussed in the introduction, the techniques presented in this paper can be used in a similar fashion by application developers to test power consumption on their phones or tablets.

## 9. RELATED WORK

To the best of our knowledge there has been little research on energy testing and debugging. The closest in spirit is the work by Shye et al. [15] who observed that the screen and CPU consume the most power in mobile devices. They modeled total energy consumed with regression and identified patterns in user behavior in order to drive optimizations. Compared to Shye et al. [15], the advantage of our approach is the granularity level. The observation that screen and CPU consume most power is only of limited value to developers and users. Similarly, without any fine-grained level of information, the regression models do not help in optimizing usage patterns in an operational way. Instead of the hardware component level (CPU, screen), our work is based on module level, which is more actionable for developers.

We now briefly discuss other work on energy-efficient software with respect to reduction as well as measurement and estimation of energy consumption. For a more detailed discussion of this work, we refer to our technical report [7]. For a complete list of papers in the area of resource-efficient (such as resource optimization and perforated programs), we refer to the bibliography maintained by the Automated Software Engineering Research Group at North Carolina State University [16].

### 9.1 Reduction of Energy Consumption

While not directly related to energy awareness on mobile devices, energy optimization is an increasingly important topic in datacenter operations in the systems and networking research community. A lot of research has focused on specialized energy-efficient algorithms as well as applications; popular examples are malware detection [17] [18] [19] and sorting [20] [21] [22].

### 9.2 Measurement and Estimation of Energy Consumption

The Networking and Systems communities have focused on monitoring and modeling energy consumption in real world situations. Balasubramanian et al. [23] measured energy consumption of three mobile networking technologies: 3G, GSM, and Wi‑Fi. They observed that 3G and GSM have high tail energy consumption and developed a protocol to reduce the energy consumption of common mobile applications by modeling the network activity for each technology.

Pathak et al. [24] observed that capturing power consumption data based on utilization of a hardware component is insufficient because power behavior is not always directly related to smartphone component utilization (low level power optimizations in device drivers are missed). The authors present an energy model based on utilization and non-utilization on the Android and Windows Mobile platforms.

PowerScope [25] is another energy profiling tool and combines hardware instrumentation with kernel software support to measure the system activity. Muttreja et al. [26] introduced a hybrid simulation approach to estimate energy in embedded software. Brandolese [27] introduced another hybrid approach, which combined execution data with static source instrumentation. Li et al. predicted power and performance of storage servers with Multiple-Inputs-Multiple-Outputs (MIMO) models [28]. Kan et al. computed energy-efficient processor frequencies for real-time tasks with a heuristic based on convex optimization techniques; the heuristic was evaluated with simulated energy data rather than actual energy data [29].

The main difference to most of this work is that for the measurements in this paper, we use the actual power consumption in mobile devices rather than relying on models based on simulation and/or utilization of components.

Zhao et al. [30] built a system to predict the battery lifetime of mobile devices. In contrast our approach predicts which parts will consume the most power rather than the lifetime of the battery. Green-Tracker is a tool that estimates the energy consumption of software based on CPU data in order to help concerned users make informed decisions about the software they use [31]. In their work-in-progress report, the authors presented preliminary experiences from

The prediction results are displayed in Figure 8 as box plots, which show the smallest value, lower quartile, median, upper quartile, and largest value of the Spearman correlation. The results show that our models reliably identify high-power consuming spikes. The lowest correlation for all 250 runs is 0.6416. The median Spearman correlation in the experiments ranges from 0.7495 (T1) to 0.8596 (T1234), which is considered to be a strong correlation [14]. It is noteworthy that the Spearman correlations are the highest for the T1234 dataset, which is the composition of T1–T4. This suggests that traces from different applications can lead to better predictive performance.

In summary, the presence of modules can produce a good ranking of power-consuming spikes, as shown by very high correlation values between the predicted and observed values. Such predictions can help developers to optimize the power budget at an early stage of their project. By just knowing the modules that they plan to use, developers can obtain a fairly reliable estimate of the power consumption.