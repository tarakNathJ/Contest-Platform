import { createClient, type RedisClientType } from "redis";

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
}

export { redis_service };
