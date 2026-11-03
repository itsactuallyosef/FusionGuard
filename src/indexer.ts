import { config } from "./config";

export interface Alert {
   time: string;
   agent?: string;
   description: string;
   level: number;
   ruleId: string;
}

export async function getRecentAlerts(limit = 10): Promise<Alert[]> {
   const auth = Buffer.from(
      `${config.wazuh.indexerUser}:${config.wazuh.indexerPass}`,
   ).toString("base64");

   const res = await fetch(
      `${config.wazuh.indexerURL}/wazuh-alerts-*/_search`,
      {
         method: "POST",
         headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            size: limit,
            sort: [{ timestamp: "desc" }],
            _source: [
               "timestamp",
               "agent.name",
               "rule.description",
               "rule.level",
               "rule.id",
            ],
         }),
      },
   );

   if (!res.ok) throw new Error(`Indexer returned ${res.status}`);

   const data: any = await res.json();
   return data.hits.hits.map((hit: any) => ({
      time: hit._source.timestamp,
      agent: hit._source.agent?.name,
      description: hit._source.rule?.description,
      level: hit._source.rule?.level,
      ruleId: hit._source.rule?.id,
   }));
}
