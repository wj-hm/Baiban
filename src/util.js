// import formurlencoded from 'form-urlencoded';
import axios from 'axios';

// export function postForm(url: string, data: object): Promise<any> {
// 	return new Promise((resolve, reject) => {
// 		let encodedStr = formurlencoded(data);
// 		let xhr = new XMLHttpRequest();
// 		xhr.open('POST', url, true);
// 		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
// 		xhr.setRequestHeader('X-Request-With', 'XMLHttpRequest');
// 		xhr.onload = () => {
// 			try {
// 				let data = JSON.parse(xhr.response);
// 				resolve(data);
// 			} catch (e) {
// 				return reject(e);
// 			}
// 		}
// 		xhr.onerror = reject;
// 		xhr.send(encodedStr);
// 	});
// }


export function getResource(url, params){
	return new Promise((resolve, reject) => {
		axios.get(url, { params })
			.then(({ data }) => {
				if (data.code === 200 || data.code === 0) {
					return resolve(data.data);
				} else {
					return reject({ code: data.code, message: data.message });
				}
			})
			.catch(() => {
				return reject({
					code: 503,
					message: '数据加载失败，请刷新重试'
				});
			});
	});
}


export function postResource(url, params){
	return new Promise((resolve, reject) => {
		axios.post(url, { params })
			.then(({ data }) => {
				if (data.code === 200 || data.code === 0) {
					return resolve(data.data);
				} else {
					return reject({ code: data.code, message: data.message });
				}
			})
			.catch(() => {
				return reject({
					code: 503,
					message: '数据加载失败，请刷新重试'
				});
			});
	});
}
