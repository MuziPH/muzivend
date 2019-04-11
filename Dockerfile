FROM beevelop/ionic
LABEL Name="MuziVend"
LABEL Version="1"
WORKDIR /App
CMD [ "ionic serve" ]
EXPOSE 8100 // default port for ionic apps
EXPOSE 35729
EXPOSE 53703
