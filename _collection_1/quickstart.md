---
title: Quickstart
author: Zhaoze Wang
date: 2022-02-05
category: install
layout: post
order: 2
---

## Initialize a Continuous-Time RNN
```python
import torch
from nn4n.model import CTRNN

rnn = CTRNN(input_dim=1, hidden_size=10, output_dim=1)
optimizer = torch.optim.Adam(rnn.parameters(), lr=0.001)
```


## Define a Task
The input/output signals to train the RNN can be any time series data. Let $X$ be the input signal and $Y$ be the output signal. $X$ should of shape `(n_timesteps, batch_size, input_dim)` and $Y$ should be of shape `(n_timesteps, batch_size, output_dim)`. These signals could be representations of many cognitive tasks, such as working memory, decision making, or motor control, etc. Here we use a simple sin wave as an example.
```python
import numpy as np
import matplotlib.pyplot as plt

# predict sin wave
inputs = np.sin(np.linspace(0, 10, 1000))
inputs = torch.from_numpy(inputs).float().unsqueeze(1).unsqueeze(1)
labels = inputs[1:]
inputs = inputs[:-1]

plt.plot(inputs.squeeze(1).squeeze(1).numpy())
plt.plot(labels.squeeze(1).squeeze(1).numpy())
plt.show()
```

<p align="center">
  <img src="{{ '/assets/images/results/sin_wave.png' | relative_url }}" width="400" alt="Sin Wave">
</p>

## Train the RNN
```python
losses = []
for epoch in range(500):
    outputs, states = rnn(inputs)
    loss = torch.nn.MSELoss()(outputs, labels)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
    losses.append(loss.item())

    if epoch % 50 == 0:
        print(f'Epoch {epoch} Loss {loss.item()}')
```

##### Output:
```
Epoch 0 Loss 0.3866065442562103
Epoch 50 Loss 0.20944912731647491
Epoch 100 Loss 0.03360378369688988
Epoch 150 Loss 0.016431370750069618
Epoch 200 Loss 0.013084247708320618
Epoch 250 Loss 0.010527823120355606
Epoch 300 Loss 0.007640092633664608
Epoch 350 Loss 0.005286946427077055
Epoch 400 Loss 0.003560091834515333
Epoch 450 Loss 0.0028597351629287004
```