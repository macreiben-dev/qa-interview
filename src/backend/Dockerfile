FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
COPY src/PasswordKata.Api/PasswordKata.Api.csproj src/PasswordKata.Api/
RUN dotnet restore src/PasswordKata.Api/PasswordKata.Api.csproj
COPY src/PasswordKata.Api/ src/PasswordKata.Api/
RUN dotnet publish src/PasswordKata.Api -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /out .
EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000
ENTRYPOINT ["dotnet", "PasswordKata.Api.dll"]
