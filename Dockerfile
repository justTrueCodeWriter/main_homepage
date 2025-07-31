FROM python:3.10.15-bullseye

RUN mkdir /config
RUN mkdir /org

WORKDIR /main_homepage

COPY ./app/requirements.txt /main_homepage/

RUN pip install -r requirements.txt

COPY ./app /main_homepage/app/

EXPOSE 5000

ENTRYPOINT [ "flask", "-A", "app/app", "run", "--host", "0.0.0.0", "--port", "5000" ]
