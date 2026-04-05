For building the ConE system, we ran the RCE detection algorithm that looks at the pull requests that are created in a repository within the last three months from when the algorithm runs. The duration can be increased or decreased based on how big or how active the system is. This process, after each run, creates a list of RCEs. Once the initial bootstrapping is done and a list of RCEs is prepared, that list is used by the ConE algorithm when checking for the existence of the RCEs in a pair of pull requests. The RCE list is updated and refreshed once every week, through a separate process. The process of detecting and updating RCEs is resource intensive. So, we need to strike a balance between how quickly we would like to update the RCE list versus how many resources we need to throw at the system, without compromising the quality of the suggestions. We picked one week as the refresh interval through multiple iterations of experiments. This process guarantees that the ConE system reacts to the changes in the rarity of concurrent edits, especially the cases where an RCE becomes a non-RCE due to the concurrent edits it experiences. The steps involved in creating and updating RCEs are listed below.

### Creating the RCE list:
1. Get all the pull requests created in the last three months from when the algorithm is run. Create a list of all the files that are edited in these pull requests by applying the filters explained in the paragraph above on file types.
2. Prepare sets of pull requests that overlap with others. Prepare a list of files edited in the overlapping pull requests by applying the filters explained in the paragraph above on file types.
3. The list of files created in step-1 minus the list of files created in step-2 constitutes the list of RCEs.

### Updating the RCE list:
4. Remove files from the RCE list if they are seen in overlapping pull requests when the algorithm is run the next time. Because, if they are seen in overlapping pull requests, they will not be qualified to be RCEs anymore.
5. Refresh the list by adding the new RCEs discovered in the latest edits, when the algorithm is run again.

## 4.2 The ConE Algorithm

ConE’s algorithm to select candidate pull requests that developers need to be notified about primarily leverages the techniques explained above: EOO and existence of RCEs. Together these serve to reduce the total number of active pull requests under consideration, and to pick the pull requests that need to be notified about. The ConE algorithm consists of seven steps listed below:

Step 1: Check if the reference pull request’s age is more than 30 days. Studies have shown that pull requests that are active for so long may not even be completed [25]. Exclude all such pull requests.

Step 2: Construct a list of files that are being edited in the reference pull request. While constructing this set, we exclude any files of types that are not in the allow list from Table 3.

Step 3: Construct a set of files that are being edited in each of the active pull requests, using the methodology mentioned in Steps 1 and 2. One extra filter that we apply here is to exclude PRs that are being interacted with by the author of the reference pull request. If the author of the reference pull request is already aware of this pull request, then there is no need to notify them.

Step 4: Calculate the extent of overlap using the formula described in Section 4.1. For every pair of reference pull request PR_r and active pull request PR_a1, calculate the tuple T_ea1 = ⟨PR_r, PR_a1, E1⟩, where E1 is the extent of overlap between the two pull requests. Do this for all the active pull requests with respect to a reference pull request. At the end of this step, we have a list of tuples, T = [⟨PR1, PR7, 55⟩, ⟨PR1, PR12, 95⟩, ⟨PR1, PR34, 35⟩, …].