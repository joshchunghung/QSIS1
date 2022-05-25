FROM python:3.8.12 
LABEL maintainer josh Chung-hung Lo, IESDMC
ARG USERNAME=dmc
ARG UID=1000
ARG GID=1000
ENV PYTHONUNBUFFERED=1

WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/

RUN groupadd -g ${GID} ${USERNAME}
RUN useradd -ms /bin/bash -g ${GID} -u ${UID} ${USERNAME}
USER ${USERNAME}