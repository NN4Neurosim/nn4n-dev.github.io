---
title: Introduction
author: Zhaoze Wang
date: 2024-06-16
category: docs
layout: post
order: 1
---

# Defining Network Structures
The connectivity matrices between different layers are core to the modeling of the brain. They define the synaptic strength, positivity, plasticity, and other properties. In `nn4n`, these specific properties are applied to the corresponding connectivity matrices through masks. For complex structures such as excitatory-inhibitory constrainted RNN, the masks of adjacent layers are intercorrelated. The `nn4n.mask` modules provide some implementations to generate the masks for these complex structures.

#### Vanilla CTRNN
A simplistic Vanilla CTRNN contains three layers, an input layer, a hidden layer, and an readout layer as depicted below.

<p align="center">
  <img src="{{ '/assets/images/basics/RNN_structure.png' | relative_url }}" width="400" alt="Description of RNN Structure">
</p>

The yellow nodes represent neurons that project input signals to the hidden layer, the green neurons are in the hidden layer, and the purple nodes represent neurons that read out from the hidden layer neurons. Both input and readout neurons are 'imagined' to be there. I.e., they only project or receives signals and therefore do not have activations and internal states.

#### Excitatory-Inhibitory Constrained CTRNN
The implementation of CTRNN also supports Excitatory-Inhibitory constrained continuous-time RNN (EIRNN) similar to what was proposed by H. Francis Song, Guangyu R. Yang, and Xiao-Jing Wang in [Training Excitatory-Inhibitory Recurrent Neural Networks for Cognitive Tasks: A Simple and Flexible Framework](https://doi.org/10.1371/journal.pcbi.1004792)

<p align="center">
  <img src="{{ '/assets/images/basics/EIRNN_structure.png' | relative_url }}" width="400" alt="Description of Exciatory-Inhibitory RNN Structure">
</p>

The yellow nodes denote nodes in the input layer. The middle circle denotes the hidden layer. There are blue nodes and red nodes, representing inhibitory neurons and excitatory neurons, respectively. The depicted network has an E/I ratio of 4/1. The purple nodes are ReadoutLayer neurons.

#### Multi-Area CTRNN
The RNN could also contains multiple areas. Denote the neurons in the hidden layer as $ \mathcal{N} = \{ n_1, n_2, \ldots, n_{N_{hid}} \} $. The neurons within it may be partitioned into multiple areas, $ \mathcal{A} = \{A_1, A_2, \ldots, A_{N_{area}}\} $. The areas are disjoint and their union is the set of all neurons in the hidden layer, i.e., $ \mathcal{N} = \bigcup_{i=1}^{N_{area}} A_i $. Neurons within the same area may be more densely connected and even receives different inputs.

<p align="center">
  <img src="{{ '/assets/images/basics/Multi_Area_Structure.png' | relative_url }}" width="400" alt="Description of Exciatory-Inhibitory RNN Structure">
</p>

#### Multi-Area CTRNN with Excitatory-Inhibitory Constraints
Finally, when combining the multi-area structure with excitatory-inhibitory constraints, the network structure becomes more complex. The neurons in the hidden layer are partitioned into multiple areas, and each area contains both excitatory and inhibitory neurons. Additionally, depending on the specific requirements of the task, one may need to decide how the excitatory and inhibitory neurons between different regions needed to be connected. The following figure illustrates the structure of a multi-area CTRNN with excitatory-inhibitory constraints.

<p align="center">
  <img src="{{ '/assets/images/basics/Multi_Area_EI_Structure.png' | relative_url }}" width="400" alt="Description of Exciatory-Inhibitory RNN Structure">
</p>


# List of Masks
- [BaseStruct]({{ site.baseurl }}/mask/base_struct)
- [MultiArea]({{ site.baseurl }}/mask/multi_area)
- [MultiAreaEI]({{ site.baseurl }}/mask/multi_area_ei)
- [RandomInput]({{ site.baseurl }}/mask/random_input)
- [MultiIO]({{ site.baseurl }}/mask/multi_io)