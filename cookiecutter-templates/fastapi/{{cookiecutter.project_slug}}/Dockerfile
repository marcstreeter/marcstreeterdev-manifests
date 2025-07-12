FROM python:{{cookiecutter.python_version}}-slim as base
ENV INSTALL_DEV_DEPS=${INSTALL_DEV_DEPS:-false}
WORKDIR /app
COPY pyproject.toml ./
COPY --chmod=755 scripts/ ./scripts/
RUN pip install uv 
RUN ./scripts/setup_venv.sh

FROM python:{{cookiecutter.python_version}}-slim as runner
ENV INSTALL_DEV_DEPS=${INSTALL_DEV_DEPS:-false}
ENV PYTHONPATH=/app/src
WORKDIR /app
COPY --chmod=755 scripts/ ./scripts/
COPY --from=base /app/.venv/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY src/ ./src/

USER python
EXPOSE 8000 5678

CMD ["./scripts/start.sh"] 