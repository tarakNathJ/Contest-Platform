import { createClient, type RedisClientType } from "redis";
import type {
  LeaderboardEntry,
  ContestParticipant,
} from "@type-of/contest-platform";

interface TContestParticipant {
  userId: number;
  correctAttempts: number;
  totalAttempts: number;
  score: number;
}

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
    participants: TContestParticipant[],
    expirySeconds?: number
  ): Promise<boolean> {
    try {
      const leaderboardKey = `contest:${contestId}:leaderboard`;
      const metadataKey = `contest:${contestId}:metadata`;

      await this.client.del(leaderboardKey);
      await this.client.del(metadataKey);

      if (participants.length > 0) {
        await this.client.zAdd(
          leaderboardKey,
          participants.map((p) => ({
            score: p.score,
            value: p.userId.toString(),
          }))
        );

        const metadataEntries: any[] = [];
        participants.forEach((p) => {
          metadataEntries.push(
            `user:${p.userId}`,
            JSON.stringify({
              correctAttempts: p.correctAttempts,
              totalAttempts: p.totalAttempts,
              score: p.score,
            })
          );
        });

        await this.client.hSet(metadataKey, metadataEntries);

        if (expirySeconds) {
          await this.client.expire(leaderboardKey, expirySeconds);
          await this.client.expire(metadataKey, expirySeconds);
        }
      }

      console.log(`✓ Added ${participants.length} participants to leaderboard`);
      return true;
    } catch (error: any) {
      console.error("Error adding to leaderboard:", error.message);
      return false;
    }
  }

  public async remove_to_leaderboard(contestId: number): Promise<void> {
    const leaderboardKey = `contest:${contestId}:leaderboard`;
    const metadataKey = `contest:${contestId}:metadata`;

    await this.client.del(leaderboardKey);
    await this.client.del(metadataKey);
  }

  public async get_leaderboard_by_contestId(contestId: number): Promise<any> {
    try {
      const leaderboardKey = `contest:${contestId}:leaderboard`;
      const metadataKey = `contest:${contestId}:metadata`;

      const rankedUsers = await this.client.zRangeWithScores(
        leaderboardKey,
        0,
        -1,
        { REV: true }
      );

      if (!rankedUsers || rankedUsers.length === 0) {
        return [];
      }

      const metadata = await this.client.hGetAll(metadataKey);

      if (!metadata || Object.keys(metadata).length === 0) {
        return rankedUsers.map((item: any, index: number) => ({
          rank: index + 1,
          userId: parseInt(item.value),
          score: item.score,
          correctAttempts: 0,
          totalAttempts: 0,
          accuracy: 0,
        }));
      }

      const leaderboard = rankedUsers.map((item: any, index: number) => {
        const userId = parseInt(item.value);
        const metadataKey = `user:${userId}`;

        let userMetadata = {
          correctAttempts: 0,
          totalAttempts: 0,
          score: 0,
        };

        if (metadata[metadataKey]) {
          try {
            userMetadata = JSON.parse(metadata[metadataKey]);
          } catch (parseError) {
            console.error(parseError);
          }
        }

        const accuracy =
          userMetadata.totalAttempts > 0
            ? (userMetadata.correctAttempts / userMetadata.totalAttempts) * 100
            : 0;

        return {
          rank: index + 1,
          userId: userId,
          score: item.score,
          correctAttempts: userMetadata.correctAttempts,
          totalAttempts: userMetadata.totalAttempts,
          accuracy: parseFloat(accuracy.toFixed(2)),
        };
      });

      return leaderboard;
    } catch (error: any) {
      console.error("Error getting leaderboard:", error.message);

      return [];
    }
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

  // /////////////////////////////redis queue/////////////////////////////////////
  public async enqueue_task<T>(queueName: string, task: T): Promise<void> {
    const serializedTask = JSON.stringify(task);
    await this.client.rPush(queueName, serializedTask);
  }

  public async dequeue_task<T>(queueName: string): Promise<T | null> {
    const serializedTask = await this.client.lPop(queueName);
    return serializedTask ? JSON.parse(serializedTask) : null;
  }
  async blockingDequeue(
    queueName: string,
    timeout: number = 0
  ): Promise<any | null> {
    const result = await this.client.blPop(queueName, timeout);
    return result ? JSON.parse(result.element) : null;
  }
}
export { redis_service };
