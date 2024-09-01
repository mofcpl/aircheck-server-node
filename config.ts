class CConfig {
    //Data origin settings
    originUri: string = "http://api.gios.gov.pl/pjp-api/rest";
    stationEndpoint: string = "/station/findAll/";
    sensorEndpoint: string = "/station/sensors/";
    dataEndpoint: string = "/data/getData/";
    summaryEndpoint: string = "/aqindex/getIndex/";
    //in days
    expirationStations: number = 30;
    expirationSensors: number = 30;
    //in minutes
    expirationSummary: number = 30;
    expirationData: number = 30;
    //Database
    mongoDBAuthSource: string = "admin"
}

export default new CConfig();