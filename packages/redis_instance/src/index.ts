import { createClient, type RedisClientType } from "redis";
import type {
  LeaderboardEntry,
  ContestParticipant,
} from "@type-of/contest-platform";

class redis_service {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL || "redis://localhost:6379",
    });
  }

  public async connect() {
    await this.client.connect();
    console.log("Connected to Redis");
  }

  public async disconnect() {
    await this.client.disconnect();
  }

  public async setJSON<T>(
    key: string,
    value: T,
    expirySeconds?: number
  ): Promise<void> {
    const serialized = JSON.stringify(value);
    if (expirySeconds) {
      await this.client.setEx(key, expirySeconds, serialized);
    } else {
      await this.client.set(key, serialized);
    }
  }

  public async getJSON<T>(key: string): Promise<T | null> {
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  public async delete_key(key: string) {
    await this.client.del(key);
  }

  ///////////////////////////////////////leaderboard//////////////////////////////
  // Add  data for leaderboard

  public async add_to_leaderboard(
    contestId: number,
    participant: any,
    expirySeconds?: number
  ): Promise<boolean> {
    const leaderboardKey = `contest:${contestId}:leaderboard`;
    await this.client.zAdd(
      leaderboardKey,
      participant.map((p: ContestParticipant) => ({
        score: p.correctAttempt,
        value: `${p.totalAttempt}|${p.username}`,
      }))
    );
    if (expirySeconds) {
      await this.client.expire(leaderboardKey, expirySeconds);
    }
    return true;
  }

  // remove data for leaderboard
  public async remove_to_leaderboard(contestId: string): Promise<void> {
    const leaderboardKey = `contest:${contestId}:leaderboard`;
    await this.client.del(leaderboardKey);
  }

  public async get_leaderboard_by_contestId(contestId: string): Promise<
    {
      rank: number;
      username: string;
      correctAttempt: number;
      totalAttempt: number;
    }[]
  > {
    const leaderboardKey = `contest:${contestId}:leaderboard`;

    const data = await this.client.zRangeWithScores(leaderboardKey, 0, -1, {
      REV: true,
    });

    // @ts-ignore
    return data.map((item, index) => {
      const parts = item.value.split("|");

      if (parts.length !== 2) {
        throw new Error(`Invalid leaderboard value: ${item.value}`);
      }

      const [totalAttemptStr, username] = parts;

      return {
        rank: index + 1,
        username,
        correctAttempt: item.score,
        totalAttempt: Number(totalAttemptStr),
      };
    });
  }

  /////////////////////////////////////////Redis Lists///////////////////
  // add data
  public async array_init_or_push<T>(key: string, item: T): Promise<number> {
    const serializedItem = JSON.stringify(item);
    return await this.client.rPush(key, serializedItem);
  }

  // get all data
  public async get_all_contest_list<T>(key: string): Promise<T[]> {
    const raw = await this.client.lRange(key, 0, -1);
    return raw.map((v) => JSON.parse(v));
  }

  // delete by value
  public async delete_element_by_value<T>(
    key: string,
    value: T
  ): Promise<number> {
    const serializedValue = JSON.stringify(value);
    return await this.client.lRem(key, 0, serializedValue);
  }
}
export { redis_service };
