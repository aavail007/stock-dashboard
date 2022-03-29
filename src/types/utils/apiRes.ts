export type ApiRes<T> = {
	msg: string,
	status: number,
	data: T
};