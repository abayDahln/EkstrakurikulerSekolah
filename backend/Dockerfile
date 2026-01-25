FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["EkstrakurikulerSekolah.csproj", "./"]
RUN dotnet restore

COPY . .
RUN dotnet build "EkstrakurikulerSekolah.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "EkstrakurikulerSekolah.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .

EXPOSE 8080

ENTRYPOINT ["dotnet", "EkstrakurikulerSekolah.dll"]