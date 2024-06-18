---
title: Mean Squared Error
author: Zhaoze Wang
date: 2024-06-16
category: docs
layout: post
order: 2
---

**Lambda Key:** `lambda_mse`

Mean Squared Error (MSE) loss function. The MSE loss function is defined as:

$$ \mathcal{L}_{mse} = \frac{\lambda_{mse}}{B \times T \times N_{out}} \sum_{b,t,k=0}^{B, T, N_{out}} \left( \hat{y}_{b,t,k} - y_{b,t,k} \right)^2 $$

- $ B $: number of batches.
- $ T $: number of time steps.
- $ N_{out} $: dimension of the outputs.
- $$ \hat{y}_{b,t,k} $$ is the predicted value of batch $b$, timepoint $t$, dimension $d$.
- $y_{b,t,k}$ is the ground truth value of batch $b$, timepoint $t$, dimension $d$.