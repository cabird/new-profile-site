## RELATED WORK IN PERFORMANCE TESTING

Performance analysis is a complex subject with a long history (for example, see Henry Lucas Jr.’s survey on performance monitoring and evaluation from 1971). Performance can take on multiple meanings, from disk speed to graphics rendering. With the rise of networked systems, performance analysis becomes more urgent, particularly in modern client-server scenarios. In these clients, performance degradation can come from client-side issues, such as network connections, and server-side issues, such as server load and the time to service requests. Common approaches to discover performance issues include modeling and creating synthetic workloads, sometimes based on past user data. Our system is different because we are able to deploy incremental versions of the system to a broad set of users.

Dieter Haban and Dieter Wybranietz’s work is more similar to ours. It comprises an event-driven system for monitoring distributed applications in situ that collects performance and behavioral data, as well as Simple, a tool environment for performance evaluation and modeling that includes multiple visualizations.

The Paradyn suite of tools is also similar to our approach in functionality because it doesn’t require manual code modification when the target areas for performance analysis change.

It automatically instruments code at runtime by modifying the binary to report function calls and memory accesses. Our approach leverages event hooks as part of the core functionality of the application—that is, it doesn’t require additional code or code modifications.

### References

1. H. Lucas Jr., “Performance Evaluation and Monitoring,” ACM Computing Surveys, vol. 3, no. 3, 1971, pp. 79–91.  
2. M.F. Arlitt and C.L. Williamson, “Internet Web Servers: Workload Characterization and Performance Implications,” IEEE/ACM Trans. Networking, vol. 5, no. 5, 1997, pp. 631–645.  
3. S. Balsamo et al., “Model-Based Performance Prediction in Software Development: A Survey,” IEEE Trans. Software Eng., vol. 30, no. 5, 2004, pp. 295–310.  
4. A. Avritzer and E. Weyuker, “The Automatic Generation of Load Test Suites and the Assessment of the Resulting Software,” IEEE Trans. Software Eng., vol. 21, no. 9, 1995, pp. 705–716.  
5. D. Haban and D. Wybranietz, “A Hybrid Monitor for Behavior and Performance Analysis of Distributed Systems,” IEEE Trans. Software Eng., vol. 16, no. 2, 1990, pp. 197–211.  
6. B.P. Miller et al., “The Paradyn Parallel Performance Measurement Tool,” Computer, vol. 28, no. 11, 1995, pp. 37–46.

About parts of the system to work on, where to focus future development, and what support teams might expect after release.

### Approach

The goal of our approach is to obtain and analyze data that comes from actual use of Lync and to obtain this as early in the development process as possible. We describe here the relevant details that let us achieve these dual goals.

#### Early Deployment

Our approach requires that ordinary users operate in-development versions of Lync during the normal course of their work. An in-house program lets users from across Microsoft subscribe to prerelease versions of the software (known internally as "dogfood"); these opportunities are advertised by email notifications to mailing lists, promotional material on the corporate intranet, and physical media such as posters in the workplace. Any user that would like to help—or would like early access to advanced features of upcoming releases—can subscribe to development versions. These versions of Lync help us with performance reporting and also have voting buttons that users can press to indicate satisfaction (or annoyance) with a given feature. The dogfood versions have passed through basic testing rounds but aren’t considered to be release-quality code; new builds are released as often as weekly.

#### Data Collection

Lync contains a subsystem for collecting and transmitting performance data. Over the course of the development cycle, the team often needs to adjust the data it collects with little impact to the user and minimal work for the development team.

Prior Microsoft systems relied on teams adding instrumentation code to their applications. Because instrumentation was a low priority compared to shipping features, the instrumentation code would often be low priority and low quality.

One alternative to this approach is to build a system ready to be fully instrumented. As in many modern network-based systems, Lync is built around an event-driven API. This API creates Windows events when any operating system–level operation occurs, from user interaction (UI) to socket communication. When the development team wishes to collect data regarding a specific scenario, they first identify the events that begin and end that scenario (similar to defining pointcuts in aspect-oriented programming). The scenario