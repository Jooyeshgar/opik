---
sidebar_position: 4
sidebar_label: Manage Datasets
---

# Manage Datasets

Datasets can be used to track test cases you would like to evaluate your LLM on. Each dataset is made up of DatasetItems which include `input` and optional `expected_output` and `metadata` fields. These datasets can be created from:

* Python SDK: You can use the Python SDK to create an dataset and add items to it.
* Traces table: You can add existing logged traces (from a production application for example) to a dataset.
* The Comet UI: You can manually create a dataset and add items to it.

Once a dataset has been created, you can run Experiments on it. Each Experiment will evaluate an LLM application based on the test cases in the dataset using an evaluation metric and report the results back to the dataset.

## Creating a dataset using the SDK

You can create a dataset and log items to it using the `Dataset` method:

```python
from opik import Opik

# Create a dataset
client = Opik()
dataset = client.create_dataset(name="My dataset")
```

### Insert items

You can insert items to a dataset using the `insert` method:

```python
from opik import DatasetItem
from opik import Opik

# Get or create a dataset
client = Opik()
try:
    dataset = client.create_dataset(name="My dataset")
except:
    dataset = client.get_dataset(name="My dataset")

# Add dataset items to it
dataset.insert([
    DatasetItem(input={"input": "Hello, world!"}, expected_output={"output": "Hello, world!"}),
    DatasetItem(input={"input": "What is the capital of France?"}, expected_output={"output": "Paris"}),
])
```

:::note
    Instead of using the `DatasetItem` class, you can also use a dictionary to insert items to a dataset. The dictionary should have the `input` key, `expected_output` and `metadata` are optional.
:::

### Deleting items

You can delete items in a dataset by using the `delete` method:

```python
from opik import Opik

# Get or create a dataset
client = Opik()
try:
    dataset = client.create_dataset(name="My dataset")
except:
    dataset = client.get_dataset(name="My dataset")

dataset.delete(items_ids=["123", "456"])
```

## Downloading a dataset from Comet

You can download a dataset from Comet using the `get_dataset` method:

```python
from opik import Opik

client = Opik()
dataset = client.get_dataset(name="My dataset")
```

Once the dataset has been retrieved, you can access it's items using the `to_pandas()` or `to_json` methods:

```python
from opik import Opik

client = Opik()
dataset = client.get_dataset(name="My dataset")

# Convert to a Pandas DataFrame
dataset.to_pandas()

# Convert to a JSON array
dataset.to_json()
```