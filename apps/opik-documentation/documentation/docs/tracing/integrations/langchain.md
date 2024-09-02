---
sidebar_position: 2
sidebar_label: LangChain
---

# LangChain

Comet provides seamless integration with LangChain, allowing you to easily log and trace your LangChain-based applications. By using the `CometTracer` callback, you can automatically capture detailed information about your LangChain runs, including inputs, outputs, and metadata for each step in your chain.

## Getting Started

To use the `CometTracer` with LangChain, you'll need to have both the `opik` and `langchain` packages installed. You can install them using pip:

```bash
pip install opik langchain langchain_openai
```

## Using CometTracer

Here's a basic example of how to use the `CometTracer` callback with a LangChain chain:

```python
from langchain.chains import LLMChain
from langchain_openai import OpenAI
from langchain.prompts import PromptTemplate
from opik.integrations.langchain import OpikTracer

# Initialize the tracer
opik_tracer = OpikTracer()

# Create the LLM Chain using LangChain
llm = OpenAI(temperature=0)

prompt_template = PromptTemplate(
    input_variables=["input"],
    template="Translate the following text to French: {input}"
)

llm_chain = LLMChain(llm=llm, prompt=prompt_template)

# Generate the translations
translation = llm_chain.run("Hello, how are you?", callbacks=[opik_tracer])
print(translation)

# The CometTracer will automatically log the run and its details to Comet
```

This example demonstrates how to create a LangChain chain with a `CometTracer` callback. When you run the chain with a prompt, the `CometTracer` will automatically log the run and its details to Comet, including the input prompt, the output, and metadata for each step in the chain.

## Settings tags and metadata

You can also customize the `CometTracer` callback to include additional metadata or logging options. For example:

```python
from opik.integrations.langchain import OpikTracer

opik_tracer = OpikTracer(
    tags=["langchain"],
    metadata={"use-case": "documentation-example"}
)
```

## Accessing logged traces

You can use the `collected_traces` method to access the trace IDs collected by the `CometTracer` callback:

```python
from opik.integrations.langchain import OpikTracer

opik_tracer = OpikTracer()

# Calling Langchain object

traces = opik_tracer.collected_traces()
print(traces)
```

This can be especially useful if you would like to update or log feedback scores for traces logged using the CometTracer.

## Advanced usage

The `CometTracer` object has a `flush` method that can be used to make sure that all traces are logged to the Comet platform before you exit a script. This method will return once all traces have been logged or if the timeout is reach, whichever comes first.

```python
from opik.integrations.langchain import OpikTracer

opik_tracer = OpikTracer()
opik_tracer.flush()
```