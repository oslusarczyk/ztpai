import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  set = async (key: string, value: any, ttl = 60 * 60 * 3) =>
    this.redis.set(key, JSON.stringify(value), 'EX', ttl);

  get = async <T>(key: string): Promise<T | null> =>
    this.redis.get(key).then((data) => (data ? JSON.parse(data) : null));

  del = async (key: string) => this.redis.del(key);
}
