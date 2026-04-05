### 6.2 Deep Learning on Source Code

Conflicts [36]. Apel et al. noted that structured and unstructured merge each has strengths and weaknesses. They developed JSFSTMERGE, a semi-structured merge, that alternates between approaches [4]. They later introduced JDIME, an approach that automatically tunes a mixture of structured and unstructured merge based on conflict locations [2]. Sousa et al. introduced a verification approach, SAFEMERGE, that examines the base program, both changed programs, and the merge resolution to verify that the resolution preserves semantic conflict freedom [28].

The key difference between DEEPMERGE and these structured or semi-structured merge approaches is that they require a priori knowledge of the language of the merged code in the form of a parser or annotated grammar (or more advanced program verification tools). Further, structured merge tools cannot conservatively merge changes made within method bodies. Finally, Pan et al. [24] explore the use of program synthesis for learning repeated resolutions in a large project. The approach requires the design of a domain-specific languages inspired by a small class of resolutions (around imports and macros in C++). In contrast to both these approaches, DEEPMERGE only requires a corpus of merge resolutions in the target language, and can apply to all merge conflicts. However, we believe that both these approaches are complementary and can be incorporated into DEEPMERGE.

We leverage deep neural network based natural language processing methods to address the challenge of three-way merge resolution. We discuss related works in sequence-to-sequence learning that inspired our model and applications of deep learning for the software engineering domain.

Pointer networks [34] use attention to constrain general sequence-to-sequence models [30], [6]. Recent works incorporate a copy mechanism in sequence-to-sequence models by combining copying and token generation [14], adding a copying module in the decoder [39], and incorporating it into the beam search [25]. In contrast to DEEPMERGE, none of these approaches address the challenges described in Section 2 in a three-way merge.

Deep learning has been successfully used on source code to improve myriad software engineering tasks. These include code completion and code generation [31], [8], code search [15], software testing [12], defect prediction [35], and code summarization [1]. Deep learning has been used in program repair using neural machine translation [33], [5], sequence-editing approaches [25], and learning graph transformations [9]. For a deeper review of deep learning methods applied to software engineering tasks, see the literature reviews [22], [10].

While neural sequence-to-sequence models are utilized in most of those applications, they consume only one input sequence, mapping it to a single output sequence. Edit-aware embeddings [38] introduced LTRE method to encode two program variants to model source code edits. As we demonstrate, our edit-aware encoding Aligned Linearized is inspired by this approach but significantly outperforms LTRE in the context of data-driven merge.

## 7 CONCLUSION

We motivated the problem of data-driven merge and highlighted the main challenges in applying machine learning. We proposed DEEPMERGE, a data-driven merge framework, and demonstrated its effectiveness in resolving unstructured merge conflicts in JavaScript. We chose JavaScript as the language of focus in this paper due to its importance and growing popularity and the fact that analysis of JavaScript is challenging due at least in part to its weak, dynamic type system and permissive nature [16], [19]. We believe that DEEPMERGE can be easily extended to other languages and perhaps to any list-structured data format such as JSON and configuration files. We plan to combine program analysis techniques (e.g., parsing, typechecking, or static verifiers for merges) to prune the space of resolutions, and combine structured merge algorithms with machine learning to gain the best of both techniques. Furthermore, we plan to generalize our approach beyond line level output granularity.

## REFERENCES

[1] U. Alon, O. Levy, and E. Yahav. code2seq: Generating sequences from structured representations of code. In International Conference on Learning Representations, 2019.

[2] S. Apel, O. Leßenich, and C. Lengauer. Structured merge with auto-tuning: balancing precision and performance. In Proceedings of the 27th IEEE/ACM International Conference on Automated Software Engineering, pages 120–129, 2012.

[3] S. Apel, J. Liebig, B. Brandl, C. Lengauer, and C. Kästner. Semistructured merge: Rethinking merge in revision control systems. In ACM SIGSOFT Symposium on Foundations of Software Engineering, pages 190–200, 2011.

[4] S. Apel, J. Liebig, C. Lengauer, C. Kästner, and W. R. Cook. Semistructured merge in revision control systems. In VaMoS, pages 13–19, 2010.

[5] S. Chakraborty, M. Allamanis, and B. Ray. Tree2tree neural translation model for learning source code changes. CoRR, abs/1810.00314, 2018.

[6] K. Cho, B. van Merriënboer, C. Gulcehre, D. Bahdanau, F. Bougares, H. Schwenk, and Y. Bengio. Learning phrase representations using RNN encoder–decoder for statistical machine translation. In Proceedings of the 2014 Conference on Empirical Methods in Natural Language Processing (EMNLP), pages 1724–1734, Doha, Qatar, Oct. 2014. Association for Computational Linguistics.

[7] K. Cho, B. van Merrienboer, C. Gulcehre, D. Bahdanau, F. Bougares, H. Schwenk, and Y. Bengio. Learning phrase representations using rnn encoder-decoder for statistical machine translation, 2014.

[8] C. Clement, D. Drain, J. Timcheck, A. Svyatkovskiy, and N. Sundaresan. Pymt5: Multi-mode translation of natural language and python code with transformers. In Proceedings of the 2020 Conference on Empirical Methods in Natural Language Processing (EMNLP), pages 9052–9065, 2020.

[9] E. Dinella, H. Dai, Z. Li, M. Naik, L. Song, and K. Wang. Hoppity: Learning graph transformations to detect and fix bugs in programs. In International Conference on Learning Representations, 2020.

[10] F. Ferreira, L. L. Silva, and M. T. Valente. Software engineering meets deep learning: A literature review. arXiv preprint arXiv:1909.11436, 2019.

[11] G. Ghiotto, L. Murta, M. de Oliveira Barros, and A. van der Hoek. On the nature of merge conflicts: A study of 2,731 open source java projects hosted by github. IEEE Trans. Software Eng., 46(8):892–915, 2020.

[12] P. Godefroid, H. Peleg, and R. Singh. Learn&fuzz: Machine learning for input fuzzing. In 2017 32nd IEEE/ACM International Conference on Automated Software Engineering (ASE), pages 50–59. IEEE, 2017.

[13] G. Gousios, M. D. Storey, and A. Bacchelli. Work practices and challenges in pull-based development: the contributor’s perspective. In Proceedings of the 38th International Conference on Software Engineering, ICSE 2016, Austin, TX, USA, May 14-22, 2016, pages 285–296. ACM, 2016.