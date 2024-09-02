from .decorator.tracker import track, flush_tracker
from .api_objects.opik_client import Opik
from .api_objects.trace import Trace
from .api_objects.span import Span
from .api_objects.dataset.dataset_item import DatasetItem
from .api_objects.dataset import Dataset
from . import _logging
from . import package_version
from .plugins.pytest.decorator import llm_unit

_logging.setup()

__version__ = package_version.VERSION
__all__ = [
    "__version__",
    "track",
    "flush_tracker",
    "Opik",
    "Trace",
    "Span",
    "DatasetItem",
    "Dataset",
    "llm_unit",
]