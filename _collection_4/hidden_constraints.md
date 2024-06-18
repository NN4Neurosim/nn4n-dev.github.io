---
title: HiddenLayer Constraint
author: Zhaoze Wang
date: 2024-06-16
category: docs
layout: post
order: 4
---

**Lambda Key:** `lambda_hid`

HiddenLayer constraint. The HiddenLayer sparsity loss function is defined as:

$$ \mathcal{L}_{hid} = \frac{\lambda_{hid}}{N_{hid} N_{hid}} ||W_{hid}||_F^2 $$

- $N_{hid}$: is the number of hidden neurons.
- $\textbf{W}_{hid}$: hidden layer weight matrix.