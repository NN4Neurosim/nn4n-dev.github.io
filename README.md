---
layout: home
title: NN4Neurosim
permalink: /
---

<div align="center">
  <video autoplay loop muted playsinline style="width: 50%; min-width: 400px; max-width: 600px;">
    <source src="{{ site.baseurl }}/assets/logo.mp4" type="video/mp4">
  </video>
</div>

<p style="display: flex; align-items: center;">
  <img src="{{ '/assets/images/icons/github.png' | relative_url }}" width="20" alt="GitHub">
  <a href="https://github.com/NN4Neurosim/nn4n" style="margin-left: 10px; color: #333; text-decoration: underline; font-size: 1.5rem; font-weight: bold">Source Code</a>
</p>

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PyPI version](https://badge.fury.io/py/nn4n.svg)](https://badge.fury.io/py/nn4n)
[![Downloads](https://static.pepy.tech/badge/nn4n)](https://pepy.tech/project/nn4n)
[![Downloads](https://static.pepy.tech/badge/nn4n/month)](https://pepy.tech/project/nn4n)

RNNs are a powerful tool for modeling the dynamics of neural systems. They’ve been applied to a range of cognitive tasks, including working memory, decision-making, and motor control. Despite the strengths, standard RNNs have limitations when it comes to modeling the brain. They often lack biological realism, such as the inclusion of excitatory and inhibitory neurons. Their layer-wise design tends to focus on feedforward connections, leaving out the (potentially important) feedback connections that real neural systems have. On top of that, neurons within each layer are typically homogeneous, which doesn’t reflect the diversity seen in actual brain networks.

This project aims to address these issues by improving the biological plausibility of RNN models. It moves away from layer-based structures and adds controls over connectivity and neuron properties, making the models more flexible and representative of real neural dynamics. It’s also designed to be practical for computational neuroscience, allowing for concise definitions of complex recurrent structures and easy access to hidden layer activity. The goal is to create a tool that is both biologically realistic and straightforward to use for exploring neural systems.

#### Papers Using NN4Neurosim
```bibtex
@inproceedings{
  wang2024time, 
  title={Time Makes Space: Emergence of Place Fields in Networks Encoding Temporally Continuous Sensory Experiences}, 
  author={Zhaoze Wang and Ronald W. Di. Tullio and Spencer Rooke and Vijay Balasubramanian}, 
  booktitle={Proceedings of the 2024 Conference on Neural Information Processing Systems (NeurIPS)}, 
  year={2024}
} 
```

#### Acknowledgement
I would like to thank my advisor [Dr. Vijay Balasubramanian](https://www.physics.upenn.edu/~vbalasub/Home.html) and [Dr. Pratik Chaudhari](https://pratikac.github.io/) for their guidance and support on this project. I would also like to thank [Dr. Christopher J. Cueva](https://www.metaconscious.org/author/chris-cueva/) for his mentorship in teaching me the fundamentals of modeling neural systems with RNNs.

#### License
This project is licensed under the terms of the MIT license. See the [LICENSE](https://opensource.mit.edu/license) file for details.

#### Template
The project documentation is based on [Jekyll](https://jekyllrb.com/) and uses [Jekyll Gitbook](https://github.com/sighingnow/jekyll-gitbook) theme developed by [sighingnow](https://github.com/sighingnow).
