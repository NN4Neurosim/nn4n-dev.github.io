---
title: BaseStruct
author: Zhaoze Wang
date: 2024-06-16
category: docs
layout: post
order: 2
---

## Description
Base class for all masks. It serves as a boilerplate for other masks. It is not meant to be used directly.

## Parameters

<div class="table-wrapper" markdown="block">

| Parameter            | Default       | Required      | Type             | Description                                |
|:---------------------|:-------------:|:-------------:|:----------------:|:-------------------------------------------|
| input_dim            | `None`        | True          |`int`              | Input dimension. Used to generate the input layer mask. |
| hidden_size          | `None`        | True          | `int`              | HiddenLayer size. Used to generate the hidden layer mask. |
| output_dim           | `None`        | True          | `int`              | Output dimension. Used to generate the readout layer mask. |

</div>

## Methods

Methods that are shared by all structures.

<div class="table-wrapper" markdown="block">

| Method                                               | Description                                         |
|:-----------------------------------------------------|:----------------------------------------------------|
| [`get_input_idx()`]({{ site.baseurl }}/mask/methods/#maskget_input_idx-)      | Get indices of neurons that receive input.          |
| [`get_readout_idx()`]({{ site.baseurl }}/mask/methods/#maskget_readout_idx-)  | Get indices of neurons that readout from.           |
| [`get_non_input_idx()`]({{ site.baseurl }}/mask/methods/#maskget_non_input_idx-) | Get indices of neurons that don't receive input. |
| [`visualize()`]({{ site.baseurl }}/mask/methods/#maskvisualize-)              | Visualize the generated masks.                      |
| [`masks()`]({{ site.baseurl }}/mask/methods/#maskmasks-)                      | Return a list of np.ndarray masks. It will be of length 3, where the first element is the input mask, the second element is the hidden mask, and the third element is the readout mask. For those structures that do not have specification for a certain mask, it will be an all-one matrix. |
| [`get_areas()`]({{ site.baseurl }}/mask/methods/#maskget_areas-)              | Get a list of areas names.                 | 
| [`get_area_idx()`]({{ site.baseurl }}/mask/methods/#maskget_area_idx-)        | Get indices of neurons in a specific area. The parameter `area` could be either a string from the `get_areas()` or a index of the area. |

</div>