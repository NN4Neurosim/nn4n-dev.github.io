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
  <img src="{{ '/assets/images/icons/github.png' | relative love }}" width="20" alt="GitHub">
  <a href="https://github.com/NN4Neurosim/nn4n" style="margin-left: 5px; color: #333; text-decoration: underline">GitHub Repository</a>
</p>

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PyPI version](https://badge.fury.io/py/nn4n.svg)](https://badge.fury.io/py/nn4n)
[![Downloads](https://static.pepy.tech/badge/nn4n)](https://pepy.tech/project/nn4n)
[![Downloads](https://static.pepy.tech/badge/nn4n/month)](https://pepy.tech/project/nn4n)

Artificial Neural Networks (ANNs) trained with backpropagation, despite being biologically unrealistic, are exceptionally straightforward to configure, train, and evaluate, while allowing for exact examination of each neuron and weight. A growing trend within computational neuroscience is thus to train ANNs on simulated tasks to 'connect the dots', and then to compare their neuronal traits with those of biological brains to derive the underlying mechanisms of the brain.

This project implements Recurrent Neural Networks (RNNs) and Multilayer Perceptrons (MLPs) designed for a parametrized and granular control over network modularity, synaptic plasticity, and other constraints to enable biologically feasible modeling of brain regions.

#### Acknowledgement
Immense thanks to [Dr. Christopher J. Cueva](https://www.metaconscious.org/author/chris-cueva/) for his mentorship in developing this project. This project can't be done without his invaluable help.

#### License
This project is licensed under the terms of the MIT license. See the [LICENSE](https://opensource.mit.edu/license) file for details.

#### Template
The project documentation is based on [Jekyll](https://jekyllrb.com/) and uses [Jekyll Gitbook](https://github.com/sighingnow/jekyll-gitbook) theme developed by [sighingnow](https://github.com/sighingnow).