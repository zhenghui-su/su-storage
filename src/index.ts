import { Dictionaries } from "./enum";
import { Data, Expire, Key, Result, StorageClass } from "./types";

export class Storage implements StorageClass {
	get<T>(key: Key): Result<T> {
		const value = localStorage.getItem(key);
		if (value) {
			// 如果没存的话去取会返回null, 所以需要判断
			const data: Data<T> = JSON.parse(value);
			const nowTime = new Date().getTime();
			// 判断有没有过期 类型为number一定是时间戳 判断时间戳是否小于当前时间
			if (
				typeof data[Dictionaries.expire] === "number" &&
				data[Dictionaries.expire] < nowTime
			) {
				this.remove(key);
				return {
					message: `您的${key}已过期`,
					value: null
				};
			}
			return {
				message: "获取成功",
				value: data.value
			};
		} else {
			return {
				message: "值无效",
				value: null
			};
		}
	}
	set<T>(key: Key, value: T, expire: Expire = Dictionaries.permanent) {
		// 格式化
		const data = {
			value,
			[Dictionaries.expire]: expire
		};

		localStorage.setItem(key, JSON.stringify(data));
	}
	remove(key: Key) {
		localStorage.removeItem(key);
	}
	clear() {
		localStorage.clear();
	}
}
