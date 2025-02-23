import mongoose from "mongoose";
import RedisHelper from "./redis";

const plugins = { mongoose, RedisHelper } as const;

export { mongoose, RedisHelper };

export default plugins;
