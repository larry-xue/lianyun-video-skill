# Research：大模型里的 token 是什么

## 核心论点

大模型不会直接把人看到的整句话当作输入。tokenizer 会先把文本编码为一串 token ID，模型处理的是这串数字表示。token 可以对应一个字、词的一部分、标点或其他字节片段，具体切法依 tokenizer 而异。

## 关键类比

把一句话想成一张披萨：tokenizer 负责切块，模型一次拿到的是一块块编号。类比只解释“先切分再处理”，不暗示每块大小相同。

## 为什么观众会遇到它

token 数量决定一段输入输出占用了多少上下文容量，也常被 API 用作计量单位。因此“字符数”和“token 数”不能简单画等号。

## 来源

- OpenAI `tiktoken` README：语言模型看到的是 token 数字序列；BPE 将文本转换为 token，并倾向保留常见子词。https://github.com/openai/tiktoken/blob/main/README.md
- OpenAI `tiktoken` core API：`encode()` 将字符串编码为 token ID 列表，`decode()` 将 token 还原。https://github.com/openai/tiktoken/blob/main/tiktoken/core.py

## 开放问题

不同模型使用的 tokenizer 可能不同；本片中的中文切块仅为示意，不承诺任何具体模型一定这样切。
