import datetime
import logging

from typing import Optional, Any, List, Dict
from ..types import SpanType, UsageDict
from ..message_processing import streamer, messages
from .. import datetime_helpers
from . import span, helpers, validation_helpers, constants


LOGGER = logging.getLogger(__name__)


class Trace:
    def __init__(
        self,
        id: str,
        message_streamer: streamer.Streamer,
        project_name: str,
    ):
        """
        A Trace object. This object should not be created directly, instead using :meth:`opik.Opik.trace` or
        :func:`opik.opik_context.get_current_trace` if you are using function decorators.
        """
        self.id = id
        self._streamer = message_streamer
        self._project_name = project_name

        self.created_by: Optional[str] = None

    def end(
        self,
        end_time: Optional[datetime.datetime] = None,
        metadata: Optional[Dict[str, Any]] = None,
        input: Optional[Dict[str, Any]] = None,
        output: Optional[Dict[str, Any]] = None,
        tags: Optional[List[Any]] = None,
    ) -> None:
        """
        End the trace and update its attributes.

        This method is similar to the `update` method, but it automatically computes
        the end time if not provided.

        Args:
            end_time: The end time of the trace. If not provided, the current time will be used.
            metadata: Additional metadata to be associated with the trace.
            input: The input data for the trace.
            output: The output data for the trace.
            tags: A list of tags to be associated with the trace.

        Returns:
            None
        """
        end_time = (
            end_time if end_time is not None else datetime_helpers.local_timestamp()
        )

        self.update(
            end_time=end_time,
            metadata=metadata,
            input=input,
            output=output,
            tags=tags,
        )

    def update(
        self,
        end_time: Optional[datetime.datetime] = None,
        metadata: Optional[Dict[str, Any]] = None,
        input: Optional[Dict[str, Any]] = None,
        output: Optional[Dict[str, Any]] = None,
        tags: Optional[List[Any]] = None,
    ) -> None:
        """
        Update the trace attributes.

        Args:
            end_time: The end time of the trace.
            metadata: Additional metadata to be associated with the trace.
            input: The input data for the trace.
            output: The output data for the trace.
            tags: A list of tags to be associated with the trace.

        Returns:
            None
        """
        update_trace_message = messages.UpdateTraceMessage(
            trace_id=self.id,
            project_name=self._project_name,
            end_time=end_time,
            metadata=metadata,
            input=input,
            output=output,
            tags=tags,
        )
        self._streamer.put(update_trace_message)

    def span(
        self,
        id: Optional[str] = None,
        parent_span_id: Optional[str] = None,
        name: Optional[str] = None,
        type: SpanType = "general",
        start_time: Optional[datetime.datetime] = None,
        end_time: Optional[datetime.datetime] = None,
        metadata: Optional[Dict[str, Any]] = None,
        input: Optional[Dict[str, Any]] = None,
        output: Optional[Dict[str, Any]] = None,
        tags: Optional[List[str]] = None,
        usage: Optional[UsageDict] = None,
    ) -> span.Span:
        """
        Create a new span within the trace.

        Args:
            id: The ID of the span, should be in UUIDv7 format. If not provided, a new ID will be generated.
            parent_span_id: The ID of the parent span, if any.
            name: The name of the span.
            type: The type of the span. Defaults to "general".
            start_time: The start time of the span. If not provided, current time will be used.
            end_time: The end time of the span.
            metadata: Additional metadata to be associated with the span.
            input: The input data for the span.
            output: The output data for the span.
            tags: A list of tags to be associated with the span.
            usage: Usage information for the span.

        Returns:
            span.Span: The created span object.
        """
        span_id = id if id is not None else helpers.generate_id()
        start_time = (
            start_time if start_time is not None else datetime_helpers.local_timestamp()
        )
        usage = validation_helpers.validate_usage_and_print_result(usage, LOGGER)

        create_span_message = messages.CreateSpanMessage(
            span_id=span_id,
            trace_id=self.id,
            project_name=self._project_name,
            parent_span_id=parent_span_id,
            name=name,
            type=type,
            start_time=start_time,
            end_time=end_time,
            input=input,
            output=output,
            metadata=metadata,
            tags=tags,
            usage=usage,
        )
        self._streamer.put(create_span_message)

        return span.Span(
            id=span_id,
            parent_span_id=parent_span_id,
            trace_id=self.id,
            message_streamer=self._streamer,
            project_name=self._project_name,
        )

    def log_feedback_score(
        self,
        name: str,
        value: float,
        category_name: Optional[str] = None,
        reason: Optional[str] = None,
    ) -> None:
        """
        Log a feedback score for the trace.

        Args:
            name: The name of the feedback score.
            value: The value of the feedback score.
            category_name: The category name for the feedback score.
            reason: The reason for the feedback score.

        Returns:
            None
        """
        add_trace_feedback_batch_message = messages.AddTraceFeedbackScoresBatchMessage(
            batch=[
                messages.FeedbackScoreMessage(
                    id=self.id,
                    name=name,
                    value=value,
                    category_name=category_name,
                    reason=reason,
                    source=constants.FEEDBACK_SCORE_SOURCE_SDK,
                    project_name=self._project_name,
                )
            ],
        )

        self._streamer.put(add_trace_feedback_batch_message)