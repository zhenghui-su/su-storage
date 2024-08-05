import { Dictionaries } from "../enum";

export type Key = string;
export type Expire = Dictionaries.permanent | number; // 永久或者 时间戳
export interface Result<T> {
	message: string;
	value: T | null;
}
export interface Data<T> {
	value: T;
	[Dictionaries.expire]: Expire;
}
export interface StorageClass {
	get: (key: Key) => void;
	set: <T>(key: Key, value: T, expire: Expire) => void;
	remove: (key: Key) => void;
	clear: () => void;
}
