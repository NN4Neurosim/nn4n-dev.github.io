---
title: InputLayer Constraint
author: Zhaoze Wang
date: 2024-06-16
category: docs
layout: post
order: 3
---

**Lambda Key:** `lambda_in`

InputLayer constraint. The InputLayer sparsity loss function is defined as:

$$ \mathcal{L}_{in} = \frac{\lambda_{in}}{N_{in} N_{hid}} ||\textbf{W}_{in}||_F^2 $$

- $N_{in}$: number of input neurons.
- $N_{hid}$: size of the input. 
- $\textbf{W}_{in}$: input weight matrix.