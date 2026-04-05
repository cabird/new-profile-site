## Recommending Random Walks

Zachary M. Saul <saul@cs.ucdavis.edu>  
Vladimir Filkov <filkov@cs.ucdavis.edu>  
Premkumar Devanbu <devanbu@cs.ucdavis.edu>  
Christian Bird <bird@cs.ucdavis.edu>

Dept. of Computer Science  
University of California, Davis  
Davis, CA 95616

### ABSTRACT

We improve on previous recommender systems by taking advantage of the layered structure of software. We use a random-walk approach, mimicking the more focused behavior of a developer, who browses the caller–callee links in the call graph of a large program, seeking routines that are likely to be related to a function of interest. Inspired by Kleinberg’s work [10], we approximate the steady-state of an infinite random walk on a subset of a call graph in order to rank the functions by their steady-state probabilities. Surprisingly, this purely structural approach works quite well. Our approach, like that of Robillard’s “Suade” algorithm [15], and earlier data mining approaches [13], relies solely on the always-available current state of the code, rather than other sources such as comments, documentation or revision information. Using the Apache API documentation as an oracle, we perform a quantitative evaluation of our method, finding that our algorithm dramatically improves upon Suade in this setting. We also find that the performance of traditional data mining approaches is complementary to ours; this leads naturally to an evidence-based combination of the two, which shows excellent performance on this task.

Categories and Subject Descriptors: D.2.7 [Distribution, Maintenance and Enhancement]: Documentation

General Terms: Design, Documentation

Keywords: recommender systems, graph theory

### 1. INTRODUCTION

Software maintainers spend a lot of time trying to understand the software under maintenance. This problem is especially acute in large software systems [4]. Even well-designed large systems impose steep learning curves on developers. Over the years, tool builders have sought different approaches to ease this learning task. We are particularly interested here in large, complex, specialized, application programmer interfaces (APIs), which constitute the basic substrate, or platform, upon which large software systems are typically built. Carefully architected, long-lived, expensive systems have extensive collections of APIs, which provide common services specialized for application needs, such as storage, synchronization, communication, security and concurrency. While a developer may be conceptually aware of these services, she still has to learn how a particular service is manifest in a specific large system. Documentation for such APIs may be lacking, and more experienced developers may be too busy to answer questions. In the Apache HTTPD web server, for example, there are over 300 distinct portability layer API functions that form a “virtual machine” layer to simplify portability. We are concerned with a common discovery task: given a particular function, find related functions. For example, a developer may have found the function apr_file_seek, guessed that it is associated with file operations and wish to find other related functions. In the absence of documentation, the programmer would have to explore the source code directly, seeking other functions invoked along with apr_file_seek that may be related. Our goal is to automatically find and recommend the related API calls to a given call.

This problem of mining related API calls has attracted a lot of interest, and a variety of different approaches have been reported [12, 13, 15, 18, 19]. We now summarize the contributions of this paper.

Task Setting: Given a function, we find the other related functions. We do this using exclusively the structural information in the call graph; we don't use version histories, name similarities or natural language (e.g., API documentation) mining. This is a clear advantage; structural information is always available (and reliable) if the source code is available, but other types of information may not always be available and/or reliable.

New random-walk algorithm: We introduce a fast, simple, accurate algorithm, called FRAN (Finding with RANdom walks) that is based on the steady state of a random walk on the call graph neighborhood (inspired by [10]). This approach conceptually generalizes the previous purely structural approach proposed in Robillard’s Suade [15]. The algorithm works by considering a larger set of related items compared to previous algorithms (often too large to explore