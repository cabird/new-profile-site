One of the goals of this paper is to expose the need of more software engineering research on energy awareness, utilization as well as optimization.

In the remainder of the paper, we discuss the underlying analysis and methodology (Section 3) from the viewpoint of OS platform developers. More specifically, we focus on idle tests, i.e., one scenario (e.g., checking mail, browsing to web pages, or opening a map) is tested repeatedly on the phone for a 12 hour period. Between each test run is an idle period to simplify the alignment between power consumption and actual activity on the phone. For each idle test, we collect and align execution logs and power logs (Section 4). This data is then used to address questions that Windows Phone developers often ask when testing and debugging the mobile operating system for energy consumption (Section 5–7).

The techniques discussed in this paper can be used in a similar fashion by application developers or even end-users. Application developers can programmatically collect battery usage statistics and correlate this information with execution data of their app. Similarly, end-users can observe battery levels (possibly with the help of a battery monitor) and correlate this information with the apps that they have used. While the techniques discussed in this paper have some limitations, they are also largely independent of the operating system and can also be applied to iPhone or Android platforms.

## 2. RELEVANCE TO SOFTWARE ENGINEERING

In this section we wish to emphasize why software engineering researchers and practitioners should care about energy, as the importance might not be immediately clear. The events of the last few years have significantly changed the face of computing.

### Observation #1: Energy awareness is relevant now

The main reason for the increased importance of energy analysis is because of the advent of smart phones and tablets. With the explosive growth of smartphones (for example, Windows Phone, Android, iPhone, and Blackberry), Nielsen Media Research expects more smartphones in the U.S. market than feature phones in 2011 [2]. The market analysis company IDC reported total shipments in 2011 were 491.4 million units up 61.3 percent from 2010 [3]. According to IDC smartphones started outselling PCs in the fourth quarter of 2010 with 100.9 million shipped devices vs. 92.1 million and there will be more mobile Internet users than wire line users in the U.S. by 2015 [4].

With the growth of tablets and smartphones the problems related to energy consumption are increasing. Both end-users and developers are sensitive to the energy consumed by individual components of the phone (such as Wi-Fi, 3G) as well as applications downloaded and running on the phone. Lower than expected battery life on mobile devices can lead to frustrated customers and negative publicity for a company (for example, the recent iOS launch [5]); several technology blogs discuss ways to improve battery consumption. The Computer World magazine presents “More tips for boosting Android battery life” where they discuss ways to increase battery life, including turning off Wi-Fi, turning off Bluetooth, dimming the background, and running an energy monitoring app [6].

### Observation #2: Energy awareness is relevant for the software engineering community

The rapid growth of the market for mobile devices brings a need for understanding various aspects of energy consumption. Simply put: how do we test for energy? We have an extensive body of

![Diagram of approach: power traces and execution logs combined into database of spikes](page2_img_1.png)

Figure 1. Overview of our approach. We use two data sources: power traces and execution logs. The data is then aligned and combined and we extract power spikes from the traces, which are stored in database and serve as input for the analysis throughout this paper.

knowledge on testing and test prioritization but we need to start designing new methods for testing applications, features, and components for energy-awareness, both to determine the amount of energy they consume and to ensure they are not consuming more than their allotted energy from a power budget. Testing will evolve into connecting devices into applications to monitor power spikes, outliers, etc. The work in this paper is a first step in this direction.

## 3. THE APPROACH

For the analysis in this paper, we use power traces and execution logs, typically taken from 12-hour idle tests (see overview in Figure 1). The two sources of data are subsequently aligned and split into power spikes based on idle periods. Each power spike has duration, average power consumption, and a list of associated modules.

After the completion of an idle test, the power trace and execution logs are analyzed by engineers of the Windows Phone platform. For one or more given power traces, engineers want to understand the energy consumed by different modules and if there are any patterns (anomalies) that they should pay special attention to. They typically ask questions such as:

- What modules consume the most power?
- What are characteristic energy shape patterns of certain modules?
- Are there anomalous energy patterns?

To answer these questions, we implemented several tools based on supervised (decision trees) and unsupervised learning techniques (clustering). All our analysis is done in an automatic fashion requiring little involvement and statistical knowledge on the user side. Engineers can choose one or more of the above questions and get the results in reports. We discuss the details of the above questions in Sections 5 and 6.

Another frequent problem that engineers face is to estimate the power that will be consumed by an application. The reason is that many mobile apps are developed within a power budget. That is, on average the application is only allowed to consume a certain amount of energy.

- Can we predict power consumption?

To estimate the power consumption of power spikes, we built and evaluated prediction models based on linear regression. The output of these models can be used by engineers to make informed decisions regarding power budgeting. The results are promising: our models can estimate power with high accuracy. Details are discussed in Section 7.

## 4. DATA COLLECTION

We use two sources of data for the power analysis in this paper (recall Figure 1). First we collect logs of the executable files and shared libraries, hereafter referred to as modules, which are active