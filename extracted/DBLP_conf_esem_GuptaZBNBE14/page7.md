using the tool, but no evaluation of the accuracy of energy estimates. Hoffman et al. introduced PowerDial, a system for dynamically adapting application behavior to execute successfully in the face of load and power fluctuations [32].

Other model-based techniques for the estimation of software power consumption include the model described by Thompson et al. [33], which can be used to estimate power consumption during the design instead of the testing stage as well as the work by Hao et al. [34], which combines program analysis and per-instruction energy modelling in order to estimate energy consumption at up to the granularity of individual source code lines.

For more related work, please also see conferences and workshops such as International Conference on ICT for Sustainability (ICT4S 2013-2014), International Workshop on Green and Sustainable Software (GREENS 2012-2014 at ICSE), and Workshop on Energy Aware Software-Engineering and Development (EASED 2011-2014).

## 10. CONCLUSION AND CONSEQUENCES

With the increasing popularity of mobile devices such as smartphones and tablets, energy awareness has become an important issue that all software engineers should care about. In this paper, we have presented a data analysis on Windows Phone 7 usage data. We addressed several independent questions related to identifying modules with most power consumption, finding characteristic energy shape patterns, detecting anomalies, and predicting power consumption based on module usage.

Understanding which modules consume more energy is useful information to both application and platform developers and helps them to drive better design, test efforts and influence new user scenarios. These results also enable users to understand how to conserve battery power; for example there are several public discussions on how to conserve energy for the phone by using various combinations of hardware components [6]. Given appropriate tool support, the described methodology could be applied by developers and end-users on any mobile device to better understand how to improve battery life by using certain combinations of components and applications.

In our future work, we plan to collaborate with researchers in the testing community to leverage our techniques for optimizing testing for energy awareness. We have merely scratched the surface of this area and plan to expand our research in this area spanning user testing and reliability. Finally, we hope that others in the software engineering community will begin to work on problems related to energy awareness.

## ACKNOWLEDGMENTS

We would like to thank the Microsoft Windows Phone team. Ashish Gupta performed this work during a summer internship at Microsoft Research. We would like to thank the anonymous ESEM reviewers for their valuable feedback on this work.

## REFERENCES

[1] Adams, S. Uncommunication Devices. http://dilbert.com/blog/entry/uncommunication_devices. 2011.

[2] Entner, R. Smartphones to Overtake Feature Phones in U.S. by 2011. http://blog.nielsen.com/nielsenwire/consumer/smartphones-to-overtake-feature-phones-in-u-s-by-2011/. 2010.

[3] IDC. IDC - Press Release. http://www.idc.com/getdoc.jsp?containerId=prUS23299912. 2012.

[4] IDC. IDC: More Mobile Internet Users Than Wireline Users in the U.S. by 2015. http://www.idc.com/getdoc.jsp?containerId=prUS23028711. 2011.

[5] Fried, I. Apple Confirms iOS 5 Bugs Causing Battery Issues for Some iPhones. http://allthingsd.com/20111102/apple-some-ios5-bugs-prompting-iphone-battery-issues/. 2011.

[6] Raphael, J. Android battery life: 10 ways to make your phone last longer. http://blogs.computerworld.com/16965/improve_android_battery_life. 2010.

[7] Gupta, A., Zimmermann, T., Bird, C., Nagappan, N., Bhat, T., and Emran, S. Detecting Energy Patterns in Software Development. Technical Report MSR-TR-2011-106, Microsoft Research, 2011.

[8] Han, J., Kamber, M., and Pei, J. Data Mining: Concepts and Techniques. Morgan Kaufmann, 2011.

[9] Kullback, S. and Leibler, R.A. On Information and Sufficiency. Annals of Mathematical Statistics, 22, 1 (1951), 79–86.

[10] Hastie, T., Tibshirani, R., and Friedman, J. The Elements of Statistical Learning. Springer, 2009.

[11] Meila, M. Comparing clusterings -- an information based distance. Journal of Multivariate Analysis, 98 (2007), 873-895.

[12] Munson, J. and Khoshgoftaar, T. The Detection of Fault-Prone Programs. IEEE Transactions on Software Engineering, 18 (1992), 423-433.

[13] Waserman, L. All of Statistics: A Concise Course in Statistical Inference. Springer, 2010.

[14] Cohen, J. Statistical power analysis for the behavioral sciences. Routledge Academic, 1988.

[15] Shye, A., Scholbrock, B., and Memik, G. Into the Wild: Studying Real User Activity Patterns to Guide Power Optimizations for Mobile Architectures. In MICRO '09: 42nd Annual IEEE/ACM International Symposium on Microarchitecture (2009), 168-178.

[16] Group, A.S.E.R. Resource/Energy-Efficient Software. https://sites.google.com/site/asergrp/bibli/energy-efficient. 2012.

[17] Bickford, J., Lagar-Cavilla, H.A., Varshavsky, A., Ganapathy, V., and Iftode, L. Security versus Energy Tradeoffs in Host-based Mobile Malware Detection. In Proceedings of the 9th International Conference on Mobile Systems, Applications, and Services (MobiSys 2011) (2011), 225-238.

[18] Cheng, J., Wong, S., Yang, H., and Lu, S. Smartsiren: Virus detection and alert for Smartphones. In MobiSys '07: Proceedings of the 5th International Conference on Mobile Systems, Applications, and Services (2007), 258-271.

[19] Kim, H., Smith, J., and Shin, K.G. Detecting Energy-Greedy Anomalies and Mobile Malware Variants. In MobiSys '08: Proceedings of the 6th International Conference on Mobile Systems, Applications, and Services (2008), 239-252.

[20] Bunse, C., Höpfner, H., Roychoudhury, S., and Mansour, E. Energy Efficient Data Sorting Using Standard Sorting Algorithms. Software and Data Technologies (2011).

[21] Bunse, C., Hoepfner, H., Roychoudhury, S., and Mansour, E. Choosing the "best" sorting algorithm for optimal energy consumption. In Proceedings of the International Conference on Software and Data Technologies (ICSOFT) (2009), 199–206.

[22] Bunse, C., Höpfner, H., Mansour, E., and Roychoudhury, S. Exploring the Energy Consumption of Data Sorting Algorithms in Embedded and Mobile Environments. In Tenth International Conference on Mobile Data Management: Systems, Services and Middleware (2009).

[23] Balasubramanian, N., Balasubramanian, A., and Venkataramani, A. Energy Consumption in Mobile Phones: A Measurement Study and Implications for Network Applications. In Internet Measurement Conference (2009), 280-293.