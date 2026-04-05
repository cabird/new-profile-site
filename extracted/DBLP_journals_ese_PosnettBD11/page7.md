Table 1 Classifying design patterns into metapatterns

![Table 1: classifying design patterns into metapatterns](page7_img_1.png)

> All the metapatterns are presented for completeness

The 1-N-Connection metapattern is similar to the 1-1-Connection metapattern except that the template role may aggregate or reference multiple instances of the hook role objects. With respect to class structure and change-proneness we expect that 1-N-Connection and 1-1-Connection are similar: hook should change less than implementation or template. Instances of 1-N-Connection are shown in row 2 of Table 1.

### 3.2 Recursive Metapatterns

In the recursive metapatterns, the template class inherits from the hook class. This means that it calls into its own hierarchy, and typically must provide an implementation, as well as a “template”, for the hook class. Playing both implementation and template roles complicates the template class: it acts as both a client of an algorithm,

Table 2 Design pattern to metapattern role mapping

![Table 2: design pattern to metapattern role mapping](page7_img_2.png)

(Product tree) object structure element concrete element

(Remaining roles in order: Adapter: adaptee, Command: client, receiver; Decorator: concrete decorator; Factory Method: product; Observer: concrete subject)