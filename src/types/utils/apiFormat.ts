// API 回傳結果
export type ApiRes<T> = {
	msg: string,
	status: number,
	data: T
};

// API 需求參數
export type ApiParameter = {
  dataset?: string,
  start_date?: string,
  data_id?: number,
  token?: string
}