process.loadEnvFile();

if (process.env.NODE_ENV !== "production") {
   process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

type APIConfig = {
   port: number;
};

type WazuhConfig = {
   indexerURL: string;
   indexerUser: string;
   indexerPass: string;
};

type Config = {
   api: APIConfig;
   wazuh: WazuhConfig;
};

export const config: Config = {
   api: {
      port: Number(process.env.PORT),
   },
   wazuh: {
      indexerURL: process.env.INDEXER_URL || "https://localhost:9200",
      indexerUser: process.env.INDEXER_USER || "admin",
      indexerPass: process.env.INDEXER_PASS || "",
   },
};
