export default interface Config {
    port: number;
    nodeEnv: string;
    jwtSecret: string;
    refreshTokenSecret: string;
}