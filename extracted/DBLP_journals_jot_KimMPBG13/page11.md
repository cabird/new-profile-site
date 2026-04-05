![Bar chart comparing raw and parameterized types usage](page11_img_1.png)

Figure 1 – Total usage of raw and parameterized types. 11 projects (above the mono project) have more parameterized types (blue, right) than raw types (red, left).

| Type | Count |
|---|---:|
| ISet<string>* | 55 |
| List<string>* | 36 |
| List<int>* | 21 |
| IList<Student> | 19 |
| IList<string> | 17 |
| IDictionary<string,string> | 16 |
| ISet<T>* | 15 |
| IDictionary<string,TypedValue> | 15 |
| List<T>* | 14 |
| IList<Person> | 14 |
| IDictionary<string,Player> | 14 |
| IList<Parent> | 13 |
| List<Boolean>* | 12 |
| List<Object>* | 11 |
| List<TypedValue>* | 10 |
| List<IType>* | 10 |
| Dictionary<string,string>* | 10 |
| IDictionary<TKey,TValue> | 9 |
| IEnumerator<string> | 8 |
| IEnumerable<Column> | 8 |

Table 2 – Number of parameterizations of different generics in nhibernate.

### 4.4.2 Common Parameterized Types and Arguments

We next analyzed which parameterized types were used and what the common arguments were to those types. Table 2 shows the top 20 parameterized types with distinct type arguments in the nhibernate project. These 20 generic types cover about 43% of generics in the project. ISet<String> is the most used (23.1%) combination, while List is the most commonly used (37.7%) type.