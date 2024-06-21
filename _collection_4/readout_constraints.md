---
title: ReadoutLayer Constraint
author: Zhaoze Wang
date: 2024-06-16
category: docs
layout: post
order: 5
---

**Lambda Key:** `lambda_out`

ReadoutLayer constraint. The ReadoutLayer sparsity loss function is defined as:

$$ \mathcal{L}_{out} = \frac{\lambda_{out}}{N_{out} N_{hid}} ||W_{out}||_F^2 $$

- $ N_{out} $: number of readout neurons.
- $ N_{hid} $: number of hidden neurons.
- $ \textbf{W}_{out} $: readout layer weight matrix.
