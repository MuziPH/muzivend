FROM beevelop/ionic

RUN mkdir -p /www/app


WORKDIR /www/app
COPY . /www/app

RUN npm install

EXPOSE 8100

ENTRYPOINT ["ionic"]
CMD ["serve", "8100", "--address", "0.0.0.0"]
