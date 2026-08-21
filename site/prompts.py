"""Prompt loading: every LLM system prompt lives in prompts/ as a Jinja2 template.

Jinja2 over str.format because it is already a Quart dependency, the terminal
prompt contains literal braces that str.format would mangle, and StrictUndefined
makes a missing variable fail loudly instead of rendering wrong.
"""
from jinja2 import Environment, FileSystemLoader, StrictUndefined

_env = Environment(
    loader=FileSystemLoader('prompts'),
    autoescape=False,
    undefined=StrictUndefined,
    keep_trailing_newline=True,
)


def render(name, **context):
    """Render prompts/<name>.md.j2 with the given context."""
    return _env.get_template(f'{name}.md.j2').render(**context)
